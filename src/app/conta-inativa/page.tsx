"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

  // Poll payment status
  useEffect(() => {
    if (paymentId) {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/payments/status?id=${paymentId}`);
          const data = await res.json();
          if (data.status === "approved") {
            clearInterval(pollRef.current!);
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
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(108,92,231,0.1),_transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="card-glass rounded-2xl p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6c5ce7]/15 text-4xl">
            �
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">Liberar Acesso Completo</h1>
          <p className="mb-6 text-[#8888a4]">
            Pague uma única vez e libere todos os recursos da plataforma.
          </p>

          {/* Plan info */}
          <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d68f]">
              🔥 Oferta Especial
            </span>
            <div className="mt-2">
              <span className="text-sm text-[#8888a4] line-through">R$ 49,90</span>
              <span className="ml-2 text-2xl font-extrabold text-[#00d68f]">R$ 34,90</span>
            </div>
            <p className="mt-1 text-xs text-[#8888a4]">Acesso total • Pagamento único</p>
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
              Pagar com PIX - R$ 34,90
            </button>
          )}

          {loading && (
            <div className="flex flex-col items-center py-6">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6c5ce7] border-t-transparent" />
              <p className="mt-4 text-sm text-[#8888a4]">Gerando PIX...</p>
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
              <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                Código PIX (Copia e Cola)
              </label>
              <div className="flex gap-2">
                <input type="text" readOnly value={pixCode} className="input-dark flex-1 text-xs" />
                <button
                  onClick={handleCopyPix}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    copied
                      ? "bg-[#00d68f]/20 text-[#00d68f]"
                      : "bg-[#6c5ce7] text-white hover:bg-[#7c6ef7]"
                  }`}
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          )}

          {pixCode && (
            <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Aguardando pagamento...</p>
                  <p className="text-xs text-[#8888a4]">O acesso será liberado automaticamente</p>
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
