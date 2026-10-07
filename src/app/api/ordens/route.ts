import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prepararOrdem } from "@/lib/ordens";

export const dynamic = "force-dynamic";

async function usuarioLogado() {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;
  return {
    id,
    isPremium: session!.user.isPremium === true || session!.user.role === "ADMIN",
  };
}

// GET /api/ordens — as ordens da oficina de quem está logado
export async function GET() {
  const u = await usuarioLogado();
  if (!u) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const ordens = await prisma.serviceOrder.findMany({
      where: { userId: u.id },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true, numero: true, clienteNome: true, motoModelo: true,
        motoPlaca: true, total: true, status: true, createdAt: true,
      },
    });
    return NextResponse.json({ ordens });
  } catch (error) {
    console.error("Erro ao listar ordens:", error);
    return NextResponse.json({ error: "Erro ao listar" }, { status: 500 });
  }
}

// POST /api/ordens — cria uma ordem
export async function POST(request: Request) {
  const u = await usuarioLogado();
  if (!u) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  if (!u.isPremium) {
    return NextResponse.json(
      { error: "A ordem de serviço faz parte do acesso completo." },
      { status: 403 }
    );
  }

  try {
    const dados = prepararOrdem(await request.json());

    // Numeração por oficina. Se duas ordens forem criadas ao mesmo tempo, a
    // constraint única barra a segunda — então tenta de novo com o próximo.
    for (let tentativa = 0; tentativa < 3; tentativa++) {
      const ultima = await prisma.serviceOrder.findFirst({
        where: { userId: u.id },
        orderBy: { numero: "desc" },
        select: { numero: true },
      });
      try {
        const ordem = await prisma.serviceOrder.create({
          data: { ...dados, userId: u.id, numero: (ultima?.numero ?? 0) + 1 },
          select: { id: true, numero: true },
        });
        return NextResponse.json({ ordem });
      } catch (e) {
        const code = (e as { code?: string })?.code;
        if (code !== "P2002" || tentativa === 2) throw e;
      }
    }
    throw new Error("não foi possível numerar a ordem");
  } catch (error) {
    console.error("Erro ao criar ordem:", error);
    return NextResponse.json({ error: "Erro ao criar a ordem" }, { status: 500 });
  }
}
