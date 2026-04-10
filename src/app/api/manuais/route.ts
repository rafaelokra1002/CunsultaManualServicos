import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { manualSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

// GET /api/manuais - Lista manuais (usuário autenticado e ativo)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verifica se o usuário está ativo (admin sempre pode acessar)
    // Usuários demo (isPremium=false) podem listar manuais para navegação
    if (session.user.role !== "ADMIN" && !session.user.active) {
      return NextResponse.json(
        {
          error:
            "Sua conta não está ativa. Entre em contato com o administrador.",
        },
        { status: 403 }
      );
    }

    // Extrai filtros da query string
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");

    const where: any = {};
    if (brand) where.brand = { contains: brand, mode: "insensitive" };
    if (model) where.model = { contains: model, mode: "insensitive" };

    const manuais = await prisma.manual.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(manuais);
  } catch (error) {
    console.error("Erro ao listar manuais:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/manuais - Cria manual (somente admin)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso restrito a administradores" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validação com Zod
    const result = manualSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const manual = await prisma.manual.create({
      data: {
        title: result.data.title,
        brand: result.data.brand,
        model: result.data.model,
        year: result.data.year,
        fileUrl: result.data.fileUrl,
        category: result.data.category,
      },
    });

    return NextResponse.json(manual, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar manual:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
