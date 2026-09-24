"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trackFb } from "@/lib/fbpixel";

export default function ContaInativaPage() {
  const { data: session } = useSession();
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const purchaseFiredRef = useRef(false);

  // Poll payment status
  useEffect(() => {
    if (paymentId) {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/payments/status?id=${paymentId}`);
          const data = await res.json();
          if (data.status === "approved") {
            clearInterval(pollRef.current!);
            if (!purchaseFiredRef.current) {
              purchaseFiredRef.current = true;
              trackFb("Purchase", { value: 67.0, currency: "BRL" });
            }
            setSuccess("Pagamento confirmado! Redirecionando...");
            setTimeout(() => (window.location.href = "/dashboard"), 2500);
          }
        } catch {
          // silently retry
        }
      }, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [paymentId]);

  async function handlePay() {
    if (!session?.user) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: (session.user as any).id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao gerar pagamento");
        return;
      }

      setPixCode(data.pixCode || "");
      setPixQrCode(data.pixQrCode || "");
      setPaymentId(data.paymentId);
      trackFb("InitiateCheckout", { value: 67.0, currency: "BRL" });
    } catch {
      setError("Erro ao gerar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopyPix() {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#16181c] px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,106,26,0.1),_transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="card-glass rounded-2xl p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6a1a]/15 text-4xl">
            �
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">Liberar Acesso Completo</h1>
          <p className="mb-6 text-[#9aa1ac]">
            Pague uma única vez e libere todos os recursos da plataforma.
          </p>

          {/* Plan info */}
          <div className="mb-6 rounded-xl border border-[#33373f] bg-[#111317] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#37c07a]">
              🔥 Oferta Especial
            </span>
            <div className="mt-2">
              <span className="text-sm text-[#9aa1ac] line-through">R$ 97,90</span>
              <span className="ml-2 text-2xl font-extrabold text-[#37c07a]">R$ 67</span>
            </div>
            <p className="mt-1 text-xs text-[#9aa1ac]">Acesso total • Pagamento único</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {!pixCode && !loading && (
            <button onClick={handlePay} className="btn-primary mb-4 w-full">
              Pagar com PIX - R$ 67
            </button>
          )}

          {loading && (
            <div className="flex flex-col items-center py-6">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff6a1a] border-t-transparent" />
              <p className="mt-4 text-sm text-[#9aa1ac]">Gerando PIX...</p>
            </div>
          )}

          {pixQrCode && (
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-white p-4">
                <img src={pixQrCode} alt="QR Code PIX" className="h-48 w-48" />
              </div>
            </div>
          )}

          {pixCode && (
            <div className="mb-4 text-left">
              <label className="mb-1.5 block text-sm font-medium text-[#9aa1ac]">
                Código PIX (Copia e Cola)
              </label>
              <div className="flex gap-2">
                <input type="text" readOnly value={pixCode} className="input-dark flex-1 text-xs" />
                <button
                  onClick={handleCopyPix}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    copied
                      ? "bg-[#37c07a]/20 text-[#37c07a]"
                      : "bg-[#ff6a1a] text-white hover:bg-[#ff8c3f]"
                  }`}
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          )}

          {pixCode && (
            <div className="mb-6 rounded-xl border border-[#33373f] bg-[#111317] p-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Aguardando pagamento...</p>
                  <p className="text-xs text-[#9aa1ac]">O acesso será liberado automaticamente</p>
                </div>
              </div>
            </div>
          )}

          <Link href="/dashboard" className="btn-outline inline-block px-6 py-2.5">
            Voltar ao painel
          </Link>
        </div>
      </div>
    </div>
  );
}
