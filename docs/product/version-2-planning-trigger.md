# Version 2 planning trigger — from Volunteer Command V1 field testing

This document **does not implement V2**. It defines how CAMPOS moves from **Volunteer Command V1** (field-tested) to **Version 2 planning and build** using **real-world evidence**, not speculation.

**Context:** CAMPOS remains a **Supabase-backed, modular campaign OS**; Volunteer Command is the **first flagship module** per `master-build-plan.md`. V1 scope is defined in `phase-1-volunteer-command-v1.md`. Observations during testing follow `docs/testing/volunteer-v1-field-observation-guide.md`.

---

## 1. Purpose of V1 testing

V1 is **complete enough for field testing** when: intake is hardened, auth-bound onboarding works, the volunteer command center runs, voter confirmation (match / disambiguation / terminal states) works, tasks complete reliably, referral hooks exist, and one **campaign manager** can use the **mini command** metrics snapshot.

**What V1 is meant to prove** (grounded in shipped scope, not new goals):

| Question V1 should answer | Why it matters |
|---------------------------|----------------|
| Can volunteers **onboard** (intake → magic link → home) **without** always needing hand-holding? | Validates the canonical person path and intake idempotency. |
| Do they **complete the first task** (including voter confirmation when assigned)? | Proves `volunteer_tasks` + completion loop and first-action success criteria from phase-1. |
| Do they **understand** what voter confirmation is for (local placement, not judgment)? | Tests copy and trust; informs linkage UX later. |
| Does **referral** behavior show up when `ref` / referrer metadata is used? | Validates Power-of-5 **hooks** as placeholders, not full graph analytics. |
| Can **one campaign manager** use mini command counts to see whether the loop is alive? | Validates operational visibility before broader dashboards (`master-build-plan.md`). |

**Phase-1 success criteria (reminder):** a pilot cohort can run **without duplicate spreadsheets** for identity and tasks; staff can see **who is new**, **who completed first action**, and **who needs follow-up** in **one system** — field testing validates or challenges that in practice.

---

## 2. What to observe (structured)

Use the field observation guide for **how** to take notes; use this list for **what** categories to file observations under.

### A. Volunteer behavior signals

| Signal | What to record |
|--------|----------------|
| **First-task completion** | Share completing voter confirmation (or first open task); time from first login to completion when measurable. |
| **Drop-off points** | Intake success without requesting link; voter form abandoned; disambiguation abandoned. |
| **Confusion patterns** | Repeated submits; same question from multiple people; copy vs flow uncertainty (tag per field guide). |
| **Time to action** | Rough windows only (same session vs days later) — no precision tooling required in V1. |
| **Referral behavior** | Use of referral links; whether referred count matches organizer expectations. |

### B. System performance signals

| Signal | What to record |
|--------|----------------|
| **Intake success rate** | Completes without error vs validation / rate limit / Turnstile issues (environment-specific). |
| **Match outcomes** | Rough mix: single match / disambiguation / not_found / out_of_state / not_eligible (from volunteer state + organizer notes). |
| **Error rates** | Safe Edge errors vs unexplained failures; stuck tasks; wrong linkage state. |
| **Task completion reliability** | Idempotent completion; refresh after voter step shows correct status. |

### C. Manager signals

| Signal | What to record |
|--------|----------------|
| **Useful metrics** | Which one or two numbers the manager actually opens the page for. |
| **Misleading metrics** | Where labels or “active” / completion rate **felt** wrong vs ground truth. |
| **Missing** | One sentence per insight — what they wished they could see (no feature build here). |
| **Unclear** | Definitions that required a technical explanation to the manager. |

---

## 3. Do not change during V1 testing

Stability during the test window is what makes observations **comparable**. If the product moves underfoot, you cannot tell **pattern** from **noise**.

**Do not change during V1 testing:**

