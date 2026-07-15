"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const phases = [
  { range: "00—15", label: "Vexora Labs / Digital Experience", title: <>Todo empieza<br/>con una idea.</>, text: "El diseño, el código y la estrategia deciden hasta dónde puede llegar.", align: "items-start text-left" },
  { range: "15—32", label: "System / Architecture / 01", title: <>La estructura<br/>aparece.</>, text: "Organizamos el contenido, los recorridos y las funciones antes de construir.", align: "items-end text-right" },
  { range: "32—50", label: "Interface / Design / 02", title: <>El diseño<br/>toma forma.</>, text: "Cada elemento recibe jerarquía, identidad y una intención clara.", align: "items-start text-left" },
  { range: "50—68", label: "Development / System / 03", title: <>El código<br/>lo convierte en real.</>, text: "Componentes, integraciones y sistemas construidos para funcionar.", align: "items-end text-right" },
  { range: "68—84", label: "Connected / Ecosystem / 04", title: <>Todo se<br/>conecta.</>, text: "Diseño, automatización, comunidad y tecnología dentro de una sola experiencia.", align: "items-start text-left" },
  { range: "84—100", label: "Build complete", title: <>Tu idea puede<br/>verse premium.</>, text: "Diseño, desarrollo y tecnología para proyectos que no quieren verse como todos los demás.", align: "items-center text-center" },
];

export function ScrollBuildHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const introTime = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = video.current;
    if (!element || reduced) return;
    let frame = 0;
    const update = () => {
      currentTime.current += (targetTime.current-currentTime.current)*.14;
      if (element.readyState >= 2 && Math.abs(element.currentTime-currentTime.current)>.015) element.currentTime=currentTime.current;
      frame=requestAnimationFrame(update);
    };
    const ready=()=>{
      introTime.current=Math.min(element.duration*.14,1.1);
      currentTime.current=0;
      targetTime.current=introTime.current;
      ScrollTrigger.refresh();
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(update);
    };
    if(element.readyState>=1) ready();
    else element.addEventListener("loadedmetadata",ready,{once:true});
    return()=>{element.removeEventListener("loadedmetadata",ready);cancelAnimationFrame(frame);};
  },[reduced]);

  useGSAP(()=>{
    if(!root.current) return;
    const blocks=gsap.utils.toArray<HTMLElement>("[data-hero-phase]",root.current);
    const trigger=ScrollTrigger.create({
      trigger:root.current,start:"top top",end:"bottom bottom",scrub:true,
      onUpdate:self=>{
        if(video.current?.duration) targetTime.current=introTime.current+self.progress*Math.max(0,video.current.duration-introTime.current-.05);
        blocks.forEach((block,index)=>{
          const center=index/(blocks.length-1);
          const distance=Math.abs(self.progress-center);
          gsap.set(block,{autoAlpha:distance<.12?1:0,y:(self.progress-center)*-90,filter:`blur(${Math.min(14,distance*50)}px)`,scale:1-Math.min(.08,distance*.25)});
        });
      }
    });
    blocks.forEach(block=>{const split=new SplitType(block.querySelector("h2") as HTMLElement,{types:"lines"});gsap.set(split.lines,{overflow:"hidden"});});
    return()=>trigger.kill();
  },{scope:root,dependencies:[reduced]});

  return <section id="inicio" ref={root} className="relative h-[650svh] bg-[#030712] max-md:h-[430svh]">
    <div className="sticky top-0 h-svh overflow-hidden">
      <video ref={video} muted playsInline preload="metadata" poster="/videos/vexora-build-poster.webp" className={`absolute inset-0 size-full object-cover transition ${reduced?"opacity-45":"opacity-65"}`}>
        <source src="/videos/vexora-build.webm" type="video/webm"/><source src="/videos/vexora-build.mp4" type="video/mp4"/>
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_10%,rgba(3,7,18,.25)_55%,#030712_100%)]"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/55"/>
      <div className="grid-bg absolute inset-0 opacity-20"/>
      <div className="absolute inset-x-0 top-20 flex justify-between px-5 md:px-10"><span className="tech-label">Build system / active</span><span className="tech-label">Scroll to compile</span></div>
      <div className="absolute left-4 top-1/2 hidden w-60 -translate-y-1/2 rounded-xl border border-cyan-300/20 bg-[#030712]/65 p-4 font-mono text-[10px] leading-5 text-white/45 backdrop-blur md:block">
        <div className="text-cyan-300">const idea = createExperience&#40;&#123;</div><div className="pl-3">design: &quot;intentional&quot;,</div><div className="pl-3">technology: &quot;scalable&quot;,</div><div className="pl-3">motion: &quot;meaningful&quot;,</div><div className="text-cyan-300">&#125;&#41;;</div><div className="mt-3 border-t border-white/10 pt-3 text-purple-300">COMPILING EXPERIENCE...</div>
      </div>
      <svg aria-hidden className="absolute inset-0 size-full opacity-35"><path d="M0 72 H220 L260 112 H500" fill="none" stroke="#00e5ff" strokeWidth=".6"/><path d="M1440 720 H1160 L1110 670 H880" fill="none" stroke="#8b5cf6" strokeWidth=".6"/></svg>
      {phases.map((phase,index)=><div key={phase.range} data-hero-phase className={`pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-20 opacity-0 md:px-[8vw] md:pb-[11vh] ${phase.align}`}>
        <div className="w-full max-w-4xl"><p className="tech-label mb-5 text-cyan-200">{phase.label}</p><h2 className="display text-[clamp(3.2rem,8vw,8.8rem)]">{phase.title}</h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/60 md:text-base md:leading-7">{phase.text}</p>
          {index===5&&<div className="pointer-events-auto mt-7 flex flex-wrap justify-center gap-3"><MagneticButton href="/contacto">Iniciar proyecto</MagneticButton><MagneticButton href="/servicios" className="border-white/20 bg-white/[.06] text-white">Explorar Vexora</MagneticButton></div>}
        </div>
      </div>)}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3"><span className="block h-8 w-px bg-gradient-to-b from-cyan-300 to-transparent"/><span className="tech-label">Desliza para construir</span></div>
    </div>
  </section>;
}
