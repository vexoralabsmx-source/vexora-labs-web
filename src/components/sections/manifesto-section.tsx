"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "@/components/ui/particles";
gsap.registerPlugin(ScrollTrigger);
const lines=["Una idea no crece","solo por verse bien.","Crece cuando diseño,","tecnología y estrategia","trabajan como","un solo sistema."];
export function ManifestoSection(){
  const root=useRef<HTMLElement>(null);
  useGSAP(()=>{const items=gsap.utils.toArray<HTMLElement>("[data-line]",root.current);items.forEach((item,index)=>gsap.fromTo(item,{opacity:.12,y:40},{opacity:1,y:0,scrollTrigger:{trigger:item,start:"top 80%",end:"top 45%",scrub:true},onUpdate(){items.slice(0,index).forEach(old=>gsap.set(old,{opacity:.3,filter:"blur(3px)",scale:.98}));}}));},{scope:root});
  return <section ref={root} className="relative min-h-[240svh] overflow-hidden border-t border-white/10 bg-[#050816]"><Particles particleCount={9000} particleSize={3}/><div className="grid-bg absolute inset-0 opacity-30"/><div className="sticky top-0 flex h-svh items-center"><div className="v-container relative z-10"><p className="tech-label mb-10 text-cyan-300">01 / Manifiesto</p><div>{lines.map(line=><p data-line key={line} className="display text-[clamp(2.8rem,7.2vw,7.8rem)] text-white">{line}</p>)}</div><p className="tech-label mt-12 text-white">Eso es Vexora Labs.</p></div></div></section>;
}