| Category | Examples | Why |
|----------|------------|-----|
| **Flow shape** | Do not redesign onboarding or swap magic-link strategy mid-test. | Preserves drop-off and completion comparisons. |
| **Core matching rules** | Do not rebuild voter matching logic for one edge case without a documented spike. | Avoids conflating “data oddity” with “UX failure.” |
| **Scope** | Do not add new modules (feeds, messaging, calendar, full dashboard). | Keeps V1 proving the **vertical slice** only. |
| **UI surface** | Do not add large new sections or navigation — copy tweaks only as already allowed in refinement. | Reduces variables. |
| **Metric definitions** | Do not change Edge aggregation rules or labels for mini command without versioning notes. | Managers and notes stay aligned to one definition set. |

**Exception path:** **P0** reliability or security fixes (broken auth, data corruption risk) — document the change and **reset** the observation window for affected flows if behavior materially changes.

---

## 4. When to move to Version 2 (trigger conditions)

“Ready for V2 **planning**” means evidence exists to prioritize themes — not that every idea is built next.

Use **all** of the following as default gates; if one fails, stay in V1 observation or narrow the V2 **planning** scope (not silent scope creep).

| # | Condition | Actionable check |
|---|-----------|------------------|
| 1 | **Onboarding repeatability** | In the pilot window, **most** intended volunteers who start intake **finish** sign-in and reach home **without** organizer intervention — or failures are **documented** with cause (copy vs system). |
| 2 | **First-task stability** | First open task (including voter confirmation) is **completable** for the majority who attempt it; stuck states are **rare** and reproducible. |
| 3 | **Referral signal** | Referral path is used **enough times** to judge whether attribution is wrong, unused, or good — or a conscious decision records “referral not used this pilot.” |
| 4 | **Friction patterns** | At least **three** distinct friction notes map to **copy**, **flow order**, or **system** per the field guide — not only one-off anecdotes. |
| 5 | **Manager grounding** | The campaign manager can **explain** what mini command numbers mean in their own words **without** guessing — or gaps are explicitly listed as V2 inputs. |
| 6 | **Stakeholder checkpoint** | Short written sign-off: “V1 test window closed on [date]; observations captured; ready to prioritize V2 **themes**.” |

**Not a trigger:** “We thought of a cool feature.” **Is a trigger:** “We have repeated evidence that the current system cannot meet [specific phase-1 success criterion] without structural change.”

---

## 5. V2 build themes (not features)

These are **planning buckets** for the next roadmap conversation. They do **not** commit to shipping order or specific tickets.

| Theme | Intent |
|-------|--------|
| **Onboarding clarity** | Reduce unguided failure in intake → auth → first task based on observed friction. |
| **Movement Hub depth** | Grow volunteer home beyond V1 shell — tasks, context, and culture **after** core loop is proven (`master-build-plan.md`). |
| **Communication touchpoints** | Captain / organizer reach — **human-first** patterns; not consumer-chat parity (excluded from V1 per phase-1). |
| **Leadership and accountability layer** | Roles, queues, gentle follow-up — **after** tasks and lifecycle states are trustworthy. |
| **Data intelligence and command views** | Richer metrics and definitions **after** events/assignments produce reliable truth (`master-build-plan.md`). |
| **Linkage and civic context at scale** | Voter linkage engine maturity, disambiguation depth, local civic surfaces — **after** V1 trigger point is validated in the field. |

Themes map to the master plan’s later rows (feeds, growth engine, leadership, dashboard intelligence, broader modules) — **sequencing** stays a separate decision.

---

## Related documents

- `docs/product/master-build-plan.md` — build order and V1 vs later  
- `docs/product/phase-1-volunteer-command-v1.md` — V1 scope and success criteria  
- `docs/testing/volunteer-v1-field-observation-guide.md` — how to observe during testing  
- `docs/testing/volunteer-v1-smoke-test.md` — pre-field technical checks  

---

## Document control

| | |
|--|--|
| **Type** | Planning only |
| **Implementation** | None required by this document |
| **Schema / architecture** | No changes implied |
