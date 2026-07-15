export const SUPABASE_URL = (
  process.env.PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  ""
).trim();
export const SUPABASE_ANON_KEY = (
  process.env.PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ""
).trim();

const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

type FetchOptions = {
  method?: string;
  token?: string;
  serviceRole?: boolean;
  body?: unknown;
  headers?: Record<string, string>;
};

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function getBearerToken(request: Request) {
  const header = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export async function supabaseFetch(path: string, options: FetchOptions = {}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase is not configured");
  }

  const key = options.serviceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
  if (options.serviceRole && !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }

  const headers: Record<string, string> = {
    apikey: key,
    authorization: `Bearer ${options.token || key}`,
    "content-type": "application/json",
    ...(options.headers || {})
  };

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });

  const text = await response.text();
  const data = text ? safeJson(text) : null;

  if (!response.ok) {
    const message =
      data?.message ||
      data?.msg ||
      data?.error_description ||
      data?.error ||
      `Supabase request failed with ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function getSupabaseUser(token: string) {
  if (!token) throw new Error("Missing access token");
  return supabaseFetch("/auth/v1/user", { token });
}

export async function rpc<T = unknown>(name: string, body: Record<string, unknown>, token: string) {
  return supabaseFetch(`/rest/v1/rpc/${name}`, {
    method: "POST",
    token,
    body
  }) as Promise<T>;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
