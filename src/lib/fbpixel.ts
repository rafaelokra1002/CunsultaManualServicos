// Helper para disparar eventos do Meta Pixel (fbq) no lado do navegador.
// O fbq é injetado globalmente pelo <Script id="fb-pixel"> em src/app/layout.tsx.

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackFb(event: string, params?: FbqParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    if (params) {
      window.fbq("track", event, params);
    } else {
      window.fbq("track", event);
    }
  } catch {
    // não deixa erro de tracking quebrar o fluxo de pagamento
  }
}
