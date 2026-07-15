"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import {ArrowUpRight,Maximize2,X} from "lucide-react";
import {useState} from "react";
import {ContainerScroll} from "@/components/ui/container-scroll-animation";
import {projects} from "@/data/projects";

const layout=["col-span-2 md:col-span-7 md:row-span-2","md:col-span-5","md:col-span-5","md:col-span-5","md:col-span-7"] as const;

export function ProjectsSection(){
 const [selected,setSelected]=useState<(typeof projects)[number]|null>(null);
 return <section id="proyectos" className="relative overflow-hidden border-t border-white/10 bg-[#030712]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,.12),transparent_42%)]"/><div className="grid-bg absolute inset-0 opacity-[.14]"/>
  <div className="v-container relative">
   <ContainerScroll titleComponent={<div><p className="tech-label text-purple-300">05 / Proyectos en órbita</p><h2 className="display mt-7 text-[clamp(3.2rem,7.7vw,8rem)]">Ideas que ya<br/><span className="editorial normal-case text-white/85">tomaron forma.</span></h2><p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50">Inclina el sistema con tu recorrido. Cada módulo representa una solución construida con una arquitectura distinta.</p></div>}>
    <div className="flex h-full flex-col">
     <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-[#080d1a]/90 px-4"><div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-cyan-300"/><span className="size-1.5 rounded-full bg-purple-400"/><span className="size-1.5 rounded-full bg-white/20"/></div><p className="tech-label text-[8px] text-white/35">Vexora / Project matrix</p><span className="tech-label text-[8px] text-cyan-200">Live system</span></div>
     <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-1.5 p-1.5 md:grid-cols-12 md:grid-rows-2 md:gap-2 md:p-2">
      {projects.map((project,index)=><button key={project.title} onClick={()=>setSelected(project)} className={"group relative min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#070c18] text-left transition duration-500 hover:border-white/25 focus-visible:z-10 "+layout[index]}>
       <div className="absolute inset-0 transition duration-700 group-hover:scale-110" style={{background:`radial-gradient(circle at 78% 28%,${project.accent}35,transparent 42%),linear-gradient(145deg,transparent,rgba(255,255,255,.025))`}}/><div className="project-orbit absolute -right-[12%] -top-[34%] size-[75%] rounded-full border border-white/10"/><div className="grid-bg absolute inset-0 opacity-20"/>
       <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full border border-white/10 bg-black/20 opacity-0 transition group-hover:opacity-100"><Maximize2 size={11}/></span>
       <div className="relative flex h-full flex-col justify-between p-3 md:p-5"><div className="flex items-center gap-2"><span className="tech-label text-[8px]" style={{color:project.accent}}>0{index+1}</span><span className="h-px w-5 bg-white/15"/><span className="tech-label hidden text-[8px] text-white/35 sm:block">{project.categories[0]}</span></div><div><h3 className="display max-w-[13ch] text-[clamp(1.3rem,2.7vw,3.2rem)] leading-[.9]">{project.title}</h3><p className="mt-2 hidden max-w-sm text-[10px] leading-5 text-white/45 md:block">{project.description}</p></div></div>
      </button>)}
     </div>
    </div>
   </ContainerScroll>
   <div className="-mt-20 mb-28 flex justify-center md:-mt-28 md:mb-36"><Link href="/proyectos" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[.035] px-6 text-xs uppercase tracking-[.16em] transition hover:border-cyan-300/50 hover:bg-cyan-300/10">Ver archivo completo <ArrowUpRight size={15}/></Link></div>
  </div>
  <Dialog.Root open={Boolean(selected)} onOpenChange={open=>!open&&setSelected(null)}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"/><Dialog.Content className="fixed left-1/2 top-1/2 z-[91] max-h-[88svh] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[2rem] border border-white/10 bg-[#080d1a] p-7 shadow-2xl md:p-10"><Dialog.Close aria-label="Cerrar" className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/15"><X size={17}/></Dialog.Close><p className="tech-label text-cyan-300">Caso / Vexora Labs</p><Dialog.Title className="display mt-5 pr-12 text-[clamp(2.5rem,7vw,5rem)]">{selected?.title}</Dialog.Title><Dialog.Description className="mt-5 text-base leading-7 text-white/60">{selected?.description}</Dialog.Description><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="rounded-xl border border-white/10 p-5"><p className="tech-label">Enfoque</p><p className="mt-3 text-sm leading-6 text-white/55">Estructura, experiencia y sistema visual adaptados al propósito del proyecto.</p></div><div className="rounded-xl border border-white/10 p-5"><p className="tech-label">Capacidades</p><p className="mt-3 text-sm leading-6 text-white/55">{selected?.categories.join(" · ")}</p></div></div><Link href="/contacto" onClick={()=>setSelected(null)} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-cyan-300 px-6 text-xs font-bold uppercase tracking-wider text-slate-950">Crear algo propio</Link></Dialog.Content></Dialog.Portal></Dialog.Root>
 </section>;
}
