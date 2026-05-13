const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream/promises");
const { Readable } = require("stream");

const prisma = new PrismaClient();

function parseArgs(argv) {
  const options = {
    limit: undefined,
    manualId: undefined,
    force: false,
    dryRun: false,
    destSubdir: "drive-migrated",
  };

  for (const arg of argv) {
    if (arg === "--force") options.force = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (Number.isFinite(value) && value > 0) options.limit = value;
    } else if (arg.startsWith("--manual-id=")) {
      options.manualId = arg.slice("--manual-id=".length);
    } else if (arg.startsWith("--dest-subdir=")) {
      options.destSubdir = arg.slice("--dest-subdir=".length) || options.destSubdir;
    }
  }

  return options;
}

function sanitizeSegment(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "outros";
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function toLocalUrl(relativePath) {
  return `/${relativePath.split(path.sep).join("/")}`;
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

function isPdfResponse(response) {
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  const disposition = (response.headers.get("content-disposition") || "").toLowerCase();
  return (
    contentType.includes("application/pdf") ||
    contentType.includes("application/octet-stream") ||
    disposition.includes(".pdf")
  );
}

async function resolveDriveResponse(fileUrl) {
  const fileId = extractDriveFileId(fileUrl);
  if (!fileId) {
    throw new Error(`Nao foi possivel extrair o fileId: ${fileUrl}`);
  }

  const resourceKey = extractDriveResourceKey(fileUrl);
  const initialUrl = new URL("https://drive.google.com/uc");
  initialUrl.searchParams.set("export", "download");
  initialUrl.searchParams.set("id", fileId);
  if (resourceKey) {
    initialUrl.searchParams.set("resourcekey", resourceKey);
  }

  const first = await fetch(initialUrl, { redirect: "follow" });
  if (first.ok && isPdfResponse(first)) {
    return first;
  }

  const html = await first.text();
  const actionMatch = html.match(/<form id="download-form" action="([^"]+)"/i);
  if (!actionMatch?.[1]) {
    throw new Error(`Google Drive nao retornou formulario de download para ${fileId}`);
  }

  const confirmedUrl = new URL(actionMatch[1]);
  const fields = extractHiddenInputs(html);
  for (const [key, value] of Object.entries(fields)) {
    confirmedUrl.searchParams.set(key, value);
  }
  if (resourceKey && !confirmedUrl.searchParams.has("resourcekey")) {
    confirmedUrl.searchParams.set("resourcekey", resourceKey);
  }

  const confirmed = await fetch(confirmedUrl, { redirect: "follow" });
  if (!confirmed.ok || !isPdfResponse(confirmed)) {
    throw new Error(`Download confirmado nao retornou PDF para ${fileId}`);
  }

  return confirmed;
}

async function saveResponseToFile(response, destinationPath) {
  if (!response.body) {
    throw new Error("Resposta sem corpo para download do PDF");
  }

  ensureDir(destinationPath);
  await pipeline(Readable.fromWeb(response.body), fs.createWriteStream(destinationPath));
}

function buildLocalDestination(manual, destSubdir) {
  const brandDir = sanitizeSegment(manual.brand || "outros");
  const fileName = `${manual.id}.pdf`;
  const relativeDiskPath = path.join("public", "manuais", destSubdir, brandDir, fileName);
  return {
    diskPath: path.join(process.cwd(), relativeDiskPath),
    fileUrl: toLocalUrl(path.join("manuais", destSubdir, brandDir, fileName)),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const where = options.force
    ? {}
    : { NOT: { fileUrl: { startsWith: "/" } } };

  if (options.manualId) {
    where.id = options.manualId;
  }

  const manuals = await prisma.manual.findMany({
    where,
    select: { id: true, title: true, brand: true, fileUrl: true },
    orderBy: { createdAt: "asc" },
    take: options.limit,
  });

  console.log(`Manuais selecionados para migracao: ${manuals.length}`);
  console.log(`Dry run: ${options.dryRun ? "sim" : "nao"}`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const manual of manuals) {
    try {
      const destination = buildLocalDestination(manual, options.destSubdir);

      if (options.dryRun) {
        console.log(`[DRY] ${manual.title} -> ${destination.fileUrl}`);
        continue;
      }

      if (!fs.existsSync(destination.diskPath)) {
        const response = await resolveDriveResponse(manual.fileUrl);
        await saveResponseToFile(response, destination.diskPath);
      }

      await prisma.manual.update({
        where: { id: manual.id },
        data: { fileUrl: destination.fileUrl },
      });

      console.log(`[OK] ${manual.title} -> ${destination.fileUrl}`);
      updated++;
    } catch (error) {
      errors++;
      const message = error instanceof Error ? error.message : String(error);
      console.log(`[ERRO] ${manual.title}: ${message}`);
    }
  }

  const localFiles = await prisma.manual.count({ where: { fileUrl: { startsWith: "/" } } });
  const remoteFiles = await prisma.manual.count({ where: { NOT: { fileUrl: { startsWith: "/" } } } });

  console.log("\nResumo da migracao:");
  console.log(`  Atualizados: ${updated}`);
  console.log(`  Skips: ${skipped}`);
  console.log(`  Erros: ${errors}`);
  console.log(`  Locais: ${localFiles}`);
  console.log(`  Remotos: ${remoteFiles}`);
}

main()
  .catch((error) => {
    console.error("Falha na migracao Drive -> local:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });