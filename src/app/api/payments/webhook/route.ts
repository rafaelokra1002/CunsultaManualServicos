import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // PushinPay envia o webhook com os dados do pagamento
    const { id, status, external_reference } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Busca o pagamento pelo pushinPayId
    const payment = await prisma.payment.findUnique({
      where: { pushinPayId: id },
    });

    if (!payment) {
      console.error("Pagamento não encontrado para pushinPayId:", id);
      return NextResponse.json(
        { error: "Pagamento não encontrado" },
        { status: 404 }
      );
    }

    // Se o pagamento foi aprovado
    if (status === "approved" || status === "completed" || status === "paid") {
      // Atualiza o status do pagamento
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "approved" },
      });

      // Ativa a conta do usuário
      await prisma.user.update({
        where: { id: payment.userId },
        data: { active: true },
      });

      console.log(`Pagamento ${id} aprovado. Usuário ${payment.userId} ativado.`);
    } else if (status === "expired" || status === "cancelled" || status === "refunded") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "expired" },
      });

      console.log(`Pagamento ${id} expirado/cancelado.`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook de pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    );
  }
}
