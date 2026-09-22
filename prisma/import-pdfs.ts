import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface ManualEntry {
  title: string;
  brand: string;
  model: string;
  year: number;
  fileUrl: string;
}

// Mapeamento manual de cada PDF para dados corretos
const pdfMappings: Record<string, Omit<ManualEntry, "fileUrl">> = {
  // === HONDA ===
  "150 Fan Titan EX ESI 2009-10 (2).pdf": { title: "Manual de Serviço CG 150 Fan / Titan EX ESI", brand: "Honda", model: "CG 150 Fan / Titan", year: 2009 },
  "160 StartFanTitanCargo.pdf": { title: "Manual de Serviço CG 160 Start / Fan / Titan / Cargo", brand: "Honda", model: "CG 160", year: 2016 },
  "biz 125 ano a 2011 2012.pdf": { title: "Manual de Serviço Biz 125", brand: "Honda", model: "Biz 125", year: 2011 },
  "Cap 18 Sistema Ignicao CB600F.pdf": { title: "CB600F Hornet - Sistema de Ignição (Cap. 18)", brand: "Honda", model: "CB 600F Hornet", year: 2008 },
  "Cap 22 Diagramas Eletricos CB600F.pdf": { title: "CB600F Hornet - Diagramas Elétricos (Cap. 22)", brand: "Honda", model: "CB 600F Hornet", year: 2008 },
  "CB 300R 2009 (2).pdf": { title: "Manual de Serviço CB 300R", brand: "Honda", model: "CB 300R", year: 2009 },
  "CB 600F Hornet.pdf": { title: "Manual de Serviço CB 600F Hornet", brand: "Honda", model: "CB 600F Hornet", year: 2007 },
  "CB500X CBR500 CB500F 15 2013-20.pdf": { title: "Manual de Serviço CB500X / CBR500R / CB500F", brand: "Honda", model: "CB500X / CBR500R / CB500F", year: 2013 },
  "CBR1000RR 14 Service 2008-20.pdf": { title: "Manual de Serviço CBR1000RR Fireblade", brand: "Honda", model: "CBR 1000RR", year: 2008 },
  "CG160 Fan ESDi CG160 Titan EX.pdf": { title: "Manual de Serviço CG 160 Fan ESDi / Titan EX", brand: "Honda", model: "CG 160 Fan / Titan", year: 2016 },
  "crf250f 19 22.pdf": { title: "Manual de Serviço CRF 250F", brand: "Honda", model: "CRF 250F", year: 2019 },
  "62KZZ00 CRF250L13 OM (2).pdf": { title: "Manual do Proprietário CRF 250L", brand: "Honda", model: "CRF 250L", year: 2013 },
  "fan125i.pdf": { title: "Manual de Serviço Fan 125i", brand: "Honda", model: "Fan 125i", year: 2015 },
  "manualdeserviocb600fhornetms suplemento 00x6b mbz 002 140929080240 phpapp01 2006.pdf": { title: "Manual de Serviço CB600F Hornet - Suplemento", brand: "Honda", model: "CB 600F Hornet", year: 2006 },
  "MS FALCON 08 MS SUP 1 2000-20.pdf": { title: "Manual de Serviço NX 400i Falcon", brand: "Honda", model: "NX 400i Falcon", year: 2008 },
  "MS NC750X X DCT 2022.pdf": { title: "Manual de Serviço NC 750X DCT", brand: "Honda", model: "NC 750X", year: 2022 },
  "NX400i FALCON Capitulo 10 Cilindro Pistao 2012-20.pdf": { title: "NX400i Falcon - Cilindro e Pistão (Cap. 10)", brand: "Honda", model: "NX 400i Falcon", year: 2012 },
  "NXR150 Bros 2009-11.pdf": { title: "Manual de Serviço NXR 150 Bros", brand: "Honda", model: "NXR 150 Bros", year: 2009 },
  "XRE 300 2009-10.pdf": { title: "Manual de Serviço XRE 300", brand: "Honda", model: "XRE 300", year: 2009 },
  "XRE 300 A 2016-20.pdf": { title: "Manual de Serviço XRE 300 (ABS)", brand: "Honda", model: "XRE 300", year: 2016 },
  "Twister Nueva www clubtwister com ar.pdf": { title: "Manual de Serviço CB 250 Twister", brand: "Honda", model: "CB 250 Twister", year: 2016 },

  // === YAMAHA ===
  "FACTOR 125I BLUEFLEX 2019.pdf": { title: "Manual de Serviço Factor 125i BlueFlex", brand: "Yamaha", model: "Factor 125i", year: 2019 },
  "FAZER 150 2013 2014.pdf": { title: "Manual de Serviço Fazer 150", brand: "Yamaha", model: "Fazer 150", year: 2013 },
  "ManualServicosYZF-R62008MotosBlog_260326_231340.pdf": { title: "Manual de Serviço YZF-R6", brand: "Yamaha", model: "YZF-R6", year: 2008 },
  "MS XJ6F XJ6F 2015.pdf": { title: "Manual de Serviço XJ6F", brand: "Yamaha", model: "XJ6F", year: 2015 },
  "NMAX 160 2020.pdf": { title: "Manual de Serviço NMAX 160 (2020)", brand: "Yamaha", model: "NMAX 160", year: 2020 },
  "NMAX 160 2021.pdf": { title: "Manual de Serviço NMAX 160 (2021)", brand: "Yamaha", model: "NMAX 160", year: 2021 },
  "NMAX 160 ate 2020.pdf": { title: "Manual de Serviço NMAX 160 (até 2020)", brand: "Yamaha", model: "NMAX 160", year: 2019 },
  "WR250F Service PDF 2006.pdf": { title: "Manual de Serviço WR250F", brand: "Yamaha", model: "WR 250F", year: 2006 },
  "XJ6 N 2010.pdf": { title: "Manual de Serviço XJ6 N", brand: "Yamaha", model: "XJ6 N", year: 2010 },
  "XJ6N 2013.pdf": { title: "Manual de Serviço XJ6 N (2013)", brand: "Yamaha", model: "XJ6 N", year: 2013 },

  // === BMW ===
  "BMW F 650 GS DAKAR WIRING DIAGRAMS R ENG.pdf": { title: "BMW F 650 GS Dakar - Diagramas Elétricos", brand: "BMW", model: "F 650 GS Dakar", year: 2004 },
  "BMW F 650 WIRING DIAGRAM ENG 1994-20.pdf": { title: "BMW F 650 - Diagrama Elétrico", brand: "BMW", model: "F 650", year: 1994 },
  "BMW F650GS.pdf": { title: "Manual de Serviço BMW F 650 GS", brand: "BMW", model: "F 650 GS", year: 2005 },
  "Bmw G 310 gs Taller k02 1.pdf": { title: "Manual de Serviço BMW G 310 GS", brand: "BMW", model: "G 310 GS", year: 2018 },
  "Bmw S 1000 rr Taller k46 13.pdf": { title: "Manual de Serviço BMW S 1000 RR", brand: "BMW", model: "S 1000 RR", year: 2013 },

  // === KAWASAKI ===
  "MS KX450 PORT 2020.pdf": { title: "Manual de Serviço KX 450", brand: "Kawasaki", model: "KX 450", year: 2020 },
  "MS NINJA 400 PORT 2019.pdf": { title: "Manual de Serviço Ninja 400", brand: "Kawasaki", model: "Ninja 400", year: 2019 },
  "Z 650 20 portugues 2017-20.pdf": { title: "Manual de Serviço Z 650", brand: "Kawasaki", model: "Z 650", year: 2017 },

  // === SUZUKI ===
  "bulevar 800.pdf": { title: "Manual de Serviço Boulevard 800", brand: "Suzuki", model: "Boulevard M800", year: 2005 },
  "DL V STROM 650 espanhol 2017 2020.pdf": { title: "Manual de Serviço V-Strom 650", brand: "Suzuki", model: "DL V-Strom 650", year: 2017 },
  "MS Marauder VZ 800 04 99500 38036 03E 1997.pdf": { title: "Manual de Serviço Marauder VZ 800", brand: "Suzuki", model: "Marauder VZ 800", year: 1997 },

  // === TRIUMPH ===
  "675 speedtriple daytona 675r TRIUMPH ServiceManual T3856909 2013.pdf": { title: "Manual de Serviço Speed Triple / Daytona 675R", brand: "Triumph", model: "Speed Triple / Daytona 675R", year: 2013 },
  "Daytona 675 Service BPT.pdf": { title: "Manual de Serviço Daytona 675", brand: "Triumph", model: "Daytona 675", year: 2006 },
  "MS TRI Tiger 1200EXPL 15 2012-20.pdf": { title: "Manual de Serviço Tiger 1200 Explorer", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2012 },
  "new Triumph Tiger Explorer 1200 2016-20.pdf": { title: "Manual de Serviço Tiger Explorer 1200 (New)", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2016 },
  "tiger 1200 explorer tiger 1200 2018.pdf": { title: "Manual de Serviço Tiger 1200 Explorer (2018)", brand: "Triumph", model: "Tiger 1200 Explorer", year: 2018 },
  "tiger 800 2015.pdf": { title: "Manual de Serviço Tiger 800", brand: "Triumph", model: "Tiger 800", year: 2015 },
  "TIGER 900 RALLY PRO 21 23 portugues.pdf": { title: "Manual de Serviço Tiger 900 Rally Pro", brand: "Triumph", model: "Tiger 900 Rally Pro", year: 2021 },
  "TRIUMPH TIGER 900 GT 2020 2023.pdf": { title: "Manual de Serviço Tiger 900 GT", brand: "Triumph", model: "Tiger 900 GT", year: 2020 },
  "SPEED 400.pdf": { title: "Manual de Serviço Speed 400", brand: "Triumph", model: "Speed 400", year: 2023 },

  // === ROYAL ENFIELD ===
  "MS 410 HIMALAYAN.pdf": { title: "Manual de Serviço Himalayan 410", brand: "Royal Enfield", model: "Himalayan 410", year: 2018 },

  // === HUSQVARNA ===
  "Husqvarna TC TE TXC SMR 449 511.pdf": { title: "Manual de Serviço TC/TE/TXC/SMR 449/511", brand: "Husqvarna", model: "TC/TE/TXC 449/511", year: 2012 },

  // === HYOSUNG ===
  "Hyosung SF50 Service.pdf": { title: "Manual de Serviço SF50", brand: "Hyosung", model: "SF50", year: 2010 },

  // === REFERÊNCIA TÉCNICA (sem modelo específico) ===
  "BATERIA.pdf": { title: "Manual Técnico - Bateria", brand: "Referência", model: "Geral - Bateria", year: 2020 },
  "CILINDRO.pdf": { title: "Manual Técnico - Cilindro", brand: "Referência", model: "Geral - Cilindro", year: 2020 },
  "DIAGRAMA.pdf": { title: "Manual Técnico - Diagrama Elétrico", brand: "Referência", model: "Geral - Elétrica", year: 2020 },
  "IGNICAO.pdf": { title: "Manual Técnico - Ignição", brand: "Referência", model: "Geral - Ignição", year: 2020 },
  "INDICE.pdf": { title: "Índice de Manuais", brand: "Referência", model: "Índice Geral", year: 2020 },
  "INFORMAC.pdf": { title: "Informações Técnicas Gerais", brand: "Referência", model: "Informações Gerais", year: 2020 },
  "LUZES.pdf": { title: "Manual Técnico - Sistema de Luzes", brand: "Referência", model: "Geral - Luzes", year: 2020 },
  "MANIVELA.pdf": { title: "Manual Técnico - Manivela / Virabrequim", brand: "Referência", model: "Geral - Virabrequim", year: 2020 },
  "MOTOR.pdf": { title: "Manual Técnico - Motor", brand: "Referência", model: "Geral - Motor", year: 2020 },
  "CATALAGO RENTENTORES.pdf": { title: "Catálogo de Retentores", brand: "Referência", model: "Catálogo Retentores", year: 2020 },
  "TABELA GUARDA PO 16 03.pdf": { title: "Tabela de Guarda-Pó", brand: "Referência", model: "Tabela Guarda-Pó", year: 2016 },
};

