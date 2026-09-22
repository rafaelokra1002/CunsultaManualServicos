"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { kiwifyCheckoutUrl } from "@/lib/kiwify";

function RegisterForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") ?? undefined;
  const [step, setStep] = useState<"register" | "payment">("register");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, phone, password, referralCode: refCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao cadastrar");
        return;
      }

      setStep("payment");
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
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
              <span className="text-sm text-[#8888a4] line-through">R$ 97,90</span>
              <div className="text-3xl font-extrabold text-[#00d68f]">R$ 67</div>
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
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  WhatsApp (com DDD)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-dark"
                  placeholder="(71) 99999-9999"
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
              Pague R$ 67 pela Kiwify (PIX ou cartão) para liberar todos os recursos, ou explore a plataforma em modo demo.
            </p>
            <a href={kiwifyCheckoutUrl(email)} className="btn-primary mb-3 block w-full text-center">
              Liberar acesso completo →
            </a>
            <p className="mb-6 text-center text-xs text-[#8888a4]">
              Use o mesmo email do cadastro no pagamento ({email}). O acesso é liberado automaticamente.
            </p>
            <a
              href="/login"
              className="btn-outline block w-full text-center"
            >
              Acessar modo demo →
            </a>

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

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
