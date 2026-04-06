const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Sanitizar nome de arquivo para URL
function sanitize(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

// Detectar marca a partir da pasta pai ou nome do arquivo
function detectBrand(relativePath, fileName) {
  const upper = relativePath.toUpperCase();
  const fnUpper = fileName.toUpperCase();

  // Pasta Kawasaki
  if (upper.startsWith("KAWASAKI")) return "Kawasaki";
  // Pasta Yamaha
  if (upper.startsWith("YAMAHA")) return "Yamaha";
  // Pasta Outros — detectar pela nome do arquivo
  if (upper.startsWith("OUTROS")) {
    if (/BMW/i.test(fnUpper)) return "BMW";
    if (/TRIUMPH|TIGER|DAYTONA|SPEED\s*TRIPLE/i.test(fnUpper)) return "Triumph";
    if (/SUZUKI|BULEVAR|STROM|MARAUDER|BURGMAN|GSX|HAYABUSA/i.test(fnUpper)) return "Suzuki";
    if (/KAWASAKI|NINJA|KX|ZX|VERSYS|Z\s?\d{3,4}/i.test(fnUpper)) return "Kawasaki";
    if (/YAMAHA|FACTOR|FAZER|NMAX|XJ6|YZF|MT\s?\d/i.test(fnUpper)) return "Yamaha";
    if (/ROYAL|HIMALAYAN|SPEED\s*400/i.test(fnUpper)) return "Royal Enfield";
    if (/HUSQVARNA/i.test(fnUpper)) return "Husqvarna";
    if (/HYOSUNG/i.test(fnUpper)) return "Hyosung";
    if (/SUNDOWN/i.test(fnUpper)) return "Sundown";
    if (/DAFRA/i.test(fnUpper)) return "Dafra";
    if (/KTM/i.test(fnUpper)) return "KTM";
    // Se tem modelo Honda no nome
    if (/CG|CB|CBR|CRF|XRE|NXR|BIZ|POP|PCX|LEAD|NX|XL|CBX|FALCON|HORNET|BROS|TITAN|FAN|CARGO|SHADOW|GOLD\s*WING/i.test(fnUpper)) return "Honda";
    return "Outros";
  }
  // Pasta Honda ou raiz (a maioria dos PDFs na raiz são Honda)
  if (upper.startsWith("HONDA")) return "Honda";

  // Raiz — detectar pela nome
  if (/KAWASAKI|Z\s?650|NINJA|KX|ZX/i.test(fnUpper)) return "Kawasaki";
  if (/YAMAHA|WR\d|XJ6|YZF|FAZER|FACTOR|NMAX/i.test(fnUpper)) return "Yamaha";
  if (/BMW/i.test(fnUpper)) return "BMW";
  if (/TRIUMPH|TIGER|DAYTONA/i.test(fnUpper)) return "Triumph";
  if (/SUZUKI|BULEVAR|STROM/i.test(fnUpper)) return "Suzuki";
  if (/SUNDOWN/i.test(fnUpper)) return "Sundown";
  // Honda models
  if (/CG|CB|CBR|CRF|XRE|NXR|BIZ|POP|PCX|LEAD|NX|XL|CBX|FALCON|HORNET|BROS|TITAN|FAN|CARGO|SHADOW|GOLD|VFR|VTX|VT\d|NC\d|TRX|GL\d|DREAM|CH\d|SPACY/i.test(fnUpper)) return "Honda";
  // Motores/geradores Honda
  if (/^(GX|GCV|GC|GD|GXV|BF|EU|EB|EP|HRR|HRS|HRJ|UMK|WB|WX|G1)/i.test(fnUpper)) return "Honda";
  return "Honda"; // Default para raiz
}

// Detectar modelo do nome do arquivo
function detectModel(fileName, brand) {
  const fn = fileName.replace(/\.pdf$/i, "");

  // Padrões conhecidos de modelos Honda motos
  const hondaPatterns = [
    { regex: /CBR\s*1000\s*RR/i, model: "CBR 1000RR" },
    { regex: /CBR\s*600\s*RR/i, model: "CBR 600RR" },
    { regex: /CBR\s*600\s*F/i, model: "CBR 600F" },
    { regex: /CBR\s*500/i, model: "CBR 500R" },
    { regex: /CBR\s*450/i, model: "CBR 450SR" },
    { regex: /CBR\s*250/i, model: "CBR 250R" },
    { regex: /CBR\s*650/i, model: "CBR 650F" },
    { regex: /CBR\s*900/i, model: "CBR 900RR" },
    { regex: /CB\s*1300/i, model: "CB 1300" },
    { regex: /CB\s*1000/i, model: "CB 1000R" },
    { regex: /CB\s*600\s*F/i, model: "CB 600F Hornet" },
    { regex: /CB\s*500\s*F/i, model: "CB 500F" },
    { regex: /CB\s*500\s*X/i, model: "CB 500X" },
    { regex: /CB\s*500(?!\s*[FX])/i, model: "CB 500" },
    { regex: /CB\s*450\s*(?:CUSTOM|DX)/i, model: "CB 450" },
    { regex: /CB\s*400/i, model: "CB 400" },
    { regex: /CB\s*300/i, model: "CB 300R" },
    { regex: /CB\s*250/i, model: "CB 250F Twister" },
    { regex: /CBX\s*750/i, model: "CBX 750F" },
    { regex: /CBX\s*250/i, model: "CBX 250 Twister" },
    { regex: /CBX\s*200/i, model: "CBX 200 Strada" },
    { regex: /CG\s*160/i, model: "CG 160" },
    { regex: /CG\s*150/i, model: "CG 150 Titan" },
    { regex: /CG\s*125/i, model: "CG 125" },
    { regex: /CRF\s*450/i, model: "CRF 450R" },
    { regex: /CRF\s*250\s*R/i, model: "CRF 250R" },
    { regex: /CRF\s*250\s*X/i, model: "CRF 250X" },
    { regex: /CRF\s*250\s*F/i, model: "CRF 250F" },
    { regex: /CRF\s*230/i, model: "CRF 230F" },
    { regex: /CRF\s*150\s*R/i, model: "CRF 150R" },
    { regex: /CRF\s*150(?!\s*R)/i, model: "CRF 150F" },
    { regex: /CR\s*250/i, model: "CR 250R" },
    { regex: /CR\s*125/i, model: "CR 125R" },
    { regex: /CR\s*80/i, model: "CR 80R" },
    { regex: /XRE\s*300/i, model: "XRE 300" },
    { regex: /XR\s*250/i, model: "XR 250 Tornado" },
    { regex: /XR\s*200/i, model: "XR 200R" },
    { regex: /XR\s*400/i, model: "XR 400R" },
    { regex: /NXR\s*150|NXR150|BROS\s*150/i, model: "NXR 150 Bros" },
    { regex: /NXR\s*125|BROS\s*125/i, model: "NXR 125 Bros" },
    { regex: /NX\s*500|NX500/i, model: "NX 500" },
    { regex: /NX\s*400|NX400|FALCON/i, model: "NX 400i Falcon" },
    { regex: /NX\s*350|SAHARA/i, model: "NX 350 Sahara" },
    { regex: /NX\s*150/i, model: "NX 150" },
    { regex: /BIZ\s*125/i, model: "Biz 125" },
    { regex: /BIZ\s*100|C100.*BIZ/i, model: "Biz 100" },
    { regex: /POP\s*100|POP100/i, model: "Pop 100" },
    { regex: /POP\s/i, model: "Pop 110i" },
    { regex: /PCX/i, model: "PCX 150" },
    { regex: /LEAD/i, model: "Lead 110" },
    { regex: /ELITE\s*125/i, model: "Elite 125" },
    { regex: /C100\s*DREAM|100\s*DREAM/i, model: "C100 Dream" },
    { regex: /SHADOW\s*750/i, model: "Shadow 750" },
    { regex: /GL\s*1800|GOLD\s*WING/i, model: "GL 1800 Gold Wing" },
    { regex: /VFR\s*1200\s*F/i, model: "VFR 1200F" },
    { regex: /VFR\s*1200\s*X/i, model: "VFR 1200X Crosstourer" },
    { regex: /VTX\s*1800/i, model: "VTX 1800C" },
    { regex: /VT\s*600/i, model: "VT 600C Shadow" },
    { regex: /NC\s*700/i, model: "NC 700X" },
    { regex: /NC\s*750/i, model: "NC 750X" },
    { regex: /XL\s*1000|VARADERO/i, model: "XL 1000V Varadero" },
    { regex: /XL\s*700|TRANSALP/i, model: "XL 700V Transalp" },
    { regex: /XL\s*250/i, model: "XL 250R" },
    { regex: /XL\s*125/i, model: "XL 125S" },
    { regex: /XLR\s*125/i, model: "XLR 125" },
    { regex: /XLX\s*350/i, model: "XLX 350R" },
    { regex: /XLX\s*250/i, model: "XLX 250R" },
    { regex: /TRX\s*450/i, model: "TRX 450R" },
    { regex: /TRX\s*420/i, model: "TRX 420" },
    { regex: /CH\s*125|SPACY/i, model: "CH 125R Spacy" },
    // Motores estacionários / geradores / equipamentos
    { regex: /GX\s*620/i, model: "GX 620" },
    { regex: /GX\s*610/i, model: "GX 610" },
    { regex: /GX\s*390/i, model: "GX 390" },
    { regex: /GX\s*340/i, model: "GX 340" },
    { regex: /GX\s*270/i, model: "GX 270" },
    { regex: /GX\s*240/i, model: "GX 240" },
    { regex: /GX\s*200/i, model: "GX 200" },
    { regex: /GX\s*160/i, model: "GX 160" },
    { regex: /GX\s*120/i, model: "GX 120" },
    { regex: /GX\s*110/i, model: "GX 110" },
    { regex: /GX\s*100/i, model: "GX 100" },
    { regex: /GXV\s*270|GXV\s*340/i, model: "GXV 270/340" },
    { regex: /GCV\s*1[356]/i, model: "GCV 135/160" },
    { regex: /GC\s*1[356]/i, model: "GC 135/160" },
    { regex: /GD\s*3[12]|GD\s*4[12]/i, model: "GD 320/410" },
    { regex: /G1[05]0|G200/i, model: "G150/G200" },
    { regex: /G100/i, model: "G100" },
    { regex: /BF\s*20/i, model: "BF 20D" },
    { regex: /BF\s*[28]|BF\s*1[05]/i, model: "BF 2D/8/10/15" },
    { regex: /EU\s*30/i, model: "EU 30is" },
    { regex: /EU\s*20/i, model: "EU 20i" },
    { regex: /EU\s*10|EU\s*1000/i, model: "EU 10i" },
    { regex: /EB\s*1000/i, model: "EB 1000" },
    { regex: /EP\s*3800|EP\s*5000|EP\s*6500/i, model: "EP 3800/5000/6500" },
    { regex: /EP\s*1800|EP\s*2500/i, model: "EP 1800/2500" },
    { regex: /EP\s*650/i, model: "EP 650" },
    { regex: /HRR\s*216/i, model: "HRR 2165" },
    { regex: /HRJ\s*216/i, model: "HRJ 216" },
    { regex: /HRS\s*216/i, model: "HRS 2163" },
    { regex: /UMK\s*43[25]/i, model: "UMK 435" },
    { regex: /UMK\s*42[25]/i, model: "UMK 422" },
    { regex: /WB\s*[23]0/i, model: "WB 20XT/30XT" },
    { regex: /WX\s*10/i, model: "WX 10" },
  ];

  if (brand === "Honda") {
    for (const p of hondaPatterns) {
      if (p.regex.test(fn)) return p.model;
    }
  }

  // Para outras marcas, pegar o nome mais limpo possível
  const cleaned = fn
    .replace(/\d{10,}/g, "") // remove timestamps longos
    .replace(/00X[0-9A-Z\-]+/g, "") // remove códigos Honda
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.substring(0, 60);
}

// Detectar ano do nome do arquivo
function detectYear(fileName) {
  const fn = fileName.replace(/\.pdf$/i, "");

  // Padrão (2020) ou (2013~2014) ou (2006 a 2008)
  let m = fn.match(/\((\d{4})\s*[~a]\s*(\d{4})\)/);
  if (m) return parseInt(m[1]);

  m = fn.match(/\((\d{4})\)/);
  if (m) return parseInt(m[1]);

  // Padrão 2013-20 (código Honda para ano parcial)
  m = fn.match(/(\d{4})-20(?:\.pdf)?$/i);
  if (m) return parseInt(m[1]);

  // Ano no nome como 2006 a 2008
  m = fn.match(/(\d{4})\s*[a~]\s*(\d{4})/);
  if (m) return parseInt(m[1]);

  // Último grupo de 4 dígitos que parece ano (1975-2026)
  const years = fn.match(/\b(19[7-9]\d|20[0-2]\d)\b/g);
  if (years && years.length > 0) return parseInt(years[0]);

  return 2020; // default
}

// Gerar título a partir das informações
function generateTitle(brand, model, year, fileName) {
  const fn = fileName.replace(/\.pdf$/i, "");

  // Verificar se é suplemento, capítulo, etc.
  const isSuplemento = /suplemen/i.test(fn);
  const isCapitulo = /^(cap|0[0-9]|1[0-9]|2[0-4])\s*[-_]/i.test(fn);

  if (isCapitulo) {
    // Tentar extrair nome do capítulo
    const capMatch = fn.match(/[-_]\s*(.+)/);
    const capName = capMatch ? capMatch[1].replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim() : fn;
    return `${capName} - ${brand} ${model}`;
  }

  if (isSuplemento) {
    return `Suplemento ${brand} ${model} (${year})`;
  }

  return `Manual de Serviço ${brand} ${model} (${year})`;
}

async function main() {
  const srcBase = path.join(process.cwd(), "Manuais de Serviço Motos");
  const destBase = path.join(process.cwd(), "public", "manuais");
  fs.mkdirSync(destBase, { recursive: true });

  // Obter todos os fileUrls já no banco
  const existing = await prisma.manual.findMany({ select: { fileUrl: true } });
  const existingUrls = new Set(existing.map(e => e.fileUrl));

  // Escanear todos os PDFs recursivamente
  function getAllPdfs(dir, rel = "") {
    const results = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      const relPath = rel ? `${rel}/${item}` : item;
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results.push(...getAllPdfs(full, relPath));
      } else if (item.toLowerCase().endsWith(".pdf")) {
        results.push({ fullPath: full, relativePath: relPath, fileName: item });
      }
    }
    return results;
  }

  const allPdfs = getAllPdfs(srcBase);
  console.log(`Total PDFs encontrados: ${allPdfs.length}`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const pdf of allPdfs) {
    const safeName = sanitize(pdf.fileName);
    const fileUrl = `/manuais/${safeName}`;

    // Verificar se já está no banco
    if (existingUrls.has(fileUrl)) {
      skipped++;
      continue;
    }

    // Detectar metadados
    const brand = detectBrand(pdf.relativePath, pdf.fileName);
    const model = detectModel(pdf.fileName, brand);
    const year = detectYear(pdf.fileName);
    const title = generateTitle(brand, model, year, pdf.fileName);

    // Copiar para public/manuais/
    const destPath = path.join(destBase, safeName);
    try {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(pdf.fullPath, destPath);
      }
    } catch (err) {
      console.log(`[ERRO COPIA] ${pdf.fileName}: ${err.message}`);
      errors++;
      continue;
    }

    // Inserir no banco
    try {
      await prisma.manual.create({
        data: { title, brand, model, year, fileUrl },
      });
      console.log(`[OK] ${brand} | ${model} | ${year} | ${safeName}`);
      imported++;
    } catch (err) {
      console.log(`[ERRO DB] ${pdf.fileName}: ${err.message}`);
      errors++;
    }
  }

  const total = await prisma.manual.count();
  console.log(`\n========================================`);
  console.log(`Novos importados : ${imported}`);
  console.log(`Já existentes    : ${skipped}`);
  console.log(`Erros            : ${errors}`);
  console.log(`Total no banco   : ${total}`);
  console.log(`========================================`);

  await prisma.$disconnect();
}

main().catch(console.error);
