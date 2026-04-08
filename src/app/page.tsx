import Link from "next/link";
import Logo from "@/components/Logo";
import SocialProofToast from "@/components/SocialProofToast";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,92,231,0.15),_transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(108,92,231,0.08),_transparent_40%)]" />

      {/* Toast de prova social */}
      <SocialProofToast />

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12">
        <div className="flex items-center text-xl font-bold sm:text-2xl">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
          <Link href="/login" className="btn-outline px-4 py-2 text-center text-sm">
            Entrar
          </Link>
          <Link href="/register" className="rounded-xl bg-[#6c5ce7] px-5 py-2 text-center text-sm font-semibold text-white shadow-lg shadow-[#6c5ce7]/25 transition-all hover:bg-[#7c6ef7]">
            QUERO ACESSAR 🔓
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="flex flex-col items-center px-4 pt-14 text-center sm:px-6 md:pt-24">
          {/* Prova social no topo */}
          <div className="mb-4 flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-400 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            +300 mecânicos já utilizam essa ferramenta
          </div>

          <div className="mb-5 inline-block rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-1.5 text-xs font-semibold text-[#6c5ce7] sm:text-sm">
            🔧 Ferramenta #1 para Mecânicos de Motos
          </div>

          <h1 className="mb-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Pare de perder horas tentando descobrir{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">defeito de moto</span> 🔧
          </h1>
          <p className="mb-8 max-w-xl text-lg text-[#8888a4] sm:text-xl">
            Descubra defeitos, códigos de erro e dados técnicos em segundos.
            Tudo que o mecânico profissional precisa na palma da mão.
          </p>

          {/* Bullets de valor */}
          <div className="mb-10 grid grid-cols-2 gap-3 text-left text-sm sm:flex sm:flex-wrap sm:justify-center sm:gap-4 sm:text-base">
            <div className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#12121a]/60 px-3 py-2 sm:px-4">
              <span className="text-green-400">✓</span> +300 manuais de motos
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#12121a]/60 px-3 py-2 sm:px-4">
              <span className="text-green-400">✓</span> Diagnóstico Honda
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#12121a]/60 px-3 py-2 sm:px-4">
              <span className="text-green-400">✓</span> Calculadora de válvulas
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#12121a]/60 px-3 py-2 sm:px-4">
              <span className="text-green-400">✓</span> Dados de óleo e suspensão
            </div>
          </div>

          {/* CTAs */}
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/register" className="rounded-xl bg-[#6c5ce7] px-8 py-4 text-center text-lg font-bold text-white shadow-lg shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98]">
              QUERO ACESSAR AGORA 🔓
            </Link>
            <a href="#video-demo" className="btn-outline px-8 py-4 text-center text-lg">
              VER COMO FUNCIONA
            </a>
          </div>

          {/* ===== VÍDEO DEMO ===== */}
          <div id="video-demo" className="mt-16 w-full max-w-xl sm:mt-20">
            <p className="mb-6 text-center text-lg font-semibold text-[#8888a4] sm:text-xl">
              Veja como funciona na prática 👇
            </p>
            <div className="overflow-hidden rounded-2xl border border-[#2a2a3e] bg-[#12121a] shadow-2xl shadow-[#6c5ce7]/10">
              <video
                className="w-full"
                controls
                playsInline
                preload="metadata"
                poster=""
              >
                <source src="/demo.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
            </div>
            <p className="mt-4 text-center text-sm text-[#8888a4]">
              📱 A plataforma funciona direto no celular — sem instalar nada
            </p>
          </div>
        </section>

        {/* ===== O QUE VOCÊ RECEBE ===== */}
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6">
          <div className="rounded-2xl border border-[#6c5ce7]/30 bg-gradient-to-b from-[#6c5ce7]/5 to-transparent p-8 sm:p-12">
            <h2 className="mb-8 text-center text-3xl font-extrabold sm:text-4xl">
              O que você recebe <span className="text-[#6c5ce7]">ao acessar</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Plataforma completa no celular</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">+300 manuais atualizados</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Diagnóstico eletrônico Honda</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Calculadora de válvulas</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Dados de óleo e suspensão</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Acesso imediato após pagamento</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/register" className="inline-block rounded-xl bg-[#6c5ce7] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98]">
                LIBERAR MEU ACESSO AGORA
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FEATURES (como funciona) ===== */}
        <section id="como-funciona" className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Tudo que você precisa, <span className="text-[#6c5ce7]">em um só lugar</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Chega de perder horas procurando informações espalhadas pela internet.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Pare de procurar manual na internet</h3>
              <p className="text-[#8888a4]">
                +300 manuais originais de Honda, Yamaha, Kawasaki e mais. Achados em segundos, direto no celular.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Descubra o defeito em segundos</h3>
              <p className="text-[#8888a4]">
                Diagnóstico eletrônico Honda pelas piscadas do painel. Sem scanner, sem equipamento caro.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Baixe e use na oficina offline</h3>
              <p className="text-[#8888a4]">
                Download em PDF direto no celular. Sem precisar de internet na hora do serviço.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Resolva mais motos no dia</h3>
              <p className="text-[#8888a4]">
                Busca rápida por marca e modelo. Encontre o que precisa sem perder tempo.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M8 8h8l2 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L8 8z"/><path d="M10 12h4"/><path d="M10 15h4"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Óleo e suspensão sem decorar</h3>
              <p className="text-[#8888a4]">
                Volume de óleo, nível de fluido e dados de suspensão por modelo. Consulta instantânea.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="9" cy="11" r="1" fill="#a78bfa"/><circle cx="15" cy="11" r="1" fill="#a78bfa"/><circle cx="9" cy="15" r="1" fill="#a78bfa"/><circle cx="15" cy="15" r="1" fill="#a78bfa"/><circle cx="12" cy="19" r="1" fill="#a78bfa"/></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Calculadora de válvulas pronta</h3>
              <p className="text-[#8888a4]">
                Calcule a folga de pastilha de válvulas. XRE 300, CB 300 e outros modelos na hora.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DIAGNÓSTICO DESTAQUE ===== */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <p className="mb-4 text-center text-lg font-semibold text-[#a78bfa]">
            ⚡ Descubra o defeito da moto em segundos — sem scanner
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-[#6c5ce7]/40 bg-gradient-to-br from-[#6c5ce7]/10 to-[#0a0a0f] shadow-xl shadow-[#6c5ce7]/10">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <span className="mb-4 inline-block rounded-full bg-[#6c5ce7]/20 px-3 py-1 text-xs font-bold text-[#a78bfa]">
                  🔥 DIFERENCIAL EXCLUSIVO
                </span>
                <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                  🔧 Diagnóstico Eletrônico Honda
                </h2>
                <p className="mb-6 text-lg text-[#8888a4]">
                  Descubra o defeito da moto apenas pelas piscadas do painel. Sem scanner, sem equipamento caro.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Código de erro por piscadas do MIL
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Possível causa de cada falha
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Como testar com multímetro
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Como resolver o problema
                  </li>
                </ul>
                <Link href="/register" className="inline-block rounded-xl bg-[#6c5ce7] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98]">
                  QUERO ACESSAR AGORA 🔓
                </Link>
              </div>

              {/* Exemplo real */}
              <div className="flex items-center">
                <div className="w-full rounded-xl border border-[#2a2a3e] bg-[#0a0a0f]/80 p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8888a4]">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Exemplo real
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-[#8888a4]">Moto</span>
                      <p className="text-lg font-bold text-white">Biz 110</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#8888a4]">Erro</span>
                      <p className="text-lg font-bold text-orange-400">8 piscadas</p>
                    </div>
                    <div className="rounded-lg border border-[#2a2a3e] bg-[#12121a] p-4">
                      <div className="space-y-2 text-sm">
                        <p className="text-[#e4e4ef]">➡ <strong className="text-white">Sensor TPS</strong> com falha</p>
                        <p className="text-[#e4e4ef]">➡ Teste com <strong className="text-white">multímetro</strong></p>
                        <p className="text-[#e4e4ef]">➡ Solução: <strong className="text-green-400">ajuste ou troca</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROVA SOCIAL ===== */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">+127 mecânicos já estão usando</span>
          </div>
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            O que os mecânicos estão <span className="text-[#6c5ce7]">dizendo</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Profissionais que já usam no dia a dia da oficina.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="card-glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★"}
              </div>
              <p className="mb-6 text-[#e4e4ef]">
                &ldquo;Antes eu perdia 1 hora procurando manual. Agora em 10 segundos já tenho tudo no celular. Mudou meu dia na oficina.&rdquo;
              </p>
              <div>
                <p className="font-bold text-white">Carlos Silva</p>
                <p className="text-sm text-[#8888a4]">Mecânico — São Paulo, SP</p>
              </div>
            </div>
            <div className="card-glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★"}
              </div>
              <p className="mb-6 text-[#e4e4ef]">
                &ldquo;O diagnóstico eletrônico é sensacional. O cliente chega com a moto falhando e eu já sei o código de erro pelas piscadas. Profissionalismo total.&rdquo;
              </p>
              <div>
                <p className="font-bold text-white">André Santos</p>
                <p className="text-sm text-[#8888a4]">Mecânico de Motos — Belo Horizonte, MG</p>
              </div>
            </div>
            <div className="card-glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★"}
              </div>
              <p className="mb-6 text-[#e4e4ef]">
                &ldquo;Melhor investimento que fiz pro meu trabalho. A calculadora de válvulas sozinha já valeu. Recomendo demais.&rdquo;
              </p>
              <div>
                <p className="font-bold text-white">Rafael Oliveira</p>
                <p className="text-sm text-[#8888a4]">Mecânico — Curitiba, PR</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-extrabold sm:text-4xl">
            Perguntas <span className="text-[#6c5ce7]">frequentes</span>
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 text-lg font-bold text-white">Como recebo o acesso?</h3>
              <p className="text-[#8888a4]">Após o pagamento via PIX, seu acesso é liberado automaticamente em poucos segundos. Você entra direto pelo celular ou computador.</p>
            </div>
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 text-lg font-bold text-white">Funciona no celular?</h3>
              <p className="text-[#8888a4]">Sim! A plataforma foi feita para funcionar perfeitamente no celular. Use direto na oficina, na palma da mão.</p>
            </div>
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 text-lg font-bold text-white">Precisa instalar algum aplicativo?</h3>
              <p className="text-[#8888a4]">Não. Funciona direto no navegador do celular. Só abrir e usar, sem ocupar espaço no celular.</p>
            </div>
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 text-lg font-bold text-white">Tem mensalidade?</h3>
              <p className="text-[#8888a4]">Não! Pagamento único via PIX. Você paga uma vez e usa para sempre, sem cobranças recorrentes.</p>
            </div>
          </div>
        </section>

        {/* ===== BLOCO DE CONFIANÇA ===== */}
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center sm:p-10">
            <div className="mb-4 text-3xl">🔒</div>
            <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">
              Compra 100% segura
            </h2>
            <div className="mx-auto grid max-w-md gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-left">
                <span className="text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Acesso liberado na hora</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <span className="text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Pagamento via PIX</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <span className="text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Funciona no celular</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <span className="text-green-400">✔</span>
                <span className="text-[#e4e4ef]">Sem mensalidade</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FECHAMENTO + CTA FINAL ===== */}
        <section className="mx-auto mt-20 max-w-3xl px-4 pb-20 sm:mt-28 sm:px-6 sm:pb-28">
          <div className="rounded-2xl border border-[#6c5ce7]/30 bg-gradient-to-b from-[#6c5ce7]/10 to-transparent p-8 text-center sm:p-12">
            <div className="mb-4 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-bold text-orange-400">
              ⏰ Oferta por tempo limitado
            </div>
            <h2 className="mb-2 text-3xl font-extrabold sm:text-4xl">
              Você pode continuar perdendo tempo na oficina…
            </h2>
            <p className="mb-2 text-2xl font-bold text-[#8888a4] sm:text-3xl">OU</p>
            <p className="mb-8 text-2xl font-extrabold text-[#6c5ce7] sm:text-3xl">
              Resolver qualquer defeito em segundos.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register" className="w-full rounded-xl bg-[#6c5ce7] px-10 py-5 text-center text-xl font-bold text-white shadow-xl shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-2xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
                LIBERAR MEU ACESSO AGORA 🔓
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#8888a4]">
              Pagamento único via PIX • Acesso imediato • Sem mensalidade
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
