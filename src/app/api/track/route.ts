import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Path inválido" }, { status: 400 });
    }

    await prisma.pageView.create({
      data: { path },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro ao registrar" }, { status: 500 });
  }
}
