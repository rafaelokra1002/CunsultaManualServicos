"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Olá, {session?.user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="mt-1 text-[#8888a4]">
          Bem-vindo ao painel de manuais de motocicletas
        </p>
      </div>

      {/* Cards de status */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <div className="card-glass rounded-2xl p-6 transition-all hover:border-[#6c5ce7]/30">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-xl">
            📄
          </div>
          <h3 className="text-lg font-semibold text-white">Manuais</h3>
          <p className="text-sm text-[#8888a4]">
            Acesse nossa biblioteca de manuais de serviço
          </p>
          <Link
            href="/manuais"
            className="mt-4 inline-block text-sm font-semibold text-[#6c5ce7] transition-colors hover:text-[#7c6ef7]"
          >
            Ver manuais →
          </Link>
        </div>

        <div className="card-glass rounded-2xl p-6 transition-all hover:border-[#6c5ce7]/30">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15 text-xl">
            ✅
          </div>
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <p className="text-sm text-[#8888a4]">
            Sua conta está{" "}
            <span
              className={`font-semibold ${
                session?.user?.active ? "text-green-400" : "text-red-400"
              }`}
            >
              {session?.user?.active ? "ativa" : "inativa"}
            </span>
          </p>
        </div>

        <div className="card-glass rounded-2xl p-6 transition-all hover:border-[#6c5ce7]/30">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/15 text-xl">
            🔑
          </div>
          <h3 className="text-lg font-semibold text-white">Seu plano</h3>
          <p className="text-sm text-[#8888a4]">
            {session?.user?.active
              ? "Acesso liberado a todos os manuais"
              : "Efetue o pagamento para liberar o acesso"}
          </p>
        </div>
      </div>

      {/* Mensagem para admin */}
      {session?.user?.role === "ADMIN" && (
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-orange-400">
            🔧 Painel Administrativo
          </h3>
          <p className="mt-1 text-sm text-[#8888a4]">
            Você é um administrador. Acesse o painel admin para gerenciar
            manuais e usuários.
          </p>
          <Link
            href="/admin"
            className="mt-3 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
          >
            Ir para o Admin
          </Link>
        </div>
      )}
    </div>
  );
}
