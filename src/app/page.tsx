import Link from "next/link";
import Logo from "@/components/Logo";

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

        {/* Features */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 pb-16 sm:mt-20 sm:grid-cols-2 sm:gap-6 sm:pb-20 lg:grid-cols-3">
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Biblioteca Completa</h3>
            <p className="text-[#8888a4]">
              Manuais de serviço de diversas marcas e modelos, sempre
              atualizados.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Download em PDF</h3>
            <p className="text-[#8888a4]">
              Baixe os manuais em formato PDF e consulte a qualquer momento,
              mesmo offline.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Busca Inteligente</h3>
            <p className="text-[#8888a4]">
              Filtre por marca e modelo para encontrar rapidamente o manual que
              precisa.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M8 8h8l2 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L8 8z"/><path d="M10 12h4"/><path d="M10 15h4"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Óleo de Suspensão</h3>
            <p className="text-[#8888a4]">
              Consulte o volume de óleo de suspensão, nível de fluido e óleo do motor por modelo.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="9" cy="11" r="1" fill="#a78bfa"/><circle cx="15" cy="11" r="1" fill="#a78bfa"/><circle cx="9" cy="15" r="1" fill="#a78bfa"/><circle cx="15" cy="15" r="1" fill="#a78bfa"/><circle cx="12" cy="19" r="1" fill="#a78bfa"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Calculadora de Pastilha de Válvulas</h3>
            <p className="text-[#8888a4]">
              Calcule a folga de pastilha de válvulas para XRE 300, CB 300 e outros modelos.
            </p>
          </div>
          <div className="card-glass rounded-2xl p-6 text-left transition-all hover:border-[#6c5ce7]/30 hover:shadow-lg hover:shadow-[#6c5ce7]/5 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a78bfa]/10 ring-1 ring-[#6c5ce7]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Diagnóstico Eletrônico</h3>
            <p className="text-[#8888a4]">
              Check list completo de injeção eletrônica Honda: códigos de falha, padrões de teste e localizações.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
