"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = -((event.clientY - rect.top) / rect.height - .5) * 7;
    const ry = ((event.clientX - rect.left) / rect.width - .5) * 7;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={reset} className={cn("transition-transform duration-300 ease-out", className)}>{children}</div>;
}
