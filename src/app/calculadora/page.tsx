"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AccessBlock from "@/components/AccessBlock";
import { useAccess } from "@/hooks/useAccess";

export default function CalculadoraPage() {
  const [folgaEncontrada, setFolgaEncontrada] = useState("");
  const [pastilha, setPastilha] = useState("");
  const [manual, setManual] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { isPremium } = useAccess();

  function calcular() {
    setError("");
    setResultado(null);

    if (!folgaEncontrada || !pastilha || !manual) {
      setError("Preencha todos os campos antes de calcular");
      return;
    }

    const fe = parseFloat(folgaEncontrada);
    const pa = parseFloat(pastilha);
    const ma = parseFloat(manual);

    if (isNaN(fe) || isNaN(pa) || isNaN(ma)) {
      setError("Informe apenas valores numéricos");
      return;
    }

    const result = fe + pa - ma;
    setResultado(result.toFixed(2));
  }

  function limpar() {
    setFolgaEncontrada("");
    setPastilha("");
    setManual("");
    setResultado(null);
    setError("");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />

      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Calculadora de <span className="text-[#6c5ce7]">Pastilha de Válvulas</span>
            </h1>
            <p className="mt-2 text-sm text-[#8888a4]">
              Calcule a folga de pastilha de válvulas
            </p>
          </div>

          {/* Calculator Card */}
          <div className="card-glass rounded-2xl p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="16" y2="14" />
                  <line x1="8" y1="18" x2="10" y2="18" />
                  <line x1="14" y1="18" x2="16" y2="18" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Folga de Pastilha</h2>
                <p className="text-xs text-[#8888a4]">Resultado = Folga Encontrada + Pastilha − Manual</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Folga Encontrada */}
              <div>
                <label htmlFor="folga" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Folga Encontrada
                </label>
                <input
                  id="folga"
                  type="number"
                  step="any"
                  value={folgaEncontrada}
                  onChange={(e) => setFolgaEncontrada(e.target.value)}
                  className="input-dark"
                  placeholder="Ex: 0.30"
                />
              </div>

              {/* Pastilha */}
              <div>
                <label htmlFor="pastilha" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Pastilha Atual
                </label>
                <input
                  id="pastilha"
                  type="number"
                  step="any"
                  value={pastilha}
                  onChange={(e) => setPastilha(e.target.value)}
                  className="input-dark"
                  placeholder="Ex: 3.50"
                />
              </div>

              {/* Manual */}
              <div>
                <label htmlFor="manual" className="mb-1.5 block text-sm font-medium text-[#8888a4]">
                  Folga do Manual
                </label>
                <input
                  id="manual"
                  type="number"
                  step="any"
                  value={manual}
                  onChange={(e) => setManual(e.target.value)}
                  className="input-dark"
                  placeholder="Ex: 2.00"
                />
              </div>

              {/* Resultado */}
              {resultado !== null && (
                <div className="relative rounded-xl border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 p-4">
                  {!isPremium && (
                    <AccessBlock
                      title="🔒 Resultado bloqueado"
                      message="Libere o acesso para ver o cálculo"
                    />
                  )}
                  <p className="text-sm font-medium text-[#8888a4]">Resultado</p>
                  <p className={`mt-1 text-3xl font-extrabold text-[#6c5ce7] ${!isPremium ? "blur-md select-none" : ""}`}>{resultado}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button onClick={calcular} className="btn-primary flex-1">
                  Calcular
                </button>
                <button onClick={limpar} className="btn-outline flex-1">
                  Limpar
                </button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 card-glass rounded-2xl p-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#555570]">Como usar</h3>
            <ul className="space-y-2 text-sm text-[#8888a4]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#6c5ce7]">1.</span>
                Meça a folga atual encontrada na pastilha
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#6c5ce7]">2.</span>
                Informe a espessura atual da pastilha
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#6c5ce7]">3.</span>
                Insira o valor de folga especificado no manual
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#6c5ce7]">4.</span>
                O resultado indica a medida de desgaste da pastilha
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
