import Link from "next/link";
import Logo from "@/components/Logo";
import InstallButton from "@/components/InstallButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,92,231,0.15),_transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(108,92,231,0.08),_transparent_40%)]" />

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12">
        <div className="flex items-center text-xl font-bold sm:text-2xl">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
          <Link href="/login" className="btn-outline px-4 py-2 text-center text-sm">
            Entrar
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2 text-center text-sm">
            Cadastrar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-14 text-center sm:px-6 md:pt-32">
        <div className="mb-5 inline-block rounded-full border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-4 py-1.5 text-xs font-semibold text-[#6c5ce7] sm:text-sm">
          Manuais de Serviço Profissionais
        </div>
        <h1 className="mb-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
          Todos os manuais de{" "}
          <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">motocicletas</span> em um só lugar
        </h1>
        <p className="mb-8 max-w-xl text-base text-[#8888a4] sm:text-lg">
          Acesse manuais de serviço originais de Honda, Yamaha, Kawasaki, BMW e
          muito mais. Baixe PDFs completos para manutenção profissional.
        </p>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/register" className="btn-primary px-6 py-3 text-base sm:px-8 sm:py-3.5 sm:text-lg">
            Começar agora
          </Link>
          <Link href="/login" className="btn-outline px-6 py-3 text-base sm:px-8 sm:py-3.5 sm:text-lg">
            Já tenho conta
          </Link>
        </div>

        <div className="mt-4">
          <InstallButton />
        </div>

        {/* Features */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 pb-16 sm:mt-20 sm:grid-cols-2 sm:gap-6 sm:pb-20 lg:grid-cols-5">
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              📚
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Biblioteca Completa</h3>
            <p className="text-[#8888a4]">
              Manuais de serviço de diversas marcas e modelos, sempre
              atualizados.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              ⬇️
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Download em PDF</h3>
            <p className="text-[#8888a4]">
              Baixe os manuais em formato PDF e consulte a qualquer momento,
              mesmo offline.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              🔍
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Busca Inteligente</h3>
            <p className="text-[#8888a4]">
              Filtre por marca e modelo para encontrar rapidamente o manual que
              precisa.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              🛢️
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Óleo de Suspensão</h3>
            <p className="text-[#8888a4]">
              Consulte o volume de óleo de suspensão, nível de fluido e óleo do motor por modelo.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-2xl">
              🧮
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Calculadora de Pastilha de Válvulas</h3>
            <p className="text-[#8888a4]">
              Calcule a folga de pastilha de válvulas para XRE 300, CB 300 e outros modelos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
