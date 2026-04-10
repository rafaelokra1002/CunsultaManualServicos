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
 */
export function useFreeTrial(featureKey: string) {
  const { isPremium } = useAccess();
  const [trialUsed, setTrialUsed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const storageKey = `demo_used_${featureKey}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTrialUsed(localStorage.getItem(storageKey) === "true");
      setLoaded(true);
    }
  }, [storageKey]);

  const markUsed = useCallback(() => {
    if (!isPremium && typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
      setTrialUsed(true);
    }
  }, [isPremium, storageKey]);

  // Premium sempre tem acesso
  if (isPremium) {
    return { blocked: false, trialAvailable: true, markUsed: () => {}, loaded };
  }

  return {
    blocked: trialUsed,
    trialAvailable: !trialUsed,
    markUsed,
    loaded,
  };
}
