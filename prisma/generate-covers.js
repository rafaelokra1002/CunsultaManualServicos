const { PrismaClient } = require("@prisma/client");
const { execFileSync } = require("child_process");
const { pipeline } = require("stream/promises");
const { Readable } = require("stream");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const DEFAULT_GS_PATH = "C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe";
const PDF_DOWNLOAD_TIMEOUT = 5 * 60 * 1000;

function parseArgs(argv) {
  const options = {
    limit: undefined,
    manualId: undefined,
    includeRemote: true,
    includeLocal: true,
    force: false,
  };

  for (const arg of argv) {
    if (arg === "--local-only") {
      options.includeRemote = false;
      continue;
    }

    if (arg === "--remote-only") {
      options.includeLocal = false;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (Number.isFinite(value) && value > 0) {
        options.limit = value;
      }
      continue;
    }

    if (arg.startsWith("--manual-id=")) {
      options.manualId = arg.slice("--manual-id=".length);
    }
  }

  return options;
}

function getGhostscriptPath() {
  const configured = process.env.GS_PATH || DEFAULT_GS_PATH;
  if (!fs.existsSync(configured)) {
    throw new Error(`Ghostscript não encontrado em: ${configured}`);
  }
  return configured;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function buildCoverName(manualId) {
  return `${manualId}.jpg`;
}

function buildCoverUrl(coverName) {
  return `/covers/${coverName}`;
}

function getLocalPdfPath(fileUrl) {
  const relativePath = fileUrl.replace(/^\/+/, "").split("/");
  return path.join(process.cwd(), "public", ...relativePath);
}

function extractDriveFileId(fileUrl) {
  const fromPath = fileUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fromPath?.[1]) return fromPath[1];

  try {
    const url = new URL(fileUrl);
    return url.searchParams.get("id") || undefined;
  } catch {
    return undefined;
  }
}

function extractDriveResourceKey(fileUrl) {
  try {
    const url = new URL(fileUrl);
    return url.searchParams.get("resourcekey") || undefined;
  } catch {
    return undefined;
  }
}

function extractHiddenInputs(html) {
  const values = {};
  const regex = /<input[^>]+type="hidden"[^>]+name="([^"]+)"[^>]+value="([^"]*)"[^>]*>/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    values[match[1]] = match[2];
  }

  return values;
}

async function writeResponseToFile(response, filePath) {
  if (!response.body) {
    throw new Error("Resposta sem corpo para download do PDF.");
  }

  await pipeline(Readable.fromWeb(response.body), fs.createWriteStream(filePath));
}

function isPdfResponse(response) {
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  const disposition = (response.headers.get("content-disposition") || "").toLowerCase();

  return (
    contentType.includes("application/pdf") ||
    contentType.includes("application/octet-stream") ||
    disposition.includes(".pdf")
  );
}

async function fetchDriveDownloadResponse(fileUrl) {
  const fileId = extractDriveFileId(fileUrl);
  if (!fileId) {
    throw new Error(`URL do Drive inválida: ${fileUrl}`);
  }

  const resourceKey = extractDriveResourceKey(fileUrl);
  const initialUrl = new URL("https://drive.google.com/uc");
  initialUrl.searchParams.set("export", "download");
  initialUrl.searchParams.set("id", fileId);
  if (resourceKey) {
    initialUrl.searchParams.set("resourcekey", resourceKey);
  }

  const response = await fetch(initialUrl, { redirect: "follow" });

  if (response.ok && isPdfResponse(response)) {
    return response;
  }

  const html = await response.text();
  const actionMatch = html.match(/<form id="download-form" action="([^"]+)"/i);
  if (!actionMatch?.[1]) {
    throw new Error(`Google Drive não retornou link de download para ${fileId}.`);
  }

  const downloadUrl = new URL(actionMatch[1]);
  const fields = extractHiddenInputs(html);
  for (const [key, value] of Object.entries(fields)) {
    downloadUrl.searchParams.set(key, value);
  }
  if (resourceKey && !downloadUrl.searchParams.has("resourcekey")) {
    downloadUrl.searchParams.set("resourcekey", resourceKey);
  }

  const confirmed = await fetch(downloadUrl, { redirect: "follow" });
  if (!confirmed.ok || !isPdfResponse(confirmed)) {
    throw new Error(`Download confirmado não retornou PDF para ${fileId}.`);
  }

  return confirmed;
}

