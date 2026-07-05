export type PricingGroup = "starter" | "pro" | "premium" | "elite";

export type PricingTier = {
  id: string;
  group: PricingGroup;
  name: string;
  badge: string;
  priceOneTimeMXN: number;
  priceOneTimeSuffix?: string;
  ideal: string;
  description: string;
  estimatedTime: string;
  includes: string[];
  notIncluded: string[];
};

export const PRICING: PricingTier[] = [
  {
    id: "branding-basico",
    group: "starter",
    name: "Branding Basico",
    badge: "Bajo presupuesto",
    priceOneTimeMXN: 1499,
    ideal: "Emprendedores que necesitan una base visual profesional.",
    description: "Identidad visual inicial para que tu marca deje de verse improvisada.",
    estimatedTime: "2-4 dias",
    includes: ["Paleta de colores", "Tipografias", "Estilo visual base", "Mini guia de marca", "Recomendaciones de uso"],
    notIncluded: ["Logotipo avanzado", "Manual de marca completo", "Piezas impresas"]
  },
  {
    id: "bot-discord-basico",
    group: "starter",
    name: "Bot Discord Basico",
    badge: "Para comunidades",
    priceOneTimeMXN: 1999,
    ideal: "Comunidades que quieren orden sin una configuracion enorme.",
    description: "Bot funcional con estructura inicial para bienvenida, roles y tickets simples.",
    estimatedTime: "3-6 dias",
    includes: ["Configuracion inicial", "Embeds", "Bienvenida", "Roles basicos", "Sistema simple de tickets", "Comandos basicos"],
    notIncluded: ["Integraciones externas", "Dashboard custom", "Moderacion avanzada"]
  },
  {
    id: "minecraft-basico",
    group: "starter",
    name: "Servidor Minecraft Basico",
    badge: "Para comunidades",
    priceOneTimeMXN: 2499,
    ideal: "Servidores nuevos que necesitan una base estable.",
    description: "Configuracion inicial con plugins esenciales, permisos y optimizacion basica.",
    estimatedTime: "4-7 dias",
    includes: ["Configuracion inicial", "Plugins esenciales", "Permisos basicos", "Rangos iniciales", "Spawn/lobby simple", "Optimizacion basica"],
    notIncluded: ["Builds avanzados", "Plugins premium", "Infraestructura dedicada"]
  },
  {
    id: "landing-starter",
    group: "starter",
    name: "Landing Page Starter",
    badge: "Mejor para empezar",
    priceOneTimeMXN: 3499,
    ideal: "Negocios, creadores o campanas que necesitan vender rapido.",
    description: "Una pagina profesional, responsive y clara para presentar una oferta.",
    estimatedTime: "5-8 dias",
    includes: ["1 pagina profesional", "Diseno responsive", "Hero premium", "Secciones principales", "Boton de WhatsApp", "CTA optimizados", "SEO basico"],
    notIncluded: ["Blog", "CMS", "Integraciones complejas"]
  },
  {
    id: "rediseno-uiux",
    group: "pro",
    name: "Rediseno UI/UX",
    badge: "Recomendado",
    priceOneTimeMXN: 4999,
    ideal: "Marcas que ya tienen web, pero se ve vieja o confusa.",
    description: "Auditoria visual y mejora de jerarquia, mobile, copy y conversion.",
    estimatedTime: "6-10 dias",
    includes: ["Auditoria visual", "Mejora de estructura", "Rediseno responsive", "Mejor jerarquia visual", "Mejora de conversion", "Ajustes de copy"],
    notIncluded: ["Rehacer backend", "Migraciones grandes", "Nuevas integraciones"]
  },
  {
    id: "bot-discord-pro",
    group: "pro",
    name: "Bot Discord Pro",
    badge: "Mas vendido",
    priceOneTimeMXN: 5999,
    ideal: "Comunidades con soporte, moderacion y crecimiento activo.",
    description: "Sistema completo de Discord con tickets, logs, permisos y automatizaciones.",
    estimatedTime: "7-12 dias",
    includes: ["Tickets avanzados", "Logs", "Moderacion", "Automatizaciones", "Embeds personalizados", "Roles y permisos", "Configuracion completa del servidor"],
    notIncluded: ["Hosting premium del bot", "Panel web custom", "Sistemas de pago"]
  },
  {
    id: "landing-premium",
    group: "premium",
    name: "Landing Page Premium",
    badge: "Mas vendido",
    priceOneTimeMXN: 6999,
    ideal: "Ofertas que necesitan verse premium desde el primer scroll.",
    description: "Landing con storytelling, confianza, FAQ, CTA avanzado y optimizacion mobile.",
    estimatedTime: "8-12 dias",
    includes: ["Diseno premium personalizado", "Storytelling", "Animaciones ligeras", "Secciones de confianza", "FAQ", "CTA avanzado", "SEO basico", "Optimizacion mobile"],
    notIncluded: ["Checkout propio", "CMS", "Automatizaciones multi-step"]
  },
  {
    id: "web-multipagina",
    group: "premium",
    name: "Web Multipagina",
    badge: "Para negocios",
    priceOneTimeMXN: 9999,
    ideal: "Negocios que necesitan una presencia completa y escalable.",
    description: "Sitio multipagina con UI premium, SEO basico y estructura lista para crecer.",
    estimatedTime: "12-18 dias",
    includes: ["Inicio", "Servicios", "Nosotros", "Proyectos", "Contacto", "Diseno responsive", "UI premium", "SEO basico", "Estructura escalable"],
    notIncluded: ["CMS avanzado", "E-commerce completo", "Licencias/hosting"]
  },
  {
    id: "tienda-online-basica",
    group: "premium",
    name: "Tienda Online Basica",
    badge: "Para vender",
    priceOneTimeMXN: 12999,
    ideal: "Marcas que quieren mostrar productos y recibir pedidos con claridad.",
    description: "Catalogo, producto y flujo de compra externo o WhatsApp segun alcance.",
    estimatedTime: "14-21 dias",
    includes: ["Catalogo", "Pagina de producto", "Carrito o flujo de compra externo", "WhatsApp o checkout segun alcance", "Diseno responsive", "Secciones de confianza", "Estructura clara para vender"],
    notIncluded: ["ERP", "Pasarelas avanzadas", "Inventario complejo"]
  },
  {
    id: "automatizacion-pro",
    group: "premium",
    name: "Automatizacion Pro",
    badge: "Recomendado",
    priceOneTimeMXN: 14999,
    ideal: "Equipos que quieren ahorrar tiempo conectando herramientas.",
    description: "Flujos personalizados con formularios, Discord, correo, bases de datos o herramientas externas.",
    estimatedTime: "2-4 semanas",
    includes: ["Flujo personalizado", "Integraciones con formularios, Discord, correo o herramientas externas", "Base de datos si aplica", "Notificaciones automaticas", "Documentacion basica", "Pruebas del flujo"],
    notIncluded: ["Licencias de terceros", "Mantenimiento continuo", "Procesos no autorizados"]
  },
  {
    id: "web-bot-automatizacion",
    group: "elite",
    name: "Web + Bot + Automatizacion",
    badge: "Proyecto completo",
    priceOneTimeMXN: 17999,
    ideal: "Marcas o comunidades que necesitan un ecosistema conectado.",
    description: "Landing o web profesional conectada a bot y flujo de contacto o ventas.",
    estimatedTime: "3-5 semanas",
    includes: ["Landing o web profesional", "Bot de Discord configurado", "Automatizacion conectada", "Flujo de contacto o ventas", "UI premium", "Soporte inicial"],
    notIncluded: ["Infra dedicada", "SLA 24/7", "Licencias externas"]
  },
  {
    id: "vexora-elite",
    group: "elite",
    name: "Proyecto Vexora Elite",
    badge: "Premium",
    priceOneTimeMXN: 20000,
    priceOneTimeSuffix: "+",
    ideal: "Proyectos que requieren estrategia, diseno, sistemas e integraciones.",
    description: "Experiencia digital completa con UI/UX avanzado, automatizaciones, SEO basico y QA final.",
    estimatedTime: "4-8 semanas",
    includes: ["Web premium completa", "Storytelling profesional", "UI/UX avanzado", "Componentes modernos", "Automatizaciones", "Integraciones", "Optimizacion mobile", "SEO basico", "Sistema escalable segun alcance", "Revision final de calidad"],
    notIncluded: ["Costos de proveedor", "Campanas publicitarias", "Garantias irreales de venta"]
  }
];

