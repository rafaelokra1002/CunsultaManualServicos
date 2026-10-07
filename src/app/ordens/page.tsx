"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useAccess } from "@/hooks/useAccess";
import { formatarReais } from "@/lib/ordens";

type ItemLista = {
  id: string;
  numero: number;
  clienteNome: string;
  motoModelo: string | null;
  motoPlaca: string | null;
  total: number;
  status: string;
  createdAt: string;
};

function data(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function Ordens() {
  const router = useRouter();
  const { isPremium, isLoading } = useAccess();
  const [ordens, setOrdens] = useState<ItemLista[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [criando, setCriando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("/api/ordens", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { ordens: [] }))
      .then((d) => setOrdens(d.ordens || []))
      .catch(() => setErro("Não foi possível carregar as ordens."))
      .finally(() => setCarregando(false));
  }, []);

  // Cria uma ordem em branco e abre direto para preencher — evita um
  // formulário de criação separado, que seria igual ao de edição.
  async function novaOrdem() {
    setCriando(true);
    setErro("");
    try {
      const res = await fetch("/api/ordens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clienteNome: "" }),
      });
      const d = await res.json();
      if (!res.ok) {
        setErro(d.error || "Não foi possível criar a ordem.");
        return;
      }
      router.push(`/ordens/${d.ordem.id}`);
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setCriando(false);
    }
  }

  const abertas = ordens.filter((o) => o.status !== "concluida").length;
  const faturado = ordens
    .filter((o) => o.status === "concluida")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="flex min-h-screen bg-[#16181c]">
      <Sidebar />

      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                📋 Ordens de serviço
              </h1>
              <p className="mt-2 text-sm text-[#9aa1ac]">
                Registre o serviço, o laudo do diagnóstico e entregue um documento
                com o nome da sua oficina.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/ordens/oficina"
                className="rounded-xl border border-[#33373f] px-4 py-3 text-sm text-[#9aa1ac] transition hover:border-[#ff6a1a] hover:text-white"
              >
                Minha oficina
              </Link>
              <button
                onClick={novaOrdem}
                disabled={criando || !isPremium}
                className="rounded-xl bg-[#ff6a1a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff8c3f] disabled:opacity-50"
              >
                {criando ? "Criando..." : "+ Nova ordem"}
              </button>
            </div>
          </div>

          {!isLoading && !isPremium && (
            <div className="mb-6 rounded-xl border border-[#ff6a1a]/30 bg-[#ff6a1a]/10 p-4 text-sm text-[#ffd7b0]">
              A ordem de serviço faz parte do acesso completo.{" "}
              <Link href="/conta-inativa" className="font-semibold underline">
                Liberar acesso
              </Link>
            </div>
          )}

          {erro && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {erro}
            </div>
          )}

          {ordens.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-[#2a2e35] bg-[#1e2127] px-5 py-4">
                <p className="text-xs text-[#9aa1ac]">Em aberto</p>
                <p className="mt-1 text-2xl font-bold text-yellow-400">{abertas}</p>
              </div>
              <div className="rounded-2xl border border-[#2a2e35] bg-[#1e2127] px-5 py-4">
                <p className="text-xs text-[#9aa1ac]">Concluídas</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {ordens.length - abertas}
                </p>
              </div>
              <div className="rounded-2xl border border-[#2a2e35] bg-[#1e2127] px-5 py-4">
                <p className="text-xs text-[#9aa1ac]">Faturado</p>
                <p className="mt-1 text-2xl font-bold text-green-400">
                  R$ {formatarReais(faturado)}
                </p>
              </div>
            </div>
          )}

          {carregando && <p className="text-[#9aa1ac]">Carregando...</p>}

          {!carregando && ordens.length === 0 && (
            <div className="rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-8 text-center">
              <p className="text-lg text-white">Nenhuma ordem ainda</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#9aa1ac]">
                Crie a primeira na próxima moto que entrar. Leva menos tempo que
                escrever no papel, e o cliente recebe um documento com os testes que
                você fez.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {ordens.map((o) => (
              <Link
                key={o.id}
                href={`/ordens/${o.id}`}
                className="block rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5 transition hover:border-[#ff6a1a]/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm text-[#ff6a1a]">
                        OS #{String(o.numero).padStart(3, "0")}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] ${
                          o.status === "concluida"
                            ? "border-green-500/30 bg-green-500/10 text-green-400"
                            : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {o.status === "concluida" ? "concluída" : "em aberto"}
                      </span>
                    </div>
                    <p className="mt-1 truncate font-semibold text-white">
                      {o.clienteNome || "Sem nome"}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-[#9aa1ac]">
                      {[o.motoModelo, o.motoPlaca].filter(Boolean).join(" · ") || "Moto não informada"}
                      <span className="mx-2">·</span>
                      {data(o.createdAt)}
                    </p>
                  </div>
                  <span className="font-mono text-lg text-white">
                    R$ {formatarReais(o.total)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
