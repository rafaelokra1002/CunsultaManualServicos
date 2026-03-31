"use client";

import { useEffect, useState } from "react";

interface Manual {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fileUrl: string;
  coverUrl?: string | null;
  createdAt: string;
}

export default function AdminManuaisPage() {
  const [manuais, setManuais] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function fetchManuais() {
    try {
      const res = await fetch("/api/manuais");
      if (res.ok) {
        setManuais(await res.json());
      }
    } catch (err) {
      console.error("Erro ao carregar manuais:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchManuais();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/manuais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          brand,
          model,
          year: parseInt(year),
          fileUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar manual");
        return;
      }

      setSuccess("Manual criado com sucesso!");
      setTitle("");
      setBrand("");
      setModel("");
      setYear("");
      setFileUrl("");
      setShowForm(false);
      fetchManuais();
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleCoverUpload(manualId: string, file: File) {
    setUploadingId(manualId);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("manualId", manualId);

      const res = await fetch("/api/upload-cover", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro no upload");
        return;
      }

      setSuccess("Capa atualizada!");
      fetchManuais();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Erro ao fazer upload da capa");
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            📄 Gerenciar Manuais
          </h1>
          <p className="mt-1 text-[#8888a4]">
            Adicione e gerencie os manuais do sistema
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={showForm ? "btn-outline text-sm" : "btn-primary text-sm"}
        >
          {showForm ? "Cancelar" : "+ Novo Manual"}
        </button>
      </div>

      {/* Mensagens */}
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

      {/* Formulário de criação */}
      {showForm && (
        <div className="card-glass mb-8 rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Novo Manual
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Título
                </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Manual de Serviço Honda CG 160" className="input-dark" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Marca
                </label>
                <input type="text" required value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Honda" className="input-dark" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Modelo
                </label>
                <input type="text" required value={model} onChange={(e) => setModel(e.target.value)} placeholder="CG 160" className="input-dark" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Ano
                </label>
                <input type="number" required value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024" min="1900" max="2030" className="input-dark" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                URL do PDF
              </label>
              <input type="url" required value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://exemplo.com/manual.pdf" className="input-dark" />
            </div>
            <button type="submit" disabled={formLoading} className="btn-primary text-sm">
              {formLoading ? "Salvando..." : "Salvar Manual"}
            </button>
          </form>
        </div>
      )}

      {/* Tabela de manuais */}
      <div className="card-glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-8 text-center text-[#8888a4]">
            Carregando manuais...
          </div>
        ) : manuais.length === 0 ? (
          <div className="p-8 text-center text-[#8888a4]">
            Nenhum manual cadastrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#2a2a3e] text-xs font-medium uppercase text-[#8888a4]">
                <tr>
                  <th className="px-4 py-4">Capa</th>
                  <th className="px-4 py-4">Título</th>
                  <th className="px-4 py-4">Marca</th>
                  <th className="px-4 py-4">Modelo</th>
                  <th className="px-4 py-4">Ano</th>
                  <th className="px-4 py-4">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a3e]">
                {manuais.map((manual) => (
                  <tr key={manual.id} className="transition-colors hover:bg-[#1a1a2e]">
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-1.5">
                        {manual.coverUrl ? (
                          <img
                            src={manual.coverUrl}
                            alt="Capa"
                            className="h-14 w-11 rounded-lg object-cover ring-1 ring-[#2a2a3e]"
                          />
                        ) : (
                          <div className="flex h-14 w-11 items-center justify-center rounded-lg bg-[#1a1a2e] ring-1 ring-[#2a2a3e]">
                            <span className="text-lg">📋</span>
                          </div>
                        )}
                        <label className="group/btn flex cursor-pointer items-center gap-1 rounded-md bg-[#6c5ce7]/10 px-2 py-1 text-[10px] font-medium text-[#6c5ce7] transition-all hover:bg-[#6c5ce7]/20">
                          {uploadingId === manual.id ? (
                            <span className="text-[#8888a4]">Enviando...</span>
                          ) : (
                            <>
                              📷 {manual.coverUrl ? "Trocar" : "Adicionar"}
                              <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleCoverUpload(manual.id, file);
                                  e.target.value = "";
                                }}
                              />
                            </>
                          )}
                        </label>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {manual.title}
                    </td>
                    <td className="px-4 py-3 text-[#8888a4]">{manual.brand}</td>
                    <td className="px-4 py-3 text-[#8888a4]">{manual.model}</td>
                    <td className="px-4 py-3 text-[#8888a4]">{manual.year}</td>
                    <td className="px-4 py-3">
                      <a
                        href={manual.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#6c5ce7] transition-colors hover:text-[#7c6ef7]"
                      >
                        Ver PDF
                      </a>
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
