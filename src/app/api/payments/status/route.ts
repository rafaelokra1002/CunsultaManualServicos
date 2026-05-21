import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("id");

  if (!paymentId) {
    return NextResponse.json(
      { error: "ID do pagamento é obrigatório" },
      { status: 400 }
    );
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      id: true,
      status: true,
      amount: true,
      createdAt: true,
      user: {
        select: { isPremium: true },
      },
    },
  });

  if (!payment) {
    return NextResponse.json(
      { error: "Pagamento não encontrado" },
      { status: 404 }
    );
  }

  // Se o usuário já é premium (ativado por admin ou webhook), sincroniza o status do pagamento
  if (payment.status === "pending" && payment.user.isPremium) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "approved" },
    });
    return NextResponse.json({ ...payment, status: "approved" });
  }

  return NextResponse.json(payment);
}
