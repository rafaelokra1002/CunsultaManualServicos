// Avisos operacionais no Telegram.
//
// Por que existe: as coisas que importam acontecem no servidor e em silêncio
// — a venda cai, o checkout é abandonado, a ativação falha — e o dono só
// descobre se abrir o painel. Aqui chega no celular na hora.
//
// Escolhido no lugar do push do PWA por ser só uma chamada HTTP: sem
// dependência nova no package.json (o build já quebrou uma vez no npm ci),
// sem tabela no banco e sem chaves VAPID.

const API = "https://api.telegram.org";
const SITE = "https://www.manualdeservicos.store";

/** O Telegram quebra a mensagem se houver < & > soltos no modo HTML. */
function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Telefone pronto para o link do WhatsApp: só dígitos, com DDI do Brasil. */
function paraWhatsApp(phone: string): string {
  let v = phone.replace(/\D/g, "");
  if (v.length <= 11) v = "55" + v;
  return v;
}

function reais(v: number): string {
  return v.toFixed(2).replace(".", ",");
}

async function enviar(texto: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID ausente, aviso nao enviado");
    return;
  }

  try {
    const res = await fetch(`${API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: texto,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error(`[telegram] falhou (${res.status}): ${await res.text()}`);
    }
  } catch (error) {
    console.error("[telegram] erro de rede:", error);
  }
}

type VendaInput = {
  nome: string;
  email: string;
  phone?: string | null;
  valor: number;
};

/**
 * Avisa que entrou uma venda. Nunca lança: falha de aviso não pode derrubar
 * o webhook, que é o que libera o acesso do cliente.
 */
export async function avisarVenda(v: VendaInput): Promise<void> {
  const linhas = [
    `💰 <b>NOVA VENDA — R$ ${reais(v.valor)}</b>`,
    ``,
    `👤 ${escapar(v.nome)}`,
    `📧 ${escapar(v.email)}`,
  ];

  if (v.phone) {
    linhas.push(`📱 ${escapar(v.phone)}`);
    linhas.push(``);
    linhas.push(`<a href="https://wa.me/${paraWhatsApp(v.phone)}">Mandar o acesso no WhatsApp</a>`);
  } else {
    linhas.push(``, `⚠️ Sem telefone cadastrado`);
  }

  linhas.push(``, `<a href="${SITE}/admin/vendas">Abrir painel de vendas</a>`);
  await enviar(linhas.join("\n"));
}

type AbandonoInput = {
  nome: string;
  phone?: string | null;
  valor: number;
  minutos: number;
};

/**
 * Avisa que alguém gerou o PIX e não pagou. Lead quente esfria em horas —
 * falar enquanto a pessoa ainda está decidindo é outra conversa.
 */
export async function avisarCheckoutAbandonado(itens: AbandonoInput[]): Promise<void> {
  if (itens.length === 0) return;

  const titulo =
    itens.length === 1
      ? `⚠️ <b>CHECKOUT ABANDONADO</b>`
      : `⚠️ <b>${itens.length} CHECKOUTS ABANDONADOS</b>`;
  const linhas = [titulo, ``];

  for (const i of itens) {
    linhas.push(`👤 ${escapar(i.nome)} — R$ ${reais(i.valor)}`);
    linhas.push(`   gerou o PIX há ${i.minutos} min`);
    if (i.phone) {
      linhas.push(`   <a href="https://wa.me/${paraWhatsApp(i.phone)}">Chamar no WhatsApp</a>`);
    } else {
      linhas.push(`   ⚠️ sem telefone`);
    }
    linhas.push(``);
  }

  linhas.push(`<a href="${SITE}/admin/checkouts">Abrir painel</a>`);
  await enviar(linhas.join("\n"));
}

/**
 * Pagamento aprovado mas o acesso não liberou. O cliente pagou e está sem
 * o produto: é o alerta mais urgente que existe aqui.
 */
export async function avisarFalhaDeAtivacao(
  itens: { nome: string; email: string; phone?: string | null }[]
): Promise<void> {
  if (itens.length === 0) return;

  const linhas = [
    `🚨 <b>PAGOU MAS NÃO TEM ACESSO</b>`,
    ``,
    `${itens.length} cliente(s) com pagamento aprovado e acesso bloqueado:`,
    ``,
  ];

  for (const i of itens) {
    linhas.push(`👤 ${escapar(i.nome)} — ${escapar(i.email)}`);
    if (i.phone) {
      linhas.push(`   <a href="https://wa.me/${paraWhatsApp(i.phone)}">Chamar no WhatsApp</a>`);
    }
  }

  linhas.push(``, `Libere na mão em <a href="${SITE}/admin/usuarios">Usuários</a>.`);
  await enviar(linhas.join("\n"));
}

/** Erro no webhook do gateway — some o dinheiro sem ninguém perceber. */
export async function avisarErro(contexto: string, detalhe: string): Promise<void> {
  await enviar(
    [
      `🔴 <b>ERRO NO SISTEMA</b>`,
      ``,
      `Onde: ${escapar(contexto)}`,
      `Detalhe: ${escapar(detalhe.slice(0, 400))}`,
    ].join("\n")
  );
}

type ResumoInput = {
  visitas: number;
  cadastros: number;
  checkouts: number;
  vendas: number;
  faturamento: number;
  abandonadosPendentes: number;
};

/** Balanço do dia, para acompanhar sem ficar atualizando painel. */
export async function avisarResumoDiario(r: ResumoInput): Promise<void> {
  const linhas = [
    `📊 <b>RESUMO DO DIA</b>`,
    ``,
    `👁 Visitas no site: <b>${r.visitas}</b>`,
    `📝 Cadastros: <b>${r.cadastros}</b>`,
    `🛒 Checkouts gerados: <b>${r.checkouts}</b>`,
    `💰 Vendas: <b>${r.vendas}</b> — R$ ${reais(r.faturamento)}`,
  ];

  if (r.checkouts > 0) {
    const taxa = ((r.vendas / r.checkouts) * 100).toFixed(0);
    linhas.push(``, `Dos checkouts, ${taxa}% viraram pagamento.`);
  }

  if (r.abandonadosPendentes > 0) {
    linhas.push(
      ``,
      `⚠️ ${r.abandonadosPendentes} checkout(s) esperando contato.`,
      `<a href="${SITE}/admin/checkouts">Ver quem é</a>`
    );
  }

  if (r.vendas === 0 && r.checkouts === 0 && r.visitas < 5) {
    linhas.push(``, `<i>Dia parado. Vale conferir se a campanha está entregando.</i>`);
  }

  await enviar(linhas.join("\n"));
}
