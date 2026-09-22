const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const all = await prisma.manual.findMany({
    select: { id: true, title: true, fileUrl: true, brand: true, model: true, year: true },
    orderBy: { createdAt: "asc" },
  });

  // 1. Remover duplicados exatos por fileUrl (mesmo arquivo, registros duplicados)
  const urlMap = {};
  all.forEach((m) => {
    if (!urlMap[m.fileUrl]) urlMap[m.fileUrl] = [];
    urlMap[m.fileUrl].push(m);
  });

  const urlDups = Object.entries(urlMap).filter(([, v]) => v.length > 1);
  let removedUrl = 0;
  for (const [url, items] of urlDups) {
    // Manter o primeiro, remover o resto
    const toRemove = items.slice(1);
    for (const item of toRemove) {
      await prisma.manual.delete({ where: { id: item.id } });
      console.log(`[REMOVIDO fileUrl dup] ${item.title} | ${item.fileUrl}`);
      removedUrl++;
    }
  }

  // 2. Corrigir títulos duplicados (arquivos diferentes, mesmo título)
  // Recarregar após remoção
  const remaining = await prisma.manual.findMany({
    select: { id: true, title: true, fileUrl: true, brand: true, model: true, year: true },
    orderBy: { createdAt: "asc" },
  });

  const titleMap = {};
  remaining.forEach((m) => {
    if (!titleMap[m.title]) titleMap[m.title] = [];
    titleMap[m.title].push(m);
  });

  const titleDups = Object.entries(titleMap).filter(([, v]) => v.length > 1);
  let renamedCount = 0;

  for (const [title, items] of titleDups) {
    // Dar título único a cada um baseado no nome do arquivo
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Extrair nome legível do fileUrl
      const fileName = item.fileUrl
        .replace("/manuais/", "")
        .replace(".pdf", "")
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      // Detectar ano do nome do arquivo
      const yearMatch = fileName.match(/\b(19[7-9]\d|20[0-2]\d)\b/);
      const fileYear = yearMatch ? parseInt(yearMatch[0]) : item.year;

      // Construir título descritivo único
      let newTitle;
      if (items.length <= 3 && i > 0) {
        // Poucos duplicados: adicionar sufixo
        newTitle = `${title} - Vol. ${i + 1}`;
      } else {
        // Muitos duplicados: usar nome do arquivo como base
        // Capitalizar primeira letra de cada palavra
        const niceName = fileName
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        newTitle = `${item.brand} ${item.model} - ${niceName}`;
      }

      // Só atualizar se diferente do original
      if (newTitle !== item.title) {
        await prisma.manual.update({
          where: { id: item.id },
          data: { title: newTitle, year: fileYear },
        });
        console.log(`[RENOMEADO] "${item.title}" → "${newTitle}"`);
        renamedCount++;
      }
    }
  }

  const total = await prisma.manual.count();
  console.log(`\n========================================`);
  console.log(`Duplicados por fileUrl removidos: ${removedUrl}`);
  console.log(`Títulos renomeados: ${renamedCount}`);
  console.log(`Total manuais no banco agora: ${total}`);
  console.log(`========================================`);

  await prisma.$disconnect();
}

main().catch(console.error);
