/**
 * createVolunteerFromIntake — Volunteer Command V1
 * Privileged writes use service role only inside this Edge Function (never exposed to the client).
 * Rate limiting + idempotency + duplicate email/person guard for field-test hardening.
 */

import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import {
  V1_VOTER_CONFIRM_TASK_DESCRIPTION,
  V1_VOTER_CONFIRM_TASK_TITLE,
} from "../_shared/volunteer_v1_tasks.ts";
import { timingSafeEqualString } from "../_shared/timing_safe_string.ts";
// TEMP: Turnstile disabled for V1 field testing — re-enable import + call below after field validation
// import { verifyTurnstileIfConfigured } from "../_shared/turnstile_verify.ts";

type IntakeBody = {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  availability_summary?: string | null;
  preference_digital_in_person?: string | null;
  lane_interest?: string | null;
  attribution_source?: string | null;
  referred_by_volunteer_id?: number | null;
  /** Client-generated key (e.g. UUID); replays return the same success payload. */
  idempotency_key?: string | null;
  /** Cloudflare Turnstile token when TURNSTILE_SECRET_KEY is set on the server. */
  turnstile_token?: string | null;
};

const MAX_LEN = 2000;
const MAX_IP_EVENTS_PER_HOUR = 40;
const MAX_EMAIL_EVENTS_PER_HOUR = 15;

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

function trimStr(v: unknown, max = MAX_LEN): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 ? digits : raw.trim();
}

function getClientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf?.trim()) return cf.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff?.trim()) return xff.split(",")[0].trim();
  return "unknown";
}

async function hashIp(ip: string): Promise<string> {
  const salt = Deno.env.get("INTAKE_RATE_SALT") ?? "campos-intake-v1";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Server-side only: header must match INTAKE_RATE_OVERRIDE_SECRET (never log values). */
const MIN_INTAKE_OVERRIDE_SECRET_LEN = 32;

function intakeRateOverrideAuthorized(req: Request): boolean {
  const secret = Deno.env.get("INTAKE_RATE_OVERRIDE_SECRET")?.trim();
  if (!secret || secret.length < MIN_INTAKE_OVERRIDE_SECRET_LEN) {
    return false;
  }
  const presented = req.headers.get("X-Campos-Intake-Rate-Override")?.trim();
  if (!presented) return false;
  return timingSafeEqualString(presented, secret);
}

async function checkIntakeRateLimit(
  admin: SupabaseClient,
  ipHash: string,
  emailNorm: string | null,
  correlationId: string,
): Promise<{ ok: true } | { ok: false }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count: ipCount, error: ipErr } = await admin
    .from("volunteer_intake_rate_events")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  if (ipErr) {
    log("warn", "rate limit ip count failed", {
      correlationId,
      event: "volunteer_intake_rate_check",
      error: ipErr.message,
    });
    return { ok: true };
  }
  if ((ipCount ?? 0) >= MAX_IP_EVENTS_PER_HOUR) {
    log("warn", "intake rate limit ip", {
      correlationId,
      event: "volunteer_intake_rate_limited",
      scope: "ip",
    });
    return { ok: false };
  }

  if (emailNorm) {
    const { count: emCount, error: emErr } = await admin
      .from("volunteer_intake_rate_events")
      .select("id", { count: "exact", head: true })
      .eq("email_norm", emailNorm)
      .gte("created_at", oneHourAgo);

    if (emErr) {
      log("warn", "rate limit email count failed", {
        correlationId,
        event: "volunteer_intake_rate_check",
        error: emErr.message,
      });
      return { ok: true };
    }
    if ((emCount ?? 0) >= MAX_EMAIL_EVENTS_PER_HOUR) {
      log("warn", "intake rate limit email", {
        correlationId,
        event: "volunteer_intake_rate_limited",
        scope: "email",
      });
      return { ok: false };
    }
  }

  return { ok: true };
}

