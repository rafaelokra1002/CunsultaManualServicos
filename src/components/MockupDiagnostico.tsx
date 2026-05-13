"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const MODELS = [
  { name: "BIZ 110",       variants: 2, years: "2016-2024" },
  { name: "POP 110",       variants: 2, years: "2015-2026" },
  { name: "LEAD 110",      variants: 3, years: "2009-2014" },
  { name: "BIZ 125",       variants: 5, years: "2009-2026" },
  { name: "CG 125i FAN",   variants: 1, years: "2016-2018" },
  { name: "CG 125i CARGO", variants: 1, years: "2016-2018" },
  { name: "CG 150 FAN",    variants: 3, years: "2009-2015" },
  { name: "CG 150 START",  variants: 1, years: "2015-2015" },
];

const FAULTS_BIZ110 = [
  { code: "7",  name: "EOT",              subtitle: "7 PISCADAS MIL",       tests: 6, electric: false },
  { code: "8",  name: "TPS",              subtitle: "8 PISCADAS MIL",       tests: 7, electric: false },
  { code: "12", name: "BICO INJETOR",     subtitle: "12 PISCADAS MIL",      tests: 4, electric: false },
  { code: "21", name: "SENSOR OXIGÊNIO",  subtitle: "21 PISCADAS MIL",      tests: 3, electric: false },
  { code: "⚡", name: "BOMBA",            subtitle: "BOMBA DE COMBUSTÍVEL",  tests: 4, electric: true  },
  { code: "⚡", name: "MIL ACESA DIRETA", subtitle: "CIRCUITO DA MIL",      tests: 1, electric: true  },
  { code: "⚡", name: "MIL NÃO ACENDE",   subtitle: "CIRCUITO DA MIL",      tests: 1, electric: true  },
];

const TESTS_EOT = [
  { padrao: "4,75 – 5,25 V",  local: "Am/Az+ | Terra-",   tipo: "AL", color: "#3b82f6" },
  { padrao: "Contín. (N)",     local: "Am/Az | Terra",      tipo: "CC", color: "#ef4444" },
  { padrao: "2,5 – 2,8 kΩ",   local: "Am/Az | Vd/Bc",     tipo: "RS", color: "#8b5cf6" },
  { padrao: "Contín. (S)",     local: "Am/Az | Pino 24",    tipo: "CA", color: "#f59e0b" },
  { padrao: "Contín. (S)",     local: "Vd/Bc | Pino 4",     tipo: "CA", color: "#f59e0b" },
  { padrao: "2,70 – 3,10 V",  local: "Pino 4– | Pino 24+", tipo: "SN", color: "#10b981" },
];

// How long each screen stays (ms)
const STEP_DURATIONS = [5500, 2500, 2500, 5500];

