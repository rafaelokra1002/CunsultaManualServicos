import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!session.user.active) {
    return NextResponse.json({ error: "Conta inativa" }, { status: 403 });
  }

  const { question } = await request.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: "Pergunta inválida" }, { status: 400 });
  }

  // Busca chunks relevantes com full-text search
  const chunks = await prisma.$queryRaw<
    { content: string; title: string; brand: string; model: string; year: number }[]
  >`
    SELECT
      mc.content,
      m.title,
      m.brand,
      m.model,
      m.year
    FROM manual_chunks mc
    JOIN manuals m ON m.id = mc."manualId"
    WHERE to_tsvector('portuguese', mc.content) @@ plainto_tsquery('portuguese', ${question})
    ORDER BY ts_rank(to_tsvector('portuguese', mc.content), plainto_tsquery('portuguese', ${question})) DESC
    LIMIT 6
  `;

  // Fallback com ILIKE se full-text não retornar resultados
  let context = chunks;
  if (context.length === 0) {
    const words = question.trim().split(/\s+/).slice(0, 3);
    context = await prisma.$queryRaw<
      { content: string; title: string; brand: string; model: string; year: number }[]
    >`
      SELECT
        mc.content,
        m.title,
        m.brand,
        m.model,
        m.year
      FROM manual_chunks mc
      JOIN manuals m ON m.id = mc."manualId"
      WHERE ${words.map((w: string) => `mc.content ILIKE '%${w.replace(/'/g, "''")}%'`).join(" OR ")}
      LIMIT 6
    `;
  }

  if (context.length === 0) {
    return NextResponse.json({
      answer:
        "Não encontrei informações específicas sobre isso nos manuais indexados. Tente reformular com o modelo da moto ou termo técnico específico.",
    });
  }

  const contextText = context
    .map(
      (c, i) =>
        `[Trecho ${i + 1} — ${c.brand} ${c.model} ${c.year}]\n${c.content}`
    )
    .join("\n\n---\n\n");

  let answer: string;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content: `Você é um assistente técnico especialista em motocicletas. Responda com base APENAS nos trechos dos manuais fornecidos. Se a informação não estiver nos trechos, diga que não encontrou. Seja direto e técnico. Use listas quando houver múltiplos itens.`,
        },
        {
          role: "user",
          content: `Trechos dos manuais:\n\n${contextText}\n\n---\n\nPergunta: ${question}`,
        },
      ],
    });
    answer = completion.choices[0].message.content ?? "";
  } catch (aiError: unknown) {
    const msg = aiError instanceof Error ? aiError.message : String(aiError);
    console.error("Erro OpenAI:", msg);
    return NextResponse.json({ error: `Erro ao consultar IA: ${msg}` }, { status: 500 });
  }

  return NextResponse.json({ answer, sources: context.length });
}
