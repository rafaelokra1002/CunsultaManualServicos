import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Quem gerou o PIX há menos que isso provavelmente ainda está pagando:
// não faz sentido cobrar alguém que está com o app do banco aberto.
const MINUTOS_DE_ESPERA = 10;

async function exigirAdmin() {
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
  return null;
}

// GET - quem gerou o PIX e não pagou
export async function GET() {
  const barrado = await exigirAdmin();
  if (barrado) return barrado;

  try {
    const limite = new Date(Date.now() - MINUTOS_DE_ESPERA * 60 * 1000);

    const pendentes = await prisma.payment.findMany({
      where: {
        status: "pending",
        createdAt: { lte: limite },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        user: {
          select: { id: true, nome: true, email: true, phone: true, isPremium: true },
        },
      },
    });

    // Quem já virou premium (pagou por outro caminho, ou foi liberado na mão)
    // não é mais checkout abandonado.
    const lista = pendentes
      .filter((p) => !p.user.isPremium)
      .map((p) => ({
        paymentId: p.id,
        nome: p.user.nome,
        email: p.user.email,
        phone: p.user.phone,
        amount: p.amount,
        createdAt: p.createdAt,
        contatado: p.recoveryMessageSent,
      }));

    return NextResponse.json({ pendentes: lista });
  } catch (error) {
    console.error("Erro ao listar checkouts abandonados:", error);
    return NextResponse.json({ error: "Erro ao listar" }, { status: 500 });
  }
}

// POST - marca (ou desmarca) que já falou com a pessoa
export async function POST(request: Request) {
  const barrado = await exigirAdmin();
  if (barrado) return barrado;

  try {
    const { paymentId, contatado } = await request.json();
    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json({ error: "paymentId inválido" }, { status: 400 });
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: { recoveryMessageSent: contatado !== false },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao marcar contato:", error);
    return NextResponse.json({ error: "Erro ao marcar" }, { status: 500 });
  }
}
