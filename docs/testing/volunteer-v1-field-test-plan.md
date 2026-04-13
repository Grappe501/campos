# Volunteer Command V1 — active field test plan

**Purpose:** Run **disciplined** real-world testing of Volunteer Command V1 with a small cohort and one **campaign manager** as operator. This is **operational preparation**, not Version 2 development.

**Prerequisites**

- V1 is **deployed** to a stable URL (staging or production) with Edge functions and env (including manager allowlist for mini command, if used).
- [`volunteer-v1-smoke-test.md`](volunteer-v1-smoke-test.md) has been run successfully in that environment.
- [`version-2-planning-trigger.md`](../product/version-2-planning-trigger.md) exists for **after** the test window — you are **not** executing V2 yet.
- [`volunteer-v1-field-observation-guide.md`](volunteer-v1-field-observation-guide.md) defines **what** to notice; this document defines **how** to run the test.

---

## 1. Test structure

| Element | Guidance |
|---------|----------|
| **Cohort size** | Start with **5–12** volunteers. Large enough for patterns; small enough to support personally if someone stalls. |
| **Recruitment** | Invite people who reflect real use: mix of tech comfort levels; include at least one **referral** path (`?ref=…`) if you are testing referrals. Use a single clear ask: “We’re testing our volunteer signup — we need your honest experience.” |
| **Entry** | One canonical **intake URL** + short instructions: use a real email you can open, complete intake, request the **magic link**, sign in, complete **Confirm your voter record** when it appears. Avoid side channels that bypass the real flow unless you are testing a specific edge case on purpose. |

---

## 2. Test duration

| Phase | Suggested length | Notes |
|-------|------------------|--------|
| **Initial cycle** | **3–7 days** | Enough for signup spread, one reminder, and at least one weekend/weekday mix. |
| **Extend** | +3–5 days | Only if cohort is slow to start or you need more data on a specific question (document why). |

Close the window with a **dated** note in your observation log (see below) so metrics and stories stay comparable.

---

## 3. What the campaign manager should do (daily)

**Every day the test is active:**

1. Open the **field test snapshot** (manager mini command) once — note totals, 7-day numbers, linkage counts, referral count, and time of snapshot.
2. Scan for **stuck** people (signed up but no home progress, or home but voter step incomplete for days) using whatever light touch you already have (optional check-in message **outside** the app is fine — see intervention rules).
3. Add **one short log entry** (see §5) — even “quiet day / nothing unusual.”
4. If anything **breaks** (errors, wrong state), capture **screenshot or exact message** and whether it’s one person or many — without “fixing” the product mid-test unless P0 (see [`version-2-planning-trigger.md`](../product/version-2-planning-trigger.md) stability rules).

**Weekly (or at end of cycle):** 15-minute review against [`volunteer-v1-field-observation-guide.md`](volunteer-v1-field-observation-guide.md) — drop-offs, trust signals, manager metric usefulness.

---

## 4. Daily operator loop (checklist)

Copy this into your notes or print it. Check boxes each active day.

- [ ] Open manager view → record **total volunteers**, **new (7d)**, **touched base (7d)** (or your labels), **first task done %**, **referral count**, **linkage buckets** + snapshot time.
- [ ] Ask: any **zeros** or **spikes** that match known outreach (event, text blast)? If not, note “unexplained.”
- [ ] Scan for **stuck** volunteers (organizer judgment).
- [ ] One **log line** minimum (date + 2–4 bullets) in the observation file.
- [ ] Apply **intervention rules** (§6) — intervene only when appropriate.

---

## 5. Observation capture method

**Goal:** lightweight, searchable, dated — not a second CRM.

| Choice | Recommendation |
|--------|----------------|
| **Where** | One shared doc or spreadsheet: e.g. `Field test log — YYYY-MM` in your team’s doc system, **or** a single markdown file in a **private** repo folder if the team is dev-centric. |
| **Format** | **Dated blocks.** Each entry: **Date**, **Environment URL** (once at top), **Manager snapshot** (numbers or “not checked”), **Volunteer signals** (optional: who contacted / stuck / praised), **Anomalies**, **Follow-ups for after test**. |
| **How often** | **Daily** on active test days — even “nothing notable.” |
| **Privacy** | No full street address; use **first name + initial** or volunteer ID if needed; align with consent. |

Optional: link each week’s summary to the themes in [`version-2-planning-trigger.md`](../product/version-2-planning-trigger.md) when the test window **ends** — not during daily logging.

---

## 6. Intervention rules

**Principle:** Protect **signal**. The manager helps people **complete** the test safely; they do not **coach every hesitation** or the test measures training, not the product.

### Intervene (reach out / help)

| Situation | Action |
|-----------|--------|
| **Stuck** | Volunteer says they cannot proceed, or same person is blocked >24–48h on one step with no progress. |
| **Repeated pattern** | **Two or more** different people hit the **same** confusion in the **same** place (document before changing copy). |
| **System error** | Error message, infinite loading, or state that doesn’t match reality (e.g. task won’t complete). Capture evidence; escalate per your engineering process. |
| **Trust / harm** | Someone feels singled out, exposed, or unsafe — human-first pause and follow your campaign’s duty of care. |

### Do not intervene (let the product speak)

| Situation | Why hold back |
|-----------|----------------|
| **Minor confusion** | First-time hesitation reading a label — note it; don’t immediately explain the whole flow. |
| **Early hesitation** | Pausing before voter confirmation — many people need a minute; unless they’re blocked, wait. |
| **One-off** | Single weird typo, one person’s old browser — log it; don’t rebuild assumptions from n=1. |
| **“I wish it had X”** | Feature request — capture for post-test; don’t promise V2 during the window. |

**Between:** Offer **one** neutral nudge (“Checking in — were you able to get past the email step?”) after a reasonable delay, not minute-by-minute coaching.

---

## Related documents

- [Volunteer V1 smoke test](volunteer-v1-smoke-test.md) — pre-flight technical checks  
- [Field observation guide](volunteer-v1-field-observation-guide.md) — what to observe  
- [Version 2 planning trigger](../product/version-2-planning-trigger.md) — when V2 **planning** starts; stability during test  

---

## Document control

| | |
|--|--|
| **Mode** | V1 active field testing (execution) |
| **System changes** | None required by this document |
