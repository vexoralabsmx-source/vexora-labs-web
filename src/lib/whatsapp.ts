import { WHATSAPP_PHONE_E164 } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

export type PageKey =
  | "home"
  | "servicios"
  | "discord"
  | "minecraft"
  | "web"
  | "whatsapp"
  | "portafolio"
  | "precios"
  | "agenda"
  | "cuenta"
  | "faq"
  | "contacto"
  | "sobre"
  | "seguridad";

const messagesEs: Record<PageKey, string> = {
  home: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  servicios: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  discord: "Hola, quiero un bot/servidor de Discord con ",
  minecraft: "Hola, quiero configurar un servidor de Minecraft con ",
  web: "Hola, quiero una web premium para ",
  whatsapp: "Hola, quiero automatizar WhatsApp para ventas/soporte",
  portafolio: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  precios: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  agenda: "Hola, quiero agendar una llamada para ",
  cuenta: "Hola, quiero ayuda con mi cuenta/brief para ",
  faq: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  contacto: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  sobre: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para ",
  seguridad: "Hola, vengo de la web de Vexora Labs. Quiero una cotizacion para "
};

const messagesEn: Record<PageKey, string> = {
  home: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  servicios: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  discord: "Hi! I’d like a Discord server/bot with ",
  minecraft: "Hi! I’d like to set up a Minecraft server with ",
  web: "Hi! I’d like a premium website for ",
  whatsapp: "Hi! I want to automate WhatsApp for sales/support",
  portafolio: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  precios: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  agenda: "Hi! I'd like to schedule a call for ",
  cuenta: "Hi! I need help with my account/brief for ",
  faq: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  contacto: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  sobre: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for ",
  seguridad: "Hi! I’m coming from the Vexora Labs website. I’d like a quote for "
};

export function getWhatsAppLink(page: PageKey, locale: Locale = "es") {
  const dict = locale === "en" ? messagesEn : messagesEs;
  const text = encodeURIComponent(dict[page] ?? dict.home);
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${text}`;
}