async function recordIntakeAttempt(
  admin: SupabaseClient,
  ipHash: string,
  emailNorm: string | null,
): Promise<void> {
  await admin.from("volunteer_intake_rate_events").insert({
    ip_hash: ipHash,
    email_norm: emailNorm,
  });
}

async function firstTaskForVolunteer(
  admin: SupabaseClient,
  volunteerId: number,
) {
  const { data: task } = await admin
    .from("volunteer_tasks")
    .select("id, title, description, task_status, created_at, volunteer_id")
    .eq("volunteer_id", volunteerId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return task;
}

type VolunteerRow = {
  id: number;
  onboarding_state: string;
  volunteer_status: string;
  voter_linkage_status: string;
  person_id: string | null;
};

async function findExistingVolunteer(
  admin: SupabaseClient,
  email: string | null,
  personId: string | null,
): Promise<VolunteerRow | null> {
  if (email) {
    const e = email.toLowerCase();
    const { data: v } = await admin
      .from("volunteers")
      .select(
        "id, onboarding_state, volunteer_status, voter_linkage_status, person_id",
      )
      .eq("email", e)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (v) return v as VolunteerRow;
  }
  if (personId) {
    const { data: v } = await admin
      .from("volunteers")
      .select(
        "id, onboarding_state, volunteer_status, voter_linkage_status, person_id",
      )
      .eq("person_id", personId)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (v) return v as VolunteerRow;
  }
  return null;
}

async function buildSuccessPayload(
  admin: SupabaseClient,
  volunteer: VolunteerRow,
  personId: string | null,
  intakeResult: "created" | "existing",
): Promise<Record<string, unknown>> {
  const task = await firstTaskForVolunteer(admin, volunteer.id);
  if (!task) {
    throw new Error("missing_first_task");
  }
  return {
    volunteer_id: volunteer.id,
    person_id: personId,
    first_task: task,
    status: {
      onboarding_state: volunteer.onboarding_state,
      volunteer_status: volunteer.volunteer_status,
      voter_linkage_status: volunteer.voter_linkage_status,
    },
    intake_result: intakeResult,
  };
}

async function persistIdempotency(
  admin: SupabaseClient,
  key: string,
  volunteerId: number,
  payload: Record<string, unknown>,
): Promise<void> {
  const { error } = await admin.from("volunteer_intake_idempotency").insert({
    idempotency_key: key,
    volunteer_id: volunteerId,
    response_json: payload,
  });
  if (error) {
    log("warn", "idempotency insert failed", {
      event: "volunteer_intake_idempotency_write_failed",
      error: error.message,
    });
  }
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

  const clientIpEarly = getClientIp(req);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    log("error", "Missing Supabase configuration", {
      correlationId,
      event: "volunteer_intake_config_error",
    });
    return jsonError(
      "SERVER_MISCONFIGURATION",
      "Service temporarily unavailable",
      500,
      correlationId,
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: IntakeBody;
  try {
    body = (await req.json()) as IntakeBody;
  } catch {
    return jsonError("INVALID_JSON", "Invalid JSON body", 400, correlationId);
  }

  // TEMP: Turnstile disabled for V1 field testing — behaves as verification succeeded (rate limit + idempotency unchanged)
  log("info", "turnstile verification bypassed for V1 field test", {
    correlationId,
    event: "volunteer_intake_turnstile_bypass",
  });

  const idemRaw = trimStr(body.idempotency_key, 128);
  if (idemRaw && !/^[\w-]{8,128}$/.test(idemRaw)) {
    return jsonError(
      "INVALID_ARGUMENT",
      "idempotency_key must be 8–128 characters (letters, numbers, dashes, underscores)",
      400,
      correlationId,
    );
  }

  if (idemRaw) {
    const { data: cached } = await supabase
      .from("volunteer_intake_idempotency")
      .select("response_json")
      .eq("idempotency_key", idemRaw)
      .maybeSingle();
    if (cached?.response_json) {
      log("info", "createVolunteerFromIntake idempotent replay", {
        correlationId,
        event: "volunteer_intake_idempotent_replay",
      });
      return jsonSuccess(cached.response_json as Record<string, unknown>, 200);
    }
  }

  const firstName = trimStr(body.first_name, 200);
  const lastName = trimStr(body.last_name, 200);
  if (!firstName || !lastName) {
    return jsonError(
      "VALIDATION_ERROR",
      "first_name and last_name are required",
      400,
      correlationId,
    );
  }

  const email = trimStr(body.email, 320);
  if (email && !isValidEmail(email)) {
    return jsonError("VALIDATION_ERROR", "Invalid email format", 400, correlationId);
  }

  const phone = trimStr(body.phone, 40);
  const availabilitySummary = trimStr(body.availability_summary);
  const preferenceDigitalInPerson = trimStr(
    body.preference_digital_in_person,
    80,
  );
  const laneInterest = trimStr(body.lane_interest);
  const attributionSource = trimStr(body.attribution_source);

  let referredBy = body.referred_by_volunteer_id;
  if (referredBy !== undefined && referredBy !== null) {
    const n = Number(referredBy);
    if (!Number.isInteger(n) || n < 1) {
      return jsonError(
        "VALIDATION_ERROR",
        "referred_by_volunteer_id must be a positive integer",
        400,
        correlationId,
      );
    }
    referredBy = n;
    const { data: refRow, error: refErr } = await supabase
      .from("volunteers")
      .select("id")
      .eq("id", referredBy)
      .maybeSingle();
    if (refErr || !refRow) {
      return jsonError(
        "VALIDATION_ERROR",
        "Invalid referred_by_volunteer_id",
        400,
        correlationId,
      );
    }
  } else {
    referredBy = null;
  }

  const clientIp = clientIpEarly;
  const ipHash = await hashIp(clientIp);
  const emailNorm = email ? email.toLowerCase() : null;

  const rateBypass = intakeRateOverrideAuthorized(req);
  if (!rateBypass) {
    const rate = await checkIntakeRateLimit(
      supabase,
      ipHash,
      emailNorm,
      correlationId,
    );
    if (!rate.ok) {
      return jsonError(
        "TOO_MANY_REQUESTS",
        "Too many signup attempts. Please wait and try again.",
        429,
        correlationId,
      );
    }

    await recordIntakeAttempt(supabase, ipHash, emailNorm);
  } else {
    log("info", "createVolunteerFromIntake rate limit bypassed", {
      correlationId,
      event: "volunteer_intake_rate_override_used",
    });
  }

  log("info", "createVolunteerFromIntake start", {
    correlationId,
    event: "volunteer_intake_start",
    hasEmail: !!email,
    hasPhone: !!phone,
    referredBy,
  });

  // 1) Resolve person (existing contact or new)
  let personId: string | null = null;

  if (email) {
    const { data: byEmail } = await supabase
      .from("person_contact_methods")
      .select("person_id")
      .eq("contact_type", "email")
      .eq("contact_value", email.toLowerCase())
      .maybeSingle();
    if (byEmail?.person_id) personId = byEmail.person_id;
  }

  if (!personId && phone) {
    const normalized = normalizePhone(phone);
    const { data: byPhone } = await supabase
      .from("person_contact_methods")
      .select("person_id")
      .eq("contact_type", "phone")
      .eq("contact_value", normalized)
      .maybeSingle();
    if (byPhone?.person_id) personId = byPhone.person_id;
  }

  // Duplicate volunteer guard (email or person)
  const existingVol = await findExistingVolunteer(supabase, email, personId);
  if (existingVol) {
    try {
      const payload = await buildSuccessPayload(
        supabase,
        existingVol,
        existingVol.person_id,
        "existing",
      );
      if (idemRaw) await persistIdempotency(supabase, idemRaw, existingVol.id, payload);
      log("info", "createVolunteerFromIntake duplicate skipped", {
        correlationId,
        event: "volunteer_intake_existing_volunteer",
        volunteerId: existingVol.id,
      });
      return jsonSuccess(payload, 200);
    } catch {
      return jsonError(
        "INTERNAL",
        "Could not load your volunteer profile",
        500,
        correlationId,
      );
    }
  }

  if (!personId) {
    const { data: person, error: pErr } = await supabase
      .from("people")
      .insert({
        first_name: firstName,
        last_name: lastName,
        is_volunteer: true,
        status: "active",
      })
      .select("id")
      .single();

    if (pErr || !person) {
      log("error", "people insert failed", {
        correlationId,
        event: "volunteer_intake_error",
        code: "people_insert",
      });
      return jsonError(
        "INTERNAL",
        "Could not complete signup",
        500,
        correlationId,
      );
    }
    personId = person.id;

    if (email) {
      const { error: cmErr } = await supabase.from("person_contact_methods")
        .insert({
          person_id: personId,
          contact_type: "email",
          contact_value: email.toLowerCase(),
          consent_status: "granted",
          can_email: true,
          can_text: false,
          can_call: false,
          is_primary: true,
        });
      if (cmErr) {
        log("warn", "person_contact_methods email insert failed", {
          correlationId,
          event: "volunteer_intake_warn",
          error: cmErr.message,
        });
      }
    }

    if (phone) {
      const normalized = normalizePhone(phone);
      const { error: cmErr } = await supabase.from("person_contact_methods")
        .insert({
          person_id: personId,
          contact_type: "phone",
          contact_value: normalized,
          consent_status: "granted",
          can_email: false,
          can_text: true,
          can_call: true,
          is_primary: !email,
        });
      if (cmErr) {
        log("warn", "person_contact_methods phone insert failed", {
          correlationId,
          event: "volunteer_intake_warn",
          error: cmErr.message,
        });
      }
    }
  }

  const { data: volunteer, error: vErr } = await supabase
    .from("volunteers")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email ? email.toLowerCase() : null,
      phone: phone,
      person_id: personId,
      onboarding_state: "new",
      voter_linkage_status: "not_started",
      volunteer_status: "active",
      availability_summary: availabilitySummary,
      preference_digital_in_person: preferenceDigitalInPerson,
      lane_interest: laneInterest,
      attribution_source: attributionSource,
      referred_by_volunteer_id: referredBy,
    })
    .select(
      "id, onboarding_state, volunteer_status, voter_linkage_status, person_id",
    )
    .single();

  if (vErr || !volunteer) {
    log("error", "volunteers insert failed", {
      correlationId,
      event: "volunteer_intake_error",
      code: "volunteers_insert",
    });
    return jsonError(
      "INTERNAL",
      "Could not complete signup",
      500,
      correlationId,
    );
  }

  const vRow = volunteer as VolunteerRow;

  const { data: task, error: tErr } = await supabase
    .from("volunteer_tasks")
    .insert({
      volunteer_id: vRow.id,
      title: V1_VOTER_CONFIRM_TASK_TITLE,
      description: V1_VOTER_CONFIRM_TASK_DESCRIPTION,
      task_status: "pending",
    })
    .select("id, title, description, task_status, created_at, volunteer_id")
    .single();

  if (tErr || !task) {
    log("error", "volunteer_tasks insert failed", {
      correlationId,
      volunteerId: vRow.id,
      event: "volunteer_intake_error",
      code: "task_insert",
    });
    return jsonError(
      "INTERNAL",
      "Signup partially completed; contact your organizer",
      500,
      correlationId,
    );
  }

  const payload: Record<string, unknown> = {
    volunteer_id: vRow.id,
    person_id: personId,
    first_task: task,
    status: {
      onboarding_state: vRow.onboarding_state,
      volunteer_status: vRow.volunteer_status,
      voter_linkage_status: vRow.voter_linkage_status,
    },
    intake_result: "created",
  };

  if (idemRaw) await persistIdempotency(supabase, idemRaw, vRow.id, payload);

  log("info", "createVolunteerFromIntake success", {
    correlationId,
    event: "volunteer_intake_created",
    volunteerId: vRow.id,
    personId,
    taskId: task.id,
  });

  return jsonSuccess(payload, 200);
});
