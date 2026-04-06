"use client";

import Link from "next/link";
import { PUSHINPAY_CHECKOUT_URL } from "@/lib/pushinpay";

export default function ContaInativaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(108,92,231,0.1),_transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="card-glass rounded-2xl p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6c5ce7]/15 text-4xl">
            🔒
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">
            Conta Inativa
          </h1>
          <p className="mb-6 text-[#8888a4]">
            Sua conta ainda não foi ativada. Efetue o pagamento para liberar seu acesso.
          </p>

          {/* Plan info */}
          <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d68f]">
              🔥 Oferta Especial
            </span>
            <div className="mt-2">
              <span className="text-sm text-[#8888a4] line-through">R$ 49,90</span>
              <span className="ml-2 text-2xl font-extrabold text-[#00d68f]">R$ 34,90</span>
            </div>
            <p className="mt-1 text-xs text-[#8888a4]">Acesso total • Pagamento único</p>
          </div>

          {PUSHINPAY_CHECKOUT_URL ? (
            <a
              href={PUSHINPAY_CHECKOUT_URL}
              className="btn-primary mb-4 inline-block w-full text-center"
            >
              Pagar com PIX - R$ 34,90
            </a>
          ) : (
            <p className="mb-4 text-sm text-yellow-400">
              Link de pagamento temporariamente indisponível. Tente novamente mais tarde.
            </p>
          )}

          <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-3">
            <p className="text-xs text-[#8888a4]">
              ⚡ Você será redirecionado para a página de pagamento PIX.
              Seu acesso é liberado automaticamente após a confirmação.
            </p>
          </div>

          <Link
            href="/login"
            className="btn-outline inline-block px-6 py-2.5"
          >
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
