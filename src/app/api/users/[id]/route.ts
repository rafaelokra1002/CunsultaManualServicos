import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateUserSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

// PATCH /api/users/[id] - Ativar/desativar usuário (somente admin)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const result = updateUserSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        active: result.data.active,
        isPremium: result.data.active,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        active: true,
        isPremium: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Remover usuário (somente admin)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (existingUser.role === "ADMIN") {
      return NextResponse.json(
        { error: "Não é possível remover um administrador" },
        { status: 403 }
      );
    }

    // Remove pagamentos associados primeiro
    await prisma.payment.deleteMany({
      where: { userId: params.id },
    });

    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
