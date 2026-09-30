"use client";

import { useEffect, useState } from "react";

type Pendente = {
  paymentId: string;
  nome: string;
  email: string;
  phone: string | null;
  amount: number;
  createdAt: string;
  contatado: boolean;
};

/** Telefone pronto pro wa.me: só dígitos, com DDI do Brasil. */
function paraWhatsApp(phone: string): string {
  let v = phone.replace(/\D/g, "");
  if (v.length <= 11) v = "55" + v;
  return v;
}

function tempoDecorrido(iso: string): string {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 60) return `há ${min} min`;
  const horas = Math.floor(min / 60);
  if (horas < 24) return `há ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `há ${dias} ${dias === 1 ? "dia" : "dias"}`;
}

/** Quanto mais fresco o abandono, maior a chance de recuperar. */
function urgencia(iso: string): { cor: string; texto: string } {
  const horas = (Date.now() - new Date(iso).getTime()) / 3600000;
  if (horas < 2) return { cor: "text-green-400 border-green-500/30 bg-green-500/10", texto: "quente" };
  if (horas < 24) return { cor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10", texto: "morno" };
  return { cor: "text-[#9aa1ac] border-white/10 bg-white/5", texto: "frio" };
}

function mensagem(nome: string): string {
  const primeiro = nome.trim().split(" ")[0];
  return (
    `Opa ${primeiro}, tudo bem? Aqui é do OficinaDigital.\n\n` +
    `Vi que você chegou a gerar o PIX mas o pagamento não caiu. ` +
    `Deu algum problema na hora de pagar?\n\n` +
    `Se precisar de ajuda me chama aqui que eu resolvo na hora.`
  );
}

export default function CheckoutsAbandonados() {
  const [pendentes, setPendentes] = useState<Pendente[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const res = await fetch("/api/admin/checkouts-abandonados", { cache: "no-store" });
      if (!res.ok) {
        setErro(res.status === 403 ? "Acesso restrito a administradores." : "Erro ao carregar.");
        return;
      }
      const data = await res.json();
      setPendentes(data.pendentes || []);
      setErro("");
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function marcar(paymentId: string, contatado: boolean) {
    // atualiza na tela antes da resposta, pra não travar o clique
    setPendentes((atual) =>
      atual.map((p) => (p.paymentId === paymentId ? { ...p, contatado } : p))
    );
    await fetch("/api/admin/checkouts-abandonados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, contatado }),
    }).catch(() => {});
  }

  const aContatar = pendentes.filter((p) => !p.contatado).length;

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          🛒 Checkouts abandonados
        </h1>
        <p className="mt-2 text-sm text-[#9aa1ac]">
          Quem gerou o PIX e não pagou. Aparecem aqui 10 minutos depois — antes disso a
          pessoa provavelmente ainda está no app do banco.
        </p>
      </div>

      {!loading && !erro && (
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="card-glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#9aa1ac]">Aguardando contato</p>
            <p className="mt-1 text-3xl font-bold text-yellow-400">{aContatar}</p>
          </div>
          <div className="card-glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#9aa1ac]">Total na lista</p>
            <p className="mt-1 text-3xl font-bold text-white">{pendentes.length}</p>
          </div>
        </div>
      )}

      {loading && <p className="text-[#9aa1ac]">Carregando...</p>}
      {erro && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {erro}
        </div>
      )}

      {!loading && !erro && pendentes.length === 0 && (
        <div className="card-glass rounded-2xl p-8 text-center">
          <p className="text-lg text-white">Nenhum checkout abandonado 🎉</p>
          <p className="mt-2 text-sm text-[#9aa1ac]">
            Todo mundo que gerou PIX ou pagou, ou já foi liberado.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {pendentes.map((p) => {
          const u = urgencia(p.createdAt);
          return (
            <div
              key={p.paymentId}
              className={`card-glass rounded-2xl p-5 ${p.contatado ? "opacity-50" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{p.nome}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] ${u.cor}`}>
                      {u.texto}
                    </span>
                    {p.contatado && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-[#9aa1ac]">
                        já contatado
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-[#9aa1ac]">{p.email}</p>
                  <p className="mt-1 text-sm text-[#9aa1ac]">
                    {p.phone || <span className="text-red-400">sem telefone cadastrado</span>}
                    <span className="mx-2">·</span>
                    R$ {p.amount.toFixed(2).replace(".", ",")}
                    <span className="mx-2">·</span>
                    {tempoDecorrido(p.createdAt)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.phone && (
                    <a
                      href={`https://wa.me/${paraWhatsApp(p.phone)}?text=${encodeURIComponent(
                        mensagem(p.nome)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => marcar(p.paymentId, true)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                    >
                      Chamar no WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => marcar(p.paymentId, !p.contatado)}
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm text-[#9aa1ac] transition hover:border-white/30 hover:text-white"
                  >
                    {p.contatado ? "Desmarcar" : "Marcar como contatado"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !erro && pendentes.length > 0 && (
        <p className="mt-6 text-xs text-[#6b7178]">
          Dica: quanto mais quente o abandono, maior a chance de recuperar. Pergunte o que
          travou o pagamento — a resposta vale tanto quanto a venda.
        </p>
      )}
    </div>
  );
}
