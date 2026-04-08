const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Palavras-chave que identificam catálogos de peças
const catalogKeywords = [
  "catálogo",
  "catalogo",
  "catalago",
  "tabela de guarda",
  "tabela guarda",
  "catálogo de retentores",
  "catálogo de peças",
  "parts catalog",
  "peças",
];

async function categorize() {
  console.log("🔍 Buscando manuais no banco...\n");

  const manuais = await prisma.manual.findMany({
    orderBy: { title: "asc" },
  });

  console.log(`Total de manuais: ${manuais.length}\n`);

  let servicoCount = 0;
  let catalogoCount = 0;
  const updates = [];

  for (const manual of manuais) {
    const titleLower = manual.title.toLowerCase();
    const isCatalogo = catalogKeywords.some((kw) => titleLower.includes(kw));

    const newCategory = isCatalogo ? "catalogo" : "servico";

    if (manual.category !== newCategory) {
      updates.push({
        id: manual.id,
        title: manual.title,
        from: manual.category || "servico",
        to: newCategory,
      });
    }

    if (newCategory === "catalogo") {
      catalogoCount++;
      console.log(`📦 CATÁLOGO: ${manual.title}`);
    } else {
      servicoCount++;
      console.log(`📋 SERVIÇO:  ${manual.title}`);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📋 Manuais de Serviço: ${servicoCount}`);
  console.log(`📦 Catálogos de Peças: ${catalogoCount}`);
  console.log(`🔄 Atualizações necessárias: ${updates.length}`);

  if (updates.length > 0) {
    console.log(`\nAtualizando...`);
    for (const u of updates) {
      await prisma.manual.update({
        where: { id: u.id },
        data: { category: u.to },
      });
      console.log(`  ✅ "${u.title}" → ${u.to}`);
    }
    console.log(`\n✅ Categorização concluída!`);
  } else {
    console.log(`\n✅ Todos já estão categorizados corretamente!`);
  }
}

categorize()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
