import type { Locale } from "@/lib/i18n";

export type SupportEntry = {
  id: string;
  category: "pricing" | "process" | "support" | "technical" | "legal";
  q: string;
  a: string[];
  keywords?: string[];
};

export type SupportKB = {
  title: string;
  intro: string;
  entries: SupportEntry[];
  quickTopics: Array<{ label: string; query: string }>;
  coupon?: {
    code: string;
    label: string;
    terms: string[];
    secretWords: string[];
  };
};

const KB_ES: SupportKB = {
  title: "Soporte",
  intro: "Respuestas predefinidas (no IA). Escribe tu duda o elige un tema.",
  quickTopics: [
    { label: "Precios", query: "precios" },
    { label: "Tiempos", query: "tiempo de entrega" },
    { label: "Soporte mensual", query: "soporte mensual" },
    { label: "Pagos", query: "formas de pago" },
    { label: "Hosting", query: "hosting dominio" }
  ],
  coupon: {
    code: "VEXORA-NEON15",
    label: "Cupón NEON (-15%)",
    secretWords: ["neon", "vexora neon", "cupón neon", "cupon neon"],
    terms: [
      "Aplica sobre mano de obra (no incluye hosting, dominios, licencias, proveedores).",
      "Válido solo para nuevos proyectos cotizados por WhatsApp.",
      "Se confirma en la propuesta final."
    ]
  },
  entries: [
    {
      id: "pricing-how",
      category: "pricing",
      q: "¿Cómo cotizan los proyectos?",
      a: [
        "Cotizamos por impacto + complejidad + riesgo (no por “número de horas” solamente).",
        "Primero definimos objetivo, alcance y restricciones. Después enviamos propuesta con entregables, timeline y costo."
      ],
      keywords: ["cotizacion", "cotizar", "precio", "paquetes", "propuesta", "alcance"]
    },
    {
      id: "pricing-currency",
      category: "pricing",
      q: "¿Puedo ver precios en MXN, USD y EUR?",
      a: [
        "Sí: el selector de moneda convierte desde MXN con un tipo de cambio estimado.",
        "La propuesta final confirma la moneda y el tipo de cambio aplicado."
      ],
      keywords: ["mxn", "usd", "eur", "moneda", "tipo de cambio", "cambio", "conversion"]
    },
    {
      id: "timeline",
      category: "process",
      q: "¿Cuánto tarda un proyecto?",
      a: [
        "Depende del alcance. Un landing premium puede ser rápido; un sitio multipágina + integraciones toma más.",
        "En la propuesta incluimos milestones, revisiones y fecha estimada de entrega."
      ],
      keywords: ["tiempo", "entrega", "timeline", "fechas", "milestones"]
    },
    {
      id: "process-steps",
      category: "process",
      q: "¿Cuál es el proceso de trabajo?",
      a: [
        "1) Brief + objetivo, 2) Alcance + arquitectura, 3) Diseño/UX, 4) Implementación, 5) QA + performance/SEO, 6) Handoff.",
        "Trabajamos con checklist y entregables claros para que puedas operar sin fricción."
      ],
      keywords: ["proceso", "pasos", "workflow", "como trabajan", "handoff"]
    },
    {
      id: "support-monthly",
      category: "support",
      q: "¿Qué incluye el soporte mensual?",
      a: [
        "Mantenimiento + QA básico, cambios menores (banco de horas), y respuesta prioritaria en días hábiles.",
        "También podemos incluir monitoreo y reportes según el plan."
      ],
      keywords: ["soporte", "mensual", "mantenimiento", "cambios", "monitoreo"]
    },
    {
      id: "payments",
      category: "pricing",
      q: "¿Qué formas de pago manejan?",
      a: [
        "Se define en la propuesta. Normalmente manejamos anticipo + entregas por milestone.",
        "Si necesitas facturación o condiciones específicas, lo vemos desde el inicio."
      ],
      keywords: ["pago", "pagos", "anticipo", "factura", "milestone", "metodo"]
    },
    {
      id: "hosting-domain",
      category: "technical",
      q: "¿Incluye hosting y dominio?",
      a: [
        "Normalmente no están incluidos a menos que se acuerde explícitamente.",
        "Podemos recomendar opciones y dejar todo documentado para que lo controles tú."
      ],
      keywords: ["hosting", "dominio", "servidor", "deploy", "cloud", "vps"]
    },
    {
      id: "stack",
      category: "technical",
      q: "¿Con qué tecnología está hecho el sitio?",
      a: [
        "Este sitio está hecho con Astro + TypeScript (static-first) para performance, SEO y mantenimiento.",
        "Si tu proyecto necesita backend, se define según el caso."
      ],
      keywords: ["astro", "typescript", "stack", "tecnologia", "framework", "backend"]
    },
    {
      id: "seo",
      category: "technical",
      q: "¿Incluye SEO?",
      a: [
        "Incluimos SEO técnico (metas, titles, OG, sitemap/robots) y performance.",
        "SEO de contenido (redacción, blog, estrategia) se define según alcance."
      ],
      keywords: ["seo", "metas", "og", "sitemap", "robots", "performance"]
    },
    {
      id: "ethics",
      category: "legal",
      q: "¿Hacen hacks, spam o accesos no autorizados?",
      a: [
        "No. Solo trabajamos con rutas legales y seguras (hardening, UX, performance, automatizaciones permitidas).",
        "Si algo cae en lo ilegal o riesgoso, lo rechazamos."
      ],
      keywords: ["hack", "hacks", "spam", "ilegal", "acceso", "unauthorized"]
    }
  ]
};

