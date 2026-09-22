const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Mapeamento manual: arquivo → { brand, model, year, title }
const manualMap = [
  // === KAWASAKI ===
  { file: "Kawasaki/Z 650 20 portugues 2017-20.pdf", brand: "Kawasaki", model: "Z 650", year: 2017, title: "Manual de Serviço Kawasaki Z 650" },

  // === YAMAHA ===
  { file: "Yamaha/WR250F Service PDF 2006.pdf", brand: "Yamaha", model: "WR 250F", year: 2006, title: "Manual de Serviço Yamaha WR 250F" },
  { file: "Yamaha/XJ6N 2013.pdf", brand: "Yamaha", model: "XJ6 N", year: 2013, title: "Manual de Serviço Yamaha XJ6 N" },

  // === OUTROS - Honda ===
  { file: "Outros/160 StartFanTitanCargo.pdf", brand: "Honda", model: "CG 160", year: 2020, title: "Manual de Serviço Honda CG 160 Start/Fan/Titan/Cargo" },
  { file: "Outros/biz 125 ano a 2011 2012.pdf", brand: "Honda", model: "Biz 125", year: 2011, title: "Manual de Serviço Honda Biz 125" },
  { file: "Outros/Cap 18 Sistema Ignicao CB600F.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Sistema de Ignição Honda CB 600F Hornet" },
  { file: "Outros/Cap 22 Diagramas Eletricos CB600F.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Diagramas Elétricos Honda CB 600F Hornet" },
  { file: "Outros/CB 600F Hornet.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Manual de Serviço Honda CB 600F Hornet" },
  { file: "Outros/CB500X CBR500 CB500F 15 2013-20.pdf", brand: "Honda", model: "CB 500X / CBR 500R / CB 500F", year: 2013, title: "Manual de Serviço Honda CB 500X / CBR 500R / CB 500F" },
  { file: "Outros/CBR1000RR 14 Service 2008-20.pdf", brand: "Honda", model: "CBR 1000RR", year: 2008, title: "Manual de Serviço Honda CBR 1000RR" },
  { file: "Outros/CG160 Fan ESDi CG160 Titan EX.pdf", brand: "Honda", model: "CG 160 Fan/Titan", year: 2016, title: "Manual de Serviço Honda CG 160 Fan ESDi / Titan EX" },
  { file: "Outros/manualdeservicocb600fhornetms suplemento 00x6b mbz 002 140929080240 phpapp01 2006.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2006, title: "Suplemento Manual de Serviço Honda CB 600F Hornet" },
  { file: "Outros/MS FALCON 08 MS SUP 1 2000-20.pdf", brand: "Honda", model: "NX 400i Falcon", year: 2000, title: "Manual de Serviço Honda NX 400i Falcon" },
  { file: "Outros/MS NC750X X DCT 2022.pdf", brand: "Honda", model: "NC 750X DCT", year: 2022, title: "Manual de Serviço Honda NC 750X DCT" },
  { file: "Outros/NX400i FALCON Capitulo 10 Cilindro Pistao 2012-20.pdf", brand: "Honda", model: "NX 400i Falcon", year: 2012, title: "Cilindro e Pistão Honda NX 400i Falcon" },
  { file: "Outros/XRE 300 A 2016-20.pdf", brand: "Honda", model: "XRE 300", year: 2016, title: "Manual de Serviço Honda XRE 300" },

  // === OUTROS - Yamaha ===
  { file: "Outros/FACTOR 125I BLUEFLEX 2019.pdf", brand: "Yamaha", model: "Factor 125i", year: 2019, title: "Manual de Serviço Yamaha Factor 125i BlueFlex" },
  { file: "Outros/FAZER 150 2013 2014.pdf", brand: "Yamaha", model: "Fazer 150", year: 2013, title: "Manual de Serviço Yamaha Fazer 150" },
  { file: "Outros/MS XJ6F XJ6F 2015.pdf", brand: "Yamaha", model: "XJ6 F", year: 2015, title: "Manual de Serviço Yamaha XJ6 F" },
  { file: "Outros/NMAX 160 2020.pdf", brand: "Yamaha", model: "NMax 160", year: 2020, title: "Manual de Serviço Yamaha NMax 160 (2020)" },
  { file: "Outros/NMAX 160 2021.pdf", brand: "Yamaha", model: "NMax 160", year: 2021, title: "Manual de Serviço Yamaha NMax 160 (2021)" },
  { file: "Outros/NMAX 160 ate 2020.pdf", brand: "Yamaha", model: "NMax 160", year: 2018, title: "Manual de Serviço Yamaha NMax 160 (até 2020)" },
  { file: "Outros/XJ6 N 2010.pdf", brand: "Yamaha", model: "XJ6 N", year: 2010, title: "Manual de Serviço Yamaha XJ6 N" },

  // === OUTROS - Kawasaki ===
  { file: "Outros/MS KX450 PORT 2020.pdf", brand: "Kawasaki", model: "KX 450", year: 2020, title: "Manual de Serviço Kawasaki KX 450" },
  { file: "Outros/MS NINJA 400 PORT 2019.pdf", brand: "Kawasaki", model: "Ninja 400", year: 2019, title: "Manual de Serviço Kawasaki Ninja 400" },

  // === OUTROS - BMW ===
  { file: "Outros/BMW F 650 GS DAKAR WIRING DIAGRAMS R ENG.pdf", brand: "BMW", model: "F 650 GS Dakar", year: 2005, title: "Diagramas Elétricos BMW F 650 GS Dakar" },
  { file: "Outros/BMW F 650 WIRING DIAGRAM ENG 1994-20.pdf", brand: "BMW", model: "F 650", year: 1994, title: "Diagrama Elétrico BMW F 650" },
  { file: "Outros/BMW F650GS.pdf", brand: "BMW", model: "F 650 GS", year: 2005, title: "Manual de Serviço BMW F 650 GS" },
  { file: "Outros/Bmw G 310 gs Taller k02 1.pdf", brand: "BMW", model: "G 310 GS", year: 2018, title: "Manual de Serviço BMW G 310 GS" },
  { file: "Outros/Bmw S 1000 rr Taller k46 13.pdf", brand: "BMW", model: "S 1000 RR", year: 2013, title: "Manual de Serviço BMW S 1000 RR" },

  // === OUTROS - Triumph ===
  { file: "Outros/675 speedtriple daytona 675r TRIUMPH ServiceManual T3856909 2013.pdf", brand: "Triumph", model: "Speed Triple / Daytona 675R", year: 2013, title: "Manual de Serviço Triumph Speed Triple / Daytona 675R" },
  { file: "Outros/Daytona 675 Service BPT.pdf", brand: "Triumph", model: "Daytona 675", year: 2010, title: "Manual de Serviço Triumph Daytona 675" },
  { file: "Outros/MS TRI Tiger 1200EXPL 15 2012-20.pdf", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2012, title: "Manual de Serviço Triumph Tiger 1200 Explorer" },
  { file: "Outros/new Triumph Tiger Explorer 1200 2016-20.pdf", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2016, title: "Manual de Serviço Triumph Tiger Explorer 1200 (2016+)" },
  { file: "Outros/tiger 1200 explorer tiger 1200 2018.pdf", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2018, title: "Manual de Serviço Triumph Tiger 1200 Explorer (2018)" },
  { file: "Outros/tiger 800 2015.pdf", brand: "Triumph", model: "Tiger 800", year: 2015, title: "Manual de Serviço Triumph Tiger 800" },
  { file: "Outros/TIGER 900 RALLY PRO 21 23 portugues.pdf", brand: "Triumph", model: "Tiger 900 Rally Pro", year: 2021, title: "Manual de Serviço Triumph Tiger 900 Rally Pro" },
  { file: "Outros/TRIUMPH TIGER 900 GT 2020 2023.pdf", brand: "Triumph", model: "Tiger 900 GT", year: 2020, title: "Manual de Serviço Triumph Tiger 900 GT" },

  // === OUTROS - Suzuki ===
  { file: "Outros/bulevar 800.pdf", brand: "Suzuki", model: "Boulevard 800", year: 2005, title: "Manual de Serviço Suzuki Boulevard 800" },
  { file: "Outros/DL V STROM 650 espanhol 2017 2020.pdf", brand: "Suzuki", model: "V-Strom 650", year: 2017, title: "Manual de Serviço Suzuki V-Strom 650" },
  { file: "Outros/MS Marauder VZ 800 04 99500 38036 03E 1997.pdf", brand: "Suzuki", model: "Marauder VZ 800", year: 1997, title: "Manual de Serviço Suzuki Marauder VZ 800" },

  // === OUTROS - Royal Enfield ===
  { file: "Outros/MS 410 HIMALAYAN.pdf", brand: "Royal Enfield", model: "Himalayan 410", year: 2020, title: "Manual de Serviço Royal Enfield Himalayan 410" },
  { file: "Outros/SPEED 400.pdf", brand: "Royal Enfield", model: "Speed 400", year: 2023, title: "Manual de Serviço Royal Enfield Speed 400" },

  // === OUTROS - Husqvarna ===
  { file: "Outros/Husqvarna TC TE TXC SMR 449 511.pdf", brand: "Husqvarna", model: "TC/TE/TXC/SMR 449/511", year: 2012, title: "Manual de Serviço Husqvarna TC TE TXC SMR 449 511" },

  // === OUTROS - Hyosung ===
  { file: "Outros/Hyosung SF50 Service.pdf", brand: "Hyosung", model: "SF 50", year: 2010, title: "Manual de Serviço Hyosung SF 50" },

  // === OUTROS - Genéricos (Honda CB600F capítulos avulsos) ===
  { file: "Outros/BATERIA.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Bateria - Honda CB 600F Hornet" },
  { file: "Outros/CILINDRO.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Cilindro - Honda CB 600F Hornet" },
  { file: "Outros/DIAGRAMA.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Diagrama - Honda CB 600F Hornet" },
  { file: "Outros/IGNICAO.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Ignição - Honda CB 600F Hornet" },
  { file: "Outros/INDICE.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Índice - Honda CB 600F Hornet" },
  { file: "Outros/INFORMAC.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Informações Gerais - Honda CB 600F Hornet" },
  { file: "Outros/LUZES.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Luzes - Honda CB 600F Hornet" },
  { file: "Outros/MANIVELA.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Manivela - Honda CB 600F Hornet" },
  { file: "Outros/MOTOR.pdf", brand: "Honda", model: "CB 600F Hornet", year: 2008, title: "Motor - Honda CB 600F Hornet" },

  // === OUTROS - Catálogos/Tabelas ===
  { file: "Outros/CATALAGO RENTENTORES.pdf", brand: "Outros", model: "Geral", year: 2020, title: "Catálogo de Retentores" },
  { file: "Outros/TABELA GUARDA PO 16 03.pdf", brand: "Outros", model: "Geral", year: 2016, title: "Tabela de Guarda-Pó" },
];

// Sanitizar nome de arquivo para URL
function sanitize(name) {
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

async function main() {
  const srcBase = path.join(process.cwd(), "Manuais de Serviço Motos");
  const destBase = path.join(process.cwd(), "public", "manuais");

  // Criar pasta destino
  fs.mkdirSync(destBase, { recursive: true });

  let imported = 0;
  let errors = 0;

  for (const m of manualMap) {
    const srcPath = path.join(srcBase, m.file);

    if (!fs.existsSync(srcPath)) {
      console.log(`[SKIP] Arquivo não encontrado: ${m.file}`);
      errors++;
      continue;
    }

    // Nome sanitizado para a URL
    const safeName = sanitize(path.basename(m.file));
    const destPath = path.join(destBase, safeName);

    // Copiar arquivo
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }

    const fileUrl = `/manuais/${safeName}`;

    // Inserir no banco (verificar duplicata pelo título)
    const existing = await prisma.manual.findFirst({
      where: { title: m.title },
    });

    if (existing) {
      console.log(`[EXISTE] ${m.title}`);
      continue;
    }

    await prisma.manual.create({
      data: {
        title: m.title,
        brand: m.brand,
        model: m.model,
        year: m.year,
        fileUrl,
      },
    });

    console.log(`[OK] ${m.title} → ${fileUrl}`);
    imported++;
  }

  console.log(`\n=============================`);
  console.log(`Importados: ${imported}`);
  console.log(`Erros/Skips: ${errors}`);
  console.log(`Total manuais no banco: ${await prisma.manual.count()}`);
  console.log(`=============================`);

  await prisma.$disconnect();
}

main().catch(console.error);
