"use client";

import { useEffect, useState } from "react";

type Venda = {
  paymentId: string;
  nome: string;
  email: string;
  phone: string | null;
  amount: number;
  pagoEm: string;
  premiumLiberado: boolean;
  contatado: boolean;
};

function paraWhatsApp(phone: string): string {
  let v = phone.replace(/\D/g, "");
  if (v.length <= 11) v = "55" + v;
  return v;
}

function quando(iso: string): string {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d} ${d === 1 ? "dia" : "dias"}`;
}

function boasVindas(nome: string): string {
  const primeiro = nome.trim().split(" ")[0];
  return (
    `Opa ${primeiro}, aqui é do OficinaDigital!\n\n` +
    `Seu pagamento caiu e o acesso já está liberado ✅\n\n` +
    `É só entrar em manualdeservicos.store/login com o email do cadastro.\n\n` +
    `Qualquer dúvida me chama aqui. E me conta qual moto você está atendendo ` +
    `que eu te ajudo a achar o que precisa.`
  );
}

export default function VendasRecentes() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [totalHoje, setTotalHoje] = useState(0);
  const [faturadoHoje, setFaturadoHoje] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const res = await fetch("/api/admin/vendas-recentes", { cache: "no-store" });
      if (!res.ok) {
        setErro(res.status === 403 ? "Acesso restrito a administradores." : "Erro ao carregar.");
        return;
      }
      const data = await res.json();
      setVendas(data.vendas || []);
      setTotalHoje(data.totalHoje || 0);
      setFaturadoHoje(data.faturadoHoje || 0);
      setErro("");
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
    // atualiza sozinho enquanto a aba estiver aberta
    const t = setInterval(carregar, 60000);
    return () => clearInterval(t);
  }, []);

  async function marcar(paymentId: string, contatado: boolean) {
    setVendas((atual) =>
      atual.map((v) => (v.paymentId === paymentId ? { ...v, contatado } : v))
    );
    await fetch("/api/admin/vendas-recentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, contatado }),
    }).catch(() => {});
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">💰 Vendas</h1>
        <p className="mt-2 text-sm text-[#9aa1ac]">
          Quem pagou. Mande o acesso pelo WhatsApp — quem paga e fecha a aba não
          descobre sozinho que já foi liberado.
        </p>
      </div>

      {!loading && !erro && (
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="card-glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#9aa1ac]">Vendas hoje</p>
            <p className="mt-1 text-3xl font-bold text-green-400">{totalHoje}</p>
          </div>
          <div className="card-glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#9aa1ac]">Faturado hoje</p>
            <p className="mt-1 text-3xl font-bold text-white">
              R$ {faturadoHoje.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <div className="card-glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#9aa1ac]">Total de vendas</p>
            <p className="mt-1 text-3xl font-bold text-white">{vendas.length}</p>
          </div>
        </div>
      )}

      {loading && <p className="text-[#9aa1ac]">Carregando...</p>}
      {erro && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {erro}
        </div>
      )}

      {!loading && !erro && vendas.length === 0 && (
        <div className="card-glass rounded-2xl p-8 text-center">
          <p className="text-lg text-white">Nenhuma venda registrada ainda</p>
        </div>
      )}

      <div className="space-y-3">
        {vendas.map((v) => (
          <div
            key={v.paymentId}
            className={`card-glass rounded-2xl p-5 ${v.contatado ? "opacity-60" : ""}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{v.nome}</h3>
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[11px] text-green-400">
                    pago · {quando(v.pagoEm)}
                  </span>
                  {!v.premiumLiberado && (
                    <span className="rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[11px] text-red-400">
                      ⚠ acesso não liberado
                    </span>
                  )}
                  {v.contatado && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-[#9aa1ac]">
                      já avisado
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-[#9aa1ac]">{v.email}</p>
                <p className="mt-1 text-sm text-[#9aa1ac]">
                  {v.phone || <span className="text-red-400">sem telefone</span>}
                  <span className="mx-2">·</span>
                  R$ {v.amount.toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {v.phone && (
                  <a
                    href={`https://wa.me/${paraWhatsApp(v.phone)}?text=${encodeURIComponent(
                      boasVindas(v.nome)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => marcar(v.paymentId, true)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                  >
                    Enviar acesso
                  </a>
                )}
                <button
                  onClick={() => marcar(v.paymentId, !v.contatado)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-[#9aa1ac] transition hover:border-white/30 hover:text-white"
                >
                  {v.contatado ? "Desmarcar" : "Marcar como avisado"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
