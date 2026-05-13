import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files";
const DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder";
const PDF_MIME = "application/pdf";
const DEFAULT_YEAR = 2000;

type ManualCategory = "servico" | "catalogo";
type StorageMode = "drive" | "local";

interface CliOptions {
  folderId: string;
  apiKey?: string;
  accessToken?: string;
  manifestPath?: string;
  category?: ManualCategory;
  storage: StorageMode;
  destSubdir: string;
  dryRun: boolean;
  limit?: number;
}

interface DriveListResponse {
  nextPageToken?: string;
  files?: Array<{
    id: string;
    name: string;
    mimeType: string;
    resourceKey?: string;
  }>;
}

interface DrivePdfFile {
  id: string;
  name: string;
  mimeType: string;
  relativePath: string;
  resourceKey?: string;
}

interface ManifestEntry {
  fileId?: string;
  name?: string;
  path?: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number;
  category?: ManualCategory;
  skip?: boolean;
}

interface ManifestIndex {
  byFileId: Map<string, ManifestEntry>;
  byName: Map<string, ManifestEntry>;
  byPath: Map<string, ManifestEntry>;
}

interface ManualMetadata {
  title: string;
  brand: string;
  model: string;
  year: number;
  category: ManualCategory;
}

const BRAND_ALIASES: Array<{ brand: string; aliases: string[] }> = [
  { brand: "Honda", aliases: ["honda", "cbr", "cb ", "cg ", "xre", "bros", "biz", "hornet", "falcon", "twister", "nc750", "nc 750"] },
  { brand: "Yamaha", aliases: ["yamaha", "factor", "fazer", "xj6", "mt-", "mt ", "nmax", "yzf", "wr250", "lander", "tenere"] },
  { brand: "Kawasaki", aliases: ["kawasaki", "ninja", "z 650", "z650", "versys", "er-6", "kx "] },
  { brand: "Suzuki", aliases: ["suzuki", "v-strom", "v strom", "boulevard", "marauder", "burgman", "gsx"] },
  { brand: "BMW", aliases: ["bmw", "f 650", "f650", "g 310", "g310", "s 1000", "s1000", "gs "] },
  { brand: "Triumph", aliases: ["triumph", "tiger", "daytona", "speed triple", "street triple", "speed 400"] },
  { brand: "Royal Enfield", aliases: ["royal enfield", "himalayan", "meteor", "interceptor", "continental gt"] },
  { brand: "Husqvarna", aliases: ["husqvarna", "svartpilen", "vitpilen", "te ", "tc ", "txc "] },
  { brand: "KTM", aliases: ["ktm", "duke", "adventure", "exc", "sx "] },
  { brand: "Ducati", aliases: ["ducati", "monster", "panigale", "multistrada", "scrambler"] },
  { brand: "Harley-Davidson", aliases: ["harley", "harley-davidson", "sportster", "softail", "touring"] },
  { brand: "Dafra", aliases: ["dafra", "next 250", "citycom", "apache"] },
  { brand: "Haojue", aliases: ["haojue", "dk 150", "dr 160", "chopper road"] },
  { brand: "Shineray", aliases: ["shineray", "xy ", "worker"] },
  { brand: "Hyosung", aliases: ["hyosung", "sf50", "comet"] },
  { brand: "Referência", aliases: ["referencia", "referência", "tecnico", "tecnica", "tabela", "diagrama"] },
];

function printUsage() {
  console.log(`
Importa PDFs de uma pasta do Google Drive para a tabela manuals.

Uso:
  npm run import:drive -- --folder=GOOGLE_DRIVE_FOLDER_ID_ou_URL [opcoes]

Opcoes:
  --folder=ID|URL          ID ou URL da pasta raiz no Google Drive
  --api-key=KEY            API key do Google Drive para pasta publica
  --token=TOKEN            Access token OAuth/Service Account para pasta privada
  --manifest=arquivo.json  Overrides de metadata por fileId, nome ou path
  --category=servico       Categoria padrao: servico ou catalogo
  --storage=drive          Salva fileUrl apontando para o Google Drive
  --storage=local          Baixa os PDFs para public/manuais/drive-import
  --dest-subdir=dir        Subpasta local quando storage=local
  --limit=100              Limita a quantidade de arquivos processados
  --dry-run                Nao grava no banco nem baixa arquivos

Variaveis de ambiente:
  GOOGLE_DRIVE_FOLDER_ID
  GOOGLE_DRIVE_FOLDER_URL
  GOOGLE_DRIVE_API_KEY
  GOOGLE_DRIVE_ACCESS_TOKEN
  GOOGLE_DRIVE_MANIFEST
  GOOGLE_DRIVE_CATEGORY
  GOOGLE_DRIVE_STORAGE
  GOOGLE_DRIVE_DEST_SUBDIR
`);
}

