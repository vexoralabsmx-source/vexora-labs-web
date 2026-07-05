export type CaseStudy = {
  title: string;
  type: string;
  problem: string;
  solution: string;
  metrics: string[];
  stack: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Landing premium para marca de ropa",
    type: "Landing page / Conversion",
    problem: "La marca vendia por redes, pero no tenia una pagina clara para presentar colecciones, confianza y contacto.",
    solution: "Creamos una landing con hero fuerte, catalogo destacado, CTA a WhatsApp y secciones de confianza.",
    metrics: ["Marca mejor presentada", "Flujo de contacto mas claro", "Mobile optimizado para campanas"],
    stack: ["Astro", "SEO basico", "WhatsApp CTA", "UI premium"]
  },
  {
    title: "Bot de Discord para comunidad",
    type: "Discord systems",
    problem: "Los tickets, roles y mensajes de bienvenida estaban dispersos y generaban trabajo manual.",
    solution: "Configuramos tickets, embeds, roles, logs y comandos base con permisos limpios.",
    metrics: ["Soporte mas ordenado", "Menos errores de permisos", "Moderacion con trazabilidad"],
    stack: ["Bot", "Tickets", "Roles", "Logs"]
  },
  {
    title: "Tienda digital para productos online",
    type: "E-commerce starter",
    problem: "El negocio necesitaba mostrar productos y recibir pedidos sin montar una plataforma costosa de entrada.",
    solution: "Construimos catalogo, producto, secciones de confianza y flujo de compra por WhatsApp.",
    metrics: ["Productos mas faciles de comparar", "Contacto directo", "Base lista para checkout futuro"],
    stack: ["Catalogo", "Producto", "WhatsApp", "SEO basico"]
  },
  {
    title: "Servidor Minecraft configurado",
    type: "Minecraft infra",
    problem: "El servidor tenia plugins sin estructura, permisos inconsistentes y riesgo de lag en picos.",
    solution: "Ordenamos plugins, rangos, permisos, lobby simple, backups y optimizacion inicial.",
    metrics: ["Base mas estable", "Permisos mas claros", "Operaciones documentadas"],
    stack: ["Plugins", "Permisos", "Backups", "Runbook"]
  },
  {
    title: "Dashboard/admin basico",
    type: "Internal tools",
    problem: "El equipo llevaba solicitudes y estados en mensajes sueltos sin una vista clara.",
    solution: "Disenamos una interfaz simple para revisar estados, acciones y datos relevantes.",
    metrics: ["Operacion mas visible", "Menos seguimiento manual", "Mejor priorizacion"],
    stack: ["UI/UX", "Admin", "Estados", "Acciones"]
  },
  {
    title: "Web para agencia o negocio local",
    type: "Web multipagina",
    problem: "El negocio tenia presencia dispersa y no comunicaba servicios, precios ni proceso de forma confiable.",
    solution: "Creamos una web multipagina con servicios, proceso, proyectos, FAQ y CTA de cotizacion.",
    metrics: ["Oferta mas clara", "Precios visibles", "Mejor confianza en mobile"],
    stack: ["Astro", "Responsive", "SEO basico", "Copy de conversion"]
  }
];

const CASE_STUDIES_EN: CaseStudy[] = CASE_STUDIES.map((item) => ({
  ...item,
  problem: "The project needed a clearer, more professional digital experience.",
  solution: "We designed a premium, responsive, conversion-focused solution with documented handoff.",
  metrics: ["Clearer offer", "Better mobile experience", "More organized delivery"]
}));

export function getCaseStudies(locale: "es" | "en") {
  return locale === "en" ? CASE_STUDIES_EN : CASE_STUDIES;
}
