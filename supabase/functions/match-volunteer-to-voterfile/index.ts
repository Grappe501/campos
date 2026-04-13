/**
 * matchVolunteerToVoterfile — Volunteer Command V1
 * Authenticated self-lookup against raw_vr; persists linkage via person_identifiers when matched.
 * No raw voter rows exposed to the client — redacted candidates only.
 */

import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { corsOk, jsonError, jsonSuccess } from "../_shared/edge_api.ts";
import {
  getUserFromRequest,
  resolveVolunteerIdForEmail,
} from "../_shared/volunteer_identity.ts";
import {
  completeVolunteerTaskByTitle,
  V1_VOTER_CONFIRM_TASK_TITLE,
} from "../_shared/volunteer_v1_tasks.ts";
import {
  nullVolunteerSummary,
  volunteerSummaryFromRawVr,
} from "../_shared/volunteer_voter_summary.ts";

type RawVrRow = {
  id: number;
  name_first: string | null;
  name_last: string | null;
  date_of_birth: string | null;
  res_city: string | null;
  county: string | null;
  res_zip5: string | null;
  res_state: string | null;
  voter_id: string | null;
  key_registrant: string | null;
  precinct_name: string | null;
  registrant_status: string | null;
  congressional_district: string | null;
  state_senate_district: string | null;
  state_representative_district: string | null;
};

type LookupBody = {
  action: "lookup";
  first_name: string;
  last_name: string;
  birth_year: number;
  zip_code?: string | null;
  city_or_county?: string | null;
  /** ar = search Arkansas file; other = treat as out-of-state registration */
  registration_scope: "ar" | "other";
};

type ConfirmBody = {
  action: "confirm";
  raw_vr_id: number;
  birth_year: number;
  first_name: string;
  last_name: string;
};

type Body = LookupBody | ConfirmBody;

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

function normalizeName(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function firstToken(s: string): string {
  return normalizeName(s).split(/\s+/).filter(Boolean)[0] ?? "";
}

function yearFromDob(dob: string | null): number | null {
  if (!dob || !String(dob).trim()) return null;
  const t = String(dob).trim();
  const y4 = t.match(/^(\d{4})/);
  if (y4) return parseInt(y4[1], 10);
  const d = Date.parse(t);
  if (!Number.isNaN(d)) return new Date(d).getFullYear();
  const parts = t.split(/[/-]/);
  if (parts.length >= 3) {
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[2], 10);
    if (b > 1900 && b < 2100) return b;
    if (a > 1900 && a < 2100) return a;
  }
  return null;
}

