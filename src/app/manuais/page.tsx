"use client";

import { useEffect, useState } from "react";
import ManualCard from "@/components/ManualCard";

interface Manual {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fileUrl: string;
  coverUrl?: string | null;
}

export default function ManuaisPage() {
  const [manuais, setManuais] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [error, setError] = useState("");

  // Extrai marcas únicas para o filtro
  const brands = Array.from(new Set(manuais.map((m) => m.brand))).sort();

  async function fetchManuais() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (brandFilter) params.set("brand", brandFilter);
      if (modelFilter) params.set("model", modelFilter);

      const res = await fetch(`/api/manuais?${params.toString()}`);
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
  }, [brandFilter, modelFilter]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">📄 Manuais</h1>
        <p className="mt-1 text-[#8888a4]">
          Encontre o manual de serviço da sua motocicleta
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,220px)_minmax(0,220px)_auto] lg:items-end">
        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
            Filtrar por marca
          </label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="input-dark w-full"
          >
            <option value="">Todas as marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
            Buscar por modelo
          </label>
          <input
            type="text"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            placeholder="Ex: CG 160"
            className="input-dark w-full"
          />
        </div>

        {(brandFilter || modelFilter) && (
          <div className="flex items-end">
            <button
              onClick={() => {
                setBrandFilter("");
                setModelFilter("");
              }}
              className="btn-outline w-full px-4 py-3 text-sm lg:w-auto"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

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

      {/* Lista de manuais */}
      {!loading && !error && (
        <>
          {manuais.length === 0 ? (
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {manuais.map((manual) => (
                <ManualCard key={manual.id} {...manual} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
