# Integration wiring plan (planning)

This document describes **how Volunteer Command must connect** to other CAMPOS domains on Supabase **conceptually**—using existing tables where possible (`schema_inventory.md`, `domain_map.md`)—and the **engineering rules** that apply to **all** integrations (Edge Functions, service layers, audit, secrets).

**Primary project:** Supabase **`peoplebase`**. The project ref (e.g. `<SUPABASE_PROJECT_REF>`) and connection secrets stay in **environment config only**—**not** in the repo.

---

## 1. Field

**Intent:** Volunteer assignments and completions align with **turf**, **canvass sessions**, and **follow-ups** so coverage and coaching are one story.

**Data touchpoints (existing family)**  
`turfs`, `turf_assignments`, `canvass_sessions`, `canvass_contacts`, `canvass_responses`, `field_notes`, `field_followups`, `field_sync_events`, `field_data_quality_flags`.

**Volunteer Command responsibilities**

- **Volunteer** and **leader** identities resolve to **`people`**.  
- **Tasks** (`volunteer_tasks`, `workflow_tasks`) reference field work items with **shared** geography keys.  
- **QC / training** feedback loops update **training** and **check-in** records—not shadow spreadsheets.

**Wiring principle**

- **Single person** for both “volunteer” and “canvasser” when the same human—**no** duplicate roster per module.

---

## 2. Events

**Intent:** Mobilization, shifts, attendance, and post-event follow-up **feed** Volunteer Command and **comms** consistently.

**Data touchpoints (existing family)**  
`events`, `campaign_events`, `event_approvals`, `events_rollup_v` (view).

**Volunteer Command responsibilities**

- **RSVP / shift** objects tie to **volunteer assignments** and **group** membership.  
- **Attendance** feeds recognition and **reliability** signals (`accountability-engine.md`) without public shaming.

---

## 3. Messaging

**Intent:** Nudges, broadcasts, and peer threads **respect** the same **consent** and **suppression** as bulk comms.

**Data touchpoints (existing family)**  
`comms_queue`, `comms_templates`, `comms_webhook_events`, `compliance_*`, `compliance_person_channel_status_v`.

**Volunteer Command responsibilities**

- **Steve** and automated nudges **do not** bypass **effective channel status**—**gate** before enqueue.  
- **Peer** or **group** messaging features **use** `people` + compliance projections; **no** parallel opt-out list.

**Wiring principle**

- **Enqueue** only through **controlled** paths that attach **audit** metadata (campaign, template class, idempotency).

---

## 4. Fundraising

**Intent:** Donor and volunteer **hats** on the **same person** when applicable—without mixing **FEC/compliance** rules with volunteer UX.

**Data touchpoints**  
Fundraising tables may exist or arrive in future migrations—**not** heavily represented in baseline inventory; plan for **attachment to `people`**.

**Volunteer Command responsibilities**

- **Volunteer profile** does not replace **donor compliance** records; **link** via `people`.  
- **Fundraising asks** from volunteer flows **go through** approval and compliance rules per `control-layer.md`.

---

## 5. Campaign feed / network layer

**Intent:** Feeds, groups, posts, and DMs **reference** the same **teams, events, and recognition** objects Volunteer Command owns.

**Data touchpoints**  
Feed/group tables may be **additive** in future migrations; **conceptual** wiring to `people`, group IDs, and **moderation** actions.

**Volunteer Command responsibilities**

- **Recognition** and **public** events feed **consent** and **visibility** prefs.  
- **Moderation** actions **audited** (actor, scope, reason category)—see `culture-and-moderation.md`.

---

## 6. Command dashboard

**Intent:** Leadership views **read** from **canonical** aggregates—**volunteer funnel**, **coverage**, **at-risk queues**, **bench pipeline**—not ad-hoc SQL in dashboards.

**Data touchpoints**

- **Analytics** views and **operational** tables (read-only from dashboard perspective).  
- **Volunteer lifecycle** and **assignment** tables as **source** for metrics.

**Volunteer Command responsibilities**

- **Metric definitions** aligned with `people` and **campaign** scope—avoid six conflicting definitions of “active.”

---

## 7. Supreme Agent / Steve governance layer

**Intent:** **Steve** (and future agents) operate through **explicit** capabilities—**no** raw database credentials in client or repo.

**Planning hooks**

- **Agent** records (baseline includes `cm_agent_onboarding`)—extend with **tool manifests**, **approval** queues, **run logs** in future migrations.  
- **Steve** reads **policy** and **tenant** settings; **writes** only through **allowed** RPCs/Edge Functions.

**Governance**

- **Human approval** for bulk sends, permission elevation, **sensitive** training waivers.  
- **Immutable** logs for **what executed** (not full private chat by default).

---

## Engineering rules (non-negotiable)

| Rule | Rationale |
|------|-----------|
| **No direct destructive production SQL by agents or clients** | Data integrity and compliance (`AGENTS.md`). |
| **Controlled service layers / Edge Functions** | Allowlisted operations, rate limits, **audit** attachment. |
| **Preserve auditability** | Especially for consent, sends, linkage, moderation, leadership. |
| **Secrets out of repo and client-side code** | Keys in env / secure vaults only. |
| **Migration-first schema changes** | After baseline migration captured; **no** dashboard drift. |

---

## Integration contract direction (from `refactor_backlog.md`)

**Unified integration envelope**

- **Idempotency keys** for provider webhooks.  
- **Immutable** logs (`comms_webhook_events`, `field_sync_events` pattern) with **derived** projections.  
- **Catalog** of providers and sync state (without storing secrets in git).

---

## Related documents

- `campos-data-architecture.md` — layer stack  
- `volunteer-command-data-model.md` — Volunteer Command entities  
- `voter-linkage-engine.md` — file-to-person resolution  
- `refactor_backlog.md` — unblockers  
- `docs/architecture/core-principles.md` — AI and approval doctrine  
