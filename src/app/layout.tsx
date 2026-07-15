import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import "./globals.css";
import "./vexora.css";
const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});
const faviconUrl="https://res.cloudinary.com/dakjhsfne/image/upload/v1780275926/vexoralabslogo_rp8wie.png";
export const metadata:Metadata={
 metadataBase:new URL(siteConfig.url),
 title:"Vexora Labs — Diseño, desarrollo y tecnología que se siente premium",
 description:"Vexora Labs crea páginas web, interfaces, automatizaciones, bots, branding y experiencias digitales diseñadas para convertir ideas en productos reales.",
 alternates:{canonical:"/"},
 icons:{icon:faviconUrl,apple:faviconUrl},
 openGraph:{title:"Vexora Labs — Tu idea puede verse premium",description:siteConfig.description,url:siteConfig.url,siteName:siteConfig.name,images:[{url:"/brand/vexora-logo.png",width:1000,height:1000}],locale:"es_MX",type:"website"},
 twitter:{card:"summary_large_image",title:"Vexora Labs",description:siteConfig.description,images:["/brand/vexora-logo.png"]},
};
const schema={"@context":"https://schema.org","@type":"ProfessionalService",name:siteConfig.name,url:siteConfig.url,logo:`${siteConfig.url}/brand/vexora-logo.png`,description:siteConfig.description};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} antialiased`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>{children}</body></html>;}
