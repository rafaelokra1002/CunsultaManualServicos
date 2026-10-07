import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Dados que viram o cabeçalho da ordem de serviço. O mecânico preenche uma
// vez e todas as ordens saem com o nome da oficina dele.
async function userId() {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string } | undefined)?.id || null;
}

export async function GET() {
  const id = await userId();
  if (!id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const oficina = await prisma.user.findUnique({
    where: { id },
    select: { nome: true, phone: true, oficinaNome: true, oficinaTelefone: true, oficinaEndereco: true },
  });
  return NextResponse.json({ oficina });
}

export async function PUT(request: Request) {
  const id = await userId();
  if (!id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const b = await request.json();
    const t = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max) || null;
    await prisma.user.update({
      where: { id },
      data: {
        oficinaNome: t(b.oficinaNome, 120),
        oficinaTelefone: t(b.oficinaTelefone, 30),
        oficinaEndereco: t(b.oficinaEndereco, 200),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar oficina:", error);
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}
