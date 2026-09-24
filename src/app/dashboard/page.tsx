"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InstallButton from "@/components/InstallButton";

type IconProps = { className?: string };

/* Conjunto unificado: viewBox 24, traço 1.75, pontas arredondadas.
   O tamanho vem do className, então dá pra ajustar sem mexer no SVG. */

function BookIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 2.5H20v19H6.5A2.5 2.5 0 0 1 4 19V5a2.5 2.5 0 0 1 2.5-2.5Z" />
      <path d="M4 17.2a2.5 2.5 0 0 1 2.5-1.2H20" />
      <path d="M8 7h7" />
      <path d="M8 10.5h4.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.6C8.2 19.1 4.5 15.6 4.5 11.2V5.7l7.5-3 7.5 3v5.5c0 4.4-3.7 7.9-7.5 10.4Z" />
      <path d="m8.8 11.6 2.2 2.2 4.4-4.4" />
    </svg>
  );
}

function CrownIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.2 17.5 1-9.4 4.6 3.9L12 5.2l3.2 6.8 4.6-3.9 1 9.4Z" />
      <path d="M4.6 21h14.8" />
    </svg>
  );
}

function DownloadIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v11.5" />
      <path d="m7.6 10.4 4.4 4.4 4.4-4.4" />
      <path d="M4 16.8v2.4A1.8 1.8 0 0 0 5.8 21h12.4a1.8 1.8 0 0 0 1.8-1.8v-2.4" />
    </svg>
  );
}

function WrenchIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function SparklesIcon({ className = "h-[22px] w-[22px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.4 13.6 8.6a2 2 0 0 0 1.3 1.3l5.2 1.6-5.2 1.6a2 2 0 0 0-1.3 1.3L12 19.6l-1.6-5.2a2 2 0 0 0-1.3-1.3L3.9 11.5l5.2-1.6a2 2 0 0 0 1.3-1.3Z" />
      <path d="M18.8 3.6v2.8" />
      <path d="M17.4 5h2.8" />
      <path d="M5.4 17.6v2.4" />
      <path d="M4.2 18.8h2.4" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 12h14" />
      <path d="m12.5 6 6 6-6 6" />
    </svg>
  );
}

function ChatIcon({ className = "h-[26px] w-[26px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.6A2.4 2.4 0 0 1 18.1 17H8.2L3.5 21V5.9A2.4 2.4 0 0 1 5.9 3.5h12.2a2.4 2.4 0 0 1 2.4 2.4Z" />
      <path d="M7.8 8.6h8.4" />
      <path d="M7.8 12.1h5.2" />
    </svg>
  );
}

function MotorcycleIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="5.4" cy="16.6" r="3.4" />
      <circle cx="18.6" cy="16.6" r="3.4" />
      <path d="M8.8 16.6h5.6" />
      <path d="m6.9 13.4 2.2-4.3h3.9l3 4.4" />
      <path d="M11.6 9.1V7.4h2.2" />
      <path d="M16.1 7.4h2.3l1.3 3.6" />
    </svg>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("Olá");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");

    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "Usuário";

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2h-[300px] w-full max-w-[600px] -translate-x-1/2 rounded-full bg-[#ff6a1a]/[0.07] blur-[100px]" />

      {/* Header */}
      <div className="relative mb-8 sm:mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#9aa1ac]">
              <SparklesIcon />
              <span>{currentTime}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-[#ff6a1a] to-[#ff8c3f] bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>
            <p className="mt-2 text-[#9aa1ac]">
              Bem-vindo ao seu painel de manuais de motocicletas
            </p>
          </div>
          <Link
            href="/manuais"
            className="group flex items-center gap-2 rounded-xl bg-[#ff6a1a] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6a1a]/20 transition-all hover:bg-[#ff8c3f] hover:shadow-[#ff6a1a]/30 active:scale-95"
          >
            <BookIcon />
            Ver Manuais
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Assistente IA — CTA de destaque */}
      <Link
        href="/assistente"
        className="group relative mb-8 flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-[#ff6a1a]/30 bg-gradient-to-br from-[#ff6a1a]/20 via-[#1e2127] to-[#111317] p-6 transition-all hover:border-[#ff6a1a]/50 hover:shadow-xl hover:shadow-[#ff6a1a]/10 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ff6a1a]/20 blur-3xl transition-all group-hover:bg-[#ff6a1a]/30" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6a1a] to-[#ff8c3f] text-white shadow-lg shadow-[#ff6a1a]/30">
            <ChatIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">Pergunte pro Assistente IA</h2>
            <p className="mt-1 text-sm text-[#c4c4de]">
              Descreva o problema com suas palavras — o assistente busca a resposta nos manuais pra você.
            </p>
          </div>
        </div>
        <span className="relative flex shrink-0 items-center gap-2 self-stretch rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#111317] shadow-lg transition-all group-hover:bg-[#f0f0ff] sm:self-auto">
          Perguntar agora
          <ArrowRightIcon />
        </span>
      </Link>

      {/* Cards de status */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {/* Card Manuais */}
        <Link href="/manuais" className="group relative overflow-hidden rounded-2xl border border-[#33373f] bg-gradient-to-br from-[#1e2127] to-[#111317] p-6 transition-all duration-300 hover:border-[#ff6a1a]/40 hover:shadow-xl hover:shadow-[#ff6a1a]/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-[#ff6a1a]/10 blur-2xl transition-all group-hover:bg-[#ff6a1a]/20" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6a1a] to-[#ff8c3f] text-white shadow-lg shadow-[#ff6a1a]/25">
              <BookIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Manuais de Serviço</h3>
            <p className="mt-1 text-sm text-[#9aa1ac]">
              Biblioteca completa com manuais de diversas marcas e modelos
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#ff6a1a] transition-colors group-hover:text-[#ff8c3f]">
              Acessar biblioteca
              <ArrowRightIcon />
            </div>
          </div>
        </Link>

        {/* Card Status */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#33373f] bg-gradient-to-br from-[#1e2127] to-[#111317] p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-green-500/10 blur-2xl transition-all group-hover:bg-green-500/20" />
          <div className="relative">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${session?.user?.active ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/25 text-white" : "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25 text-white"}`}>
              <ShieldCheckIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Status da Conta</h3>
            <p className="mt-1 text-sm text-[#9aa1ac]">
              Sua conta está{" "}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  session?.user?.active
                    ? "bg-green-500/15 text-green-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${session?.user?.active ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                {session?.user?.active ? "Ativa" : "Inativa"}
              </span>
            </p>
            {session?.user?.active && (
              <div className="mt-4 flex items-center gap-2 text-sm text-green-400/70">
                <ShieldCheckIcon />
                <span>Acesso verificado</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Plano */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#33373f] bg-gradient-to-br from-[#1e2127] to-[#111317] p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25">
              <CrownIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Seu Plano</h3>
            <p className="mt-1 text-sm text-[#9aa1ac]">
              {session?.user?.isPremium
                ? "Acesso liberado a todos os recursos"
                : "Modo demo — libere o acesso completo"}
            </p>
            {session?.user?.isPremium ? (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                <CrownIcon />
                Premium
              </div>
            ) : (
              <Link
                href="/conta-inativa"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff6a1a] to-[#ff8c3f] px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#ff6a1a]/25 transition-all hover:shadow-[#ff6a1a]/40"
              >
                🚀 Liberar acesso
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <MotorcycleIcon />
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Honda", color: "from-red-600 to-red-700", href: "/manuais" },
            { label: "Yamaha", color: "from-blue-600 to-blue-700", href: "/manuais" },
            { label: "Kawasaki", color: "from-green-600 to-green-700", href: "/manuais" },
            { label: "Todas", color: "from-[#ff6a1a] to-[#ff8c3f]", href: "/manuais" },
          ].map((brand) => (
            <Link
              key={brand.label}
              href={brand.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-[#33373f] bg-[#111317] p-4 transition-all hover:border-[#ff6a1a]/30 hover:bg-[#1e2127] active:scale-95"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${brand.color} text-white shadow-md`}>
                <MotorcycleIcon />
              </div>
              <span className="text-sm font-medium text-[#9aa1ac] group-hover:text-white">
                {brand.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Avisos rápidos */}
      <div className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Instalar App */}
        <div className="min-w-[240px] flex-1 rounded-2xl border border-[#ff6a1a]/20 bg-gradient-to-br from-[#ff6a1a]/[0.08] to-transparent p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6a1a]/15 text-[#ff6a1a]">
            <DownloadIcon />
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">Instale o App</h3>
          <p className="mt-1 text-xs text-[#9aa1ac]">
            Acesso rápido direto da tela do seu celular.
          </p>
          <div className="mt-3">
            <InstallButton />
          </div>
        </div>

        {/* Novos manuais */}
        <div className="min-w-[240px] flex-1 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <SparklesIcon />
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">Novos manuais toda semana!</h3>
          <p className="mt-1 text-xs text-[#9aa1ac]">
            Biblioteca em constante atualização. <strong className="text-emerald-400">Fique de olho!</strong>
          </p>
        </div>

        {/* Grupo WhatsApp */}
        <a
          href="https://chat.whatsapp.com/Lihae7qmtS7GfAoRmMIWo4"
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[240px] flex-1 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/[0.08] to-transparent p-4 transition-all hover:border-green-500/40"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">Grupo de Suporte</h3>
          <p className="mt-1 text-xs text-[#9aa1ac]">
            Dicas e troca de experiências com outros mecânicos.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-600/20 px-2.5 py-1 text-xs font-bold text-green-400">
            Entrar no Grupo →
          </span>
        </a>
      </div>

      {/* Cursos Joab Motos */}
      <a
        href="https://wa.me/5575998772223?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20os%20cursos%20da%20Joab%20Motos"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 block overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] to-transparent p-5 transition-all hover:border-red-500/40 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex shrink-0 gap-3">
            <img
              src="/promo/joab-motos-curso-mecanica.jpg"
              alt="Curso de Formação e Mecânica de Motocicleta - Joab Motos"
              className="h-44 w-36 rounded-xl object-cover object-top shadow-lg sm:h-52 sm:w-44"
            />
            <img
              src="/promo/joab-motos-curso-injecao.jpg"
              alt="Curso de Injeção Eletrônica - Joab Motos"
              className="h-44 w-36 rounded-xl object-cover object-top shadow-lg sm:h-52 sm:w-44"
            />
          </div>
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-red-500/15 px-2.5 py-0.5 text-[11px] font-bold text-red-400">
              Inscrições abertas
            </span>
            <h3 className="mt-2 font-bold text-white">Cursos de Mecânica com a Joab Motos</h3>
            <p className="mt-1 text-sm text-[#9aa1ac]">
              Formação e Mecânica de Motocicleta e Injeção Eletrônica. Turmas presenciais com o instrutor Joab Motos.
            </p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-bold text-red-400 group-hover:bg-red-600/30">
              Falar no WhatsApp →
            </span>
          </div>
        </div>
      </a>

      {/* Mensagem para admin */}
      {session?.user?.role === "ADMIN" && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.08] to-transparent p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25">
              <WrenchIcon />
            </div>
            <div>
              <h3 className="text-lg font-bold text-orange-400">
                Painel Administrativo
              </h3>
              <p className="mt-1 text-sm text-[#9aa1ac]">
                Você é um administrador. Gerencie manuais e usuários pelo painel admin.
              </p>
              <Link
                href="/admin"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 active:scale-95"
              >
                <WrenchIcon />
                Ir para o Admin
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
