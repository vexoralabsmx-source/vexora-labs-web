"use client";
import dynamic from "next/dynamic";
import {AnimatePresence,motion,useMotionValue} from "framer-motion";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect,useRef,useState} from "react";
gsap.registerPlugin(ScrollTrigger);
const CoreCanvas=dynamic(()=>import("@/components/three/vexora-core-canvas").then(m=>m.VexoraCoreCanvas),{ssr:false});
const capabilities=[
 {code:"01",name:"Experiencias web",short:"WEB",title:"Interfaces que se sienten tan bien como funcionan.",description:"Experiencias rápidas, expresivas y escalables donde cada transición acompaña una decisión.",bullets:["Arquitectura frontend","Next.js y React","SEO + performance"],accent:"#00e5ff"},
 {code:"02",name:"Diseño de producto",short:"UI/UX",title:"Claridad visual para recorridos que sí se entienden.",description:"Sistemas de diseño, prototipos y jerarquías creadas para reducir fricción sin perder personalidad.",bullets:["Sistemas UI","Prototipos","Accesibilidad"],accent:"#8b5cf6"},
 {code:"03",name:"Automatización",short:"FLOW",title:"Procesos conectados que trabajan incluso cuando tú no.",description:"Conectamos herramientas, datos y avisos para transformar tareas repetidas en flujos confiables.",bullets:["Webhooks y APIs","Flujos operativos","Documentación"],accent:"#00e5ff"},
 {code:"04",name:"Comunidades",short:"BOTS",title:"Infraestructura que mantiene la comunidad en movimiento.",description:"Bots, roles, tickets y moderación diseñados alrededor de la operación real de cada comunidad.",bullets:["Discord y bots","Permisos","Logs y soporte"],accent:"#a78bfa"},
 {code:"05",name:"Inteligencia aplicada",short:"AI",title:"IA con un trabajo concreto, no como decoración.",description:"Asistentes, clasificación y búsqueda integrados donde aportan contexto, velocidad y mejores decisiones.",bullets:["Asistentes","Clasificación","Integraciones"],accent:"#67e8f9"},
 {code:"06",name:"Identidad digital",short:"BRAND",title:"Una marca coherente en cada punto de contacto.",description:"Lenguaje visual, tipografía y dirección de arte que hacen reconocible al sistema completo.",bullets:["Dirección visual","Sistemas de marca","Aplicaciones"],accent:"#8b5cf6"},
] as const;
export function ThreeLabSection(){
 const section=useRef<HTMLElement>(null),progressRef=useRef(0),activeRef=useRef(0);
 const [active,setActive]=useState(0),[webgl,setWebgl]=useState(true);
 const scrollProgress=useMotionValue(0);
 useGSAP(()=>{const trigger=ScrollTrigger.create({trigger:section.current,start:"top top",end:"bottom bottom",scrub:true,onUpdate(self){const latest=self.progress;progressRef.current=latest;scrollProgress.set(latest);const next=Math.min(capabilities.length-1,Math.floor(latest*capabilities.length));if(next!==activeRef.current){activeRef.current=next;setActive(next);}}});return()=>trigger.kill();},{scope:section});
 useEffect(()=>{const timer=window.setTimeout(()=>{try{const canvas=document.createElement("canvas");setWebgl(Boolean(canvas.getContext("webgl2")||canvas.getContext("webgl")));}catch{setWebgl(false);}},0);return()=>window.clearTimeout(timer);},[]);
 const item=capabilities[active];
 return <section ref={section} id="laboratorio" className="relative h-[600svh] border-y border-white/10 bg-[#030712]"><div className="sticky top-0 h-svh overflow-hidden">
  <div className="grid-bg absolute inset-0 opacity-[.15]"/><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(0,229,255,.09),transparent_30%),radial-gradient(circle_at_70%_55%,rgba(139,92,246,.08),transparent_34%)]"/>
  <div className="absolute inset-0">{webgl?<CoreCanvas progressRef={progressRef}/>:<div className="grid h-full place-items-center" aria-hidden><div className="v-fallback-mark"><span/><span/></div></div>}</div>
  <div className="v-container pointer-events-none relative z-10 h-full">
   <div className="absolute inset-x-0 top-24 flex items-start justify-between md:top-28"><div><p className="tech-label text-cyan-200">03 / Núcleo interactivo</p><p className="mt-3 hidden max-w-xs text-xs leading-5 text-white/40 md:block">Desplázate para orbitar el sistema y recorrer cada capacidad.</p></div><p className="tech-label text-white/35">Vexora core / {item.code}</p></div>
   <div className="absolute inset-x-0 bottom-20 md:bottom-16"><div className="pointer-events-auto max-w-[38rem] rounded-[1.6rem] border border-white/10 bg-[#050816]/75 p-5 shadow-2xl backdrop-blur-xl md:p-7"><AnimatePresence mode="wait"><motion.div key={item.code} initial={{opacity:0,y:24,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-18,filter:"blur(8px)"}} transition={{duration:.42,ease:[.22,1,.36,1]}}>
    <div className="flex items-center justify-between gap-4"><p className="tech-label" style={{color:item.accent}}>{item.name}</p><span className="tech-label text-white/30">{item.short}</span></div>
    <h2 className="display mt-4 text-[clamp(2.05rem,4.4vw,4.8rem)] normal-case leading-[.92]">{item.title}</h2><p className="mt-4 max-w-xl text-xs leading-6 text-white/55 md:text-sm">{item.description}</p>
    <div className="mt-5 flex flex-wrap gap-2">{item.bullets.map(label=><span key={label} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white/55">{label}</span>)}</div>
   </motion.div></AnimatePresence></div></div>
   <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">{capabilities.map((cap,index)=><div key={cap.code} className="flex items-center justify-end gap-3"><span className={"tech-label transition-opacity duration-300 "+(index===active?"text-white opacity-100":"opacity-0")}>{cap.short}</span><span className={"h-px transition-all duration-500 "+(index===active?"w-10 bg-cyan-300":"w-4 bg-white/20")}/><span className="tech-label text-white/30">{cap.code}</span></div>)}</div>
  </div>
  <div className="absolute inset-x-0 bottom-0 h-px bg-white/10"><motion.div style={{scaleX:scrollProgress,transformOrigin:"left"}} className="h-full bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500"/></div>
 </div></section>;
}

