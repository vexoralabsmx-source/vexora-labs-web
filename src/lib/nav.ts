import type { PageKey } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import { routeFor } from "@/lib/routes";

export type NavItem = { href: string; label: string; key: PageKey | "proceso" };

export function getNav(locale: Locale): NavItem[] {
  if (locale === "en") {
    return [
      { href: routeFor("servicios", "en"), label: "Services", key: "servicios" },
      { href: `${routeFor("home", "en")}#process`, label: "Process", key: "proceso" },
      { href: routeFor("precios", "en"), label: "Pricing", key: "precios" },
      { href: routeFor("portafolio", "en"), label: "Projects", key: "portafolio" },
      { href: routeFor("faq", "en"), label: "FAQ", key: "faq" },
      { href: routeFor("contacto", "en"), label: "Contact", key: "contacto" }
    ];
  }
  return [
    { href: routeFor("servicios", "es"), label: "Servicios", key: "servicios" },
    { href: `${routeFor("home", "es")}#proceso`, label: "Proceso", key: "proceso" },
    { href: routeFor("precios", "es"), label: "Precios", key: "precios" },
    { href: routeFor("portafolio", "es"), label: "Proyectos", key: "portafolio" },
    { href: routeFor("faq", "es"), label: "FAQ", key: "faq" },
    { href: routeFor("contacto", "es"), label: "Contacto", key: "contacto" }
  ];
}

export const NAV: NavItem[] = getNav("es");
