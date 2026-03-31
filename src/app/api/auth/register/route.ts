import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação com Zod
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { nome, email, password } = result.data;

    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 409 }
      );
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 12);

    // Cria o usuário (active = false por padrão, precisa ser ativado pelo admin)
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Cadastro realizado com sucesso! Aguarde a ativação.", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
