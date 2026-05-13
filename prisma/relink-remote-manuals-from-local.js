const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const SEARCH_ROOTS = [
  path.join(process.cwd(), "Manuais de Serviço Motos"),
  path.join(process.cwd(), "pdfs"),
  path.join(process.cwd(), "public", "manuais"),
];

const STOP_WORDS = new Set([
  "manual",
  "servico",
  "service",
  "workshop",
  "ingles",
  "portugues",
  "espanhol",
  "proprietario",
  "proprietario",
  "diagramas",
  "diagramas",
  "eletrico",
  "eletricos",
  "parts",
  "catalogo",
  "catalogo",
  "de",
  "do",
  "da",
  "e",
  "the",
  "owner",
  "owners",
  "instalar",
  "programa",
]);

function parseArgs(argv) {
  const options = {
    limit: undefined,
    manualId: undefined,
    minScore: 4,
    dryRun: false,
    force: false,
    destSubdir: "relinked",
  };

  for (const arg of argv) {
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--force") options.force = true;
    else if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (Number.isFinite(value) && value > 0) options.limit = value;
    } else if (arg.startsWith("--manual-id=")) {
      options.manualId = arg.slice("--manual-id=".length);
    } else if (arg.startsWith("--min-score=")) {
      const value = Number(arg.slice("--min-score=".length));
      if (Number.isFinite(value)) options.minScore = value;
    } else if (arg.startsWith("--dest-subdir=")) {
      options.destSubdir = arg.slice("--dest-subdir=".length) || options.destSubdir;
    }
  }

  return options;
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !STOP_WORDS.has(token));
}

function compactNormalize(value) {
  return normalizeText(value).replace(/\s+/g, "");
}

function isYearToken(token) {
  return /^(?:19|20)\d{2}$/.test(token);
}

function tokenWeight(token) {
  if (!token || isYearToken(token)) return 0;
  if (/^(?=.*[a-z])(?=.*\d)[a-z\d]+$/i.test(token)) return 6;
  if (/^\d{3,}$/.test(token)) return 1;
  if (/^[a-z]{5,}$/i.test(token)) return 2;
  return 1;
}

function candidateMatchesYear(manualYear, candidateYearTokens) {
  if (!manualYear || candidateYearTokens.length === 0) return true;
  if (candidateYearTokens.includes(String(manualYear))) return true;

  if (candidateYearTokens.length >= 2) {
    const numericYears = candidateYearTokens
      .map((token) => Number(token))
      .filter((value) => Number.isInteger(value));

    if (numericYears.length >= 2) {
      const minYear = Math.min(...numericYears);
      const maxYear = Math.max(...numericYears);
      return manualYear >= minYear && manualYear <= maxYear;
    }
  }

  return false;
}

function sanitizeSegment(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "outros";
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function toLocalUrl(relativePath) {
  return `/${relativePath.split(path.sep).join("/")}`;
}

function walkPdfs(dir, collector) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkPdfs(fullPath, collector);
      continue;
    }

    if (path.extname(entry.name).toLowerCase() !== ".pdf") continue;

    const relativePath = path.relative(process.cwd(), fullPath);
    const baseName = path.basename(entry.name, ".pdf");
    collector.push({
      fullPath,
      relativePath,
      baseName,
      normalizedPath: normalizeText(relativePath),
      compactBaseName: compactNormalize(baseName),
      tokens: tokenize(baseName),
      yearTokens: (baseName.match(/(?:19|20)\d{2}/g) || []),
    });
  }
}

function buildManualTokens(manual) {
  return tokenize(`${manual.title} ${manual.model} ${manual.brand}`);
}

