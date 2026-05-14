"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

// ─── Tool 1: Inicialização do ECM ───────────────────────────────────────────

const INIT_STEPS = [
  {
    id: 1,
    title: "Conectar ferramenta especial ao DLC",
    details: [
      "Remova a tampa lateral direita (parafusos 3-5)",
      "Remova a tampa do conector DLC [A]",
      "Conecte a ferramenta especial ao DLC",
    ],
    highlight: "Conector SCS: 070PZ-ZY30100",
    icon: "🔌",
    color: "blue",
  },
  {
    id: 2,
    title: "Conectar jumper no sensor EOT",
    details: [
      "Localize o conector 2P do sensor EOT [B]",
      "Conecte diretamente os dois terminais com um fio jumper",
    ],
    highlight: "Conexão: Amarelo/Azul → Verde/Branco",
    icon: "⚡",
    color: "yellow",
  },
  {
    id: 3,
    title: "Ligar ignição e desconectar jumper",
    details: [
      "Ligue o interruptor de ignição",
      "Observe a MIL — ela começará a piscar (padrão de recepção)",
      "Dentro de 10 segundos, desconecte o fio jumper do sensor EOT",
    ],
    highlight: "⏱ Janela de 10 segundos — não perca o tempo!",
    icon: "🔑",
    color: "orange",
    timer: 10,
  },
  {
    id: 4,
    title: "Verificar padrão de piscadas da MIL",
    details: [
      "Após desconectar o jumper, a MIL deve começar a piscar",
      "Padrão de inicialização completada = ✅ sucesso",
      "MIL permanece acesa = ❌ falha — repita do início",
    ],
    highlight: "Se falhar, repita a partir do Passo 1",
    icon: "💡",
    color: "green",
  },
  {
    id: 5,
    title: "Verificar rotação de marcha lenta",
    details: [
      "Ligue o motor e aguarde estabilizar",
      "Verifique se a rotação de marcha lenta está dentro do especificado",
      "Procedimento concluído com sucesso",
    ],
    highlight: "Inicialização do ECM finalizada ✅",
    icon: "🏍️",
    color: "green",
  },
];

