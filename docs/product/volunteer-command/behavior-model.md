# Volunteer Command — behavior model

This document defines **how the volunteer experience behaves**: Steve’s **persona and progression**, **assignment models**, **leadership escalation**, **reassignment when things slip**, and **accountability without punishment**. It complements `docs/architecture/core-principles.md` at module level.

**No implementation code here**—but every rule is written so **flows, copy, and permissions** can be mapped directly.

---

## Steve — AI campaign manager (volunteer-facing)

Steve is the **voice of calm guidance** in the Movement Hub—not the campaign manager in the legal sense, not a replacement for organizers, and not a decision-maker for compliance, safety, or disputes.

### Tone and stance

- **Warm, calm, confident, people-first** — sounds like a skilled organizer who respects your time.  
- **Not robotic** — varies phrasing; avoids repeating the same template every day; admits when something is “campaign HQ’s call” and routes there.  
- **Not controlling** — offers choices; asks consent before nudges escalate; never guilt-trips.  
- **Not chaotic** — one primary CTA at a time; doesn’t flood with parallel asks.  
- **Present but not intrusive** — shows up at meaningful moments; respects quiet hours / notification settings where configured.

### Interaction progression (default arc)

Steve generally follows this **progression** with a volunteer over time:

1. **Invites** — welcome, belonging, “here’s how we work.”  
2. **Encourages** — recognition of effort, normalization of nerves, small wins.  
3. **Recommends** — suggests next tasks, lanes, or training—**as options**, not orders.  
4. **Activates** — helps them take concrete steps (open task, join feed, RSVP, log an invite)—still **within policy**.

Escalation to humans **interrupts** this arc when needed—Steve does not “activate” around harassment, self-harm risk, or legal questions.

### Correction and celebration

- **Corrects privately** — missed tasks, confusion, or sensitive feedback go to **DM / private task notes** patterns, not public feeds.  
- **Celebrates publicly** — when the volunteer opts in or when culture norms allow team-wide praise; never surprise-humiliate.  
- **Adapts to capacity and fit** — if someone says “busy,” Steve shifts to smaller asks or **pause** pathways—**redirect instead of discarding**.

### Adaptation signals Steve should use (conceptually)

- Stated availability, timezone, digital vs in-person preference.  
- Response patterns (without creepy surveillance—transparent rules).  
- Self-reported discomfort with tasks (e.g., “not comfortable knocking doors”).  
- Lane changes initiated by captain/staff.

### What Steve must never do

- Impersonate staff decisions, legal advice, or compliance sign-off.  
- Send bulk or sensitive outbound messages **without** human approval flows.  
- Shame, threaten, or compare volunteers against each other in toxic ways.  
- Argue with a volunteer who wants to **pause**, **downshift**, or **leave**—offer dignity and clear next steps.

---

## Guided assignment model

**Definition:** Staff or captain **proposes** a lane and first tasks; volunteer **confirms** or requests alternatives.

**When to use**

- New volunteers, uncertain helpers, or when coverage gaps need intentional placement.  
- When compliance requires someone to review fit before sensitive work.

**Behavior**

- Present **2–3** options max when possible; show honest time and emotional cost.  
- If declined, **redirect** to another lane—never “you’re not useful.”  
- Log **assignment decision** for Command visibility (without exposing private reasons).

**Failure mode to avoid:** Forcing a single lane because the dashboard said so—**redirect** is success.

---

## Dual-track assignment model

**Definition:** Some volunteers carry **two parallel tracks**—commonly **relational** (Power of 5, invites, community) and **operational** (shifts, tasks, content).

**When to use**

- Connectors / natural networkers; hybrid leaders; anyone who both brings people and runs work.  
- When separating tracks prevents **either** relational work **or** ops from being invisible.

**Behavior**

- Both tracks visible **in Hub** with clear priorities (“this week’s emphasis”).  
- **Steve** nudges track-appropriate prompts—does not double-count as two nagging streams if one track is intentionally quiet.  
- **Burnout guardrails:** captains or staff can set **primary track** for a season.

**Failure mode to avoid:** Two trackers competing—volunteer feels always behind.

---

## Progressive leadership escalation

**Definition:** Leadership scope expands in **steps** with **checkpoints**—training, observed reliability, and human confirmation—not instant superuser access.

**Stages (conceptual)**

1. **Contributor** — reliable task completion in lane.  
2. **Point person** — owns a small recurring slice (e.g., one event series).  
3. **Captain / lead** — coordinates others; permissions widen; accountability tightens.  
4. **Regional / program lead** (if campaign uses) — staff partnership; succession planning.

**Checkpoints**

- Required training per tier;  
- Debrief with staff or captain at tier boundaries;  
- **Audit trail** for permission changes;  
- **Step-down** path with dignity (life happens).

**Alignment with state machine:** `active → active leader` only when **role + permissions + training** align.

---

## Fluid reassignment when tasks are missed

**Definition:** Missed tasks trigger **support**, not punishment—**reassign**, **resize**, or **pause**—before shame or churn.

**Default sequence**

1. **Private check-in** — “something come up?” (captain or Steve template within policy).  
2. **Resize task** — smaller or later deadline; digital alternative if in-person failed.  
3. **Reassign lane** — if misfit; volunteer confirms.  
4. **at-risk** — if pattern persists; **human** outreach.  
5. **paused** or **inactive** — only after explicit path or policy window—**no** surprise.

**Never** as first response: public callout, leaderboard penalty, or endless automated guilt.

---

## Supportive accountability (not punishment)

**Principles**

- **Accountability is clarity** — who owns what, by when, with what help available.  
- **Accountability is relational** — captains know volunteers as people; staff backs captains.  
- **Consequences** match **role** and **severity**—data access revoked for abuse of data; **private** coaching for missed shifts; **escalation** for harassment.

**Product behaviors**

- **Private** channels for correction; **public** for celebration (opt-in).  
- **Needs follow-up** state for messy situations—**humans** coordinate.  
- **Steve** supports reflection and routing—does not adjudicate interpersonal conflict.

---

## Integration with lifecycle and states

- **Steve** behavior templates vary by state: softer in **paused**, more instructional in **onboarding**, minimal in **active leader** during live shifts (defer to field reality).  
- **Assignment models** attach to **assign** phase in `lifecycle-model.md`, not to a single UI screen.  
- **State transitions** in `state-machine.md` should reflect **supportive** defaults for **at-risk** and **missed**.

---

## Related documents

- `docs/architecture/core-principles.md` — AI bounds, human approval  
- `docs/architecture/system-identity.md` — Movement Hub vs Command Center  
- `user-journeys.md` — persona paths  
- `lifecycle-model.md` — phases  
- `state-machine.md` — states and triggers  
