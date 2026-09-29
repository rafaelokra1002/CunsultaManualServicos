import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPurchaseToMeta } from "@/lib/meta-capi";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Webhook Mistic Pay recebido:", JSON.stringify(body));

    // Mistic Pay envia webhook quando o pagamento é confirmado
    // Campos esperados: transactionId, transactionState, etc.
    const transactionId = body.transactionId || body.data?.transactionId || body.id;
    const state = body.transactionState || body.data?.transactionState || body.status;

    if (!transactionId) {
      console.log("Webhook sem transactionId, body:", JSON.stringify(body));
      return NextResponse.json({ received: true });
    }

    // Busca o pagamento pelo ID da transação Mistic Pay
    const payment = await prisma.payment.findUnique({
      where: { pushinPayId: String(transactionId) },
      // o usuário vem junto para alimentar o evento da Conversions API
      include: { user: { select: { email: true, phone: true } } },
    });

    if (!payment) {
      console.log(`Pagamento não encontrado para transactionId: ${transactionId}`);
      return NextResponse.json({ received: true });
    }

    // Verifica se o pagamento foi aprovado
    const approvedStates = ["APROVADO", "APROVADA", "COMPLETO", "COMPLETA", "COMPLETED", "PAID", "approved", "completed", "paid"];
    if (approvedStates.some(s => s.toLowerCase() === String(state).toLowerCase())) {
      // Guarda contra webhook reenviado: só segue se ainda não estava aprovado,
      // senão o evento de compra seria mandado de novo para a Meta.
      const jaAprovado = payment.status === "approved";

      // Atualiza status do pagamento
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "approved" },
      });

      // Ativa a conta do usuário e libera acesso premium
      await prisma.user.update({
        where: { id: payment.userId },
        data: { active: true, isPremium: true },
      });

      console.log(`Pagamento ${transactionId} aprovado. Usuário ${payment.userId} ativado.`);

      if (!jaAprovado) {
        // Não usa await: o gateway não pode esperar a Meta responder, e o
        // envio já trata os próprios erros internamente.
        void sendPurchaseToMeta({
          eventId: payment.id,
          value: payment.amount,
          email: payment.user?.email,
          phone: payment.user?.phone,
        });
      }
    } else if (["EXPIRADO", "CANCELADO", "expired", "cancelled", "refunded"].some(s => s.toLowerCase() === String(state).toLowerCase())) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "expired" },
      });

      console.log(`Pagamento ${transactionId} expirado/cancelado.`);
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
