import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = request.headers.get("x-recovery-secret");
  if (!secret || secret !== process.env.RECOVERY_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const payments = await prisma.payment.findMany({
    where: {
      status: "pending",
      recoveryMessageSent: false,
      createdAt: { lte: fifteenMinutesAgo },
    },
    include: {
      user: { select: { nome: true, phone: true, isPremium: true } },
    },
  });

  const pending = payments
    .filter((p) => p.user.phone && !p.user.isPremium)
    .map((p) => ({
      paymentId: p.id,
      phone: p.user.phone!,
      nome: p.user.nome,
    }));

  return NextResponse.json({ pending });
}
