import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteriorPage } from "@/components/layout/interior-page";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteStrip } from "@/components/ui/quote-strip";
import { solutionPortfolio } from "@/data/offers";

export const metadata: Metadata = { title: "Proyectos y soluciones | Vexora Labs", description: "Proyectos identificados y ejemplos transparentes de las soluciones que Vexora Labs puede construir." };

export default function ProjectsPage(){
 return <InteriorPage><PageHero index="03" eyebrow="Proyectos" title={<>Cada idea pide<br/>su propio sistema.</>} description="Mostramos proyectos identificados y ejemplos de solución por separado. Sin inventar clientes, testimonios ni cifras comerciales."/>
  <section className="section-shell bg-[#050816]"><div className="v-container"><div className="grid gap-5 lg:grid-cols-2">{solutionPortfolio.map((project,index)=><article key={project.title} className={"group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080d1a] p-7 md:p-9 "+(index===0||index===5?"lg:col-span-2":"")}><div className="absolute inset-0 opacity-70 transition duration-700 group-hover:scale-110" style={{background:"radial-gradient(circle at 85% 20%,"+project.accent+"30,transparent 35%)"}}/><div className="grid-bg absolute inset-0 opacity-20"/><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="tech-label" style={{color:project.accent}}>0{index+1} / {project.type}</span><span className="tech-label">{project.category}</span></div><div className="mt-auto"><h2 className="display max-w-5xl text-[clamp(2.8rem,6vw,6.5rem)]">{project.title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.capabilities.map(item=><span key={item} className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/55">{item}</span>)}</div></div></div></article>)}</div>
   <div className="mt-16 flex flex-col items-start justify-between gap-7 border-t border-white/10 pt-10 md:flex-row md:items-center"><div><p className="tech-label text-cyan-300">Siguiente caso</p><h2 className="display mt-4 text-4xl md:text-6xl">Puede ser el tuyo.</h2></div><Link href="/contacto" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-xs font-bold uppercase tracking-wider text-slate-950">Presentar proyecto <ArrowUpRight size={15}/></Link></div>
  </div></section><QuoteStrip/></InteriorPage>;
}
