# Volunteer Command — culture and moderation

The Movement Hub is **social** by design: volunteers interact, celebrate, disagree, and coordinate. This document defines the **culture layer**—norms, moderation, escalation, and the **Steve Layer**—so openness does not collapse into **chaos, harm, or reputational risk** for the campaign or its people.

**Alignment:** `docs/architecture/core-principles.md` (positive public celebration, private correction; AI within policy); `behavior-model.md` (Steve); `system-identity.md` (Hub purpose).

---

## Moderation philosophy

**Guided moderation:** The campaign sets **clear norms**; tools make norms **visible**; moderators (captains, volunteer leads, staff) have **authority** inside scope; staff retains **override** for serious risk.

**Open posting with tone guidance:** Volunteers can post in permitted surfaces—not a free-for-all. **Pinned norms**, **examples of good posts**, and **Steve suggestions** reduce friction before problems escalate.

**Anti-chaos guardrails:** Rate limits, report buttons, role-based posting (where needed), and **separation of official guidance** from informal chatter so priorities stay legible.

---

## Roles in moderation

| Role | Typical scope |
|------|----------------|
| **Group moderators** | Day-to-day tone, off-topic reroutes, minor conflicts. |
| **Captains / leads** | Coaching, private correction, reassignment conversations. |
| **Staff** | Policy breaks, legal/safety risk, press-facing issues, repeat harm. |
| **Steve (AI)** | Suggestions, de-escalation nudges, routing—**not** final judge on harassment or compliance. |

---

## Steve Layer (conceptual)

The Steve Layer is the **governed interface** between volunteers and model-assisted help: voice, timing, transparency, and escalation.

### Steve Voice

- **Warm, calm, confident, people-first** — consistent with `behavior-model.md`.  
- **Invites before instructs** — belonging before tasks.  
- **Never performative allyship or fake intimacy** — honest, straightforward organizer tone.

### Steve + system transparency (sensitive contexts)

When stakes are high—**harassment**, **safety**, **self-harm risk**, **legal/compliance**, **disinformation**, **electoral manipulation**—the system must:

- **Be transparent** that Steve is **not** a lawyer or safety officer.  
- **Stop** at scripted empathy + **route to humans**; no improvised legal or tactical advice.  
- **Avoid** collecting unnecessary sensitive details in chat when a **reporting path** is the right container.  
- **Log** escalation events for staff review per policy—without turning logs into public surveillance theater.

**Guardrail:** Steve **does not** “settle” interpersonal disputes or **moderate** invisibly without human visibility when harm is alleged.

---

## AI-driven Steve suggestions (moderation-adjacent)

Steve may:

- Suggest **softer phrasing** before a heated reply is sent.  
- Offer **de-escalation** prompts in threads (“take it to DM,” “bring in captain”).  
- Flag **possible policy issues** to moderators (e.g., PII, voter data in a photo)—**assistive**, not auto-punitive.

Steve must **not**:

- Auto-delete serious allegations without human review (except clear automated categories like disallowed PII types—policy-defined).  
- Publicly shame users.  
- **Pretend** to have seen content it has not been allowed to process—honesty about limits.

---

## Conflict de-escalation

**Default sequence**

1. **Norms reminder** (pinned; Steve may surface once).  
2. **Private channel** — take conflict out of public feeds when possible.  
3. **Captain/staff** — human mediation for sustained conflict.  
4. **Escalation** — staff decision on muting, removal, or ban—with **audit** and **appeal path** where feasible.

**Principles**

- **Assume good faith first**—not always last—but **safety** trumps politeness when threatened.  
- **Intersectional care**—power dynamics (race, gender, age, disability) matter; staff training is part of the culture layer, not an afterthought.

---

## Positive reinforcement

- **Celebrate effort, care, consistency**—not only top producers.  
- **Team wins** as often as individual wins.  
- **Gratitude** from leadership in campaign feed—sparingly enough to stay meaningful.

---

## Escalation rules (reference)

| Signal | First response | Escalate to staff when |
|--------|----------------|-------------------------|
| Off-topic spam | Moderator redirect / mute | Repeated after warning |
| Mild disagreement | Norms + private coaching | Harassment or protected-class targeting |
| Personal attack | Private warning; remove if public | Threats, doxxing, stalking |
| Disinformation | Remove or label per policy | Coordinated harm, legal exposure |
| Self-harm risk | Immediate human crisis path | Always—Steve routes, does not “handle” |
| Voter data mishandling | Remove content; lock actions | Legal/compliance review |

Exact playbooks are **campaign-configured** within legal bounds; the **structure** above is stable.

---

## No public shaming

- **Correction is private** — performance issues, missed tasks, coaching—per doctrine.  
- **Moderation actions** (mute, remove) are **not** announced as humiliation; where transparency to a group is needed, keep it **factual and minimal**.  
- **Leaderboards** that pit people against each other in degrading ways are **out of culture scope**—see module catalog on recognition without toxicity.

---

## Celebration public, correction private

- **Public:** wins, milestones, gratitude, team pride—with **consent** (especially for photos and names).  
- **Private:** performance feedback, interpersonal friction, compliance issues, safety concerns.

Feeds and DMs implement this split; **Steve** follows it strictly.

---

## Relationship to network and groups

- **Group** moderation is **first line**; **local** feeds may need **captain** norms; **campaign** feed may have **stricter** posting roles.  
- **Discoverability** choices (`group-architecture.md`) affect who can pile on—moderation policy must account for **pile-on risk** in open threads.

---

## Suggested phasing: V1 vs later

**V1 culture/moderation**

- Pinned norms; **report** flow; **moderator** roles on groups; **staff** escalation; **Steve** limited to tone prompts + routing in sensitive contexts; **campaign feed** posting restricted to authorized roles; **group/local** feeds with member posting where policy allows.

**Later**

- Advanced **assistive** moderation (classifiers under strict policy), **appeals** workflow, **partner** moderation for organic community groups, richer **media** screening with human review queues.

---

## Related documents

- `network-layer.md` — connectivity and discoverability  
- `group-architecture.md` — group types and visibility  
- `feed-architecture.md` — feed lanes and content rules  
- `behavior-model.md` — Steve progression and accountability  
- `docs/architecture/core-principles.md` — AI bounds and human approval  
