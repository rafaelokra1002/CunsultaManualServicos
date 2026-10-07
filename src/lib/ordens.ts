// Tipos e regras compartilhadas da ordem de serviço.
// Ficam aqui porque o cálculo do total é feito no SERVIDOR: valor vindo do
// navegador não é confiável, e a OS é documento que o mecânico entrega ao
// cliente dele.

export type Servico = { descricao: string; valor: number };
export type Peca = { descricao: string; quantidade: number; valor: number };
export type Teste = { item: string; esperado: string; medido: string; ok: boolean | null };

export type OrdemPayload = {
  clienteNome?: string;
  clienteTelefone?: string;
  motoMarca?: string;
  motoModelo?: string;
  motoAno?: string;
  motoPlaca?: string;
  motoKm?: string;
  sintoma?: string;
  diagnostico?: string;
  testes?: Teste[];
  servicos?: Servico[];
  pecas?: Peca[];
  observacoes?: string;
  status?: string;
};

function numero(v: unknown): number {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function texto(v: unknown, max = 500): string {
  return String(v ?? "").trim().slice(0, max);
}

export function limparServicos(lista: unknown): Servico[] {
  if (!Array.isArray(lista)) return [];
  return lista
    .map((s) => ({ descricao: texto((s as Servico)?.descricao, 200), valor: numero((s as Servico)?.valor) }))
    .filter((s) => s.descricao || s.valor > 0)
    .slice(0, 50);
}

export function limparPecas(lista: unknown): Peca[] {
  if (!Array.isArray(lista)) return [];
  return lista
    .map((p) => ({
      descricao: texto((p as Peca)?.descricao, 200),
      quantidade: Math.max(1, Math.round(numero((p as Peca)?.quantidade) || 1)),
      valor: numero((p as Peca)?.valor),
    }))
    .filter((p) => p.descricao || p.valor > 0)
    .slice(0, 50);
}

export function limparTestes(lista: unknown): Teste[] {
  if (!Array.isArray(lista)) return [];
  return lista
    .map((t) => ({
      item: texto((t as Teste)?.item, 120),
      esperado: texto((t as Teste)?.esperado, 60),
      medido: texto((t as Teste)?.medido, 60),
      ok: typeof (t as Teste)?.ok === "boolean" ? (t as Teste).ok : null,
    }))
    .filter((t) => t.item)
    .slice(0, 30);
}

export function calcularTotal(servicos: Servico[], pecas: Peca[]): number {
  const s = servicos.reduce((acc, x) => acc + x.valor, 0);
  const p = pecas.reduce((acc, x) => acc + x.valor * x.quantidade, 0);
  return Math.round((s + p) * 100) / 100;
}

/** Normaliza o que veio do navegador no formato que vai para o banco. */
export function prepararOrdem(body: OrdemPayload) {
  const servicos = limparServicos(body.servicos);
  const pecas = limparPecas(body.pecas);
  return {
    clienteNome: texto(body.clienteNome, 120) || "Cliente",
    clienteTelefone: texto(body.clienteTelefone, 30) || null,
    motoMarca: texto(body.motoMarca, 60) || null,
    motoModelo: texto(body.motoModelo, 80) || null,
    motoAno: texto(body.motoAno, 20) || null,
    motoPlaca: texto(body.motoPlaca, 15).toUpperCase() || null,
    motoKm: texto(body.motoKm, 20) || null,
    sintoma: texto(body.sintoma, 2000) || null,
    diagnostico: texto(body.diagnostico, 4000) || null,
    testes: limparTestes(body.testes),
    servicos,
    pecas,
    observacoes: texto(body.observacoes, 2000) || null,
    total: calcularTotal(servicos, pecas),
    status: body.status === "concluida" ? "concluida" : "aberta",
  };
}

export function formatarReais(v: number): string {
  return v.toFixed(2).replace(".", ",");
}