function scoreCandidate(manual, manualTokens, candidate) {
  let score = 0;
  const candidateTokenSet = new Set(candidate.tokens);
  const manualTokenSet = new Set(manualTokens);
  const modelCompact = compactNormalize(manual.model);
  const titleCompact = compactNormalize(manual.title.replace(/^manual de servico\s+/i, ""));
  const manualYear = Number(manual.year || 0);
  let overlapCount = 0;
  let strongOverlap = 0;

  for (const token of manualTokenSet) {
    if (!candidateTokenSet.has(token)) continue;
    overlapCount++;
    const weight = tokenWeight(token);
    score += weight;
    if (weight >= 6) strongOverlap++;
  }

  const brandToken = normalizeText(manual.brand);
  if (brandToken && candidate.normalizedPath.includes(brandToken)) score += 2;

  const modelNormalized = normalizeText(manual.model);
  if (modelNormalized && candidate.normalizedPath.includes(modelNormalized)) score += 4;
  if (modelCompact && candidate.compactBaseName.includes(modelCompact)) score += 8;

  const titleNormalized = normalizeText(manual.title.replace(/^manual de servico\s+/i, ""));
  if (titleNormalized && candidate.normalizedPath.includes(titleNormalized)) score += 5;
  if (titleCompact && candidate.compactBaseName.includes(titleCompact)) score += 6;

  if (!candidateMatchesYear(manualYear, candidate.yearTokens)) return Number.NEGATIVE_INFINITY;
  if (manualYear && candidate.yearTokens.length > 0) score += 1;
  if (overlapCount === 0 && !modelCompact && !titleCompact) score -= 4;
  if (overlapCount === 0 && modelCompact && !candidate.compactBaseName.includes(modelCompact)) score -= 5;
  if (overlapCount === 0 && titleCompact && !candidate.compactBaseName.includes(titleCompact)) score -= 5;
  if (strongOverlap === 0 && !candidate.compactBaseName.includes(modelCompact) && !candidate.compactBaseName.includes(titleCompact)) score -= 3;

  return score;
}

function selectBestCandidate(manual, candidates, minScore) {
  const manualTokens = buildManualTokens(manual);
  const scored = candidates
    .map((candidate) => ({ candidate, score: scoreCandidate(manual, manualTokens, candidate) }))
    .filter((item) => item.score >= minScore)
    .sort((a, b) => b.score - a.score || a.candidate.relativePath.localeCompare(b.candidate.relativePath));

  return scored[0] || null;
}

function buildDestination(manual, destSubdir) {
  const brandDir = sanitizeSegment(manual.brand || "outros");
  const relativeDiskPath = path.join("public", "manuais", destSubdir, brandDir, `${manual.id}.pdf`);
  return {
    diskPath: path.join(process.cwd(), relativeDiskPath),
    fileUrl: toLocalUrl(path.join("manuais", destSubdir, brandDir, `${manual.id}.pdf`)),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const pdfIndex = [];
  for (const root of SEARCH_ROOTS) {
    walkPdfs(root, pdfIndex);
  }

  console.log(`PDFs indexados: ${pdfIndex.length}`);

  const where = options.force ? {} : { NOT: { fileUrl: { startsWith: "/" } } };
  if (options.manualId) where.id = options.manualId;

  const manuals = await prisma.manual.findMany({
    where,
    select: { id: true, title: true, brand: true, model: true, year: true, fileUrl: true },
    orderBy: [{ brand: "asc" }, { title: "asc" }],
    take: options.limit,
  });

  let updated = 0;
  let unmatched = 0;
  const noMatch = [];

  for (const manual of manuals) {
    const best = selectBestCandidate(manual, pdfIndex, options.minScore);
    if (!best) {
      unmatched++;
      noMatch.push({ id: manual.id, title: manual.title, brand: manual.brand, model: manual.model, year: manual.year });
      console.log(`[SEM MATCH] ${manual.title}`);
      continue;
    }

    const destination = buildDestination(manual, options.destSubdir);

    if (options.dryRun) {
      console.log(`[DRY] ${manual.title} -> ${destination.fileUrl} <= ${best.candidate.relativePath} (score ${best.score})`);
      continue;
    }

    if (!fs.existsSync(destination.diskPath)) {
      ensureDir(destination.diskPath);
      fs.copyFileSync(best.candidate.fullPath, destination.diskPath);
    }

    await prisma.manual.update({
      where: { id: manual.id },
      data: { fileUrl: destination.fileUrl },
    });

    console.log(`[OK] ${manual.title} -> ${destination.fileUrl} <= ${best.candidate.relativePath} (score ${best.score})`);
    updated++;
  }

  const reportPath = path.join(process.cwd(), "reports", "relink-remaining-manuals-no-match.json");
  fs.writeFileSync(reportPath, JSON.stringify(noMatch, null, 2));

  const localFiles = await prisma.manual.count({ where: { fileUrl: { startsWith: "/" } } });
  const remoteFiles = await prisma.manual.count({ where: { NOT: { fileUrl: { startsWith: "/" } } } });

  console.log("\nResumo da religacao:");
  console.log(`  Atualizados: ${updated}`);
  console.log(`  Sem match: ${unmatched}`);
  console.log(`  Locais: ${localFiles}`);
  console.log(`  Remotos: ${remoteFiles}`);
  console.log(`  Relatorio sem match: ${reportPath}`);
}

main()
  .catch((error) => {
    console.error("Falha na religacao local:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });