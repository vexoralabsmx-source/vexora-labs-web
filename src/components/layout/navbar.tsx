"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
export function Navbar() {
  const pathname=usePathname();
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll=()=>setScrolled(window.scrollY>window.innerHeight*.8);
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  useEffect(() => {
    document.body.style.overflow=open?"hidden":"";
    const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false);};
    window.addEventListener("keydown",key); if(open) closeRef.current?.focus();
    return()=>{window.removeEventListener("keydown",key);document.body.style.overflow="";};
  },[open]);
  return <>
    <header className={`fixed left-1/2 top-3 z-50 flex w-[min(calc(100%-1.25rem),1400px)] -translate-x-1/2 items-center justify-between rounded-full px-3 py-2 transition duration-500 ${scrolled?"glass":"border border-transparent"}`}>
      <Link href="/" aria-label="Vexora Labs, inicio" className="flex items-center gap-2">
        <Image src="/brand/vexora-logo.png" alt="" width={38} height={38} className="h-9 w-9 object-contain" priority />
        <span className="hidden text-xs font-semibold uppercase tracking-[.18em] sm:block">Vexora Labs</span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">{navigation.map(item=><Link key={item.href} href={item.href} className={"text-[11px] uppercase tracking-[.14em] transition hover:text-white "+(pathname===item.href?"text-cyan-200":"text-white/55")}>{item.label}</Link>)}</nav>
      <div className="flex items-center gap-2"><Link href="/contacto" className="hidden min-h-10 items-center rounded-full bg-white px-4 text-[10px] font-bold uppercase tracking-[.16em] text-slate-950 sm:inline-flex">Iniciar proyecto</Link><button onClick={()=>setOpen(true)} aria-label="Abrir menú" aria-expanded={open} className="grid size-10 place-items-center rounded-full border border-white/15"><Menu size={17}/></button></div>
    </header>
    <div className={`fixed inset-0 z-[80] bg-[#030712] transition-[clip-path,opacity,visibility] duration-700 ${open?"visible opacity-100 [clip-path:inset(0)]":"invisible pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"}`} aria-hidden={!open}>
      <div className="v-container flex h-full flex-col py-5">
        <div className="flex items-center justify-between"><Image src="/brand/vexora-logo.png" width={54} height={54} alt="Vexora Labs" className="h-12 w-auto object-contain"/><button ref={closeRef} onClick={()=>setOpen(false)} aria-label="Cerrar menú" className="grid size-12 place-items-center rounded-full border border-white/15"><X/></button></div>
        <nav aria-label="Menú" className="my-auto">{navigation.map(item=><Link onClick={()=>setOpen(false)} key={item.href} href={item.href} className="group flex items-center gap-5 border-b border-white/10 py-4"><span className="tech-label text-cyan-300">{item.number}</span><span className="display text-[clamp(2.1rem,7vw,6rem)] text-white/70 transition group-hover:translate-x-3 group-hover:text-white">{item.label}</span><span className="ml-auto hidden text-sm text-white/35 md:block">{item.description}</span></Link>)}</nav>
        <p className="tech-label">Vexoralabs.shop / México</p>
      </div>
    </div>
  </>;
}
