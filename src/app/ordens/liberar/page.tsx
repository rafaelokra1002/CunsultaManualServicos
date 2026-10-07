"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { trackFb } from "@/lib/fbpixel";

// Upgrade de quem já tem acesso: compra só o adicional da Ordem de Serviço.
const PRECO = "27,00";

export default function LiberarOrdens() {
  const router = useRouter();
  const { data: session } = useSession();
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!paymentId) return;
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/status?id=${paymentId}`);
        const d = await res.json();
        if (d.status === "approved") {
          clearInterval(pollRef.current!);
          if (!firedRef.current) {
            firedRef.current = true;
            trackFb("Purchase", { value: 27.0, currency: "BRL" }, paymentId);
          }
          setOk(true);
          setTimeout(() => router.push("/ordens"), 1800);
        }
      } catch {
        // tenta de novo no próximo ciclo
      }
    }, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [paymentId, router]);

  async function gerarPix() {
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      setErro("Faça login novamente.");
      return;
    }
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, tipo: "ordens" }),
      });
      const d = await res.json();
      if (!res.ok) {
        setErro(d.error || "Erro ao gerar o PIX.");
        return;
      }
      setPixCode(d.pixCode || "");
      setPixQrCode(d.pixQrCode || "");
      setPaymentId(d.paymentId);
      trackFb("InitiateCheckout", { value: 27.0, currency: "BRL" });
    } catch {
      setErro("Erro ao gerar o PIX. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#16181c]">
      <Sidebar />

      <main className="flex-1 pb-8 pt-20 md:ml-64 md:pt-8">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Link href="/ordens" className="text-sm text-[#9aa1ac] hover:text-white">
            ← Voltar
          </Link>

          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            📋 Liberar Ordem de Serviço
          </h1>
          <p className="mt-2 text-sm text-[#9aa1ac]">
            Adicional único de R$ {PRECO}. Sem mensalidade, igual ao resto da plataforma.
          </p>

          {ok ? (
            <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
              <p className="text-lg font-semibold text-green-400">Pagamento confirmado!</p>
              <p className="mt-1 text-sm text-[#9aa1ac]">Abrindo suas ordens...</p>
            </div>
          ) : (
            <>
              <div className="mt-6 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
                <ul className="space-y-3 text-sm text-[#f3f0ea]">
                  <li className="flex gap-3">
                    <span className="text-[#37c07a]">✓</span>
                    Ordem de serviço com o nome e o telefone da sua oficina
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#37c07a]">✓</span>
                    Laudo com a tabela de testes: o que mediu, o que era esperado e o
                    resultado
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#37c07a]">✓</span>
                    Serviços e peças com total calculado automaticamente
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#37c07a]">✓</span>
                    Gera PDF pelo celular para mandar no WhatsApp do cliente
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#37c07a]">✓</span>
                    Histórico por cliente, moto e placa
                  </li>
                </ul>

                <p className="mt-5 border-t border-[#33373f] pt-4 text-sm text-[#9aa1ac]">
                  O cliente leva um documento que mostra que você <b className="text-white">mediu</b>,
                  em vez de trocar peça no chute. É o que justifica sua mão de obra.
                </p>
              </div>

              {erro && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {erro}
                </div>
              )}

              {!pixCode ? (
                <button
                  onClick={gerarPix}
                  disabled={loading}
                  className="mt-5 w-full rounded-xl bg-[#ff6a1a] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#ff8c3f] disabled:opacity-50"
                >
                  {loading ? "Gerando PIX..." : `Liberar por R$ ${PRECO} no PIX`}
                </button>
              ) : (
                <div className="mt-5 rounded-2xl border border-[#2a2e35] bg-[#1e2127] p-5">
                  {pixQrCode && (
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-2xl bg-white p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pixQrCode} alt="QR Code PIX" className="h-48 w-48" />
                      </div>
                    </div>
                  )}
                  <label className="mb-1.5 block text-sm text-[#9aa1ac]">
                    Código PIX (copia e cola)
                  </label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={pixCode}
                      className="flex-1 rounded-xl border border-[#33373f] bg-[#111317] px-3 py-3 text-xs text-white"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pixCode);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 3000);
                      }}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                        copied ? "bg-[#37c07a]/20 text-[#37c07a]" : "bg-[#ff6a1a] text-white"
                      }`}
                    >
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#33373f] bg-[#111317] p-3">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
                    <div>
                      <p className="text-sm text-white">Aguardando pagamento...</p>
                      <p className="text-xs text-[#9aa1ac]">
                        Libera sozinho assim que o PIX cair
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
