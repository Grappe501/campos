# Volunteer Command V1 — production intake validation & log correlation runbook

**Purpose:** Give **operators** a short, repeatable way to **validate live intake** on the deployed system and **trace failures** using **correlation IDs** and **Edge Function logs** — without needing to read the codebase.

**Context (confirm before use)**

- This supports **Volunteer Command V1** intake only (`create-volunteer-from-intake` + web intake form).  
- This is **documentation / operations only** — it does **not** change code, schema, or modules.  
- Align with: [live test kickoff](volunteer-v1-live-test-kickoff.md), [smoke test](volunteer-v1-smoke-test.md), [signal interpretation](volunteer-v1-signal-interpretation.md), [migrations & drift](../decisions/20260413-database-migrations-and-drift.md).

---

## 1. Live intake validation flow (one real attempt)

Use this **on production** (or the exact URL volunteers use) when you need to prove intake works **right now**, or debug a **single** failure.

| Step | What to do |
|------|------------|
| **1. Prepare** | Use a **throwaway or test email** you control, or a **new** address not already a volunteer (see [smoke test §1](volunteer-v1-smoke-test.md)). Note the **time** (and timezone) you submit. |
| **2. Open intake** | Load the volunteer intake page; confirm it renders (no blank page). |
| **3. Submit** | Fill **first name, last name, email** (required) and submit **once**; wait for the response (do not double-click). |
| **4. Success path** | You should reach the **post-intake** step (e.g. success / “check your email” / next step). If so, record **pass** and optional screenshot; continue [smoke test](volunteer-v1-smoke-test.md) or [kickoff Day 0](volunteer-v1-live-test-kickoff.md) as needed. |
| **5. Failure path** | If you see an **error message**, read it **in full**. If it ends with **`(ref: …)`**, **copy the entire line** including that reference — that is your **correlation ID** for logs. |
| **6. Logs** | In **Supabase Dashboard** → **Edge Functions** → **`create-volunteer-from-intake`** → **Logs**, filter to the **same rough time window** as step 3. Search for the **correlation ID** string (or match by timestamp). |
| **7. Interpret** | Use **§2** (correlation rules) and **§3** (triage categories) below. Escalate to engineering with **screenshot + ref + log snippet** if needed. |

**Failure classes (quick mental model)**

| Class | What it usually means | First check |
|------|------------------------|-------------|
| **Auth / config** | Request never succeeds or fails before meaningful work | Web env vars (`VITE_SUPABASE_*`), function secrets, dashboard config; network/CORS |
| **DB constraint / default** | Postgres rejects a row (duplicate, FK, NOT NULL) | Edge log `pg` fields (**§2**); `code` often `23505` / `23503` / similar |
| **Missing migration** | Code expects a column/table the database doesn’t have | [Migration list](../decisions/20260413-database-migrations-and-drift.md); compare deployed project to repo |
| **Deployment mismatch** | Code or function version doesn’t match what you think is live | Function **last deployed** time vs git; logs missing expected fields (**§4**) |

---

## 2. Log correlation rules

### Where the correlation ID appears (browser)

- On a **failed** intake, the UI shows an error string. After the pilot hardening pass, messages often include **`(ref: <uuid>)`** at the end.  
- **Copy the whole message**, especially the **`ref`** value — that matches **`correlation_id`** returned by the Edge API.

### Success responses (HTTP 200) — correlation tracing

- **Error responses** from the Edge Function include **`correlation_id`** in the JSON body when present (same value as **`ref`** in the browser on failures).
- **Success responses** (HTTP 200) **do not** currently include **`correlation_id`** in the JSON body.
- **Success-path tracing** therefore relies on **Supabase Dashboard** → **Edge Functions** → **`create-volunteer-from-intake`** → **Logs**: filter by **time window** around the submit; structured log lines include **`correlationId`** and intake events (e.g. `volunteer_intake_created`).
- This gap is **not** a blocker for V1 intake validation, but operators should use **time + logs** when correlating successful signups.

### Where to look (server)

- **Supabase Dashboard** → **Edge Functions** → **`create-volunteer-from-intake`** → **Logs**.  
- Logs are **structured JSON** lines (search/filter by time). Find the line whose **`correlationId`** (or equivalent) **equals** the browser **`ref`**.