const RESET_STEPS = [
  {
    id: 1,
    title: "Preparar combustível",
    desc: "Antes de reinicializar, substitua o combustível no tanque por 100% de gasolina.",
    icon: "⛽",
    color: "yellow",
  },
  {
    id: 2,
    title: "Conectar ferramenta especial ao DLC",
    desc: "Conecte a ferramenta especial ao conector DLC.",
    highlight: "Conector de serviço: 070PZ-ZY30100",
    icon: "🔌",
    color: "blue",
  },
  {
    id: 3,
    title: "Abrir totalmente o acelerador",
    desc: "Abra o acelerador completamente (100%) e mantenha assim.",
    icon: "↕️",
    color: "orange",
  },
  {
    id: 4,
    title: "Ligar o interruptor de ignição",
    desc: "Com o acelerador aberto, ligue a ignição. O indicador de partida a frio acende por ~2s, apaga e começa a piscar no Padrão B após ~4 segundos.",
    highlight: "Padrão B em andamento...",
    icon: "🔑",
    color: "purple",
  },
  {
    id: 5,
    title: "Fechar o acelerador — Padrão B → C",
    desc: "Feche totalmente o acelerador dentro de 5 segundos. O indicador passa para o Padrão C.",
    highlight: "⏱ Feche o acelerador em até 5 segundos!",
    icon: "🔽",
    color: "orange",
    timer: 5,
  },
  {
    id: 6,
    title: "Desconectar conector de serviço — Padrão C → D",
    desc: "Com o indicador piscando no Padrão C, desconecte o conector de serviço dentro de 10 segundos. O indicador passará para o Padrão D.",
    highlight: "⏱ Desconecte em até 10 segundos!",
    icon: "🔓",
    color: "red",
    timer: 10,
  },
  {
    id: 7,
    title: "Reconectar conector de serviço — Padrão D",
    desc: "Com o indicador no Padrão D, reconecte o conector de serviço dentro de 5 segundos.",
    highlight: "⏱ Reconecte em até 5 segundos!",
    icon: "🔗",
    color: "blue",
    timer: 5,
  },
  {
    id: 8,
    title: "Verificar resultado",
    desc: "Se o indicador de partida a frio PISCAR → ECM reinicializado com sucesso (Padrão A). Se ACESO → também reinicializado — desligue a ignição.",
    highlight: "ECM reinicializado ✅ — Verifique dados de condição",
    icon: "✅",
    color: "green",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue:   { border: "border-blue-500/40",   bg: "bg-blue-500/8",   text: "text-blue-300",   badge: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  yellow: { border: "border-yellow-500/40", bg: "bg-yellow-500/8", text: "text-yellow-300", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" },
  orange: { border: "border-orange-500/40", bg: "bg-orange-500/8", text: "text-orange-300", badge: "bg-orange-500/20 text-orange-300 border-orange-500/40" },
  green:  { border: "border-emerald-500/40",bg: "bg-emerald-500/8",text: "text-emerald-300",badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  red:    { border: "border-red-500/40",    bg: "bg-red-500/8",    text: "text-red-300",    badge: "bg-red-500/20 text-red-300 border-red-500/40" },
  purple: { border: "border-purple-500/40", bg: "bg-purple-500/8", text: "text-purple-300", badge: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
};

// ─── Timer component ─────────────────────────────────────────────────────────

function CountdownTimer({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  const start = () => {
    if (running) return;
    setRunning(true);
    setRemaining(seconds);
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          setRunning(false);
          onDone();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        onClick={start}
        disabled={running}
        className="flex h-9 items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 text-sm font-bold text-orange-300 transition hover:bg-orange-500/20 disabled:opacity-50"
      >
        {running ? "⏱ Contando..." : "▶ Iniciar cronômetro"}
      </button>
      <div className="flex-1">
        <div className="mb-1 flex justify-between text-xs text-[#8888a4]">
          <span>{remaining}s restantes</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#1a1a2e]">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Tool 1 ──────────────────────────────────────────────────────────────────

function FerramentaInicializacao() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [timerDone, setTimerDone] = useState(false);

  const step = INIT_STEPS[currentStep];
  const c = colorMap[step.color];
  const isLast = currentStep === INIT_STEPS.length - 1;
  const allDone = completed.length === INIT_STEPS.length;

  const advance = () => {
    if (!completed.includes(currentStep)) {
      setCompleted((prev) => [...prev, currentStep]);
    }
    setTimerDone(false);
    if (!isLast) setCurrentStep((s) => s + 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setCompleted([]);
    setTimerDone(false);
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-1.5">
        {INIT_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`flex h-7 flex-1 items-center justify-center rounded-lg text-xs font-bold transition ${
              completed.includes(i)
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                : i === currentStep
                ? `${c.bg} ${c.text} border ${c.border}`
                : "border border-[#2a2a3e] bg-[#0f0f18] text-[#555570]"
            }`}
          >
            {completed.includes(i) ? "✓" : s.id}
          </button>
        ))}
      </div>

      {/* Card */}
      {!allDone ? (
        <div className={`rounded-2xl border ${c.border} bg-[#0f0f18] p-5`}>
          <div className="mb-3 flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg} text-xl`}>
              {step.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#555570]">
                Passo {step.id} de {INIT_STEPS.length}
              </p>
              <h3 className="text-lg font-extrabold text-white">{step.title}</h3>
            </div>
          </div>

          <ul className="mb-4 space-y-2">
            {step.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#c8cad7]">
                <span className={`mt-0.5 shrink-0 text-xs font-bold ${c.text}`}>→</span>
                {d}
              </li>
            ))}
          </ul>

          {step.highlight && (
            <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-2.5 text-sm font-semibold ${c.text}`}>
              {step.highlight}
            </div>
          )}

          {step.timer && (
            <CountdownTimer
              seconds={step.timer}
              onDone={() => setTimerDone(true)}
            />
          )}

          <div className="mt-5 flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex h-10 items-center gap-1.5 rounded-xl border border-[#2a2a3e] bg-[#151522] px-4 text-sm text-[#8888a4] transition hover:border-[#3a3a5e] hover:text-white"
              >
                ← Voltar
              </button>
            )}
            <button
              onClick={advance}
              disabled={!!(step.timer && !timerDone)}
              className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition disabled:opacity-40 ${
                isLast
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : `border ${c.border} ${c.bg} hover:brightness-125`
              } ${c.text}`}
            >
              {isLast ? "✅ Concluir inicialização" : "Próximo passo →"}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/8 p-6 text-center">
          <div className="text-4xl">✅</div>
          <h3 className="mt-3 text-xl font-extrabold text-white">ECM Inicializado com Sucesso!</h3>
          <p className="mt-1 text-sm text-[#8888a4]">Verifique a rotação de marcha lenta do motor.</p>
          <button
            onClick={reset}
            className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            🔄 Reiniciar procedimento
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Tool 2 ──────────────────────────────────────────────────────────────────

function FerramentaResetCombustivel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [timerDone, setTimerDone] = useState(false);

  const step = RESET_STEPS[currentStep];
  const c = colorMap[step.color];
  const isLast = currentStep === RESET_STEPS.length - 1;
  const allDone = completed.length === RESET_STEPS.length;

  const advance = () => {
    if (!completed.includes(currentStep)) {
      setCompleted((prev) => [...prev, currentStep]);
    }
    setTimerDone(false);
    if (!isLast) setCurrentStep((s) => s + 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setCompleted([]);
    setTimerDone(false);
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex flex-wrap items-center gap-1.5">
        {RESET_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`flex h-7 min-w-[28px] flex-1 items-center justify-center rounded-lg text-xs font-bold transition ${
              completed.includes(i)
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                : i === currentStep
                ? `${c.bg} ${c.text} border ${c.border}`
                : "border border-[#2a2a3e] bg-[#0f0f18] text-[#555570]"
            }`}
          >
            {completed.includes(i) ? "✓" : s.id}
          </button>
        ))}
      </div>

      {!allDone ? (
        <div className={`rounded-2xl border ${c.border} bg-[#0f0f18] p-5`}>
          <div className="mb-3 flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg} text-xl`}>
              {step.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#555570]">
                Passo {step.id} de {RESET_STEPS.length}
              </p>
              <h3 className="text-lg font-extrabold text-white">{step.title}</h3>
            </div>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[#c8cad7]">{step.desc}</p>

          {step.highlight && (
            <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-2.5 text-sm font-semibold ${c.text}`}>
              {step.highlight}
            </div>
          )}

          {step.timer && (
            <CountdownTimer
              seconds={step.timer}
              onDone={() => setTimerDone(true)}
            />
          )}

          <div className="mt-5 flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex h-10 items-center gap-1.5 rounded-xl border border-[#2a2a3e] bg-[#151522] px-4 text-sm text-[#8888a4] transition hover:border-[#3a3a5e] hover:text-white"
              >
                ← Voltar
              </button>
            )}
            <button
              onClick={advance}
              disabled={!!(step.timer && !timerDone)}
              className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition disabled:opacity-40 ${
                isLast
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : `border ${c.border} ${c.bg} hover:brightness-125`
              } ${c.text}`}
            >
              {isLast ? "✅ Concluir reset" : "Próximo passo →"}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/8 p-6 text-center">
          <div className="text-4xl">✅</div>
          <h3 className="mt-3 text-xl font-extrabold text-white">Dados de Combustível Resetados!</h3>
          <p className="mt-1 text-sm text-[#8888a4]">Verifique os dados de condição no ECM.</p>
          <button
            onClick={reset}
            className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            🔄 Reiniciar procedimento
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Pulse Pattern Visualizer ────────────────────────────────────────────────

const PATTERNS = [
  {
    id: 1, label: "A", ethanol: "0 a 40%", pulses: 1,
    color: "emerald", border: "border-emerald-500/40", bg: "bg-emerald-500/20", text: "text-emerald-300", bar: "bg-emerald-400",
  },
  {
    id: 2, label: "B", ethanol: "30 a 70%", pulses: 2,
    color: "blue", border: "border-blue-500/40", bg: "bg-blue-500/20", text: "text-blue-300", bar: "bg-blue-400",
  },
  {
    id: 3, label: "C", ethanol: "60 a 90%", pulses: 3,
    color: "yellow", border: "border-yellow-500/40", bg: "bg-yellow-500/20", text: "text-yellow-300", bar: "bg-yellow-400",
  },
  {
    id: 4, label: "D", ethanol: "80 a 100%", pulses: 4,
    color: "red", border: "border-red-500/40", bg: "bg-red-500/20", text: "text-red-300", bar: "bg-red-400",
  },
];

// Each unit = 0.3s. Pulse=1u, gap between pulses=1u, long pause≈4.3u
function PulseDiagram({ pulses, barClass }: { pulses: number; barClass: string }) {
  // Build segments: [pulse, gap, pulse, gap, ..., long-pause, repeat-dot]
  const segments: { on: boolean; w: number }[] = [];
  for (let i = 0; i < pulses; i++) {
    segments.push({ on: true, w: 14 });   // pulse 0.3s
    if (i < pulses - 1) segments.push({ on: false, w: 10 }); // gap 0.3s
  }
  segments.push({ on: false, w: 36 }); // long pause 1.3s

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-0" style={{ height: 28 }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{ width: seg.w, height: seg.on ? 24 : 4, flexShrink: 0 }}
            className={`rounded-sm ${seg.on ? barClass : "bg-[#1a1a2e]"}`}
          />
        ))}
        {/* "repeats" arrow */}
        <div className="flex flex-1 items-center gap-1 self-center pl-1">
          <div className="h-px flex-1 border-t border-dashed border-[#3a3a5e]" />
          <span className="text-[9px] text-[#555570]">repete</span>
        </div>
      </div>
      {/* Time labels */}
      <div className="flex gap-0 text-[8px] text-[#555570]" style={{ lineHeight: 1 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ width: seg.w, flexShrink: 0 }} className="text-center">
            {seg.on ? "0.3" : seg.w > 20 ? "1.3" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferenciaIndicador() {
  return (
    <div className="space-y-4">

      {/* Comportamento do indicador */}
      <div className="rounded-2xl border border-[#2a2a3e] bg-[#0f0f18] p-5">
        <h3 className="mb-4 text-base font-extrabold text-white">
          💡 Indicador de Partida a Frio — Comportamento
        </h3>
        <div className="space-y-3">

          <div className="rounded-xl border border-[#2a2a3e] bg-[#151522] p-3.5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#555570]">Normal</p>
            <p className="text-sm text-[#c8cad7]">
              Ao ligar a ignição, o indicador acende por{" "}
              <span className="font-bold text-white">2 segundos</span> e então se apaga.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/8 p-3.5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-yellow-400">
              ⚠️ Indicador Piscando ao Ligar → Partida Difícil
            </p>
            <ul className="space-y-1.5 text-sm text-[#c8cad7]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-yellow-400">—</span>
                Temperatura do ar abaixo de <strong className="text-white">15 °C</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-yellow-400">—</span>
                Taxa de etanol aproximadamente <strong className="text-white">80–100%</strong>
              </li>
            </ul>
            <div className="mt-2.5 rounded-lg border border-yellow-500/20 bg-[#0f0f18] p-2.5 text-xs font-semibold text-yellow-300">
              → Adicione <strong>3 L de gasolina</strong> ao tanque e deixe em marcha lenta por 2 minutos
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/8 p-3.5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              🔵 Indicador NÃO Acende + Motor Não Pega
            </p>
            <div className="rounded-lg border border-blue-500/20 bg-[#0f0f18] p-2.5 text-xs font-semibold text-blue-300">
              → Adicione <strong>2 L de gasolina</strong> ao tanque e deixe em marcha lenta por 2 minutos
            </div>
          </div>

        </div>
      </div>

      {/* Tabela de padrões */}
      <div className="rounded-2xl border border-[#2a2a3e] bg-[#0f0f18] p-5">
        <h3 className="mb-1 text-base font-extrabold text-white">
          📊 Índice de Dados de Condição de Combustível no ECM
        </h3>
        <p className="mb-4 text-xs text-[#8888a4]">
          Leitura igual ao procedimento de leitura do DTC — unidade: segundos.
        </p>

        {/* Table header */}
        <div className="mb-2 grid grid-cols-[40px_1fr_1fr] gap-2 px-1 text-[10px] font-bold uppercase tracking-wider text-[#555570]">
          <span>Cód.</span>
          <span>Etanol aprox.</span>
          <span>Padrão de piscadas</span>
        </div>

        <div className="space-y-2.5">
          {PATTERNS.map((p) => (
            <div
              key={p.id}
              className={`grid grid-cols-[40px_1fr_1fr] items-center gap-2 rounded-xl border ${p.border} bg-[#151522] p-3`}
            >
              {/* Code */}
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold ${p.bg} ${p.text} border ${p.border}`}>
                {p.id}
              </div>

              {/* Ethanol + pattern label */}
              <div>
                <p className={`text-sm font-extrabold ${p.text}`}>Padrão {p.label}</p>
                <p className="text-xs text-[#8888a4]">{p.ethanol}</p>
              </div>

              {/* Pulse diagram */}
              <PulseDiagram pulses={p.pulses} barClass={p.bar} />
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] text-[#555570]">
          * Padrão repetido em ciclos. Largura de cada pulso = 0,3 s · Pausa = 1,3 s
        </p>
      </div>

    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

type Tool = "inicializacao" | "reset-combustivel" | "indicador";

export default function ResetECMPage() {
  const [tool, setTool] = useState<Tool | null>(null);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">

          {/* Header */}
          <div className="mb-6">
            {tool && (
              <button
                onClick={() => setTool(null)}
                className="mb-3 flex items-center gap-1.5 text-sm text-[#8888a4] transition hover:text-white"
              >
                ← Voltar
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-2xl">
                🔄
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Reset / Inicialização ECM</h1>
                <p className="text-sm text-[#8888a4]">Honda CG160 Fan ESDi · CG160 Titan EX</p>
              </div>
            </div>
          </div>

          {/* Aviso */}
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/8 p-4">
            <p className="text-sm font-semibold text-red-300">
              ⚠️ Execute os procedimentos com a moto parada e em local ventilado. Siga cada passo na ordem correta.
            </p>
          </div>

          {/* Tool selector */}
          {!tool && (
            <div className="space-y-3">
              <button
                onClick={() => setTool("inicializacao")}
                className="group w-full rounded-2xl border border-blue-500/30 bg-[#0f0f18] p-5 text-left transition hover:border-blue-500/60 hover:bg-blue-500/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-2xl">
                    ⚙️
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Ferramenta 1</p>
                    <h2 className="text-lg font-extrabold text-white">Inicialização do ECM</h2>
                    <p className="mt-1 text-sm text-[#8888a4]">
                      Procedimento passo a passo com jumper no sensor EOT e conector SCS. Inclui cronômetro de 10s.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["5 passos", "Conector SCS", "Sensor EOT", "Cronômetro"].map((t) => (
                        <span key={t} className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#555570] transition group-hover:text-white">→</span>
                </div>
              </button>

              <button
                onClick={() => setTool("reset-combustivel")}
                className="group w-full rounded-2xl border border-purple-500/30 bg-[#0f0f18] p-5 text-left transition hover:border-purple-500/60 hover:bg-purple-500/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-2xl">
                    ⛽
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Ferramenta 2</p>
                    <h2 className="text-lg font-extrabold text-white">Reset de Dados de Combustível no ECM</h2>
                    <p className="mt-1 text-sm text-[#8888a4]">
                      Reset dos dados de condição de combustível com fluxograma interativo. Múltiplos cronômetros.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["8 passos", "Padrões A-D", "Acelerador", "Cronômetros"].map((t) => (
                        <span key={t} className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#555570] transition group-hover:text-white">→</span>
                </div>
              </button>

              <button
                onClick={() => setTool("indicador")}
                className="group w-full rounded-2xl border border-[#f59e0b]/30 bg-[#0f0f18] p-5 text-left transition hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-2xl">
                    💡
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">Referência</p>
                    <h2 className="text-lg font-extrabold text-white">Indicador de Partida a Frio & Padrões A–D</h2>
                    <p className="mt-1 text-sm text-[#8888a4]">
                      Como interpretar o indicador, condições de partida difícil e tabela de padrões de piscada por % de etanol.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Padrão A", "Padrão B", "Padrão C", "Padrão D", "% Etanol"].map((t) => (
                        <span key={t} className="rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#f59e0b]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#555570] transition group-hover:text-white">→</span>
                </div>
              </button>
            </div>
          )}

          {tool === "inicializacao" && (
            <div>
              <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                <p className="text-sm font-bold text-blue-300">⚙️ Inicialização do ECM</p>
                <p className="text-xs text-[#8888a4]">Marque cada passo conforme executar. Use o cronômetro no passo com tempo crítico.</p>
              </div>
              <FerramentaInicializacao />
            </div>
          )}

          {tool === "reset-combustivel" && (
            <div>
              <div className="mb-4 rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">
                <p className="text-sm font-bold text-purple-300">⛽ Reset de Dados de Combustível</p>
                <p className="text-xs text-[#8888a4]">Siga o fluxograma. Use os cronômetros nos passos com tempo crítico.</p>
              </div>
              <FerramentaResetCombustivel />
            </div>
          )}

          {tool === "indicador" && (
            <div>
              <div className="mb-4 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 px-4 py-3">
                <p className="text-sm font-bold text-[#f59e0b]">💡 Referência — Indicador de Partida a Frio</p>
                <p className="text-xs text-[#8888a4]">Honda CG160 Fan ESDi · CG160 Titan EX</p>
              </div>
              <ReferenciaIndicador />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
