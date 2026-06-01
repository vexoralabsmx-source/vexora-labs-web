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
    title: "eCommerce local: soporte mas rapido sin perder tono de marca",
    type: "WhatsApp + IA + Automatizaciones",
    problem:
      "El equipo respondia tarde, habia mensajes duplicados y no existia un flujo claro para devoluciones y envios.",
    solution:
      "Diseñamos un enrutador por intencion (ventas/soporte), plantillas aprobadas, handoff humano y panel de metricas.",
    metrics: ["-41% tiempo medio de primera respuesta", "+18% conversion asistida en chat", "0 incidentes de spam (reglas)"],
    stack: ["WhatsApp Business API (proveedor permitido)", "Webhooks", "Dashboards", "Playbooks"]
  },
  {
    title: "Comunidad: Discord ordenado, escalable y auditable",
    type: "Discord systems",
    problem:
      "Ataques de raids, moderacion inconsistente y tickets dispersos; dificil entender que paso y cuando.",
    solution:
      "Implementamos antiraid por capas, logs auditables, tickets con categorias y onboarding con permisos limpios.",
    metrics: ["-92% spam visible durante raids", "+35% resolucion de tickets en primer contacto", "Roles simplificados (menos errores)"],
    stack: ["Bots", "Webhooks", "Mod logs", "Auto-roles"]
  },
  {
    title: "Servidor Minecraft: estabilidad antes que features",
    type: "Minecraft infra",
    problem:
      "Lag en picos de jugadores, caidas por configuracion y actualizaciones sin plan de rollback.",
    solution:
      "Tuning de performance, hardening basico, backups automatizados y un proceso de deploy por ventanas.",
    metrics: ["TPS mas estable en horas pico", "Backups verificados con restauracion de prueba", "Actualizaciones con checklist"],
    stack: ["Tuning", "Backups", "Hardening", "Runbook"]
  }
];

const CASE_STUDIES_EN: CaseStudy[] = [
  {
    title: "Local eCommerce: faster support without losing brand tone",
    type: "WhatsApp + AI + Automations",
    problem: "The team replied late, messages were duplicated, and there was no clear flow for returns and shipments.",
    solution: "We designed an intent router (sales/support), approved templates, human handoff, and a metrics dashboard.",
    metrics: ["-41% average first response time", "+18% assisted conversion in chat", "0 spam incidents (rules)"],
    stack: ["WhatsApp Business API (compliant provider)", "Webhooks", "Dashboards", "Playbooks"]
  },
  {
    title: "Community: an organized, scalable, auditable Discord",
    type: "Discord systems",
    problem: "Raid attacks, inconsistent moderation, and scattered tickets — hard to know what happened and when.",
    solution: "We implemented layered anti-raid, auditable logs, categorized tickets, and clean onboarding permissions.",
    metrics: ["-92% visible spam during raids", "+35% ticket resolution on first contact", "Simplified roles (fewer mistakes)"],
    stack: ["Bots", "Webhooks", "Mod logs", "Auto-roles"]
  },
  {
    title: "Minecraft server: stability before features",
    type: "Minecraft infra",
    problem: "Lag during peak players, outages due to config, and updates with no rollback plan.",
    solution: "Performance tuning, basic hardening, automated backups, and a deployment process with maintenance windows.",
    metrics: ["More stable TPS at peak hours", "Verified backups with test restores", "Updates with a checklist"],
    stack: ["Tuning", "Backups", "Hardening", "Runbook"]
  }
];

export function getCaseStudies(locale: "es" | "en") {
  return locale === "en" ? CASE_STUDIES_EN : CASE_STUDIES;
}
