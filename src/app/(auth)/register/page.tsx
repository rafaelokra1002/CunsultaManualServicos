"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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

      setSuccess(data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,92,231,0.15),_transparent_50%)]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center text-4xl font-extrabold tracking-tight text-white">
            <Logo size="md" />
            <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
          </h1>
          <p className="mt-2 text-[#8888a4]">Crie sua conta</p>
        </div>

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

          <form onSubmit={handleSubmit} className="space-y-5">
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
