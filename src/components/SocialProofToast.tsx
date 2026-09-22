"use client";

import { useState, useEffect, useCallback } from "react";

const names = [
  "João de SP", "Carlos de MG", "André de RJ", "Pedro de PR",
  "Lucas de BA", "Rafael de SC", "Marcos de GO", "Fernando de RS",
  "Diego de PE", "Bruno de CE", "Rodrigo de PA", "Thiago de MA",
  "Leandro de MT", "Gustavo de ES", "Fábio de AM", "Roberto de DF",
  "Matheus de PI", "Vinícius de RN", "Henrique de SE", "Alex de TO",
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  const showToast = useCallback(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    setName(randomName);
    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showToast();
    }, 5000);

    const interval = setInterval(() => {
      showToast();
    }, 8000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showToast]);

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs rounded-xl border border-[#2a2a3e] bg-[#12121a]/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm">
          🔥
        </span>
        <p className="text-sm text-[#e4e4ef]">
          <strong className="text-green-400">{name}</strong>{" "}
          acabou de acessar a plataforma
        </p>
      </div>
    </div>
  );
}
