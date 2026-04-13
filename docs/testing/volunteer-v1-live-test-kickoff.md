# Volunteer Command V1 — live test execution kickoff protocol

**Purpose:** Start **live field testing** in a **clean, disciplined** way so observations stay trustworthy.

**Context (confirm before kickoff)**

- V1 is **deployed** and **reachable** at the URL you will share with volunteers.  
- [`volunteer-v1-field-test-plan.md`](volunteer-v1-field-test-plan.md) — cohort, daily loop, interventions.  
- [`volunteer-v1-signal-interpretation.md`](volunteer-v1-signal-interpretation.md) — real vs noise, WAIT / WATCH / ACT.  
- [`volunteer-v1-field-observation-guide.md`](volunteer-v1-field-observation-guide.md) — what to notice.  
- This document does **not** change the system.

---

## 1. Day 0 — system check (before any invite)

Run **before** the first volunteer is invited. Check each box.

- [ ] **App loads** — volunteer URL opens; no blank page or obvious console-only failure.
- [ ] **Intake** — submit a test intake (or use a throwaway email) end-to-end; reaches success / “next step” screen.
- [ ] **Magic link** — request link; complete login; land on **volunteer home / command center** with tasks visible.
- [ ] **Voter confirmation** — at least **one** path completes successfully (single match or known test path per [`volunteer-v1-smoke-test.md`](volunteer-v1-smoke-test.md)).
- [ ] **Task completion** — non-voter task **or** voter path marks complete; refresh shows expected state.
- [ ] **Manager mini view** — open `/manager` or `?view=manager`; sign in with **allowlisted** manager email; metrics load (or expected empty state).
- [ ] **Environment** — `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` on web; Turnstile site + Edge secret if using Turnstile; Edge secrets for functions; **manager allowlist** set for `get-volunteer-command-metrics` (see `.env.example` / Supabase dashboard). No secrets pasted in chat with volunteers.

If anything fails, **stop** — fix or use staging — then re-run Day 0.

---

## 2. First invite strategy

### Who to invite

- **5–15 people** (aligns with field test plan: start small, optional cap ~12).  
- **Trusted, responsive, patient** — will reply if stuck and won’t torch you publicly over rough edges.  
- **Mix of technical comfort** — not only power users; include one “typical volunteer” profile.

### How to invite

- **Direct message** (text, DM, email to one person) — **not** a mass blast for v1 of the test.  
- **Short explanation** — you’re testing a real signup flow; you want honest feedback.  
- **No overwhelming detail** — no spec dump; link + one sentence on what they’ll do.

### Example invite message (copy/adapt)

> Hey [name] — we’re doing a quiet test of our new volunteer signup. Would you try it when you have 10 minutes? I’ll send a link; you’ll add your info, get a sign-in email, and walk through one short step. No pressure to be perfect — we’re testing the flow, not you. Interested?

Send the **actual intake URL** in a **second** message or after they say yes so it doesn’t get lost in thread noise.

---

## 3. First 24 hours — manager plan

### Do this

| When | Action |
|------|--------|
| **Morning / midday / evening** | Open **manager mini view** **2–3 times** — note totals, 7-day numbers, linkage counts, time. |
| **Throughout** | **Watch** for replies (“I’m stuck,” “what’s this?”) — respond per [intervention rules](volunteer-v1-field-test-plan.md#6-intervention-rules). |
| **End of day** | **Log** one dated entry: snapshot numbers + any stuck people + anything weird — even “quiet.” |
| **Mentally** | Tag quick notes: hesitation at intake, magic link, voter step — for your log, not for live product edits. |

### Do not do this

- **Do not** walk users through **every** click — you’ll measure **training**, not the product.  
- **Do not** “fix” the **system** (code, copy, flow) during the first 24h unless **P0** (broken auth, data corruption risk) — see [`version-2-planning-trigger.md`](../product/version-2-planning-trigger.md).  
- **Do not** change **copy or flow** on a whim — destroys comparability for everyone who hasn’t started yet.

---

## 4. Do not panic rules

### Normal (expect this)

- People **hesitate** on voter confirmation or legal name fields.  
- **Some** people don’t finish in 24 hours — life happens.  
- **Some confusion** (“where’s the email?”) — especially first time through.  
- **Early drop-off** after intake success **without** requesting the magic link — note it; see if it repeats.  
- **Quiet day** in metrics — small cohorts are noisy.

### Not normal (investigate / help / escalate)

- **System breaks** — errors, infinite loading, can’t sign in at all.  
- **Multiple users stuck in the same step** after a fair try — possible real signal.  
- **Same failure** repeating (e.g. task never completes after refresh) — capture screenshots, escalate.  
- **Trust/safety** concern — handle per your campaign norms, outside this doc.

When unsure, use [`signal-interpretation`](volunteer-v1-signal-interpretation.md): **WAIT** vs **WATCH** vs **ACT**.

---

## 5. First feedback loop (24–48 hours after first invites)

Run this checklist once **24–48h** after the first wave (adjust if cohort is tiny).

- [ ] **Read** your observation log end-to-end.  
- [ ] **List** repeated phrases or **same step** mentioned twice+ by different people.  
- [ ] **Categorize** each pattern (onboarding / task / voter / system / engagement / referral) per [signal interpretation §4](volunteer-v1-signal-interpretation.md#4-signal-categories).  
- [ ] **Label** each pattern: **WAIT** (still thin), **WATCH** (promising but early), **ACT** (blocked humans or P0 only — not “rebuild product”).  
- [ ] **Do not** ship product changes from this meeting — **capture** for post-test prioritization unless P0.

---

## Related documents

| Document | Role |
|----------|------|
| [Field test plan](volunteer-v1-field-test-plan.md) | Cohort, daily loop, logging |
| [Observation guide](volunteer-v1-field-observation-guide.md) | What to notice in sessions |
| [Signal interpretation](volunteer-v1-signal-interpretation.md) | Real vs noise, WAIT/WATCH/ACT |
| [Smoke test](volunteer-v1-smoke-test.md) | Technical pre-flight |
| [V2 planning trigger](../product/version-2-planning-trigger.md) | When V2 **planning** starts |

---

## Document control

| | |
|--|--|
| **System changes** | None |
| **Mode** | V1 live test kickoff |
