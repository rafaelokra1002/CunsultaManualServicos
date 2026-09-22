"use client";

import { useState } from "react";
import {
  motorcycleModels,
  testTypeLegend,
  type MotorcycleModel,
  type ModelVariant,
  type DiagnosticCode,
} from "@/data/diagnostics";

const typeColors: Record<string, string> = {
  AL: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  CC: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  CA: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  SN: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  RS: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  PR: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  VZ: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  PV: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  VS: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

export default function Home() {
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
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-zinc-950 font-sans text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-bold text-sm">
              ⚙
            </div>
            <h1 className="text-lg font-bold tracking-tight">Moto Diag</h1>
          </div>
          <span className="text-xs text-zinc-500 ml-auto">Honda Check List 2026</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Breadcrumb */}
        {selectedModel && (
          <div className="flex items-center gap-2 mb-4 text-sm text-zinc-400">
            <button onClick={() => { setSelectedModel(null); setSelectedVariant(null); setSelectedCode(null); }} className="hover:text-white transition-colors">
              Modelos
            </button>
            <span>/</span>
            <button onClick={() => { setSelectedVariant(null); setSelectedCode(null); }} className="hover:text-white transition-colors">
              {selectedModel.name}
            </button>
            {selectedVariant && (
              <>
                <span>/</span>
                <button onClick={() => setSelectedCode(null)} className="hover:text-white transition-colors">
                  {selectedVariant.yearRange}
                </button>
              </>
            )}
            {selectedCode && (
              <>
                <span>/</span>
                <span className="text-amber-400">{selectedCode.name}</span>
              </>
            )}
          </div>
        )}

        {/* Model Selection */}
        {!selectedModel && (
          <div>
            {/* Hero / Welcome Section */}
            <div className="mb-8 text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4 shadow-lg shadow-amber-500/20">
                <span className="text-3xl">🔧</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Diagnóstico Eletrônico
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto">
                Consulte códigos de falha, padrões de teste e localizações para diagnóstico de injeção eletrônica Honda.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-400">{motorcycleModels.length}</div>
                <div className="text-xs text-zinc-500 mt-1">Modelos</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {motorcycleModels.reduce((acc, m) => acc + m.variants.length, 0)}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Variantes</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {motorcycleModels.reduce((acc, m) => acc + m.variants.reduce((a, v) => a + v.codes.length, 0), 0)}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Códigos</div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Como usar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                  <p className="text-xs text-zinc-400">Selecione o <span className="text-zinc-200">modelo</span> da motocicleta</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                  <p className="text-xs text-zinc-400">Escolha o <span className="text-zinc-200">ano</span> e o código de falha</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                  <p className="text-xs text-zinc-400">Consulte os <span className="text-zinc-200">testes</span> e padrões</p>
                </div>
              </div>
            </div>

            {/* Search + Model List */}
            <h3 className="text-lg font-bold mb-3">Selecione o Modelo</h3>
            <input
              type="text"
              placeholder="🔍 Buscar modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredModels.map((model) => (
                <button
                  key={model.name}
                  onClick={() => handleModelSelect(model)}
                  className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 transition-all text-left group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-amber-400 transition-colors">{model.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {model.variants.length} variante{model.variants.length > 1 ? "s" : ""} · {model.variants[0].yearStart} - {model.variants[model.variants.length - 1].yearEnd}
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 transition-colors">→</span>
                </button>
              ))}
            </div>
            {filteredModels.length === 0 && (
              <p className="text-center text-zinc-500 py-8">Nenhum modelo encontrado</p>
            )}
          </div>
        )}

        {/* Year Variant Selection */}
        {selectedModel && !selectedVariant && (
          <div>
            <button onClick={handleBack} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
              ← Voltar
            </button>
            <h2 className="text-2xl font-bold mb-1">{selectedModel.name}</h2>
            <p className="text-zinc-400 text-sm mb-6">Selecione o ano do modelo</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedModel.variants.map((variant) => (
                <button
                  key={variant.yearRange}
                  onClick={() => handleVariantSelect(variant)}
                  className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 transition-all text-left group"
                >
                  <div>
                    <div className="font-semibold text-lg group-hover:text-amber-400 transition-colors">{variant.yearRange}</div>
                    <div className="text-xs text-zinc-500 mt-1">{variant.codes.length} códigos de diagnóstico</div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 transition-colors">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnostic Codes List */}
        {selectedVariant && !selectedCode && (
          <div>
            <button onClick={handleBack} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
              ← Voltar
            </button>
            <h2 className="text-2xl font-bold mb-1">{selectedModel!.name}</h2>
            <p className="text-amber-400 text-sm font-medium mb-6">{selectedVariant.yearRange}</p>
            <div className="space-y-2">
              {selectedVariant.codes.map((code, i) => (
                <button
                  key={`${code.code}-${code.name}-${i}`}
                  onClick={() => setSelectedCode(code)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0">
                      {code.code.match(/\d+/)?.[0] || "⚡"}
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-amber-400 transition-colors">{code.name}</div>
                      <div className="text-xs text-zinc-500">{code.code}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600">{code.tests.length} testes</span>
                    <span className="text-zinc-600 group-hover:text-amber-400 transition-colors">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnostic Test Details */}
        {selectedCode && (
          <div>
            <button onClick={handleBack} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white mb-4 transition-colors">
              ← Voltar
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{selectedCode.name}</h2>
              <p className="text-amber-400 text-sm font-medium">{selectedCode.code}</p>
              <p className="text-zinc-500 text-xs mt-1">{selectedModel!.name} · {selectedVariant!.yearRange}</p>
              {selectedCode.note && (
                <div className="mt-3 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
                  ⚠ {selectedCode.note}
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-3 text-zinc-400 font-medium">Padrão</th>
                    <th className="text-left py-3 px-3 text-zinc-400 font-medium">Localização</th>
                    <th className="text-left py-3 px-3 text-zinc-400 font-medium">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCode.tests.map((test, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="py-3 px-3 font-mono text-sm">{test.padrao}</td>
                      <td className="py-3 px-3 text-zinc-300">{test.localizacao}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${typeColors[test.tipo] || "bg-zinc-800 text-zinc-300"}`} title={testTypeLegend[test.tipo]}>
                          {test.tipo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-2">Legenda</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(testTypeLegend).map(([key, value]) => (
                  <span key={key} className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeColors[key] || "bg-zinc-800 text-zinc-300"}`}>
                    <span className="font-bold">{key}</span>
                    <span className="opacity-80">= {value}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-600">
        Moto Diag · Sensor MAP · Check List Honda 2026
      </footer>
    </div>
  );
}
