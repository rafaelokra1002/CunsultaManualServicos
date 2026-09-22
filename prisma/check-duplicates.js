const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const all = await prisma.manual.findMany({
    select: { id: true, title: true, fileUrl: true, brand: true, model: true, year: true },
  });

  console.log(`Total manuais no banco: ${all.length}\n`);

  // Duplicados por fileUrl (mesmo arquivo)
  const urlMap = {};
  all.forEach((m) => {
    if (!urlMap[m.fileUrl]) urlMap[m.fileUrl] = [];
    urlMap[m.fileUrl].push(m);
  });

  const urlDups = Object.entries(urlMap).filter(([, v]) => v.length > 1);
  console.log(`=== DUPLICADOS POR FILE URL: ${urlDups.length} grupos ===`);
  let urlDupCount = 0;
  for (const [url, items] of urlDups) {
    console.log(`\n  fileUrl: ${url}`);
    items.forEach((i) => console.log(`    id: ${i.id} | ${i.brand} | ${i.model} | ${i.year} | ${i.title}`));
    urlDupCount += items.length - 1;
  }
  console.log(`\nTotal registros duplicados por fileUrl: ${urlDupCount}`);

  // Duplicados por título
  const titleMap = {};
  all.forEach((m) => {
    if (!titleMap[m.title]) titleMap[m.title] = [];
    titleMap[m.title].push(m);
  });

  const titleDups = Object.entries(titleMap).filter(([, v]) => v.length > 1);
  console.log(`\n=== DUPLICADOS POR TÍTULO: ${titleDups.length} grupos ===`);
  let titleDupCount = 0;
  for (const [title, items] of titleDups) {
    console.log(`\n  título: ${title}`);
    items.forEach((i) => console.log(`    id: ${i.id} | fileUrl: ${i.fileUrl}`));
    titleDupCount += items.length - 1;
  }
  console.log(`\nTotal registros duplicados por título: ${titleDupCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
