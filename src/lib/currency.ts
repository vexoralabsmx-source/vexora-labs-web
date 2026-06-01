export type Currency = "MXN" | "USD" | "EUR";

export const DEFAULT_CURRENCY: Currency = "MXN";

export const CURRENCIES: Record<
  Currency,
  { label: string; locale: string; rateFromMXN: number }
> = {
  MXN: { label: "MXN", locale: "es-MX", rateFromMXN: 1 },
  USD: { label: "USD", locale: "en-US", rateFromMXN: 0.058 },
  EUR: { label: "EUR", locale: "es-ES", rateFromMXN: 0.053 }
};

export function formatMoneyFromMXN(amountMXN: number, currency: Currency) {
  const cfg = CURRENCIES[currency];
  const amount = amountMXN * cfg.rateFromMXN;
  return new Intl.NumberFormat(cfg.locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

