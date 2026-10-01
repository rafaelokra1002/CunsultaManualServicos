import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { avisarVenda } from "@/lib/telegram";

export const dynamic = "force-dynamic";

// Dispara um aviso de venda fictício para conferir se o bot está configurado,
// sem precisar esperar alguém comprar. Acesse logado como admin em:
// /api/admin/telegram-teste
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  const configurado = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );

  if (!configurado) {
    return NextResponse.json({
      ok: false,
      motivo: "TELEGRAM_BOT_TOKEN e/ou TELEGRAM_CHAT_ID não estão configurados no servidor",
    });
  }

  await avisarVenda({
    nome: "TESTE (não é venda real)",
    email: "teste@exemplo.com",
    phone: null,
    valor: 67,
  });

  return NextResponse.json({
    ok: true,
    mensagem: "Aviso de teste enviado. Confira o Telegram — se não chegou, veja os logs do servidor.",
  });
}
