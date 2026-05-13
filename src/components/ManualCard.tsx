"use client";

import BrandCover from "@/components/BrandCover";
import { useState } from "react";
import AccessBlock from "@/components/AccessBlock";

interface ManualCardProps {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  coverUrl?: string | null;
  isPremium?: boolean;
}

export default function ManualCard({
  id,
  title,
  brand,
  model,
  year,
  coverUrl,
  isPremium = true,
}: ManualCardProps) {
  const [loading, setLoading] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;

    if (!isPremium) {
      setShowBlock(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/download?id=${id}`);
      if (!res.ok) {
        let message = "Erro ao abrir o manual";
        try {
          const data = await res.json();
          if (data?.error) {
            message = data.error;
          }
        } catch {}
        throw new Error(message);
      }

      const contentType = res.headers.get("content-type") || "";

      // Se a API retornou o PDF diretamente (arquivo local na VPS)
      if (contentType.includes("application/pdf") || contentType.includes("application/octet-stream")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        // Usar <a> com download para compatibilidade mobile
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        // Em mobile, forçar download em vez de abrir inline
        const fileName = res.headers.get("content-disposition")?.match(/filename="?(.+?)"?$/)?.[1] || "manual.pdf";
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Limpar blob URL após um delay
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        return;
      }

      // Se retornou JSON com URL (Vercel Blob ou externo)
      const data = await res.json();
      if (data.url) {
        const a = document.createElement("a");
        a.href = data.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }

      throw new Error("Link de download inválido");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao abrir o manual";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      {showBlock && (
        <div className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-[#0a0a0f]/80" />
          <div className="relative z-10 mx-2 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-5 text-center shadow-2xl">
            <div className="mb-2 text-2xl">🔒</div>
            <p className="mb-1 text-sm font-bold text-white">Download bloqueado</p>
            <p className="mb-3 text-xs text-[#8888a4]">Libere o acesso para baixar</p>
            <a
              href="/conta-inativa"
              className="inline-block rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] px-4 py-2 text-xs font-bold text-white"
            >
              LIBERAR ACESSO
            </a>
            <button
              onClick={(e) => { e.stopPropagation(); setShowBlock(false); }}
              className="mt-2 block w-full text-xs text-[#555570] hover:text-[#8888a4]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="group relative flex h-[340px] w-full flex-col overflow-hidden rounded-2xl bg-[#111118] text-left ring-1 ring-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:ring-[#6c5ce7]/40 hover:shadow-xl hover:shadow-[#6c5ce7]/10 sm:h-[380px]"
      >
      {/* Imagem / Capa */}
      <div className="relative flex-1 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BrandCover brand={brand} model={model} year={year} className="h-full w-full" />
        )}

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111118] via-[#111118]/80 to-transparent" />

        {/* Badge da marca */}
        <div className="absolute left-4 top-4 rounded-full bg-[#6c5ce7] px-3 py-1 text-[11px] font-bold text-white shadow-lg">
          {brand}
        </div>

        {/* Ano badge */}
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
          {year}
        </div>

        {/* Download icon overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
          <div className="flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-[#6c5ce7] text-xl shadow-xl transition-transform duration-300 group-hover:scale-100">
            {loading ? "⏳" : "⬇️"}
          </div>
        </div>
      </div>

      {/* Info - Bottom section */}
      <div className="relative z-10 -mt-8 px-4 pb-4 sm:px-5 sm:pb-5">
        <p className="mb-0.5 text-[11px] font-medium text-[#8888a4]">
          {brand} · {year}
        </p>
        <h3 className="line-clamp-1 text-xl font-bold leading-tight text-white sm:text-2xl">
          {model}
        </h3>
      </div>
    </button>
    </div>
  );
}
