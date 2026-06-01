import type { Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/whatsapp";

export type ServiceCategoryId = "web" | "discord" | "minecraft" | "whatsapp" | "automations";

export type Service = {
  id: string;
  title: string;
  category: ServiceCategoryId;
  summary: string;
  bullets: string[];
  hrefKey: PageKey;
};

export type ServiceCategory = { id: ServiceCategoryId; label: string };

export function getServiceCategories(locale: Locale): Array<ServiceCategory | { id: "all"; label: string }> {
  const all = locale === "en" ? "All" : "Todos";
  return [
    { id: "all", label: all },
    { id: "web", label: locale === "en" ? "Web / UI-UX" : "Web/UIUX" },
    { id: "discord", label: "Discord" },
    { id: "minecraft", label: "Minecraft" },
    { id: "whatsapp", label: locale === "en" ? "WhatsApp + AI" : "WhatsApp+IA" },
    { id: "automations", label: locale === "en" ? "Automations" : "Automatizaciones" }
  ];
}

const SERVICES_ES: Service[] = [
  {
    id: "web-premium",
    title: "Web premium (UI, performance y SEO)",
    category: "web",
    summary: "Landing o multipagina ultra rapida con copy de conversion, accesibilidad y SEO tecnico.",
    bullets: ["Core Web Vitals", "Componentes reutilizables", "SEO + OG + sitemap", "Animacion sutil y precisa"],
    hrefKey: "web"
  },
  {
    id: "discord-systems",
    title: "Discord systems (bots + moderacion)",
    category: "discord",
    summary: "Automod, antiraid, tickets, logs y experiencia de onboarding clara (sin caos).",
    bullets: ["Permisos y roles", "Tickets + forms", "Anti-raid y rate-limits", "Logs auditables"],
    hrefKey: "discord"
  },
  {
    id: "minecraft-infra",
    title: "Minecraft (infra + optimizacion)",
    category: "minecraft",
    summary: "Setups estables: plugins, seguridad, backups, tuning y despliegues replicables.",
    bullets: ["Optimizar TPS", "Hardening basico", "Backups + rollback", "Guia de operacion"],
    hrefKey: "minecraft"
  },
  {
    id: "whatsapp-ia",
    title: "WhatsApp + IA (flujos permitidos)",
    category: "whatsapp",
    summary: "Atencion y ventas con integraciones oficiales (WhatsApp Business API) y automatizaciones medibles.",
    bullets: ["Ruteo de conversaciones", "Etiquetas + CRM", "Respuestas asistidas por IA", "Metricas y QA"],
    hrefKey: "whatsapp"
  },
  {
    id: "automation-stack",
    title: "Automatizaciones (operacion y soporte)",
    category: "automations",
    summary: "Conectamos herramientas para reducir friccion: formularios, CRMs, alertas, reportes y handoff humano.",
    bullets: ["Flujos con validacion", "Alertas y dashboards", "Auditoria basica", "Documentacion"],
    hrefKey: "servicios"
  }
];

const SERVICES_EN: Service[] = [
  {
    id: "web-premium",
    title: "Premium website (UI, performance & SEO)",
    category: "web",
    summary: "Landing or multi-page site built for speed, conversion copy, accessibility, and technical SEO.",
    bullets: ["Core Web Vitals", "Reusable components", "SEO + OG + sitemap", "Subtle, precise motion"],
    hrefKey: "web"
  },
  {
    id: "discord-systems",
    title: "Discord systems (bots + moderation)",
    category: "discord",
    summary: "Automod, anti-raid, tickets, logs, and clean onboarding (no chaos).",
    bullets: ["Roles & permissions", "Tickets + forms", "Anti-raid + rate limits", "Auditable logs"],
    hrefKey: "discord"
  },
  {
    id: "minecraft-infra",
    title: "Minecraft (infra + optimization)",
    category: "minecraft",
    summary: "Stable setups: plugins, security basics, backups, tuning, and reproducible deployments.",
    bullets: ["TPS optimization", "Basic hardening", "Backups + rollback", "Operations guide"],
    hrefKey: "minecraft"
  },
  {
    id: "whatsapp-ia",
    title: "WhatsApp + AI (compliant flows)",
    category: "whatsapp",
    summary: "Sales/support flows with official integrations (WhatsApp Business API) and measurable automation.",
    bullets: ["Conversation routing", "Tags + CRM", "AI-assisted replies", "Metrics + QA"],
    hrefKey: "whatsapp"
  },
  {
    id: "automation-stack",
    title: "Automations (ops + support)",
    category: "automations",
    summary: "We connect tools to reduce friction: forms, CRMs, alerts, reports, and human handoff.",
    bullets: ["Validated flows", "Alerts + dashboards", "Basic audit trail", "Documentation"],
    hrefKey: "servicios"
  }
];

export function getServices(locale: Locale) {
  return locale === "en" ? SERVICES_EN : SERVICES_ES;
}

export const SERVICES = SERVICES_ES;
