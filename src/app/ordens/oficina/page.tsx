"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

// Rota estática: no App Router ela tem precedência sobre /ordens/[id],
// então "oficina" nunca é lido como id de ordem.

const inputCls =
  "w-full rounded-xl border border-[#33373f] bg-[#111317] px-3 py-2.5 text-sm text-white placeholder-[#6b7178] outline-none focus:border-[#ff6a1a]";
const labelCls = "mb-1 block text-xs uppercase tracking-wide text-[#9aa1ac]";

export default function MinhaOficina() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/oficina", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.oficina) return;
        setNome(d.oficina.oficinaNome || "");
        setTelefone(d.oficina.oficinaTelefone || d.oficina.phone || "");
        setEndereco(d.oficina.oficinaEndereco || "");
      })
      .finally(() => setCarregando(false));
  }, []);

  async function salvar() {
    setSalvando(true);
    setMsg("");
    try {
      const res = await fetch("/api/oficina", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oficinaNome: nome,
          oficinaTelefone: telefone,
          oficinaEndereco: endereco,
        }),
      });
      setMsg(res.ok ? "Salvo. Suas ordens já saem com esses dados." : "Erro ao salvar.");
    } catch {
      setMsg("Erro de conexão.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#16181c]">
      <Sidebar />

      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Link href="/ordens" className="text-sm text-[#9aa1ac] hover:text-white">
            ← Ordens
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-white">🔧 Minha oficina</h1>
          <p className="mt-2 text-sm text-[#9aa1ac]">
            Esses dados viram o cabeçalho de toda ordem de serviço que você imprimir.
            Preencha uma vez só.
          </p>

          {carregando ? (
            <p className="mt-6 text-[#9aa1ac]">Carregando...</p>
          ) : (
            <div className="mt-6 space-y-4 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
              <div>
                <label className={labelCls}>Nome da oficina</label>
                <input className={inputCls} value={nome} onChange={(e) => setNome(e.target.value)}
                  placeholder="Moto Peças e Serviços do João" />
              </div>
              <div>
                <label className={labelCls}>Telefone</label>
                <input className={inputCls} value={telefone} onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(71) 99999-9999" />
              </div>
              <div>
                <label className={labelCls}>Endereço</label>
                <input className={inputCls} value={endereco} onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua das Flores, 123 — Centro" />
              </div>

              <button onClick={salvar} disabled={salvando}
                className="w-full rounded-xl bg-[#ff6a1a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff8c3f] disabled:opacity-50">
                {salvando ? "Salvando..." : "Salvar"}
              </button>

              {msg && <p className="text-sm text-green-400">{msg}</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