### How to match a failed request to logs

1. **Timebox** — filter logs to **±2–5 minutes** around the submit (clocks skew slightly).  
2. **ID match** — search for the **exact** `ref` / UUID from the browser.  
3. **Confirm** — the same line should mention **`createVolunteerFromIntake`** / **`volunteer_intake`** style events (wording may vary slightly by deploy).  
4. If **no line** has that ID → see **§3 · deployment mismatch / old function** in the triage table.

### What matters in PostgREST / Postgres logging (`pg`)

On failed **database** steps, logs may include a **`pg`** object (or similar) with:

| Field | Plain language |
|--------|----------------|
| **message** | Short description of what went wrong (human-readable). |
| **code** | Machine code — Postgres **SQLSTATE**-style (e.g. constraint violations). Often the fastest clue for **duplicate** vs **missing FK**. |
| **details** | Extra context (e.g. **which** constraint or **which** key failed). |
| **hint** | Suggestion from Postgres (not always present). |

**Operators:** You don’t need to memorize codes. **Paste `message` + `code` + `details`** into the ticket for developers. **Campaign lead:** Use **§4** to decide **WAIT / WATCH / ACT** per [signal interpretation](volunteer-v1-signal-interpretation.md).

---

## 3. Failure triage categories

Use **`stage`** (or equivalent) in logs when present: **`people_insert`**, **`volunteers_insert`**, **`task_insert`**. That tells you **which INSERT** failed.

| Category | What it looks like | First thing to check | WAIT / WATCH / ACT |
|----------|---------------------|----------------------|--------------------|
| **Intake failure before DB write** | HTTP **4xx** (validation, bad JSON), **429** (rate limit), or error **without** a DB `stage` / people row attempt | Rate limits, malformed body, Turnstile/config if enabled; compare to [smoke test prerequisites](volunteer-v1-smoke-test.md) | **WATCH** if isolated; **ACT** if everyone is blocked |
| **People insert failure** | Log **`stage`: `people_insert`**; browser may show **“Could not complete signup”** + `ref` | `pg` fields — constraint on `people`, missing column, trigger failure | **ACT** if reproducible — data path blocked |
| **Volunteer insert failure** | Log **`stage`: `volunteers_insert`**; browser may show **“Could not complete signup”** + `ref` | `pg` fields — unique email, FK to `people`, **NOT NULL** / default mismatch | **ACT** if reproducible |
| **Task insert failure** | Log **`stage`: `task_insert`**; browser message may differ (e.g. **partial signup** wording — check exact text on screen) | `pg` fields; volunteer row may already exist — **partial** state | **ACT** — volunteer may be stuck without task |
| **Deployment mismatch / old function live** | Browser has **`ref`** but **no** matching log line; or logs **lack** `pg` / `stage` you expect after a deploy | Function **deploy time** vs expected release; redeploy **function only** is an engineering action | **WATCH** until confirmed; **ACT** if logs never align |
| **Missing migration / missing column** | `pg.message` / `details` mention **column does not exist**, **relation does not exist**, or similar | [Migration & drift doc](../decisions/20260413-database-migrations-and-drift.md); `migration list` vs repo | **ACT** — engineering applies migration |

**Reminder:** One-off errors → [signal interpretation — WAIT](volunteer-v1-signal-interpretation.md). Repeating or blocking → **WATCH** or **ACT** as above.

---

## 4. Related documents

| Document | Use when |
|----------|----------|
| [Live test kickoff](volunteer-v1-live-test-kickoff.md) | Day 0 checklist before inviting volunteers |
| [Smoke test](volunteer-v1-smoke-test.md) | Full technical pre-flight (staging / test project) |
| [Signal interpretation](volunteer-v1-signal-interpretation.md) | WAIT / WATCH / ACT for patterns |
| [Migrations & drift](../decisions/20260413-database-migrations-and-drift.md) | Schema vs repo, migration list |

---

## Document control

| | |
|--|--|
| **System changes** | None |
| **Mode** | V1 production intake validation & log correlation |
