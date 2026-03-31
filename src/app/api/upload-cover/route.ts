import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

// POST /api/upload-cover - Upload de capa de manual (somente admin)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const manualId = formData.get("manualId") as string | null;

    if (!file || !manualId) {
      return NextResponse.json(
        { error: "Arquivo e ID do manual são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato inválido. Use JPG, PNG, WebP ou GIF" },
        { status: 400 }
      );
    }

    // Limitar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 5MB" },
        { status: 400 }
      );
    }

    // Verificar se manual existe
    const manual = await prisma.manual.findUnique({ where: { id: manualId } });
    if (!manual) {
      return NextResponse.json(
        { error: "Manual não encontrado" },
        { status: 404 }
      );
    }

    // Criar diretório de capas
    const coversDir = path.join(process.cwd(), "public", "covers");
    await mkdir(coversDir, { recursive: true });

    // Gerar nome seguro para o arquivo
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeFileName = `${manualId}.${ext}`;
    const filePath = path.join(coversDir, safeFileName);

    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Atualizar coverUrl no banco
    const coverUrl = `/covers/${safeFileName}`;
    await prisma.manual.update({
      where: { id: manualId },
      data: { coverUrl },
    });

    return NextResponse.json({ coverUrl }, { status: 200 });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
