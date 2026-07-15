"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);
  return <div aria-hidden={!visible} className={`fixed inset-0 z-[100] grid place-items-center bg-[#030712] transition-[clip-path,opacity,visibility] duration-700 ${visible ? "visible opacity-100 [clip-path:inset(0)]" : "invisible pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"}`}>
    <div className="w-[min(82vw,360px)] text-center">
      <Image src="/brand/vexora-logo.png" width={112} height={112} alt="" priority className="mx-auto h-24 w-auto object-contain" />
      <p className="tech-label mt-8">Inicializando experiencia</p>
      <div className="mt-5 h-px overflow-hidden bg-white/10"><div className="h-full origin-left animate-[grow_1s_ease-out_forwards] bg-cyan-300" /></div>
      <div className="mt-3 flex justify-between font-mono text-[9px] tracking-widest text-white/35"><span>CORE / ONLINE</span><span>V.26</span></div>
    </div>
  </div>;
}
