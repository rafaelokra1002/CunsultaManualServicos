"use client";

import { useEffect, useState } from "react";

interface ReferralLink {
  id: string;
  code: string;
  label: string;
  usedCount: number;
  createdAt: string;
}

export default function IndicacoesPage() {
  const [links, setLinks] = useState<ReferralLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  async function fetchLinks() {
    try {
      const res = await fetch("/api/admin/referrals");
      if (res.ok) setLinks(await res.json());
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  function buildLink(code: string) {
    return `${window.location.origin}/register?ref=${code}`;
  }

  function copyLink(link: ReferralLink) {
    navigator.clipboard.writeText(buildLink(link.code));
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  async function createLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCreateLoading(true);

    try {
      const res = await fetch("/api/admin/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar link");
        return;
      }

      setLinks((prev) => [data, ...prev]);
      setLabel("");
    } catch {
      setError("Erro ao criar link");
    } finally {
      setCreateLoading(false);
    }
  }

  async function deleteLink(id: string, linkLabel: string) {
    if (!confirm(`Remover o link "${linkLabel}"?`)) return;
    setDeleteLoading(id);

    try {
      const res = await fetch(`/api/admin/referrals/${id}`, { method: "DELETE" });
      if (res.ok) setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch {
      // silently fail
    } finally {
      setDeleteLoading(null);
    }
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">🔗 Links de Indicação</h1>
        <p className="mt-1 text-[#9aa1ac]">
          Gere links únicos para rastrear indicações no cadastro
        </p>
      </div>

      {/* Formulário de criação */}
      <div className="mb-8 card-glass rounded-2xl p-6">
        <h2 className="mb-4 text-base font-semibold text-white">Gerar novo link</h2>
        <form onSubmit={createLink} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-[#9aa1ac]">
              Nome / Rótulo
            </label>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder='Ex: "João Mecânico", "Instagram Bio"'
              className="w-full rounded-lg border border-[#33373f] bg-[#111317] px-4 py-2.5 text-sm text-white placeholder-[#9aa1ac] outline-none focus:border-[#ff6a1a] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={createLoading}
            className="rounded-xl bg-[#ff6a1a] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5a4bd6] disabled:opacity-50 whitespace-nowrap"
          >
            {createLoading ? "Gerando..." : "+ Gerar Link"}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {/* Lista de links */}
      <div className="card-glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-8 text-center text-[#9aa1ac]">Carregando links...</div>
        ) : links.length === 0 ? (
          <div className="p-8 text-center text-[#9aa1ac]">
            Nenhum link criado ainda. Crie o primeiro acima!
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-4 p-4 md:hidden">
              {links.map((link) => (
                <div key={link.id} className="rounded-2xl border border-[#33373f] bg-[#111317] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{link.label}</p>
                      <p className="mt-1 font-mono text-xs text-[#ff6a1a]">{link.code}</p>
                    </div>
                    <span className="rounded-md bg-[#1e2127] px-2.5 py-1 text-xs text-[#9aa1ac]">
                      {link.usedCount} uso{link.usedCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="mt-2 break-all text-xs text-[#9aa1ac]">
                    {typeof window !== "undefined" ? buildLink(link.code) : `…/register?ref=${link.code}`}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => copyLink(link)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                        copiedId === link.id
                          ? "bg-green-500/20 text-green-400"
                          : "bg-[#ff6a1a]/20 text-[#ff6a1a] hover:bg-[#ff6a1a]/30"
                      }`}
                    >
                      {copiedId === link.id ? "✓ Copiado!" : "Copiar link"}
                    </button>
                    <button
                      onClick={() => deleteLink(link.id, link.label)}
                      disabled={deleteLoading === link.id}
                      className="rounded-lg bg-red-600/20 px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-600/40 disabled:opacity-50"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#33373f] text-xs font-medium uppercase text-[#9aa1ac]">
                  <tr>
                    <th className="px-6 py-4">Rótulo</th>
                    <th className="px-6 py-4">Código</th>
                    <th className="px-6 py-4">Link</th>
                    <th className="px-6 py-4">Usos</th>
                    <th className="px-6 py-4">Criado em</th>
                    <th className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#33373f]">
                  {links.map((link) => (
                    <tr key={link.id} className="transition-colors hover:bg-[#1e2127]">
                      <td className="px-6 py-4 font-medium text-white">{link.label}</td>
                      <td className="px-6 py-4 font-mono text-[#ff6a1a]">{link.code}</td>
                      <td className="px-6 py-4 max-w-xs">
                        <span className="truncate block text-xs text-[#9aa1ac]">
                          {typeof window !== "undefined"
                            ? buildLink(link.code)
                            : `…/register?ref=${link.code}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#9aa1ac]">
                        {link.usedCount} uso{link.usedCount !== 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 text-[#9aa1ac]">
                        {new Date(link.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyLink(link)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                              copiedId === link.id
                                ? "bg-green-500/20 text-green-400"
                                : "bg-[#ff6a1a]/20 text-[#ff6a1a] hover:bg-[#ff6a1a]/30"
                            }`}
                          >
                            {copiedId === link.id ? "✓ Copiado!" : "Copiar"}
                          </button>
                          <button
                            onClick={() => deleteLink(link.id, link.label)}
                            disabled={deleteLoading === link.id}
                            className="rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-600/40 disabled:opacity-50"
                          >
                            Remover
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
