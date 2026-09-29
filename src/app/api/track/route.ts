import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// "Visualizações do Site" deve medir quem CHEGA no site, não o uso interno.
// Sem isso, cada clique seu no painel admin virava uma visualização e inflava
// o número — boa parte do total era o próprio dono navegando.
//
// Para voltar a contar alguma dessas áreas, é só tirar da lista.
const CAMINHOS_IGNORADOS = ["/admin", "/dashboard"];

function deveIgnorar(path: string): boolean {
  return CAMINHOS_IGNORADOS.some(
    (prefixo) => path === prefixo || path.startsWith(prefixo + "/")
  );
}

export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Path inválido" }, { status: 400 });
    }

    if (deveIgnorar(path)) {
      // responde ok para o tracker não tentar de novo, mas não grava
      return NextResponse.json({ ok: true, ignored: true });
    }

    await prisma.pageView.create({
      data: { path },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro ao registrar" }, { status: 500 });
  }
}
