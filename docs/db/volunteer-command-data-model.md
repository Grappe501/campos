# Volunteer Command — data model (planning)

This document describes **planning-level entities and relationships** for Volunteer Command on top of the **existing** Supabase schema (`volunteer_*`, `workflow_*`, `people`, `person_*`, geography, events—see `schema_inventory.md`). It does **not** prescribe SQL or migrations; it informs **what** must eventually be represented **consistently** with the canonical person graph.

**Assumptions**

- **`people`** is the canonical CRM node; volunteer records **reference** people, not duplicate long-term identity.  
- **`person_identifiers`** and **`person_contact_methods`** remain the right homes for **external keys** and **reachable channels**—Volunteer Command **consumes** effective compliance state, not a parallel consent store.  
- **Geography** (`geo_*`, turfs, precinct concepts) ties **local** volunteer structure to field and analytics—see `domain_map.md`.  
- **Campaign activities** (field sessions, events, comms jobs) should **link** to `people` and/or operational IDs already present in the schema family.

**Multi-tenancy**  
The baseline inventory notes **no broad `tenant_id` / `campaign_id` pattern** yet—Volunteer Command planning assumes **campaign-scoped** rows will be required; exact column strategy is an **open decision** (see end of this doc).

---

## Anchor concepts

| Concept | Role |
|--------|------|
| **`people`** | Canonical person; every volunteer journey should resolve here when identity is known. |
| **`person_identifiers`** | Links voters, signups, and external IDs to `people` with confidence and provenance. |
| **`person_contact_methods`** | Channel reachability; comms and nudges respect compliance projections. |
| **Geography** | County/city/precinct/turf alignment for local teams and coverage. |
| **Campaign activities** | Field (`canvass_*`), events (`events`, `campaign_events`), outreach lists—attach work to people and places. |

---

## Volunteer-related entity groups (planning)

### 1. Volunteer profile

**Meaning:** The **movement-facing** and **operational** view of a person in volunteer context—lane, visibility prefs, capacity, lifecycle state.

**Relationship to existing schema**  
Baseline includes `volunteers` and related role tables. Planning expectation:

- **One primary volunteer row per person per campaign** (or per org—tenancy TBD), not multiple competing rosters.  
- Profile fields: **lifecycle state** (`state-machine.md` concepts), **pace preference**, **digital vs in-person**, **visibility** preferences, **pause** flags—some may extend existing columns or require **additive** migration later.

**Links to**  
`people` (required when identity resolved), `geo_*` / turf / team entities as scoped.

---

### 2. Volunteer onboarding events

**Meaning:** **Append-only** or **event-sourced** history of steps: welcome completed, module started, lane selected, first task done.

**Relationship to existing schema**  
May extend `volunteer_signups` semantics or add a dedicated **event** table in a future migration—planning requires **immutable progression** for analytics and Steve context, not only a single “status” column.

**Links to**  
`people`, optional `workflow_tasks` (when onboarding is task-driven).

---

### 3. Volunteer assignments

**Meaning:** **Lane**, **team/group**, **turf**, **shift**, or **role** placement—**guided** and **dual-track** models (`behavior-model.md`).

**Relationship to existing schema**  
`volunteer_role_assignments`, `volunteer_tasks`, `turf_assignments`, `events`, `turfs`—Volunteer Command should **compose** these rather than inventing a shadow assignment store.

**Links to**  
`people`, geography, `events`, `turfs`, group/team constructs (future or adjunct tables).

---

### 4. Volunteer trainings

**Meaning:** **JIT** and **pathway** modules, **completion**, **unlock** gates (`adaptive-training-engine.md`).

**Relationship to existing schema**  
`volunteer_tasks` may represent training tasks; long-term, **training completions** may need **explicit** records (module id, version, completed_at) with **audit** for waivers.

**Links to**  
`people`, optional `workflow_tasks`, **risk class** metadata for unlocks.

---

### 5. Volunteer check-ins

**Meaning:** **Private** coaching touches, **accountability** nudges, **captain** notes—**not** public feed content by default.

**Relationship to existing schema**  
Could be modeled as **tasks**, **notes**, or **private activity** rows—planning insists on **access control** and **minimal retention** for sensitive coaching.

**Links to**  
`people`, captain `people` identity, optional `workflow_tasks`.

---

### 6. Volunteer referrals / Power of 5 relationships

**Meaning:** **Inviter → invitee** edges, **support** relationships, **handoff** quality—not a multi-level marketing graph.

**Relationship to existing schema**  
`person_relationships` is a natural **canonical** home for relational edges **once** both parties resolve to `people`. **Pre-resolution** signups may land in `volunteer_signups` with **referrer** metadata pending linkage.

**Links to**  
`people` (both ends), `person_identifiers` for pre-match prospects, **campaign** scope.

---

### 7. Volunteer recognition

**Meaning:** **Milestones**, **team shout-outs**, **positive-only** surfaces (`growth-engine.md`).

**Relationship to existing schema**  
May be **activity** or **feed** artifacts tied to `people` and group IDs; **consent** for public recognition.

**Links to**  
`people`, group/event context, **feed** layer (conceptual).

---

### 8. Volunteer leadership progression

**Meaning:** **Stages**, **training checkpoints**, **permission elevation** (`leadership-system.md`).

**Relationship to existing schema**  
`volunteer_roles`, `volunteer_role_assignments`—planning adds **progression history** (who promoted whom, when, with which training) for **audit**.

**Links to**  
`people`, **role** definitions, **training** completions.

---

### 9. Volunteer capacity snapshots

**Meaning:** **Time-boxed** view of availability, load, or **risk**—for pacing and staffing—not permanent surveillance.

**Relationship to existing schema**  
Could be **derived** or **stored** short-lived rows; must align with **privacy** and **data minimization** doctrine.

**Links to**  
`people`, **pacing profile** (phase), optional **lane**.

---

## Conceptual wiring to campaign activities

| Activity domain | Volunteer Command uses |
|-----------------|-------------------------|
| **Field** | `canvass_*`, `field_*`, turfs → assignments, completions, QC feedback into coaching. |
| **Events** | `events` / `campaign_events` → shifts, attendance, mobilization tasks. |
| **Messaging** | `comms_*` + compliance → **effective** channel for nudges; **no** duplicate suppression. |
| **Fundraising** | Donor identity may share `people`; volunteer **lane** separate from donor role—**single person**, multiple hats. |

---

## What this doc does not decide

- Exact **table splits** vs extending `volunteer_*`—to be resolved when multi-tenancy and migration baselines are fixed.  
- Whether **onboarding events** are a new table vs generalized `person_activity`—**event taxonomy** must be chosen before implementation.

---

## Related documents

- `campos-data-architecture.md` — layer stack  
- `voter-linkage-engine.md` — resolving file identities to `people`  
- `integration-wiring-plan.md` — cross-module wiring  
- `docs/product/volunteer-command/state-machine.md` — lifecycle states  