const KB_EN: SupportKB = {
  title: "Support",
  intro: "Pre-written answers (not AI). Type your question or pick a topic.",
  quickTopics: [
    { label: "Pricing", query: "pricing" },
    { label: "Timeline", query: "delivery time" },
    { label: "Monthly support", query: "monthly support" },
    { label: "Payments", query: "payment" },
    { label: "Hosting", query: "hosting domain" }
  ],
  coupon: {
    code: "VEXORA-NEON15",
    label: "NEON coupon (-15%)",
    secretWords: ["neon", "vexora neon", "neon coupon", "discount neon"],
    terms: [
      "Applies to labor only (excludes hosting, domains, licenses, providers).",
      "Valid for new projects quoted via WhatsApp.",
      "Final applicability is confirmed in the proposal."
    ]
  },
  entries: [
    {
      id: "pricing-how",
      category: "pricing",
      q: "How do you price projects?",
      a: [
        "We price by impact + complexity + risk (not only “hours”).",
        "We align on goal and scope, then send a proposal with deliverables, timeline, and cost."
      ],
      keywords: ["quote", "pricing", "packages", "proposal", "scope"]
    },
    {
      id: "pricing-currency",
      category: "pricing",
      q: "Can I view prices in MXN, USD, and EUR?",
      a: [
        "Yes: the currency selector converts from MXN using an estimated exchange rate.",
        "The final proposal confirms the currency and exchange rate used."
      ],
      keywords: ["mxn", "usd", "eur", "currency", "exchange", "rate", "conversion"]
    },
    {
      id: "timeline",
      category: "process",
      q: "How long does a project take?",
      a: [
        "It depends on scope. A premium landing can be fast; a multi-page site + integrations takes longer.",
        "The proposal includes milestones, review rounds, and estimated delivery date."
      ],
      keywords: ["timeline", "delivery", "how long", "time", "milestones"]
    },
    {
      id: "process-steps",
      category: "process",
      q: "What’s your process?",
      a: [
        "1) Brief + goal, 2) Scope + architecture, 3) UX/design, 4) Implementation, 5) QA + performance/SEO, 6) Handoff.",
        "We work with checklists and clear deliverables so you can operate without friction."
      ],
      keywords: ["process", "steps", "workflow", "handoff"]
    },
    {
      id: "support-monthly",
      category: "support",
      q: "What’s included in monthly support?",
      a: [
        "Maintenance + basic QA, minor changes (hour bank), and priority response on business days.",
        "Monitoring and reports can be added depending on the plan."
      ],
      keywords: ["support", "monthly", "maintenance", "changes", "monitoring"]
    },
    {
      id: "payments",
      category: "pricing",
      q: "What payment options do you offer?",
      a: [
        "It’s defined in the proposal. Typically we do a deposit + milestone-based payments.",
        "If you need invoicing or special terms, we align upfront."
      ],
      keywords: ["payment", "deposit", "invoice", "milestone"]
    },
    {
      id: "hosting-domain",
      category: "technical",
      q: "Does it include hosting and domain?",
      a: [
        "Usually not unless explicitly agreed.",
        "We can recommend options and document everything so you keep control."
      ],
      keywords: ["hosting", "domain", "server", "deploy", "cloud"]
    },
    {
      id: "stack",
      category: "technical",
      q: "What tech stack do you use?",
      a: [
        "This website is built with Astro + TypeScript (static-first) for performance, SEO, and maintainability.",
        "If your project needs a backend, we define it case by case."
      ],
      keywords: ["astro", "typescript", "stack", "framework", "backend"]
    },
    {
      id: "seo",
      category: "technical",
      q: "Do you include SEO?",
      a: [
        "We include technical SEO (metas, titles, OG, sitemap/robots) and performance.",
        "Content SEO (copy, blog, strategy) is scoped as needed."
      ],
      keywords: ["seo", "meta", "og", "sitemap", "robots", "performance"]
    },
    {
      id: "ethics",
      category: "legal",
      q: "Do you do hacks, spam, or unauthorized access?",
      a: [
        "No. We only work with legal, safe routes (hardening, UX, performance, allowed automations).",
        "If something is illegal or risky, we decline."
      ],
      keywords: ["hack", "spam", "illegal", "unauthorized", "access"]
    }
  ]
};

export function getSupportKB(locale: Locale): SupportKB {
  return locale === "en" ? KB_EN : KB_ES;
}
