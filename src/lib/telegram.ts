// Aviso de venda no Telegram.
//
// Por que existe: quando o PIX é aprovado, o webhook libera o acesso e
// pronto — ninguém fica sabendo. O dono só descobre a venda se abrir o
// painel. Aqui a notificação chega no celular na hora, com o telefone do
// cliente junto, para já dar as boas-vindas pelo WhatsApp.
//
// Escolhido no lugar do push do PWA por ser uma chamada HTTP simples: sem
// dependência nova no package.json (o build já quebrou uma vez no npm ci),
// sem tabela no banco e sem chaves VAPID.

const API = "https://api.telegram.org";

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
  const valor = v.valor.toFixed(2).replace(".", ",");
  const linhas = [
    `💰 <b>NOVA VENDA — R$ ${valor}</b>`,
    ``,
    `👤 ${escapar(v.nome)}`,
    `📧 ${escapar(v.email)}`,
  ];

  if (v.phone) {
    linhas.push(`📱 ${escapar(v.phone)}`);
    linhas.push(``);
    linhas.push(
      `<a href="https://wa.me/${paraWhatsApp(v.phone)}">Mandar o acesso no WhatsApp</a>`
    );
  } else {
    linhas.push(``);
    linhas.push(`⚠️ Sem telefone cadastrado`);
  }

  linhas.push(``);
  linhas.push(`<a href="https://www.manualdeservicos.store/admin/vendas">Abrir painel de vendas</a>`);

  await enviar(linhas.join("\n"));
}
