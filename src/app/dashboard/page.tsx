"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InstallButton from "@/components/InstallButton";

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h4" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MotorcycleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M9 17h6" />
      <path d="m7 14 2-5h4l3 5" />
      <path d="M11 9V7h2" />
      <path d="M16 7h2l1 3" />
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
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#6c5ce7]/[0.07] blur-[100px]" />

      {/* Header */}
      <div className="relative mb-8 sm:mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#8888a4]">
              <SparklesIcon />
              <span>{currentTime}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>
            <p className="mt-2 text-[#8888a4]">
              Bem-vindo ao seu painel de manuais de motocicletas
            </p>
          </div>
          <Link
            href="/manuais"
            className="group flex items-center gap-2 rounded-xl bg-[#6c5ce7] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6c5ce7]/20 transition-all hover:bg-[#7c6ef7] hover:shadow-[#6c5ce7]/30 active:scale-95"
          >
            <BookIcon />
            Ver Manuais
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Cards de status */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {/* Card Manuais */}
        <Link href="/manuais" className="group relative overflow-hidden rounded-2xl border border-[#2a2a3e] bg-gradient-to-br from-[#1a1a2e] to-[#12121a] p-6 transition-all duration-300 hover:border-[#6c5ce7]/40 hover:shadow-xl hover:shadow-[#6c5ce7]/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-[#6c5ce7]/10 blur-2xl transition-all group-hover:bg-[#6c5ce7]/20" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a78bfa] text-white shadow-lg shadow-[#6c5ce7]/25">
              <BookIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Manuais de Serviço</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
              Biblioteca completa com manuais de diversas marcas e modelos
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#6c5ce7] transition-colors group-hover:text-[#a78bfa]">
              Acessar biblioteca
              <ArrowRightIcon />
            </div>
          </div>
        </Link>

        {/* Card Status */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#2a2a3e] bg-gradient-to-br from-[#1a1a2e] to-[#12121a] p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-green-500/10 blur-2xl transition-all group-hover:bg-green-500/20" />
          <div className="relative">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${session?.user?.active ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/25 text-white" : "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25 text-white"}`}>
              <ShieldCheckIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Status da Conta</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
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
        <div className="group relative overflow-hidden rounded-2xl border border-[#2a2a3e] bg-gradient-to-br from-[#1a1a2e] to-[#12121a] p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25">
              <CrownIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Seu Plano</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
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
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a78bfa] px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#6c5ce7]/25 transition-all hover:shadow-[#6c5ce7]/40"
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
            { label: "Todas", color: "from-[#6c5ce7] to-[#a78bfa]", href: "/manuais" },
          ].map((brand) => (
            <Link
              key={brand.label}
              href={brand.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-[#2a2a3e] bg-[#12121a] p-4 transition-all hover:border-[#6c5ce7]/30 hover:bg-[#1a1a2e] active:scale-95"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${brand.color} text-white shadow-md`}>
                <MotorcycleIcon />
              </div>
              <span className="text-sm font-medium text-[#8888a4] group-hover:text-white">
                {brand.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Instalar App */}
      <div className="rounded-2xl border border-[#6c5ce7]/20 bg-gradient-to-r from-[#6c5ce7]/[0.08] to-transparent p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6c5ce7]/15 text-[#6c5ce7]">
            <DownloadIcon />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Instale o App no Celular!</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
              Tenha o OficinaDigital como app na tela inicial do seu celular. Acesso rápido sem precisar abrir o navegador.
            </p>
            <div className="mt-3">
              <InstallButton />
            </div>
          </div>
        </div>
      </div>

      {/* Novos manuais */}
      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.08] to-transparent p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <SparklesIcon />
          </div>
          <div>
            <h3 className="font-bold text-white">Novos manuais toda semana!</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
              Nossa biblioteca está em constante atualização. Novos manuais de serviço são adicionados <strong className="text-emerald-400">todas as semanas</strong>. Fique de olho!
            </p>
          </div>
        </div>
      </div>

      {/* Grupo WhatsApp */}
      <a
        href="https://chat.whatsapp.com/Lihae7qmtS7GfAoRmMIWo4"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/[0.08] to-transparent p-5 transition-all hover:border-green-500/40 sm:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-white">Grupo de Suporte & Dicas</h3>
            <p className="mt-1 text-sm text-[#8888a4]">
              Entre no nosso grupo do WhatsApp para receber <strong className="text-green-400">dicas, suporte</strong> e trocar experiências com outros mecânicos.
            </p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600/20 px-3 py-1.5 text-xs font-bold text-green-400">
              Entrar no Grupo →
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
              <p className="mt-1 text-sm text-[#8888a4]">
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
