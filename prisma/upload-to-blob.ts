import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("❌ BLOB_READ_WRITE_TOKEN não configurado!");
    console.log("Execute: set BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...");
    process.exit(1);
  }

  const manuaisDir = path.join(process.cwd(), "public", "manuais");

  if (!fs.existsSync(manuaisDir)) {
    console.error("❌ Pasta public/manuais/ não encontrada!");
    process.exit(1);
  }

  const files = fs.readdirSync(manuaisDir).filter((f) => f.endsWith(".pdf"));
  console.log(`📁 Encontrados ${files.length} PDFs para upload\n`);

  // Busca todos os manuais do banco
  const manuais = await prisma.manual.findMany();
  console.log(`📋 ${manuais.length} manuais no banco de dados\n`);

  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const manual of manuais) {
    // Se já tem URL do Blob, pula
    if (manual.fileUrl.startsWith("https://")) {
      console.log(`⏭️  Já no Blob: ${manual.title}`);
      skipped++;
      continue;
    }

    // Extrai o nome do arquivo da URL local (decodifica %20 etc)
    const fileName = decodeURIComponent(manual.fileUrl.replace("/manuais/", ""));
    const filePath = path.join(manuaisDir, fileName);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Arquivo não encontrado: ${fileName}`);
      skipped++;
      continue;
    }

    try {
      const fileStream = fs.createReadStream(filePath);
      const blobPath = `manuais/${fileName}`;
      const fileSize = fs.statSync(filePath).size;
      const sizeMB = (fileSize / 1024 / 1024).toFixed(1);

      console.log(
        `⬆️  Uploading (${uploaded + skipped + errors + 1}/${manuais.length}): ${manual.title} [${sizeMB} MB]...`
      );

      const blob = await put(blobPath, fileStream, {
        access: "private",
        token,
        contentType: "application/pdf",
        addRandomSuffix: false,
        allowOverwrite: true,
      });

      // Atualiza URL no banco
      await prisma.manual.update({
        where: { id: manual.id },
        data: { fileUrl: blob.url },
      });

      console.log(`   ✅ ${blob.url}\n`);
      uploaded++;
    } catch (err: any) {
      console.error(`   ❌ Erro: ${err.message}\n`);
      errors++;
    }
  }

  console.log("\n========== RESUMO ==========");
  console.log(`✅ Uploaded: ${uploaded}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
