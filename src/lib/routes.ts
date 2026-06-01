import type { PageKey } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

export const ROUTES: Record<PageKey, { es: string; en: string }> = {
  home: { es: "/", en: "/en/" },
  servicios: { es: "/servicios/", en: "/en/services/" },
  discord: { es: "/discord/", en: "/en/discord/" },
  minecraft: { es: "/minecraft/", en: "/en/minecraft/" },
  web: { es: "/web-uiux/", en: "/en/web/" },
  whatsapp: { es: "/whatsapp-ia/", en: "/en/whatsapp-ai/" },
  portafolio: { es: "/portafolio/", en: "/en/portfolio/" },
  precios: { es: "/precios/", en: "/en/pricing/" },
  agenda: { es: "/agenda/", en: "/en/schedule/" },
  cuenta: { es: "/cuenta/", en: "/en/account/" },
  faq: { es: "/faq/", en: "/en/faq/" },
  contacto: { es: "/contacto/", en: "/en/contact/" },
  sobre: { es: "/sobre/", en: "/en/about/" },
  seguridad: { es: "/seguridad-etica/", en: "/en/security-ethics/" }
};

export function routeFor(page: PageKey, locale: Locale) {
  return ROUTES[page][locale];
}
