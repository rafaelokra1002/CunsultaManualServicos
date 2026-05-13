"use client";

import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import ManualCard from "@/components/ManualCard";
import { useAccess } from "@/hooks/useAccess";
import { useFreeTrial } from "@/hooks/useAccess";
import AccessBlock from "@/components/AccessBlock";

interface Manual {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fileUrl: string;
  coverUrl?: string | null;
  category?: string;
}

const INITIAL_RENDER_COUNT = 120;
const RENDER_STEP = 120;

const brandColors: Record<string, string> = {
  Honda: "bg-red-500",
  Yamaha: "bg-blue-500",
  BMW: "bg-sky-500",
  Kawasaki: "bg-green-500",
  Suzuki: "bg-yellow-500",
  Triumph: "bg-amber-500",
  "Royal Enfield": "bg-stone-400",
  Husqvarna: "bg-indigo-500",
  Hyosung: "bg-teal-500",
  Sundown: "bg-orange-500",
  Outros: "bg-gray-500",
};

export default function ManuaisPage() {
  const [manuais, setManuais] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("servico");
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const { isPremium } = useAccess();
  const { blocked: demoBlocked, markUsed } = useFreeTrial("manuais");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("recent");
  const deferredModelFilter = useDeferredValue(modelFilter);

  // Manuais filtrados por categoria
  const categoryManuais = useMemo(() => {
    return manuais.filter((m) => (m.category || "servico") === selectedCategory);
  }, [manuais, selectedCategory]);

  // Contagem por categoria
  const servicoCount = useMemo(() => manuais.filter((m) => (m.category || "servico") === "servico").length, [manuais]);
  const catalogoCount = useMemo(() => manuais.filter((m) => (m.category || "servico") === "catalogo").length, [manuais]);

  // Agrupar por marca (dentro da categoria)
  const brandGroups = useMemo(() => {
    const groups: Record<string, Manual[]> = {};
    categoryManuais.forEach((m) => {
      if (!groups[m.brand]) groups[m.brand] = [];
      groups[m.brand].push(m);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [categoryManuais]);

  const availableYears = useMemo(() => {
    return [...new Set(categoryManuais.map((m) => m.year))].sort((a, b) => b - a);
  }, [categoryManuais]);

  const totalBrands = useMemo(() => new Set(manuais.map((m) => m.brand)).size, [manuais]);

  // Filtrar e ordenar manuais
  const filteredManuais = useMemo(() => {
    let list = categoryManuais;
    if (selectedBrand !== "all") {
      list = list.filter((m) => m.brand === selectedBrand);
    }
    if (selectedYear !== "all") {
      list = list.filter((m) => m.year === parseInt(selectedYear));
    }
    if (deferredModelFilter.trim()) {
      const q = deferredModelFilter.toLowerCase();
      list = list.filter(
        (m) =>
          m.model.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sortOrder === "year_desc") {
      sorted.sort((a, b) => b.year - a.year);
    } else if (sortOrder === "az") {
      sorted.sort((a, b) => a.model.localeCompare(b.model, "pt-BR"));
    }
    return sorted;
  }, [categoryManuais, selectedBrand, selectedYear, deferredModelFilter, sortOrder]);

  // Agrupar filtrados por marca
  const filteredGroups = useMemo(() => {
    const groups: Record<string, Manual[]> = {};
    filteredManuais.forEach((m) => {
      if (!groups[m.brand]) groups[m.brand] = [];
      groups[m.brand].push(m);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [filteredManuais]);

  const visibleGroups = useMemo(() => {
    let remaining = visibleCount;

    return filteredGroups.reduce<Array<[string, Manual[]]>>((groups, [brand, items]) => {
      if (remaining <= 0) {
        return groups;
      }

      const visibleItems = items.slice(0, remaining);
      remaining -= visibleItems.length;

      if (visibleItems.length > 0) {
        groups.push([brand, visibleItems]);
      }

      return groups;
    }, []);
  }, [filteredGroups, visibleCount]);

  const hasMoreManuais = visibleCount < filteredManuais.length;

  async function fetchManuais() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/manuais?view=listing", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao carregar manuais");
        return;
      }
      startTransition(() => {
        setManuais(data);
      });
      markUsed();
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchManuais();
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_RENDER_COUNT);
  }, [selectedCategory, selectedBrand, selectedYear, deferredModelFilter, sortOrder, manuais.length]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">📄 Manuais</h1>
        <p className="mt-1 text-[#8888a4]">
          {manuais.length} manuais &middot; {servicoCount} serviço · {catalogoCount} catálogo &middot; {totalBrands} montadoras
        </p>
      </div>

      {/* Tabs de Categoria */}
      {!loading && !error && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => { setSelectedCategory("servico"); setSelectedBrand("all"); setSelectedYear("all"); setSortOrder("recent"); setModelFilter(""); }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedCategory === "servico"
                ? "bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/25"
                : "bg-white/5 text-[#8888a4] hover:bg-white/10 hover:text-white"
            }`}
          >
            📋 Manuais de Serviço
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              selectedCategory === "servico" ? "bg-white/20" : "bg-white/10"
            }`}>{servicoCount}</span>
          </button>
          <button
            onClick={() => { setSelectedCategory("catalogo"); setSelectedBrand("all"); setSelectedYear("all"); setSortOrder("recent"); setModelFilter(""); }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedCategory === "catalogo"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                : "bg-white/5 text-[#8888a4] hover:bg-white/10 hover:text-white"
            }`}
          >
            📦 Catálogo de Peças
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              selectedCategory === "catalogo" ? "bg-white/20" : "bg-white/10"
            }`}>{catalogoCount}</span>
          </button>
        </div>
      )}

      {/* Tabs das Montadoras */}
      {!loading && !error && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBrand("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedBrand === "all"
                  ? "bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/25"
                  : "bg-white/5 text-[#8888a4] hover:bg-white/10 hover:text-white"
              }`}
            >
              Todas ({categoryManuais.length})
            </button>
            {brandGroups.map(([brand, items]) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedBrand === brand
                    ? "bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/25"
                    : "bg-white/5 text-[#8888a4] hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${brandColors[brand] || "bg-purple-500"}`} />
                {brand} ({items.length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtro de Ano + Ordenação */}
      {!loading && !error && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#8888a4]">Ano:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#111118] px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6c5ce7]/50"
            >
              <option value="all">Todos</option>
              {availableYears.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-medium text-[#8888a4]">Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#111118] px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6c5ce7]/50"
            >
              <option value="recent">Mais recentes (cadastro)</option>
              <option value="year_desc">Ano mais novo</option>
              <option value="az">A-Z (modelo)</option>
            </select>
          </div>
        </div>
      )}

      {/* Busca por modelo / código de falha */}
      {!loading && !error && (
        <div className="mb-6 max-w-md">
          <input
            type="text"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            placeholder="🔍 Buscar modelo, código de falha (ex: P0420)..."
            className="input-dark w-full"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-[#8888a4]">Carregando manuais...</div>
        </div>
      )}

      {/* Lista agrupada por marca */}
      {!loading && !error && (
        <div className="relative">
          {demoBlocked && (
            <AccessBlock
              title="🔒 Manuais bloqueados"
              message="Libere o acesso para consultar todos os manuais de serviço"
            />
          )}
          <div className={demoBlocked ? "pointer-events-none select-none" : ""}>
          {filteredManuais.length === 0 ? (
            <div className="card-glass rounded-2xl p-8 text-center sm:p-12">
              <div className="mb-4 text-4xl">📭</div>
              <h3 className="text-lg font-semibold text-white">
                Nenhum manual encontrado
              </h3>
              <p className="text-sm text-[#8888a4]">
                Tente ajustar os filtros ou volte mais tarde
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex flex-col gap-2 text-sm text-[#8888a4] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Mostrando {Math.min(visibleCount, filteredManuais.length)} de {filteredManuais.length} manuais
                </span>
                {deferredModelFilter !== modelFilter && (
                  <span>Atualizando busca...</span>
                )}
              </div>

              {visibleGroups.map(([brand, items]) => (
                <section key={brand}>
                  {/* Cabeçalho da montadora */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`inline-block h-4 w-4 rounded-full ${brandColors[brand] || "bg-purple-500"}`} />
                    <h2 className="text-xl font-bold text-white">{brand}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-[#8888a4]">
                      {items.length} {items.length === 1 ? "manual" : "manuais"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((manual) => (
                      <ManualCard key={manual.id} {...manual} isPremium={isPremium} />
                    ))}
                  </div>
                </section>
              ))}

              {hasMoreManuais && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setVisibleCount((current) => current + RENDER_STEP)}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Carregar mais manuais
                  </button>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
