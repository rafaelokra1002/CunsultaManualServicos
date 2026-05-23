import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!session.user.active) {
      return NextResponse.json({ error: "Conta inativa" }, { status: 403 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada no servidor" },
        { status: 500 }
      );
    }

    const { question } = await request.json();
    if (!question?.trim()) {
      return NextResponse.json({ error: "Pergunta inválida" }, { status: 400 });
    }

    // Busca chunks relevantes — full-text com 'simple' (sem stemming) + unaccent
    let chunks: { content: string; title: string; brand: string; model: string; year: number }[] = [];
    try {
      chunks = await prisma.$queryRaw`
        SELECT
          mc.content,
          m.title,
          m.brand,
          m.model,
          m.year
        FROM manual_chunks mc
        JOIN manuals m ON m.id = mc."manualId"
        WHERE to_tsvector('simple', unaccent(mc.content)) @@ plainto_tsquery('simple', unaccent(${question}))
        ORDER BY ts_rank(to_tsvector('simple', unaccent(mc.content)), plainto_tsquery('simple', unaccent(${question}))) DESC
        LIMIT 8
      `;
    } catch (dbErr) {
      console.error("Erro na busca full-text:", dbErr);
    }

    // Fallback: ILIKE com OR em todas as palavras relevantes
    if (chunks.length === 0) {
      try {
        const stopWords = new Set(['da','do','de','das','dos','a','o','e','em','para','na','no','com','que','qual','como','um','uma','os','as']);
        const words = question.trim().split(/\s+/)
          .filter((w: string) => w.length > 2 && !stopWords.has(w.toLowerCase()))
          .slice(0, 5);

        if (words.length === 0) words.push(question.trim().split(/\s+/)[0]);

        // Busca chunks que contenham pelo menos 2 palavras da pergunta (OR em pares)
        const kw1 = `%${words[0]}%`;
        const kw2 = `%${words[1] ?? words[0]}%`;
        const kw3 = `%${words[2] ?? words[0]}%`;

        chunks = await prisma.$queryRaw`
          SELECT
            mc.content,
            m.title,
            m.brand,
            m.model,
            m.year,
            (
              (CASE WHEN unaccent(mc.content) ILIKE unaccent(${kw1}) THEN 1 ELSE 0 END) +
              (CASE WHEN unaccent(mc.content) ILIKE unaccent(${kw2}) THEN 1 ELSE 0 END) +
              (CASE WHEN unaccent(mc.content) ILIKE unaccent(${kw3}) THEN 1 ELSE 0 END)
            ) AS score
          FROM manual_chunks mc
          JOIN manuals m ON m.id = mc."manualId"
          WHERE unaccent(mc.content) ILIKE unaccent(${kw1})
             OR unaccent(mc.content) ILIKE unaccent(${kw2})
             OR unaccent(mc.content) ILIKE unaccent(${kw3})
          ORDER BY score DESC
          LIMIT 8
        `;
      } catch (dbErr) {
        console.error("Erro no fallback ILIKE:", dbErr);
      }
    }

    if (chunks.length === 0) {
      return NextResponse.json({
        answer:
          "Não encontrei informações específicas sobre isso nos manuais indexados. Verifique se os manuais já foram indexados ou tente reformular com o modelo da moto ou termo técnico.",
      });
    }

    const contextText = chunks
      .map(
        (c, i) =>
          `[Trecho ${i + 1} — ${c.brand} ${c.model} ${c.year}]\n${c.content}`
      )
      .join("\n\n---\n\n");

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

    const answer = completion.choices[0].message.content ?? "";
    return NextResponse.json({ answer, sources: chunks.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erro no assistente:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
