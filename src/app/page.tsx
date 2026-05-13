"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MockupDiagnostico from "@/components/MockupDiagnostico";

// ─── Countdown ──────────────────────────────────────────────────────────────
function useCountdown(): string {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const KEY = "od_countdown_end";
    let endTime = parseInt(localStorage.getItem(KEY) ?? "0");
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(KEY, String(endTime));
    }
    const tick = () => setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "É confiável? Como sei que não é golpe?",
    a: "Somos empresa com +300 clientes ativos, pagamento via gateway oficial e 30 dias de garantia. Se não gostar, devolvemos 100% — sem perguntas. Fale conosco antes: (71) 99950-4584.",
  },
  {
    q: "Funciona em iPhone e Android?",
    a: "Sim, em qualquer celular com navegador. Também pode ser instalado como app direto na tela inicial (PWA) — sem precisar da App Store.",
  },
  {
    q: "Preciso de internet sempre?",
    a: "Não. Os manuais ficam em cache no celular após a primeira abertura. Você consulta mesmo sem sinal na oficina.",
  },
  {
    q: "É vitalício mesmo? Sem mensalidade?",
    a: "Sim. Você paga UMA vez (R$ 67) e acessa para sempre, incluindo todas as atualizações futuras de manuais.",
  },
  {
    q: "E se vocês saírem do ar?",
    a: "Você pode baixar os PDFs dos manuais que mais usa e guardar no celular ou nuvem. Seu acesso nunca some.",
  },
  {
    q: "Funciona para qual marca de moto?",
    a: "21 montadoras: Honda, Yamaha, Suzuki, Kawasaki, KTM, Harley-Davidson, BMW, Ducati, Triumph, Dafra, Haojue, Shineray, Sundown, Kasinski, Hyosung, Royal Enfield, Husqvarna + quadriciclos.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Imediato após o pagamento — você recebe login por e-mail e WhatsApp em menos de 2 minutos.",
  },
  {
    q: "Posso falar com vocês antes de comprar?",
    a: "Sim! WhatsApp: (71) 99950-4584 — resposta em até 10 minutos. Não é robô.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-semibold text-white">{item.q}</span>
            <span className="ml-4 shrink-0 text-xl text-[#f59e0b]">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 text-sm leading-relaxed text-[#c8cad7]">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CTA Button ─────────────────────────────────────────────────────────────
function CTAButton({ text, className = "" }: { text: string; className?: string }) {
  return (
    <Link
      href="/register"
      className={`flex items-center justify-center rounded-2xl bg-[#10b981] px-8 py-5 text-base font-extrabold uppercase tracking-wide text-white shadow-[0_8px_32px_rgba(16,185,129,0.40)] transition-all hover:bg-[#059669] hover:shadow-[0_12px_40px_rgba(16,185,129,0.55)] active:scale-[0.98] ${className}`}
      style={{ minHeight: "64px" }}
    >
      {text}
    </Link>
  );
}

// ─── Página ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const countdown = useCountdown();

  return (
    <div className="min-h-screen bg-[#090a0f] text-white">

      {/* ════════════════════════════════════════════════════════════════════
          [1] BARRA SUPERIOR FIXA
          ════════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 px-3 py-2 text-center text-sm font-bold text-white shadow-lg">
        🔥 Oferta de lançamento — Economize R$ 130 hoje · Termina em{" "}
        <span className="inline-block rounded bg-black/30 px-2 py-0.5 font-mono tracking-widest">
          {countdown}
        </span>
      </div>

      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#090a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-extrabold">
            Oficina<span className="text-[#f59e0b]">Digital</span>
          </span>
          <Link
            href="/login"
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Já tenho conta
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4">

        {/* ════════════════════════════════════════════════════════════════════
            [2] HERO
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 text-center sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
            ✅ Usado por +300 mecânicos no Brasil
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Descubra{" "}
            <span className="text-[#10b981]">QUALQUER defeito</span> de moto em 5 minutos —{" "}
            <span className="text-[#f59e0b]">sem chutar peça, sem scanner caro</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#c8cad7]">
            A única plataforma com +2.400 manuais oficiais, diagnóstico Honda sem scanner e
            calculadora de válvulas. Tudo no seu celular. Usado por +300 mecânicos no Brasil.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <CTAButton
              text="🔓 Quero acessar agora por R$ 67 no PIX"
              className="w-full sm:w-auto sm:min-w-[440px]"
            />
            <p className="text-sm text-[#8888a4]">
              🔒 Pagamento seguro · ⭐ 4.9/5 (87 avaliações) · 💚 PIX — liberação imediata
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [3] QUEBRA DE DESCONFIANÇA
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Isso é golpe? Entendemos sua dúvida.
            </h2>
            <p className="mt-2 text-[#8888a4]">Veja por que você pode confiar com tranquilidade:</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "✅",
                title: "Garantia de 30 Dias",
                desc: "Devolvemos 100% do seu dinheiro se não funcionar — sem perguntas, sem burocracia.",
              },
              {
                icon: "✅",
                title: "EMPRESA REGISTRADA",
                desc: "Somos uma empresa real com atendimento humano. Fale com a gente antes de comprar.",
              },
              {
                icon: "✅",
                title: "+300 MECÂNICOS ATIVOS",
                desc: "Fale com outros mecânicos no grupo do WhatsApp antes de comprar.",
              },
              {
                icon: "✅",
                title: "ATENDIMENTO HUMANO",
                desc: "Resposta em 10 minutos. Fale agora: (71) 99950-4584 — não é robô.",
              },
              {
                icon: "✅",
                title: "PAGAMENTO PROTEGIDO",
                desc: "Processado via gateway oficial. Seus dados bancários nunca chegam até nós.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5"
              >
                <p className="text-2xl">{card.icon}</p>
                <p className="mt-2 font-extrabold text-white">{card.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#c8cad7]">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [4] DOR
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Cansado de perder tempo e dinheiro chutando peça?
          </h2>

          <div className="mx-auto max-w-xl space-y-3">
            {[
              "Cliente trazendo moto piscando código que você nunca viu",
              "30 minutos procurando manual no Google que não existe",
              "Trocar TPS, sensor, módulo — e o problema continua",
              "Cliente desconfiando da sua técnica",
              "Perder cliente pra concorrência porque demorou demais",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-[#ffcccc]"
              >
                <span className="mt-0.5 shrink-0 text-red-400">❌</span>
                {item}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-6 text-center">
            <p className="text-xl font-extrabold leading-relaxed text-[#ffd38a]">
              Não é falta de competência.
              <br />
              É falta de informação na mão certa.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [5] SOLUÇÃO
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Apresentamos:{" "}
            <span className="text-[#10b981]">OFICINA DIGITAL</span>
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: "📚",
                title: "+2.400 MANUAIS OFICIAIS",
                desc: "21 montadoras — Honda, Yamaha, Suzuki, Kawasaki, Harley, Dafra, Haojue, Shineray e mais. Busca por modelo em segundos, no celular.",
              },
              {
                icon: "🔍",
                title: "DIAGNÓSTICO HONDA SEM SCANNER",
                desc: "Decifre as piscadas do painel em segundos. Sem equipamento caro, sem esperar laudo externo.",
              },
              {
                icon: "🧮",
                title: "CALCULADORA DE VÁLVULAS",
                desc: "Esqueça as anotações na parede. Calcule folgas, tabela de óleo e suspensão direto no celular.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <p className="text-4xl">{card.icon}</p>
                <p className="mt-3 font-extrabold text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#c8cad7]">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [5.5] MOCKUP DIAGNÓSTICO
            ════════════════════════════════════════════════════════════════════ */}
        </main>
        <MockupDiagnostico />
        <main className="mx-auto max-w-5xl px-4">

        {/* ════════════════════════════════════════════════════════════════════
            [6] COMO FUNCIONA
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Como funciona na prática
            </h2>
            <p className="mt-2 text-[#8888a4]">
              Caso real: Honda Biz 110i com 8 piscadas no painel
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", text: 'Abre o app, vai em "Diagnóstico Honda"' },
              { n: "2", text: 'Escolhe "Biz 110i" e "8 piscadas"' },
              { n: "3", text: "App mostra: Falha sensor TPS — teste pinos 1 e 3" },
              { n: "4", text: "Você conserta, cobra o serviço, ganha o cliente" },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#10b981] text-lg font-extrabold text-white">
                  {step.n}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-[#c8cad7]">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="rounded-full bg-white/5 px-4 py-2 text-emerald-300">⏱ 4 minutos</span>
            <span className="rounded-full bg-white/5 px-4 py-2 text-emerald-300">💰 Sem peça à toa</span>
            <span className="rounded-full bg-white/5 px-4 py-2 text-emerald-300">😎 Cliente impressionado</span>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [7] DEPOIMENTOS
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">
            O que mecânicos{" "}
            <span className="text-[#f59e0b]">REAIS</span> estão dizendo
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                name: "Carlos Silva",
                shop: "Oficina Moto Center — São Paulo/SP",
                text: "Resolvi uma CG 160 em 20 min usando o código do painel. Cliente nunca mais foi embora.",
              },
              {
                name: "André Oliveira",
                shop: "AO Motos — Belo Horizonte/MG",
                text: "Triplicou minha taxa de fechamento. Cliente vê o diagnóstico técnico na hora e fecha o serviço.",
              },
              {
                name: "João Pereira",
                shop: "JP Motos — Goiânia/GO",
                text: "Se pagou no primeiro atendimento. Uso TODO dia. Vale muito mais que R$ 67.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7] text-lg font-extrabold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-[#8888a4]">{t.shop}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#c8cad7]">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-3 text-[#f59e0b]">⭐⭐⭐⭐⭐</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <CTAButton
              text="🔓 Quero acessar igual a eles por R$ 67"
              className="mx-auto w-full sm:w-auto sm:min-w-[380px]"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [8] STACK DE VALOR + OFERTA
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">
            TUDO O QUE VOCÊ RECEBE HOJE
          </h2>

          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="space-y-3 text-sm">
              {[
                ["+2.400 manuais oficiais", "R$ 497"],
                ["Diagnóstico Honda sem scanner", "R$ 197"],
                ["Calculadora de válvulas", "R$ 97"],
                ["ECU & Pinagem", "R$ 147"],
                ["Óleo & Suspensão (tabelas)", "R$ 67"],
                ["BÔNUS: Grupo VIP WhatsApp", "R$ 97"],
                ["BÔNUS: Atualizações vitalícias", "R$ 197"],
                ["BÔNUS: Suporte direto", "R$ 97"],
              ].map(([item, price]) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#c8cad7]">
                    <span className="text-emerald-400">✓</span> {item}
                  </span>
                  <span className="font-semibold text-[#8888a4] line-through">{price}</span>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-white/10" />

            <div className="text-center">
              <p className="text-base font-bold text-[#8888a4] line-through">
                VALOR TOTAL: R$ 1.396
              </p>
              <p className="mt-1 text-sm text-[#8888a4]">HOJE VOCÊ LEVA POR:</p>
              <p className="mt-1 text-6xl font-extrabold text-[#10b981]">R$ 67</p>
              <p className="mt-2 text-sm text-[#8888a4]">
                Pagamento único via PIX · Liberação imediata · Sem mensalidade
              </p>
            </div>

            <div className="mt-6">
              <CTAButton
                text="🔓 Quero acessar agora por R$ 67"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [9] GARANTIA REFORÇADA
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <div className="mx-auto max-w-xl rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
            <p className="text-5xl">🛡️</p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase text-white sm:text-3xl">
              Garantia Incondicional de 30 Dias
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#c8cad7]">
              Use a plataforma por 30 dias. Se não economizar pelo menos 2h por dia na sua
              oficina, devolvemos 100% do seu dinheiro. Sem perguntas. Risco zero para você.
            </p>
            <div className="mt-5 rounded-xl bg-emerald-500/20 px-4 py-3 text-sm font-bold text-emerald-300">
              R$ 67 com 30 dias de garantia total — ou seu dinheiro de volta
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [10] FAQ
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <div className="mx-auto max-w-2xl">
            <FAQAccordion />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            [11] CTA FINAL COM URGÊNCIA
            ════════════════════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-8 text-center sm:p-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
              ÚLTIMA CHANCE — Oferta de lançamento
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Garanta seu acesso por R$ 67
            </h2>
            <p className="mt-3 text-[#c8cad7]">Esta oferta termina em:</p>
            <p className="mt-2 font-mono text-5xl font-extrabold text-[#f59e0b]">{countdown}</p>
            <p className="mt-3 text-sm text-[#8888a4]">
              Depois disso, o preço sobe para R$ 197.
            </p>
            <div className="mt-8">
              <CTAButton
                text="🔓 Quero acessar agora por R$ 67 no PIX"
                className="w-full"
              />
            </div>
            <p className="mt-4 text-xs text-[#555570]">
              🔒 Pagamento seguro via PIX · Liberação imediata · Garantia de 30 dias
            </p>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-[#555570]">
        <p className="font-bold text-[#8888a4]">
          Oficina<span className="text-[#f59e0b]">Digital</span>
          {" "}— manualdeservicos.store
        </p>
        <p className="mt-1">
          Suporte:{" "}
          <a
            href="https://wa.me/5571999504584"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            WhatsApp (71) 99950-4584
          </a>
          {" · "}contato@manualdeservicos.store
        </p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="/login" className="hover:text-white">Entrar</Link>
          <Link href="/register" className="hover:text-white">Criar conta</Link>
        </div>
      </footer>
    </div>
  );
}
