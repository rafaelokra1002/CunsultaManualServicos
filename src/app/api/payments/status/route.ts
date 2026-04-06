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
        select: { active: true },
      },
    },
  });

  if (!payment) {
    return NextResponse.json(
      { error: "Pagamento não encontrado" },
      { status: 404 }
    );
  }

  // Se o usuário já foi ativado (por admin ou webhook), marcar pagamento como approved
  if (payment.status === "pending" && payment.user.active) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "approved" },
    });
    return NextResponse.json({ ...payment, status: "approved" });
  }

  return NextResponse.json(payment);
}
