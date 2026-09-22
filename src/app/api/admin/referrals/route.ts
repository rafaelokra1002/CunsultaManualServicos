import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

function generateCode(): string {
  return randomBytes(4).toString("hex").toUpperCase();
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const links = await prisma.referralLink.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Conta quantos usuários usaram cada link
  const codes = links.map((l) => l.code);
  const counts =
    codes.length > 0
      ? await prisma.user.groupBy({
          by: ["referralCode"],
          where: { referralCode: { in: codes } },
          _count: true,
        })
      : [];

  const countMap = Object.fromEntries(
    counts.map((c) => [c.referralCode!, c._count])
  );

  return NextResponse.json(
    links.map((l) => ({ ...l, usedCount: countMap[l.code] ?? 0 }))
  );
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { label } = await request.json();
  if (!label?.trim()) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
  }

  let code = generateCode();
  let attempts = 0;
  while (attempts < 10) {
    const exists = await prisma.referralLink.findUnique({ where: { code } });
    if (!exists) break;
    code = generateCode();
    attempts++;
  }

  const link = await prisma.referralLink.create({
    data: { code, label: label.trim() },
  });

  return NextResponse.json({ ...link, usedCount: 0 }, { status: 201 });
}
