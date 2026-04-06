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
    },
  });

  if (!payment) {
    return NextResponse.json(
      { error: "Pagamento não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(payment);
}
