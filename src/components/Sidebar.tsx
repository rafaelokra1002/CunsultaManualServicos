"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "@/components/Logo";
import InstallButton from "@/components/InstallButton";

function DashboardIcon({ active }: { active?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#6c5ce7" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ManuaisIcon({ active }: { active?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#6c5ce7" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h4" />
    </svg>
  );
}

function OleoIcon({ active }: { active?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#6c5ce7" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="M8 8h8l2 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L8 8z" />
      <path d="M10 12h4" />
      <path d="M10 15h4" />
    </svg>
  );
}

function CalculadoraIcon({ active }: { active?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#6c5ce7" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="10" y2="18" />
      <line x1="14" y1="18" x2="16" y2="18" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="16" y2="12" />
      <line x1="4" y1="18" x2="12" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { href: "/manuais", label: "Manuais", Icon: ManuaisIcon },
  { href: "/oleo-suspensao", label: "Óleo Suspensão", Icon: OleoIcon },
  { href: "/calculadora", label: "Calculadora", Icon: CalculadoraIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#2a2a3e] bg-[#0f0f18]/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2a3e] bg-[#151522] text-white transition-colors hover:border-[#6c5ce7]/30"
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </button>
        <Link href="/dashboard" className="flex items-center text-lg font-bold text-white">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </Link>
        <InstallButton compact />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[84vw] max-w-[320px] flex-col border-r border-[#2a2a3e] bg-[#0f0f18] transition-transform duration-300 md:z-40 md:w-64 md:max-w-none ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[#2a2a3e] px-6">
          <Link href="/dashboard" className="flex items-center text-xl font-bold text-white" onClick={() => setOpen(false)}>
            <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8888a4] transition-colors hover:bg-[#1a1a2e] hover:text-white md:hidden"
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-[#555570]">Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#6c5ce7]/15 to-[#6c5ce7]/5 text-[#6c5ce7] shadow-sm shadow-[#6c5ce7]/10"
                    : "text-[#8888a4] hover:bg-[#1a1a2e] hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#6c5ce7]" />
                )}
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  isActive ? "bg-[#6c5ce7]/20" : "bg-[#1a1a2e] group-hover:bg-[#2a2a3e]"
                }`}>
                  <item.Icon active={isActive} />
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-3 border-t border-[#2a2a3e] p-4">
          <InstallButton />

          {/* User card */}
          <div className="flex items-center gap-3 rounded-xl bg-[#12121a] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#a78bfa] text-xs font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{session?.user?.name}</p>
              <p className="truncate text-[11px] text-[#8888a4]">{session?.user?.email}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#8888a4] transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a2e]">
              <LogoutIcon />
            </div>
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
