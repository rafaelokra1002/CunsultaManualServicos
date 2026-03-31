import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDownloadUrl } from "@vercel/blob";

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
    const { url } = await getDownloadUrl(manual.fileUrl);
    return NextResponse.json({ url });
  }

  // Fallback para URLs locais (dev)
  return NextResponse.json({ url: manual.fileUrl });
}
