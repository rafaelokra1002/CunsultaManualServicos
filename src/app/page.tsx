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

      {/* Navbar - fixo no topo */}
      <nav className="sticky top-0 z-50 border-b border-[#2a2a3e]/50 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
        </div>
      </nav>

      <main className="relative z-10">

        {/* ============================================ */}
        {/* 1. HEADLINE + 2. SUBHEADLINE (HERO) */}
        {/* ============================================ */}
        <section className="flex flex-col items-center px-4 pt-10 text-center sm:px-6 md:pt-20">
          {/* Barra de urgência */}
          <div className="mb-5 flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-400 animate-pulse sm:text-sm">
            🔥 PREÇO PROMOCIONAL — pode subir a qualquer momento
          </div>

          {/* Prova social */}
          <div className="mb-4 flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-400 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            +300 mecânicos já usam diariamente
          </div>

          {/* HEADLINE */}
          <h1 className="mb-5 max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Chega de ficar <span className="text-red-400">quebrando a cabeça</span> tentando achar defeito de moto.{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">Descubra em segundos.</span>
          </h1>

          {/* SUBHEADLINE */}
          <p className="mb-4 max-w-2xl text-lg text-[#c0c0d0] sm:text-xl md:text-2xl">
            Mais de <strong className="text-white">300 manuais de serviço</strong> + sistema de diagnóstico eletrônico Honda + calculadora de válvulas.{" "}
            <strong className="text-white">Tudo no seu celular, acesso imediato.</strong>
          </p>
          <p className="mb-8 max-w-xl text-base text-[#8888a4]">
            Pagamento único via PIX. Sem mensalidade, sem scanner, sem complicação.
          </p>

          {/* CTA principal */}
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/register" className="group relative overflow-hidden rounded-xl bg-[#6c5ce7] px-8 py-5 text-center text-lg font-bold text-white shadow-lg shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10">QUERO ACESSAR AGORA →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-[#8888a4]">
            🔒 Acesso liberado em segundos após o pagamento
          </p>

          {/* Vídeo demo */}
          <div id="video-demo" className="mt-14 w-full max-w-xl sm:mt-18">
            <p className="mb-5 text-center text-lg font-semibold text-[#8888a4] sm:text-xl">
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
              📱 Funciona direto no celular — sem instalar nada
            </p>
          </div>
        </section>


        {/* ============================================ */}
        {/* 3. SEÇÃO DE DOR */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-4 text-center text-3xl font-extrabold sm:text-4xl">
            Se você é mecânico de motos, <span className="text-red-400">você já passou por isso:</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            O dia a dia na oficina é corrido. E esses problemas roubam seu tempo e seu dinheiro.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="mb-3 text-2xl">😤</div>
              <h3 className="mb-2 text-lg font-bold text-white">Moto chegou com defeito e você não sabe por onde começar</h3>
              <p className="text-[#8888a4]">Fica testando peça por peça, perdendo horas… e às vezes trocando peça errada. O cliente fica esperando e você perde credibilidade.</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="mb-3 text-2xl">📱</div>
              <h3 className="mb-2 text-lg font-bold text-white">Procura manual de serviço na internet e não acha</h3>
              <p className="text-[#8888a4]">Perde 30, 40 minutos procurando PDF confiável no Google. Quando acha, é incompleto ou de outro modelo. Tempo jogado fora.</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="mb-3 text-2xl">💸</div>
              <h3 className="mb-2 text-lg font-bold text-white">Troca peça no chute e depois descobre que não era aquilo</h3>
              <p className="text-[#8888a4]">Já trocou sensor, bobina, CDI… e o problema era outro. Prejuízo de peça, tempo perdido e cliente insatisfeito.</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="mb-3 text-2xl">⏰</div>
              <h3 className="mb-2 text-lg font-bold text-white">Demora pra entregar a moto e o cliente some</h3>
              <p className="text-[#8888a4]">Quanto mais demora, mais chance do cliente ir pra outro mecânico. Velocidade é dinheiro na oficina.</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/5 p-6 text-center">
            <p className="text-lg font-bold text-[#e4e4ef] sm:text-xl">
              E se existisse uma ferramenta que te ajudasse a <span className="text-[#6c5ce7]">descobrir o defeito em segundos</span>, direto no celular, sem precisar de scanner caro?
            </p>
          </div>
        </section>


        {/* ============================================ */}
        {/* 4. APRESENTAÇÃO DA SOLUÇÃO */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:mt-28 sm:px-6">
          <div className="text-center">
            <div className="mb-5 inline-block rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-1.5 text-xs font-semibold text-[#6c5ce7] sm:text-sm">
              🔧 A SOLUÇÃO QUE FALTAVA NA SUA OFICINA
            </div>
            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Conheça a <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">OficinaDigital</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8888a4] sm:text-xl">
              A plataforma que coloca na sua mão tudo que você precisa pra diagnosticar e resolver defeitos de motos <strong className="text-white">de forma rápida e profissional</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-[#6c5ce7]/30 bg-gradient-to-b from-[#6c5ce7]/5 to-transparent p-8 sm:p-12">
            <h3 className="mb-8 text-center text-2xl font-extrabold sm:text-3xl">
              O que você recebe <span className="text-[#6c5ce7]">ao acessar:</span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">+300 manuais de serviço</span>
                  <p className="mt-1 text-sm text-[#8888a4]">Honda, Yamaha, Kawasaki e mais — sempre atualizados</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">Diagnóstico eletrônico Honda</span>
                  <p className="mt-1 text-sm text-[#8888a4]">Descubra o defeito pelas piscadas do painel — sem scanner</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">Calculadora de válvulas</span>
                  <p className="mt-1 text-sm text-[#8888a4]">XRE 300, CB 300, CG e outros — resultado na hora</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">Dados de óleo e suspensão</span>
                  <p className="mt-1 text-sm text-[#8888a4]">Volume, tipo e especificações por modelo — consulta instantânea</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">Funciona 100% no celular</span>
                  <p className="mt-1 text-sm text-[#8888a4]">Use direto na oficina, sem instalar nada</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
                <div>
                  <span className="font-bold text-white">Acesso imediato via PIX</span>
                  <p className="mt-1 text-sm text-[#8888a4]">Pagou, acessou. Sem espera, sem burocracia</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 5. DEMONSTRAÇÃO - COMO FUNCIONA PASSO A PASSO */}
        {/* ============================================ */}
        <section id="como-funciona" className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Veja como é <span className="text-[#6c5ce7]">simples de usar</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Em 3 passos você resolve o que antes levava horas.
          </p>

          {/* Passos */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="relative rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6c5ce7] text-2xl font-extrabold text-white shadow-lg shadow-[#6c5ce7]/30">1</div>
              <h3 className="mb-2 text-lg font-bold text-white">Abra no celular</h3>
              <p className="text-sm text-[#8888a4]">Pagou via PIX? Acesso liberado na hora. Abra a plataforma direto no navegador do celular. Sem baixar nada.</p>
            </div>
            <div className="relative rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6c5ce7] text-2xl font-extrabold text-white shadow-lg shadow-[#6c5ce7]/30">2</div>
              <h3 className="mb-2 text-lg font-bold text-white">Busque o modelo da moto</h3>
              <p className="text-sm text-[#8888a4]">Digite o modelo (ex: &quot;Biz 110&quot;, &quot;CG 160&quot;, &quot;XRE 300&quot;) e encontre o manual, dados técnicos ou diagnóstico em segundos.</p>
            </div>
            <div className="relative rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6c5ce7] text-2xl font-extrabold text-white shadow-lg shadow-[#6c5ce7]/30">3</div>
              <h3 className="mb-2 text-lg font-bold text-white">Resolva o problema</h3>
              <p className="text-sm text-[#8888a4]">Com o manual ou diagnóstico na mão, você identifica o defeito, faz o teste certo e resolve. Sem achismo, sem perder tempo.</p>
            </div>
          </div>

          {/* Simulação do diagnóstico */}
          <div className="mt-12 overflow-hidden rounded-2xl border-2 border-[#6c5ce7]/40 bg-gradient-to-br from-[#6c5ce7]/10 to-[#0a0a0f] shadow-xl shadow-[#6c5ce7]/10">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <span className="mb-4 inline-block rounded-full bg-[#6c5ce7]/20 px-3 py-1 text-xs font-bold text-[#a78bfa]">
                  🔥 DIFERENCIAL EXCLUSIVO
                </span>
                <h3 className="mb-4 text-2xl font-extrabold sm:text-3xl">
                  Diagnóstico Eletrônico Honda
                </h3>
                <p className="mb-4 text-[#8888a4]">
                  Imagine: o cliente chega com a moto falhando. Você olha o painel, conta as piscadas da luz MIL, abre a plataforma e em 10 segundos já sabe:
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Qual o código de erro exato
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Qual sensor ou componente está falhando
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    Como testar com multímetro
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4ef]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">✓</span>
                    A solução passo a passo
                  </li>
                </ul>
                <p className="mb-6 rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-sm text-green-300">
                  💡 <strong>Sem scanner caro.</strong> Só o celular e a plataforma. Você vira referência na região.
                </p>
              </div>

              {/* Exemplo real simulado */}
              <div className="flex items-center">
                <div className="w-full rounded-xl border border-[#2a2a3e] bg-[#0a0a0f]/80 p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8888a4]">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Simulação real da plataforma
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-[#8888a4]">Moto selecionada</span>
                      <p className="text-lg font-bold text-white">Honda Biz 110i</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#8888a4]">Piscadas da luz MIL</span>
                      <p className="text-lg font-bold text-orange-400">8 piscadas</p>
                    </div>
                    <div className="rounded-lg border border-[#2a2a3e] bg-[#12121a] p-4">
                      <p className="mb-2 text-xs font-bold text-[#6c5ce7]">RESULTADO DO DIAGNÓSTICO:</p>
                      <div className="space-y-2 text-sm">
                        <p className="text-[#e4e4ef]">➡ <strong className="text-white">Sensor TPS (Posição da Borboleta)</strong> com falha</p>
                        <p className="text-[#e4e4ef]">➡ Resistência esperada: <strong className="text-white">0.5 - 4.5 kΩ</strong></p>
                        <p className="text-[#e4e4ef]">➡ Teste: <strong className="text-white">Multímetro nos pinos 1 e 3</strong></p>
                        <p className="text-[#e4e4ef]">➡ Solução: <strong className="text-green-400">Ajustar posição ou substituir sensor</strong></p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-[#8888a4]">Resultado aparece em menos de 10 segundos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 6. BENEFÍCIOS */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Por que mecânicos estão <span className="text-[#6c5ce7]">largando o achismo</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Veja o que muda na sua rotina com a OficinaDigital:
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-2 text-lg font-bold text-white">Diagnóstico em segundos</h3>
              <p className="text-[#8888a4]">
                Para de perder horas testando peça por peça. Descubra o problema de primeira com o diagnóstico eletrônico.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">💰</div>
              <h3 className="mb-2 text-lg font-bold text-white">Mais motos por dia = mais dinheiro</h3>
              <p className="text-[#8888a4]">
                Resolvendo mais rápido, você atende mais clientes por dia. O acesso se paga no primeiro serviço.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">📚</div>
              <h3 className="mb-2 text-lg font-bold text-white">+300 manuais na palma da mão</h3>
              <p className="text-[#8888a4]">
                Honda, Yamaha, Kawasaki e mais. Chega de ficar procurando na internet. Tá tudo aqui, organizado.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">🏆</div>
              <h3 className="mb-2 text-lg font-bold text-white">Vira referência na região</h3>
              <p className="text-[#8888a4]">
                Cliente vê que você diagnostica rápido e certeiro. Volta sempre e ainda indica pros outros.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">🚫</div>
              <h3 className="mb-2 text-lg font-bold text-white">Acabou o achismo</h3>
              <p className="text-[#8888a4]">
                Nada de trocar peça no chute. Você sabe exatamente o que está errado antes de mexer na moto.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 sm:p-8">
              <div className="mb-3 text-3xl">📱</div>
              <h3 className="mb-2 text-lg font-bold text-white">Usa direto na oficina</h3>
              <p className="text-[#8888a4]">
                Funciona no celular, sem instalar app. Abre o navegador, busca o modelo e pronto. Simples como mandar um Zap.
              </p>
            </div>
          </div>

          {/* CTA intermediário */}
          <div className="mt-10 text-center">
            <Link href="/register" className="group relative inline-block overflow-hidden rounded-xl bg-[#6c5ce7] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10">QUERO ACESSAR AGORA →</span>
            </Link>
            <p className="mt-3 text-sm text-[#8888a4]">Pagamento único • Sem mensalidade • Acesso imediato</p>
          </div>
        </section>


        {/* ============================================ */}
        {/* 6.5 POR QUE ESSA FERRAMENTA VAI MUDAR SEU TRABALHO */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:mt-28 sm:px-6">
          <div className="mb-3 text-center text-4xl">🚀</div>
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Por que essa ferramenta vai <span className="text-[#6c5ce7]">mudar seu jeito de trabalhar</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Não é só mais uma ferramenta. É o que separa o mecânico que perde tempo do que resolve rápido e ganha mais.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Diagnósticos com muito mais precisão</h3>
                <p className="text-sm text-[#8888a4]">Chega de ficar &quot;no achismo&quot; — tenha um direcionamento claro do problema da moto.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Pare de condenar peças sem necessidade</h3>
                <p className="text-sm text-[#8888a4]">Evite prejuízo e aumente sua credibilidade com seus clientes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Leve mais por menos</h3>
                <p className="text-sm text-[#8888a4]">Você recebe 2 E-books completos pelo preço de 1.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">+75 modelos de motos organizados por ano</h3>
                <p className="text-sm text-[#8888a4]">Tudo separado e fácil de encontrar — sem perder tempo procurando.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Reduza drasticamente o tempo de diagnóstico</h3>
                <p className="text-sm text-[#8888a4]">Descubra o problema muito mais rápido e atenda mais clientes no dia.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Nunca mais perca tempo em manual complicado</h3>
                <p className="text-sm text-[#8888a4]">Já simplifiquei tudo pra você — é só acessar e usar.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Esqueça a dor de cabeça com cores de fios</h3>
                <p className="text-sm text-[#8888a4]">Não precisa decorar nada — a ferramenta já te mostra o caminho.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-5 transition-all hover:border-[#6c5ce7]/30">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm text-green-400">✔</span>
              <div>
                <h3 className="mb-1 font-bold text-white">Trabalhe com mais segurança e confiança</h3>
                <p className="text-sm text-[#8888a4]">Tenha certeza do que está fazendo em cada diagnóstico.</p>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 7. PROVA SOCIAL (formato WhatsApp) */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:mt-28 sm:px-6">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Depoimentos reais de quem já usa</span>
          </div>
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Olha o que os mecânicos estão <span className="text-[#6c5ce7]">mandando no WhatsApp</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#8888a4] sm:text-lg">
            Gente real, usando no dia a dia da oficina.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Depoimento 1 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">C</div>
                <div>
                  <p className="text-sm font-bold text-white">Carlos — SP</p>
                  <p className="text-xs text-[#8888a4]">Mecânico há 12 anos</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;Cara, eu tava quebrando a cabeça numa CG 160 que tava falhando. Entrei na plataforma, vi que era 7 piscadas = sensor MAP. Testei, troquei, resolveu em 20 min. Antes ia levar o dia todo 🔥&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido hoje</p>
            </div>

            {/* Depoimento 2 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">A</div>
                <div>
                  <p className="text-sm font-bold text-white">André — MG</p>
                  <p className="text-xs text-[#8888a4]">Oficina própria</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;O diagnóstico eletrônico é SINISTRO. O cliente fica impressionado quando eu falo o defeito só olhando o painel. Profissionalismo total, valeu cada centavo 👏&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido ontem</p>
            </div>

            {/* Depoimento 3 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">R</div>
                <div>
                  <p className="text-sm font-bold text-white">Rafael — PR</p>
                  <p className="text-xs text-[#8888a4]">Mecânico freelancer</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;Só a calculadora de válvulas já valeu o investimento. Eu perdia uns 40 min calculando na mão. Agora é automático, sem erro. E os manuais tão todos organizados, nota 10&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido segunda</p>
            </div>

            {/* Depoimento 4 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">M</div>
                <div>
                  <p className="text-sm font-bold text-white">Marcos — BA</p>
                  <p className="text-xs text-[#8888a4]">Mecânico há 8 anos</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;Mano, eu achava que não ia servir pra mim pq só mexo com Honda. Mas é justamente o forte! Diagnóstico, manuais, tudo Honda. Me arrependi de não ter comprado antes&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido hoje</p>
            </div>

            {/* Depoimento 5 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">J</div>
                <div>
                  <p className="text-sm font-bold text-white">João — GO</p>
                  <p className="text-xs text-[#8888a4]">Dono de oficina</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;Comprei de manhã, usei no mesmo dia. Já resolvi 2 motos que tavam paradas na oficina. Se paga no primeiro serviço, sem zueira&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido ontem</p>
            </div>

            {/* Depoimento 6 */}
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/80 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-white">L</div>
                <div>
                  <p className="text-sm font-bold text-white">Lucas — RJ</p>
                  <p className="text-xs text-[#8888a4]">Mecânico iniciante</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a2e1a] p-4 text-sm text-[#e4e4ef]">
                <p>&quot;Tô começando na área e isso aqui tá sendo meu professor. Manual de tudo, diagnóstico passo a passo. Parece que tenho um mecânico experiente do lado 💪&quot;</p>
              </div>
              <p className="mt-2 text-right text-xs text-[#8888a4]">Recebido terça</p>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 8. QUEBRA DE OBJEÇÕES */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6">
          <h2 className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Ainda tem <span className="text-[#6c5ce7]">alguma dúvida?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-[#8888a4] sm:text-lg">
            Veja as perguntas que todo mecânico faz antes de acessar:
          </p>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;Funciona mesmo ou é enganação?&quot;
              </h3>
              <p className="text-[#8888a4]">Funciona sim. São manuais originais de fábrica e o diagnóstico é baseado nos códigos oficiais Honda. Mais de 300 mecânicos já usam no dia a dia. E você tem 7 dias de garantia — se não gostar, devolvemos seu dinheiro.</p>
            </div>

            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;Precisa de scanner pra usar?&quot;
              </h3>
              <p className="text-[#8888a4]">Não! O diferencial da plataforma é justamente esse. O diagnóstico Honda funciona pelas piscadas da luz MIL no painel. Você só precisa do celular. Zero equipamento extra.</p>
            </div>

            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;É difícil de usar? Sou ruim com tecnologia.&quot;
              </h3>
              <p className="text-[#8888a4]">Se você sabe usar WhatsApp, sabe usar a OficinaDigital. É abrir no navegador, digitar o modelo da moto e pronto. Não precisa instalar nada, não precisa criar conta complicada. É simples de verdade.</p>
            </div>

            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;Serve pra minha moto? Só mexo com Honda.&quot;
              </h3>
              <p className="text-[#8888a4]">Honda é justamente o ponto forte! São centenas de manuais Honda + diagnóstico eletrônico exclusivo pra Honda. Mas também tem Yamaha, Kawasaki e outras marcas.</p>
            </div>

            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;Como recebo o acesso?&quot;
              </h3>
              <p className="text-[#8888a4]">Paga via PIX e o acesso é liberado na hora, automaticamente. Sem esperar aprovação, sem mandar comprovante pra ninguém. Pagou, entrou.</p>
            </div>

            <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-[#6c5ce7]">❓</span> &quot;Tem mensalidade?&quot;
              </h3>
              <p className="text-[#8888a4]">Não! Pagamento único. Você paga uma vez e usa para sempre. Sem cobranças surpresa, sem renovação automática, sem pegadinha.</p>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 9. OFERTA + 10. GARANTIA + 11. URGÊNCIA */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:mt-28 sm:px-6">
          <div className="overflow-hidden rounded-2xl border-2 border-[#6c5ce7]/50 bg-gradient-to-b from-[#6c5ce7]/10 to-[#0a0a0f] shadow-2xl shadow-[#6c5ce7]/20">
            <div className="p-8 sm:p-12">
              {/* Urgência */}
              <div className="mb-6 text-center">
                <div className="mb-4 inline-block rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-bold text-red-400 animate-pulse">
                  🔥 OFERTA PROMOCIONAL — pode acabar a qualquer momento
                </div>
                <h2 className="mb-2 text-3xl font-extrabold sm:text-4xl">
                  Acesse tudo por um <span className="text-[#6c5ce7]">pagamento único</span>
                </h2>
                <p className="text-lg text-[#8888a4]">Sem mensalidade. Sem surpresa. Pra sempre.</p>
              </div>

              {/* O que está incluso */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">+300 manuais de serviço (Honda, Yamaha, Kawasaki...)</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">Diagnóstico eletrônico Honda (exclusivo)</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">Calculadora de válvulas automática</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">Tabela de óleo e suspensão por modelo</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">Acesso vitalício (paga 1x, usa pra sempre)</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a2a3e] bg-[#12121a]/60 px-5 py-3">
                  <span className="text-green-400">✔</span>
                  <span className="text-[#e4e4ef]">Todas as atualizações futuras incluídas</span>
                </div>
              </div>

              {/* Bônus */}
              <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
                <p className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-yellow-400">🎁 BÔNUS EXCLUSIVOS (por tempo limitado)</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">🎁</span>
                    <span className="text-[#e4e4ef]"><strong className="text-white">Guia Rápido de Diagnóstico</strong> — referência rápida dos códigos mais comuns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">🎁</span>
                    <span className="text-[#e4e4ef]"><strong className="text-white">Suporte via WhatsApp</strong> — tira dúvidas direto com a equipe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">🎁</span>
                    <span className="text-[#e4e4ef]"><strong className="text-white">Novos manuais adicionados mensalmente</strong> — sem custo extra</span>
                  </div>
                </div>
              </div>

              {/* Garantia */}
              <div className="mb-8 rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
                <div className="mb-2 text-4xl">🛡️</div>
                <h3 className="mb-2 text-xl font-bold text-white">Garantia de 7 dias</h3>
                <p className="text-[#8888a4]">
                  Se em 7 dias você sentir que não valeu a pena, devolvemos <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia. O risco é todo nosso.
                </p>
              </div>

              {/* CTA principal */}
              <div className="text-center">
                <Link href="/register" className="group relative inline-block w-full overflow-hidden rounded-xl bg-[#6c5ce7] px-10 py-5 text-center text-xl font-bold text-white shadow-xl shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-2xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
                  <span className="relative z-10">QUERO ACESSAR AGORA →</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold text-green-400">Pagamento único via PIX • Acesso imediato</p>
                  <p className="text-xs text-[#8888a4]">🔒 Compra 100% segura • 7 dias de garantia</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* BLOCO DE CONFIANÇA */}
        {/* ============================================ */}
        <section className="mx-auto mt-16 max-w-3xl px-4 sm:mt-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center">
              <div className="mb-3 text-3xl">🔒</div>
              <p className="text-sm font-bold text-white">Pagamento Seguro</p>
              <p className="mt-1 text-xs text-[#8888a4]">PIX com confirmação automática</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center">
              <div className="mb-3 text-3xl">⚡</div>
              <p className="text-sm font-bold text-white">Acesso Imediato</p>
              <p className="mt-1 text-xs text-[#8888a4]">Liberado em segundos após pagar</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-[#2a2a3e] bg-[#12121a]/60 p-6 text-center">
              <div className="mb-3 text-3xl">🛡️</div>
              <p className="text-sm font-bold text-white">7 Dias de Garantia</p>
              <p className="mt-1 text-xs text-[#8888a4]">Devolvemos 100% se não gostar</p>
            </div>
          </div>
        </section>


        {/* ============================================ */}
        {/* 12. CTA FINAL - FECHAMENTO FORTE */}
        {/* ============================================ */}
        <section className="mx-auto mt-20 max-w-3xl px-4 pb-20 sm:mt-28 sm:px-6 sm:pb-28">
          <div className="rounded-2xl border border-[#6c5ce7]/30 bg-gradient-to-b from-[#6c5ce7]/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl md:text-4xl">
              Você tem duas opções agora:
            </h2>

            <div className="mx-auto mb-8 max-w-lg space-y-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-left">
                <p className="text-[#e4e4ef]">
                  <strong className="text-red-400">Opção 1:</strong> Continuar perdendo horas procurando manual na internet, trocando peça no chute e deixando dinheiro na mesa…
                </p>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-left">
                <p className="text-[#e4e4ef]">
                  <strong className="text-green-400">Opção 2:</strong> Ter a ferramenta #1 dos mecânicos de motos no seu celular AGORA. Diagnosticar em segundos, atender mais clientes e ganhar mais dinheiro.
                </p>
              </div>
            </div>

            <Link href="/register" className="group relative inline-block w-full overflow-hidden rounded-xl bg-[#6c5ce7] px-10 py-5 text-center text-xl font-bold text-white shadow-xl shadow-[#6c5ce7]/30 transition-all hover:bg-[#7c6ef7] hover:shadow-2xl hover:shadow-[#6c5ce7]/40 hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
              <span className="relative z-10">LIBERAR MEU ACESSO AGORA →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <div className="mt-6 space-y-1">
              <p className="text-sm font-semibold text-green-400">Pagamento único via PIX • Sem mensalidade</p>
              <p className="text-xs text-[#8888a4]">🔒 7 dias de garantia • Acesso imediato • +300 mecânicos já usam</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
