"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalManuais: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, manuaisRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/manuais"),
        ]);

        if (usersRes.ok && manuaisRes.ok) {
          const users = await usersRes.json();
          const manuais = await manuaisRes.json();

          setStats({
            totalUsers: users.length,
            activeUsers: users.filter((u: any) => u.active).length,
            totalManuais: manuais.length,
          });
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
    </div>
  );
}
