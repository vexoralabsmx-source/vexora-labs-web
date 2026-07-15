import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { InteriorPage } from "@/components/layout/interior-page";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteStrip } from "@/components/ui/quote-strip";

export const metadata: Metadata = { title: "Preguntas frecuentes | Vexora Labs", description: "Respuestas claras sobre alcance, pagos, tiempos, soporte, hosting y procesos de Vexora Labs." };

const questions=[
 ["¿Qué incluye una cotización?","Objetivo, alcance, entregables, tiempos, riesgos y opciones. Si algo todavía es incierto, lo dejamos explícito antes de iniciar."],
 ["¿Cuánto tarda una web?","Una landing suele tomar entre 5 y 12 días hábiles. Una web multipágina suele requerir entre 12 y 18 días, según contenido e integraciones."],
 ["¿Los precios son fijos?","Son precios desde. El monto final depende de alcance, urgencia, pantallas, funciones, integraciones y nivel de personalización."],
 ["¿Puedo pagar por partes?","En muchos proyectos sí. Normalmente se trabaja con anticipo y liquidación contra entrega o por hitos definidos."],
 ["¿Incluye dominio y hosting?","No por defecto. Podemos ayudarte a elegirlos y configurarlos; los costos del proveedor se cotizan aparte."],
 ["¿Ofrecen soporte después de entregar?","Sí. Existe una ventana de ajustes y soporte mensual opcional para mantenimiento, mejoras y monitoreo básico."],
 ["¿Hacen bots de Discord personalizados?","Sí. Desde configuraciones avanzadas hasta bots a medida, con permisos claros, logs y medidas contra abuso."],
 ["¿Configuran servidores de Minecraft?","Sí. Plugins, rangos, permisos, economía, backups y optimización según el tipo de servidor."],
 ["¿Pueden mejorar una web existente?","Sí. Auditamos UI, mobile, performance, SEO, copy y conversión para proponer mejoras por etapas."],
 ["¿Garantizan ventas o crecimiento?","No. Podemos mejorar claridad, conversión y eficiencia, pero el resultado depende de la oferta, el mercado y la operación."],
] as const;

export default function FaqPage(){return <InteriorPage><PageHero index="04" eyebrow="FAQ" title={<>Respuestas<br/>sin rodeos.</>} description="Antes de cotizar, aquí tienes las respuestas esenciales sobre alcance, tiempos, pagos y soporte."/><section className="section-shell bg-[#050816]"><div className="v-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><div><p className="tech-label text-cyan-300">10 preguntas clave</p><h2 className="display mt-5 text-4xl md:text-6xl">Claridad desde<br/>el primer mensaje.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/50">Si tu caso no aparece aquí, cuéntanos el objetivo y te damos una respuesta directa.</p><Link href="/contacto" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 text-xs font-bold uppercase tracking-wider text-slate-950">Hacer una pregunta <ArrowUpRight size={15}/></Link></div><div>{questions.map(([question,answer],index)=><details key={question} className="group border-t border-white/10 py-6"><summary className="flex cursor-pointer list-none items-center gap-5"><span className="tech-label text-cyan-300">0{index+1}</span><h2 className="flex-1 text-lg font-medium md:text-2xl">{question}</h2><Plus className="transition group-open:rotate-45" size={20}/></summary><p className="ml-12 mt-5 max-w-2xl text-sm leading-7 text-white/55">{answer}</p></details>)}</div></div></section><QuoteStrip title="¿Tu duda es más específica? Hablemos."/></InteriorPage>;}
