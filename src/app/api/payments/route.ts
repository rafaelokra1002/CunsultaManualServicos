import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPixPayment, precoPorTipo } from "@/lib/pushinpay";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    // "acesso" = R$ 67 | "acesso_ordens" = R$ 94 (com o adicional da Ordem de
    // Serviço) | "ordens" = R$ 27, upgrade de quem já tem acesso.
    const tipo = ["acesso", "acesso_ordens", "ordens"].includes(body.tipo)
      ? body.tipo
      : "acesso";

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (tipo === "ordens") {
      // upgrade: só faz sentido para quem já tem acesso e ainda não tem a OS
      if (!user.isPremium) {
        return NextResponse.json(
          { error: "Libere o acesso completo antes de comprar o adicional" },
          { status: 400 }
        );
      }
      if (user.hasOrdens) {
        return NextResponse.json(
          { error: "A Ordem de Serviço já está liberada na sua conta" },
          { status: 400 }
        );
      }
    } else if (user.isPremium) {
      return NextResponse.json(
        { error: "Sua conta já possui acesso premium" },
        { status: 400 }
      );
    }

    const valor = precoPorTipo(tipo);

    // Verifica se já tem um pagamento pendente recente (menos de 30min)
    const recentPayment = await prisma.payment.findFirst({
      where: {
        userId: user.id,
        status: "pending",
        tipo,
        createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });

    if (recentPayment && recentPayment.pixCode) {
      return NextResponse.json({
        paymentId: recentPayment.id,
        pixCode: recentPayment.pixCode,
        pixQrCode: recentPayment.pixQrCode,
        amount: recentPayment.amount,
      });
    }

    // Gera um ID único para a transação
    const transactionId = `oficina_${user.id}_${Date.now()}`;

    // URL do webhook
    const baseUrl = process.env.NEXTAUTH_URL || "https://www.manualdeservicos.store";
    const webhookUrl = `${baseUrl}/api/payments/webhook`;

    // Cria o pagamento no Mistic Pay
    const pixResponse = await createPixPayment({
      amount: valor,
      payerName: user.nome,
      payerDocument: "00000000000",
      transactionId,
      description:
        tipo === "ordens"
          ? "OficinaDigital - Ordem de Servico"
          : tipo === "acesso_ordens"
            ? "OficinaDigital - Acesso Total + Ordem de Servico"
            : "OficinaDigital - Plano Acesso Total",
      webhookUrl,
    });

    // Salva o pagamento no banco
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: valor,
        tipo,
        status: "pending",
        pushinPayId: pixResponse.data.transactionId,
        pixCode: pixResponse.data.copyPaste,
        pixQrCode: pixResponse.data.qrCodeBase64,
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
