/**
 * createVolunteerFromIntake — Volunteer Command V1
 * Privileged writes use service role only inside this Edge Function (never exposed to the client).
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
};

const MAX_LEN = 2000;

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

function isDigitalPreference(pref: string | null): boolean {
  if (!pref) return false;
  const p = pref.toLowerCase();
  return p === "digital" || p.includes("digital");
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

  let body: IntakeBody;
  try {
    body = (await req.json()) as IntakeBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const firstName = trimStr(body.first_name, 200);
  const lastName = trimStr(body.last_name, 200);
  if (!firstName || !lastName) {
    return jsonResponse(
      { error: "first_name and last_name are required" },
      400,
    );
  }

  const email = trimStr(body.email, 320);
  if (email && !isValidEmail(email)) {
    return jsonResponse({ error: "Invalid email format" }, 400);
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
      return jsonResponse(
        { error: "referred_by_volunteer_id must be a positive integer" },
        400,
      );
    }
    referredBy = n;
    const { data: refRow, error: refErr } = await supabase
      .from("volunteers")
      .select("id")
      .eq("id", referredBy)
      .maybeSingle();
    if (refErr || !refRow) {
      return jsonResponse({ error: "Invalid referred_by_volunteer_id" }, 400);
    }
  } else {
    referredBy = null;
  }

  const correlationId = crypto.randomUUID();
  log("info", "createVolunteerFromIntake start", {
    correlationId,
    hasEmail: !!email,
    hasPhone: !!phone,
    referredBy,
  });

  // 1) Find or create person
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
        error: pErr?.message,
      });
      return jsonResponse({ error: "Could not create person record" }, 500);
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
          error: cmErr.message,
        });
      }
    }
  }

  // 2) Create volunteer
  const { data: volunteer, error: vErr } = await supabase
    .from("volunteers")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
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
      error: vErr?.message,
    });
    return jsonResponse({ error: "Could not create volunteer record" }, 500);
  }

  const isDigital = isDigitalPreference(preferenceDigitalInPerson);
  const taskTitle = isDigital
    ? "Digital first step: complete your welcome checklist"
    : "Outreach first step: connect with one neighbor about the campaign";
  const taskDescription = isDigital
    ? "Finish the short digital onboarding checklist in the hub."
    : "Have one brief conversation about why this campaign matters to you.";

  const { data: task, error: tErr } = await supabase
    .from("volunteer_tasks")
    .insert({
      volunteer_id: volunteer.id,
      title: taskTitle,
      description: taskDescription,
      task_status: "pending",
    })
    .select("id, title, description, task_status, created_at, volunteer_id")
    .single();

  if (tErr || !task) {
    log("error", "volunteer_tasks insert failed", {
      correlationId,
      volunteerId: volunteer.id,
      error: tErr?.message,
    });
    return jsonResponse(
      {
        error: "Volunteer created but first task could not be assigned",
        volunteer_id: volunteer.id,
      },
      500,
    );
  }

  log("info", "createVolunteerFromIntake success", {
    correlationId,
    volunteerId: volunteer.id,
    personId,
    taskId: task.id,
  });

  return jsonResponse({
    volunteer_id: volunteer.id,
    person_id: personId,
    first_task: task,
    status: {
      onboarding_state: volunteer.onboarding_state,
      volunteer_status: volunteer.volunteer_status,
      voter_linkage_status: volunteer.voter_linkage_status,
    },
  });
});
