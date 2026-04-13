# Volunteer Command V1 — signal interpretation layer

**Purpose:** Help the **campaign manager** (and anyone reviewing logs) **interpret** what shows up during **live field testing** — without mistaking noise for truth or rushing product changes.

**Context (confirm before use)**

- V1 is **running** in the test environment.  
- [`volunteer-v1-field-test-plan.md`](volunteer-v1-field-test-plan.md) defines **how** to run the test.  
- [`volunteer-v1-field-observation-guide.md`](volunteer-v1-field-observation-guide.md) defines **what** to notice.  
- This document does **not** change the system — it strengthens **decision-making** only.

---

## 1. What counts as a “real signal”

A **real signal** is something you would **reasonably act on** after the test window (copy, training, or engineering backlog) — not a single anecdote.

| Signal type | Examples |
|-------------|----------|
| **Repeated behavior** | The **same** hesitation, mistake, or question from **different** volunteers **in the same part of the flow**. |
| **Consistent drop-off** | Multiple people **stop** at the **same step** without a clear external cause (e.g. everyone had a power outage). |
| **Recurring confusion** | Two or more people describe **not knowing what to do next** at the **same** screen — after a fair first try. |
| **Stable metric patterns** | Mini command numbers that **hold** over several daily checks **and** match stories from volunteers (e.g. linkage bucket shifts after outreach). |
| **Corroboration** | Observation **plus** another clue: metric, screenshot, or second channel (e.g. organizer hears the same thing in a meeting). |

**Rule of thumb:** Prefer **pattern + independence** (different people, different days) over a single dramatic story.

---

## 2. What is NOT a real signal

Treat these as **noise or early data** until a pattern appears — still **log** them, but do not treat them as proof.

| Not a signal (alone) | Why |
|----------------------|-----|
| **One-off confusion** | One person misread a label; may be fatigue, distraction, or typo. |
| **Isolated error** | Single 500, one bad network, one expired magic link — verify environment before generalizing. |
| **Early unfamiliarity** | First 30 seconds of hesitation on a **new** screen — normal; distinguish from **cannot proceed**. |
| **Personal preference** | “I’d rather have purple buttons” — opinion, not a failure of the loop. |
| **Organizer-led path** | Volunteer only completed because someone stood over their shoulder — measures training, not solo usability. |
| **Concurrent life events** | Illness, travel, or job crisis — note as **confound**, not product verdict. |

**Rule of thumb:** If it happened **once** and doesn’t repeat, tag it **“watch”** not **“change product.”**

---

## 3. Common misinterpretations

Mistakes operators often make — and how to avoid them.

| Misinterpretation | Healthier read |
|-------------------|----------------|
| **Reacting too quickly** | First complaint feels urgent; **wait** for a second data point or 24–48h unless someone is **blocked**. |
| **Over-correcting from one user** | n=1 is a **hypothesis**, not a roadmap. Log and see if it repeats. |
| **Confusion = system failure** | Often **copy**, **order of steps**, or **unfamiliar domain** (voter file). Use [`field-observation-guide`](volunteer-v1-field-observation-guide.md) copy vs system table. |
| **Changing the system before a pattern emerges** | Destroys comparability; see stability section in [`version-2-planning-trigger.md`](../product/version-2-planning-trigger.md). |
| **Treating manager metrics as ground truth** | V1 metrics are **approximate** (e.g. “touched base” ≠ hours volunteered). Triangulate with volunteer stories. |
| **Assuming silence means success** | No feedback can mean **disengagement**, not satisfaction. Light check-ins are allowed per field test plan. |
| **Spike = crisis** | One event (rally, blast) can move signups; note **context** before panic or celebration. |

---

## 4. Signal categories

Use these **tags** in your daily log so patterns sort faster later.

| Category | What belongs here |
|----------|-------------------|
| **Onboarding** | Intake, email, magic link, “no profile,” preferred name, first load of home. |
| **Task clarity** | Understanding **what** the current task is, due expectations, generic “mark complete” vs voter task. |
| **Voter match** | Lookup fields, disambiguation, not found, out of state, not eligible, summary display. |
| **System errors** | Error messages, stuck loading, wrong state after refresh, task won’t complete. |
| **Engagement** | Returning after days, empty tasks, “what’s next,” motivation — not bugs, but **behavior**. |
| **Growth / referral** | Referral links, `?ref=`, whether referred count matches how people say they joined. |

One incident can have **two** tags (e.g. voter match + system error).

---

## 5. Decision framework: WAIT · WATCH · ACT

Simple rules for **what to do now** — not what to build in V2.

### When to WAIT

- First report of an issue; no second person yet.  
- Hesitation in the first **minutes** of use.  
- Metric blip **with** a known one-time cause (event day).  
- You’re about to “fix” something by **changing the product** mid-test — **wait** unless P0 safety/reliability.

**Action:** Log one line; check again next daily snapshot.

### When to WATCH

- Same area mentioned **twice** by **different** people (even if wording differs).  
- Metric trend **without** a story yet (e.g. linkage bucket stuck high).  
- One **non-blocking** error that might recur.

**Action:** Note in log; optional **neutral** volunteer check-in per [field test plan intervention rules](volunteer-v1-field-test-plan.md#6-intervention-rules); no product change.

### When to ACT

- **Blocked** volunteer(s): cannot complete a required step after a fair try — **human** help per intervention rules.  
- **Pattern confirmed:** **2+** independent cases **or** 1 severe + reproducible system error with evidence.  
- **Safety / trust:** someone feels exposed or harmed — act per campaign duty of care, outside product scope if needed.  
- **P0 reliability:** data wrong, auth broken — escalate engineering; document change if anything ships mid-test.

**Action:** Help people **through** the test; capture **evidence** for post-test prioritization — **ACT** on humans first, **defer** product changes until the test window rules say so.

---

## Related documents

- [Field test plan](volunteer-v1-field-test-plan.md) — cohort, daily loop, interventions  
- [Field observation guide](volunteer-v1-field-observation-guide.md) — detailed observation prompts  
- [Version 2 planning trigger](../product/version-2-planning-trigger.md) — when V2 **planning** starts  

---

## Document control

| | |
|--|--|
| **System changes** | None |
| **Mode** | V1 live testing — interpretation only |
