import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { findSuspensionData } from "@/lib/suspension-data";

export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function extractModelTerms(text: string): string {
  const found: string[] = [];
  const brands = text.match(/\b(honda|yamaha|kawasaki|suzuki|bmw|ducati|triumph|harley|ktm|benelli|haojue|shineray|dafra)\b/gi);
  if (brands) found.push(...brands.map((b) => b.toLowerCase()));
  const models = text.match(/\b(cg|titan|fan|fazer|lander|tenere|ténéré|xre|cb\s*\d*|cbr|nc\s*\d*|bros|nxr|pop|biz|cargo|lead|pcx|sh\s*\d*|ninja|versys|crosser|mt-?\d*|yzf|xtz|fz\s*\d*|fjr|klx|kx|z\s*\d*|er-?\d*)\b/gi);
  if (models) found.push(...models.map((m) => m.toLowerCase().replace(/\s+/, '')));
  const nums = text.match(/\b(1[0-9][0-9]|[2-9][0-9][0-9]|1[0-3][0-9][0-9])\b/g);
  if (nums) found.push(...nums);
  return [...new Set(found)].join(' ');
}

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

    const modelTerms = extractModelTerms(question);

    // Reescreve a pergunta em termos técnicos para melhorar a busca
    let searchQuery = question;
    try {
      const rewrite = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 80,
        temperature: 0,
        messages: [
          {
            role: "system",
            content: `Você é um especialista em manuais de moto. Converta a pergunta do mecânico em termos técnicos usados em manuais de serviço (português técnico). IMPORTANTE: se a pergunta mencionar marca ou modelo (ex: Pop 110, CG 160, Fazer 250), SEMPRE inclua esses termos na saída. Retorne APENAS as palavras-chave técnicas separadas por espaço, sem pontuação. Exemplos:
"pop 110 falhando" → "pop 110 falha ignição vela carburador"
"óleo do garfo" → "fluido suspensão dianteira nível capacidade"
"vela da cg 160" → "cg 160 vela ignição"
"correia" → "correia dentada transmissão"
"folga das válvulas fazer 250" → "fazer 250 folga válvula admissão escape"
"quanto de óleo vai no motor" → "capacidade óleo motor lubrificação"
"bateria fraca" → "bateria tensão carga sistema elétrico"
"carburador entupido" → "carburador limpeza combustível ralenti"`,
          },
          { role: "user", content: question },
        ],
      });
      searchQuery = rewrite.choices[0].message.content?.trim() ?? question;
    } catch {
      // Se falhar, usa a pergunta original
    }

    // Garante que o modelo/marca sempre esteja na busca
    if (modelTerms) {
      const already = modelTerms.split(' ').every((t) => searchQuery.toLowerCase().includes(t.toLowerCase()));
      if (!already) searchQuery = `${modelTerms} ${searchQuery}`;
    }

    // Consulta tabela de óleo de suspensão quando relevante
    const isSuspensionOilQuestion = /suspen|garfo|bengala|fluido|oleo.*(suspen|garfo)|garfo.*(oleo|fluido)/i.test(question);
    let suspensionContext = "";
    if (isSuspensionOilQuestion) {
      const entry = findSuspensionData(question);
      if (entry) {
        suspensionContext = `[Tabela de Óleo de Suspensão — ${entry.model.toUpperCase()}]
Volume esquerdo: ${entry.leftVolume}
Volume direito: ${entry.rightVolume}${entry.fluidLevel ? `\nNível do fluido: ${entry.fluidLevel}` : ""}
Óleo do motor: ${entry.engineOil || "não informado"}
Recomendação: ${entry.recommendation}`;
      }
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
        WHERE to_tsvector('simple', unaccent(mc.content)) @@ plainto_tsquery('simple', unaccent(${searchQuery}))
        ORDER BY ts_rank(to_tsvector('simple', unaccent(mc.content)), plainto_tsquery('simple', unaccent(${searchQuery}))) DESC
        LIMIT 8
      `;
    } catch (dbErr) {
      console.error("Erro na busca full-text:", dbErr);
    }

    // Fallback: ILIKE com OR em todas as palavras relevantes
    if (chunks.length === 0) {
      try {
        const stopWords = new Set(['da','do','de','das','dos','a','o','e','em','para','na','no','com','que','qual','como','um','uma','os','as']);
        const words = searchQuery.trim().split(/\s+/)
          .filter((w: string) => w.length > 2 && !stopWords.has(w.toLowerCase()))
          .slice(0, 5);

        if (words.length === 0) words.push(searchQuery.trim().split(/\s+/)[0]);

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

    // Segundo fallback: busca só pelos termos do modelo se ainda não achou nada
    if (chunks.length === 0 && modelTerms) {
      try {
        const modelWords = modelTerms.split(' ').filter((w) => w.length > 1);
        if (modelWords.length > 0) {
          const kw = `%${modelWords[0]}%`;
          chunks = await prisma.$queryRaw`
            SELECT mc.content, m.title, m.brand, m.model, m.year
            FROM manual_chunks mc
            JOIN manuals m ON m.id = mc."manualId"
            WHERE unaccent(mc.content) ILIKE unaccent(${kw})
               OR unaccent(m.model) ILIKE unaccent(${kw})
               OR unaccent(m.title) ILIKE unaccent(${kw})
            LIMIT 8
          `;
        }
      } catch (dbErr) {
        console.error("Erro no fallback modelo:", dbErr);
      }
    }

    // Se não achou nos chunks mas tem dados da tabela de suspensão, usa só eles
    if (chunks.length === 0 && !suspensionContext) {
      return NextResponse.json({
        answer:
          "Não encontrei informações específicas sobre isso nos manuais indexados. Verifique se os manuais já foram indexados ou tente reformular com o modelo da moto ou termo técnico.",
      });
    }

    const contextText = [
      suspensionContext,
      ...chunks.map(
        (c, i) =>
          `[Trecho ${i + 1} — ${c.brand} ${c.model} ${c.year}]\n${c.content}`
      ),
    ].filter(Boolean).join("\n\n---\n\n");

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
