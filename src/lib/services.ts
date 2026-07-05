import type { Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/whatsapp";

export type ServiceCategoryId = "web" | "discord" | "minecraft" | "commerce" | "automations" | "branding";

export type Service = {
  id: string;
  title: string;
  category: ServiceCategoryId;
  summary: string;
  idealFor: string;
  priceFromMXN: number;
  estimatedTime: string;
  bullets: string[];
  hrefKey: PageKey;
};

export type ServiceCategory = { id: ServiceCategoryId; label: string };

export function getServiceCategories(locale: Locale): Array<ServiceCategory | { id: "all"; label: string }> {
  const all = locale === "en" ? "All" : "Todos";
  return [
    { id: "all", label: all },
    { id: "web", label: locale === "en" ? "Web / UI-UX" : "Web/UIUX" },
    { id: "commerce", label: locale === "en" ? "Online stores" : "Tiendas" },
    { id: "discord", label: "Discord" },
    { id: "minecraft", label: "Minecraft" },
    { id: "automations", label: locale === "en" ? "Automations" : "Automatizaciones" },
    { id: "branding", label: "Branding" }
  ];
}

const SERVICES_ES: Service[] = [
  {
    id: "landing-pages",
    title: "Landing pages",
    category: "web",
    summary: "Paginas de una sola oferta para negocios, creadores, eventos, marcas personales y campanas.",
    idealFor: "Lanzamientos y captacion",
    priceFromMXN: 3499,
    estimatedTime: "5-12 dias",
    bullets: ["Hero premium", "Copy de conversion", "CTA visibles", "SEO basico"],
    hrefKey: "web"
  },
  {
    id: "web-completa",
    title: "Paginas web completas",
    category: "web",
    summary: "Sitios multipagina con secciones profesionales, responsive, SEO basico y estructura escalable.",
    idealFor: "Negocios y agencias",
    priceFromMXN: 9999,
    estimatedTime: "12-18 dias",
    bullets: ["Inicio/servicios/contacto", "UI premium", "Arquitectura clara", "Performance"],
    hrefKey: "web"
  },
  {
    id: "tiendas-online",
    title: "Tiendas online",
    category: "commerce",
    summary: "Catalogo, producto, carrito o flujo externo, WhatsApp o checkout segun el alcance.",
    idealFor: "Productos digitales o fisicos",
    priceFromMXN: 12999,
    estimatedTime: "14-21 dias",
    bullets: ["Catalogo", "Producto", "Flujo de compra", "Confianza para vender"],
    hrefKey: "web"
  },
  {
    id: "bots-discord",
    title: "Bots de Discord",
    category: "discord",
    summary: "Tickets, moderacion, embeds, roles, logs, automatizaciones y comandos para comunidades.",
    idealFor: "Comunidades activas",
    priceFromMXN: 1999,
    estimatedTime: "3-12 dias",
    bullets: ["Tickets", "Roles y permisos", "Logs", "Embeds personalizados"],
    hrefKey: "discord"
  },
  {
    id: "servidores-minecraft",
    title: "Servidores de Minecraft",
    category: "minecraft",
    summary: "Configuracion, plugins, rangos, economia, lobby, permisos y optimizacion basica.",
    idealFor: "Comunidades y networks",
    priceFromMXN: 2499,
    estimatedTime: "4-14 dias",
    bullets: ["Plugins esenciales", "Permisos", "Rangos", "Optimizacion TPS"],
    hrefKey: "minecraft"
  },
  {
    id: "automatizaciones",
    title: "Automatizaciones",
    category: "automations",
    summary: "Formularios, Discord, WhatsApp, correos, bases de datos y flujos internos conectados.",
    idealFor: "Equipos que pierden tiempo manual",
    priceFromMXN: 14999,
    estimatedTime: "2-4 semanas",
    bullets: ["Flujos validados", "Notificaciones", "Integraciones", "Documentacion"],
    hrefKey: "servicios"
  },
  {
    id: "uiux-rediseno",
    title: "UI/UX y redisenos",
    category: "web",
    summary: "Mejora visual, estructura, experiencia movil y conversion de una web existente.",
    idealFor: "Webs que ya existen",
    priceFromMXN: 4999,
    estimatedTime: "6-10 dias",
    bullets: ["Auditoria visual", "Jerarquia", "Mobile-first", "Mejor copy"],
    hrefKey: "web"
  },
  {
    id: "branding-digital",
    title: "Branding digital basico",
    category: "branding",
    summary: "Identidad visual ligera: paleta, tipografias, estilo, banners y presentacion online.",
    idealFor: "Marcas nuevas",
    priceFromMXN: 1499,
    estimatedTime: "2-4 dias",
    bullets: ["Paleta", "Tipografia", "Mini guia", "Recomendaciones de uso"],
    hrefKey: "servicios"
  }
];

const SERVICES_EN: Service[] = SERVICES_ES.map((service) => ({
  ...service,
  summary: "Premium, practical digital service with clear scope, responsive delivery, and lightweight QA.",
  idealFor: "Small businesses, creators, and communities",
  estimatedTime: service.estimatedTime.replace("dias", "days").replace("semanas", "weeks"),
  bullets: ["Clear scope", "Responsive UX", "Documented handoff", "Conversion focus"]
}));

export function getServices(locale: Locale) {
  return locale === "en" ? SERVICES_EN : SERVICES_ES;
}

export const SERVICES = SERVICES_ES;
