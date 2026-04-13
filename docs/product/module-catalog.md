# Module and agent catalog (internal)

This catalog lists **product modules** and **AI agents** as CAMPOS intends to package them: composable, sellable over time, and bounded by shared platform contracts (identity, permissions, consent, audit, migrations). It is not a release roadmap; sequencing follows dependency reality and ADRs.

**First major operating module:** **Volunteer Command** proves the volunteer-centered OS in production—Movement Hub experiences, teams, onboarding path, feeds, and leadership alignment—before the platform claims full parity across every domain in `campaign-function-master-map.md`.

**Commercial shape:** Modules should be **sellable** (entitlements, clear boundaries) and **composable** (shared CRM and tenant layer; no duplicate person stores per module). Agents are add-on surfaces with scoped permissions, not back doors around policy.

---

## 1. Platform backbone modules

These are not optional long-term; several must exist before domain modules look honest.

| Module | What it owns | Notes |
|--------|----------------|-------|
| **Tenant & campaign core** | Organizations, campaigns, environments; isolation boundaries | Preconditions multi-tenant doctrine. |
| **Identity & access** | Auth integration, sessions, role/permission model, API scopes | Gates every other module. |
| **Core CRM** | Person, interaction, merge/dedupe, tags/attributes, household optional | System of record for “who.” |
| **Consent & suppression** | Consent records, channel preferences, global suppression | Single enforcement layer for comms + fundraising + mobilization. |
| **Tasks & handoffs** | Assignable work, SLAs, ownership across teams | Connects Hub ↔ Command workflows. |
| **Audit & policy enforcement** | Immutable audit events, policy checks, approval queues | Required before production AI or bulk actions. |
| **Integration fabric** | Webhooks, job queues, import/export connectors | Provider and file-vendor adapters live here—not inside UI modules. |
| **Analytics core** | Metric definitions, saved reports, dashboard shell | Domain metrics plug in; avoids six conflicting definitions of “volunteer.” |

---

## 2. Volunteer-facing modules

Primary surfaces: **Movement Hub**; voice: **Steve** within policy.

| Module | What it owns | Notes |
|--------|----------------|-------|
| **Volunteer Command** (flagship) | Onboarding flows, team membership, volunteer profile, movement-facing home, clarity/fit/ownership/path per doctrine | **First major operating module**; establishes Hub patterns. |
| **Feeds & groups** | Campaign feed, team/group feeds, moderation primitives | Supports decentralized leadership without generic social network scope creep. |
| **Volunteer tasks & shifts** | Personal and team task lists; shift signup where used | Tied to tasks core and events. |
| **Recognition & milestones** | Badges/progress **without** humiliation mechanics | Aligns to “positive public celebration, private correction.” |

---

## 3. Campaign operations modules

Primary surfaces: **Command Center**; shared CRM underneath.

| Module | What it owns | Notes |
|--------|----------------|-------|
| **Command dashboard** | Leadership overview, bottlenecks, cross-department views | Read-heavy; pulls from analytics + operational objects. |
| **Events & mobilization** | Events, shifts, registration, attendance, mobilization campaigns | Connects to CRM and comms. |
| **Field operations** | Turf, lists, canvass workflows, QC, sync | Often pairs with external file integration. |
| **Relational organizing** | Relationship ties, asks, captain tooling | Privacy-sensitive; builds on CRM + Hub. |
| **Comms** | Email/SMS jobs, templates, peer-to-peer flows where supported | Requires consent + approvals for bulk. |
| **Fundraising** | Appeals, donations, recurring, exports | Tight coupling to compliance hooks. |
| **Compliance** | Rule packs, training gates, restricted actions | Evaluative, not “legal advice” automation. |
| **Research library** | Sourced briefs, classifications, distribution | Agents assist summarization under access control. |
| **Press & rapid response** | Inquiries, statements, approvals | Workflow-heavy; integrates comms objects. |
| **Website & actions** | Pages, forms, public content revisions | May integrate static hosting (e.g., Netlify) while CRM remains authoritative. |
| **Strategy & planning** | Plan versions, milestones, targets | Feeds analytics and Command views. |
| **Operations** | Staff scheduling, vendors, internal runbooks | Often later; identity integration critical. |

---

## 4. AI agents

Agents are **products** with **scoped tools**, rate limits, and audit—not general-purpose chat with database roots.

| Agent / pack | Primary users | Allowed behaviors (indicative) | Guardrails |
|--------------|----------------|----------------------------------|------------|
| **Steve (volunteer guide)** | Volunteers | Next-step suggestions, script prompts from approved libraries, FAQs grounded in campaign content | Policy + consent; no unsupervised bulk outbound; escalate legal/compliance |
| **Staff briefing / digest** | Leadership, staff | Summarize operational state from **already-authorized** data; draft digests for human edit | Read-only to sensitive objects unless role allows |
| **Drafting assistant (comms)** | Comms staff | Draft emails/texts from templates and facts | Human approval before send jobs |
| **Data hygiene assistant** | Data team | Duplicate candidates, merge suggestions, anomaly flags | Human merge; no silent destructive merges |
| **Field QC assistant** | Field directors | Flag outliers, missing turf, sync issues | No altering voter records without human action |
| **Research summarizer** | Research, comms | Summarize **ingested** documents with citations | Access-controlled sources; human release for external use |
| **Onboarding coach (Volunteer Command)** | Volunteers | Structured onboarding conversation, role fit prompts | Bounded flows; routes to human organizers when needed |

New agents require: tool manifest, permission scope, audit event types, and explicit “no production destruction” alignment with `docs/architecture/core-principles.md`.

---

## 5. Commercial and admin modules

**Purpose:** Run CAMPOS as a business and support customers without conflating billing logic with voter compliance logic.

| Module | What it owns | Notes |
|--------|----------------|-------|
| **Subscriptions & entitlements** | Plans, module toggles, feature flags | Maps to tenant records; audit changes. |
| **Billing connector** | Invoicing/payment customer records via provider | PCI scope minimized; secrets outside repo. |
| **Admin console** | Support-facing tools, impersonation **policy** (if ever), tenant diagnostics | Heavily audited; not available to campaign volunteers. |
| **Usage metering** (optional) | Agent or API usage if sold metered | Transparent caps; no surprise overages without visibility. |

---

## Composition rules

1. **One person store:** Domain modules reference **Core CRM** objects; they do not fork “volunteer CRM” vs “donor CRM” as separate truths.
2. **Sellable boundaries:** Each module exposes clear entitlements (API + UI + data scope) so packaging does not require code forks.
3. **Agents are add-ons:** Sold and permissioned separately; cannot override consent or financial actions without human approval paths.
4. **Volunteer Command first:** Establishes Hub UX, team model, feeds, and Steve guardrails that later modules plug into.

---

## Related documents

- `docs/architecture/product-vision.md` — integrated domains and commercial vision  
- `docs/architecture/system-identity.md` — Command Center vs Movement Hub  
- `docs/product/campaign-function-master-map.md` — department-level functions  
- `docs/product/replacement-map.md` — capability replacement map and build stages  
