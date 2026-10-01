import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { avisarResumoDiario } from "@/lib/telegram";

export const dynamic = "force-dynamic";

// Roda uma vez por dia, no fim da noite (Scheduled Task do Coolify):
//   curl -s "https://www.manualdeservicos.store/api/cron/resumo-diario?secret=SEU_SEGREDO"

function autorizado(request: Request): boolean {
  const esperado = process.env.CRON_SECRET;
  if (!esperado) return false;
  const url = new URL(request.url);
  const informado =
    request.headers.get("x-cron-secret") || url.searchParams.get("secret");
  return informado === esperado;
}

/**
 * Instante UTC que corresponde a 00:00 em Brasília (UTC-3).
 * O servidor roda em UTC: usar o dia dele faria o "hoje" virar às 21h.
 */
function inicioDoDiaBrasilia(): Date {
  const agoraEmBrasilia = new Date(Date.now() - 3 * 60 * 60 * 1000);
  agoraEmBrasilia.setUTCHours(0, 0, 0, 0);
  return new Date(agoraEmBrasilia.getTime() + 3 * 60 * 60 * 1000);
}

export async function GET(request: Request) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const desde = inicioDoDiaBrasilia();

    const [visitas, cadastros, checkouts, vendas, abandonadosPendentes] =
      await Promise.all([
        prisma.pageView.count({ where: { createdAt: { gte: desde } } }),
        prisma.user.count({ where: { createdAt: { gte: desde } } }),
        prisma.payment.count({ where: { createdAt: { gte: desde } } }),
        prisma.payment.findMany({
          where: { status: "approved", updatedAt: { gte: desde } },
          select: { amount: true },
        }),
        prisma.payment.count({
          where: {
            status: "pending",
            createdAt: { gte: desde },
            user: { isPremium: false },
          },
        }),
      ]);

    const resumo = {
      visitas,
      cadastros,
      checkouts,
      vendas: vendas.length,
      faturamento: vendas.reduce((s, v) => s + v.amount, 0),
      abandonadosPendentes,
    };

    await avisarResumoDiario(resumo);

    return NextResponse.json({ ok: true, ...resumo });
  } catch (error) {
    console.error("[cron/resumo-diario] erro:", error);
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}