export const SUPPORT_ADDON = {
  label: "Soporte mensual (opcional)",
  priceMonthlyFromMXN: 1500,
  includes: [
    "Monitoreo basico + mantenimiento",
    "Ajustes menores (bolsa de horas)",
    "Prioridad de respuesta en dias habiles",
    "Reporte mensual con resumen de cambios"
  ]
};

const PRICING_EN: PricingTier[] = PRICING.map((tier) => ({
  ...tier,
  ideal: "Accessible premium package adapted to scope.",
  description: "Professional digital solution with clear deliverables and lightweight QA.",
  estimatedTime: tier.estimatedTime.replace("dias", "days").replace("semanas", "weeks"),
  notIncluded: ["Provider fees", "Complex custom scope", "Ongoing support unless agreed"]
}));

const SUPPORT_ADDON_EN = {
  label: "Monthly support (optional)",
  priceMonthlyFromMXN: 1500,
  includes: [
    "Basic monitoring + maintenance",
    "Minor changes (hour bank)",
    "Priority response on business days",
    "Monthly change summary"
  ]
};

export const PRICING_NOTE =
  "Los precios son desde y pueden variar segun alcance, urgencia, funciones, integraciones, numero de pantallas, automatizaciones y nivel de personalizacion.";

export function getPricing(locale: "es" | "en") {
  return locale === "en" ? PRICING_EN : PRICING;
}

export function getFeaturedPricing(locale: "es" | "en", limit = 4) {
  const pricing = getPricing(locale);
  const preferred = ["landing-starter", "bot-discord-pro", "landing-premium", "vexora-elite"];
  return preferred.map((id) => pricing.find((tier) => tier.id === id)).filter(Boolean).slice(0, limit) as PricingTier[];
}

export function getSupportAddon(locale: "es" | "en") {
  return locale === "en" ? SUPPORT_ADDON_EN : SUPPORT_ADDON;
}
