/**
 * getVolunteerCommandMetrics — Volunteer Command V1 (mini manager view)
 * JWT required; email must match VOLUNTEER_COMMAND_METRICS_ADMIN_EMAILS (server env).
 * Aggregates only — no PII in the response.
 *
 * Metric definitions (V1):
 * - total_volunteers: COUNT(*) on public.volunteers.
 * - new_volunteers_7d: COUNT(*) where created_at >= now() - 7 days.
 * - active_volunteers_7d: COUNT(*) where volunteer_status = 'active' AND updated_at >= now() - 7 days.
 *   Approximate “recently touched active” — any row update bumps updated_at.
 * - first_task_completion_rate: Among volunteers with ≥1 volunteer_tasks row, share whose earliest
 *   task by created_at has task_status = 'completed'. Null if no one has tasks yet.
 * - voter_linkage_counts: Exact COUNT per voter_linkage_status for the five V1 buckets; any row with
 *   an unexpected status is folded into not_started so sums match total_volunteers.
 * - referred_volunteer_count: COUNT(*) where referred_by_volunteer_id IS NOT NULL.
 */

import {
  createClient,
  type SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  getUserFromRequest,
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

function parseAdminAllowlist(): Set<string> {
  const raw =
    Deno.env.get("VOLUNTEER_COMMAND_METRICS_ADMIN_EMAILS")?.trim() ??
    Deno.env.get("VOLUNTEER_METRICS_ADMIN_EMAILS")?.trim();
  if (!raw) return new Set();
  return new Set(
    raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean),
  );
}

function isAdminEmail(email: string, allow: Set<string>): boolean {
  return allow.has(email.trim().toLowerCase());
}

const LINKAGE_KEYS = [
  "linked",
  "not_started",
  "not_found",
  "out_of_state",
  "needs_disambiguation",
] as const;

const TASK_PAGE = 1000;

async function fetchAllVolunteerTasks(
  admin: SupabaseClient,
): Promise<
  { volunteer_id: number | null; created_at: string; task_status: string }[]
> {
  const out: {
    volunteer_id: number | null;
    created_at: string;
    task_status: string;
  }[] = [];
  let offset = 0;
  for (;;) {
    const { data, error } = await admin
      .from("volunteer_tasks")
      .select("volunteer_id, created_at, task_status")
      .order("id", { ascending: true })
      .range(offset, offset + TASK_PAGE - 1);
    if (error) throw error;
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < TASK_PAGE) break;
    offset += TASK_PAGE;
  }
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const correlationId = crypto.randomUUID();

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
  if (!user?.email) {
    return jsonError("UNAUTHORIZED", "Sign in to continue.", 401, correlationId);
  }

  const allow = parseAdminAllowlist();
  if (allow.size === 0) {
    log("warn", "metrics allowlist empty", {
      correlationId,
      event: "volunteer_metrics_no_allowlist",
    });
    return jsonError(
      "FORBIDDEN",
      "Manager metrics are not enabled for this environment.",
      403,
      correlationId,
    );
  }

  if (!isAdminEmail(user.email, allow)) {
    log("info", "metrics access denied", {
      correlationId,
      event: "volunteer_metrics_forbidden",
    });
    return jsonError(
      "FORBIDDEN",
      "You don’t have access to manager metrics.",
      403,
      correlationId,
    );
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString();

  const { count: totalVolunteers, error: cErr } = await admin
    .from("volunteers")
    .select("id", { count: "exact", head: true });

  if (cErr) {
    log("error", "volunteers count failed", {
      correlationId,
      event: "volunteer_metrics_error",
    });
    return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
  }

  const { count: newVolunteers7d, error: nErr } = await admin
    .from("volunteers")
    .select("id", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo);

  if (nErr) {
    return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
  }

  const { count: activeVolunteers7d, error: aErr } = await admin
    .from("volunteers")
    .select("id", { count: "exact", head: true })
    .eq("volunteer_status", "active")
    .gte("updated_at", sevenDaysAgo);

  if (aErr) {
    return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
  }

  const { count: referredVolunteerCount, error: rErr } = await admin
    .from("volunteers")
    .select("id", { count: "exact", head: true })
    .not("referred_by_volunteer_id", "is", null);

  if (rErr) {
    return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
  }

  const voterLinkageCounts: Record<(typeof LINKAGE_KEYS)[number], number> = {
    linked: 0,
    not_started: 0,
    not_found: 0,
    out_of_state: 0,
    needs_disambiguation: 0,
  };

  for (const k of LINKAGE_KEYS) {
    const { count, error: lErr } = await admin
      .from("volunteers")
      .select("id", { count: "exact", head: true })
      .eq("voter_linkage_status", k);
    if (lErr) {
      return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
    }
    voterLinkageCounts[k] = count ?? 0;
  }

  const sumLinkage = LINKAGE_KEYS.reduce((acc, k) => acc + voterLinkageCounts[k], 0);
  const totalV = totalVolunteers ?? 0;
  if (sumLinkage < totalV) {
    voterLinkageCounts.not_started += totalV - sumLinkage;
  }

  let taskRows: {
    volunteer_id: number | null;
    created_at: string;
    task_status: string;
  }[];
  try {
    taskRows = await fetchAllVolunteerTasks(admin);
  } catch {
    return jsonError("INTERNAL", "Could not load metrics.", 500, correlationId);
  }

  /** First task = earliest created_at per volunteer_id; rate = % whose first task is completed. */
  const byVolunteer = new Map<
    number,
    { created_at: string; task_status: string }[]
  >();
  for (const t of taskRows ?? []) {
    const vid = t.volunteer_id;
    if (vid == null) continue;
    const arr = byVolunteer.get(vid) ?? [];
    arr.push({
      created_at: t.created_at,
      task_status: t.task_status,
    });
    byVolunteer.set(vid, arr);
  }

  let withTasks = 0;
  let firstTaskCompleted = 0;
  for (const [, rows] of byVolunteer) {
    if (rows.length === 0) continue;
    withTasks += 1;
    rows.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    const first = rows[0];
    if (first.task_status === "completed") {
      firstTaskCompleted += 1;
    }
  }

  const firstTaskCompletionRate =
    withTasks > 0 ? firstTaskCompleted / withTasks : null;

  log("info", "volunteer metrics ok", {
    correlationId,
    event: "volunteer_metrics_loaded",
    totalVolunteers,
  });

  return jsonSuccess({
    total_volunteers: totalVolunteers ?? 0,
    new_volunteers_7d: newVolunteers7d ?? 0,
    active_volunteers_7d: activeVolunteers7d ?? 0,
    first_task_completion_rate: firstTaskCompletionRate,
    voter_linkage_counts: voterLinkageCounts,
    referred_volunteer_count: referredVolunteerCount ?? 0,
    computed_at: new Date().toISOString(),
  });
});
