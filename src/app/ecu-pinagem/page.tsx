"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import AccessBlock from "@/components/AccessBlock";
import { useFreeTrial } from "@/hooks/useAccess";
import { motosECU, searchMotos, diagnosticarPorSintoma, type MotoECU, type TechnicalParameter, type ECUPin, type ChecklistItem } from "@/data/ecu-database";
import { FerramentaInicializacao, FerramentaResetCombustivel, ReferenciaIndicador } from "@/components/ResetEcmTools";

const categoriaCores: Record<string, string> = {
  sensor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  atuador: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  motor: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  eletrico: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  combustivel: "bg-green-500/20 text-green-300 border border-green-500/30",
};

const categoriaLabels: Record<string, string> = {
  sensor: "Sensor",
  atuador: "Atuador",
  motor: "Motor",
  eletrico: "Elétrico",
  combustivel: "Combustível",
};

const checklistCategoriaLabels: Record<string, string> = {
  eletrico: "⚡ Elétrico",
  sensor: "📡 Sensores",
  combustivel: "⛽ Combustível",
  mecanico: "🔧 Mecânico",
  atuador: "🎯 Atuadores",
};

type TabId = "parametros" | "pinagem" | "diagnostico" | "checklist" | "reset-ecm";

const RESET_ECM_MOTO_IDS = ["cg160"];

