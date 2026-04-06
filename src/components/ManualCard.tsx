"use client";

import BrandCover from "@/components/BrandCover";
import { useState } from "react";

interface ManualCardProps {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  coverUrl?: string | null;
}

export default function ManualCard({
  id,
  title,
  brand,
  model,
  year,
  coverUrl,
}: ManualCardProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/download?id=${id}`);
      const contentType = res.headers.get("content-type") || "";

      // Se a API retornou o PDF diretamente (arquivo local na VPS)
      if (contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        return;
      }

      // Se retornou JSON com URL (Vercel Blob ou externo)
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch {
      alert("Erro ao abrir o manual");
    } finally {
      setLoading(false);
    }
  }

  return (
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
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#6c5ce7]">
          {model}
        </p>
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-white sm:text-lg">
          {title}
        </h3>
      </div>
    </button>
  );
}
