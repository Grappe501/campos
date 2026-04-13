/**
 * getVolunteerContext — Volunteer Command V1
 * Returns volunteer row + tasks for the authenticated user (email → person → volunteer).
 * Server-side only; JWT required; no client trust of volunteer_id.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  getUserFromRequest,
  resolveVolunteerIdForEmail,
} from "../_shared/volunteer_identity.ts";

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
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonError("METHOD_NOT_ALLOWED", "Method not allowed", 405);
  }

  const correlationId = crypto.randomUUID();

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    log("error", "Missing Supabase env", {
      correlationId,
      event: "volunteer_context_config_error",
    });
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
    log("info", "getVolunteerContext no volunteer for email", {
      correlationId,
      event: "volunteer_context_no_profile",
      userId: user.id,
    });
    return jsonError(
      "NO_VOLUNTEER_PROFILE",
      "We couldn’t match this login to a volunteer record yet. Use the same email you used to sign up, or contact your organizer.",
      404,
      correlationId,
    );
  }

  const { data: volunteer, error: vErr } = await admin
    .from("volunteers")
    .select(
      "id, person_id, first_name, last_name, preferred_name, email, onboarding_state, volunteer_status, voter_linkage_status, lane_interest, preference_digital_in_person, referred_by_volunteer_id, created_at, voter_summary_city, voter_summary_county, voter_summary_precinct, voter_summary_registration_label, voter_summary_districts",
    )
    .eq("id", volunteerId)
    .maybeSingle();

  if (vErr || !volunteer) {
    log("error", "volunteers load failed", {
      correlationId,
      event: "volunteer_context_error",
      code: "volunteer_load",
    });
    return jsonError(
      "INTERNAL",
      "Could not load volunteer profile",
      500,
      correlationId,
    );
  }

  const { data: taskRows, error: tErr } = await admin
    .from("volunteer_tasks")
    .select(
      "id, title, description, task_status, created_at, volunteer_id, due_at",
    )
    .eq("volunteer_id", volunteerId)
    .order("created_at", { ascending: true });

  if (tErr) {
    log("error", "volunteer_tasks load failed", {
      correlationId,
      event: "volunteer_context_error",
      code: "tasks_load",
    });
    return jsonError(
      "INTERNAL",
      "Could not load tasks",
      500,
      correlationId,
    );
  }

  const tasks = taskRows ?? [];

  const { data: compRows, error: cErr } = await admin
    .from("volunteer_task_completions")
    .select("task_id, completed_at")
    .eq("volunteer_id", volunteerId);

  if (cErr) {
    log("warn", "volunteer_task_completions load failed", {
      correlationId,
      event: "volunteer_context_warn",
      error: cErr.message,
    });
  }

  const completedByTask = new Map<number, string>();
  for (const row of compRows ?? []) {
    if (row.task_id != null && row.completed_at) {
      completedByTask.set(row.task_id, row.completed_at);
    }
  }

  const tasksWithCompletion = tasks.map((t) => ({
    ...t,
    completed_at: completedByTask.get(t.id) ?? null,
  }));

  log("info", "getVolunteerContext ok", {
    correlationId,
    event: "volunteer_context_loaded",
    volunteerId,
    taskCount: tasksWithCompletion.length,
  });

  return jsonSuccess({
    volunteer,
    tasks: tasksWithCompletion,
  });
});
