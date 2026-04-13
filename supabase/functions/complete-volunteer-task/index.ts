/**
 * completeVolunteerTask — Volunteer Command V1
 * Records first-task completion via service role (never exposed to privileged client writes).
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type CompleteBody = {
  volunteer_id: number;
  task_id: number;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

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
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    log("error", "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse({ error: "Server misconfiguration" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: CompleteBody;
  try {
    body = (await req.json()) as CompleteBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const volunteerId = Number(body.volunteer_id);
  const taskId = Number(body.task_id);
  if (
    !Number.isInteger(volunteerId) ||
    volunteerId < 1 ||
    !Number.isInteger(taskId) ||
    taskId < 1
  ) {
    return jsonResponse(
      { error: "volunteer_id and task_id must be positive integers" },
      400,
    );
  }

  const correlationId = crypto.randomUUID();
  log("info", "completeVolunteerTask start", {
    correlationId,
    volunteerId,
    taskId,
  });

  const { data: task, error: taskErr } = await supabase
    .from("volunteer_tasks")
    .select("id, volunteer_id, task_status")
    .eq("id", taskId)
    .maybeSingle();

  if (taskErr) {
    log("error", "volunteer_tasks lookup failed", {
      correlationId,
      error: taskErr.message,
    });
    return jsonResponse({ error: "Could not load task" }, 500);
  }

  if (!task) {
    return jsonResponse({ error: "Task not found" }, 404);
  }

  if (task.volunteer_id !== volunteerId) {
    log("warn", "task volunteer mismatch", {
      correlationId,
      taskVolunteerId: task.volunteer_id,
      requestedVolunteerId: volunteerId,
    });
    return jsonResponse({ error: "Task does not belong to this volunteer" }, 403);
  }

  const { data: existing, error: exErr } = await supabase
    .from("volunteer_task_completions")
    .select("id, completed_at")
    .eq("task_id", taskId)
    .eq("volunteer_id", volunteerId)
    .maybeSingle();

  if (exErr) {
    log("error", "completion lookup failed", {
      correlationId,
      error: exErr.message,
    });
    return jsonResponse({ error: "Could not verify completion" }, 500);
  }

  let completedAt: string;

  if (existing) {
    completedAt = existing.completed_at;
    log("info", "completeVolunteerTask idempotent", {
      correlationId,
      completionId: existing.id,
    });
  } else {
    const { data: inserted, error: insErr } = await supabase
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
        error: insErr?.message,
      });
      return jsonResponse({ error: "Could not record completion" }, 500);
    }
    completedAt = inserted.completed_at;
  }

  if (task.task_status !== "completed") {
    const { error: updErr } = await supabase
      .from("volunteer_tasks")
      .update({ task_status: "completed" })
      .eq("id", taskId);

    if (updErr) {
      log("warn", "volunteer_tasks status update failed", {
        correlationId,
        error: updErr.message,
      });
    }
  }

  log("info", "completeVolunteerTask success", {
    correlationId,
    volunteerId,
    taskId,
    completedAt,
  });

  return jsonResponse({
    ok: true,
    volunteer_id: volunteerId,
    task_id: taskId,
    completed_at: completedAt,
  });
});
