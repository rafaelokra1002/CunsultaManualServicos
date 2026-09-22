"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export default function InstallButton({ compact = false }: { compact?: boolean }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // Detect iOS
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(ios);

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
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide((prev) => !prev);
    }
  };

  // Hide if already installed
  if (installed) return null;

  // Show on iOS (guide) or Android (native prompt)
  const canShow = deferredPrompt || isIOS;
  if (!canShow) return null;

  if (compact) {
    return (
      <button
        onClick={handleInstall}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 text-[#6c5ce7] transition-all hover:bg-[#6c5ce7]/20 active:scale-95"
        aria-label="Instalar App"
      >
        <DownloadIcon size={20} />
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleInstall}
        className="flex items-center gap-2 rounded-xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-2.5 text-sm font-medium text-[#6c5ce7] transition-all hover:bg-[#6c5ce7]/20 hover:shadow-lg hover:shadow-[#6c5ce7]/10 active:scale-95"
      >
        <DownloadIcon />
        Instalar App
      </button>

      {showIOSGuide && (
        <div className="mt-3 rounded-xl border border-[#6c5ce7]/20 bg-[#12121a] p-4 text-sm">
          <p className="mb-3 font-semibold text-white">Como instalar no iPhone/iPad:</p>
          <ol className="space-y-2 text-[#8888a4]">
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">1</span>
              <span>Toque no botão <span className="inline-flex items-center gap-1 text-[#6c5ce7]"><ShareIcon /> Compartilhar</span> na barra do Safari</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">2</span>
              <span>Role e toque em <strong className="text-white">&quot;Adicionar à Tela de Início&quot;</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6c5ce7]/20 text-xs font-bold text-[#6c5ce7]">3</span>
              <span>Toque em <strong className="text-white">&quot;Adicionar&quot;</strong> para confirmar</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
