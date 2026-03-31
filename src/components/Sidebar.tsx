"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/manuais", label: "Manuais", icon: "📄" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#2a2a3e] bg-[#0f0f18]/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2a3e] bg-[#151522] text-white"
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <Link href="/dashboard" className="flex items-center text-lg font-bold text-white">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </Link>
        <div className="w-10" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[84vw] max-w-[320px] flex-col border-r border-[#2a2a3e] bg-[#0f0f18] transition-transform duration-300 md:z-40 md:w-64 md:max-w-none ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex h-16 items-center justify-between border-b border-[#2a2a3e] px-6">
          <Link href="/dashboard" className="flex items-center text-xl font-bold text-white" onClick={() => setOpen(false)}>
            <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xl text-[#8888a4] md:hidden"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#6c5ce7]/15 text-[#6c5ce7] shadow-sm shadow-[#6c5ce7]/10"
                    : "text-[#8888a4] hover:bg-[#1a1a2e] hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#2a2a3e] p-4">
          <div className="mb-3 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">{session?.user?.name}</p>
            <p className="truncate text-xs text-[#8888a4]">{session?.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[#8888a4] transition-all hover:bg-[#1a1a2e] hover:text-red-400"
          >
            🚪 Sair
          </button>
        </div>
      </aside>
    </>
  );
}
