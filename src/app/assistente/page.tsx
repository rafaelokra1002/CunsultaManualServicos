"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Qual o torque do cabeçote da Honda CG 160?",
  "Como calibrar a suspensão dianteira da Yamaha Fazer 150?",
  "Qual o procedimento de sincronização de carburador?",
  "Torque de aperto da manivela da Kawasaki Z 650",
];

export default function AssistentePage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Erro ao consultar o assistente." },
        ]);
        return;
      }

      if (!res.body) {
        // Fallback: lê como texto simples
        const text = await res.text();
        setMessages((prev) => [...prev, { role: "assistant", content: text || "Sem resposta do servidor." }]);
        return;
      }

      // Adiciona mensagem vazia e vai preenchendo com o stream
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const msgs = [...prev];
          const last = msgs[msgs.length - 1];
          msgs[msgs.length - 1] = { ...last, content: last.content + text };
          return msgs;
        });
      }
    } catch (e) {
      console.error("Assistente erro:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro de conexão. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const isPremium = session?.user?.isPremium;

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col pb-20 sm:pb-0 md:h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a78bfa] text-lg">
          🤖
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Assistente IA</h1>
          <p className="text-xs text-[#8888a4]">
            Consulta técnica com base nos manuais de serviço
          </p>
        </div>
        <span className="ml-auto rounded-full bg-[#6c5ce7]/20 px-3 py-1 text-xs font-semibold text-[#6c5ce7]">
          GPT-4o mini
        </span>
      </div>

      {/* Bloqueio demo */}
      {!isPremium && (
        <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
          <p className="text-sm font-semibold text-amber-400">
            🔒 O Assistente IA está disponível apenas para usuários Premium
          </p>
          <a
            href="/register"
            className="mt-2 inline-block rounded-lg bg-amber-500/20 px-4 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors"
          >
            Fazer upgrade →
          </a>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-[#2a2a3e] bg-[#0f0f18] p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-8">
            <div className="text-center">
              <div className="mb-3 text-4xl">🔧</div>
              <p className="text-base font-semibold text-white">
                Pergunte qualquer coisa sobre os manuais
              </p>
              <p className="mt-1 text-sm text-[#8888a4]">
                Torques, procedimentos, especificações, códigos de falha...
              </p>
            </div>

            <div className="grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => isPremium && sendMessage(s)}
                  disabled={!isPremium}
                  className="rounded-xl border border-[#2a2a3e] bg-[#12121a] px-3 py-2.5 text-left text-xs text-[#8888a4] transition-all hover:border-[#6c5ce7]/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#6c5ce7] to-[#a78bfa]"
                      : "bg-[#1a1a2e]"
                  }`}
                >
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#6c5ce7]/20 text-white"
                      : "bg-[#1a1a2e] text-[#d0d0e8]"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.content.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Indicador enquanto busca no banco / aguarda stream */}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a1a2e] text-sm">
                  🤖
                </div>
                <div className="rounded-2xl bg-[#1a1a2e] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#6c5ce7]" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#6c5ce7]" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#6c5ce7]" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isPremium || loading}
          placeholder={
            isPremium
              ? "Digite sua pergunta técnica... (Enter para enviar)"
              : "Disponível apenas para usuários Premium"
          }
          rows={1}
          className="flex-1 resize-none rounded-xl border border-[#2a2a3e] bg-[#12121a] px-4 py-3 text-sm text-white placeholder-[#8888a4] outline-none focus:border-[#6c5ce7] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
        <button
          type="submit"
          disabled={!isPremium || loading || !input.trim()}
          className="rounded-xl bg-[#6c5ce7] px-4 py-3 text-white transition-all hover:bg-[#5a4bd6] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      <p className="mt-2 text-center text-[10px] text-[#555570]">
        Respostas baseadas nos manuais de serviço indexados. Sempre confirme com o manual original.
      </p>
    </div>
  );
}
