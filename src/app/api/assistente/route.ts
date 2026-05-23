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
  if (models) found.push(...models.map((m) => m.toLowerCase().replace(/\s+/, "")));
  const nums = text.match(/\b(1[0-9][0-9]|[2-9][0-9][0-9]|1[0-3][0-9][0-9])\b/g);
  if (nums) found.push(...nums);
  return [...new Set(found)].join(" ");
}

// Dicionário local: evita chamada extra ao GPT para reescrita
const SLANG: [RegExp, string[]][] = [
  [/falhand|falhament|tá falh/i, ["falha", "ignição"]],
  [/baten|batend|bate muito/i, ["detonação", "pré-ignição"]],
  [/barulh/i, ["ruído", "vibração"]],
  [/fumacand|fumand|soltand fumaç/i, ["fumaça", "combustão", "óleo"]],
  [/aquecend|esquentand|superaquec/i, ["temperatura", "superaquecimento", "refrigeração"]],
  [/não liga|nao liga|nao peg|não peg/i, ["partida", "ignição", "combustível"]],
  [/\bvela\b/i, ["vela", "ignição"]],
  [/correia/i, ["correia", "dentada", "transmissão"]],
  [/bengala|garfo/i, ["garfo", "suspensão", "dianteira", "fluido"]],
  [/válvul|valvul/i, ["válvula", "folga", "admissão", "escape"]],
  [/\bóleo\b|\boleo\b/i, ["óleo", "lubrificação"]],
  [/bater[ia]/i, ["bateria", "tensão", "carga", "elétrico"]],
  [/carburad/i, ["carburador", "combustível", "ralenti"]],
  [/embreag/i, ["embreagem", "disco", "ajuste"]],
  [/\bfreio\b/i, ["freio", "pastilha", "disco", "fluido"]],
  [/filtro/i, ["filtro", "ar", "combustível", "óleo"]],
  [/torqu/i, ["torque", "aperto", "especificação"]],
  [/regulag|calibrag/i, ["regulagem", "ajuste", "calibração"]],
  [/\bpneu\b/i, ["pneu", "pressão", "especificação"]],
  [/amortecedor|suspensao|suspensão/i, ["suspensão", "amortecedor", "mola"]],
  [/injeç|injecao/i, ["injeção", "eletrônica", "sensor", "combustível"]],
  [/código|codigo|cod.*falha/i, ["código", "DTC", "diagnóstico"]],
  [/câmbio|cambio/i, ["câmbio", "transmissão", "marchas"]],
  [/cabeçote|cabecote/i, ["cabeçote", "torque", "junta"]],
  [/pistão|pistao/i, ["pistão", "cilindro", "anel"]],
  [/bomba/i, ["bomba", "combustível", "lubrificação"]],
  [/rolament/i, ["rolamento", "mancal", "folga"]],
];

