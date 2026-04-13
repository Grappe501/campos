/**
 * completeVolunteerTask — Volunteer Command V1
 * Authenticated only: JWT → email → volunteer_id; task_id from body; writes via service role.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  getUserFromRequest,
  resolveVolunteerIdForEmail,
} from "../_shared/volunteer_identity.ts";

type CompleteBody = {
  task_id: number;
};

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
      event: "complete_task_config_error",
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

  let body: CompleteBody;
  try {
    body = (await req.json()) as CompleteBody;
  } catch {
    return jsonError("INVALID_JSON", "Invalid JSON body", 400, correlationId);
  }

  const taskId = Number(body.task_id);
  if (!Number.isInteger(taskId) || taskId < 1) {
    return jsonError(
      "VALIDATION_ERROR",
      "task_id must be a positive integer",
      400,
      correlationId,
    );
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const volunteerId = await resolveVolunteerIdForEmail(admin, user.email!);
  if (volunteerId === null) {
    return jsonError(
      "NO_VOLUNTEER_PROFILE",
      "No volunteer profile is linked to this account. Use the same email you used to sign up.",
      404,
      correlationId,
    );
  }

  log("info", "completeVolunteerTask start", {
    correlationId,
    event: "volunteer_task_complete_start",
    volunteerId,
    taskId,
    userId: user.id,
  });

  const { data: task, error: taskErr } = await admin
    .from("volunteer_tasks")
    .select("id, volunteer_id, task_status")
    .eq("id", taskId)
    .maybeSingle();

  if (taskErr) {
    log("error", "volunteer_tasks lookup failed", {
      correlationId,
      event: "complete_task_error",
      code: "task_lookup",
    });
    return jsonError(
      "INTERNAL",
      "Could not load task",
      500,
      correlationId,
    );
  }

  if (!task) {
    return jsonError("NOT_FOUND", "Task not found", 404, correlationId);
  }

  if (task.volunteer_id !== volunteerId) {
    log("warn", "task volunteer mismatch", {
      correlationId,
      event: "complete_task_forbidden",
      taskVolunteerId: task.volunteer_id,
      sessionVolunteerId: volunteerId,
    });
    return jsonError(
      "FORBIDDEN",
      "This task is not assigned to you",
      403,
      correlationId,
    );
  }

  const { data: existing, error: exErr } = await admin
    .from("volunteer_task_completions")
    .select("id, completed_at")
    .eq("task_id", taskId)
    .eq("volunteer_id", volunteerId)
    .maybeSingle();

  if (exErr) {
    log("error", "completion lookup failed", {
      correlationId,
      event: "complete_task_error",
      code: "completion_lookup",
    });
    return jsonError(
      "INTERNAL",
      "Could not verify completion",
      500,
      correlationId,
    );
  }

  let completedAt: string;

  if (existing) {
    completedAt = existing.completed_at;
    log("info", "completeVolunteerTask idempotent", {
      correlationId,
      event: "volunteer_task_complete_idempotent",
      completionId: existing.id,
    });
  } else {
    const { data: inserted, error: insErr } = await admin
      .from("volunteer_task_completions")
      .insert({
        task_id: taskId,
        volunteer_id: volunteerId,
      })
      .select("completed_at")
      .single();

    if (insErr || !inserted) {
      log("error", "volunteer_task_completions insert failed", {
        correlationId,
        event: "complete_task_error",
        code: "completion_insert",
      });
      return jsonError(
        "INTERNAL",
        "Could not record completion",
        500,
        correlationId,
      );
    }
    completedAt = inserted.completed_at;
  }

  if (task.task_status !== "completed") {
    const { error: updErr } = await admin
      .from("volunteer_tasks")
      .update({ task_status: "completed" })
      .eq("id", taskId);

    if (updErr) {
      log("warn", "volunteer_tasks status update failed", {
        correlationId,
        event: "complete_task_warn",
        error: updErr.message,
      });
    }
  }

  log("info", "completeVolunteerTask success", {
    correlationId,
    event: "volunteer_task_completed",
    volunteerId,
    taskId,
    completedAt,
  });

  return jsonSuccess({
    ok: true,
    task_id: taskId,
    completed_at: completedAt,
  });
});
