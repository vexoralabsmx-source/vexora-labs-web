type AffiliateOrder = {
  id?: string;
  invoice_id?: string;
  invite_code?: string;
  customer_name?: string | null;
  customer_contact?: string | null;
  customer_email?: string | null;
  service_name?: string | null;
  amount_cents?: number | null;
  currency?: string | null;
  commission_cents?: number | null;
  payment_method?: string | null;
  status?: string | null;
  created_at?: string | null;
};

const WEBHOOK_URL = (process.env.DISCORD_AFFILIATE_WEBHOOK_URL || "").trim();
const ADMIN_URL = (
  process.env.PUBLIC_ADMIN_URL ||
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  "https://vexoralabs.shop/admin"
).trim();

export async function sendAffiliateOrderNotification(order: AffiliateOrder) {
  if (!WEBHOOK_URL) {
    console.warn("DISCORD_AFFILIATE_WEBHOOK_URL is not configured. Affiliate order notification skipped.");
    return { ok: false, skipped: true };
  }

  const payload = {
    username: "Vexora Labs Afiliados",
    embeds: [
      {
        title: "🧾 Nueva venta referida pendiente",
        description: "Una venta referida fue registrada y necesita revisión.",
        url: ADMIN_URL,
        color: 0x7c3aed,
        fields: [
          field("Invoice ID", code(order.invoice_id || "Sin invoice")),
          field("Código afiliado", code(order.invite_code || "Sin codigo")),
          field("Cliente", order.customer_name || "Sin nombre"),
          field("Contacto", order.customer_contact || order.customer_email || "Sin contacto"),
          field("Servicio", order.service_name || "Sin servicio"),
          field("Monto", formatMoney(order.amount_cents || 0, order.currency || "MXN")),
          field("Comisión estimada", formatMoney(order.commission_cents || 0, order.currency || "MXN")),
          field("Método de pago", order.payment_method || "No indicado"),
          field("Estado", order.status || "pending_review"),
          field("Fecha", formatDate(order.created_at)),
          field("Panel admin", `[Abrir panel admin](${ADMIN_URL})`, false)
        ],
        footer: {
          text: "Vexora Labs Afiliados"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Discord webhook failed with ${response.status}${text ? `: ${text}` : ""}`);
  }

  return { ok: true, skipped: false };
}

function field(name: string, value: string, inline = true) {
  return {
    name,
    value: value.slice(0, 1024) || "-",
    inline
  };
}

function code(value: string) {
  return `\`${String(value).replace(/`/g, "")}\``;
}

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "MXN",
    maximumFractionDigits: 2
  }).format(Number(cents || 0) / 100);
}

function formatDate(value?: string | null) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toLocaleString("es-MX");
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City"
  }).format(date);
}
