# Volunteer Command V1 — field test log

---

## 2026-04-13

Status: FAIL
Correlation ID: 41fcb7a6-e17e-412e-8257-8403177f96fe
Failing stage: volunteers insert
Visible symptom: Could not complete signup / HTTP 500
First check finding: Edge function reached; volunteers_insert error emitted; pg detail not present in logs
Disposition: ACT

---

Status: PASS  
Correlation ID: not returned on success response  
Failing stage: none  
Visible symptom: none  
First check finding: HTTP 200; intake_result = created  
Disposition: PASS  

---

Status: PASS  
Correlation ID: not returned on success response  
Failing stage: none  
Visible symptom: none  
First check finding: HTTP 200; intake_result = existing  
Disposition: PASS  

---

### Supporting details — API validation (2026-04-13)

- **Test email:** `campos-v1-gate-96fef7f3@example.com`
- **Clean run idempotency key:** `206fe299-171f-416a-bda4-a4ec4c253f51`
- **Duplicate run idempotency key (same email):** `9c91ce0e-f707-4358-a6a9-f8b3d419e207`
- **Notes:** `db push` reported remote database up to date before the calls. Responses: clean run `intake_result: "created"`; duplicate run `intake_result: "existing"`.

**Current status:** Volunteer Command V1 intake is **validated at the API level** for this project. **Next live check:** browser path — submit via the web intake form, confirm no signup error, confirm magic link / auth behavior, and confirm Command Center landing path (see [intake validation runbook](volunteer-v1-intake-validation-runbook.md), [smoke test](volunteer-v1-smoke-test.md)).

---

### volunteers_insert — implementation handoff (repo fix, pending deploy)

**Intent:** Unblock repeatable production intake at `stage: volunteers_insert` while V1 validation continues—no product expansion (e.g. candidate branding remains post-V1; see [`../product/post-v1-backlog.md`](../product/post-v1-backlog.md)).

**Changes in repo (Edge Function `create-volunteer-from-intake`):**

- **Person resolution:** `person_contact_methods` lookups no longer use `.maybeSingle()` without a row cap—duplicate rows for the same email/phone could yield PGRST116, skipped identity resolution, and bad downstream inserts. Now: ordered `limit(1)` + first row; lookup errors logged.
- **Existing volunteer detection:** Same pattern—avoid cardinality errors and align with “pick latest” semantics.
- **Unique violations (`23505`):** After insert failure, resolve existing volunteer (race or constraint) and return the same success path as an existing signup when possible.
- **Logging:** `postgrest_error` fallback serialization + `postgresCode` on volunteer insert failures so logs are not empty when PostgREST omits standard `message`/`code` fields.

**Files:** `supabase/functions/create-volunteer-from-intake/index.ts`, `supabase/functions/_shared/postgrest_error.ts`.

**Next step for operators / engineering:**

1. **Deploy** the updated `create-volunteer-from-intake` function to the production Supabase project.
2. **Re-run** the live intake validation flow ([runbook](volunteer-v1-intake-validation-runbook.md)) with a disposable email; confirm HTTP 200 and `volunteer_intake_created` (or existing-volunteer / race-resolved) in logs.
3. On any new failure, capture **`ref`**, log line for that `correlationId`, and **`postgresCode` / `pg.serialized`** if present—escalate with that packet.

**Correlation IDs on record (pre-fix):** `41fcb7a6-e17e-412e-8257-8403177f96fe`, `6e206e3d-c642-46c3-a741-c995c8101d9c`.
