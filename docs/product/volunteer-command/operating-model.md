# Volunteer Command — operating model

Volunteer Command is best understood as **a looped system**, not a static database. People enter, get oriented, placed, supported, grown, and sometimes moved—all while the campaign learns and adjusts. Below are the **subsystems** that must exist in product and operations, even if early releases emphasize a subset.

---

## Intake

**Purpose:** Bring supporters from curiosity to a defined starting point without losing them in forms or duplicate records.

**What “good” looks like:** Clear entry paths (events, web, referrals, relational invites); attribution so organizers know what worked; consent captured correctly for later outreach; duplicate detection before the volunteer is asked to tell their story twice.

**Touches:** CRM identity, consent, optional integration with signup surfaces (`campaign-function-master-map.md` — website/actions).

---

## Onboarding

**Purpose:** Turn a new volunteer into someone who knows **what the campaign is asking for this week**, **where they fit**, and **how to get help**—per doctrine: clarity, fit, ownership, path, expansion opportunity.

**What “good” looks like:** Adaptive paths by lane, geography, and experience; short wins in the first session; policy and safety basics where required; warm handoff to a human when automation should not own the conversation.

**Touches:** Steve (onboarding coach); training hooks; tasks; feeds.

---

## Placement

**Purpose:** Match people to **lanes**—teams, geographies, programs—that fit skills, availability, and boundaries.

**What “good” looks like:** Honest role descriptions; realistic time asks; opt-in to intensity; staff override only with transparency and care, not silent reassignment into unsuitable work.

**Touches:** Teams, roles, geography; Command Center visibility for staffing gaps.

---

## Growth

**Purpose:** Move volunteers along **optional** depth—new skills, broader scope, relational leadership—without treating everyone as a future “manager.”

**What “good” looks like:** Visible next steps; mentorship and captain pathways; Power of 5 culture supported by prompts and recognition, not coercion.

**Touches:** Training; recognition; relational organizing handoffs.

---

## Leadership detection

**Purpose:** Notice **emerging leaders** through signals the campaign agrees are legitimate—consistency, care for others, follow-through, team health—not only raw volume.

**What “good” looks like:** Suggestions to staff and captains; privacy-preserving summaries; human confirmation before formal leadership titles or elevated permissions.

**Touches:** Analytics definitions; audit; permissions model.

---

## Accountability

**Purpose:** Keep commitments clear and kind—between volunteers and teams, and between teams and campaign priorities.

**What “good” looks like:** Private coaching for misses; shared visibility for team goals; no public shaming; escalation paths for harassment or policy breaks.

**Touches:** Tasks, feeds moderation, reporting; alignment with “positive public celebration, private correction.”

---

## Training

**Purpose:** Deliver **just-in-time** knowledge—relational scripts, legal guardrails, tool usage—in formats organizers can update without engineering for every edit.

**What “good” looks like:** Short modules; gating for sensitive actions; proof of completion where compliance requires it; refreshers before high-risk windows (e.g., Election Week).

**Touches:** Compliance module interfaces; training records shared platform-wide.

---

## Network building

**Purpose:** Help volunteers **organize their own communities** and sustain team coherence—group spaces, captain tools, relational circles—without turning the OS into unmanaged social media.

**What “good” looks like:** Group feeds with clear purpose; tools for invites and follow-up; boundaries for safety and data minimization.

**Touches:** Feeds & groups; relational organizing; CRM edges for “who knows whom” where the campaign adopts that depth.

---

## Recognition

**Purpose:** Make progress visible and morale sustainable—celebrate effort and care, not only brute output.

**What “good” looks like:** Milestones that reflect movement values; team shout-outs; careful avoidance of gimmicks that pit people against each other.

**Touches:** Movement Hub surfaces; optional integrations with events and field outcomes.

---

## Reassignment

**Purpose:** Handle life changes, burnout, mismatch, or strategic pivots **without ghosting volunteers** or leaving dangling permissions.

**What “good” looks like:** Clear reasons (where appropriate); humane exits; re-matching; audit when roles or sensitive access change.

**Touches:** Permissions lifecycle; CRM; staff workflows in Command Center.

---

## Dashboard intelligence

**Purpose:** Give **volunteers** a sane personal view and **leadership** a truthful movement picture—coverage, bottlenecks, retention risk, emerging leaders—without duplicating a second CRM in a BI tool.

**What “good” looks like:** Shared metric definitions with analytics core; drill-down to teams and geographies; intelligence that suggests **next best actions** for organizers (routing, support), not vanity scores.

**Touches:** Command dashboard; analytics core; staff briefing agents (read-only synthesis, human-reviewed).

---

## How the loop runs

1. **Intake → onboarding → placement** gets someone into motion quickly.  
2. **Training + network building + accountability** keep work aligned and humane.  
3. **Growth + leadership detection + recognition** deepen the bench.  
4. **Reassignment** handles reality when people or plans change.  
5. **Dashboard intelligence** tightens the loop for staff and captains.

---

## Questions to resolve before data modeling

These are planning decisions that shape entities, relationships, and permissions—resolve explicitly rather than implied in UI mockups alone.

1. **Granularity of “team” vs “group” vs “geography”** — Are these layers in one hierarchy, overlapping tags, or both?  
2. **Captain / lead authority model** — What can distributed leaders approve or assign without staff, and what must always escalate?  
3. **Power of 5 semantics** — Tracked as informal goals, structured invites, or both—and how to avoid exploitative optics in data?  
4. **Volunteer vs supporter** — Single person record with engagement states, or separate concepts—especially for fundraising and comms consent?  
5. **Cross-module task ownership** — When field or events creates work, which system owns the task row and lifecycle?  
6. **Steve’s memory and boundaries** — What onboarding state is persisted vs ephemeral; what must never be inferred without explicit volunteer input?  
7. **Moderation and safety** — Reporting, muting, removal—what is tenant-wide policy vs campaign-configurable?  
8. **Metric definitions** — “Active volunteer,” “shift completed,” “relational ask logged”—single analytics dictionary to prevent six dashboards with six truths.

---

## Related documents

- `mission.md` — strategic role  
- `system-philosophy.md` — beliefs and boundaries  
- `value-proposition.md` — volunteer vs leadership value  
- `docs/product/module-catalog.md` — module composition rules  
