import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
export function Footer() {
  return <footer className="border-t border-white/10 bg-[#030712] py-10"><div className="v-container">
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
      <div><Image src="/brand/vexora-logo.png" width={72} height={72} alt="Vexora Labs" className="h-16 w-auto object-contain"/><p className="display mt-7 max-w-2xl text-[clamp(2.3rem,5vw,5rem)]">Tu idea puede verse premium.</p></div>
      <div className="grid grid-cols-2 gap-3 self-end">{navigation.map(item=><Link key={item.href} href={item.href} className="text-xs uppercase tracking-[.14em] text-white/55 hover:text-white">{item.label}</Link>)}</div>
    </div>
    <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.14em] text-white/35 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Vexora Labs</span><span>Construido con diseño, código y curiosidad.</span><Link href="/">Volver al inicio ↑</Link></div>
  </div></footer>;
}
