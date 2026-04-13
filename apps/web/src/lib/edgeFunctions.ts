/**
 * Minimal helper for calling Supabase Edge Functions with the anon key only.
 * Never pass service role or other privileged keys here.
 */

export type EdgeInvokeOptions = {
  supabaseUrl: string;
  anonKey: string;
};

export async function invokeEdgeFunction<T>(
  functionName: string,
  body: unknown,
  opts: EdgeInvokeOptions,
): Promise<T> {
  const base = opts.supabaseUrl.replace(/\/$/, "");
  const url = `${base}/functions/v1/${functionName}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.anonKey}`,
      apikey: opts.anonKey,
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : res.statusText;
    throw new Error(err || `Request failed (${res.status})`);
  }
  return data as T;
}
