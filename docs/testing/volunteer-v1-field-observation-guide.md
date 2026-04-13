# Volunteer Command V1 — field observation guide

Use this during **real-world field tests** with volunteers and one campaign manager. Goal: learn what works, what confuses people, and what to fix with **copy** vs **architecture** later.

Keep notes dated and anonymous (no full names in shared notes unless participants consent).

---

## Volunteer observations

Watch for **moments of hesitation** (paused scrolling, re-reading, asking aloud):

| Area | What to notice |
|------|----------------|
| **Intake** | Do people understand why email is required? Do they hesitate on optional fields? |
| **Magic link** | Do they know to check email *and* return to the same browser tab or bookmark? Any confusion about “same email”? |
| **Preferred name** | Do they skip it, or fill it in? Does the label feel optional vs required? |
| **Voter confirmation** | Do they understand “legal name as on ID” vs nickname? Do ZIP vs city/county confuse them? |
| **Disambiguation** | When multiple rows appear, do they know they must **pick one**? Do they try to go back and edit first? |
| **Not found / out of state** | Do people feel **rejected** or **relieved**? Note exact words they use. |
| **Empty home / no tasks** | Do they think something is broken, or do they understand “waiting on the next step”? |

**Drop-off signals:** closes tab after intake success without requesting link; abandons voter step mid-form; signs out repeatedly.

**Trust signals:** completes voter step without help; uses plain language to describe what they think the app does; says they’d come back.

**Confusion signals:** repeated submits; “is this the right page?”; reading aloud error text without knowing what to change.

**What feels smooth:** few clicks to complete a step; people describe it as “clear” without help; they move on without re-reading the same block.

---

## Manager observations

From the **mini command** view (totals, 7-day windows, linkage buckets, referral count):

| Question | Why it matters |
|----------|----------------|
| Which **one or two numbers** do you look at first when you open the page? | Validates what’s actually useful vs noise. |
| Does **“active (7 days)”** match your intuition of “people showing up”? | It’s a V1 approximation (active status + recent profile touch). |
| Do **linkage buckets** match what you hear from volunteers on the ground? | Surfaces mismatches between file data and real people. |
| Does **referral count** line up with how people say they joined? | Catches bad referral links or double-count stories. |
| What’s **missing** that you wish you had — but only as a **single sentence**? | Capture for planning without building scope here. |

**Definition clarity:** If a metric label makes you guess, note the exact label and what you thought it meant vs what you learned.

**Surprises:** Sudden spikes or zeros — note time of day, event, or comms that might explain them.

---

## Version 2 capture

**Record for V2 planning (lightweight):**

- One **user story** per friction (“As a volunteer I needed X because Y”).
- Whether the fix sounds like **better words**, **one extra line of explanation**, or **a different flow order**.
- Anything that would require **new data** or **new systems** — flag as “V2 / not copy”.

**Before changing architecture, watch for:**

- The same confusion from **different people** (pattern vs one-off).
- Whether **in-person explanation** fixes it (suggests copy/training) vs people still fail alone (suggests UX or flow).

**Copy issue vs system issue**

| Copy issue | System issue |
|------------|----------------|
| People understand *after* it’s explained once | People follow instructions and still get stuck or errors |
| Wording feels cold or unclear | Wrong state shown, task stuck, or data not saving |
| Hesitation at labels | Broken loop: can’t complete task, infinite loading, wrong linkage |

When in doubt, capture **what they tried**, **what they saw**, and **what they expected** — three bullets max per incident.

---

## Related

- Smoke test checklist: [`volunteer-v1-smoke-test.md`](volunteer-v1-smoke-test.md)
- Product scope: [`../product/phase-1-volunteer-command-v1.md`](../product/phase-1-volunteer-command-v1.md)
