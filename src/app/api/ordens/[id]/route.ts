import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prepararOrdem } from "@/lib/ordens";

export const dynamic = "force-dynamic";

async function usuarioLogado() {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;
  return {
    id,
    isPremium: session!.user.isPremium === true || session!.user.role === "ADMIN",
  };
}

// Toda consulta filtra por userId: uma oficina nunca enxerga a ordem da outra.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const u = await usuarioLogado();
  if (!u) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const ordem = await prisma.serviceOrder.findFirst({
    where: { id: params.id, userId: u.id },
  });
  if (!ordem) return NextResponse.json({ error: "Ordem não encontrada" }, { status: 404 });

  const oficina = await prisma.user.findUnique({
    where: { id: u.id },
    select: { nome: true, phone: true, oficinaNome: true, oficinaTelefone: true, oficinaEndereco: true },
  });

  return NextResponse.json({ ordem, oficina });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const u = await usuarioLogado();
  if (!u) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const existente = await prisma.serviceOrder.findFirst({
      where: { id: params.id, userId: u.id },
      select: { id: true },
    });
    if (!existente) return NextResponse.json({ error: "Ordem não encontrada" }, { status: 404 });

    const ordem = await prisma.serviceOrder.update({
      where: { id: params.id },
      data: prepararOrdem(await request.json()),
      select: { id: true, numero: true, total: true },
    });
    return NextResponse.json({ ordem });
  } catch (error) {
    console.error("Erro ao atualizar ordem:", error);
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const u = await usuarioLogado();
  if (!u) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const r = await prisma.serviceOrder.deleteMany({
      where: { id: params.id, userId: u.id },
    });
    if (r.count === 0) return NextResponse.json({ error: "Ordem não encontrada" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir ordem:", error);
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}
