# Volunteer Command — leadership system

Volunteer Command treats **leadership** as **distributed, opt-in, and accountable**—not a single title ladder copied from corporate org charts. This document defines the **leadership model**, how **emergence** is detected, how **geography** maps to coverage, and how **visibility** respects safety and dignity.

Structured for later mapping to **roles**, **permissions**, **groups**, and **dashboards**—no code or SQL.

---

## Dual-layer leadership model

**Layer A — Movement leadership (people and teams)**  
Captains, hosts, relational leads, moderators: authority over **volunteer experience**, coordination, tone, and **scoped decisions** inside campaign policy.

**Layer B — Operational / departmental leadership (staff-aligned)**  
Comms, field, finance-adjacent leads: authority over **programs** and **message discipline**—often staff-adjacent; may overlap Layer A for hybrid roles.

**Principle:** The product must not **collapse** these into one “admin” role. **Permissions** and **audit** differ by layer; volunteers see **peer leadership** first in Hub, not a fake corporate org chart.

---

## Natural leadership vs declared leadership

| Kind | Description | System behavior |
|------|-------------|-----------------|
| **Natural leadership** | Emerges from behavior: consistency, care for others, follow-through, team health—not only metrics. | **Signals** surface candidates to captains/staff; **human confirmation** before formal scope. |
| **Declared leadership** | Titles and scopes assigned: captain, precinct lead, event lead. | **Role records**, **training gates**, **permissions** aligned; **visibility** of title controlled per policy. |

**Rule:** Declared leadership without natural followership fails—product supports **check-ins** and **step-down** with dignity (`state-machine.md`, `behavior-model.md`).

---

## Community contact model (instead of rigid titles)

**Community contacts** are trusted connectors—institutional or cultural—who may not map to “volunteer” in the CRM sense but are **essential to local legitimacy**.

**Uses**

- Link **organic groups** to accountable human relationships (`group-architecture.md`).  
- Give captains **named partners** for faith, labor, campus, or neighborhood entry—without forcing everyone into the same title system.  
- Support **handoffs**: staff/captain ↔ community contact with clear expectations.

**Product behavior**

- **Flexible labels** per campaign: “partner,” “host,” “liaison”—not one global job taxonomy.  
- **Permissions** minimal by default; expansion only with **training** and **staff alignment**.

---

## Geographic coverage logic (conceptual)

**Goal:** Answer **where** leadership is thin or strong—precinct, city, county—without turning people into dots on a surveillance map for volunteers.

**Conceptual elements**

- **Coverage unit** — precinct, turf, or campaign-defined slice.  
- **Anchor** — captain or lead responsible for a unit (may be co-anchored).  
- **Gap** — unit without anchor or below threshold volunteer count / activity (definitions in pacing + analytics).  
- **Command view** — staff sees heatmaps and lists; **volunteer-facing** views show **opportunity to help**, not “worst neighborhoods.”

**Steve / Hub**

- Surfaces **nearby** ways to help; does not **shame** uncovered areas in public feeds.

---

## Leadership progression

**Progressive escalation** (aligned with `behavior-model.md`):

1. **Contributor** — reliable in lane.  
2. **Point person** — owns recurring slice (e.g., one event series).  
3. **Captain / lead** — coordinates others; moderation + permissions widen.  
4. **Regional / program lead** (if used) — pairs with staff; succession planning.

**Checkpoints:** training completion, observed reliability, **human promotion** for sensitive scope, **audit** on permission changes.

---

## Visibility preferences

**Why:** Safety (domestic, employment, minor volunteers), dignity, and **strategic** discretion.

**Knobs (conceptual)**

- **Public profile** — name, photo, teams visible to whom.  
- **Geographic precision** — show city vs neighborhood vs hidden.  
- **Leadership visibility** — some leads appear in directories; others operate **quietly** with staff-only visibility.  
- **Recognition opt-in** — public shout-out vs private thanks.

**Defaults:** Conservative for **precise location** and **minors**; campaign policy may tighten further.

---

## Identifying emerging leaders

**Signals (non-exclusive)**

- Consistency of task completion and **on-time** communication.  
- **Peer behavior**: others ask them for help; positive team health in groups they touch.  
- **Training** uptake and **coachability**.  
- **Relational quality**: follow-through with invitees, welcome quality—not raw headcount.

**Process**

- **Suggestions** to captains/staff (“consider a conversation with Alex”)—not auto-promotion.  
- **Human interview / confirmation** before elevated permissions.  
- **Bias check:** signals must not equate loudness or volume with leadership fitness.

**Dashboard**

- **Bench pipeline**: emerging → in conversation → in training → active leader—with **privacy** for “in conversation.”

---

## Cross-references

- `growth-engine.md` — growth without coercion  
- `control-layer.md` — leadership permissions and approvals  
- `state-machine.md` — `active leader` state alignment  
- `group-architecture.md` — where leadership lives in groups  
