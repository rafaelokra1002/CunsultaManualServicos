"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton({ compact = false }: { compact?: boolean }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Don't show if already installed or prompt not available
  if (installed || !deferredPrompt) return null;

  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width={compact ? 20 : 18} height={compact ? 20 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  if (compact) {
    return (
      <button
        onClick={handleInstall}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 text-[#6c5ce7] transition-all hover:bg-[#6c5ce7]/20 active:scale-95"
        aria-label="Instalar App"
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 rounded-xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-2.5 text-sm font-medium text-[#6c5ce7] transition-all hover:bg-[#6c5ce7]/20 hover:shadow-lg hover:shadow-[#6c5ce7]/10 active:scale-95"
    >
      {icon}
      Instalar App
    </button>
  );
}