function expandQuery(question: string): string {
  const extra: string[] = [];
  for (const [pattern, terms] of SLANG) {
    if (pattern.test(question)) extra.push(...terms);
  }
  if (extra.length === 0) return question;
  return question + " " + [...new Set(extra)].join(" ");
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    if (!session.user.active) return NextResponse.json({ error: "Conta inativa" }, { status: 403 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY não configurada" }, { status: 500 });

    const { question } = await request.json();
    if (!question?.trim()) return NextResponse.json({ error: "Pergunta inválida" }, { status: 400 });

    const modelTerms = extractModelTerms(question);
    let searchQuery = expandQuery(question);

    // Garante que modelo/marca sempre esteja na busca
    if (modelTerms) {
      const already = modelTerms.split(" ").every((t) => searchQuery.toLowerCase().includes(t.toLowerCase()));
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

    // Busca dedicada nos ebooks quando a pergunta é sobre ECU/pinagem/parâmetros
    const isEcuQuestion = /\b(EOT|TPS|MAP|CKP|IAT|IACV|ECU|ECM|pino|pinagem|param[eê]tro|sensor|injetor|bico|lambda|sonda)\b/i.test(question);
    let ebookChunks: { content: string; title: string; brand: string; model: string; year: number }[] = [];
    if (isEcuQuestion) {
      try {
        const stopWords2 = new Set(["da","do","de","das","dos","a","o","e","em","para","na","no","com","que","qual","como","um","uma","os","as","esta","está","por"]);
        const techWords = question.split(/\s+/).filter((w: string) => w.length > 2 && !stopWords2.has(w.toLowerCase())).slice(0, 4);
        const [ek1, ek2, ek3, ek4] = techWords.map((w: string) => `%${w}%`);
        if (ek1) {
          // Se tiver modelo identificado, busca ebook chunks que tenham o modelo + termos técnicos
          const modelFilter = modelTerms ? `%${modelTerms.split(" ")[0]}%` : `%${ek1.slice(1,-1)}%`;
          const modelFilter2 = modelTerms?.split(" ")[1] ? `%${modelTerms.split(" ")[1]}%` : modelFilter;

          // Primeiro: chunks do modelo específico no ebook
          ebookChunks = await prisma.$queryRaw`
            SELECT mc.content, m.title, m.brand, m.model, m.year
            FROM manual_chunks mc
            JOIN manuals m ON m.id = mc."manualId"
            WHERE m.category = 'ebook'
              AND unaccent(mc.content) ILIKE unaccent(${modelFilter})
              AND unaccent(mc.content) ILIKE unaccent(${modelFilter2})
            LIMIT 4
          `;

          // Se não achou pelo modelo, busca pelos termos técnicos
          if (ebookChunks.length === 0) {
            ebookChunks = await prisma.$queryRaw`
              SELECT mc.content, m.title, m.brand, m.model, m.year
              FROM manual_chunks mc
              JOIN manuals m ON m.id = mc."manualId"
              WHERE m.category = 'ebook'
                AND (
                  unaccent(mc.content) ILIKE unaccent(${ek1})
                  OR unaccent(mc.content) ILIKE unaccent(${ek2 ?? ek1})
                  OR unaccent(mc.content) ILIKE unaccent(${ek3 ?? ek1})
                  OR unaccent(mc.content) ILIKE unaccent(${ek4 ?? ek1})
                )
              LIMIT 4
            `;
          }
        }
      } catch (dbErr) {
        console.error("Erro busca ebook:", dbErr);
      }
    }

    // Busca full-text
    let chunks: { content: string; title: string; brand: string; model: string; year: number }[] = [];
    try {
      chunks = await prisma.$queryRaw`
        SELECT mc.content, m.title, m.brand, m.model, m.year
        FROM manual_chunks mc
        JOIN manuals m ON m.id = mc."manualId"
        WHERE to_tsvector('simple', unaccent(mc.content)) @@ plainto_tsquery('simple', unaccent(${searchQuery}))
        ORDER BY ts_rank(to_tsvector('simple', unaccent(mc.content)), plainto_tsquery('simple', unaccent(${searchQuery}))) DESC
        LIMIT 6
      `;
    } catch (dbErr) {
      console.error("Erro na busca full-text:", dbErr);
    }

    // Fallback ILIKE
    if (chunks.length === 0) {
      try {
        const stopWords = new Set(["da","do","de","das","dos","a","o","e","em","para","na","no","com","que","qual","como","um","uma","os","as","esta","está","com","por"]);
        const words = searchQuery.trim().split(/\s+/).filter((w: string) => w.length > 2 && !stopWords.has(w.toLowerCase())).slice(0, 5);
        if (words.length === 0) words.push(searchQuery.trim().split(/\s+/)[0]);

        const kw1 = `%${words[0]}%`;
        const kw2 = `%${words[1] ?? words[0]}%`;
        const kw3 = `%${words[2] ?? words[0]}%`;

        chunks = await prisma.$queryRaw`
          SELECT mc.content, m.title, m.brand, m.model, m.year,
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
          LIMIT 6
        `;
      } catch (dbErr) {
        console.error("Erro no fallback ILIKE:", dbErr);
      }
    }

    // Fallback por modelo
    if (chunks.length === 0 && modelTerms) {
      try {
        const modelWords = modelTerms.split(" ").filter((w) => w.length > 1);
        if (modelWords.length > 0) {
          const kw = `%${modelWords[0]}%`;
          chunks = await prisma.$queryRaw`
            SELECT mc.content, m.title, m.brand, m.model, m.year
            FROM manual_chunks mc
            JOIN manuals m ON m.id = mc."manualId"
            WHERE unaccent(mc.content) ILIKE unaccent(${kw})
               OR unaccent(m.model) ILIKE unaccent(${kw})
               OR unaccent(m.title) ILIKE unaccent(${kw})
            LIMIT 6
          `;
        }
      } catch (dbErr) {
        console.error("Erro no fallback modelo:", dbErr);
      }
    }

    const streamHeaders = {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    };

    // Mescla chunks dos ebooks com chunks normais (ebooks primeiro quando relevante)
    const allChunks = [
      ...ebookChunks,
      ...chunks.filter((c) => !ebookChunks.some((e) => e.content === c.content)),
    ].slice(0, 8);

    if (allChunks.length === 0 && !suspensionContext) {
      return new Response(
        "Não encontrei informações específicas sobre isso nos manuais indexados. Tente reformular com o modelo da moto ou termo técnico.",
        { headers: streamHeaders }
      );
    }

    const contextText = [
      suspensionContext,
      ...allChunks.map((c, i) => `[Trecho ${i + 1} — ${c.brand} ${c.model} ${c.year}]\n${c.content}`),
    ].filter(Boolean).join("\n\n---\n\n");

    // Streaming da resposta
    const aiStream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 600,
      stream: true,
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

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of aiStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, { headers: streamHeaders });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erro no assistente:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
