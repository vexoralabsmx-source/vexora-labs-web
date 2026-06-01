const OPENAI_API_KEY = (process.env.OPENAI_API_KEY || "").trim();
const OPENAI_MODEL = (process.env.OPENAI_MODEL || "gpt-4.1-mini").trim();
const OPENAI_API_BASE = (process.env.OPENAI_API_BASE || "https://api.openai.com/v1").trim();
const ALLOWED_ORIGINS = (process.env.AI_ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

function json(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    },
    body: JSON.stringify(body)
  };
}

function pickLocale(locale) {
  return locale === "en" ? "en" : "es";
}

function isAllowedOrigin(origin) {
  if (!origin) return true; // non-browser calls
  if (!ALLOWED_ORIGINS.length) return true; // default: allow (configure in prod)
  return ALLOWED_ORIGINS.includes(origin);
}

exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const corsHeaders = origin ? { "access-control-allow-origin": origin, "vary": "Origin" } : {};

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...corsHeaders,
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" }, corsHeaders);
  if (!isAllowedOrigin(origin)) return json(403, { error: "Origin not allowed" }, corsHeaders);

  if (!OPENAI_API_KEY) {
    return json(501, { error: "AI not configured. Set OPENAI_API_KEY." }, corsHeaders);
  }

  let payload = null;
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { error: "Invalid JSON" }, corsHeaders);
  }

  const q = String(payload?.q || "").trim().slice(0, 2000);
  if (!q) return json(400, { error: "Missing q" }, corsHeaders);

  const locale = pickLocale(payload?.locale);
  const page = String(payload?.page || "").trim().slice(0, 64);

  const system =
    locale === "en"
      ? [
          "You are Vexora Labs' pre-sales assistant for a premium services site (web, Discord, Minecraft, automations).",
          "Be concise, practical, and ask up to 3 clarification questions if needed.",
          "Never invent prices, metrics, or guarantees.",
          "If the user asks for a quote: suggest one package (Starter/Core/Scale) and next step: WhatsApp quote or guided brief.",
          `Context page: ${page || "unknown"}.`
        ].join("\n")
      : [
          "Eres el asistente de preventa de Vexora Labs para un sitio premium (web, Discord, Minecraft, automatizaciones).",
          "Sé conciso y práctico, y haz máximo 3 preguntas de aclaración si hace falta.",
          "No inventes precios, métricas ni promesas.",
          "Si piden cotización: sugiere 1 paquete (Starter/Core/Scale) y el siguiente paso: cotizar por WhatsApp o usar el brief guiado.",
          `Contexto de página: ${page || "desconocida"}.`
        ].join("\n");

  const body = {
    model: OPENAI_MODEL,
    input: [
      { role: "system", content: system },
      { role: "user", content: q }
    ],
    temperature: 0.2,
    max_output_tokens: 280
  };

  let resp;
  try {
    resp = await fetch(`${OPENAI_API_BASE}/responses`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (e) {
    return json(502, { error: "Upstream error" }, corsHeaders);
  }

  let data;
  try {
    data = await resp.json();
  } catch {
    return json(502, { error: "Invalid upstream response" }, corsHeaders);
  }

  if (!resp.ok) {
    return json(resp.status, { error: data?.error?.message || "OpenAI error" }, corsHeaders);
  }

  let text = "";
  const out = Array.isArray(data.output) ? data.output : [];
  for (const item of out) {
    if (item && item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if (c && c.type === "output_text" && typeof c.text === "string") text += c.text;
      }
    }
  }

  text = String(text || "").trim();
  if (!text) text = locale === "en" ? "I couldn't generate a reply. Try again." : "No pude generar respuesta. Intenta de nuevo.";

  return json(200, { reply: text }, corsHeaders);
};

