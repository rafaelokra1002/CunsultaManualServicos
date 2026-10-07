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
    // Pega tanto quem pagou o acesso e não ficou premium quanto quem pagou o
    // adicional e não recebeu a Ordem de Serviço.
    const travados = await prisma.payment.findMany({
      where: {
        status: "approved",
        OR: [
          { tipo: { in: ["acesso", "acesso_ordens"] }, user: { isPremium: false } },
          { tipo: { in: ["ordens", "acesso_ordens"] }, user: { hasOrdens: false } },
        ],
      },
      include: { user: { select: { id: true, nome: true, email: true, phone: true } } },
      take: 20,
    });

    if (travados.length > 0) {
      const precisamAcesso = travados
        .filter((p) => p.tipo !== "ordens")
        .map((p) => p.user.id);
      const precisamOrdens = travados
        .filter((p) => p.tipo === "ordens" || p.tipo === "acesso_ordens")
        .map((p) => p.user.id);

      if (precisamAcesso.length > 0) {
        await prisma.user.updateMany({
          where: { id: { in: precisamAcesso } },
          data: { active: true, isPremium: true },
        });
      }
      if (precisamOrdens.length > 0) {
        await prisma.user.updateMany({
          where: { id: { in: precisamOrdens } },
          data: { hasOrdens: true },
        });
      }
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
