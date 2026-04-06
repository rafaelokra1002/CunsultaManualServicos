import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Webhook PushinPay recebido:", JSON.stringify(body));

    // PushinPay Checkout envia dados do pagamento aprovado
    // Campos possíveis: id, status, email, value, customer_name, etc.
    const email = body.email || body.customer_email || body.customer?.email;
    const status = body.status;
    const transactionId = body.id || body.transaction_id;

    // Se tem email, busca o usuário e ativa
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (user) {
        // Registra o pagamento
        await prisma.payment.create({
          data: {
            userId: user.id,
            amount: 34.90,
            status: "approved",
            pushinPayId: transactionId || `checkout_${Date.now()}`,
          },
        });

        // Ativa a conta do usuário
        if (!user.active) {
          await prisma.user.update({
            where: { id: user.id },
            data: { active: true },
          });
        }

        console.log(`Pagamento aprovado. Usuário ${user.email} ativado.`);
      } else {
        console.log(`Webhook recebido mas usuário com email ${email} não encontrado.`);
      }
    } else {
      // Fallback: tenta buscar por pushinPayId se não tem email
      if (transactionId) {
        const payment = await prisma.payment.findUnique({
          where: { pushinPayId: transactionId },
        });

        if (payment) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: status === "approved" || status === "completed" || status === "paid" ? "approved" : "expired" },
          });

          if (status === "approved" || status === "completed" || status === "paid") {
            await prisma.user.update({
              where: { id: payment.userId },
              data: { active: true },
            });
            console.log(`Pagamento ${transactionId} aprovado via ID.`);
          }
        }
      }

      console.log("Webhook sem email, body:", JSON.stringify(body));
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
