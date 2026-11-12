// scripts/import-esquemas.js
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ORIGEM = process.argv[2] || path.join(__dirname, "..", "public", "esquemas");
const MANIFEST = path.join(__dirname, "..", "prisma", "esquemas-manifest.json");
const DESTINO = path.join(__dirname, "..", "public", "esquemas");

const MOD = {
  injecao: "INJECAO", abs: "ABS", chassi: "CHASSI", instrumentacao: "INSTRUMENTACAO",
  alarme: "ALARME", pneus: "PNEUS", suspensao: "SUSPENSAO", punho: "PUNHO",
  elock: "ELOCK", handsfree: "HANDSFREE", radio: "RADIO", farois: "FAROIS",
};

function faixaAno(a, b) {
  if (!a && !b) return "n/d";
  if (!b || a === b) return String(a || b);
  return `${a}-${b}`;
}

async function main() {
  if (!ORIGEM) throw new Error("uso: node scripts/import-esquemas.js <pasta-do-pacote>");
  const itens = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  let motos = 0, esquemas = 0, pulados = 0;

  for (const it of itens) {
    const modulo = MOD[it.modulo];
    if (!modulo) { pulados++; continue; }

    const origem = path.join(ORIGEM, it.arquivo);
    if (!fs.existsSync(origem)) { pulados++; continue; }

    const marca = it.montadora.trim();
    const modelo = it.modelo.trim();
    const ano = faixaAno(it.ano_ini, it.ano_fim);

    let moto = await prisma.moto.findFirst({ where: { marca, modelo, ano } });
    if (!moto) {
      moto = await prisma.moto.create({
        data: { marca, modelo, ano, ecuTipo: it.ecu || null, origem: "esquema" },
      });
      motos++;
    }

    const rel = it.arquivo; // já é marca/modelo/id.ext
    const destino = path.join(DESTINO, rel);
    const formato = path.extname(it.arquivo).slice(1).toLowerCase();
    const bytes = fs.statSync(origem).size;
    if (path.resolve(origem) !== path.resolve(destino)) {
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.copyFileSync(origem, destino);
    }

    await prisma.esquema.upsert({
      where: { id: String(it.id) },
      create: {
        id: String(it.id), motoId: moto.id, modulo,
        sistema: it.sistema || null, ecu: it.ecu || null,
        arquivo: "/esquemas/" + rel,
        formato, bytes,
      },
      update: { motoId: moto.id, modulo },
    });
    esquemas++;
  }
  console.log({ motos, esquemas, pulados });
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