function extractFolderId(input: string): string {
  const trimmed = input.trim();
  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);

  if (folderMatch?.[1]) {
    return folderMatch[1];
  }

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return trimmed;
  }

  throw new Error("Nao foi possivel extrair o ID da pasta do Google Drive.");
}

function parseArgs(argv: string[]): CliOptions {
  const values = new Map<string, string>();
  const flags = new Set<string>();

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;

    const trimmed = arg.slice(2);
    const eqIndex = trimmed.indexOf("=");

    if (eqIndex === -1) {
      flags.add(trimmed);
      continue;
    }

    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1);
    values.set(key, value);
  }

  if (flags.has("help")) {
    printUsage();
    process.exit(0);
  }

  const folderInput = values.get("folder") || process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_URL || "";
  const apiKey = values.get("api-key") || process.env.GOOGLE_DRIVE_API_KEY;
  const accessToken = values.get("token") || process.env.GOOGLE_DRIVE_ACCESS_TOKEN;
  const manifestPath = values.get("manifest") || process.env.GOOGLE_DRIVE_MANIFEST;
  const categoryValue = values.get("category") || process.env.GOOGLE_DRIVE_CATEGORY;
  const storageValue = values.get("storage") || process.env.GOOGLE_DRIVE_STORAGE || "drive";
  const destSubdir = values.get("dest-subdir") || process.env.GOOGLE_DRIVE_DEST_SUBDIR || "drive-import";
  const limitValue = values.get("limit");

  if (!folderInput) {
    console.error("Erro: informe --folder=ID/URL, GOOGLE_DRIVE_FOLDER_ID ou GOOGLE_DRIVE_FOLDER_URL.");
    printUsage();
    process.exit(1);
  }

  let folderId = "";

  try {
    folderId = extractFolderId(folderInput);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Erro: ${message}`);
    process.exit(1);
  }

  if (!apiKey && !accessToken) {
    console.error("Erro: informe --api-key/GOOGLE_DRIVE_API_KEY para pasta publica ou --token/GOOGLE_DRIVE_ACCESS_TOKEN para pasta privada.");
    process.exit(1);
  }

  const storage = storageValue === "local" ? "local" : "drive";
  const category = categoryValue === "catalogo" ? "catalogo" : categoryValue === "servico" ? "servico" : undefined;
  const limit = limitValue ? Number(limitValue) : undefined;

  if (limitValue && (!Number.isFinite(limit) || Number(limit) <= 0)) {
    console.error("Erro: --limit deve ser um numero inteiro positivo.");
    process.exit(1);
  }

  return {
    folderId,
    apiKey,
    accessToken,
    manifestPath,
    category,
    storage,
    destSubdir,
    dryRun: flags.has("dry-run"),
    limit,
  };
}

function normalizeLookup(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\\/g, "/")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function sanitizeSegment(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "arquivo";
}

function toLocalUrl(relativePath: string): string {
  return `/${relativePath.split(path.sep).join("/")}`;
}

function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function buildDriveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

function buildDriveDownloadApiUrl(fileId: string): string {
  return `${DRIVE_API_BASE}/${fileId}?alt=media`;
}

function isDriveDownloadForbidden(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /\b(401|403)\b/.test(message);
}

function buildDriveHeaders(options: CliOptions, resourceKeyPairs: string[] = []): HeadersInit | undefined {
  const headers: Record<string, string> = {};

  if (options.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  if (resourceKeyPairs.length > 0) {
    headers["X-Goog-Drive-Resource-Keys"] = resourceKeyPairs.join(",");
  }

  return Object.keys(headers).length > 0 ? headers : undefined;
}

function buildFileResourceKeyPair(file: { id: string; resourceKey?: string }): string[] {
  return file.resourceKey ? [`${file.id}/${file.resourceKey}`] : [];
}

function appendResourceKey(url: URL, resourceKey?: string) {
  if (resourceKey) {
    url.searchParams.set("resourceKey", resourceKey);
  }
}

function readManifest(manifestPath?: string): ManifestIndex {
  const empty: ManifestIndex = {
    byFileId: new Map(),
    byName: new Map(),
    byPath: new Map(),
  };

  if (!manifestPath) return empty;

  const resolvedPath = path.isAbsolute(manifestPath)
    ? manifestPath
    : path.join(process.cwd(), manifestPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Manifesto nao encontrado: ${resolvedPath}`);
  }

  const raw = fs.readFileSync(resolvedPath, "utf8");
  const parsed = JSON.parse(raw) as ManifestEntry[] | { items?: ManifestEntry[] };
  const items = Array.isArray(parsed) ? parsed : parsed.items || [];

  const manifest: ManifestIndex = {
    byFileId: new Map(),
    byName: new Map(),
    byPath: new Map(),
  };

  for (const item of items) {
    if (item.fileId) manifest.byFileId.set(item.fileId, item);
    if (item.name) manifest.byName.set(normalizeLookup(item.name), item);
    if (item.path) manifest.byPath.set(normalizeLookup(item.path), item);
  }

  return manifest;
}

