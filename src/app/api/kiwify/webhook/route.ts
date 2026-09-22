import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PLAN_PRICE } from "@/lib/pushinpay";
import { isValidKiwifySignature, kiwifySignatures, onlyDigits, PENDING_PASSWORD } from "@/lib/kiwify";

export const dynamic = "force-dynamic";

const APPROVED_STATUS = ["paid", "approved"];
const APPROVED_EVENTS = ["order_approved", "compra_aprovada"];
const REVOKED_STATUS = ["refunded", "chargedback"];
const REVOKED_EVENTS = ["order_refunded", "compra_reembolsada", "chargeback"];

export async function POST(request: Request) {
  const token = process.env.KIWIFY_WEBHOOK_TOKEN;
  if (!token) {
    console.error("Webhook Kiwify: KIWIFY_WEBHOOK_TOKEN não configurado");
    return NextResponse.json({ error: "Webhook não configurado" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature =
    new URL(request.url).searchParams.get("signature") ??
    request.headers.get("x-kiwify-signature");

  if (!isValidKiwifySignature(rawBody, signature, token)) {
    // Registra o que chegou para dar pra corrigir e reenviar o webhook pelo painel da Kiwify
    console.error(
      "Webhook Kiwify: assinatura inválida.",
      `recebida=${signature}`,
      `esperadas=${kiwifySignatures(rawBody, token).join(",")}`,
      `corpo=${rawBody.slice(0, 500)}`
    );
    return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody);
    const customer = body.Customer ?? body.customer ?? {};
    const orderId = String(body.order_id ?? body.id ?? "");
    const status = String(body.order_status ?? body.status ?? "").toLowerCase();
    const event = String(body.webhook_event_type ?? "").toLowerCase();
    const email = String(customer.email ?? "").trim().toLowerCase();

    console.log(`Webhook Kiwify recebido: pedido=${orderId} status=${status} evento=${event} email=${email}`);

    if (!orderId || !email) {
      return NextResponse.json({ received: true });
    }

    const paymentRef = `kiwify_${orderId}`;
    const existingUser = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

    if (APPROVED_STATUS.includes(status) || APPROVED_EVENTS.includes(event)) {
      const phone = onlyDigits(customer.mobile) || null;

      const user = existingUser
        ? await prisma.user.update({
            where: { id: existingUser.id },
            data: { active: true, isPremium: true, phone: existingUser.phone ?? phone },
          })
        : await prisma.user.create({
            data: {
              nome: String(customer.full_name ?? customer.name ?? email.split("@")[0]),
              email,
              phone,
              // Conta criada pela compra: o cliente define a senha em /primeiro-acesso
              password: PENDING_PASSWORD,
              active: true,
              isPremium: true,
            },
          });

      await prisma.payment.upsert({
        where: { pushinPayId: paymentRef },
        update: { status: "approved" },
        create: { userId: user.id, amount: PLAN_PRICE, status: "approved", pushinPayId: paymentRef },
      });

      console.log(`Kiwify: pedido ${orderId} aprovado. Usuário ${user.id} liberado.`);
    } else if (REVOKED_STATUS.includes(status) || REVOKED_EVENTS.includes(event)) {
      if (existingUser) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { isPremium: false },
        });
        await prisma.payment.updateMany({
          where: { pushinPayId: paymentRef },
          data: { status: "refunded" },
        });
        console.log(`Kiwify: pedido ${orderId} ${status || event}. Acesso de ${existingUser.id} removido.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook da Kiwify:", error);
    return NextResponse.json({ error: "Erro ao processar webhook" }, { status: 500 });
  }
}
