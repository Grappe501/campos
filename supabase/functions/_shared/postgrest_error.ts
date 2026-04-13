/**
 * Safe fields for logging PostgREST / Postgres errors from @supabase/supabase-js.
 * Never send these to clients — use only in server logs.
 */

export type PostgrestLikeError = {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
};

export function postgrestErrorForLog(
  err: PostgrestLikeError | null | undefined,
): Record<string, unknown> | undefined {
  if (!err) return undefined;
  const out: Record<string, unknown> = {};
  if (err.message) out.message = err.message;
  if (err.code) out.code = err.code;
  if (err.details) out.details = err.details;
  if (err.hint) out.hint = err.hint;
  return Object.keys(out).length ? out : undefined;
}
