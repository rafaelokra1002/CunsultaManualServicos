import type { ModuloEsquema } from "@prisma/client";

export const MODULO_LABEL: Record<ModuloEsquema, string> = {
  INJECAO: "Injeção",
  ABS: "ABS",
  CHASSI: "Chassi",
  INSTRUMENTACAO: "Instrumentação",
  ALARME: "Alarme",
  PNEUS: "Pneus",
  SUSPENSAO: "Suspensão",
  PUNHO: "Punho",
  ELOCK: "E-Lock",
  HANDSFREE: "Handsfree",
  RADIO: "Rádio",
  FAROIS: "Faróis",
};

// marca vai em minúsculas na URL; a busca no banco é case-insensitive
export function marcaUrl(marca: string): string {
  return `/esquemas/${encodeURIComponent(marca.trim().toLowerCase())}`;
}

export function marcaDaUrl(param: string): string {
  try {
    return decodeURIComponent(param).trim();
  } catch {
    return param.trim();
  }
}
