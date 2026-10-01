import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  try {
    const vendas = await prisma.payment.findMany({
      where: { status: "approved" },
      orderBy: { updatedAt: "desc" },
      take: 50,
      include: {
        user: {
          select: { nome: true, email: true, phone: true, isPremium: true },
        },
      },
    });

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return NextResponse.json({
      vendas: vendas.map((v) => ({
        paymentId: v.id,
        nome: v.user.nome,
        email: v.user.email,
        phone: v.user.phone,
        amount: v.amount,
        pagoEm: v.updatedAt,
        premiumLiberado: v.user.isPremium,
        // reaproveita a mesma flag dos abandonados para marcar "já falei com ele"
        contatado: v.recoveryMessageSent,
      })),
      totalHoje: vendas.filter((v) => v.updatedAt >= hoje).length,
      faturadoHoje: vendas
        .filter((v) => v.updatedAt >= hoje)
        .reduce((s, v) => s + v.amount, 0),
    });
  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    return NextResponse.json({ error: "Erro ao listar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
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
  } catch {
    return NextResponse.json({ error: "Erro ao marcar" }, { status: 500 });
  }
}
