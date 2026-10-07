"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { calcularTotal, formatarReais, type Peca, type Servico, type Teste } from "@/lib/ordens";

type Oficina = {
  nome: string;
  phone: string | null;
  oficinaNome: string | null;
  oficinaTelefone: string | null;
  oficinaEndereco: string | null;
};

type Ordem = {
  id: string;
  numero: number;
  clienteNome: string;
  clienteTelefone: string | null;
  motoMarca: string | null;
  motoModelo: string | null;
  motoAno: string | null;
  motoPlaca: string | null;
  motoKm: string | null;
  sintoma: string | null;
  diagnostico: string | null;
  testes: Teste[] | null;
  servicos: Servico[] | null;
  pecas: Peca[] | null;
  observacoes: string | null;
  total: number;
  status: string;
  createdAt: string;
};

// O documento sai pelo "Imprimir" do navegador, que no celular e no desktop
// oferece "Salvar como PDF". Evita biblioteca de PDF no projeto — e o build
// já quebrou uma vez instalando dependência.
const PRINT_CSS = `
@media screen { .so-doc { display: none; } }
@media print {
  .so-tela, nav, aside, header, footer, button { display: none !important; }
  .so-doc { display: block !important; color: #000; background: #fff; font-family: Arial, Helvetica, sans-serif; }
  body { background: #fff !important; }
  @page { margin: 14mm; }
}
.so-doc h1 { font-size: 20pt; margin: 0; }
.so-doc .cab { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 16px; }
.so-doc .num { text-align: right; font-size: 11pt; }
.so-doc .num b { display: block; font-size: 16pt; }
.so-doc h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: .08em; margin: 16px 0 6px; border-bottom: 1px solid #999; padding-bottom: 3px; }
.so-doc p, .so-doc td, .so-doc th { font-size: 10.5pt; }
.so-doc .linha { display: flex; gap: 24px; flex-wrap: wrap; }
.so-doc .linha div { min-width: 140px; }
.so-doc .rot { font-size: 8.5pt; color: #555; text-transform: uppercase; }
.so-doc table { width: 100%; border-collapse: collapse; margin-top: 4px; }
.so-doc th { text-align: left; border-bottom: 1px solid #000; padding: 4px 6px; font-size: 9pt; text-transform: uppercase; }
.so-doc td { border-bottom: 1px solid #ddd; padding: 5px 6px; }
.so-doc .dir { text-align: right; }
.so-doc .tot { font-size: 14pt; font-weight: bold; text-align: right; margin-top: 10px; }
.so-doc .ass { margin-top: 48px; display: flex; gap: 40px; }
.so-doc .ass div { flex: 1; border-top: 1px solid #000; padding-top: 4px; font-size: 9pt; text-align: center; }
`;

const inputCls =
  "w-full rounded-xl border border-[#33373f] bg-[#111317] px-3 py-2.5 text-sm text-white placeholder-[#6b7178] outline-none focus:border-[#ff6a1a]";
const labelCls = "mb-1 block text-xs uppercase tracking-wide text-[#9aa1ac]";

