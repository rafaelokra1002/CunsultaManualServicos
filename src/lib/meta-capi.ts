// Conversions API da Meta: dispara o evento de compra pelo SERVIDOR.
//
// Por que existe: o Purchase do navegador (src/lib/fbpixel.ts) só sai se o
// comprador continuar com a aba aberta até o PIX cair. Quem paga no app do
// banco e fecha a aba nunca gera o evento — foi o que aconteceu com a
// primeira venda da campanha, que ficou invisível para a Meta.
//
// O webhook do gateway sabe da aprovação independentemente do navegador,
// então é daqui que o evento sai de forma confiável.
//
// Deduplicação: o navegador e o servidor mandam o MESMO event_id (o id do
// pagamento). Quando os dois disparam, a Meta conta uma vez só.

import crypto from "crypto";

const GRAPH_VERSION = "v21.0";
const PIXEL_ID = process.env.META_PIXEL_ID || "1074292432237603";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.manualdeservicos.store";

/** A Meta exige os dados pessoais em SHA-256, já normalizados. */
function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hashEmail(email?: string | null): string | undefined {
  const v = (email || "").trim().toLowerCase();
  return v ? hash(v) : undefined;
}

/** Telefone só com dígitos e com código do país; assume Brasil quando falta. */
function hashPhone(phone?: string | null): string | undefined {
  let v = (phone || "").replace(/\D/g, "");
  if (!v) return undefined;
  if (v.length <= 11) v = "55" + v;
  return hash(v);
}

type PurchaseInput = {
  eventId: string;
  value: number;
  email?: string | null;
  phone?: string | null;
  sourceUrl?: string;
};

/**
 * Envia o Purchase para a Meta. Nunca lança: falha de tracking não pode
 * derrubar o webhook de pagamento, que é o que libera o acesso do cliente.
 */
export async function sendPurchaseToMeta(input: PurchaseInput): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.warn("[meta-capi] META_CAPI_TOKEN ausente, evento nao enviado");
    return;
  }

  const userData: Record<string, string[]> = {};
  const em = hashEmail(input.email);
  const ph = hashPhone(input.phone);
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.sourceUrl || `${SITE_URL}/register`,
        user_data: userData,
        custom_data: {
          value: Number(input.value.toFixed(2)),
          currency: "BRL",
          content_name: "Acesso OficinaDigital",
        },
      },
    ],
    access_token: token,
  };

  // Só para validar no "Testar eventos" do Events Manager; fora de teste fica vazio.
  if (process.env.META_CAPI_TEST_CODE) {
    payload.test_event_code = process.env.META_CAPI_TEST_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const body = await res.text();
    if (!res.ok) {
      console.error(`[meta-capi] falhou (${res.status}): ${body}`);
      return;
    }
    console.log(`[meta-capi] Purchase enviado (event_id=${input.eventId}): ${body}`);
  } catch (error) {
    console.error("[meta-capi] erro de rede ao enviar Purchase:", error);
  }
}
