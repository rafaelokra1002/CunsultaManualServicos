"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalManuais: 0,
  });
  const [views, setViews] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, manuaisRes, viewsRes] = await Promise.all([
          fetch("/api/users", { cache: "no-store" }),
          fetch("/api/manuais?summary=counts", { cache: "no-store" }),
          fetch("/api/stats/views", { cache: "no-store" }),
        ]);

        if (usersRes.ok && manuaisRes.ok) {
          const users = await usersRes.json();
          const manuais = await manuaisRes.json();

          setStats({
            totalUsers: users.length,
            activeUsers: users.filter((u: any) => u.active).length,
            totalManuais: manuais.total,
          });
        }

        if (viewsRes.ok) {
          setViews(await viewsRes.json());
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          📊 Painel Administrativo
        </h1>
        <p className="mt-1 text-[#8888a4]">
          Gerencie manuais e usuários do sistema
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        <div className="card-glass rounded-2xl p-6 transition-all hover:border-blue-500/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-2xl">
              👥
            </div>
            <div>
              <p className="text-sm text-[#8888a4]">Total de Usuários</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-6 transition-all hover:border-green-500/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15 text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-[#8888a4]">Usuários Ativos</p>
              <p className="text-2xl font-bold text-white">
                {stats.activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-6 transition-all hover:border-purple-500/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-2xl">
              📄
            </div>
            <div>
              <p className="text-sm text-[#8888a4]">Manuais Cadastrados</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalManuais}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de visitantes */}
      <div className="mt-6 sm:mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          👁️ Visualizações do Site
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="card-glass rounded-2xl p-6 transition-all hover:border-yellow-500/30">
            <div className="text-center">
              <p className="text-sm text-[#8888a4]">Hoje</p>
              <p className="mt-1 text-3xl font-bold text-yellow-400">
                {views.today}
              </p>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-6 transition-all hover:border-orange-500/30">
            <div className="text-center">
              <p className="text-sm text-[#8888a4]">Últimos 7 dias</p>
              <p className="mt-1 text-3xl font-bold text-orange-400">
                {views.week}
              </p>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-6 transition-all hover:border-cyan-500/30">
            <div className="text-center">
              <p className="text-sm text-[#8888a4]">Este mês</p>
              <p className="mt-1 text-3xl font-bold text-cyan-400">
                {views.month}
              </p>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-6 transition-all hover:border-pink-500/30">
            <div className="text-center">
              <p className="text-sm text-[#8888a4]">Total</p>
              <p className="mt-1 text-3xl font-bold text-pink-400">
                {views.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
