"use client";
import { useEffect, useRef, useState } from "react";

export default function EsquemaViewer({ src, formato, titulo }: { src: string; formato: string; titulo: string }) {
  const [escala, setEscala] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cheio, setCheio] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const arrastando = useRef(false);
  const ultimo = useRef({ x: 0, y: 0 });

  const limitar = (v: number) => Math.min(8, Math.max(1, v));
  const reset = () => { setEscala(1); setPos({ x: 0, y: 0 }); };

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const roda = (e: WheelEvent) => {
      e.preventDefault();
      setEscala((s) => limitar(s - e.deltaY * 0.0015));
    };
    el.addEventListener("wheel", roda, { passive: false });
    return () => el.removeEventListener("wheel", roda);
  }, []);

  useEffect(() => {
    const aoSoltar = () => { arrastando.current = false; };
    window.addEventListener("pointerup", aoSoltar);
    return () => window.removeEventListener("pointerup", aoSoltar);
  }, []);

  useEffect(() => {
    const aoTecla = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setEscala((s) => limitar(s + 0.25));
      if (e.key === "-") setEscala((s) => limitar(s - 0.25));
      if (e.key === "0") reset();
      if (e.key === "Escape" && cheio) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", aoTecla);
    return () => window.removeEventListener("keydown", aoTecla);
  }, [cheio]);

  const telaCheia = () => {
    if (!box.current) return;
    if (document.fullscreenElement) { document.exitFullscreen?.(); setCheio(false); }
    else { box.current.requestFullscreen?.(); setCheio(true); }
  };

  if (formato === "pdf") {
    return (
      <div className="rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 text-sm">
          <span className="truncate text-muted">{titulo}</span>
          <a href={src} download className="rounded-md border border-line px-3 py-1 hover:border-signal">Baixar PDF</a>
        </div>
        <iframe src={src} className="h-[75vh] w-full rounded-b-xl" title={titulo} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 text-sm">
        <span className="truncate text-muted">{titulo}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setEscala((s) => limitar(s + 0.25))} className="h-8 w-8 rounded-md border border-line">+</button>
          <button onClick={() => setEscala((s) => limitar(s - 0.25))} className="h-8 w-8 rounded-md border border-line">−</button>
          <button onClick={reset} className="h-8 rounded-md border border-line px-2 text-xs">100%</button>
          <button onClick={telaCheia} className="h-8 rounded-md border border-line px-2 text-xs">{cheio ? "Sair" : "Tela cheia"}</button>
          <a href={src} download className="h-8 rounded-md border border-line px-2 text-xs leading-8">Baixar</a>
        </div>
      </div>
      <div
        ref={box}
        className="h-[75vh] cursor-grab overflow-hidden bg-black/40 active:cursor-grabbing"
        onPointerDown={(e) => { arrastando.current = true; ultimo.current = { x: e.clientX, y: e.clientY }; }}
        onPointerMove={(e) => {
          if (!arrastando.current) return;
          setPos((p) => ({ x: p.x + e.clientX - ultimo.current.x, y: p.y + e.clientY - ultimo.current.y }));
          ultimo.current = { x: e.clientX, y: e.clientY };
        }}
        onDoubleClick={reset}
      >
        <img
          src={src}
          alt={titulo}
          draggable={false}
          className="origin-top-left select-none"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})`, imageRendering: escala > 2 ? "pixelated" : "auto" }}
        />
      </div>
      <p className="px-3 py-2 text-xs text-muted">Roda do mouse dá zoom · arraste para mover · duplo clique volta a 100%</p>
    </div>
  );
}
