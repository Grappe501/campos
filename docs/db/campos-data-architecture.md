# CAMPOS data architecture (planning)

This document describes **how data layers fit together** in CAMPOS on **Supabase/Postgres**, assuming the **primary project is `peoplebase`** and the **project ref** is supplied through **environment/configuration** (never as a hardcoded literal in tracked files). It assumes the existing schema foundation documented in `schema_inventory.md` and `domain_map.md`. It is **planning-level**: no SQL or migrations here—those follow **migration-first** discipline once a baseline migration is captured (`refactor_backlog.md`).

**Ground truth from existing docs**

- **Raw voter intelligence** (VR, VH, derived signals) already has landing and analytics-shaped tables.  
- The **canonical people graph** (`people`, `person_*`) is the **intended** join surface but is **not yet proven populated**—graph population remains a primary unblocker.  
- **Volunteer** and **workflow** primitives exist (`volunteer_*`, `workflow_tasks`) and should extend—not fork—CRM identity.

---

## Layer 1 — Raw voter intelligence

**Purpose:** Durable landing and staging for **state-file and election-behavior** inputs—authoritative for **what the file says**, not necessarily for **who this human is in our CRM** until linkage runs.

**Representative structures (existing)**  
`raw_vr`, `raw_vh`, voter directory concepts, behavior aggregates (`voter_behavior_signals`, `vh_*` surfaces)—per `schema_inventory.md`.

**Principles**

- **Append-friendly** ingestion; avoid destructive edits in production outside governed migrations.  
- **Provenance** per batch (source, file date, jurisdiction) should eventually be explicit for audit.  
- Raw layers **do not replace** `people`; they **feed** linkage and scoring (`voter-linkage-engine.md`).

---

## Layer 2 — Canonical people graph

**Purpose:** One **canonical person node** and **typed satellites** so field, comms, volunteers, and compliance share one notion of “who.”

**Representative structures (existing)**  
`people`, `person_identifiers`, `person_addresses`, `person_contact_methods`, `person_activity`, `person_relationships`, `person_source_links`, `person_merge_log`, `person_match_candidates`, review views such as `people_match_review_v`.

**Principles**

- All operational modules **attach** to `people` (directly or via stable foreign keys).  
- **Identifiers** (state voter IDs, external IDs) live in `person_identifiers` with **source and confidence** semantics—see voter linkage doc.  
- **Merges** are logged; analytics should not silently rewrite history without lineage.

**Current risk (from `refactor_backlog.md`)**  
Multi-tenancy is **not yet broadly encoded**—future work must choose **org/campaign** boundaries and apply them consistently alongside the person graph.

---

## Layer 3 — Campaign operations

**Purpose:** Day-to-day **work**—events, turf, field sessions, volunteer assignments, tasks—grounded in people and geography.

**Representative structures (existing)**  
`events`, `campaign_events`, `event_approvals`, `turfs`, `turf_assignments`, `canvass_*`, `field_*`, `volunteer_*`, `workflow_tasks`, `ward_organizers`.

**Principles**

- **Volunteer Command** extends volunteer and workflow concepts; it does **not** create a parallel “volunteer-only person table” for CRM truth.  
- **Activities** (canvass contacts, shifts, completions) should resolve to `people` where a person is known, or flow through linkage when introducing file-based contacts.

---

## Layer 4 — Communications

**Purpose:** **Consent-aware** outbound and inbound message operations with **deliverability** and **immutable provider logs**.

**Representative structures (existing)**  
`comms_queue`, `comms_templates`, `comms_webhook_events`, `voice_transcripts`, `deliverability_threshold_configs`.

**Principles**

- Every send decision is **explainable** against `people` + compliance state—not a shadow list.  
- Webhook logs remain **append-oriented**; projections update read models separately (`refactor_backlog.md`).

---

## Layer 5 — Compliance

**Purpose:** **Suppression, consent provenance, message logging, access logging**—the enforcement layer between intent and outbound action.

**Representative structures (existing)**  
`compliance_consent_events`, `compliance_suppressions`, `compliance_message_log`, `compliance_access_log`, views such as `compliance_person_channel_status_v`.

**Principles**

- Compliance is a **gate**, not an afterthought—Volunteer Command **consumes** effective channel status before nudges or peer outreach tooling fires.  
- **Append-only** preference for consent and high-stakes message records where feasible.

---

## Layer 6 — Analytics

**Purpose:** **Derived** reporting—election, geography, economic stress, turnout, operational rollups—**not** the system of record for writes.

**Representative structures (existing)**  
Numerous `analytics_*` views and geography intel views; see `schema_inventory.md`.

**Principles**

- Analytics **reads** canonical and raw layers; Volunteer Command **does not** write “truth” only into analytics views.  
- Shared **metric definitions** (e.g., “active volunteer”) should eventually live in a **governance** layer (docs + named queries or metric tables)—not six conflicting dashboard queries.

---

## Layer 7 — Billing / commercial

**Purpose:** **Entitlements, subscriptions, module activation** for CAMPOS as a product—**separate** from voter compliance logic.

**Current state**  
Not prominent in baseline inventory—treat as **future** tables with strict **non-mixing** of campaign financial compliance (FEC) with SaaS billing unless explicitly designed.

**Principles**

- **No secrets** in repo; billing provider references live in secure configuration.  
- Tenant/module flags **authorize** product behavior; they **do not** override consent law.

---

## Layer 8 — AI / agent interaction layer

**Purpose:** **Governed** suggestions, gated actions, and **audit trails** for Steve and other agents—without granting models **raw SQL** or destructive production access.

**Representative hooks (existing + planned)**  
`cm_agent_onboarding` (ops metadata) suggests agent-related bookkeeping exists; **formal** agent interaction tables (prompt runs, tool calls, approvals) may be added via migrations later.

**Principles**

- Agents **call controlled service layers** (e.g., Edge Functions, RPCs with explicit allowlists)—see `integration-wiring-plan.md`.  
- **Human approval** for bulk, high-risk, or sensitive actions per `docs/architecture/core-principles.md`.  
- **Auditability**: what was suggested, what was approved, what was executed—**without** storing unnecessary private message content.

---

## Vertical flow (conceptual)

```
Raw voter intelligence
        ↓ (linkage + merge)
Canonical people graph ←── campaign signups, volunteers, comms identities
        ↓
Campaign operations (field, events, volunteers, tasks)
        ↓ (gated)
Communications
        ↑
Compliance (consent / suppression / logs)
        ↓
Analytics (read-only projections)
```

**Billing/commercial** and **AI/agent** wrap the tenant boundary and human-gated automation—**orthogonal** to the voter file’s legal semantics.

---

## Related documents

- `domain_map.md` — domain wiring (authoritative baseline)  
- `schema_inventory.md` — table-level inventory  
- `refactor_backlog.md` — unblockers and migration discipline  
- `volunteer-command-data-model.md` — Volunteer Command entities  
- `voter-linkage-engine.md` — file-to-person linkage  
- `integration-wiring-plan.md` — cross-module wiring and engineering rules  
