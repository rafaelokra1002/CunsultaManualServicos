// Helper para disparar eventos do Meta Pixel (fbq) no lado do navegador.
// O fbq é injetado globalmente pelo <Script id="fb-pixel"> em src/app/layout.tsx.

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * `eventId` serve para deduplicar com a Conversions API (src/lib/meta-capi.ts):
 * quando navegador e servidor mandam o mesmo evento com o mesmo id, a Meta
 * conta uma vez só. Nas compras usamos o id do pagamento nos dois lados.
 */
export function trackFb(event: string, params?: FbqParams, eventId?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    const args: unknown[] = ["track", event, params ?? {}];
    if (eventId) args.push({ eventID: eventId });
    window.fbq(...args);
  } catch {
    // não deixa erro de tracking quebrar o fluxo de pagamento
  }
}