export default function ECUDiagnosticoPage() {
  const [selectedMoto, setSelectedMoto] = useState<MotoECU | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("parametros");
  const [sintomaInput, setSintomaInput] = useState("");
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const { blocked, markUsed } = useFreeTrial("ecu-diagnostico");

  const filteredMotos = searchTerm ? searchMotos(searchTerm) : motosECU;

  const marcas = useMemo(() => {
    const set = new Set(motosECU.map((m) => m.marca));
    return Array.from(set);
  }, []);

  const sintomasEncontrados = useMemo(() => {
    if (!selectedMoto || !sintomaInput.trim()) return [];
    return diagnosticarPorSintoma(selectedMoto.id, sintomaInput);
  }, [selectedMoto, sintomaInput]);

  const parametrosFiltrados = useMemo(() => {
    if (!selectedMoto) return [];
    if (filtroCategoria === "todos") return selectedMoto.parametros;
    return selectedMoto.parametros.filter((p) => p.categoria === filtroCategoria);
  }, [selectedMoto, filtroCategoria]);

  const handleSelectMoto = (moto: MotoECU) => {
    setSelectedMoto(moto);
    setActiveTab("parametros");
    setSintomaInput("");
    setChecklistState({});
    setFiltroCategoria("todos");
    markUsed();
  };

  const handleBack = () => {
    setSelectedMoto(null);
    setSearchTerm("");
    setSintomaInput("");
    setChecklistState({});
  };

  const toggleChecklist = (item: string) => {
    setChecklistState((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const checklistProgress = useMemo(() => {
    if (!selectedMoto) return 0;
    const total = selectedMoto.checklist.length;
    const checked = Object.values(checklistState).filter(Boolean).length;
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  }, [selectedMoto, checklistState]);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "parametros", label: "Parâmetros", icon: "📊" },
    { id: "pinagem", label: "Pinagem ECU", icon: "🔌" },
    { id: "diagnostico", label: "Diagnóstico", icon: "🔍" },
    { id: "checklist", label: "Checklist", icon: "✅" },
    ...(selectedMoto && RESET_ECM_MOTO_IDS.includes(selectedMoto.id)
      ? [{ id: "reset-ecm" as TabId, label: "Reset ECM", icon: "🔄" }]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-[#16181c]">
      <Sidebar />
      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          {/* ==================== SELEÇÃO DE MOTO ==================== */}
          {!selectedMoto && (
            <div>
              {/* Hero */}
              <div className="mb-8 text-center py-6">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6a1a] to-[#ff8c3f] shadow-lg shadow-[#ff6a1a]/20">
                  <span className="text-3xl">🔌</span>
                </div>
                <h1 className="mb-2 text-3xl font-extrabold bg-gradient-to-r from-[#ff6a1a] to-[#ff8c3f] bg-clip-text text-transparent">
                  ECU & Pinagem
                </h1>
                <p className="mx-auto max-w-md text-sm text-[#9aa1ac]">
                  Consulte parâmetros técnicos, pinagem da ECU, diagnóstico por sintoma e checklist de inspeção.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#33373f] bg-[#111317] p-3 text-center">
                  <div className="text-2xl font-bold text-[#ff6a1a]">{motosECU.length}</div>
                  <div className="mt-1 text-xs text-[#9aa1ac]">Motos</div>
                </div>
                <div className="rounded-xl border border-[#33373f] bg-[#111317] p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">{marcas.length}</div>
                  <div className="mt-1 text-xs text-[#9aa1ac]">Marcas</div>
                </div>
                <div className="rounded-xl border border-[#33373f] bg-[#111317] p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {motosECU.reduce((acc, m) => acc + m.pinagem.length, 0)}
                  </div>
                  <div className="mt-1 text-xs text-[#9aa1ac]">Pinos Mapeados</div>
                </div>
              </div>

              {/* Como usar */}
              <div className="mb-6 rounded-xl border border-[#33373f] bg-[#111317]/50 p-4">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Como usar</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">1</div>
                    <p className="text-xs text-[#9aa1ac]">Selecione a <span className="text-[#f3f0ea]">moto</span></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">2</div>
                    <p className="text-xs text-[#9aa1ac]">Consulte <span className="text-[#f3f0ea]">parâmetros</span> e <span className="text-[#f3f0ea]">pinagem</span></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">3</div>
                    <p className="text-xs text-[#9aa1ac]">Descreva o <span className="text-[#f3f0ea]">sintoma</span> para diagnóstico</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">4</div>
                    <p className="text-xs text-[#9aa1ac]">Use o <span className="text-[#f3f0ea]">checklist</span> para inspeção</p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <h3 className="mb-3 text-lg font-bold text-white">Selecione a Moto</h3>
              <input
                type="text"
                placeholder="🔍 Buscar por marca, modelo ou ano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-dark mb-4 w-full"
              />

              {/* Moto Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredMotos.map((moto) => (
                  <button
                    key={moto.id}
                    onClick={() => handleSelectMoto(moto)}
                    className="group flex items-center justify-between rounded-xl border border-[#33373f] bg-[#111317] p-4 text-left transition-all hover:border-[#ff6a1a]/50 hover:bg-[#1e2127]"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff6a1a]">{moto.marca}</div>
                      <div className="font-semibold text-white transition-colors group-hover:text-[#ff6a1a]">{moto.modelo}</div>
                      <div className="mt-1 text-xs text-[#9aa1ac]">
                        {moto.ano} · {moto.ecuTipo}
                      </div>
                      <div className="mt-1.5 flex gap-2">
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">{moto.parametros.length} params</span>
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">{moto.pinagem.length} pinos</span>
                      </div>
                    </div>
                    <span className="text-[#6c727c] transition-colors group-hover:text-[#ff6a1a]">→</span>
                  </button>
                ))}
              </div>
              {filteredMotos.length === 0 && (
                <p className="py-8 text-center text-[#9aa1ac]">Nenhuma moto encontrada</p>
              )}
            </div>
          )}

          {/* ==================== DETALHE DA MOTO ==================== */}
          {selectedMoto && (
            <div>
              {/* Breadcrumb */}
              <div className="mb-4 flex items-center gap-2 text-sm text-[#9aa1ac]">
                <button onClick={handleBack} className="transition-colors hover:text-white">Motos</button>
                <span className="text-[#6c727c]">/</span>
                <span className="text-[#ff6a1a]">{selectedMoto.marca} {selectedMoto.modelo}</span>
              </div>

              {/* Header */}
              <div className="mb-6 rounded-xl border border-[#33373f] bg-[#111317] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff6a1a]">{selectedMoto.marca}</div>
                    <h1 className="text-2xl font-bold text-white">{selectedMoto.modelo}</h1>
                    <p className="mt-1 text-sm text-[#9aa1ac]">{selectedMoto.ano}</p>
                  </div>
                  <div className="rounded-lg border border-[#33373f] bg-[#16181c] px-3 py-2 text-center">
                    <div className="text-[10px] font-medium text-[#9aa1ac]">ECU</div>
                    <div className="text-xs font-bold text-[#ff6a1a]">{selectedMoto.ecuTipo}</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-[#33373f] bg-[#111317] p-1 scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:flex-1 ${
                      activeTab === tab.id
                        ? "bg-[#ff6a1a]/20 text-[#ff6a1a] shadow-sm"
                        : "text-[#9aa1ac] hover:bg-[#1e2127] hover:text-white"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* ==================== TAB: PARÂMETROS ==================== */}
              {activeTab === "parametros" && (
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-white">Parâmetros Técnicos</h2>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setFiltroCategoria("todos")}
                        className={`rounded-full px-3 py-1 text-[10px] font-medium transition-all ${
                          filtroCategoria === "todos" ? "bg-[#ff6a1a]/20 text-[#ff6a1a]" : "bg-[#1e2127] text-[#9aa1ac] hover:text-white"
                        }`}
                      >
                        Todos
                      </button>
                      {Object.entries(categoriaLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setFiltroCategoria(key)}
                          className={`rounded-full px-3 py-1 text-[10px] font-medium transition-all ${
                            filtroCategoria === key ? "bg-[#ff6a1a]/20 text-[#ff6a1a]" : "bg-[#1e2127] text-[#9aa1ac] hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {parametrosFiltrados.map((param, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-[#33373f] bg-[#111317] p-4 transition-all hover:border-[#ff6a1a]/30"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-white">{param.nome}</h4>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoriaCores[param.categoria]}`}>
                                {categoriaLabels[param.categoria]}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[#9aa1ac]">{param.descricao}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-lg font-bold text-[#ff6a1a]">
                              {param.valorMin}{param.valorMax !== "–" && param.valorMin !== param.valorMax ? ` - ${param.valorMax}` : ""}
                            </div>
                            <div className="text-xs text-[#9aa1ac]">{param.unidade}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== TAB: PINAGEM ECU ==================== */}
              {activeTab === "pinagem" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-white">Pinagem ECU — {selectedMoto.ecuTipo}</h2>
                  <p className="mb-4 text-xs text-[#9aa1ac]">
                    Cores dos fios: Vd=Verde, Az=Azul, Am=Amarelo, Vm=Vermelho, Bc=Branco, Pt=Preto, Lr=Laranja, Mr=Marrom, Rs=Rosa
                  </p>

                  {/* Table */}
                  <div className="overflow-hidden rounded-xl border border-[#33373f]">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#111317]">
                          <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Pino</th>
                          <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Cor do Fio</th>
                          <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Função</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#33373f]">
                        {selectedMoto.pinagem.map((pin, i) => {
                          const isTerra = pin.funcao.toLowerCase().includes("terra");
                          const isAlimentacao = pin.funcao.toLowerCase().includes("alimentação") || pin.funcao.toLowerCase().includes("bateria") || pin.funcao.toLowerCase().includes("ignição");
                          const isSinal = pin.funcao.toLowerCase().includes("sinal");
                          const rowColor = isTerra
                            ? "bg-green-500/5"
                            : isAlimentacao
                            ? "bg-red-500/5"
                            : isSinal
                            ? "bg-blue-500/5"
                            : "bg-[#16181c]";

                          return (
                            <tr key={i} className={`${rowColor} transition-colors hover:bg-[#1e2127]`}>
                              <td className="px-4 py-3">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">
                                  {pin.pino}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e2127] px-2.5 py-1 text-xs font-medium text-white">
                                  <span className="h-2 w-2 rounded-full" style={{
                                    background: getCorFio(pin.cor),
                                  }} />
                                  {pin.cor}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-[#f3f0ea]">{pin.funcao}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Legenda */}
                  <div className="mt-4 rounded-xl border border-[#33373f] bg-[#111317]/50 p-3">
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Legenda de Cores</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center gap-1.5 text-xs text-[#9aa1ac]"><span className="h-2.5 w-2.5 rounded-full bg-green-500/40" /> Terra</span>
                      <span className="flex items-center gap-1.5 text-xs text-[#9aa1ac]"><span className="h-2.5 w-2.5 rounded-full bg-red-500/40" /> Alimentação</span>
                      <span className="flex items-center gap-1.5 text-xs text-[#9aa1ac]"><span className="h-2.5 w-2.5 rounded-full bg-blue-500/40" /> Sinal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TAB: DIAGNÓSTICO ==================== */}
              {activeTab === "diagnostico" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-white">Diagnóstico por Sintoma</h2>
                  <p className="mb-4 text-xs text-[#9aa1ac]">
                    Descreva o problema da moto e o sistema vai sugerir os testes mais relevantes.
                  </p>

                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ex: moto não liga, falhando, consumo alto, MIL acesa..."
                        value={sintomaInput}
                        onChange={(e) => setSintomaInput(e.target.value)}
                        className="input-dark w-full pl-10"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                    </div>

                    {/* Quick symptom buttons */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedMoto.sintomas.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setSintomaInput(s.keywords[0])}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            sintomaInput === s.keywords[0]
                              ? "border-[#ff6a1a]/50 bg-[#ff6a1a]/20 text-[#ff6a1a]"
                              : "border-[#33373f] bg-[#111317] text-[#9aa1ac] hover:border-[#ff6a1a]/30 hover:text-white"
                          }`}
                        >
                          {s.sintoma}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resultados */}
                  {sintomaInput.trim() && sintomasEncontrados.length > 0 && (
                    <div className="space-y-4">
                      {sintomasEncontrados.map((s, i) => (
                        <div key={i} className="rounded-xl border border-[#ff6a1a]/30 bg-[#111317] p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-xl">⚠️</span>
                            <h3 className="text-lg font-bold text-white">{s.sintoma}</h3>
                          </div>
                          <p className="mb-4 text-sm text-[#9aa1ac]">{s.descricao}</p>

                          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6c727c]">Testes Recomendados</h4>
                          <div className="space-y-2">
                            {s.testesRecomendados.map((teste, j) => {
                              const param = selectedMoto.parametros.find((p) => p.nome === teste);
                              return (
                                <div key={j} className="flex items-center justify-between rounded-lg border border-[#33373f] bg-[#16181c] px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff6a1a]/20 text-xs font-bold text-[#ff6a1a]">{j + 1}</span>
                                    <span className="text-sm font-medium text-white">{teste}</span>
                                  </div>
                                  {param && (
                                    <span className="text-xs text-[#9aa1ac]">
                                      {param.valorMin}{param.valorMax !== "–" && param.valorMin !== param.valorMax ? ` - ${param.valorMax}` : ""} {param.unidade}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sintomaInput.trim() && sintomasEncontrados.length === 0 && (
                    <div className="rounded-xl border border-[#33373f] bg-[#111317] p-8 text-center">
                      <span className="mb-2 block text-3xl">🤔</span>
                      <p className="text-sm text-[#9aa1ac]">Nenhum diagnóstico encontrado para este sintoma.</p>
                      <p className="mt-1 text-xs text-[#6c727c]">Tente: &quot;não liga&quot;, &quot;falhando&quot;, &quot;consumo alto&quot;, &quot;MIL acesa&quot;</p>
                    </div>
                  )}

                  {!sintomaInput.trim() && (
                    <div className="rounded-xl border border-[#33373f] bg-[#111317] p-8 text-center">
                      <span className="mb-2 block text-3xl">💡</span>
                      <p className="text-sm text-[#9aa1ac]">
                        Digite o sintoma ou clique nos botões acima para iniciar o diagnóstico.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== TAB: RESET ECM ==================== */}
              {activeTab === "reset-ecm" && (
                <ResetECMTab />
              )}

              {/* ==================== TAB: CHECKLIST ==================== */}
              {activeTab === "checklist" && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Checklist de Inspeção</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#9aa1ac]">{checklistProgress}%</span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[#1e2127]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#ff6a1a] to-[#ff8c3f] transition-all duration-300"
                          style={{ width: `${checklistProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Agrupado por categoria */}
                  {Object.entries(checklistCategoriaLabels).map(([cat, label]) => {
                    const items = selectedMoto.checklist.filter((c) => c.categoria === cat);
                    if (items.length === 0) return null;
                    return (
                      <div key={cat} className="mb-4">
                        <h3 className="mb-2 text-sm font-bold text-[#9aa1ac]">{label}</h3>
                        <div className="space-y-1.5">
                          {items
                            .sort((a, b) => a.prioridade - b.prioridade)
                            .map((item, i) => (
                            <label
                              key={i}
                              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                                checklistState[item.item]
                                  ? "border-green-500/30 bg-green-500/5"
                                  : "border-[#33373f] bg-[#111317] hover:border-[#ff6a1a]/30"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checklistState[item.item] || false}
                                onChange={() => toggleChecklist(item.item)}
                                className="h-4 w-4 rounded border-[#33373f] bg-[#16181c] text-[#ff6a1a] focus:ring-[#ff6a1a] focus:ring-offset-0"
                              />
                              <span className={`flex-1 text-sm ${checklistState[item.item] ? "text-green-300 line-through" : "text-white"}`}>
                                {item.item}
                              </span>
                              {item.prioridade === 1 && (
                                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-300">Prioritário</span>
                              )}
                              {item.prioridade === 3 && (
                                <span className="rounded-full bg-[#1e2127] px-2 py-0.5 text-[10px] font-medium text-[#6c727c]">Secundário</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {checklistProgress === 100 && (
                    <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
                      <span className="mb-1 block text-2xl">✅</span>
                      <p className="font-bold text-green-300">Inspeção Completa!</p>
                      <p className="mt-1 text-xs text-green-300/70">Todos os itens foram verificados.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Access Block */}
          {blocked && <AccessBlock title="🔒 ECU & Pinagem" message="Libere o acesso para consultar parâmetros, pinagem e diagnóstico completo" />}
        </div>
      </main>
    </div>
  );
}

function ResetECMTab() {
  const [tool, setTool] = useState<"inicializacao" | "reset-combustivel" | "indicador" | null>(null);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Reset / Inicialização ECM</h2>
        {tool && (
          <button
            onClick={() => setTool(null)}
            className="flex items-center gap-1.5 text-sm text-[#9aa1ac] transition hover:text-white"
          >
            ← Voltar
          </button>
        )}
      </div>

      <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/8 p-3.5">
        <p className="text-sm font-semibold text-red-300">
          ⚠️ Execute com a moto parada e em local ventilado. Siga cada passo na ordem correta.
        </p>
      </div>

      {!tool && (
        <div className="space-y-3">
          <button
            onClick={() => setTool("inicializacao")}
            className="group w-full rounded-2xl border border-blue-500/30 bg-[#111317] p-4 text-left transition hover:border-blue-500/60 hover:bg-blue-500/5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl">⚙️</div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Ferramenta 1</p>
                <h3 className="font-extrabold text-white">Inicialização do ECM</h3>
                <p className="mt-0.5 text-xs text-[#9aa1ac]">5 passos · Jumper EOT · Conector SCS · Cronômetro 10s</p>
              </div>
              <span className="self-center text-[#6c727c] transition group-hover:text-white">→</span>
            </div>
          </button>

          <button
            onClick={() => setTool("reset-combustivel")}
            className="group w-full rounded-2xl border border-purple-500/30 bg-[#111317] p-4 text-left transition hover:border-purple-500/60 hover:bg-purple-500/5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl">⛽</div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Ferramenta 2</p>
                <h3 className="font-extrabold text-white">Reset de Dados de Combustível</h3>
                <p className="mt-0.5 text-xs text-[#9aa1ac]">8 passos · Padrões A–D · Acelerador · Cronômetros</p>
              </div>
              <span className="self-center text-[#6c727c] transition group-hover:text-white">→</span>
            </div>
          </button>

          <button
            onClick={() => setTool("indicador")}
            className="group w-full rounded-2xl border border-[#ff8c3f]/30 bg-[#111317] p-4 text-left transition hover:border-[#ff8c3f]/60 hover:bg-[#ff8c3f]/5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ff8c3f]/30 bg-[#ff8c3f]/10 text-xl">💡</div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff8c3f]">Referência</p>
                <h3 className="font-extrabold text-white">Indicador de Partida a Frio & Padrões A–D</h3>
                <p className="mt-0.5 text-xs text-[#9aa1ac]">Comportamento do indicador · Tabela % etanol</p>
              </div>
              <span className="self-center text-[#6c727c] transition group-hover:text-white">→</span>
            </div>
          </button>
        </div>
      )}

      {tool === "inicializacao" && (
        <div>
          <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
            <p className="text-sm font-bold text-blue-300">⚙️ Inicialização do ECM</p>
            <p className="text-xs text-[#9aa1ac]">Marque cada passo conforme executar. Use o cronômetro no passo com tempo crítico.</p>
          </div>
          <FerramentaInicializacao />
        </div>
      )}

      {tool === "reset-combustivel" && (
        <div>
          <div className="mb-4 rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">
            <p className="text-sm font-bold text-purple-300">⛽ Reset de Dados de Combustível</p>
            <p className="text-xs text-[#9aa1ac]">Siga o fluxograma. Use os cronômetros nos passos com tempo crítico.</p>
          </div>
          <FerramentaResetCombustivel />
        </div>
      )}

      {tool === "indicador" && (
        <div>
          <div className="mb-4 rounded-xl border border-[#ff8c3f]/20 bg-[#ff8c3f]/5 px-4 py-3">
            <p className="text-sm font-bold text-[#ff8c3f]">💡 Referência — Indicador de Partida a Frio</p>
            <p className="text-xs text-[#9aa1ac]">Honda CG160 Fan ESDi · CG160 Titan EX</p>
          </div>
          <ReferenciaIndicador />
        </div>
      )}
    </div>
  );
}

// Helper para transformar abreviação de cor em cor CSS
function getCorFio(cor: string): string {
  const cores: Record<string, string> = {
    "Vd": "#22c55e",
    "Az": "#3b82f6",
    "Am": "#eab308",
    "Vm": "#ef4444",
    "Bc": "#ffffff",
    "Pt": "#374151",
    "Lr": "#f97316",
    "Mr": "#92400e",
    "Rs": "#ec4899",
  };

  const primeiro = cor.split("/")[0];
  return cores[primeiro] || "#6b7280";
}
