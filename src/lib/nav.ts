import type { PageKey } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import { routeFor } from "@/lib/routes";

export type NavItem = { href: string; label: string; key: PageKey };

export function getNav(locale: Locale): NavItem[] {
  if (locale === "en") {
    return [
      { href: routeFor("servicios", "en"), label: "Services", key: "servicios" },
      { href: routeFor("portafolio", "en"), label: "Portfolio", key: "portafolio" },
      { href: routeFor("precios", "en"), label: "Pricing", key: "precios" },
      { href: routeFor("cuenta", "en"), label: "Account", key: "cuenta" },
      { href: routeFor("faq", "en"), label: "FAQ", key: "faq" },
      { href: routeFor("contacto", "en"), label: "Contact", key: "contacto" }
    ];
  }
  return [
    { href: routeFor("servicios", "es"), label: "Servicios", key: "servicios" },
    { href: routeFor("portafolio", "es"), label: "Portafolio", key: "portafolio" },
    { href: routeFor("precios", "es"), label: "Precios", key: "precios" },
    { href: routeFor("cuenta", "es"), label: "Cuenta", key: "cuenta" },
    { href: routeFor("faq", "es"), label: "FAQ", key: "faq" },
    { href: routeFor("contacto", "es"), label: "Contacto", key: "contacto" }
  ];
}

export const NAV: NavItem[] = getNav("es");