async function importPdfs() {
  const manuaisDir = path.join(process.cwd(), "public", "manuais");

  // Verificar se a pasta existe
  if (!fs.existsSync(manuaisDir)) {
    console.error("❌ Pasta public/manuais não encontrada!");
    process.exit(1);
  }

  const pdfFiles = fs.readdirSync(manuaisDir).filter((f) => f.endsWith(".pdf"));
  console.log(`📂 Encontrados ${pdfFiles.length} PDFs em public/manuais/\n`);

  // Limpar manuais antigos (seed dummy data)
  const deleted = await prisma.manual.deleteMany({});
  console.log(`🗑️  Removidos ${deleted.count} manuais antigos do banco\n`);

  let imported = 0;
  let skipped = 0;

  for (const fileName of pdfFiles) {
    const mapping = pdfMappings[fileName];
    if (!mapping) {
      console.log(`⚠️  Sem mapeamento: ${fileName}`);
      skipped++;
      continue;
    }

    const fileUrl = `/manuais/${encodeURIComponent(fileName)}`;

    await prisma.manual.create({
      data: {
        title: mapping.title,
        brand: mapping.brand,
        model: mapping.model,
        year: mapping.year,
        fileUrl,
      },
    });

    imported++;
    console.log(`✅ ${mapping.brand} - ${mapping.title}`);
  }

  console.log(`\n🏁 Importação concluída!`);
  console.log(`   ✅ Importados: ${imported}`);
  console.log(`   ⚠️  Ignorados: ${skipped}`);
  console.log(`   📊 Total no banco: ${await prisma.manual.count()}`);
}

importPdfs()
  .catch((e) => {
    console.error("Erro na importação:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
