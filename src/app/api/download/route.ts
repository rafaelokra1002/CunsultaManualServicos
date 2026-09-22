import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync, readFileSync } from "fs";

export const dynamic = "force-dynamic";

class DriveDownloadError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "DriveDownloadError";
    this.status = status;
  }
}

function extractDriveFileId(fileUrl: string): string | null {
  const fromPath = fileUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fromPath?.[1]) return fromPath[1];

  try {
    const url = new URL(fileUrl);
    return url.searchParams.get("id");
  } catch {
    return null;
  }
}

function extractDriveResourceKey(fileUrl: string): string | null {
  try {
    const url = new URL(fileUrl);
    return url.searchParams.get("resourcekey");
  } catch {
    return null;
  }
}

function extractHiddenInputs(html: string): Record<string, string> {
  const values: Record<string, string> = {};
  const regex = /<input[^>]+type="hidden"[^>]+name="([^"]+)"[^>]+value="([^"]*)"[^>]*>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    values[match[1]] = match[2];
  }

  return values;
}

function isDownloadResponse(response: Response): boolean {
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  const disposition = (response.headers.get("content-disposition") || "").toLowerCase();

  return (
    contentType.includes("application/pdf") ||
    contentType.includes("application/octet-stream") ||
    disposition.includes(".pdf")
  );
}

function detectDriveHtmlError(html: string): DriveDownloadError | null {
  const normalized = html.toLowerCase();

  if (normalized.includes("quota exceeded")) {
    return new DriveDownloadError("O Google Drive atingiu o limite de download deste arquivo. Tente novamente mais tarde.", 429);
  }

  if (normalized.includes("access denied") || normalized.includes("you need access") || normalized.includes("solicitar acesso")) {
    return new DriveDownloadError("Este arquivo no Google Drive não está acessível para download.", 403);
  }

  if (normalized.includes("file you have requested does not exist") || normalized.includes("arquivo solicitado não existe")) {
    return new DriveDownloadError("O arquivo não foi encontrado no Google Drive.", 404);
  }

  return null;
}

async function resolveGoogleDriveDownloadUrl(fileUrl: string): Promise<string | null> {
  const fileId = extractDriveFileId(fileUrl);
  if (!fileId) return null;

  const resourceKey = extractDriveResourceKey(fileUrl);
  const initialUrl = new URL("https://drive.google.com/uc");
  initialUrl.searchParams.set("export", "download");
  initialUrl.searchParams.set("id", fileId);
  if (resourceKey) {
    initialUrl.searchParams.set("resourcekey", resourceKey);
  }

  const response = await fetch(initialUrl, { redirect: "follow" });
  if (response.ok && isDownloadResponse(response)) {
    return response.url;
  }

  const html = await response.text();
  const htmlError = detectDriveHtmlError(html);
  if (htmlError) {
    throw htmlError;
  }

  const actionMatch = html.match(/<form id="download-form" action="([^"]+)"/i);
  if (!actionMatch?.[1]) return null;

  const downloadUrl = new URL(actionMatch[1]);
  const fields = extractHiddenInputs(html);
  for (const [key, value] of Object.entries(fields)) {
    downloadUrl.searchParams.set(key, value);
  }
  if (resourceKey && !downloadUrl.searchParams.has("resourcekey")) {
    downloadUrl.searchParams.set("resourcekey", resourceKey);
  }

  return downloadUrl.toString();
}

export async function GET(req: NextRequest) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = session.user as any;
  if (!user.active) {
    return NextResponse.json({ error: "Conta inativa" }, { status: 403 });
  }

  if (!user.isPremium && user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Acesso restrito a usuários premium", requiresPremium: true },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const manualId = searchParams.get("id");

  if (!manualId) {
    return NextResponse.json({ error: "ID do manual obrigatório" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");

  const manual = await prisma.manual.findUnique({
    where: { id: manualId },
  });

  if (!manual) {
    return NextResponse.json({ error: "Manual não encontrado" }, { status: 404 });
  }

  // Se a URL é do Vercel Blob (privado), gera URL temporária
  if (manual.fileUrl.includes("blob.vercel-storage.com")) {
    try {
      const { getDownloadUrl } = await import("@vercel/blob");
      const result = await getDownloadUrl(manual.fileUrl);
      return NextResponse.json({ url: String(result) });
    } catch {
      return NextResponse.json({ error: "Erro ao gerar URL de download" }, { status: 500 });
    }
  }

  // Arquivo local na VPS — servir o PDF diretamente pelo API
  if (manual.fileUrl.startsWith("/")) {
    const filePath = path.join(process.cwd(), "public", manual.fileUrl);
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Arquivo não encontrado no servidor" }, { status: 404 });
    }
    const fileBuffer = readFileSync(filePath);
    const fileName = path.basename(manual.fileUrl);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  if (manual.fileUrl.includes("drive.google.com")) {
    try {
      const downloadUrl = await resolveGoogleDriveDownloadUrl(manual.fileUrl);
      if (!downloadUrl) {
        return NextResponse.json({ error: "Não foi possível gerar o link de download do Google Drive" }, { status: 500 });
      }
      return NextResponse.json({ url: downloadUrl });
    } catch (error) {
      if (error instanceof DriveDownloadError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }

      return NextResponse.json({ error: "Erro ao resolver download no Google Drive" }, { status: 500 });
    }
  }

  return NextResponse.json({ url: manual.fileUrl });
}
