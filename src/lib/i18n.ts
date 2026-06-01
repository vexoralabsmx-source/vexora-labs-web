export type Locale = "es" | "en";

export function localeFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "es";
}

export function htmlLang(locale: Locale) {
  return locale === "en" ? "en" : "es-MX";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

