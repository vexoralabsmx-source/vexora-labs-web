import type { Metadata } from "next";
import { Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { InteriorPage } from "@/components/layout/interior-page";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectContactForm } from "@/components/forms/project-contact-form";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = { title: "Contacto y cotización | Vexora Labs", description: "Comparte objetivo, plazo y presupuesto aproximado para recibir un siguiente paso claro." };

export default function ContactPage(){
 const whatsapp=siteConfig.whatsapp?"https://wa.me/"+siteConfig.whatsapp:"";
 return <InteriorPage><PageHero index="05" eyebrow="Contacto" title={<>Construyamos<br/>algo real.</>} description="Comparte el objetivo, el plazo y un presupuesto aproximado. Te ayudamos a convertirlo en alcance, etapas y una propuesta clara."/>
  <section className="section-shell bg-[#050816]"><div className="v-container grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><aside className="space-y-4"><div className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><MessageCircle className="text-cyan-300" size={22}/><h2 className="mt-6 text-xl font-medium">Respuesta directa</h2><p className="mt-3 text-sm leading-6 text-white/50">Sin formularios eternos ni llamadas obligatorias. Si WhatsApp está configurado, también puedes escribir por ahí.</p>{whatsapp&&<a href={whatsapp} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-xs uppercase tracking-wider text-cyan-200">Abrir WhatsApp →</a>}</div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><Clock3 className="text-purple-300" size={22}/><h2 className="mt-6 text-xl font-medium">Horario base CDMX</h2><p className="mt-3 text-sm leading-6 text-white/50">Lun–Vie 07:00–23:00<br/>Sáb 10:00–20:00<br/>Domingo cerrado</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><ShieldCheck className="text-emerald-300" size={22}/><h2 className="mt-6 text-xl font-medium">Datos mínimos</h2><p className="mt-3 text-sm leading-6 text-white/50">Solo usamos la información necesaria para revisar y responder tu solicitud.</p></div></aside><div className="glass rounded-[2rem] p-5 md:p-9"><div className="mb-8 border-b border-white/10 pb-7"><p className="tech-label text-cyan-300">Brief inicial</p><h2 className="display mt-4 text-4xl md:text-6xl">Cuéntanos qué necesitas.</h2></div><ProjectContactForm/></div></div></section>
 </InteriorPage>;
}
