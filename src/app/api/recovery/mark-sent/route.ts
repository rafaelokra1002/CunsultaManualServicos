import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const secret = request.headers.get("x-recovery-secret");
  if (!secret || secret !== process.env.RECOVERY_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paymentId } = await request.json();
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId obrigatório" }, { status: 400 });
  }

  await prisma.payment.update({
    where: { id: paymentId },
    data: { recoveryMessageSent: true },
  });

  return NextResponse.json({ ok: true });
}
