import type { MetadataRoute } from "next";
const routes=["","/servicios","/precios","/proyectos","/faq","/contacto"];
export default function sitemap():MetadataRoute.Sitemap{return routes.map((route,index)=>({url:"https://vexoralabs.shop"+route,lastModified:new Date(),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:.8}));}