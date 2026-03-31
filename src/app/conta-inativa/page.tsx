import Link from "next/link";

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
          <p className="mb-8 text-[#8888a4]">
            Sua conta ainda não foi ativada pelo administrador. Após a
            confirmação do pagamento, seu acesso será liberado.
          </p>
          <Link
            href="/login"
            className="btn-primary inline-block px-6 py-2.5"
          >
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
