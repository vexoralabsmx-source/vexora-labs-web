"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
const types=["Página web","Plataforma","UI/UX","Automatización","Bot de Discord","Comunidad","Branding","Experiencia interactiva","Otro"];
const budgets=["Aún no lo sé","Menos de $5,000 MXN","$5,000–$10,000 MXN","$10,000–$25,000 MXN","$25,000–$50,000 MXN","Más de $50,000 MXN"];
const fieldClass="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[.045] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50";
const whatsappNumber="522203309762";
export function ProjectContactForm(){
 const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<ContactInput>({resolver:zodResolver(contactSchema),defaultValues:{name:"",brand:"",contact:"",type:"",budget:"",description:"",idealDate:"",website:""}});
 const [status,setStatus]=React.useState<"idle"|"success"|"error">("idle");const [message,setMessage]=React.useState("");
 const submit=(data:ContactInput)=>{setStatus("idle");if(data.website)return;const text=[
  "Hola Vexora Labs, quiero enviar un proyecto.",
  "",
  `Nombre: ${data.name}`,
  `Proyecto o marca: ${data.brand}`,
  `Contacto: ${data.contact}`,
  `Tipo de proyecto: ${data.type}`,
  `Presupuesto aproximado: ${data.budget}`,
  `Fecha ideal: ${data.idealDate || "No indicada"}`,
  "",
  `Descripción: ${data.description}`,
 ].join("\n");window.location.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;setStatus("success");setMessage("Abriendo WhatsApp con tu proyecto listo para enviar.");reset();};
 return <form onSubmit={handleSubmit(submit)} className="grid gap-5 sm:grid-cols-2" noValidate>
  <Field label="Nombre" id="name" error={errors.name?.message}><input id="name" className={fieldClass} placeholder="Tu nombre" {...register("name")}/></Field>
  <Field label="Proyecto o marca" id="brand" error={errors.brand?.message}><input id="brand" className={fieldClass} placeholder="Nombre del proyecto" {...register("brand")}/></Field>
  <Field wide label="Correo o medio de contacto" id="contact" error={errors.contact?.message}><input id="contact" className={fieldClass} placeholder="correo@ejemplo.com o @usuario" {...register("contact")}/></Field>
  <Field label="Tipo de proyecto" id="type" error={errors.type?.message}><select id="type" className={fieldClass} {...register("type")}><option value="">Selecciona</option>{types.map(item=><option key={item}>{item}</option>)}</select></Field>
  <Field label="Presupuesto aproximado" id="budget" error={errors.budget?.message}><select id="budget" className={fieldClass} {...register("budget")}><option value="">Selecciona</option>{budgets.map(item=><option key={item}>{item}</option>)}</select></Field>
  <Field wide label="Descripción" id="description" error={errors.description?.message}><textarea id="description" rows={6} className={fieldClass} placeholder="¿Qué quieres construir y qué necesita resolver?" {...register("description")}/></Field>
  <Field label="Fecha ideal" id="idealDate"><input id="idealDate" type="date" className={fieldClass} {...register("idealDate")}/></Field>
  <div className="sr-only" aria-hidden><label htmlFor="website">Sitio web</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")}/></div>
  <div className="flex items-end sm:justify-end"><button disabled={isSubmitting} className="min-h-12 w-full rounded-full bg-cyan-300 px-6 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-white sm:w-auto">{isSubmitting?"Abriendo…":"Enviar por WhatsApp"}</button></div>
  <div className="sm:col-span-2" aria-live="polite">{status!=="idle"&&<p className={`rounded-xl border p-4 text-sm ${status==="success"?"border-emerald-400/30 bg-emerald-400/10 text-emerald-200":"border-red-400/30 bg-red-400/10 text-red-200"}`}>{message}</p>}</div>
 </form>;
}
function Field({label,id,error,children,wide=false}:{label:string;id:string;error?:string;children:React.ReactNode;wide?:boolean}){return <div className={wide?"sm:col-span-2":""}><label htmlFor={id} className="text-xs uppercase tracking-wider text-white/60">{label}</label>{children}{error&&<p className="mt-2 text-xs text-red-300">{error}</p>}</div>;}
