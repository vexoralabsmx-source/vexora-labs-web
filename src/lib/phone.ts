export type PhoneCountry = {
  iso2: string;
  dial: string; // e.g. "+52"
  labelEs: string;
  labelEn: string;
  // Very rough length guidance for national number (digits only, without dial code)
  minDigits?: number;
  maxDigits?: number;
};

// Lightweight, curated list (extend as needed). Default = MX.
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso2: "MX", dial: "+52", labelEs: "México", labelEn: "Mexico", minDigits: 10, maxDigits: 10 },
  { iso2: "US", dial: "+1", labelEs: "Estados Unidos", labelEn: "United States", minDigits: 10, maxDigits: 10 },
  { iso2: "CA", dial: "+1", labelEs: "Canadá", labelEn: "Canada", minDigits: 10, maxDigits: 10 },
  { iso2: "BR", dial: "+55", labelEs: "Brasil", labelEn: "Brazil", minDigits: 10, maxDigits: 11 },
  { iso2: "ES", dial: "+34", labelEs: "España", labelEn: "Spain", minDigits: 9, maxDigits: 9 },
  { iso2: "PT", dial: "+351", labelEs: "Portugal", labelEn: "Portugal", minDigits: 9, maxDigits: 9 },
  { iso2: "GB", dial: "+44", labelEs: "Reino Unido", labelEn: "United Kingdom", minDigits: 10, maxDigits: 10 },
  { iso2: "FR", dial: "+33", labelEs: "Francia", labelEn: "France", minDigits: 9, maxDigits: 9 },
  { iso2: "DE", dial: "+49", labelEs: "Alemania", labelEn: "Germany", minDigits: 10, maxDigits: 11 },
  { iso2: "IT", dial: "+39", labelEs: "Italia", labelEn: "Italy", minDigits: 9, maxDigits: 11 },
  { iso2: "NL", dial: "+31", labelEs: "Países Bajos", labelEn: "Netherlands", minDigits: 9, maxDigits: 9 },
  { iso2: "BE", dial: "+32", labelEs: "Bélgica", labelEn: "Belgium", minDigits: 9, maxDigits: 9 },
  { iso2: "CH", dial: "+41", labelEs: "Suiza", labelEn: "Switzerland", minDigits: 9, maxDigits: 9 },
  { iso2: "AT", dial: "+43", labelEs: "Austria", labelEn: "Austria", minDigits: 10, maxDigits: 11 },
  { iso2: "SE", dial: "+46", labelEs: "Suecia", labelEn: "Sweden", minDigits: 9, maxDigits: 10 },
  { iso2: "NO", dial: "+47", labelEs: "Noruega", labelEn: "Norway", minDigits: 8, maxDigits: 8 },
  { iso2: "DK", dial: "+45", labelEs: "Dinamarca", labelEn: "Denmark", minDigits: 8, maxDigits: 8 },
  { iso2: "FI", dial: "+358", labelEs: "Finlandia", labelEn: "Finland", minDigits: 9, maxDigits: 10 },
  { iso2: "IE", dial: "+353", labelEs: "Irlanda", labelEn: "Ireland", minDigits: 9, maxDigits: 9 },
  { iso2: "PL", dial: "+48", labelEs: "Polonia", labelEn: "Poland", minDigits: 9, maxDigits: 9 },
  { iso2: "CZ", dial: "+420", labelEs: "Chequia", labelEn: "Czechia", minDigits: 9, maxDigits: 9 },
  { iso2: "RO", dial: "+40", labelEs: "Rumania", labelEn: "Romania", minDigits: 9, maxDigits: 9 },
  { iso2: "GR", dial: "+30", labelEs: "Grecia", labelEn: "Greece", minDigits: 10, maxDigits: 10 },
  { iso2: "TR", dial: "+90", labelEs: "Turquía", labelEn: "Turkey", minDigits: 10, maxDigits: 10 },
  { iso2: "AR", dial: "+54", labelEs: "Argentina", labelEn: "Argentina", minDigits: 10, maxDigits: 11 },
  { iso2: "CO", dial: "+57", labelEs: "Colombia", labelEn: "Colombia", minDigits: 10, maxDigits: 10 },
  { iso2: "CL", dial: "+56", labelEs: "Chile", labelEn: "Chile", minDigits: 9, maxDigits: 9 },
  { iso2: "PE", dial: "+51", labelEs: "Perú", labelEn: "Peru", minDigits: 9, maxDigits: 9 },
  { iso2: "EC", dial: "+593", labelEs: "Ecuador", labelEn: "Ecuador", minDigits: 9, maxDigits: 9 },
  { iso2: "VE", dial: "+58", labelEs: "Venezuela", labelEn: "Venezuela", minDigits: 10, maxDigits: 10 },
  { iso2: "UY", dial: "+598", labelEs: "Uruguay", labelEn: "Uruguay", minDigits: 8, maxDigits: 8 },
  { iso2: "PY", dial: "+595", labelEs: "Paraguay", labelEn: "Paraguay", minDigits: 9, maxDigits: 9 },
  { iso2: "BO", dial: "+591", labelEs: "Bolivia", labelEn: "Bolivia", minDigits: 8, maxDigits: 8 },
  { iso2: "GT", dial: "+502", labelEs: "Guatemala", labelEn: "Guatemala", minDigits: 8, maxDigits: 8 },
  { iso2: "SV", dial: "+503", labelEs: "El Salvador", labelEn: "El Salvador", minDigits: 8, maxDigits: 8 },
  { iso2: "HN", dial: "+504", labelEs: "Honduras", labelEn: "Honduras", minDigits: 8, maxDigits: 8 },
  { iso2: "NI", dial: "+505", labelEs: "Nicaragua", labelEn: "Nicaragua", minDigits: 8, maxDigits: 8 },
  { iso2: "CR", dial: "+506", labelEs: "Costa Rica", labelEn: "Costa Rica", minDigits: 8, maxDigits: 8 },
  { iso2: "PA", dial: "+507", labelEs: "Panamá", labelEn: "Panama", minDigits: 8, maxDigits: 8 },
  { iso2: "AU", dial: "+61", labelEs: "Australia", labelEn: "Australia", minDigits: 9, maxDigits: 9 },
  { iso2: "NZ", dial: "+64", labelEs: "Nueva Zelanda", labelEn: "New Zealand", minDigits: 8, maxDigits: 10 },
  { iso2: "IN", dial: "+91", labelEs: "India", labelEn: "India", minDigits: 10, maxDigits: 10 },
  { iso2: "PK", dial: "+92", labelEs: "Pakistán", labelEn: "Pakistan", minDigits: 10, maxDigits: 10 },
  { iso2: "BD", dial: "+880", labelEs: "Bangladés", labelEn: "Bangladesh", minDigits: 10, maxDigits: 10 },
  { iso2: "ID", dial: "+62", labelEs: "Indonesia", labelEn: "Indonesia", minDigits: 9, maxDigits: 12 },
  { iso2: "PH", dial: "+63", labelEs: "Filipinas", labelEn: "Philippines", minDigits: 10, maxDigits: 10 },
  { iso2: "VN", dial: "+84", labelEs: "Vietnam", labelEn: "Vietnam", minDigits: 9, maxDigits: 10 },
  { iso2: "TH", dial: "+66", labelEs: "Tailandia", labelEn: "Thailand", minDigits: 9, maxDigits: 9 },
  { iso2: "MY", dial: "+60", labelEs: "Malasia", labelEn: "Malaysia", minDigits: 9, maxDigits: 10 },
  { iso2: "SG", dial: "+65", labelEs: "Singapur", labelEn: "Singapore", minDigits: 8, maxDigits: 8 },
  { iso2: "JP", dial: "+81", labelEs: "Japón", labelEn: "Japan", minDigits: 10, maxDigits: 10 },
  { iso2: "KR", dial: "+82", labelEs: "Corea del Sur", labelEn: "South Korea", minDigits: 9, maxDigits: 10 },
  { iso2: "AE", dial: "+971", labelEs: "Emiratos Árabes Unidos", labelEn: "United Arab Emirates", minDigits: 9, maxDigits: 9 },
  { iso2: "SA", dial: "+966", labelEs: "Arabia Saudita", labelEn: "Saudi Arabia", minDigits: 9, maxDigits: 9 },
  { iso2: "IL", dial: "+972", labelEs: "Israel", labelEn: "Israel", minDigits: 9, maxDigits: 9 },
  { iso2: "EG", dial: "+20", labelEs: "Egipto", labelEn: "Egypt", minDigits: 10, maxDigits: 10 },
  { iso2: "MA", dial: "+212", labelEs: "Marruecos", labelEn: "Morocco", minDigits: 9, maxDigits: 9 },
  { iso2: "ZA", dial: "+27", labelEs: "Sudáfrica", labelEn: "South Africa", minDigits: 9, maxDigits: 9 },
  { iso2: "NG", dial: "+234", labelEs: "Nigeria", labelEn: "Nigeria", minDigits: 10, maxDigits: 11 },
  { iso2: "KE", dial: "+254", labelEs: "Kenia", labelEn: "Kenya", minDigits: 9, maxDigits: 9 },

  // Fallback to avoid maintaining a full list of ~200+ countries.
  { iso2: "ZZ", dial: "+", labelEs: "Otro (código manual)", labelEn: "Other (manual code)" }
];

export function digitsOnly(input: string) {
  return String(input || "").replace(/\D+/g, "");
}

export function normalizeDial(dial: string) {
  const d = String(dial || "").trim();
  return d.startsWith("+") ? d : `+${d.replace(/\D+/g, "")}`;
}

export function toE164(dial: string, nationalDigits: string) {
  const d = normalizeDial(dial);
  const n = digitsOnly(nationalDigits);
  if (!d || d === "+") return "";
  if (!n) return "";
  return `${d}${n}`;
}

export function isE164Like(value: string) {
  return /^\+\d{8,15}$/.test(String(value || "").trim());
}

export function detectCountryFromE164(value: string) {
  const v = String(value || "").trim();
  if (!v.startsWith("+")) return null;
  const sorted = [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
  for (const c of sorted) {
    if (v.startsWith(c.dial)) return c;
  }
  return null;
}
