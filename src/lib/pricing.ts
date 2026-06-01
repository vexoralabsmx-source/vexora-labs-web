export type PricingTier = {
  id: "starter" | "core" | "scale";
  name: string;
  priceOneTimeMXN: number;
  priceOneTimeSuffix?: string;
  ideal: string;
  includes: string[];
  notIncluded: string[];
};

export const PRICING: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceOneTimeMXN: 7900,
    ideal: "Para lanzar rapido con base solida y sin deuda tecnica.",
    includes: [
      "1 objetivo principal (ventas / captacion / soporte)",
      "Landing premium (1 pagina) + SEO base",
      "Copy de conversion (ES-MX)",
      "Performance y accesibilidad (mejores practicas)",
      "Entrega con checklist + handoff"
    ],
    notIncluded: ["Integraciones complejas", "Automatizaciones multi-canal", "Soporte continuo (opcional)"]
  },
  {
    id: "core",
    name: "Core",
    priceOneTimeMXN: 14900,
    ideal: "Para operar multipagina y sistemas con claridad y control.",
    includes: [
      "Web multipagina (hasta 8 secciones/paginas clave)",
      "Sistema de componentes + UI consistente",
      "SEO tecnico (titles, metas, OG, sitemap/robots)",
      "Animaciones reveal + micro-interacciones",
      "1 integracion (formularios/CRM/analytics) con QA"
    ],
    notIncluded: ["WhatsApp Business API (fees del proveedor)", "Infra avanzada (custom)", "Soporte 24/7"]
  },
  {
    id: "scale",
    name: "Scale",
    priceOneTimeMXN: 26000,
    ideal: "Para equipos que necesitan arquitectura, procesos y seguridad primero.",
    includes: [
      "Arquitectura multipagina + contenido y flows completos",
      "Automatizaciones (multi-step) con logging basico",
      "Discord/Minecraft hardening (si aplica)",
      "Playbooks + documentacion operativa",
      "QA de performance + accesibilidad + seguridad basica"
    ],
    notIncluded: ["Hacks/spam/acciones no autorizadas (no hacemos)", "Garantias irreales de ventas", "Licencias/hosting"]
  }
];

export const SUPPORT_ADDON = {
  label: "Soporte mensual (opcional)",
  priceMonthlyFromMXN: 1500,
  includes: [
    "Monitoreo basico + mantenimiento",
    "Ajustes menores (bolsa de horas)",
    "Prioridad de respuesta (dias habiles)",
    "Reportes mensuales (resumen)"
  ]
};

const PRICING_EN: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceOneTimeMXN: 7900,
    ideal: "For launching fast with a solid baseline and no technical debt.",
    includes: [
      "1 main goal (sales / acquisition / support)",
      "Premium landing page (1 page) + basic SEO",
      "Conversion-focused copy (EN)",
      "Performance & accessibility (best practices)",
      "Delivery checklist + handoff"
    ],
    notIncluded: ["Complex integrations", "Multi-channel automations", "Ongoing support (optional)"]
  },
  {
    id: "core",
    name: "Core",
    priceOneTimeMXN: 14900,
    ideal: "For multi-page operations and systems with clarity and control.",
    includes: [
      "Multi-page website (up to 8 key pages/sections)",
      "Component system + consistent UI",
      "Technical SEO (titles, metas, OG, sitemap/robots)",
      "Reveal animations + micro-interactions",
      "1 integration (forms/CRM/analytics) with QA"
    ],
    notIncluded: ["WhatsApp Business API (provider fees)", "Advanced infra (custom)", "24/7 support"]
  },
  {
    id: "scale",
    name: "Scale",
    priceOneTimeMXN: 26000,
    ideal: "For teams that need architecture, processes, and security first.",
    includes: [
      "Multi-page architecture + full content and flows",
      "Automations (multi-step) with basic logging",
      "Discord/Minecraft hardening (if applicable)",
      "Playbooks + operational documentation",
      "Performance + accessibility + basic security QA"
    ],
    notIncluded: ["Hacks/spam/unauthorized actions (we don't do)", "Unrealistic sales guarantees", "Licenses/hosting"]
  }
];

const SUPPORT_ADDON_EN = {
  label: "Monthly support (optional)",
  priceMonthlyFromMXN: 1500,
  includes: [
    "Basic monitoring + maintenance",
    "Minor changes (hour bank)",
    "Priority response (business days)",
    "Monthly reports (summary)"
  ]
};

export function getPricing(locale: "es" | "en") {
  return locale === "en" ? PRICING_EN : PRICING;
}

export function getSupportAddon(locale: "es" | "en") {
  return locale === "en" ? SUPPORT_ADDON_EN : SUPPORT_ADDON;
}
