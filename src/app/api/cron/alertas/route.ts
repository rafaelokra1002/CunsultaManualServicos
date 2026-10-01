import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { avisarCheckoutAbandonado, avisarFalhaDeAtivacao } from "@/lib/telegram";

export const dynamic = "force-dynamic";

// Roda a cada ~10 minutos (Scheduled Task do Coolify ou cron externo):
//   curl -s "https://www.manualdeservicos.store/api/cron/alertas?secret=SEU_SEGREDO"
const MINUTOS_PARA_ABANDONO = 15;

function autorizado(request: Request): boolean {
  const esperado = process.env.CRON_SECRET;
  if (!esperado) return false;
  const url = new URL(request.url);
  const informado =
    request.headers.get("x-cron-secret") || url.searchParams.get("secret");
  return informado === esperado;
}

export async function GET(request: Request) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    // --- 1. pagou e ficou sem acesso -------------------------------------
    // O cliente pagou e está sem o produto: em vez de só avisar, o cron
    // libera o acesso e conta o que fez. Avisa uma vez só, porque depois
    // de corrigido o caso não aparece mais na busca.
    const travados = await prisma.payment.findMany({
      where: { status: "approved", user: { isPremium: false } },
      include: { user: { select: { id: true, nome: true, email: true, phone: true } } },
      take: 20,
    });

    if (travados.length > 0) {
      await prisma.user.updateMany({
        where: { id: { in: travados.map((p) => p.user.id) } },
        data: { active: true, isPremium: true },
      });
      await avisarFalhaDeAtivacao(
        travados.map((p) => ({
          nome: p.user.nome,
          email: p.user.email,
          phone: p.user.phone,
        }))
      );
      console.log(`[cron] ${travados.length} acesso(s) liberado(s) automaticamente`);
    }

    // --- 2. gerou o PIX e não pagou ---------------------------------------
    const limite = new Date(Date.now() - MINUTOS_PARA_ABANDONO * 60 * 1000);
    const abandonados = await prisma.payment.findMany({
      where: {
        status: "pending",
        recoveryMessageSent: false,
        createdAt: { lte: limite },
        user: { isPremium: false },
      },
      include: { user: { select: { nome: true, phone: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    if (abandonados.length > 0) {
      await avisarCheckoutAbandonado(
        abandonados.map((p) => ({
          nome: p.user.nome,
          phone: p.user.phone,
          valor: p.amount,
          minutos: Math.floor((Date.now() - p.createdAt.getTime()) / 60000),
        }))
      );
      // marca para não avisar o mesmo abandono a cada 10 minutos
      await prisma.payment.updateMany({
        where: { id: { in: abandonados.map((p) => p.id) } },
        data: { recoveryMessageSent: true },
      });
    }

    return NextResponse.json({
      ok: true,
      acessosLiberados: travados.length,
      abandonosAvisados: abandonados.length,
    });
  } catch (error) {
    console.error("[cron/alertas] erro:", error);
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}
