import { createHmac, timingSafeEqual } from "crypto";

// Link do checkout do produto "Plano Acesso Total" na Kiwify
export const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/XcIkB9z";

// Senha "impossível" usada em contas criadas pelo webhook da Kiwify.
// Não é um hash bcrypt (60 caracteres), então o login sempre falha até o
// cliente definir a senha em /primeiro-acesso.
export const PENDING_PASSWORD = "!kiwify-pending";

export function kiwifyCheckoutUrl(email?: string | null) {
  if (!email) return KIWIFY_CHECKOUT_URL;
  const sep = KIWIFY_CHECKOUT_URL.includes("?") ? "&" : "?";
  return `${KIWIFY_CHECKOUT_URL}${sep}email=${encodeURIComponent(email)}`;
}

// A Kiwify envia ?signature= com o HMAC do corpo, usando o token do webhook.
// A documentação oficial não diz o algoritmo, então aceitamos as variações
// possíveis — todas exigem o token, então nenhuma enfraquece a verificação.
export function kiwifySignatures(rawBody: string, token: string) {
  const variants: string[] = [];
  for (const algo of ["sha1", "sha256"]) {
    for (const enc of ["hex", "base64"] as const) {
      variants.push(createHmac(algo, token).update(rawBody).digest(enc));
    }
  }
  return variants;
}

export function isValidKiwifySignature(rawBody: string, signature: string | null, token: string) {
  if (!signature) return false;
  const received = Buffer.from(signature);
  return kiwifySignatures(rawBody, token).some((expected) => {
    const a = Buffer.from(expected);
    return a.length === received.length && timingSafeEqual(a, received);
  });
}

export function onlyDigits(v: unknown) {
  return typeof v === "string" ? v.replace(/\D/g, "") : "";
}
