"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "payment">("register");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  // Poll payment status
  useEffect(() => {
    if (paymentId && step === "payment") {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/payments/status?id=${paymentId}`);
          const data = await res.json();
          if (data.status === "approved") {
            clearInterval(pollRef.current!);
            setSuccess("Pagamento confirmado! Redirecionando...");
            setTimeout(() => router.push("/login"), 2500);
          }
        } catch {
          // silently retry
        }
      }, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [paymentId, step, router]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao cadastrar");
        return;
      }

      setUserId(data.user.id);
      setStep("payment");
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  async function handleGeneratePayment(uid?: string) {
    setPaymentLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid || userId }),
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
      setPaymentLoading(false);
    }
  }

  function handleCopyPix() {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4 py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,92,231,0.15),_transparent_50%)]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center text-4xl font-extrabold tracking-tight text-white">
            <Logo size="md" />
            <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
          </h1>
          <p className="mt-2 text-[#8888a4]">
            {step === "register" ? "Crie sua conta" : "Finalize seu pagamento"}
          </p>
        </div>

        {/* Plan Card */}
        <div className="card-glass mb-6 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00d68f]">
                🔥 Oferta Especial
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">Plano Acesso Total</h3>
              <p className="mt-1 text-sm text-[#8888a4]">
                Manuais + Tabela de óleo + Calculadora
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-[#8888a4] line-through">R$ 49,90</span>
              <div className="text-3xl font-extrabold text-[#00d68f]">
                R$ 34<span className="text-xl">,90</span>
              </div>
              <span className="text-xs text-[#8888a4]">pagamento único</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Todos os manuais", "Tabela de óleo/suspensão", "Calculadora de Pastilha de Válvulas", "Acesso vitalício", "Atualizações grátis"].map((item) => (
              <span key={item} className="rounded-full border border-[#2a2a3e] bg-[#12121a] px-3 py-1 text-xs text-[#8888a4]">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Step: Register */}
        {step === "register" && (
          <div className="card-glass rounded-2xl p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Cadastro</h2>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="input-dark"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-dark"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dark"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Cadastrando..." : "Criar conta"}
              </button>
            </form>

            <div className="mt-4 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3">
              <p className="text-center text-xs text-[#8888a4]">
                ⚡ Após o cadastro, você já pode explorar a plataforma em modo demo.
                Pague para liberar o acesso completo.
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-[#8888a4]">
              Já tem conta?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#6c5ce7] transition-colors hover:text-[#7c6ef7]"
              >
                Faça login
              </Link>
            </p>
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && (
          <div className="card-glass rounded-2xl p-8">
            <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
              ✅ Conta criada com sucesso!
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Liberar Acesso Completo</h2>
            <p className="mb-4 text-sm text-[#8888a4]">
              Pague via PIX para liberar todos os recursos, ou explore a plataforma em modo demo.
            </p>
            <a
              href="/login"
              className="btn-outline mb-6 block w-full text-center"
            >
              Acessar modo demo →
            </a>

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

            {paymentLoading ? (
              <div className="flex flex-col items-center py-10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6c5ce7] border-t-transparent" />
                <p className="mt-4 text-sm text-[#8888a4]">Gerando PIX...</p>
              </div>
            ) : (
              <>
                {/* QR Code */}
                {pixQrCode && (
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-2xl bg-white p-4">
                      <img
                        src={pixQrCode}
                        alt="QR Code PIX"
                        className="h-48 w-48"
                      />
                    </div>
                  </div>
                )}

                {/* PIX Copy-Paste */}
                {pixCode && (
                  <div className="mb-6">
                    <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                      Código PIX (Copia e Cola)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixCode}
                        className="input-dark flex-1 text-xs"
                      />
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

                {/* Status info */}
                {pixCode && (
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-white">Aguardando pagamento...</p>
                        <p className="text-xs text-[#8888a4]">
                          O acesso será liberado automaticamente após a confirmação
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Retry button */}
                {!pixCode && !paymentLoading && (
                  <button
                    onClick={() => handleGeneratePayment()}
                    className="btn-primary mt-4 w-full"
                  >
                    Gerar PIX
                  </button>
                )}
              </>
            )}

            <p className="mt-6 text-center text-sm text-[#8888a4]">
              Já pagou?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#6c5ce7] transition-colors hover:text-[#7c6ef7]"
              >
                Faça login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
