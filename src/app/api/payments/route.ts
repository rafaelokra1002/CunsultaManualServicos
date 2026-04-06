import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPixPayment, PLAN_PRICE_CENTS } from "@/lib/pushinpay";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório" },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se já está ativo
    if (user.active) {
      return NextResponse.json(
        { error: "Sua conta já está ativa" },
        { status: 400 }
      );
    }

    // Verifica se já tem um pagamento pendente
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: user.id,
        status: "pending",
      },
      orderBy: { createdAt: "desc" },
    });

    if (existingPayment && existingPayment.pixCode) {
      return NextResponse.json({
        paymentId: existingPayment.id,
        pixCode: existingPayment.pixCode,
        pixQrCode: existingPayment.pixQrCode,
        amount: existingPayment.amount,
      });
    }

    // Monta a URL do webhook
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXTAUTH_URL não configurado");
    }
    const webhookUrl = `${baseUrl}/api/payments/webhook`;

    // Cria o pagamento no PushinPay
    const pixResponse = await createPixPayment({
      valueInCents: PLAN_PRICE_CENTS,
      webhookUrl,
      externalReference: user.id,
    });

    // Salva o pagamento no banco
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: PLAN_PRICE_CENTS / 100,
        status: "pending",
        pushinPayId: pixResponse.id,
        pixCode: pixResponse.qr_code,
        pixQrCode: pixResponse.qr_code_base64,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      pixCode: payment.pixCode,
      pixQrCode: payment.pixQrCode,
      amount: payment.amount,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento. Tente novamente." },
      { status: 500 }
    );
  }
}
