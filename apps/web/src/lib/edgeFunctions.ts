/**
 * Minimal helper for calling Supabase Edge Functions with the anon key only.
 * Pass accessToken for JWT-protected functions (Authorization: user session).
 * Never pass service role or other privileged keys here.
 */

export type EdgeInvokeOptions = {
  supabaseUrl: string;
  anonKey: string;
  /** When set, sent as Bearer token (use session.access_token). Otherwise anon key is used for anonymous functions. */
  accessToken?: string | null;
};

export async function invokeEdgeFunction<T>(
  functionName: string,
  body: unknown,
  opts: EdgeInvokeOptions,
): Promise<T> {
  const base = opts.supabaseUrl.replace(/\/$/, "");
  const url = `${base}/functions/v1/${functionName}`;
  const bearer = opts.accessToken?.trim()
    ? opts.accessToken
    : opts.anonKey;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
      apikey: opts.anonKey,
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = parseEdgeError(data, res.statusText);
    const err = new Error(msg || `Request failed (${res.status})`) as Error & {
      code?: string;
    };
    const d = data as Record<string, unknown> | null;
    const nested = d?.error;
    if (
      typeof nested === "object" &&
      nested !== null &&
      typeof (nested as { code?: string }).code === "string"
    ) {
      err.code = (nested as { code: string }).code;
    } else if (typeof nested === "string" && nested.trim()) {
      err.code = nested;
    }
    throw err;
  }
  return data as T;
}

function parseEdgeError(data: unknown, fallback: string): string {
  if (typeof data !== "object" || data === null) return fallback;
  const o = data as Record<string, unknown>;
  if (typeof o.message === "string" && o.message.trim()) return o.message;
  const err = o.error;
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (typeof e.message === "string" && e.message.trim()) return e.message;
  }
  if (typeof err === "string" && err.trim()) return err;
  if (typeof o.error === "string" && o.error.trim()) return o.error;
  return fallback;
}
