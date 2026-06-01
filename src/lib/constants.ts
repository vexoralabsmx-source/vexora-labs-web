export const BRAND = "Vexora Labs";
export const TAGLINE = "Infraestructura digital para crecer sin friccion.";
export const TAGLINE_EN = "Digital infrastructure to grow without friction.";
export const LOGO_URL = "https://res.cloudinary.com/dakjhsfne/image/upload/v1780275926/vexoralabslogo_rp8wie.png";

export function getTagline(locale: "es" | "en") {
  return locale === "en" ? TAGLINE_EN : TAGLINE;
}

export const WHATSAPP_PHONE_E164 = "522203309762"; // +52 220 330 9762 -> wa.me uses countrycode+number
export const WHATSAPP_DISPLAY = "+52 220 330 9762";

// Update these for production deploy. Used for canonical + sitemap guidance only.
export const SITE_URL = "https://vexoralabs.shop";
