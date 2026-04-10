"use client";

import { useEffect, useState, useMemo } from "react";
import ManualCard from "@/components/ManualCard";
import { useAccess } from "@/hooks/useAccess";

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
  const { isPremium } = useAccess();

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

  // Filtrar manuais
  const filteredManuais = useMemo(() => {
    let list = categoryManuais;
    if (selectedBrand !== "all") {
      list = list.filter((m) => m.brand === selectedBrand);
    }
    if (modelFilter.trim()) {
      const q = modelFilter.toLowerCase();
      list = list.filter(
        (m) =>
          m.model.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryManuais, selectedBrand, modelFilter]);

  // Agrupar filtrados por marca
  const filteredGroups = useMemo(() => {
    const groups: Record<string, Manual[]> = {};
    filteredManuais.forEach((m) => {
      if (!groups[m.brand]) groups[m.brand] = [];
      groups[m.brand].push(m);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [filteredManuais]);

  async function fetchManuais() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/manuais");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao carregar manuais");
        return;
      }
      setManuais(data);
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchManuais();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">📄 Manuais</h1>
        <p className="mt-1 text-[#8888a4]">
          {manuais.length} manuais disponíveis &middot; {brandGroups.length} montadoras
        </p>
      </div>

      {/* Tabs de Categoria */}
      {!loading && !error && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => { setSelectedCategory("servico"); setSelectedBrand("all"); setModelFilter(""); }}
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
            onClick={() => { setSelectedCategory("catalogo"); setSelectedBrand("all"); setModelFilter(""); }}
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

      {/* Busca por modelo */}
      {!loading && !error && (
        <div className="mb-6 max-w-md">
          <input
            type="text"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            placeholder="🔍 Buscar por modelo ou título..."
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
        <>
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
              {filteredGroups.map(([brand, items]) => (
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
