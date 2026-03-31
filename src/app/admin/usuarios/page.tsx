"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function toggleActive(userId: string, currentActive: boolean) {
    setActionLoading(userId);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, active: !currentActive } : u
          )
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          👥 Gerenciar Usuários
        </h1>
        <p className="mt-1 text-[#8888a4]">
          Ative ou desative o acesso dos usuários
        </p>
      </div>

      {/* Tabela de usuários */}
      <div className="card-glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-8 text-center text-[#8888a4]">
            Carregando usuários...
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-[#8888a4]">
            Nenhum usuário cadastrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#2a2a3e] text-xs font-medium uppercase text-[#8888a4]">
                <tr>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Cadastro</th>
                  <th className="px-6 py-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a3e]">
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-[#1a1a2e]">
                    <td className="px-6 py-4 font-medium text-white">
                      {user.nome}
                    </td>
                    <td className="px-6 py-4 text-[#8888a4]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          user.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${user.active ? "bg-green-400" : "bg-gray-400"}`} />
                        {user.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8888a4]">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4">
                      {user.role !== "ADMIN" && (
                        <button
                          onClick={() => toggleActive(user.id, user.active)}
                          disabled={actionLoading === user.id}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50 ${
                            user.active
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }`}
                        >
                          {actionLoading === user.id
                            ? "..."
                            : user.active
                            ? "Desativar"
                            : "Ativar"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