export default function MockupDiagnostico() {
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);

  const goToStep = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setStep(next);
      setFading(false);
    }, 200);
  }, []);

  // Auto-advance through screens
  useEffect(() => {
    const timer = setTimeout(() => {
      goToStep((step + 1) % 4);
    }, STEP_DURATIONS[step]);
    return () => clearTimeout(timer);
  }, [step, goToStep]);

  return (
    <>
      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes od-float-phone {
          0%,100% { transform: perspective(900px) rotateY(-18deg) rotateX(5deg) translateY(0px); }
          50%      { transform: perspective(900px) rotateY(-15deg) rotateX(3deg) translateY(-18px); }
        }
        @keyframes od-glow-pulse {
          0%,100% { opacity:.50; transform:scale(1) translateX(-5%); }
          50%     { opacity:.75; transform:scale(1.10) translateX(-5%); }
        }
        @keyframes od-badge1 {
          0%,100% { transform:translateY(0px)   rotate(-2deg); }
          50%     { transform:translateY(-10px)  rotate(1deg);  }
        }
        @keyframes od-badge2 {
          0%,100% { transform:translateY(0px)   rotate(2deg);  }
          50%     { transform:translateY(-14px)  rotate(-1deg); }
        }
        @keyframes od-dot-pulse {
          0%,100% { transform:scale(1);   opacity:1;   box-shadow:0 0 0 0   rgba(167,139,250,.7); }
          50%     { transform:scale(1.5); opacity:.65; box-shadow:0 0 0 6px rgba(167,139,250,0);  }
        }
        @keyframes od-icon-bounce {
          0%,100% { transform:translateY(0)    rotate(0deg);  }
          30%     { transform:translateY(-5px)  rotate(-8deg); }
          60%     { transform:translateY(-2px)  rotate(4deg);  }
        }
        @keyframes od-cursor {
          0%   { opacity:0; transform:translate(72px,-52px) scale(.5); }
          18%  { opacity:1; transform:translate(0,0)         scale(1);  }
          32%  { opacity:1; transform:translate(0,0)         scale(.6); }
          46%  { opacity:1; transform:translate(0,0)         scale(1);  }
          72%  { opacity:1; transform:translate(0,0)         scale(1);  }
          87%  { opacity:0; transform:translate(72px,-52px)  scale(.5); }
          100% { opacity:0; transform:translate(72px,-52px)  scale(.5); }
        }
        @keyframes od-card-highlight {
          0%,15%   { border-color: rgba(167,139,250,.42); box-shadow: none; }
          28%,42%  { border-color: rgba(167,139,250,.85); box-shadow: 0 0 14px rgba(167,139,250,.35); }
          57%,100% { border-color: rgba(167,139,250,.42); box-shadow: none; }
        }
        /* Mobile: scale phone down */
        @media (max-width:640px) {
          .od-phone-wrap {
            transform: scale(.82);
            transform-origin: top center;
            margin-bottom: -100px;
          }
        }
      `}</style>

      {/* ── Section ───────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 62% 40%, rgba(109,40,217,.18) 0%, transparent 65%)," +
            "radial-gradient(ellipse 50% 40% at 18% 80%, rgba(16,185,129,.08) 0%, transparent 60%)," +
            "#050510",
        }}
      >
        {/* subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">

            {/* ══════════════════════════════════════════════════════
                LEFT — TEXT
                ══════════════════════════════════════════════════════ */}
            <div className="flex-1 text-center lg:text-left">

              {/* Pill */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-4 py-1.5 text-sm font-semibold text-[#c4b5fd]">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full bg-[#a78bfa]"
                  style={{ animation: "od-dot-pulse 1.8s ease-in-out infinite" }}
                />
                🟣 FERRAMENTA EXCLUSIVA
              </div>

              {/* H2 */}
              <h2 className="text-4xl font-extrabold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
                Decifre{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  QUALQUER falha
                </span>{" "}
                Honda em segundos
              </h2>

              {/* Paragraph */}
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#b0b3c8] lg:mx-0 lg:text-lg">
                Pare de chutar peça. Selecione o modelo, informe o código de falha e veja{" "}
                <strong className="text-white">EXATAMENTE</strong> qual sensor testar, onde medir
                e como resolver. Tudo direto pelo seu celular.
              </p>

              {/* Stats 3-up */}
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { value: "31",  label: "Modelos",   green: false },
                  { value: "75",  label: "Variantes", green: false },
                  { value: "429", label: "Códigos",   green: true  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl py-4 text-center"
                    style={{
                      background: "#0a0a1a",
                      border: `1px solid ${s.green ? "rgba(16,185,129,.30)" : "rgba(167,139,250,.25)"}`,
                    }}
                  >
                    <p
                      className="text-3xl font-extrabold"
                      style={{
                        background: s.green
                          ? "linear-gradient(135deg,#34d399,#10b981)"
                          : "linear-gradient(135deg,#c4b5fd,#a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-[#8888a4]">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature list */}
              <div className="mt-6 space-y-3">
                {[
                  { icon: "🔧", text: "Testes de multímetro com pinagem completa" },
                  { icon: "📍", text: "Localização exata de cada sensor" },
                  { icon: "⚡", text: "Resultado em até 5 segundos" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-center justify-center gap-3 lg:justify-start"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{ background: "#1a0a2e", border: "1px solid rgba(124,58,237,.30)" }}
                    >
                      {f.icon}
                    </span>
                    <span className="text-sm text-[#c8cad7]">{f.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-2xl px-8 py-5 text-base font-extrabold uppercase tracking-wide text-white transition-all hover:brightness-110 active:scale-[.98]"
                  style={{
                    minHeight: "64px",
                    background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                    boxShadow: "0 8px 32px rgba(124,58,237,.45)",
                  }}
                >
                  🔓 Quero acessar por R$ 67
                </Link>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                RIGHT — PHONE MOCKUP
                ══════════════════════════════════════════════════════ */}
            <div className="od-phone-wrap relative flex shrink-0 items-center justify-center" style={{ width: "380px", height: "760px" }}>

              {/* Glow blob — asymmetric to match tilt */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 55% at 45% 52%, rgba(167,139,250,.55) 0%, rgba(124,58,237,.18) 50%, transparent 75%)",
                  filter: "blur(55px)",
                  transform: "scale(1.5) translateX(-5%) translateY(5%)",
                  animation: "od-glow-pulse 4s ease-in-out infinite",
                }}
              />

              {/* ── Outer metallic frame (animation wrapper) ─────── */}
              <div
                className="relative"
                style={{
                  width: "340px",
                  height: "720px",
                  borderRadius: "50px",
                  padding: "3px",
                  background:
                    "linear-gradient(155deg," +
                    "#7a7a9a 0%," +
                    "#3a3a56 8%," +
                    "#1e1e30 25%," +
                    "#2c2c44 50%," +
                    "#1a1a2a 72%," +
                    "#3e3e5a 88%," +
                    "#1c1c2c 100%)",
                  boxShadow:
                    "0 90px 180px rgba(0,0,0,.92)," +
                    "0 35px 90px rgba(0,0,0,.72)," +
                    "-16px 16px 40px rgba(0,0,0,.60)," +
                    "6px -4px 12px rgba(0,0,0,.40)," +
                    "inset 0 1.5px 0 rgba(255,255,255,.22)," +
                    "inset 0 -1px 0 rgba(0,0,0,.60)," +
                    "inset 1px 0 0 rgba(255,255,255,.08)," +
                    "inset -1px 0 0 rgba(0,0,0,.40)",
                  animation: "od-float-phone 8s ease-in-out infinite",
                }}
              >
                {/* Physical buttons — right (power) */}
                <div
                  className="absolute -right-[7px] top-24 h-16 w-[7px]"
                  style={{
                    background: "linear-gradient(90deg, #3a3a56, #252538, #1a1a28)",
                    boxShadow: "3px 0 8px rgba(0,0,0,.60), inset 0 1px 0 rgba(255,255,255,.12)",
                    borderRadius: "0 4px 4px 0",
                  }}
                />
                {/* Physical buttons — left (volume) */}
                <div
                  className="absolute -left-[7px] top-20 h-10 w-[7px]"
                  style={{
                    background: "linear-gradient(270deg, #3a3a56, #252538, #1a1a28)",
                    boxShadow: "-3px 0 8px rgba(0,0,0,.60), inset 0 1px 0 rgba(255,255,255,.12)",
                    borderRadius: "4px 0 0 4px",
                  }}
                />
                <div
                  className="absolute -left-[7px] top-36 h-10 w-[7px]"
                  style={{
                    background: "linear-gradient(270deg, #3a3a56, #252538, #1a1a28)",
                    boxShadow: "-3px 0 8px rgba(0,0,0,.60), inset 0 1px 0 rgba(255,255,255,.12)",
                    borderRadius: "4px 0 0 4px",
                  }}
                />

                {/* ── Inner screen bezel ──────────────────────────── */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "48px",
                    background: "#020208",
                  }}
                >
                  {/* Dynamic Island */}
                  <div
                    className="absolute left-1/2 top-4 z-20 -translate-x-1/2"
                    style={{
                      width: "118px",
                      height: "33px",
                      borderRadius: "20px",
                      background: "#000",
                      boxShadow: "0 0 0 1px rgba(255,255,255,.06), 0 2px 8px rgba(0,0,0,.8)",
                    }}
                  />

                  {/* Screen */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg,#0a0a18 0%,#0d0d20 100%)",
                      borderRadius: "48px",
                    }}
                  >
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-white/70">
                      <span>23:51</span>
                      <div style={{ width: "118px" }} />
                      <span>📶 🔋</span>
                    </div>

                    {/* ── Animated screen content ───────────────── */}
                    <div
                      className="overflow-hidden px-4 pt-6"
                      style={{
                        height: "672px",
                        opacity: fading ? 0 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >

                      {/* ══ SCREEN 0: Model list ══ */}
                      {step === 0 && (
                        <>
                          {/* App header */}
                          <div className="flex flex-col items-center text-center">
                            <div
                              className="flex h-14 w-14 items-center justify-center rounded-[20px] text-2xl"
                              style={{
                                background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                                boxShadow: "0 8px 24px rgba(124,58,237,.55)",
                                animation: "od-icon-bounce 3s ease-in-out infinite",
                              }}
                            >
                              🔧
                            </div>
                            <p className="mt-1.5 text-[14px] font-bold text-white">Diagnóstico Eletrônico</p>
                            <p className="mt-0.5 px-4 text-[10px] leading-tight text-[#8888a4]">
                              Selecione o modelo da moto
                            </p>
                          </div>

                          {/* Stats mini */}
                          <div className="mt-3 grid grid-cols-3 gap-1.5">
                            {[
                              { v: "31",  l: "Modelos",   g: false },
                              { v: "75",  l: "Variantes", g: false },
                              { v: "429", l: "Códigos",   g: true  },
                            ].map((s) => (
                              <div
                                key={s.l}
                                className="rounded-xl py-2 text-center"
                                style={{
                                  background: s.g ? "rgba(16,185,129,.12)" : "rgba(124,58,237,.12)",
                                  border: `1px solid ${s.g ? "rgba(16,185,129,.30)" : "rgba(124,58,237,.28)"}`,
                                }}
                              >
                                <p className="text-[14px] font-extrabold" style={{ color: s.g ? "#34d399" : "#a78bfa" }}>{s.v}</p>
                                <p className="text-[9px] text-[#8888a4]">{s.l}</p>
                              </div>
                            ))}
                          </div>

                          {/* Search */}
                          <div
                            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
                            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)" }}
                          >
                            <span className="text-[12px] text-[#8888a4]">🔍</span>
                            <span className="text-[10px] text-[#555570]">Buscar modelo...</span>
                          </div>

                          {/* Model grid */}
                          <div className="relative mt-3 grid grid-cols-2 gap-1.5">
                            {MODELS.map((m, i) => (
                              <button
                                key={m.name}
                                onClick={() => i === 0 && goToStep(1)}
                                className="rounded-xl p-2.5 text-left"
                                style={{
                                  background: i === 0
                                    ? "linear-gradient(135deg,rgba(124,58,237,.28),rgba(167,139,250,.10))"
                                    : "rgba(255,255,255,.04)",
                                  border: `1px solid ${i === 0 ? "rgba(167,139,250,.42)" : "rgba(255,255,255,.08)"}`,
                                  animation: i === 0 ? "od-card-highlight 6s ease-in-out infinite" : "none",
                                }}
                              >
                                <p className="text-[11px] font-bold text-white">{m.name}</p>
                                <p className="text-[9px] text-[#8888a4]">{m.variants} variante{m.variants > 1 ? "s" : ""}</p>
                                <p className="text-[9px] text-[#555570]">{m.years}</p>
                              </button>
                            ))}

                            {/* Animated cursor tapping BIZ 110 */}
                            <div
                              className="pointer-events-none absolute z-10"
                              style={{ top: "14px", left: "66px", animation: "od-cursor 6s ease-in-out infinite" }}
                            >
                              <div
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  background: "rgba(255,255,255,.92)",
                                  boxShadow: "0 0 0 4px rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.45)",
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* ══ SCREEN 1: Variant selection ══ */}
                      {step === 1 && (
                        <>
                          <p className="mb-1 text-[8px] text-[#555570]">Modelos / BIZ 110</p>
                          <button
                            onClick={() => goToStep(0)}
                            className="mb-3 text-[10px] text-[#a78bfa] hover:opacity-80"
                          >
                            ← Voltar
                          </button>
                          <h2 className="text-[22px] font-extrabold text-white">BIZ 110</h2>
                          <p className="mb-5 text-[10px] text-[#8888a4]">Selecione o ano do modelo</p>

                          {[
                            { range: "2016 - 2017", count: 7 },
                            { range: "2018 - 2024", count: 7 },
                          ].map((v) => (
                            <button
                              key={v.range}
                              onClick={() => goToStep(2)}
                              className="mb-3 w-full rounded-2xl p-4 text-left transition-all hover:brightness-110"
                              style={{
                                background: "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.12)",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-[15px] font-bold text-white">{v.range}</p>
                                  <p className="mt-0.5 text-[10px] text-[#8888a4]">
                                    {v.count} códigos de diagnóstico
                                  </p>
                                </div>
                                <span className="text-lg text-[#8888a4]">→</span>
                              </div>
                            </button>
                          ))}
                        </>
                      )}

                      {/* ══ SCREEN 2: Fault code list ══ */}
                      {step === 2 && (
                        <>
                          <p className="mb-1 text-[8px] text-[#555570]">Modelos / BIZ 110 / 2016 - 2017</p>
                          <button
                            onClick={() => goToStep(1)}
                            className="mb-2 text-[10px] text-[#a78bfa] hover:opacity-80"
                          >
                            ← Voltar
                          </button>
                          <h2 className="text-[18px] font-extrabold text-white">BIZ 110</h2>
                          <p className="mb-3 text-[11px] font-semibold" style={{ color: "#a78bfa" }}>
                            2016 - 2017
                          </p>

                          <div className="space-y-1.5">
                            {FAULTS_BIZ110.map((fault) => (
                              <button
                                key={fault.name}
                                onClick={() => fault.name === "EOT" ? goToStep(3) : undefined}
                                className="w-full rounded-xl p-2.5 text-left transition-all hover:brightness-110"
                                style={{
                                  background: fault.name === "EOT"
                                    ? "rgba(124,58,237,.12)"
                                    : "rgba(255,255,255,.04)",
                                  border: `1px solid ${fault.name === "EOT" ? "rgba(124,58,237,.35)" : "rgba(255,255,255,.08)"}`,
                                }}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                                    style={{
                                      background: fault.electric
                                        ? "rgba(245,158,11,.28)"
                                        : "rgba(124,58,237,.45)",
                                    }}
                                  >
                                    {fault.code}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-white">{fault.name}</p>
                                    <p className="text-[8.5px] text-[#8888a4]">{fault.subtitle}</p>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    <p className="text-[9px] text-[#8888a4]">{fault.tests} testes</p>
                                  </div>
                                  <span className="text-[11px] text-[#555570]">→</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {/* ══ SCREEN 3: Test detail (EOT) ══ */}
                      {step === 3 && (
                        <>
                          <p className="mb-1 text-[8px] text-[#555570]">BIZ 110 / 2016 - 2017 / EOT</p>
                          <button
                            onClick={() => goToStep(2)}
                            className="mb-2 text-[10px] text-[#a78bfa] hover:opacity-80"
                          >
                            ← Voltar
                          </button>
                          <h2 className="text-[20px] font-extrabold text-white">EOT</h2>
                          <p className="text-[11px] font-bold" style={{ color: "#a78bfa" }}>7 PISCADAS MIL</p>
                          <p className="mb-3 text-[9px] text-[#8888a4]">BIZ 110 · 2016 - 2017</p>

                          {/* Test table */}
                          <div
                            style={{
                              background: "rgba(255,255,255,.04)",
                              border: "1px solid rgba(255,255,255,.09)",
                              borderRadius: "12px",
                              overflow: "hidden",
                            }}
                          >
                            {/* Header */}
                            <div
                              className="grid items-center gap-2 px-3 py-2"
                              style={{
                                gridTemplateColumns: "1fr 1fr 30px",
                                borderBottom: "1px solid rgba(255,255,255,.07)",
                                background: "rgba(255,255,255,.03)",
                              }}
                            >
                              {["PADRÃO", "LOCAL.", "TIPO"].map((h) => (
                                <span key={h} className="text-[8px] font-bold uppercase tracking-wider text-[#555570]">{h}</span>
                              ))}
                            </div>
                            {/* Rows */}
                            {TESTS_EOT.map((t, i) => (
                              <div
                                key={i}
                                className="grid items-center gap-2 px-3 py-2"
                                style={{
                                  gridTemplateColumns: "1fr 1fr 30px",
                                  borderBottom: i < TESTS_EOT.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                                }}
                              >
                                <span className="text-[9.5px] leading-tight text-white">{t.padrao}</span>
                                <span className="text-[8.5px] leading-tight text-[#8888a4]">{t.local}</span>
                                <span
                                  className="flex h-[18px] w-[28px] items-center justify-center rounded text-[7.5px] font-bold"
                                  style={{
                                    background: t.color + "25",
                                    border: `1px solid ${t.color}60`,
                                    color: t.color,
                                  }}
                                >
                                  {t.tipo}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Legend compact */}
                          <div
                            className="mt-2.5 rounded-xl p-2.5"
                            style={{
                              background: "rgba(255,255,255,.03)",
                              border: "1px solid rgba(255,255,255,.07)",
                            }}
                          >
                            <p className="mb-1.5 text-[7px] font-bold uppercase tracking-wider text-[#555570]">
                              LEGENDA DOS TIPOS
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {[
                                ["AL", "#3b82f6"],
                                ["CC", "#ef4444"],
                                ["RS", "#8b5cf6"],
                                ["CA", "#f59e0b"],
                                ["SN", "#10b981"],
                              ].map(([code, color]) => (
                                <span
                                  key={code}
                                  className="rounded px-1.5 py-0.5 text-[7.5px] font-bold"
                                  style={{
                                    background: color + "22",
                                    border: `1px solid ${color}44`,
                                    color: color,
                                  }}
                                >
                                  {code}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                    </div>{/* end content area */}
                  </div>{/* end screen */}

                  {/* Screen gloss reflection */}
                  <div
                    className="pointer-events-none absolute inset-0 z-30"
                    style={{
                      borderRadius: "48px",
                      background:
                        "linear-gradient(145deg," +
                        "rgba(255,255,255,.09) 0%," +
                        "rgba(255,255,255,.04) 25%," +
                        "transparent 55%)",
                    }}
                  />
                </div>{/* end inner bezel */}

                {/* Left edge chamfer highlight */}
                <div
                  className="pointer-events-none absolute inset-y-[12%] left-0 z-40 w-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(255,255,255,.28) 20%, rgba(255,255,255,.18) 70%, transparent 100%)",
                    borderRadius: "1px",
                  }}
                />
              </div>{/* end outer metallic frame */}

              {/* Step indicator dots */}
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: step === i ? "16px" : "6px",
                      height: "6px",
                      background: step === i ? "#a78bfa" : "rgba(255,255,255,.20)",
                    }}
                  />
                ))}
              </div>

              {/* Badge 1 — top-right */}
              <div
                className="absolute -right-4 top-10 z-10 flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-sm"
                style={{
                  background: "rgba(13,13,26,.92)",
                  border: "1px solid rgba(124,58,237,.35)",
                  boxShadow: "0 8px 32px rgba(0,0,0,.50), 0 0 0 1px rgba(255,255,255,.04)",
                  animation: "od-badge1 3.5s ease-in-out infinite",
                }}
              >
                <span className="text-base">⚡</span>
                <div>
                  <p className="text-[11px] font-bold text-white">Diagnóstico</p>
                  <p className="text-[10px] text-[#a78bfa]">em 5 segundos</p>
                </div>
              </div>

              {/* Badge 2 — bottom-left */}
              <div
                className="absolute -left-6 bottom-20 z-10 flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-sm"
                style={{
                  background: "rgba(13,13,26,.92)",
                  border: "1px solid rgba(16,185,129,.32)",
                  boxShadow: "0 8px 32px rgba(0,0,0,.50), 0 0 0 1px rgba(255,255,255,.04)",
                  animation: "od-badge2 4.5s ease-in-out .8s infinite",
                }}
              >
                <span className="text-base">🏍️</span>
                <div>
                  <p className="text-[11px] font-bold text-white">+300 mecânicos</p>
                  <p className="text-[10px] text-[#34d399]">usando agora</p>
                </div>
              </div>
            </div>{/* end phone wrap */}

          </div>
        </div>
      </section>
    </>
  );
}
