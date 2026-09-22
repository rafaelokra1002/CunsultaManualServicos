import { createHmac, timingSafeEqual } from "crypto";

// Link do checkout do produto "Plano Acesso Total" na Kiwify
export const KIWIFY_CHECKOUT_URL = "COLE_AQUI_O_LINK_DO_CHECKOUT";

// Senha "impossível" usada em contas criadas pelo webhook da Kiwify.
// Não é um hash bcrypt (60 caracteres), então o login sempre falha até o
// cliente definir a senha em /primeiro-acesso.
export const PENDING_PASSWORD = "!kiwify-pending";

export function kiwifyCheckoutUrl(email?: string | null) {
  if (!email) return KIWIFY_CHECKOUT_URL;
  const sep = KIWIFY_CHECKOUT_URL.includes("?") ? "&" : "?";
  return `${KIWIFY_CHECKOUT_URL}${sep}email=${encodeURIComponent(email)}`;
}

// A Kiwify envia ?signature= com o HMAC-SHA1 (hex) do corpo, usando o token do webhook
export function isValidKiwifySignature(rawBody: string, signature: string | null, token: string) {
  if (!signature) return false;
  const expected = createHmac("sha1", token).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function onlyDigits(v: unknown) {
  return typeof v === "string" ? v.replace(/\D/g, "") : "";
}