function getManifestEntry(manifest: ManifestIndex, file: DrivePdfFile): ManifestEntry | undefined {
  return (
    manifest.byFileId.get(file.id) ||
    manifest.byPath.get(normalizeLookup(file.relativePath)) ||
    manifest.byName.get(normalizeLookup(file.name))
  );
}

function detectBrand(input: string): string {
  const normalized = normalizeLookup(input);

  for (const item of BRAND_ALIASES) {
    if (item.aliases.some((alias) => normalized.includes(alias))) {
      return item.brand;
    }
  }

  const firstFolder = input.split(/[\\/]/).find(Boolean);
  return firstFolder ? firstFolder.replace(/[-_]+/g, " ") : "Outros";
}

function detectCategory(input: string, defaultCategory: ManualCategory = "servico"): ManualCategory {
  const normalized = normalizeLookup(input);
  if (/(catalogo|cat[aá]logo|parts catalog|pecas|pe[çc]as|microficha)/.test(normalized)) {
    return "catalogo";
  }
  return defaultCategory;
}

function detectYear(input: string): number {
  const matches = input.match(/(?:19|20)\d{2}/g) || [];
  if (matches.length === 0) return DEFAULT_YEAR;

  const year = Number(matches[0]);
  return Number.isFinite(year) ? year : DEFAULT_YEAR;
}

