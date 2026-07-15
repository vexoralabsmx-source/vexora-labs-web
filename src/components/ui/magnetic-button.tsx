"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const inner = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== "mouse" || !inner.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    inner.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .13}px,${(event.clientY - rect.top - rect.height / 2) * .13}px)`;
  };
  const reset = () => { if (inner.current) inner.current.style.transform = "translate(0,0)"; };
  return <a href={href} onPointerMove={move} onPointerLeave={reset} className={cn("inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300 bg-cyan-300 px-6 text-xs font-semibold uppercase tracking-[.16em] text-slate-950 transition hover:bg-white hover:border-white", className)}><span ref={inner} className="transition-transform duration-300">{children}</span></a>;
}
