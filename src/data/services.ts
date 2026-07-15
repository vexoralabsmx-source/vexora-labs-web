import { Bot, Braces, BrainCircuit, Palette, PanelsTopLeft, Workflow } from "lucide-react";

export const services = [
  { number: "01", title: "Desarrollo web", description: "Sitios, plataformas y experiencias digitales construidas para funcionar, crecer y destacar.", items: ["Next.js", "Responsive", "SEO técnico", "Integraciones"], icon: Braces },
  { number: "02", title: "UI/UX", description: "Interfaces claras y memorables donde cada elemento tiene una razón de existir.", items: ["Arquitectura", "Prototipos", "Design systems", "Accesibilidad"], icon: PanelsTopLeft },
  { number: "03", title: "Automatizaciones", description: "Sistemas que conectan herramientas y reducen tareas repetitivas.", items: ["Webhooks", "Flujos", "Formularios", "Paneles"], icon: Workflow },
  { number: "04", title: "Bots y comunidades", description: "Herramientas para comunidades organizadas, seguras y escalables.", items: ["Tickets", "Moderación", "Logs", "Verificación"], icon: Bot },
  { number: "05", title: "Experiencias con IA", description: "Funciones inteligentes aplicadas solamente donde resuelven un problema real.", items: ["Asistentes", "Búsqueda", "Clasificación", "Flujos"], icon: BrainCircuit },
  { number: "06", title: "Branding y lanzamiento", description: "Identidad, contenido y experiencias para presentar una marca correctamente.", items: ["Branding", "Dirección visual", "Motion", "Lanzamientos"], icon: Palette },
] as const;
