import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function QuoteStrip({ title="Tu proyecto puede verse premium." }: { title?: string }) {
  return <section className="border-y border-white/10 bg-cyan-300 py-8 text-slate-950"><div className="v-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><h2 className="display max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)]">{title}</h2><Link href="/contacto" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-xs font-bold uppercase tracking-[.15em] text-white">Cuéntanos tu idea <ArrowUpRight size={16}/></Link></div></section>;
}