async function downloadRemotePdf(fileUrl, tempDir, manualId) {
  ensureDir(tempDir);
  const tempPdfPath = path.join(tempDir, `${manualId}.pdf`);
  const response = await Promise.race([
    fetchDriveDownloadResponse(fileUrl),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout ao baixar PDF remoto.")), PDF_DOWNLOAD_TIMEOUT);
    }),
  ]);

  await writeResponseToFile(response, tempPdfPath);
  return tempPdfPath;
}

function renderCover(gsPath, pdfPath, coverPath) {
  execFileSync(
    gsPath,
    [
      "-dNOPAUSE",
      "-dBATCH",
      "-dSAFER",
      "-sDEVICE=jpeg",
      "-dFirstPage=1",
      "-dLastPage=1",
      "-r150",
      "-dJPEGQ=85",
      "-dTextAlphaBits=4",
      "-dGraphicsAlphaBits=4",
      `-sOutputFile=${coverPath}`,
      pdfPath,
    ],
    {
      stdio: "pipe",
      timeout: 60000,
      windowsHide: true,
    }
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const gsPath = getGhostscriptPath();
  const coversDir = path.join(process.cwd(), "public", "covers");
  const tempDir = path.join(process.cwd(), ".tmp", "pdf-covers");

  ensureDir(coversDir);
  ensureDir(tempDir);

  const where = options.force
    ? {}
    : { coverUrl: null };

  if (options.manualId) {
    where.id = options.manualId;
  }

  if (options.includeLocal && !options.includeRemote) {
    where.fileUrl = { startsWith: "/" };
  } else if (!options.includeLocal && options.includeRemote) {
    where.NOT = { fileUrl: { startsWith: "/" } };
  }

  const manuals = await prisma.manual.findMany({
    where,
    select: { id: true, title: true, fileUrl: true },
    orderBy: { createdAt: "asc" },
    take: options.limit,
  });

  console.log(`Manuais selecionados: ${manuals.length}`);

  let success = 0;
  let errors = 0;
  let skipped = 0;
  let localSuccess = 0;
  let remoteSuccess = 0;

  for (const manual of manuals) {
    const coverName = buildCoverName(manual.id);
    const coverPath = path.join(coversDir, coverName);
    const coverUrl = buildCoverUrl(coverName);

    if (fs.existsSync(coverPath)) {
      await prisma.manual.update({
        where: { id: manual.id },
        data: { coverUrl },
      });
      console.log(`[EXISTE] ${manual.title} → ${coverUrl}`);
      success++;
      if (manual.fileUrl.startsWith("/")) localSuccess++;
      else remoteSuccess++;
      continue;
    }

    let pdfPath = null;
    let removeTempPdf = false;

    try {
      if (manual.fileUrl.startsWith("/")) {
        pdfPath = getLocalPdfPath(manual.fileUrl);
        if (!fs.existsSync(pdfPath)) {
          console.log(`[SKIP] PDF local não encontrado: ${manual.fileUrl}`);
          skipped++;
          continue;
        }
      } else {
        pdfPath = await downloadRemotePdf(manual.fileUrl, tempDir, manual.id);
        removeTempPdf = true;
      }

      renderCover(gsPath, pdfPath, coverPath);

      if (!fs.existsSync(coverPath)) {
        throw new Error("Ghostscript não gerou a imagem de capa.");
      }

      await prisma.manual.update({
        where: { id: manual.id },
        data: { coverUrl },
      });

      console.log(`[OK] ${manual.title} → ${coverUrl}`);
      success++;
      if (manual.fileUrl.startsWith("/")) localSuccess++;
      else remoteSuccess++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`[ERRO] ${manual.title}: ${message.slice(0, 200)}`);
      errors++;
    } finally {
      if (removeTempPdf && pdfPath && fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }
  }

  const total = await prisma.manual.count();
  const withCover = await prisma.manual.count({ where: { coverUrl: { not: null } } });

  console.log(`\n========================================`);
  console.log(`Capas geradas com sucesso: ${success}`);
  console.log(`Capas locais geradas: ${localSuccess}`);
  console.log(`Capas remotas geradas: ${remoteSuccess}`);
  console.log(`Erros: ${errors}`);
  console.log(`Skips: ${skipped}`);
  console.log(`Total manuais: ${total}`);
  console.log(`Com capa: ${withCover}`);
  console.log(`Sem capa: ${total - withCover}`);
  console.log(`========================================`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
