"use client";

import { useSession } from "next-auth/react";

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
