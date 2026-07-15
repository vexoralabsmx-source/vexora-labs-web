"use client";
import { useEffect, useRef } from "react";
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    let x = -100, y = -100, rx = x, ry = y, frame = 0;
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const tick = () => { rx += (x-rx)*.16; ry += (y-ry)*.16; if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`; frame=requestAnimationFrame(tick); };
    window.addEventListener("pointermove", move); frame=requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, []);
  return <><div ref={dot} aria-hidden className="pointer-events-none fixed -left-1 -top-1 z-[120] hidden size-2 rounded-full bg-cyan-300 mix-blend-difference lg:block" /><div ref={ring} aria-hidden className="pointer-events-none fixed -left-4 -top-4 z-[119] hidden size-8 rounded-full border border-cyan-300/60 lg:block" /></>;
}
