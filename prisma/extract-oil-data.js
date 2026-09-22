/**
 * Script para extrair dados de óleo de suspensão dos manuais de serviço em PDF.
 * 
 * Uso: node prisma/extract-oil-data.js
 * 
 * Busca em todas as pastas de PDFs locais e tenta encontrar informações sobre:
 * - Volume de óleo de suspensão (ml)
 * - Nível de fluido (mm)
 * - Óleo do motor (L)
 */

const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

// Pastas onde os PDFs podem estar
const PDF_DIRS = [
  path.join(__dirname, "..", "pdfs", "Outros"),
  path.join(__dirname, "..", "Manuais de Serviço Motos", "Honda"),
  path.join(__dirname, "..", "Manuais de Serviço Motos", "Yamaha"),
  path.join(__dirname, "..", "Manuais de Serviço Motos", "Kawasaki"),
];

// Regex patterns para encontrar dados de suspensão
const PATTERNS = {
  // Volume de óleo de suspensão em ml/cm³
  suspensionOil: [
    // "Capacidade de fluido176 ± 2,5 cm\n3" (Honda format - cm³ quebrado em 2 linhas)
    /(?:capacidade\s*de\s*(?:flu[ií]do|óleo|oleo))\s*(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*cm[\s\n]*3/gi,
    // "CAPACIDADE DE ÓLEO DE GARFO:\n637 cm\n3"
    /(?:capacidade\s*de\s*(?:óleo|oleo)\s*(?:de\s*)?(?:garfo|fork|suspens[aã]o))[\s\S]{0,30}?(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*cm[\s\n]*3/gi,
    // "Capacidade de óleo637 cm\n3"
    /(?:capacidade\s*de\s*(?:óleo|oleo))\s*(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*cm[\s\n]*3/gi,
    // "CAPACIDADE DE FluIDO PARA O GARFO DA SuSPENSÃO: 72 ± 1 cm\n3"
    /(?:capacidade\s*de\s*flu[ií]do\s*(?:para\s*o\s*)?(?:garfo|fork|suspens))[\s\S]{0,60}?(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*cm[\s\n]*3/gi,
    // Original patterns with ml
    /(?:óleo|oleo|oil)\s*(?:de\s*)?(?:suspens[aã]o|fork|garfo|dianteira)[\s\S]{0,120}?(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*(?:ml|cm³|cc)/gi,
    /(?:suspens[aã]o|fork|garfo)\s*(?:dianteira)?[\s\S]{0,120}?(?:capacidade|volume|quantidade)[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*(?:ml|cm³|cc)/gi,
    /(?:fork)\s*(?:oil)?[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*(?:ml|cm³|cc)/gi,
    /(\d{2,4}[\.,]?\d*)\s*(?:±\s*\d+[\.,]?\d*)?\s*(?:ml|cm³|cc)[\s\S]{0,60}?(?:suspens|fork|garfo)/gi,
  ],
  // Nível de fluido em mm
  fluidLevel: [
    // "Nível de fluido178" or "Nível de fluido143" (Honda - sem unidade explícita, mas vem de tabela em mm)
    /(?:n[ií]vel\s*de\s*(?:flu[ií]do|óleo|oleo))[\s:]?\s*(\d+[\.,]?\d*)/gi,
    /(?:n[ií]vel|level|altura)[\s\S]{0,100}?(?:flu[ií]do|óleo|oleo|oil)[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:mm)/gi,
    /(?:flu[ií]do|óleo|oleo)[\s\S]{0,80}?(?:n[ií]vel|level|altura)[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:mm)/gi,
    /(?:oil\s*level)[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:mm)/gi,
  ],
  // Óleo do motor em litros
  engineOil: [
    // "Capacidade de óleo do motor Após a drenagem1,4 litro" or "1,0 litro"
    /(?:capacidade\s*de\s*(?:óleo|oleo)\s*(?:do\s*)?motor)[\s\S]{0,80}?(?:drenagem|dreno)\s*(\d+[\.,]?\d*)\s*(?:L|l|litro|liter)/gi,
    /(?:óleo|oleo|oil)\s*(?:do\s*)?(?:motor|engine)[\s\S]{0,120}?(\d+[\.,]?\d*)\s*(?:L|litro|liter)/gi,
    /(?:motor|engine)\s*(?:oil|óleo|oleo)[\s\S]{0,120}?(\d+[\.,]?\d*)\s*(?:L|litro|liter)/gi,
    /(?:capacidade|volume)[\s\S]{0,80}?(?:motor|engine)[\s\S]{0,80}?(\d+[\.,]?\d*)\s*(?:L|litro)/gi,
  ],
};

function findPdfFiles() {
  const files = [];
  for (const dir of PDF_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.toLowerCase().endsWith(".pdf")) {
        files.push(path.join(dir, entry));
      }
    }
  }
  return files;
}

function extractMatches(text, patterns) {
  const results = [];
  for (const pattern of patterns) {
    // Reset lastIndex for global regex
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      results.push({
        value: match[1],
        context: text.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50).replace(/\n/g, " ").trim(),
      });
    }
  }
  return results;
}

function extractSuspensionSection(text) {
  // Tenta encontrar seções específicas sobre suspensão
  const sectionPatterns = [
    /(?:suspens[aã]o\s*dianteira|front\s*fork|garfo\s*dianteiro|especifica[çc][õo]es\s*de\s*servi[çc]o)[\s\S]{0,3000}/gi,
    /(?:tabela\s*de\s*manuten[çc][aã]o|maintenance\s*data|dados\s*de\s*manuten)[\s\S]{0,3000}/gi,
    /(?:especifica[çc][õo]es|specifications)[\s\S]{0,5000}/gi,
  ];

  const sections = [];
  for (const pattern of sectionPatterns) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      sections.push(match[0]);
    }
  }
  return sections;
}

async function processPdf(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n${"=".repeat(70)}`);
  console.log(`📄 Processando: ${fileName}`);
  console.log(`   Caminho: ${filePath}`);
  console.log("=".repeat(70));

  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    const text = data.text;
    const totalChars = text.length;
    const totalPages = data.numpages;

    console.log(`   📊 ${totalPages} páginas | ${totalChars} caracteres extraídos`);

    if (totalChars < 100) {
      console.log("   ⚠️  PDF parece ser baseado em imagens (pouco texto extraído). Precisaria de OCR.");
      return { file: fileName, status: "scan/imagem", data: null };
    }

    // Buscar seções relevantes
    const sections = extractSuspensionSection(text);
    console.log(`   🔍 ${sections.length} seção(ões) relevante(s) encontrada(s)`);

    // Buscar dados de óleo de suspensão
    const suspensionResults = extractMatches(text, PATTERNS.suspensionOil);
    const fluidResults = extractMatches(text, PATTERNS.fluidLevel);
    const engineResults = extractMatches(text, PATTERNS.engineOil);

    const result = {
      file: fileName,
      status: "processado",
      pages: totalPages,
      charsExtracted: totalChars,
      suspensionOil: suspensionResults,
      fluidLevel: fluidResults,
      engineOil: engineResults,
      relevantSections: sections.slice(0, 2).map(s => s.substring(0, 500)),
    };

    // Resultado resumido
    if (suspensionResults.length > 0) {
      console.log(`   ✅ ÓLEO SUSPENSÃO encontrado (${suspensionResults.length} ocorrência(s)):`);
      for (const r of suspensionResults.slice(0, 3)) {
        console.log(`      → ${r.value} ml | Contexto: "${r.context.substring(0, 100)}..."`);
      }
    } else {
      console.log("   ❌ Óleo de suspensão NÃO encontrado");
    }

    if (fluidResults.length > 0) {
      console.log(`   ✅ NÍVEL FLUIDO encontrado (${fluidResults.length} ocorrência(s)):`);
      for (const r of fluidResults.slice(0, 3)) {
        console.log(`      → ${r.value} mm | Contexto: "${r.context.substring(0, 100)}..."`);
      }
    } else {
      console.log("   ❌ Nível de fluido NÃO encontrado");
    }

    if (engineResults.length > 0) {
      console.log(`   ✅ ÓLEO MOTOR encontrado (${engineResults.length} ocorrência(s)):`);
      for (const r of engineResults.slice(0, 3)) {
        console.log(`      → ${r.value} L | Contexto: "${r.context.substring(0, 100)}..."`);
      }
    } else {
      console.log("   ❌ Óleo do motor NÃO encontrado");
    }

    // Mostra trecho das seções relevantes
    if (sections.length > 0) {
      console.log(`\n   📋 Trecho da seção relevante:`);
      console.log(`   "${sections[0].substring(0, 300).replace(/\n/g, " ")}..."`);
    }

    return result;
  } catch (err) {
    console.log(`   ❌ ERRO ao processar: ${err.message}`);
    return { file: fileName, status: "erro", error: err.message };
  }
}

async function main() {
  console.log("🔧 Extrator de dados de óleo de suspensão dos manuais de serviço");
  console.log("".padStart(70, "="));

  const files = findPdfFiles();
  console.log(`\n📁 ${files.length} PDF(s) encontrado(s) nas pastas locais:\n`);
  for (const f of files) {
    console.log(`   - ${path.basename(f)}`);
  }

  if (files.length === 0) {
    console.log("\n⚠️  Nenhum PDF encontrado. Coloque os manuais nas pastas corretas.");
    return;
  }

  const allResults = [];
  for (const file of files) {
    const result = await processPdf(file);
    allResults.push(result);
  }

  // Resumo final
  console.log(`\n\n${"=".repeat(70)}`);
  console.log("📊 RESUMO FINAL");
  console.log("=".repeat(70));

  const processed = allResults.filter(r => r.status === "processado");
  const scans = allResults.filter(r => r.status === "scan/imagem");
  const errors = allResults.filter(r => r.status === "erro");
  const withSuspension = processed.filter(r => r.suspensionOil.length > 0);

  console.log(`\n   Total de PDFs: ${allResults.length}`);
  console.log(`   ✅ Processados com texto: ${processed.length}`);
  console.log(`   🖼️  Scans/imagem (precisa OCR): ${scans.length}`);
  console.log(`   ❌ Erros: ${errors.length}`);
  console.log(`   🛢️  Com dados de suspensão: ${withSuspension.length}`);

  if (withSuspension.length > 0) {
    console.log(`\n   📋 PDFs com dados de óleo de suspensão extraídos:`);
    for (const r of withSuspension) {
      console.log(`      - ${r.file}: ${r.suspensionOil.map(s => s.value + " ml").join(", ")}`);
    }
  }

  // Salvar resultado em JSON
  const outputPath = path.join(__dirname, "..", "oil-extraction-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2), "utf-8");
  console.log(`\n   💾 Resultado completo salvo em: oil-extraction-results.json`);
}

main().catch(console.error);
