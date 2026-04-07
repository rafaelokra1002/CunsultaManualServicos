"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  motorcycleModels,
  testTypeLegend,
  abbreviationLegend,
  type MotorcycleModel,
  type ModelVariant,
  type DiagnosticCode,
} from "@/data/diagnostics";

const typeColors: Record<string, string> = {
  AL: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  CC: "bg-red-500/20 text-red-300 border border-red-500/30",
  CA: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  SN: "bg-green-500/20 text-green-300 border border-green-500/30",
  RS: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  PR: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  VZ: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  PV: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  VS: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
};

export default function DiagnosticoPage() {
  const [selectedModel, setSelectedModel] = useState<MotorcycleModel | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ModelVariant | null>(null);
  const [selectedCode, setSelectedCode] = useState<DiagnosticCode | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = searchTerm
    ? motorcycleModels.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : motorcycleModels;

  const handleModelSelect = (model: MotorcycleModel) => {
    setSelectedModel(model);
    setSelectedVariant(null);
    setSelectedCode(null);
  };

  const handleVariantSelect = (variant: ModelVariant) => {
    setSelectedVariant(variant);
    setSelectedCode(null);
  };

  const handleBack = () => {
    if (selectedCode) {
      setSelectedCode(null);
    } else if (selectedVariant) {
      setSelectedVariant(null);
    } else if (selectedModel) {
      setSelectedModel(null);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          {/* Breadcrumb */}
          {selectedModel && (
            <div className="mb-4 flex items-center gap-2 text-sm text-[#8888a4]">
              <button
                onClick={() => { setSelectedModel(null); setSelectedVariant(null); setSelectedCode(null); setSearchTerm(""); }}
                className="transition-colors hover:text-white"
              >
                Modelos
              </button>
              <span className="text-[#555570]">/</span>
              <button
                onClick={() => { setSelectedVariant(null); setSelectedCode(null); }}
                className="transition-colors hover:text-white"
              >
                {selectedModel.name}
              </button>
              {selectedVariant && (
                <>
                  <span className="text-[#555570]">/</span>
                  <button onClick={() => setSelectedCode(null)} className="transition-colors hover:text-white">
                    {selectedVariant.yearRange}
                  </button>
                </>
              )}
              {selectedCode && (
                <>
                  <span className="text-[#555570]">/</span>
                  <span className="text-[#6c5ce7]">{selectedCode.name}</span>
                </>
              )}
            </div>
          )}

          {/* ==================== MODEL SELECTION ==================== */}
          {!selectedModel && (
            <div>
              {/* Hero */}
              <div className="mb-8 text-center py-6">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#a78bfa] shadow-lg shadow-[#6c5ce7]/20">
                  <span className="text-3xl">🔧</span>
                </div>
                <h1 className="mb-2 text-3xl font-extrabold bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">
                  Diagnóstico Eletrônico
                </h1>
                <p className="mx-auto max-w-md text-sm text-[#8888a4]">
                  Consulte códigos de falha, padrões de teste e localizações para diagnóstico de injeção eletrônica Honda.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3 text-center">
                  <div className="text-2xl font-bold text-[#6c5ce7]">{motorcycleModels.length}</div>
                  <div className="mt-1 text-xs text-[#8888a4]">Modelos</div>
                </div>
                <div className="rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {motorcycleModels.reduce((acc, m) => acc + m.variants.length, 0)}
                  </div>
                  <div className="mt-1 text-xs text-[#8888a4]">Variantes</div>
                </div>
                <div className="rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {motorcycleModels.reduce((acc, m) => acc + m.variants.reduce((a, v) => a + v.codes.length, 0), 0)}
                  </div>
                  <div className="mt-1 text-xs text-[#8888a4]">Códigos</div>
                </div>
              </div>

              {/* How it works */}
              <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a]/50 p-4">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#555570]">Como usar</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">1</div>
                    <p className="text-xs text-[#8888a4]">Selecione o <span className="text-[#e4e4ef]">modelo</span> da motocicleta</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">2</div>
                    <p className="text-xs text-[#8888a4]">Escolha o <span className="text-[#e4e4ef]">ano</span> e o código de falha</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">3</div>
                    <p className="text-xs text-[#8888a4]">Consulte os <span className="text-[#e4e4ef]">testes</span> e padrões</p>
                  </div>
                </div>
              </div>

              {/* Search + Model List */}
              <h3 className="mb-3 text-lg font-bold text-white">Selecione o Modelo</h3>
              <input
                type="text"
                placeholder="🔍 Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-dark mb-4 w-full"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredModels.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => handleModelSelect(model)}
                    className="group flex items-center justify-between rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4 text-left transition-all hover:border-[#6c5ce7]/50 hover:bg-[#1a1a2e]"
                  >
                    <div>
                      <div className="font-semibold text-white transition-colors group-hover:text-[#6c5ce7]">{model.name}</div>
                      <div className="mt-1 text-xs text-[#8888a4]">
                        {model.variants.length} variante{model.variants.length > 1 ? "s" : ""} · {model.variants[0].yearStart} - {model.variants[model.variants.length - 1].yearEnd}
                      </div>
                    </div>
                    <span className="text-[#555570] transition-colors group-hover:text-[#6c5ce7]">→</span>
                  </button>
                ))}
              </div>
              {filteredModels.length === 0 && (
                <p className="py-8 text-center text-[#8888a4]">Nenhum modelo encontrado</p>
              )}
            </div>
          )}

          {/* ==================== YEAR VARIANT SELECTION ==================== */}
          {selectedModel && !selectedVariant && (
            <div>
              <button onClick={handleBack} className="mb-4 flex items-center gap-1 text-sm text-[#8888a4] transition-colors hover:text-white">
                ← Voltar
              </button>
              <h2 className="mb-1 text-2xl font-bold text-white">{selectedModel.name}</h2>
              <p className="mb-6 text-sm text-[#8888a4]">Selecione o ano do modelo</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedModel.variants.map((variant) => (
                  <button
                    key={variant.yearRange}
                    onClick={() => handleVariantSelect(variant)}
                    className="group flex items-center justify-between rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4 text-left transition-all hover:border-[#6c5ce7]/50 hover:bg-[#1a1a2e]"
                  >
                    <div>
                      <div className="text-lg font-semibold text-white transition-colors group-hover:text-[#6c5ce7]">{variant.yearRange}</div>
                      <div className="mt-1 text-xs text-[#8888a4]">{variant.codes.length} códigos de diagnóstico</div>
                    </div>
                    <span className="text-[#555570] transition-colors group-hover:text-[#6c5ce7]">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ==================== DIAGNOSTIC CODES LIST ==================== */}
          {selectedVariant && !selectedCode && (
            <div>
              <button onClick={handleBack} className="mb-4 flex items-center gap-1 text-sm text-[#8888a4] transition-colors hover:text-white">
                ← Voltar
              </button>
              <h2 className="mb-1 text-2xl font-bold text-white">{selectedModel!.name}</h2>
              <p className="mb-6 text-sm font-medium text-[#6c5ce7]">{selectedVariant.yearRange}</p>
              <div className="space-y-2">
                {selectedVariant.codes.map((code, i) => (
                  <button
                    key={`${code.code}-${code.name}-${i}`}
                    onClick={() => setSelectedCode(code)}
                    className="group flex w-full items-center justify-between rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4 text-left transition-all hover:border-[#6c5ce7]/50 hover:bg-[#1a1a2e]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6c5ce7]/10 text-xs font-bold text-[#6c5ce7]">
                        {code.code.match(/\d+/)?.[0] || "⚡"}
                      </div>
                      <div>
                        <div className="font-semibold text-white transition-colors group-hover:text-[#6c5ce7]">{code.name}</div>
                        <div className="text-xs text-[#8888a4]">{code.code}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#555570]">{code.tests.length} testes</span>
                      <span className="text-[#555570] transition-colors group-hover:text-[#6c5ce7]">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ==================== DIAGNOSTIC TEST DETAILS ==================== */}
          {selectedCode && (
            <div>
              <button onClick={handleBack} className="mb-4 flex items-center gap-1 text-sm text-[#8888a4] transition-colors hover:text-white">
                ← Voltar
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedCode.name}</h2>
                <p className="text-sm font-medium text-[#6c5ce7]">{selectedCode.code}</p>
                <p className="mt-1 text-xs text-[#8888a4]">{selectedModel!.name} · {selectedVariant!.yearRange}</p>
                {selectedCode.note && (
                  <div className="mt-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-300">
                    ⚠ {selectedCode.note}
                  </div>
                )}
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#2a2a3e]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a3e] bg-[#12121a]">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8888a4]">Padrão</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8888a4]">Localização</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8888a4]">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCode.tests.map((test, i) => (
                      <tr key={i} className="border-b border-[#2a2a3e]/50 transition-colors hover:bg-[#1a1a2e]/50">
                        <td className="px-4 py-3 font-mono text-sm text-white">{test.padrao}</td>
                        <td className="px-4 py-3 text-[#e4e4ef]">{test.localizacao}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${typeColors[test.tipo] || "bg-[#2a2a3e] text-[#8888a4]"}`}
                            title={testTypeLegend[test.tipo]}
                          >
                            {test.tipo}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="mt-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#555570]">Legenda dos Tipos de Teste</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(testTypeLegend).map(([key, value]) => (
                    <span key={key} className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${typeColors[key] || "bg-[#2a2a3e] text-[#8888a4]"}`}>
                      <span className="font-bold">{key}</span>
                      <span className="opacity-80">= {value}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Abbreviations */}
              <div className="mt-4 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#555570]">Abreviações</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(abbreviationLegend).map(([key, value]) => (
                    <span key={key} className="inline-flex items-center gap-1 rounded bg-[#1a1a2e] px-2 py-1 text-xs text-[#8888a4]">
                      <span className="font-bold text-[#e4e4ef]">{key}</span>
                      <span>= {value}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
