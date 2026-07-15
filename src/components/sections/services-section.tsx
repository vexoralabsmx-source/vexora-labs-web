"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { TiltCard } from "@/components/ui/tilt-card";
gsap.registerPlugin(ScrollTrigger);
export function ServicesSection(){
 const root=useRef<HTMLElement>(null);const track=useRef<HTMLDivElement>(null);
 useGSAP(()=>{if(!root.current||!track.current||matchMedia("(max-width:767px)").matches)return;const distance=()=>Math.max(0,track.current!.scrollWidth-window.innerWidth+80);const tween=gsap.to(track.current,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:root.current,start:"top top",end:()=>`+=${distance()+window.innerHeight}`,pin:true,scrub:1,invalidateOnRefresh:true}});return()=>tween.kill();},{scope:root});
 return <section id="servicios" ref={root} className="section-shell overflow-hidden bg-[#050816] md:min-h-svh"><div className="v-container"><p className="tech-label text-cyan-300">02 / Capacidades</p><div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="display max-w-5xl text-[clamp(3.1rem,7vw,7rem)]">Todo conectado.<br/>Todo con intención.</h2><p className="max-w-md text-sm leading-7 text-white/50">Combinamos capacidades distintas para construir sistemas digitales completos.</p></div></div><div ref={track} className="mt-14 flex flex-col gap-4 px-4 md:w-max md:flex-row md:px-[max(2rem,calc((100vw-1440px)/2))]">{services.map((service,index)=><TiltCard key={service.number} className={`group min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-7 md:w-[410px] ${index===1||index===4?"md:translate-y-8":""}`}><div className="flex items-center justify-between"><span className="tech-label text-cyan-300">{service.number}</span><service.icon className="text-white/40" size={25}/></div><div className="mt-24"><h3 className="display text-4xl">{service.title}</h3><p className="mt-5 text-sm leading-6 text-white/55">{service.description}</p><ul className="mt-7 flex flex-wrap gap-2">{service.items.map(item=><li key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/55">{item}</li>)}</ul></div><a href="/contacto" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white">Explorar <ArrowUpRight size={15}/></a></TiltCard>)}</div></section>;
}
