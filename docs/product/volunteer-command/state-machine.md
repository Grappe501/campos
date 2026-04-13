# Volunteer Command — lifecycle state machine

This document defines **volunteer lifecycle states**, **what each state means operationally**, and **what moves people between states**. It is implementation-usable: triggers name **events**, **thresholds**, and **actors** (volunteer, captain, staff, system, Steve).

**Principles**

- States are **descriptive**, not moral labels—**inactive** is not “bad.”  
- Transitions should be **auditable** where permissions or sensitive outreach change.  
- Automation suggests; **humans confirm** for sensitive promotions (e.g., leadership, elevated data access).  
- Steve **does not** own legal/compliance decisions—routes to staff.

---

## State definitions

| State | Meaning | Typical UX / ops behavior |
|-------|---------|---------------------------|
| **New** | Identity exists; minimal or no volunteer journey started. | Limited messaging; focus on intake completion and dedupe. |
| **Welcomed** | Confirmed welcome; basic consent and Hub entry; next step visible. | Onboarding can begin; gentle nudges only. |
| **Onboarding** | Active path through understand → assign; first task not yet reliably completed. | Higher-touch prompts; Steve assists; captain may be assigned. |
| **Active** | Contributing in a lane on an expected cadence (defined per campaign). | Full Hub access per role; tasks and feeds; recognition eligible. |
| **Active leader** | Distributed leadership role in effect: captain, lead, moderator, turf owner—**with** scope and training. | Extra permissions; accountability check-ins; audit emphasis. |
| **Paused** | Explicit or soft pause: life, travel, burnout prevention—**intentionally** reduced asks. | Reduced notifications; **no** public “inactive” shaming; easy resume path. |
| **Needs follow-up** | Human triage required: confusion, conflict, accessibility need, or failed onboarding attempt. | Queue for captain/staff; Steve stops at scripted empathy + routing. |
| **At-risk** | Engagement dropping; not yet inactive—**early warning**. | Private outreach; easier re-entry task; **not** automated guilt. |
| **Inactive** | No meaningful engagement for a campaign-defined window; relationship not necessarily closed. | Win-back path; alumni option; data retention per policy. |
| **Alumni / supporter-only** | Still aligned but not organizing—may donate, amplify, or receive light updates. | Comms tone shifts; no task pressure; optional opt-down paths. |

---

## Triggers: events that cause transitions

Events are **things that happen** in product, ops, or integrations. Multiple events may be combined for a transition.

### System / analytics triggers

- **Timer elapsed** — no login, no task completion, no meaningful Hub action for X days (configurable by lane).  
- **Threshold crossed** — engagement score or simple rule (e.g., 3 consecutive missed shifts) moves **active → at-risk**.  
- **Completion signals** — first task done, training done, leadership checklist done.

### Volunteer-initiated

- **Completes welcome step** — `new → welcomed`.  
- **Starts onboarding path** — `welcomed → onboarding` (or `new → onboarding` if welcome is instant).  
- **Completes first meaningful win** — `onboarding → active` (definition campaign-specific).  
- **Requests pause** — `active → paused` or `active leader → paused` (may require staff for leaders).  
- **Declares return** — `paused → onboarding` (light) or `paused → active` if lane unchanged and rules current.  
- **Chooses supporter-only** — `active → alumni/supporter-only` (consent-aware).  
- **Explicit exit** — `* → inactive` or `* → alumni` per choice and policy.

### Captain / staff-initiated

- **Manual state set** — correction after bad data, after conflict resolution, or after human interview.  
- **Promote to leader** — `active → active leader` after training + role record + permission change.  
- **Demote / step down** — `active leader → active` or `paused`; **never** silent—volunteer notified with dignity.  
- **Flag for follow-up** — `* → needs follow-up` (from any state except terminal archival).  
- **Clear follow-up** — `needs follow-up → active` / `onboarding` / `paused` depending on resolution.

### Steve-assisted (policy-bound)

- **Suggests next step** — does not change state alone except where product explicitly ties (e.g., “tap to confirm pause”).  
- **Escalation** — `needs follow-up` when Steve hits limits (harassment, self-harm risk, legal question).

---

## Transitions (reference)

### Entry from unknown / CRM

| From | To | Trigger |
|------|-----|---------|
| (none) | **new** | CRM record created from intake without journey |
| **new** | **welcomed** | Welcome message acknowledged / Hub first visit / staff marks welcomed |

### Onboarding band

| From | To | Trigger |
|------|-----|---------|
| **welcomed** | **onboarding** | Starts guided path |
| **onboarding** | **active** | First meaningful task completed + assignment accepted |
| **onboarding** | **needs follow-up** | Stuck threshold, self-reported confusion, or captain flag |
| **onboarding** | **inactive** | Explicit opt-out or long abandon (policy) |

### Active band

| From | To | Trigger |
|------|-----|---------|
| **active** | **active leader** | Staff/captain promotion + training gates + role assignment |
| **active leader** | **active** | Step-down completed; permissions revoked cleanly |
| **active** | **at-risk** | Missed cadence / engagement drop |
| **active leader** | **at-risk** | Missed leadership check-in or team health signal (human-defined) |

### Risk and pause

| From | To | Trigger |
|------|-----|---------|
| **at-risk** | **active** | Re-engagement task completed or human clears |
| **at-risk** | **needs follow-up** | Private outreach fails or issue escalates |
| **active** / **active leader** | **paused** | Volunteer requests or staff sets pause |
| **at-risk** | **paused** | Volunteer chooses pause over churn |
| **paused** | **onboarding** | Return with material changes since last assignment |
| **paused** | **active** | Resume with valid lane + current training |

### Inactive and alumni

| From | To | Trigger |
|------|-----|---------|
| **active** / **at-risk** | **inactive** | Silence past window; or explicit goodbye |
| **inactive** | **active** | Re-engagement win (may re-enter **onboarding** lightly) |
| **inactive** | **alumni/supporter-only** | Chooses light touch; or campaign moves them to supporter track |
| **active** | **alumni/supporter-only** | Chooses to step back from organizing |

### Needs follow-up

| From | To | Trigger |
|------|-----|---------|
| **needs follow-up** | **active** / **onboarding** / **paused** | Issue resolved |
| **needs follow-up** | **inactive** | Explicit withdrawal or unresolvable |

---

## Guardrails

- **active leader** must not activate without **training + role + permissions** in sync—state machine should not get ahead of access control.  
- **at-risk** outreach should default **private** channels.  
- Bulk transitions (e.g., year-end archive) require **staff action** and policy review—no silent mass `→ inactive`.  
- **alumni/supporter-only** must respect **consent**—comms frequency and ask types change.

---

## Dashboard and automation hooks

- **Command Center** views: counts by state, funnel health, at-risk queues, leader bench.  
- **Steve**: nudges differ by state (e.g., softer in **paused**, more instructional in **onboarding**).  
- **Integrations**: field/events may emit **completion** events that prevent false **at-risk** during heavy offline weeks—configurable **lane-aware** silence.

---

## Related documents

- `lifecycle-model.md` — phases vs states  
- `user-journeys.md` — persona paths  
- `behavior-model.md` — Steve and accountability  
