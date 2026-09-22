import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { onlyDigits, PENDING_PASSWORD } from "@/lib/kiwify";

export const dynamic = "force-dynamic";

// Limite simples de tentativas por email (em memória): 5 erros a cada 15 minutos
const attempts = new Map<string, { count: number; since: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function tooManyAttempts(email: string) {
  const entry = attempts.get(email);
  if (!entry || Date.now() - entry.since > WINDOW_MS) return false;
  return entry.count >= MAX_ATTEMPTS;
}

function registerFailure(email: string) {
  const entry = attempts.get(email);
  if (!entry || Date.now() - entry.since > WINDOW_MS) {
    attempts.set(email, { count: 1, since: Date.now() });
  } else {
    entry.count++;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phoneEnd = onlyDigits(body.phoneEnd);
    const password = String(body.password ?? "");

    if (!email || phoneEnd.length !== 4) {
      return NextResponse.json({ error: "Informe o email e os 4 últimos dígitos do celular" }, { status: 400 });
    }
    if (password.length < 6 || password.length > 100) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 });
    }
    if (tooManyAttempts(email)) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde 15 minutos e tente de novo." }, { status: 429 });
    }

    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

    if (user && user.password !== PENDING_PASSWORD) {
      return NextResponse.json({ error: "Esta conta já tem senha. Entre pela tela de login." }, { status: 409 });
    }

    const phone = onlyDigits(user?.phone);
    if (!user || !user.isPremium || !phone) {
      registerFailure(email);
      return NextResponse.json(
        { error: "Não encontramos uma compra com esse email. Se acabou de pagar, aguarde 1 minuto e tente de novo." },
        { status: 404 }
      );
    }

    if (!phone.endsWith(phoneEnd)) {
      registerFailure(email);
      return NextResponse.json({ error: "Os dígitos do celular não conferem com os da compra." }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { password: await hash(password, 12) },
    });
    attempts.delete(email);

    return NextResponse.json({ ok: true, email: user.email });
  } catch (error) {
    console.error("Erro no primeiro acesso:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
