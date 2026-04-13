# Volunteer Command V1 — smoke test checklist

Run these checks **on staging** (or a dedicated test project) before field testing with real people. Keep notes of pass/fail and the environment (URL, date).

## Prerequisites

- Migrations applied (including intake hardening tables).
- Edge Functions deployed (`create-volunteer-from-intake`, `get-volunteer-context`, `match-volunteer-to-voterfile`, `complete-volunteer-task`).
- Web app built with valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Field / production:** set `VITE_TURNSTILE_SITE_KEY` (web) and `TURNSTILE_SECRET_KEY` (Edge secret) for Cloudflare Turnstile; rate limiting still applies. For local dev without Turnstile, omit both — verification is skipped server-side.

## Flows

### 1. New volunteer signup

- [ ] Open the volunteer intake page.
- [ ] Submit the form with a **new** email not already tied to a volunteer.
- [ ] Confirm success message / transition to “check email” (or equivalent) without errors.
- [ ] Confirm no duplicate volunteer rows for that email if you submit twice with the same browser session (idempotency key).

### 2. Login via magic link

- [ ] Request magic link for the email used in step 1.
- [ ] Complete login from the email link (or OTP flow your app uses).
- [ ] Land on the volunteer home / command center with tasks loaded.

### 3. Voter confirmation — success (linked)

- [ ] With the voter confirmation task open, enter data that yields a **single** clear match (or complete disambiguation to one row).
- [ ] Confirm linkage shows as linked and voter summary (if applicable) appears without errors.

### 3b. Voter — disambiguation (multiple matches)

- [ ] Enter lookup data that yields **more than one** plausible file match.
- [ ] Confirm candidate list appears (redacted labels only), pick one row, and complete confirmation.
- [ ] Linkage resolves to **linked** (or expected terminal state) without exposing raw voter rows.

### 4. Voter — not found

- [ ] Use a **separate test volunteer** (or reset test data per your process) and enter lookup data that yields **no** Arkansas file match.
- [ ] Confirm “not found” messaging is calm and the flow completes without exposing raw voter rows.

### 5. Voter — out of state

- [ ] Use flow that marks registration **outside Arkansas** (per product behavior).
- [ ] Confirm out-of-state status and messaging; no crash after refresh.

### 6. Task completion (non-voter task)

- [ ] If a generic “mark complete” task exists, complete it and verify success banner / refresh.
- [ ] Repeat completion: should be **idempotent** (no duplicate completion errors).

### 7. Returning user

- [ ] Sign out, then sign back in with the **same** email as an existing volunteer.
- [ ] Command center loads; no new volunteer row created on intake (use a fresh browser or incognito only if testing **new** signup again).

### 8. Preferred name (display)

- [ ] As a volunteer with **no** `preferred_name` yet, confirm the inline “What should we call you?” prompt appears in the left rail.
- [ ] Save a short name; greeting updates after refresh and the prompt hides.
- [ ] Confirm the command center uses **preferred_name** when set, otherwise **first_name** (then full name / email as before).

### 9. Intake rate override (staff / tooling only)

- [ ] With `INTAKE_RATE_OVERRIDE_SECRET` configured on the Edge environment (≥32 characters), confirm a server-side `POST` to `create-volunteer-from-intake` with header `X-Campos-Intake-Rate-Override` equal to that secret **bypasses** rate limiting (e.g. after many rapid requests that would normally 429).
- [ ] Confirm this header is **not** used from the public web app (no secret in Vite).

## Abuse / hardening (spot checks)

- [ ] Rapid repeated intake submissions from the same client eventually receive **429** / rate-limit style messaging (not a stack trace).
- [ ] Error responses from Edge Functions show a **safe** message (no raw Postgres or internal stack traces in the browser).

## Sign-off

- Tester: _______________  
- Date: _______________  
- Environment: _______________
