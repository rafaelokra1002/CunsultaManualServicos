"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { kiwifyCheckoutUrl } from "@/lib/kiwify";

export default function ContaInativaPage() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(108,92,231,0.1),_transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="card-glass rounded-2xl p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6c5ce7]/15 text-4xl">
            �
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">Liberar Acesso Completo</h1>
          <p className="mb-6 text-[#8888a4]">
            Pague uma única vez e libere todos os recursos da plataforma.
          </p>

          {/* Plan info */}
          <div className="mb-6 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d68f]">
              🔥 Oferta Especial
            </span>
            <div className="mt-2">
              <span className="text-sm text-[#8888a4] line-through">R$ 97,90</span>
              <span className="ml-2 text-2xl font-extrabold text-[#00d68f]">R$ 67</span>
            </div>
            <p className="mt-1 text-xs text-[#8888a4]">Acesso total • Pagamento único</p>
          </div>

          <a href={kiwifyCheckoutUrl(email)} className="btn-primary mb-3 block w-full">
            Pagar R$ 67 (PIX ou cartão)
          </a>
          <p className="mb-6 text-xs text-[#8888a4]">
            Use no pagamento o mesmo email da sua conta{email ? ` (${email})` : ""}. Assim que o pagamento
            for aprovado, o acesso é liberado: é só voltar ao painel.
          </p>

          <Link href="/dashboard" className="btn-outline inline-block px-6 py-2.5">
            Voltar ao painel
          </Link>
        </div>
      </div>
    </div>
  );
}
