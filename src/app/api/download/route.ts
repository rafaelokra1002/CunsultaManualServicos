import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import path from "path";
import { existsSync } from "fs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = session.user as any;
  if (!user.active) {
    return NextResponse.json({ error: "Conta inativa" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const manualId = searchParams.get("id");

  if (!manualId) {
    return NextResponse.json({ error: "ID do manual obrigatório" }, { status: 400 });
  }

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

  // Arquivo local na VPS (ex: /manuais/arquivo.pdf)
  if (manual.fileUrl.startsWith("/")) {
    const filePath = path.join(process.cwd(), "public", manual.fileUrl);
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Arquivo não encontrado no servidor" }, { status: 404 });
    }
  }

  return NextResponse.json({ url: manual.fileUrl });
}
