"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { PUSHINPAY_CHECKOUT_URL } from "@/lib/pushinpay";

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Redireciona para o checkout do PushinPay
      setSuccess("Cadastro realizado! Redirecionando para pagamento...");
      setTimeout(() => {
        window.location.href = PUSHINPAY_CHECKOUT_URL;
      }, 1500);
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
          <p className="mt-2 text-[#8888a4]">Crie sua conta</p>
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

        {/* Register Form */}
        <div className="card-glass rounded-2xl p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Cadastro</h2>

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
              {loading ? "Cadastrando..." : "Criar conta e pagar R$ 34,90"}
            </button>
          </form>

          <div className="mt-4 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3">
            <p className="text-center text-xs text-[#8888a4]">
              ⚡ Após o cadastro você será redirecionado para o pagamento via PIX.
              Seu acesso é liberado automaticamente após a confirmação.
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
      </div>
    </div>
  );
}