function escapeIlike(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

function rowMatchesNameAndYear(
  row: RawVrRow,
  firstName: string,
  lastName: string,
  birthYear: number,
): boolean {
  const ln = normalizeName(lastName);
  const nl = normalizeName(row.name_last ?? "");
  if (nl !== ln) return false;
  const ft = firstToken(firstName);
  const rt = firstToken(row.name_first ?? "");
  if (ft !== rt) return false;
  const y = yearFromDob(row.date_of_birth);
  return y === birthYear;
}

function redactedLabel(row: RawVrRow): string {
  const first = row.name_first ?? "";
  const initial = first.trim().charAt(0) || "?";
  const city = row.res_city?.trim() || row.county?.trim() || "Arkansas";
  const zip = row.res_zip5?.trim() ?? "----";
  const zipTail = zip.length >= 2 ? zip.slice(-2) : zip;
  return `${initial}. · ${city} · …${zipTail}`;
}

async function persistLinkage(
  admin: SupabaseClient,
  personId: string,
  voterIdValue: string,
): Promise<void> {
  const { data: dup } = await admin
    .from("person_identifiers")
    .select("id")
    .eq("person_id", personId)
    .eq("identifier_type", "ar_voter_registration")
    .eq("identifier_value", voterIdValue)
    .maybeSingle();
  if (dup) return;

  await admin.from("person_identifiers").insert({
    person_id: personId,
    identifier_type: "ar_voter_registration",
    identifier_value: voterIdValue,
    identifier_normalized: voterIdValue.toLowerCase(),
    source_system: "raw_vr",
    is_verified: true,
    is_primary: false,
  });
}

async function handleLookup(
  admin: SupabaseClient,
  volunteerId: number,
  _personId: string | null,
  body: LookupBody,
  correlationId: string,
): Promise<Response> {
  log("info", "voter_match_lookup", {
    correlationId,
    volunteerId,
    event: "voter_match_lookup",
  });

  if (body.registration_scope === "other") {
    await admin
      .from("volunteers")
      .update({
        voter_linkage_status: "out_of_state",
        ...nullVolunteerSummary(),
      })
      .eq("id", volunteerId);
    await completeVolunteerTaskByTitle(
      admin,
      volunteerId,
      V1_VOTER_CONFIRM_TASK_TITLE,
    );
    return jsonSuccess({
      result: "out_of_state",
      message:
        "Thanks for letting us know you’re registered outside Arkansas. You’re still a full part of this team — we just won’t try to match a local voter file row.",
      task_completed: true,
      voter_linkage_status: "out_of_state",
    });
  }

  const yearNow = new Date().getFullYear();
  const minVoterYear = yearNow - 120;
  const maxVoterYear = yearNow - 18;

  if (
    !Number.isInteger(body.birth_year) ||
    body.birth_year < minVoterYear ||
    body.birth_year > yearNow
  ) {
    return jsonError(
      "VALIDATION_ERROR",
      "Enter a valid birth year.",
      400,
      correlationId,
    );
  }

  if (body.birth_year > maxVoterYear) {
    await admin
      .from("volunteers")
      .update({
        voter_linkage_status: "not_started",
        ...nullVolunteerSummary(),
      })
      .eq("id", volunteerId);
    await completeVolunteerTaskByTitle(
      admin,
      volunteerId,
      V1_VOTER_CONFIRM_TASK_TITLE,
    );
    return jsonSuccess({
      result: "not_eligible",
      message:
        "We can’t match voter registration for people under 18 through this tool. You’re still welcome on the team — this step is done for now.",
      task_completed: true,
      voter_linkage_status: "not_started",
    });
  }

  const first = String(body.first_name ?? "").trim();
  const last = String(body.last_name ?? "").trim();
  if (!first || !last) {
    return jsonError(
      "VALIDATION_ERROR",
      "First and last name are required for a match.",
      400,
      correlationId,
    );
  }

  const zipRaw = body.zip_code?.trim() ?? "";
  const zip5 = zipRaw.replace(/\D/g, "").slice(0, 5);
  const place = body.city_or_county?.trim() ?? "";

  if (!zip5 && !place) {
    return jsonError(
      "VALIDATION_ERROR",
      "Enter a 5-digit ZIP or a city / county so we can narrow the search.",
      400,
      correlationId,
    );
  }

  let q = admin
    .from("raw_vr")
    .select(
      "id, name_first, name_last, date_of_birth, res_city, county, res_zip5, res_state, voter_id, key_registrant, precinct_name, registrant_status, congressional_district, state_senate_district, state_representative_district",
    )
    .ilike("name_last", escapeIlike(last));

  if (zip5.length === 5) {
    q = q.eq("res_zip5", zip5);
  } else {
    const e = escapeIlike(place);
    q = q.or(`res_city.ilike.%${e}%,county.ilike.%${e}%`);
  }

  const { data: rows, error: qErr } = await q.limit(500);

  if (qErr) {
    log("error", "raw_vr query failed", {
      correlationId,
      event: "voter_match_error",
      code: "raw_vr_query",
    });
    return jsonError(
      "INTERNAL",
      "Lookup failed. Try again later.",
      500,
      correlationId,
    );
  }

  const pool = (rows ?? []) as RawVrRow[];
  const candidates = pool.filter((r) =>
    rowMatchesNameAndYear(r, first, last, body.birth_year),
  );

  if (candidates.length === 0) {
    await admin
      .from("volunteers")
      .update({
        voter_linkage_status: "not_found",
        ...nullVolunteerSummary(),
      })
      .eq("id", volunteerId);
    await completeVolunteerTaskByTitle(
      admin,
      volunteerId,
      V1_VOTER_CONFIRM_TASK_TITLE,
    );
    return jsonSuccess({
      result: "not_found",
      message:
        "We couldn’t find a confident match in the Arkansas file with what you entered. That’s okay — you can still organize with us. We’ll refine linkage over time.",
      task_completed: true,
      voter_linkage_status: "not_found",
    });
  }

  if (candidates.length === 1) {
    const row = candidates[0];
    const vid = row.voter_id?.trim() || row.key_registrant?.trim();
    if (!_personId) {
      log("warn", "matched but volunteer has no person_id", { correlationId });
    } else if (vid) {
      await persistLinkage(admin, _personId, vid);
    }
    await admin
      .from("volunteers")
      .update({
        voter_linkage_status: "linked",
        ...volunteerSummaryFromRawVr(row),
      })
      .eq("id", volunteerId);
    await completeVolunteerTaskByTitle(
      admin,
      volunteerId,
      V1_VOTER_CONFIRM_TASK_TITLE,
    );
    return jsonSuccess({
      result: "matched",
      message:
        "We found you in the Arkansas voter file. That helps us place you in the right local context — without sharing your full address here.",
      task_completed: true,
      voter_linkage_status: "linked",
    });
  }

  const redacted = candidates.slice(0, 8).map((r) => ({
    id: r.id,
    label: redactedLabel(r),
  }));

  await admin
    .from("volunteers")
    .update({ voter_linkage_status: "needs_disambiguation" })
    .eq("id", volunteerId);

  log("info", "voter_match_disambiguation", {
    correlationId,
    volunteerId,
    event: "voter_match_disambiguation",
    candidateCount: redacted.length,
  });

  return jsonSuccess({
    result: "needs_disambiguation",
    candidates: redacted,
    message:
      "We found more than one possible match. Pick the one that sounds most like you.",
  });
}

async function handleConfirm(
  admin: SupabaseClient,
  volunteerId: number,
  personId: string | null,
  body: ConfirmBody,
  correlationId: string,
): Promise<Response> {
  log("info", "voter_match_confirm", {
    correlationId,
    volunteerId,
    event: "voter_match_confirm",
  });

  const id = Number(body.raw_vr_id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonError(
      "VALIDATION_ERROR",
      "Invalid selection.",
      400,
      correlationId,
    );
  }

  const { data: row, error: rErr } = await admin
    .from("raw_vr")
    .select(
      "id, name_first, name_last, date_of_birth, voter_id, key_registrant, res_city, county, precinct_name, registrant_status, congressional_district, state_senate_district, state_representative_district",
    )
    .eq("id", id)
    .maybeSingle();

  if (rErr || !row) {
    return jsonError("NOT_FOUND", "Record not found.", 404, correlationId);
  }

  const r = row as RawVrRow;
  const first = String(body.first_name ?? "").trim();
  const last = String(body.last_name ?? "").trim();
  const by = body.birth_year;
  if (!rowMatchesNameAndYear(r, first, last, by)) {
    log("warn", "confirm mismatch", { correlationId, id });
    return jsonError(
      "VALIDATION_ERROR",
      "That choice doesn’t match what you told us. Try again.",
      400,
      correlationId,
    );
  }

  const vid = r.voter_id?.trim() || r.key_registrant?.trim();
  if (personId && vid) {
    await persistLinkage(admin, personId, vid);
  }
  await admin
    .from("volunteers")
    .update({
      voter_linkage_status: "linked",
      ...volunteerSummaryFromRawVr(r),
    })
    .eq("id", volunteerId);
  await completeVolunteerTaskByTitle(
    admin,
    volunteerId,
    V1_VOTER_CONFIRM_TASK_TITLE,
  );

  return jsonSuccess({
    result: "matched",
    message:
      "Got it — we’ve linked your voter record. That helps with local placement.",
    task_completed: true,
    voter_linkage_status: "linked",
  });
}

Deno.serve(async (req: Request) => {
  const correlationId = crypto.randomUUID();

  if (req.method === "OPTIONS") {
    return corsOk();
  }

  if (req.method !== "POST") {
    return jsonError("METHOD_NOT_ALLOWED", "Method not allowed", 405, correlationId);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    log("error", "Missing Supabase env", {
      correlationId,
      event: "voter_match_config_error",
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

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return jsonError("INVALID_JSON", "Invalid JSON body", 400, correlationId);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const volunteerId = await resolveVolunteerIdForEmail(admin, user.email!);
  if (volunteerId === null) {
    return jsonError(
      "NO_VOLUNTEER_PROFILE",
      "No volunteer profile is linked to this login.",
      404,
      correlationId,
    );
  }

  const { data: volRow, error: vErr } = await admin
    .from("volunteers")
    .select("id, person_id")
    .eq("id", volunteerId)
    .maybeSingle();

  if (vErr || !volRow) {
    return jsonError(
      "INTERNAL",
      "Could not load volunteer profile",
      500,
      correlationId,
    );
  }

  const personId = volRow.person_id as string | null;

  if (body.action === "confirm") {
    return handleConfirm(
      admin,
      volunteerId,
      personId,
      body,
      correlationId,
    );
  }

  if (body.action !== "lookup") {
    return jsonError("UNKNOWN_ACTION", "Unknown action", 400, correlationId);
  }

  return handleLookup(
    admin,
    volunteerId,
    personId,
    body,
    correlationId,
  );
});
