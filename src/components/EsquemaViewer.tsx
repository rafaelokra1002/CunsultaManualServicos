"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Ponto = { x: number; y: number };

export default function EsquemaViewer({
  src,
  formato,
  titulo,
  ocupaTela = false,
}: {
  src: string;
  formato: string;
  titulo: string;
  // preenche a altura do pai (página do esquema em tela inteira)
  ocupaTela?: boolean;
}) {
  const [escala, setEscala] = useState(1);
  const [escalaAjuste, setEscalaAjuste] = useState(1);
  const [pos, setPos] = useState<Ponto>({ x: 0, y: 0 });
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [cheio, setCheio] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // espelho da escala: pinça e roda disparam vários eventos por frame,
  // e o valor do render já estaria velho
  const escalaRef = useRef(1);
  const ponteiros = useRef<Map<number, Ponto>>(new Map());
  const pinca = useRef<{ dist: number; escala: number } | null>(null);
  const ajustado = useRef(false);

  const limitar = (v: number) => Math.min(8, Math.max(0.1, v));

  // a imagem nunca sai do quadro: se couber, centraliza; se não, para com 12 px de folga
  const prender = useCallback((p: Ponto) => {
    const el = box.current;
    if (!el) return p;
    const w = dim.w * escalaRef.current;
    const h = dim.h * escalaRef.current;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const x = w <= cw ? (cw - w) / 2 : Math.min(12, Math.max(cw - w - 12, p.x));
    const y = h <= ch ? (ch - h) / 2 : Math.min(12, Math.max(ch - h - 12, p.y));
    return { x, y };
  }, [dim.w, dim.h]);

  const ajustar = useCallback(() => {
    const el = box.current;
    if (!el || !dim.w) return;
    const s = limitar(Math.min((el.clientWidth - 24) / dim.w, (el.clientHeight - 24) / dim.h));
    escalaRef.current = s;
    setEscala(s);
    setEscalaAjuste(s);
    setPos(prender({ x: 12, y: 12 }));
  }, [dim.w, prender]);

  // (clientX, clientY) em coordenadas da janela; o ponto sob ele fica parado
  const zoomEm = useCallback((clientX: number, clientY: number, delta: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clientX - r.left;
    const py = clientY - r.top;
    const s = escalaRef.current;
    const nova = limitar(s + delta);
    if (nova === s) return;
    const fator = nova / s;
    escalaRef.current = nova;
    setEscala(nova);
    setPos((p) => prender({ x: px - (px - p.x) * fator, y: py - (py - p.y) * fator }));
  }, [prender]);

  // botões: ancorados no canto superior esquerdo do quadro
  const zoomCanto = (delta: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) zoomEm(r.left, r.top, delta);
  };

  const aoCarregar = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    setDim({ w: nw, h: nh });
    if (!ajustado.current) {
      ajustado.current = true;
      requestAnimationFrame(() => {
        const el = box.current;
        if (!el || !nw || !nh) return;
        const s = limitar(Math.min((el.clientWidth - 24) / nw, (el.clientHeight - 24) / nh));
        escalaRef.current = s;
        setEscala(s);
        setEscalaAjuste(s);
        // dim ainda não chegou ao prender neste frame: centraliza com os valores naturais
        setPos({ x: (el.clientWidth - nw * s) / 2, y: (el.clientHeight - nh * s) / 2 });
      });
    }
  };

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const roda = (e: WheelEvent) => {
      e.preventDefault();
      zoomEm(e.clientX, e.clientY, e.deltaY > 0 ? -0.15 : 0.15);
    };
    el.addEventListener("wheel", roda, { passive: false });
    return () => el.removeEventListener("wheel", roda);
  }, [zoomEm]);

  useEffect(() => {
    const aoMudar = () => setCheio(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", aoMudar);
    return () => document.removeEventListener("fullscreenchange", aoMudar);
  }, []);

  useEffect(() => {
    const aoTecla = (e: KeyboardEvent) => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (e.key === "+" || e.key === "=") zoomEm(cx, cy, 0.25);
      if (e.key === "-") zoomEm(cx, cy, -0.25);
      if (e.key === "0") ajustar();
    };
    window.addEventListener("keydown", aoTecla);
    return () => window.removeEventListener("keydown", aoTecla);
  }, [ajustar, zoomEm]);

  const aoDescer = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    ponteiros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ponteiros.current.size === 2) {
      const [a, b] = [...ponteiros.current.values()];
      pinca.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), escala: escalaRef.current };
    }
  };

  const aoMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const anterior = ponteiros.current.get(e.pointerId);
    if (!anterior) return;
    ponteiros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (ponteiros.current.size === 2 && pinca.current) {
      const [a, b] = [...ponteiros.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinca.current.dist < 1) return;
      const alvo = limitar(pinca.current.escala * (dist / pinca.current.dist));
      zoomEm((a.x + b.x) / 2, (a.y + b.y) / 2, alvo - escalaRef.current);
      return;
    }
    if (ponteiros.current.size === 1) {
      const dx = e.clientX - anterior.x;
      const dy = e.clientY - anterior.y;
      setPos((p) => prender({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const aoSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    ponteiros.current.delete(e.pointerId);
    if (ponteiros.current.size < 2) pinca.current = null;
  };

  const telaCheia = () => {
    if (!box.current) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else box.current.requestFullscreen?.();
  };

  if (formato === "pdf") {
    return (
      <div className={ocupaTela ? "flex h-full flex-col bg-surface" : "rounded-xl border border-line bg-surface"}>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2 text-sm">
          <span className="truncate text-muted">{titulo}</span>
          <a href={src} download className="flex h-10 items-center rounded-md border border-line px-3 hover:border-signal sm:h-8">Baixar PDF</a>
        </div>
        <iframe
          src={src}
          className={ocupaTela ? "min-h-0 w-full flex-1" : "h-[45dvh] w-full rounded-b-xl sm:h-[75vh]"}
          title={titulo}
        />
      </div>
    );
  }

  // ajustada: o dedo rola a página (pan-y) e a pinça continua chegando aqui;
  // com zoom: o gesto é todo do quadro
  const comZoom = escala > escalaAjuste + 0.01;

  return (
    <div className={ocupaTela ? "flex h-full flex-col overflow-hidden bg-surface" : "overflow-hidden rounded-xl border border-line bg-surface"}>
      <div className={`flex shrink-0 flex-wrap items-center gap-2 border-b border-line px-3 py-2 text-sm ${ocupaTela ? "justify-end" : "justify-between"}`}>
        {!ocupaTela && <span className="truncate text-muted">{titulo}</span>}
        <div className="flex items-center gap-1">
          <button onClick={() => zoomCanto(0.25)} className="h-10 w-10 rounded-md border border-line sm:h-8 sm:w-8">+</button>
          <button onClick={() => zoomCanto(-0.25)} className="h-10 w-10 rounded-md border border-line sm:h-8 sm:w-8">−</button>
          <button onClick={ajustar} className="flex h-10 items-center rounded-md border border-line px-3 text-xs sm:h-8 sm:px-2">Ajustar</button>
          <button onClick={telaCheia} className="flex h-10 items-center rounded-md border border-line px-3 text-xs sm:h-8 sm:px-2">{cheio ? "Sair" : "Tela cheia"}</button>
          <a href={src} download className="flex h-10 items-center rounded-md border border-line px-3 text-xs sm:h-8 sm:px-2">Baixar</a>
        </div>
      </div>
      <div
        ref={box}
        className={`cursor-grab overflow-hidden bg-black/40 active:cursor-grabbing ${ocupaTela ? "min-h-0 flex-1" : "h-[45dvh] sm:h-[75vh]"}`}
        // em tela inteira não há página para rolar: o gesto é sempre do quadro
        style={{ touchAction: ocupaTela || comZoom ? "none" : "pan-y", overscrollBehavior: "contain" }}
        onPointerDown={aoDescer}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onDoubleClick={ajustar}
      >
        <img
          src={src}
          alt={titulo}
          onLoad={aoCarregar}
          draggable={false}
          // max-w-none: o preflight do Tailwind põe max-width:100% em img,
          // o que encolhia a largura natural antes da escala ser aplicada
          className="max-w-none origin-top-left select-none"
          style={{ width: dim.w || undefined, transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})` }}
        />
      </div>
      <p className="shrink-0 px-3 py-2 text-xs text-muted">
        <span className="sm:hidden">{ocupaTela ? "Pinça dá zoom · arraste para mover" : "Pinça dá zoom · um dedo rola a página"}</span>
        <span className="hidden sm:block">Roda do mouse ou pinça dão zoom · arraste para mover · duplo clique ajusta</span>
      </p>
    </div>
  );
}