export default function EditarOrdem() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [o, setO] = useState<Ordem | null>(null);
  const [oficina, setOficina] = useState<Oficina | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch(`/api/ordens/${id}`, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setO({
          ...d.ordem,
          testes: d.ordem.testes || [],
          servicos: d.ordem.servicos || [],
          pecas: d.ordem.pecas || [],
        });
        setOficina(d.oficina);
      })
      .catch(() => setErro("Ordem não encontrada."))
      .finally(() => setCarregando(false));
  }, [id]);

  const set = useCallback(<K extends keyof Ordem>(campo: K, valor: Ordem[K]) => {
    setO((a) => (a ? { ...a, [campo]: valor } : a));
    setMsg("");
  }, []);

  async function salvar(novoStatus?: string) {
    if (!o) return;
    setSalvando(true);
    setErro("");
    try {
      const res = await fetch(`/api/ordens/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...o, status: novoStatus ?? o.status }),
      });
      const d = await res.json();
      if (!res.ok) {
        setErro(d.error || "Erro ao salvar.");
        return;
      }
      setO((a) => (a ? { ...a, total: d.ordem.total, status: novoStatus ?? a.status } : a));
      setMsg("Salvo.");
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluir() {
    if (!confirm("Excluir esta ordem? Não dá para desfazer.")) return;
    await fetch(`/api/ordens/${id}`, { method: "DELETE" });
    router.push("/ordens");
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen bg-[#16181c]">
        <Sidebar />
        <main className="flex-1 pt-20 md:ml-64 md:pt-8">
          <p className="px-6 text-[#9aa1ac]">Carregando...</p>
        </main>
      </div>
    );
  }

  if (!o) {
    return (
      <div className="flex min-h-screen bg-[#16181c]">
        <Sidebar />
        <main className="flex-1 pt-20 md:ml-64 md:pt-8">
          <div className="px-6">
            <p className="text-red-400">{erro || "Ordem não encontrada."}</p>
            <Link href="/ordens" className="mt-4 inline-block text-[#ff6a1a] underline">
              Voltar
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const servicos = o.servicos || [];
  const pecas = o.pecas || [];
  const testes = o.testes || [];
  const totalAoVivo = calcularTotal(servicos, pecas);
  const nomeOficina = oficina?.oficinaNome || oficina?.nome || "Minha oficina";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* ------------------------------- TELA ------------------------------- */}
      <div className="so-tela flex min-h-screen bg-[#16181c]">
        <Sidebar />

        <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Link href="/ordens" className="text-sm text-[#9aa1ac] hover:text-white">
                  ← Ordens
                </Link>
                <h1 className="mt-1 font-mono text-2xl font-bold text-[#ff6a1a]">
                  OS #{String(o.numero).padStart(3, "0")}
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-xl border border-[#33373f] px-4 py-2.5 text-sm text-white transition hover:border-[#ff6a1a]"
                >
                  Imprimir / PDF
                </button>
                <button
                  onClick={() => salvar()}
                  disabled={salvando}
                  className="rounded-xl bg-[#ff6a1a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff8c3f] disabled:opacity-50"
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>

            {msg && <p className="mb-4 text-sm text-green-400">{msg}</p>}
            {erro && <p className="mb-4 text-sm text-red-400">{erro}</p>}

            {/* cliente e moto */}
            <section className="mb-5 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
              <h2 className="mb-3 font-semibold text-white">Cliente e moto</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nome do cliente</label>
                  <input className={inputCls} value={o.clienteNome || ""}
                    onChange={(e) => set("clienteNome", e.target.value)} placeholder="João da Silva" />
                </div>
                <div>
                  <label className={labelCls}>Telefone</label>
                  <input className={inputCls} value={o.clienteTelefone || ""}
                    onChange={(e) => set("clienteTelefone", e.target.value)} placeholder="(71) 9...." />
                </div>
                <div>
                  <label className={labelCls}>Marca</label>
                  <input className={inputCls} value={o.motoMarca || ""}
                    onChange={(e) => set("motoMarca", e.target.value)} placeholder="Honda" />
                </div>
                <div>
                  <label className={labelCls}>Modelo</label>
                  <input className={inputCls} value={o.motoModelo || ""}
                    onChange={(e) => set("motoModelo", e.target.value)} placeholder="CG 160 Start" />
                </div>
                <div className="grid grid-cols-3 gap-3 sm:col-span-2">
                  <div>
                    <label className={labelCls}>Ano</label>
                    <input className={inputCls} value={o.motoAno || ""}
                      onChange={(e) => set("motoAno", e.target.value)} placeholder="2021" />
                  </div>
                  <div>
                    <label className={labelCls}>Placa</label>
                    <input className={inputCls} value={o.motoPlaca || ""}
                      onChange={(e) => set("motoPlaca", e.target.value)} placeholder="ABC1D23" />
                  </div>
                  <div>
                    <label className={labelCls}>KM</label>
                    <input className={inputCls} value={o.motoKm || ""}
                      onChange={(e) => set("motoKm", e.target.value)} placeholder="42.000" />
                  </div>
                </div>
              </div>
            </section>

            {/* diagnostico */}
            <section className="mb-5 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
              <h2 className="mb-1 font-semibold text-white">Diagnóstico</h2>
              <p className="mb-3 text-xs text-[#9aa1ac]">
                As medições entram na ordem impressa como tabela — é o que mostra ao
                cliente que você testou em vez de trocar peça no chute.
              </p>

              <label className={labelCls}>Sintoma relatado pelo cliente</label>
              <textarea className={`${inputCls} mb-3`} rows={2} value={o.sintoma || ""}
                onChange={(e) => set("sintoma", e.target.value)}
                placeholder="Moto falhando em baixa, luz da injeção acendendo" />

              <label className={labelCls}>Testes realizados</label>
              <div className="mb-2 space-y-2">
                {testes.map((t, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2">
                    <input className={`${inputCls} col-span-5`} value={t.item} placeholder="Sinal TPS (pino 5)"
                      onChange={(e) => {
                        const n = [...testes]; n[i] = { ...t, item: e.target.value }; set("testes", n);
                      }} />
                    <input className={`${inputCls} col-span-3`} value={t.esperado} placeholder="0,29–0,71 V"
                      onChange={(e) => {
                        const n = [...testes]; n[i] = { ...t, esperado: e.target.value }; set("testes", n);
                      }} />
                    <input className={`${inputCls} col-span-2`} value={t.medido} placeholder="0,52 V"
                      onChange={(e) => {
                        const n = [...testes]; n[i] = { ...t, medido: e.target.value }; set("testes", n);
                      }} />
                    <button
                      onClick={() => {
                        const n = [...testes];
                        n[i] = { ...t, ok: t.ok === true ? false : t.ok === false ? null : true };
                        set("testes", n);
                      }}
                      className={`col-span-1 rounded-xl border text-sm ${
                        t.ok === true ? "border-green-500/40 bg-green-500/10 text-green-400"
                        : t.ok === false ? "border-red-500/40 bg-red-500/10 text-red-400"
                        : "border-[#33373f] text-[#6b7178]"
                      }`}
                      title="Dentro da faixa?"
                    >
                      {t.ok === true ? "✓" : t.ok === false ? "✕" : "–"}
                    </button>
                    <button onClick={() => set("testes", testes.filter((_, j) => j !== i))}
                      className="col-span-1 rounded-xl border border-[#33373f] text-sm text-[#6b7178] hover:text-red-400">
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => set("testes", [...testes, { item: "", esperado: "", medido: "", ok: null }])}
                className="mb-4 text-sm text-[#ff6a1a] hover:underline"
              >
                + adicionar teste
              </button>

              <label className={labelCls}>Laudo / conclusão</label>
              <textarea className={inputCls} rows={3} value={o.diagnostico || ""}
                onChange={(e) => set("diagnostico", e.target.value)}
                placeholder="Sensor dentro da faixa e alimentação correta. Sem sinal no pino 5 da central: rompimento no chicote entre o conector e a ECU." />
            </section>

            {/* servicos e pecas */}
            <section className="mb-5 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
              <h2 className="mb-3 font-semibold text-white">Serviços e peças</h2>

              <label className={labelCls}>Serviços (mão de obra)</label>
              <div className="mb-2 space-y-2">
                {servicos.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={`${inputCls} flex-1`} value={s.descricao} placeholder="Reparo do chicote"
                      onChange={(e) => {
                        const n = [...servicos]; n[i] = { ...s, descricao: e.target.value }; set("servicos", n);
                      }} />
                    <input className={`${inputCls} w-28`} inputMode="decimal" value={s.valor || ""}
                      placeholder="120,00"
                      onChange={(e) => {
                        const n = [...servicos];
                        n[i] = { ...s, valor: parseFloat(e.target.value.replace(",", ".")) || 0 };
                        set("servicos", n);
                      }} />
                    <button onClick={() => set("servicos", servicos.filter((_, j) => j !== i))}
                      className="rounded-xl border border-[#33373f] px-3 text-[#6b7178] hover:text-red-400">×</button>
                  </div>
                ))}
              </div>
              <button onClick={() => set("servicos", [...servicos, { descricao: "", valor: 0 }])}
                className="mb-4 text-sm text-[#ff6a1a] hover:underline">+ adicionar serviço</button>

              <label className={labelCls}>Peças</label>
              <div className="mb-2 space-y-2">
                {pecas.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={`${inputCls} flex-1`} value={p.descricao} placeholder="Conector 4 vias"
                      onChange={(e) => {
                        const n = [...pecas]; n[i] = { ...p, descricao: e.target.value }; set("pecas", n);
                      }} />
                    <input className={`${inputCls} w-16`} inputMode="numeric" value={p.quantidade || ""}
                      placeholder="1"
                      onChange={(e) => {
                        const n = [...pecas]; n[i] = { ...p, quantidade: parseInt(e.target.value) || 1 }; set("pecas", n);
                      }} />
                    <input className={`${inputCls} w-28`} inputMode="decimal" value={p.valor || ""}
                      placeholder="35,00"
                      onChange={(e) => {
                        const n = [...pecas];
                        n[i] = { ...p, valor: parseFloat(e.target.value.replace(",", ".")) || 0 };
                        set("pecas", n);
                      }} />
                    <button onClick={() => set("pecas", pecas.filter((_, j) => j !== i))}
                      className="rounded-xl border border-[#33373f] px-3 text-[#6b7178] hover:text-red-400">×</button>
                  </div>
                ))}
              </div>
              <button onClick={() => set("pecas", [...pecas, { descricao: "", quantidade: 1, valor: 0 }])}
                className="text-sm text-[#ff6a1a] hover:underline">+ adicionar peça</button>

              <div className="mt-5 border-t border-[#33373f] pt-4 text-right">
                <span className="text-sm text-[#9aa1ac]">Total</span>
                <p className="font-mono text-2xl font-bold text-white">
                  R$ {formatarReais(totalAoVivo)}
                </p>
              </div>
            </section>

            <section className="mb-5 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
              <label className={labelCls}>Observações</label>
              <textarea className={inputCls} rows={2} value={o.observacoes || ""}
                onChange={(e) => set("observacoes", e.target.value)}
                placeholder="Recomendado revisar a vela na próxima revisão." />
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <button onClick={excluir} className="text-sm text-[#6b7178] hover:text-red-400">
                Excluir ordem
              </button>
              <button
                onClick={() => salvar(o.status === "concluida" ? "aberta" : "concluida")}
                disabled={salvando}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
                  o.status === "concluida"
                    ? "border border-[#33373f] text-[#9aa1ac] hover:text-white"
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
              >
                {o.status === "concluida" ? "Reabrir ordem" : "Marcar como concluída"}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ---------------------------- IMPRESSÃO ---------------------------- */}
      <div className="so-doc">
        <div className="cab">
          <div>
            <h1>{nomeOficina}</h1>
            <p style={{ fontSize: "9.5pt", color: "#333", margin: "3px 0 0" }}>
              {[oficina?.oficinaTelefone || oficina?.phone, oficina?.oficinaEndereco]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <div className="num">
            ORDEM DE SERVIÇO
            <b>#{String(o.numero).padStart(3, "0")}</b>
            {new Date(o.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>

        <h2>Cliente</h2>
        <div className="linha">
          <div><span className="rot">Nome</span><p>{o.clienteNome || "—"}</p></div>
          <div><span className="rot">Telefone</span><p>{o.clienteTelefone || "—"}</p></div>
        </div>

        <h2>Veículo</h2>
        <div className="linha">
          <div><span className="rot">Marca / Modelo</span>
            <p>{[o.motoMarca, o.motoModelo].filter(Boolean).join(" ") || "—"}</p></div>
          <div><span className="rot">Ano</span><p>{o.motoAno || "—"}</p></div>
          <div><span className="rot">Placa</span><p>{o.motoPlaca || "—"}</p></div>
          <div><span className="rot">KM</span><p>{o.motoKm || "—"}</p></div>
        </div>

        {o.sintoma && (<><h2>Sintoma relatado</h2><p>{o.sintoma}</p></>)}

        {testes.filter((t) => t.item).length > 0 && (
          <>
            <h2>Testes realizados</h2>
            <table>
              <thead>
                <tr><th>Item</th><th>Esperado</th><th>Medido</th><th className="dir">Resultado</th></tr>
              </thead>
              <tbody>
                {testes.filter((t) => t.item).map((t, i) => (
                  <tr key={i}>
                    <td>{t.item}</td>
                    <td>{t.esperado || "—"}</td>
                    <td>{t.medido || "—"}</td>
                    <td className="dir">
                      {t.ok === true ? "Dentro da faixa" : t.ok === false ? "Fora da faixa" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {o.diagnostico && (<><h2>Laudo técnico</h2><p>{o.diagnostico}</p></>)}

        {(servicos.length > 0 || pecas.length > 0) && (
          <>
            <h2>Serviços e peças</h2>
            <table>
              <thead>
                <tr><th>Descrição</th><th className="dir">Qtd</th><th className="dir">Valor</th></tr>
              </thead>
              <tbody>
                {servicos.filter((s) => s.descricao || s.valor).map((s, i) => (
                  <tr key={`s${i}`}>
                    <td>{s.descricao || "Serviço"}</td>
                    <td className="dir">1</td>
                    <td className="dir">R$ {formatarReais(s.valor)}</td>
                  </tr>
                ))}
                {pecas.filter((p) => p.descricao || p.valor).map((p, i) => (
                  <tr key={`p${i}`}>
                    <td>{p.descricao || "Peça"}</td>
                    <td className="dir">{p.quantidade}</td>
                    <td className="dir">R$ {formatarReais(p.valor * p.quantidade)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="tot">TOTAL: R$ {formatarReais(totalAoVivo)}</p>
          </>
        )}

        {o.observacoes && (<><h2>Observações</h2><p>{o.observacoes}</p></>)}

        <div className="ass">
          <div>Assinatura do responsável técnico</div>
          <div>Assinatura do cliente</div>
        </div>
      </div>
    </>
  );
}
