"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface MotorcycleData {
  model: string;
  leftVolume: string;
  rightVolume: string;
  fluidLevel?: string;
  recommendation: string;
  engineOil?: string;
}

const motorcycleDatabase: MotorcycleData[] = [
  { model: "honda cb 300", leftVolume: "323 ml", rightVolume: "323 ml", fluidLevel: "128 mm", recommendation: "Utilize óleo de suspensão SAE 10W para melhor desempenho.", engineOil: "1.5 L" },
  { model: "honda cg 160", leftVolume: "150 ml", rightVolume: "250 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W para este modelo.", engineOil: "1 L" },
  { model: "honda falcon 400", leftVolume: "529 ± 2,5 ml", rightVolume: "529 ± 2,5 ml", fluidLevel: "135 mm", recommendation: "Utilize óleo de suspensão SAE 10W para melhor desempenho.", engineOil: "1.8 L" },
  { model: "honda xre 190", leftVolume: "176 ± 2,5 ml", rightVolume: "176 ± 2,5 ml", fluidLevel: "184 mm", recommendation: "Para suspensões mais macias, pode-se usar óleo SAE 10W.", engineOil: "1 L" },
  { model: "honda crf 230", leftVolume: "380 ± 2,5 ml", rightVolume: "380 ± 2,5 ml", fluidLevel: "144 mm", recommendation: "Óleo de suspensão SAE 10W é o mais indicado para este modelo.", engineOil: "1 L" },
  { model: "honda xre 300", leftVolume: "547 ± 2,5 ml", rightVolume: "547 ± 2,5 ml", fluidLevel: "143 mm", recommendation: "Óleo de suspensão SAE 10W é o mais indicado para este modelo.", engineOil: "1.5 L" },
  { model: "honda pcx 150", leftVolume: "116 ± 2,5 ml", rightVolume: "116 ± 2,5 ml", fluidLevel: "81 mm", recommendation: "Óleo de suspensão SAE 10W é o mais indicado para este modelo.", engineOil: "0.8 L" },
  { model: "honda cb twister 250", leftVolume: "306 ± 2,5 ml", rightVolume: "306 ± 2,5 ml", fluidLevel: "150 mm", recommendation: "Para melhor desempenho em estradas irregulares, use óleo SAE 10W.", engineOil: "1.5 L" },
  { model: "honda cb twister 300", leftVolume: "464 ± 2,5 ml", rightVolume: "306 ± 2,5 ml", fluidLevel: "114", recommendation: "Para melhor desempenho em estradas irregulares, use óleo SAE 10W.", engineOil: "1.5 L" },
  { model: "honda biz 125", leftVolume: "60 ml", rightVolume: "60 ml", fluidLevel: "98 mm", recommendation: "Use óleo de suspensão SAE 10W neste modelo.", engineOil: "0.8 L" },
  { model: "honda crf 250", leftVolume: "637 ± 2,5 ml", rightVolume: "637 ± 2,5 ml", fluidLevel: "94 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.5 L" },
  { model: "honda pop 110", leftVolume: "58 ± 1 ml", rightVolume: "58 ± 1 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.8 L" },
  { model: "honda pop 100", leftVolume: "58 ± 1 ml", rightVolume: "58 ± 1 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.8 L" },
  { model: "honda cg 160 2016", leftVolume: "139 ± 2,5 ml", rightVolume: "139 ± 2,5 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda cg 160 2025", leftVolume: "182 ± 2,5 ml", rightVolume: "198 ± 2,5 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda bros 150 e 160", leftVolume: "180 ± 2,5 ml", rightVolume: "180 ± 2,5 ml", fluidLevel: "182 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda bros 125 2013", leftVolume: "176 ± 2,5 ml", rightVolume: "176 ± 2,5 ml", fluidLevel: "184 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda bros 160", leftVolume: "180 ± 2,5 ml", rightVolume: "180 ± 2,5 ml", fluidLevel: "182 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda lead 110", leftVolume: "89 ± 1,0 ml", rightVolume: "89 ± 1,0 ml", fluidLevel: "52 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.8 L" },
  { model: "honda adv", leftVolume: "127 ± 2,5 ml", rightVolume: "127 ± 2,5 ml", fluidLevel: "65 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda elite 125", leftVolume: "85 ± 2,5 ml", rightVolume: "85 ± 2,5 ml", fluidLevel: "60 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.8 L" },
  { model: "honda xre sahara 300", leftVolume: "570 ± 2,5 ml", rightVolume: "570 ± 2,5 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.5 L" },
  { model: "honda xr 400", leftVolume: "570 ml", rightVolume: "570 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.8 L" },
  { model: "honda tornado 300", leftVolume: "570 ± 2,5 ml", rightVolume: "570 ± 2,5 ml", fluidLevel: "144 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.5 L" },
  { model: "honda tornado 250", leftVolume: "586 ± 2,5 ml", rightVolume: "586 ± 2,5 ml", fluidLevel: "128 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.5 L" },
  { model: "honda xr 200", leftVolume: "312 ml", rightVolume: "312 ml", fluidLevel: "127 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda xlx 350r", leftVolume: "418 ml", rightVolume: "418 ml", fluidLevel: "130mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda xlx 250r", leftVolume: "300 ml", rightVolume: "300 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda xlr 125", leftVolume: "170 ml", rightVolume: "170 ml", fluidLevel: "194 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda xl 700 transalp", leftVolume: "598 ± 2,5 ml", rightVolume: "598 ± 2,5 ml", fluidLevel: "104 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "2.3 L" },
  { model: "honda xl 250r", leftVolume: "300 ml", rightVolume: "300 ml", fluidLevel: "173 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda xl 125", leftVolume: "155 ml", rightVolume: "155 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda x adv", leftVolume: "596 ml", rightVolume: "586 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "3.4 L" },
  { model: "honda vt 600 shadow", leftVolume: "449 ml", rightVolume: "449 ml", fluidLevel: "111 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda shadow 750", leftVolume: "487 ± 2,5 ml", rightVolume: "487 ± 2,5 ml", fluidLevel: "100 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda sh 300i", leftVolume: "149 ± 2,5 ml", rightVolume: "149 ± 2,5 ml", fluidLevel: "90 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1.4 L" },
  { model: "honda sh 150i", leftVolume: "100 ± 1,0 ml", rightVolume: "100 ± 1,0 ml", fluidLevel: "106 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.9 L" },
  { model: "honda pcx 160 2023", leftVolume: "135 ± 2,5 ml", rightVolume: "135 ± 2,5 ml", fluidLevel: "52 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "0.8 ml" },
  { model: "honda nc 750x", leftVolume: "435 ± 2,5 ml", rightVolume: "435 ± 2,5 ml", fluidLevel: "135 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "3.4 L" },
  { model: "honda nc 700x", leftVolume: "514 ± 2,5 ml", rightVolume: "514 ± 2,5 ml", fluidLevel: "104 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "3.4 L" },
  { model: "honda fan 125", leftVolume: "74,5 ± 2,5 ml", rightVolume: "74,5± 2,5 ml", fluidLevel: "178 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "1 L" },
  { model: "honda cb 500f", leftVolume: "460 ± 2,5 ml", rightVolume: "460 ± 2,5 ml", fluidLevel: "140 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "2.7 L" },
  { model: "honda cb 500x", leftVolume: "451 ± 2,5 ml", rightVolume: "451± 2,5 ml", fluidLevel: "160 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "2.7 L" },
  { model: "honda cb 600 hornet", leftVolume: "494 ± 2,5 ml", rightVolume: "494 ± 2,5 ml", fluidLevel: "70 ml", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "2.8" },
  { model: "honda cbr 650f", leftVolume: "505 ± 2,5 ml", rightVolume: "505± 2,5 ml", fluidLevel: "140 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "2.9 L" },
  { model: "honda cbr 650fa", leftVolume: "482 ± 2,5 ml", rightVolume: "482± 2,5 ml", fluidLevel: "128 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
  { model: "honda cbr 650x", leftVolume: "505 ± 2,5 ml", rightVolume: "505 ± 2,5 ml", fluidLevel: "140 mm", recommendation: "Recomenda-se óleo de suspensão SAE 10W.", engineOil: "" },
];

function findMotorcycle(searchTerm: string): MotorcycleData | undefined {
  return motorcycleDatabase.find(
    (moto) => moto.model.includes(searchTerm) || searchTerm.includes(moto.model)
  );
}

function formatModelName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function OleoSuspensaoPage() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<MotorcycleData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const term = search.toLowerCase().trim();
    if (!term) return;

    const found = findMotorcycle(term);
    setSearched(true);
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a14]">
      <Sidebar />
      <main className="flex-1 px-4 pb-10 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Consulta Óleo de <span className="text-[#6c5ce7]">Suspensão</span>
            </h1>
            <p className="mt-2 text-sm text-[#8888a4]">
              Busque o modelo da motocicleta para verificar o volume de óleo da suspensão
            </p>
          </div>

          {/* Search Box */}
          <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a] p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Buscar Modelo</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Digite o modelo (ex: Honda CB 500F, Honda XRE 300)"
                className="flex-1 rounded-xl border border-[#2a2a3e] bg-[#0a0a14] px-4 py-3 text-sm text-white placeholder-[#555570] outline-none transition-colors focus:border-[#6c5ce7]/50"
              />
              <button
                onClick={handleSearch}
                className="rounded-xl bg-[#6c5ce7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6]"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Results */}
          {searched && result && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#2a2a3e] bg-[#12121a] p-6">
                <h3 className="mb-4 border-b border-[#2a2a3e] pb-3 text-lg font-semibold text-[#6c5ce7]">
                  Modelo: {formatModelName(result.model)}
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Left Volume */}
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a14] p-4 text-center">
                    <h4 className="mb-2 text-sm font-medium text-[#8888a4]">Suspensão Esquerda</h4>
                    <p className="text-xl font-bold text-[#6c5ce7]">{result.leftVolume}</p>
                  </div>

                  {/* Right Volume */}
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a14] p-4 text-center">
                    <h4 className="mb-2 text-sm font-medium text-[#8888a4]">Suspensão Direita</h4>
                    <p className="text-xl font-bold text-[#6c5ce7]">{result.rightVolume}</p>
                  </div>

                  {/* Fluid Level */}
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a14] p-4 text-center">
                    <h4 className="mb-2 text-sm font-medium text-[#8888a4]">Nível de Fluido</h4>
                    <p className="text-xl font-bold text-[#6c5ce7]">{result.fluidLevel || "Não informado"}</p>
                  </div>
                </div>

                {/* Engine Oil */}
                {result.engineOil && (
                  <div className="mt-4 rounded-xl border border-[#6c5ce7]/20 bg-[#6c5ce7]/5 p-4 text-center">
                    <h4 className="mb-2 text-sm font-medium text-[#8888a4]">Óleo do Motor</h4>
                    <p className="text-xl font-bold text-[#6c5ce7]">{result.engineOil}</p>
                  </div>
                )}

                {/* Recommendation */}
                <div className="mt-4 rounded-xl border-l-4 border-[#6c5ce7] bg-[#6c5ce7]/5 p-4">
                  <p className="text-sm text-[#c0c0d0]">
                    <span className="font-semibold text-white">Recomendação:</span> {result.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {searched && notFound && (
            <div className="mt-6 rounded-2xl border border-[#2a2a3e] bg-[#12121a] p-6">
              <h3 className="mb-3 text-lg font-semibold text-[#6c5ce7]">
                Modelo: {formatModelName(search)}
              </h3>
              <p className="mb-3 font-semibold text-yellow-400">Modelo não encontrado em nosso banco de dados.</p>
              <p className="mb-2 text-sm text-[#8888a4]">Sugestões:</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-[#8888a4]">
                <li>Verifique a ortografia do modelo.</li>
                <li>Tente buscar pela marca e modelo (ex: Honda CB500F).</li>
                <li>Consulte o manual do proprietário para informações precisas.</li>
              </ul>
            </div>
          )}

          {/* Info */}
          <p className="mt-6 text-center text-xs text-[#555570]">
            As informações são extraídas dos manuais de serviço oficiais de cada modelo.
          </p>
        </div>
      </main>
    </div>
  );
}
