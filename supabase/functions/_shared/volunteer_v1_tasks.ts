/**
 * Volunteer Command V1 — first task copy + server-side completion by task title.
 */

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export const V1_VOTER_CONFIRM_TASK_TITLE = "Confirm your voter record";
export const V1_VOTER_CONFIRM_TASK_DESCRIPTION =
  "Match yourself to the Arkansas voter file so we can place you in the right local context. We only use this to organize — never to publish your full registration details.";

/**
 * Completes the first non-completed volunteer_tasks row for this volunteer with the given title.
 * Idempotent if already completed.
 */
export async function completeVolunteerTaskByTitle(
  admin: SupabaseClient,
  volunteerId: number,
  taskTitle: string,
): Promise<{ task_id: number; completed_at: string } | null> {
  const { data: task, error: findErr } = await admin
    .from("volunteer_tasks")
    .select("id, task_status, volunteer_id")
    .eq("volunteer_id", volunteerId)
    .eq("title", taskTitle)
    .not("task_status", "eq", "completed")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (findErr || !task) return null;

  const taskId = task.id;

  const { data: existing } = await admin
    .from("volunteer_task_completions")
    .select("completed_at")
    .eq("task_id", taskId)
    .eq("volunteer_id", volunteerId)
    .maybeSingle();

  let completedAt: string;
  if (existing?.completed_at) {
    completedAt = existing.completed_at;
  } else {
    const { data: inserted, error: insErr } = await admin
      .from("volunteer_task_completions")
      .insert({ task_id: taskId, volunteer_id: volunteerId })
      .select("completed_at")
      .single();
    if (insErr || !inserted) return null;
    completedAt = inserted.completed_at;
  }

  await admin
    .from("volunteer_tasks")
    .update({ task_status: "completed" })
    .eq("id", taskId);

  return { task_id: taskId, completed_at: completedAt };
}
