# Replacement map: external capability categories → CAMPOS

This document maps **categories of tools** campaigns commonly assemble today to the **capabilities CAMPOS must eventually provide or credibly subsume**. It is a structured capability map for build planning—not a competitive marketing matrix.

**Scope note:** Incumbent products are **reference patterns** for required behaviors. CAMPOS does not assume copying any vendor’s feature set; it assumes **functional coverage** across CRM, web, mobilization, field, relational work, and compliance so campaigns are not forced back to fragmented stacks.

**Build stages used here**

| Stage | Meaning |
|-------|---------|
| **Foundation** | Identity, tenant model, core CRM primitives, permissions, audit hooks, migration-first data layer—required before domain depth. |
| **Volunteer Command wave** | First major vertical: Movement Hub + leadership alignment around volunteers, teams, feeds, tasks, onboarding outcomes in doctrine. |
| **Expansion** | Adjacent domains (events, comms, field, fundraising) with explicit module boundaries. |
| **Maturity** | Deep parity in specialized areas (advanced modeling, complex compliance packs, press workflows). |

Dependencies are **technical and sequencing constraints**, not organizational promises.

---

## Category: integrated CRM + web + fundraising + comms (NationBuilder-like pattern)

**What campaigns use this pattern for:** Single vendor for people record, website/actions, donations, and email—minimizing integration tax.

| Required CAMPOS capabilities | Dependencies | Likely build stage |
|----------------------------|--------------|-------------------|
| Unified `person` with consent, tags, and history; dedupe/merge with audit | Foundation CRM; import pipelines | Foundation → Expansion |
| Hosted or integrated **website and forms** with attribution into CRM | CRM; consent model; page/form objects | Expansion |
| **Fundraising** pages, processing hooks, refunds path, finance exports | CRM; compliance rule hooks; payment provider abstraction | Expansion |
| **Email** broadcasts and templates with suppression enforcement | CRM consent; messaging job model; provider adapter | Expansion |
| **Role-based access** for staff vs volunteers; approval paths for sensitive sends | Permissions; audit; doctrine (human approval) | Foundation → Expansion |

**Primary sequencing risk:** fundraising and bulk email touch compliance and provider integrations—they should not land before consent, suppression, and approval models exist.

---

## Category: events + volunteer activation (Mobilize-like pattern)

**What campaigns use this pattern for:** Event discovery, registration, shifts, reminders, and converting attendees into volunteers.

| Required CAMPOS capabilities | Dependencies | Likely build stage |
|----------------------------|--------------|-------------------|
| Events, shifts, roles, registration, attendance | CRM; tasks; notifications | Volunteer Command wave → Expansion |
| Mobilization campaigns tied to volunteer goals | Teams; feeds; tasks | Volunteer Command wave |
| Reminder and follow-up workflows with consent-scoped channels | Comms primitives or integration; suppression | Expansion |
| Leadership views: fill rates, staffing gaps, geographic coverage | Analytics definitions; Command Center | Expansion |

**Primary sequencing risk:** notification and messaging behavior must respect the same consent records as CRM—no parallel “event-only” contact lists.

---

## Category: relational organizing + team communication (Reach-like pattern)

**What campaigns use this pattern for:** Relational asks, team accountability, captain workflows, and distributed messaging that is not generic bulk email.

| Required CAMPOS capabilities | Dependencies | Likely build stage |
|----------------------------|--------------|-------------------|
| Relationship graph or tie model; relational ask tracking | CRM person identity; permissions for sensitive views | Expansion |
| Team hierarchy, captain scopes, private vs group channels per doctrine | Movement Hub feeds; roles | Volunteer Command wave → Expansion |
| Approved scripts and policy-bound prompts for volunteers (Steve) | Policy packs; audit; rate limits | Volunteer Command wave |
| Accountability without public shaming (private coaching surfaces) | Feed design; permissions | Volunteer Command wave |

**Primary sequencing risk:** relational data amplifies privacy concerns—access control and audit must be solid before scaling graph features.

---

## Category: voter file + canvassing + field operations (VAN / MiniVAN-like pattern)

**What campaigns use this pattern for:** Official voter/universe management, list cutting, turf, mobile canvassing, and result sync—often with external file vendors.

| Required CAMPOS capabilities | Dependencies | Likely build stage |
|----------------------------|--------------|-------------------|
| Universe/list model; geography/turf; assignment to volunteers | Identity; permissions; CRM linkage | Expansion |
| Canvass sessions, outcomes, QC workflows | Field data model; optional offline sync strategy | Expansion |
| **Integration layer** for file vendor APIs and import/export (not necessarily embedded vendor UI) | Secrets outside repo; job queues; audit | Expansion |
| Supervisor dashboards: coverage, quality, invalid rate | Analytics; Command Center | Expansion → Maturity |

**Primary sequencing risk:** voter data is high-sensitivity; tenant isolation, role scoping, and audit requirements from Foundation apply with extra rigor. Many campaigns will keep a vendor-of-record for the file—CAMPOS must **integrate cleanly**, not pretend the file appears from nowhere.

---

## Cross-category dependencies (always on)

These cut across every row above and constrain early build order:

| Dependency | Why it gates other work |
|------------|-------------------------|
| **Tenant / campaign isolation** | Multi-tenant architecture per doctrine; prevents cross-campaign leakage as modules multiply. |
| **Identity + roles** | Every domain needs the same answer to “who can see and do what.” |
| **Consent + suppression** | Comms, fundraising, and mobilization are unsafe without a single enforcement layer. |
| **Audit trail for sensitive actions** | Compliance and trust; required before scaling automation or AI agents. |
| **Migration-first schema** | Per `AGENTS.md` / core principles—avoids dashboard drift as domains land. |
| **Supabase (or successor) as system of record** | Known stack assumption: one authoritative store for cross-domain objects. |

---

## Explicit non-replacement stance

CAMPOS does **not** need to obsolete every specialized tool on day one. It must:

- Own the **campaign’s model of people, permissions, and work** so departments are not split across incompatible truths.
- Provide **integration points** (especially field file and payments) where external systems remain source-of-truth for a subset.
- Avoid a permanent architecture where “real work” happens only in spreadsheets outside the OS.

See `campaign-function-master-map.md` for full domain breakdown and `module-catalog.md` for packaged modules and agents.
