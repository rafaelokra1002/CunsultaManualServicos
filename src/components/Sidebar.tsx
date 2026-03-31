"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/manuais", label: "Manuais", icon: "📄" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#2a2a3e] bg-[#0f0f18]">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#2a2a3e] px-6">
        <Link href="/dashboard" className="flex items-center text-xl font-bold text-white">
          <Logo size="sm" /> <span className="ml-2">Oficina<span className="text-[#6c5ce7]">Digital</span></span>
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
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

      {/* Info do usuário */}
      <div className="border-t border-[#2a2a3e] p-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-white">{session?.user?.name}</p>
          <p className="text-xs text-[#8888a4]">{session?.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#8888a4] transition-all hover:bg-[#1a1a2e] hover:text-red-400"
        >
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}
