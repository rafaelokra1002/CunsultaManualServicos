import Link from "next/link";
import { Sora } from "next/font/google";
import Logo from "@/components/Logo";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"] });

const highlights = [
  "+300 manuais organizados",
  "Diagnóstico Honda sem scanner",
  "Calculadora de válvulas",
  "Acesso no celular na hora",
];

const quickWins = [
  "Descubra códigos de falha em segundos",
  "Evite trocar peça no chute",
  "Atenda mais motos no mesmo dia",
];

const testimonials = [
  {
    name: "Carlos, SP",
    text: "Resolvi uma CG 160 em menos de 20 min usando o código do painel.",
  },
  {
    name: "André, MG",
    text: "O cliente vê o diagnóstico rápido e já confia mais no serviço.",
  },
  {
    name: "João, GO",
    text: "Se pagou no primeiro atendimento. Hoje uso todo dia na oficina.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090a0f] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.16),_transparent_28%),radial-gradient(circle_at_85%_15%,_rgba(108,92,231,0.22),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_45%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent" />

      <nav className="relative z-20 border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
            <Logo size="sm" />
            <span>
              Oficina<span className="text-[#f59e0b]">Digital</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="btn-outline px-4 py-2 text-sm">
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-[#090a0f] transition-all hover:bg-[#ffb83d]"
            >
              Liberar acesso
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100svh-65px)] max-w-7xl items-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid w-full gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 xl:gap-8">
            <div className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-6 xl:p-7">
              <div>
                <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd38a]">
                  <span className="rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-1 text-[11px]">
                    pagamento único via pix
                  </span>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-300">
                    +300 mecânicos usando
                  </span>
                </div>

                <h1 className={`${sora.className} max-w-3xl text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-4xl xl:text-[4rem]`}>
                  A ferramenta que faz o mecânico achar o defeito da moto sem perder meia hora no chute.
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c8cad7] sm:text-lg xl:max-w-3xl xl:text-[1.05rem]">
                  Manuais de serviço, diagnóstico eletrônico Honda, calculadora de válvulas e dados técnicos em uma única plataforma.
                  Você abre no celular, consulta na hora e entrega a moto mais rápido.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-[#0f1118] px-4 py-3 text-sm font-medium text-[#eef0f7]"
                    >
                      <span className="mr-2 text-[#f59e0b]">●</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
                  <div className="rounded-2xl border border-[#ff6b6b]/20 bg-[#2a1014]/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff8d8d]">sem a plataforma</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#ffcccc]">
                      <li>Procura manual no Google e perde tempo.</li>
                      <li>Testa peça por peça e gasta mais.</li>
                      <li>Demora para dar resposta ao cliente.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">com a oficina digital</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#eafff6]">
                      {quickWins.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] border border-[#f59e0b]/20 bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(245,158,11,0.03))] p-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#ffd38a]">
                    <span>simulação real</span>
                    <span className="rounded-full bg-black/20 px-2 py-1 text-[10px] text-white/75">10 segundos</span>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#090a0f]/70 p-4">
                    <div className="flex items-center justify-between text-sm text-[#9ea3b5]">
                      <span>Honda Biz 110i</span>
                      <span className="text-[#f59e0b]">8 piscadas</span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#edf0f8]">
                      <p><strong className="text-white">Falha:</strong> Sensor TPS</p>
                      <p><strong className="text-white">Teste:</strong> Multímetro nos pinos 1 e 3</p>
                      <p><strong className="text-white">Solução:</strong> Ajustar posição ou substituir o sensor</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {testimonials.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-white/10 bg-[#10131b] p-4">
                      <p className="text-sm leading-relaxed text-[#d7dbe8]">&ldquo;{item.text}&rdquo;</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8c93aa]">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between rounded-[28px] border border-[#f59e0b]/25 bg-[linear-gradient(180deg,rgba(245,158,11,0.12),rgba(9,10,15,0.94)_22%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 xl:p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffd38a]">acesso imediato</p>
                    <h2 className={`${sora.className} mt-2 text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-3xl`}>
                      Tudo em um só lugar para diagnosticar e vender mais serviço.
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#9ea3b5]">promocional</p>
                    <p className="text-3xl font-extrabold text-[#f59e0b]">PIX</p>
                    <p className="text-xs text-[#9ea3b5]">liberado na hora</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">Você recebe agora:</p>
                  <div className="mt-3 space-y-2 text-sm text-[#dfe3ef]">
                    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                      <span className="text-emerald-300">✓</span>
                      <span>Mais de 300 manuais de serviço por marca e modelo</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                      <span className="text-emerald-300">✓</span>
                      <span>Diagnóstico Honda pelas piscadas do painel</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                      <span className="text-emerald-300">✓</span>
                      <span>Calculadora de válvulas e tabela de óleo e suspensão</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                      <span className="text-emerald-300">✓</span>
                      <span>Acesso vitalício com atualizações inclusas</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="text-lg font-bold text-white">7 dias</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ea3b5]">garantia</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="text-lg font-bold text-white">0</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ea3b5]">mensalidade</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="text-lg font-bold text-white">100%</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ea3b5]">no celular</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-[#f59e0b]/30 bg-[#120f08] p-4">
                <p className="text-sm leading-relaxed text-[#f6e6c7]">
                  Se em até 7 dias você achar que a plataforma não acelerou seus diagnósticos, devolvemos 100% do valor.
                </p>
                <Link
                  href="/register"
                  className="mt-4 block rounded-2xl bg-[#f59e0b] px-6 py-4 text-center text-base font-extrabold uppercase tracking-[0.08em] text-[#090a0f] transition-all hover:bg-[#ffb83d] hover:shadow-[0_16px_36px_rgba(245,158,11,0.25)]"
                >
                  Quero acessar agora
                </Link>
                <p className="mt-3 text-center text-xs text-[#c6b89b]">
                  Pagamento único. Liberação imediata. Sem instalar nada.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
