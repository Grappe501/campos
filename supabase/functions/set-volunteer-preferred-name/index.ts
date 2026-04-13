/**
 * setVolunteerPreferredName — Volunteer Command V1
 * Authenticated: JWT → volunteer row; updates display-layer preferred_name only.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { corsOk, jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import {
  getUserFromRequest,
  resolveVolunteerIdForEmail,
} from "../_shared/volunteer_identity.ts";

const MAX_LEN = 120;

function log(
  level: "info" | "warn" | "error",
  msg: string,
  extra?: Record<string, unknown>,
): void {
  const line = JSON.stringify({
    level,
    msg,
    ...extra,
    ts: new Date().toISOString(),
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

Deno.serve(async (req: Request) => {
  const correlationId = crypto.randomUUID();

  if (req.method === "OPTIONS") {
    return corsOk();
  }

  if (req.method !== "POST") {
    return jsonError(
      "METHOD_NOT_ALLOWED",
      "Method not allowed",
      405,
      correlationId,
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return jsonError(
      "SERVER_MISCONFIGURATION",
      "Service temporarily unavailable",
      500,
      correlationId,
    );
  }

  const user = await getUserFromRequest(req, supabaseUrl, anonKey);
  if (!user) {
    return jsonError("UNAUTHORIZED", "Unauthorized", 401, correlationId);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const volunteerId = await resolveVolunteerIdForEmail(admin, user.email!);
  if (volunteerId === null) {
    return jsonError(
      "NO_VOLUNTEER_PROFILE",
      "No volunteer profile is linked to this account.",
      404,
      correlationId,
    );
  }

  let body: { preferred_name?: unknown };
  try {
    body = (await req.json()) as { preferred_name?: unknown };
  } catch {
    return jsonError("INVALID_JSON", "Invalid JSON body", 400, correlationId);
  }

  if (!body || typeof body !== "object" || !("preferred_name" in body)) {
    return jsonError(
      "VALIDATION_ERROR",
      "preferred_name is required",
      400,
      correlationId,
    );
  }

  let preferredName: string | null = null;
  if (body.preferred_name !== undefined && body.preferred_name !== null) {
    const s = String(body.preferred_name).trim();
    if (s.length > MAX_LEN) {
      return jsonError(
        "VALIDATION_ERROR",
        `Use at most ${MAX_LEN} characters.`,
        400,
        correlationId,
      );
    }
    preferredName = s.length > 0 ? s : null;
  }

  const { error: updErr } = await admin
    .from("volunteers")
    .update({ preferred_name: preferredName })
    .eq("id", volunteerId);

  if (updErr) {
    log("error", "preferred_name update failed", {
      correlationId,
      event: "volunteer_preferred_name_error",
    });
    return jsonError(
      "INTERNAL",
      "Could not save that right now.",
      500,
      correlationId,
    );
  }

  log("info", "preferred_name saved", {
    correlationId,
    event: "volunteer_preferred_name_saved",
    volunteerId,
  });

  return jsonSuccess({ preferred_name: preferredName });
});
