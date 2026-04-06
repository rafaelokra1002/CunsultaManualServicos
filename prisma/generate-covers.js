const { PrismaClient } = require("@prisma/client");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Caminho do Ghostscript no Windows
const GS_PATH = "C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe";

function sanitize(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function main() {
  const coversDir = path.join(process.cwd(), "public", "covers");
  fs.mkdirSync(coversDir, { recursive: true });

  // Buscar manuais que não têm capa e têm arquivo local
  const manuals = await prisma.manual.findMany({
    where: {
      coverUrl: null,
      fileUrl: { startsWith: "/" },
    },
    select: { id: true, title: true, fileUrl: true, brand: true, model: true },
  });

  console.log(`Manuais sem capa: ${manuals.length}`);

  let success = 0;
  let errors = 0;

  for (const manual of manuals) {
    const pdfPath = path.join(process.cwd(), "public", manual.fileUrl);

    if (!fs.existsSync(pdfPath)) {
      console.log(`[SKIP] PDF não encontrado: ${manual.fileUrl}`);
      errors++;
      continue;
    }

    // Nome da imagem de capa
    const coverName = sanitize(path.basename(manual.fileUrl, ".pdf")) + ".jpg";
    const coverPath = path.join(coversDir, coverName);

    // Se já existe a imagem, só atualiza o banco
    if (fs.existsSync(coverPath)) {
      const coverUrl = `/covers/${coverName}`;
      await prisma.manual.update({
        where: { id: manual.id },
        data: { coverUrl },
      });
      console.log(`[EXISTE] ${manual.title} → ${coverUrl}`);
      success++;
      continue;
    }

    try {
      // Ghostscript: extrair primeira página como JPEG
      const cmd = `"${GS_PATH}" -dNOPAUSE -dBATCH -dSAFER -sDEVICE=jpeg -dFirstPage=1 -dLastPage=1 -r150 -dJPEGQ=85 -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -sOutputFile="${coverPath}" "${pdfPath}"`;

      execSync(cmd, {
        stdio: "pipe",
        timeout: 30000, // 30s timeout por PDF
        windowsHide: true,
      });

      if (fs.existsSync(coverPath)) {
        const coverUrl = `/covers/${coverName}`;
        await prisma.manual.update({
          where: { id: manual.id },
          data: { coverUrl },
        });
        console.log(`[OK] ${manual.title} → ${coverUrl}`);
        success++;
      } else {
        console.log(`[ERRO] Imagem não gerada: ${manual.title}`);
        errors++;
      }
    } catch (err) {
      console.log(`[ERRO] ${manual.title}: ${err.message.substring(0, 100)}`);
      errors++;
    }
  }

  const total = await prisma.manual.count();
  const withCover = await prisma.manual.count({ where: { coverUrl: { not: null } } });

  console.log(`\n========================================`);
  console.log(`Capas geradas com sucesso: ${success}`);
  console.log(`Erros: ${errors}`);
  console.log(`Total manuais: ${total}`);
  console.log(`Com capa: ${withCover}`);
  console.log(`Sem capa: ${total - withCover}`);
  console.log(`========================================`);

  await prisma.$disconnect();
}

main().catch(console.error);