function cleanModelText(input: string): string {
  return input
    .replace(/\.pdf$/i, "")
    .replace(/(?:19|20)\d{2}/g, " ")
    .replace(/\bmanual\b/gi, " ")
    .replace(/\bservico\b/gi, " ")
    .replace(/\bservice\b/gi, " ")
    .replace(/\bworkshop\b/gi, " ")
    .replace(/\bcatalogo\b/gi, " ")
    .replace(/\bcat[aá]logo\b/gi, " ")
    .replace(/\bparts\b/gi, " ")
    .replace(/\bowner'?s\b/gi, " ")
    .replace(/\bowners\b/gi, " ")
    .replace(/\bsupplement\b/gi, " ")
    .replace(/\bsuplemento\b/gi, " ")
    .replace(/[()\[\]{}]/g, " ")
    .replace(/[_]+/g, " ")
    .replace(/[-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeBrandFromModel(model: string, brand: string): string {
  const aliases = BRAND_ALIASES.find((item) => item.brand === brand)?.aliases || [];
  let result = ` ${model} `;

  for (const alias of aliases) {
    const safeAlias = alias.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`\\b${safeAlias}\\b`, "gi"), " ");
  }

  return result.replace(/\s+/g, " ").trim();
}

function deriveModel(file: DrivePdfFile, brand: string): string {
  const basename = cleanModelText(file.name);
  const parent = cleanModelText(path.dirname(file.relativePath).split(path.sep).pop() || "");

  let model = removeBrandFromModel(basename, brand);
  if (model.length < 3 && parent) {
    model = removeBrandFromModel(parent, brand);
  }

  if (model.length < 3) {
    model = basename || parent || "Geral";
  }

  return model;
}

function buildTitle(metadata: Omit<ManualMetadata, "title">): string {
  const prefix = metadata.category === "catalogo" ? "Catalogo de Pecas" : "Manual de Servico";
  const brandPart = metadata.brand && metadata.brand !== "Outros" ? ` ${metadata.brand}` : "";
  const modelPart = metadata.model ? ` ${metadata.model}` : "";
  return `${prefix}${brandPart}${modelPart}`.replace(/\s+/g, " ").trim();
}

function resolveMetadata(file: DrivePdfFile, manifestEntry: ManifestEntry | undefined, options: CliOptions): ManualMetadata | null {
  if (manifestEntry?.skip) {
    return null;
  }

  const brand = manifestEntry?.brand || detectBrand(file.relativePath);
  const model = manifestEntry?.model || deriveModel(file, brand);
  const year = manifestEntry?.year || detectYear(file.relativePath);
  const category = manifestEntry?.category || options.category || detectCategory(file.relativePath);
  const title = manifestEntry?.title || buildTitle({ brand, model, year, category });

  return {
    title,
    brand,
    model,
    year,
    category,
  };
}

async function driveFetchJson<T>(url: URL, options: CliOptions, resourceKeyPairs: string[] = []): Promise<T> {
  if (options.apiKey) {
    url.searchParams.set("key", options.apiKey);
  }

  const response = await fetch(url, {
    headers: buildDriveHeaders(options, resourceKeyPairs),
  });

  if (!response.ok) {
    throw new Error(`Google Drive API retornou ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function listDrivePdfs(folderId: string, options: CliOptions, parentPath = "", folderResourceKey?: string): Promise<DrivePdfFile[]> {
  const items: DrivePdfFile[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(DRIVE_API_BASE);
    url.searchParams.set("q", `'${folderId}' in parents and trashed = false`);
    url.searchParams.set("fields", "nextPageToken,files(id,name,mimeType,resourceKey)");
    url.searchParams.set("pageSize", "1000");
    url.searchParams.set("supportsAllDrives", "true");
    url.searchParams.set("includeItemsFromAllDrives", "true");
    url.searchParams.set("orderBy", "folder,name_natural");
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const data = await driveFetchJson<DriveListResponse>(url, options, folderResourceKey ? [`${folderId}/${folderResourceKey}`] : []);
    const files = data.files || [];

    for (const file of files) {
      const currentPath = parentPath ? path.join(parentPath, file.name) : file.name;

      if (file.mimeType === DRIVE_FOLDER_MIME) {
        const nested = await listDrivePdfs(file.id, options, currentPath, file.resourceKey);
        items.push(...nested);
        continue;
      }

      const isPdf = file.mimeType === PDF_MIME || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        continue;
      }

      items.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        relativePath: currentPath,
        resourceKey: file.resourceKey,
      });

      if (options.limit && items.length >= options.limit) {
        return items.slice(0, options.limit);
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken && (!options.limit || items.length < options.limit));

  return options.limit ? items.slice(0, options.limit) : items;
}

async function downloadDriveFile(file: DrivePdfFile, destinationPath: string, options: CliOptions) {
  const url = new URL(buildDriveDownloadApiUrl(file.id));
  if (options.apiKey) {
    url.searchParams.set("key", options.apiKey);
  }
  appendResourceKey(url, file.resourceKey);

  const response = await fetch(url, {
    headers: buildDriveHeaders(options, buildFileResourceKeyPair(file)),
  });

  if (!response.ok) {
    throw new Error(`Falha ao baixar arquivo ${file.id}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  ensureDir(destinationPath);
  fs.writeFileSync(destinationPath, buffer);
}

function buildLocalDestination(relativePath: string, fileId: string, destSubdir: string): { diskPath: string; fileUrl: string } {
  const parsed = path.parse(relativePath);
  const cleanDirs = parsed.dir
    .split(path.sep)
    .filter(Boolean)
    .map(sanitizeSegment);
  const baseName = sanitizeSegment(parsed.name);
  const ext = parsed.ext || ".pdf";
  const finalName = `${baseName}-${fileId}${ext.toLowerCase()}`;
  const relativeDiskPath = path.join("public", "manuais", destSubdir, ...cleanDirs, finalName);
  const diskPath = path.join(process.cwd(), relativeDiskPath);
  const fileUrl = toLocalUrl(path.join("manuais", destSubdir, ...cleanDirs, finalName));

  return { diskPath, fileUrl };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const manifest = readManifest(options.manifestPath);

  console.log(`Pasta Drive: ${options.folderId}`);
  console.log(`Modo de armazenamento: ${options.storage}`);
  console.log(`Dry run: ${options.dryRun ? "sim" : "nao"}`);
  if (options.storage === "drive") {
    console.log("Aviso: em modo drive, os links precisam estar publicos ou acessiveis pelos seus usuarios.");
  }

  const files = await listDrivePdfs(options.folderId, options);
  console.log(`PDFs encontrados no Google Drive: ${files.length}`);

  const existingManuals = await prisma.manual.findMany({
    select: { id: true, fileUrl: true },
  });
  const existingByFileUrl = new Map(existingManuals.map((manual) => [manual.fileUrl, manual.id]));

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const manifestEntry = getManifestEntry(manifest, file);
      const metadata = resolveMetadata(file, manifestEntry, options);

      if (!metadata) {
        console.log(`[SKIP] ${file.relativePath} (manifest marcou skip)`);
        skipped++;
        continue;
      }

      const driveFileUrl = `${buildDriveViewUrl(file.id)}${file.resourceKey ? `?resourcekey=${file.resourceKey}` : ""}`;
      let fileUrl = driveFileUrl;

      if (options.storage === "local") {
        const destination = buildLocalDestination(file.relativePath, file.id, options.destSubdir);
        fileUrl = destination.fileUrl;

        if (!options.dryRun && !fs.existsSync(destination.diskPath)) {
          try {
            await downloadDriveFile(file, destination.diskPath, options);
          } catch (error) {
            if (!isDriveDownloadForbidden(error)) {
              throw error;
            }

            fileUrl = driveFileUrl;
            console.warn(`[WARN] Fallback para link do Drive: ${file.relativePath}`);
          }
        }
      }

      const payload = {
        title: metadata.title,
        brand: metadata.brand,
        model: metadata.model,
        year: metadata.year,
        category: metadata.category,
        fileUrl,
      };

      const existingId = existingByFileUrl.get(fileUrl);

      if (options.dryRun) {
        if (existingId) {
          updated++;
        } else {
          created++;
        }
        console.log(`[DRY] ${existingId ? "UPDATE" : "CREATE"} ${payload.title} -> ${fileUrl}`);
        continue;
      }

      if (existingId) {
        await prisma.manual.update({
          where: { id: existingId },
          data: payload,
        });
        updated++;
        console.log(`[UPDATE] ${payload.title}`);
      } else {
        const createdManual = await prisma.manual.create({
          data: payload,
        });
        existingByFileUrl.set(fileUrl, createdManual.id);
        created++;
        console.log(`[CREATE] ${payload.title}`);
      }
    } catch (error) {
      errors++;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[ERRO] ${file.relativePath}: ${message}`);
    }
  }

  console.log("\nResumo da importacao:");
  console.log(`  Criados: ${created}`);
  console.log(`  Atualizados: ${updated}`);
  console.log(`  Ignorados: ${skipped}`);
  console.log(`  Erros: ${errors}`);
  console.log(`  Total no banco: ${await prisma.manual.count()}`);
}

main()
  .catch((error) => {
    console.error("Falha na importacao do Google Drive:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });