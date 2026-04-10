"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export function useAccess() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user;
  const isPremium =
    session?.user?.isPremium === true || session?.user?.role === "ADMIN";

  return {
    isLoading,
    isAuthenticated,
    isPremium,
    user: session?.user ?? null,
  };
}

/**
 * Hook para controlar trial gratuito por funcionalidade.
 * Permite ao usuário demo usar a funcionalidade 1 vez antes de bloquear.
 * O bloqueio só aparece na próxima visita (após reload/navegação).
 */
export function useFreeTrial(featureKey: string) {
  const { isPremium } = useAccess();
  const [blocked, setBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const storageKey = `demo_used_${featureKey}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBlocked(localStorage.getItem(storageKey) === "true");
      setLoaded(true);
    }
  }, [storageKey]);

  const markUsed = useCallback(() => {
    if (!isPremium && typeof window !== "undefined") {
      // Grava no localStorage para bloquear na próxima visita,
      // mas NÃO atualiza o estado — o usuário vê o resultado desta vez.
      localStorage.setItem(storageKey, "true");
    }
  }, [isPremium, storageKey]);

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
