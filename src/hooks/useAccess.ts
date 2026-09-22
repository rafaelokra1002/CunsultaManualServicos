"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";

export function useAccess() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user;
  const isPremium =
    session?.user?.isPremium === true || session?.user?.role === "ADMIN";
  const demoUsed = session?.user?.demoUsed === true;

  return {
    isLoading,
    isAuthenticated,
    isPremium,
    demoUsed,
    user: session?.user ?? null,
  };
}

/**
 * Hook para controlar trial gratuito (1 uso total para todas as ferramentas).
 * Usa flag server-side (demoUsed) no banco de dados — não pode ser burlado.
 * Após o primeiro uso de QUALQUER ferramenta, TODAS ficam bloqueadas.
 */
export function useFreeTrial(featureKey: string) {
  const { isPremium, demoUsed } = useAccess();
  const { update } = useSession();
  const [justUsed, setJustUsed] = useState(false);

  const blocked = !isPremium && demoUsed && !justUsed;
  const loaded = true;

  const markUsed = useCallback(async () => {
    if (isPremium || demoUsed) return;
    // Permite ver o resultado desta vez, mas marca no servidor
    setJustUsed(true);
    try {
      await fetch("/api/demo/mark-used", { method: "POST" });
      // Atualiza a sessão para refletir a mudança
      await update();
    } catch {}
  }, [isPremium, demoUsed, update]);

  // Premium sempre tem acesso
  if (isPremium) {
    return { blocked: false, trialAvailable: true, markUsed: () => {}, loaded };
  }

  return {
    blocked,
    trialAvailable: !blocked,
    markUsed,
    loaded,
  };
}
