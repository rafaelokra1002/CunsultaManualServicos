"use client";

import Link from "next/link";

interface AccessBlockProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function AccessBlock({
  title = "🔒 Conteúdo bloqueado",
  message = "Libere o acesso para ver o conteúdo completo",
  className = "",
}: AccessBlockProps) {
  return (
    <div
      className={`absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm ${className}`}
    >
      <div className="absolute inset-0 bg-[#0a0a0f]/80" />
      <div className="relative z-10 mx-4 max-w-sm rounded-2xl border border-[#2a2a3e] bg-[#12121a] p-8 text-center shadow-2xl shadow-[#6c5ce7]/10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6c5ce7]/15 text-3xl">
          🔒
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 text-sm text-[#8888a4]">{message}</p>
        <Link
          href="/conta-inativa"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#6c5ce7]/25 transition-all hover:shadow-[#6c5ce7]/40 active:scale-95"
        >
          🚀 LIBERAR ACESSO AGORA
        </Link>
        <p className="mt-3 text-xs text-[#555570]">
          Pagamento único • Acesso vitalício
        </p>
      </div>
    </div>
  );
}
