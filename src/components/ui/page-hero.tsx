import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function PageHero({ eyebrow, title, description, index }: { eyebrow: string; title: React.ReactNode; description: string; index: string }) {
  return <header className="relative overflow-hidden border-b border-white/10 bg-[#030712] pb-20 pt-40 md:min-h-[78svh] md:pb-28 md:pt-48">
    <div className="grid-bg absolute inset-0 opacity-30"/><div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-300/[.055] blur-[130px]"/>
    <div className="v-container relative"><div className="flex items-center justify-between border-b border-white/10 pb-5"><p className="tech-label text-cyan-300">{index} / {eyebrow}</p><ArrowDownRight className="text-white/30" size={20}/></div>
      <h1 className="display mt-10 max-w-[1200px] text-[clamp(3.7rem,9vw,9.5rem)]">{title}</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-2xl text-base leading-8 text-white/55 md:text-lg">{description}</p><div className="flex flex-wrap gap-3"><Link href="/contacto" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-xs font-bold uppercase tracking-[.15em] text-slate-950">Iniciar proyecto <ArrowUpRight size={15}/></Link><Link href="/precios" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 text-xs font-bold uppercase tracking-[.15em] text-white">Ver precios</Link></div></div>
    </div>
  </header>;
}
