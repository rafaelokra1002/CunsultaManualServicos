"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  FerramentaInicializacao,
  FerramentaResetCombustivel,
  ReferenciaIndicador,
} from "@/components/ResetEcmTools";

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
