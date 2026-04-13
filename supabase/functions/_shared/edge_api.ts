/**
 * Consistent JSON responses for Volunteer Command V1 Edge Functions.
 * Errors: { error: { code, message }, correlation_id? } — never expose raw DB/internal strings.
 */

import { corsHeaders } from "./volunteer_identity.ts";

export function jsonSuccess(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function jsonError(
  code: string,
  message: string,
  status: number,
  correlationId?: string,
): Response {
  const payload: Record<string, unknown> = {
    error: { code, message },
  };
  if (correlationId) payload.correlation_id = correlationId;
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** HTTP OPTIONS for CORS preflight */
export function corsOk(): Response {
  return new Response("ok", { headers: corsHeaders });
}
