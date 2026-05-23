require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 100;
const PUBLIC_DIR = path.join(__dirname, "..", "public");

function chunkText(text) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + CHUNK_SIZE, text.length);
    const chunk = text.slice(i, end).trim();
    if (chunk.length > 50) chunks.push(chunk);
    i += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
}

async function indexManual(manual) {
  const filePath = path.join(PUBLIC_DIR, manual.fileUrl);

  if (!fs.existsSync(filePath)) {
    console.log(`  [SKIP] arquivo não encontrado: ${manual.fileUrl}`);
    return 0;
  }

  // Verifica se já foi indexado
  const existing = await prisma.manualChunk.count({
    where: { manualId: manual.id },
  });
  if (existing > 0) {
    console.log(`  [SKIP] já indexado (${existing} chunks)`);
    return 0;
  }

  let pdfParse;
  try {
    pdfParse = require("pdf-parse");
  } catch {
    console.error("pdf-parse não instalado");
    process.exit(1);
  }

  const buffer = fs.readFileSync(filePath);
  let text = "";

  try {
    const data = await pdfParse(buffer, { max: 0 });
    text = data.text;
  } catch (e) {
    console.log(`  [ERRO] falha ao ler PDF: ${e.message}`);
    return 0;
  }

  // Limpa o texto
  text = text
    .replace(/\s+/g, " ")
    .replace(/[^\w\sÀ-ÿ.,;:()\-\/°%]/g, " ")
    .trim();

  if (text.length < 100) {
    console.log(`  [SKIP] PDF sem texto extraível (possivelmente escaneado)`);
    return 0;
  }

  const chunks = chunkText(text);

  await prisma.manualChunk.createMany({
    data: chunks.map((content, idx) => ({
      manualId: manual.id,
      content,
      chunkIdx: idx,
    })),
  });

  return chunks.length;
}

async function main() {
  const manuals = await prisma.manual.findMany({
    select: { id: true, title: true, brand: true, model: true, fileUrl: true },
  });

  console.log(`\nIndexando ${manuals.length} manuais...\n`);

  let total = 0;
  let indexed = 0;
  let skipped = 0;

  for (let i = 0; i < manuals.length; i++) {
    const manual = manuals[i];
    console.log(`[${i + 1}/${manuals.length}] ${manual.title}`);
    const chunks = await indexManual(manual);
    if (chunks > 0) {
      console.log(`  ✓ ${chunks} chunks salvos`);
      total += chunks;
      indexed++;
    } else {
      skipped++;
    }
  }

  console.log(`\n✅ Concluído!`);
  console.log(`   Manuais indexados: ${indexed}`);
  console.log(`   Manuais ignorados: ${skipped}`);
  console.log(`   Total de chunks:   ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
