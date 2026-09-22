"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function PrimeiroAcessoPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phoneEnd, setPhoneEnd] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("As senhas não conferem");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/primeiro-acesso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phoneEnd, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Não foi possível criar a senha");
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
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
          <p className="mt-2 text-[#8888a4]">Compra aprovada! Crie sua senha para entrar.</p>
        </div>

        <div className="card-glass rounded-2xl p-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Primeiro acesso</h2>
          <p className="mb-6 text-sm text-[#8888a4]">
            Use o mesmo email e celular que você informou no pagamento.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                Email da compra
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
              <label htmlFor="phoneEnd" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                4 últimos dígitos do celular da compra
              </label>
              <input
                id="phoneEnd"
                type="text"
                inputMode="numeric"
                required
                maxLength={4}
                value={phoneEnd}
                onChange={(e) => setPhoneEnd(e.target.value.replace(/\D/g, ""))}
                className="input-dark"
                placeholder="1234"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                Crie uma senha
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

            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                Repita a senha
              </label>
              <input
                id="confirm"
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="input-dark"
                placeholder="••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Salvando..." : "Criar senha e entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#8888a4]">
            Já tem senha?{" "}
            <Link href="/login" className="font-semibold text-[#6c5ce7] transition-colors hover:text-[#7c6ef7]">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
