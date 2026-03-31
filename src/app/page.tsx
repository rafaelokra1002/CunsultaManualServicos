import Link from "next/link";
import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,92,231,0.15),_transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(108,92,231,0.08),_transparent_40%)]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center text-2xl font-bold">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="btn-outline px-4 py-2 text-sm">
            Entrar
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2 text-sm">
            Cadastrar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-20 text-center md:pt-32">
        <div className="mb-6 inline-block rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-1.5 text-sm font-semibold text-[#6c5ce7]">
          Manuais de Serviço Profissionais
        </div>
        <h1 className="mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Todos os manuais de{" "}
          <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">motocicletas</span> em um só lugar
        </h1>
        <p className="mb-10 max-w-xl text-lg text-[#8888a4]">
          Acesse manuais de serviço originais de Honda, Yamaha, Kawasaki, BMW e
          muito mais. Baixe PDFs completos para manutenção profissional.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="btn-primary px-8 py-3.5 text-lg">
            Começar agora
          </Link>
          <Link href="/login" className="btn-outline px-8 py-3.5 text-lg">
            Já tenho conta
          </Link>
        </div>

        {/* Features */}
        <div className="mt-28 grid w-full max-w-5xl grid-cols-1 gap-6 pb-20 md:grid-cols-3">
          <div className="card-glass rounded-2xl p-8 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              📚
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Biblioteca Completa</h3>
            <p className="text-[#8888a4]">
              Manuais de serviço de diversas marcas e modelos, sempre
              atualizados.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-8 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              ⬇️
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Download em PDF</h3>
            <p className="text-[#8888a4]">
              Baixe os manuais em formato PDF e consulte a qualquer momento,
              mesmo offline.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-8 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              🔍
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Busca Inteligente</h3>
            <p className="text-[#8888a4]">
              Filtre por marca e modelo para encontrar rapidamente o manual que
              precisa.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
