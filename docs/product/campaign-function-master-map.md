# Campaign function master map

This document enumerates **major campaign departments**, their **subfunctions**, and what the CAMPOS platform must eventually support. It is a planning and dependency map—not a commitment to build every subfunction at equal depth on the same timeline.

**Conventions**

- **Purpose:** why this domain exists in a serious campaign.
- **Major workflows:** recurring operational sequences the product must model or integrate.
- **Key data objects:** stable nouns that should live in the system of record (names are indicative, not a schema).
- **Likely downstream modules/agents:** where packaged product or governed automation will probably attach; subject to ADRs and sequencing.

Cross-cutting dependencies appear in multiple domains: **tenant/campaign**, **identity**, **roles and permissions**, **audit trail**, **consent and suppression**, **tasks and handoffs**, **integrations**. See `replacement-map.md` and `module-catalog.md` for build order context.

---

## Candidate command

**Purpose:** Align the principal’s time, voice, approvals, and visibility with the rest of the operation so leadership decisions propagate without parallel shadow systems.

**Major workflows**

- Daily/weekly priorities and narrative themes; exception handling when plans change.
- Approval queues for sensitive outbound content, fundraising asks, and high-visibility commitments.
- Visibility into movement health (volunteers, field coverage, events pipeline) without duplicating every operational detail.

**Key data objects**

- `campaign` / `organization` context; `approval_request`; `priority_window`; `leader_dashboard_view` (saved filters, not a second CRM).

**Likely downstream modules/agents**

- Command Center shell; executive briefing / digest agents (read-only synthesis, human-reviewed publishing).
- Policy-bound routing for approvals (not autonomous sending).

---

## Strategy and planning

**Purpose:** Translate electoral goals into plans, targets, resourcing assumptions, and measurable milestones shared across departments.

**Major workflows**

- Goal-setting (vote goals, turnout assumptions, persuasion vs mobilization mix—where applicable).
- Scenario and timeline planning; plan revisions after polling or field intelligence.
- Cross-department alignment: how field, comms, and fundraising interpret the same plan.

**Key data objects**

- `plan_version`; `target_geography`; `metric_definition`; `assumption_set`; `milestone`.

**Likely downstream modules/agents**

- Planning workspace in Command Center; optional simulation packages (see Analytics) for what-if analysis.
- Assistants that summarize plan deltas for staff (never replacing strategist judgment).

---

## CRM / people database

**Purpose:** One authoritative record of people, relationships, consent, volunteer status, and interaction history—shared across field, comms, fundraising, and events.

**Major workflows**

- Profile lifecycle: create, merge, dedupe, archive with rules.
- Segmentation for comms and assignments; suppression and consent enforcement.
- Handoffs between teams (e.g., event attendee → volunteer prospect → assigned role).

**Key data objects**

- `person`; `household` (optional); `interaction`; `tag` / `attribute`; `consent_record`; `suppression`; `role_assignment`; `merge_log`.

**Likely downstream modules/agents**

- Core CRM module; import/export pipelines; data hygiene agents (suggestions, duplicate review queues—human merge).

---

## Website and action pages

**Purpose:** Public-facing surfaces for narrative, signup, donations, and structured actions—connected to the same identity and CRM as the rest of the campaign.

**Major workflows**

- Publish and update pages; A/B or iterative messaging changes within compliance rules.
- Capture signups and actions into CRM with attribution and consent.
- Coordinate with comms and fundraising so calls-to-action stay consistent.

**Key data objects**

- `site` / `page`; `form`; `action` (petition, RSVP, etc.); `attribution`; `content_revision`.

**Likely downstream modules/agents**

- Web module or headless integration layer; content assist agents (draft within policy); publishing approvals.

---

## Events and volunteer mobilization

**Purpose:** Schedule, staff, promote, and follow up on events in ways that convert interest into recurring volunteer capacity.

**Major workflows**

- Event lifecycle: create, roles/shifts, promotion, registration, check-in, post-event tasks.
- Mobilization: recruitment targets, team assignments, reminders, no-show follow-up.
- Integration with comms (invites, SMS/email) and CRM (attendance → pipeline).

**Key data objects**

- `event`; `shift`; `role_slot`; `registration`; `attendance`; `mobilization_campaign`; `task_followup`.

**Likely downstream modules/agents**

- Events module; Volunteer Command (mobilization, feeds); reminder/digest agents with strict consent scope.

---

## Field organizing

**Purpose:** Turf, lists, canvassing workflows, outcomes, and follow-up—grounded in geography and volunteer operations.

**Major workflows**

- Cut turf; assign volunteers; distribute lists; capture outcomes (including offline-first where required).
- Quality control: invalid entries, re-canvass, supervisor review.
- Reporting to strategy and comms (coverage gaps, narrative feedback from doors).

**Key data objects**

- `geography` / `turf`; `walk_list`; `canvass_session`; `contact_attempt`; `survey_response`; `sync_batch` (for device reconciliation).

**Likely downstream modules/agents**

- Field operations module; VAN/file adapters where applicable; QC agents flagging anomalies for human review.

---

## Relational organizing

**Purpose:** Scale outreach through trusted relationships—who knows whom, what was asked, and accountability—without reducing people to transactions.

**Major workflows**

- Relationship mapping: import or build graphs; assign relational asks.
- Team-based accountability: captain oversight, progress check-ins, private coaching.
- Integration with CRM (person merge, consent) and comms (targeted, non-bulk relational scripts where allowed).

**Key data objects**

- `relationship_edge` / `tie`; `relational_ask`; `accountability_checkin`; `team` / `captain_scope`.

**Likely downstream modules/agents**

- Relational organizing module; Movement Hub group feeds; Steve-assisted prompts that stay within policy.

---

## Email and text communications

**Purpose:** Consent-aware, auditable messaging across channels—aligned with CRM state and campaign narrative.

**Major workflows**

- Broadcast and targeted sends; templates and versioning; unsubscribe/suppression enforcement.
- Peer-to-peer or relational messaging flows where volunteers send approved scripts.
- Reporting: delivery, engagement, and operational follow-up tasks.

**Key data objects**

- `message_template`; `send_job`; `channel_identity`; `delivery_event`; `short_link` (if used); `peer_thread` (where applicable).

**Likely downstream modules/agents**

- Comms module; provider adapters; drafting agents with mandatory human approval for bulk and sensitive content.

---

## Fundraising

**Purpose:** Raise money with compliance-sensitive handling, clear attribution, and reporting tied to the same people record as organizing.

**Major workflows**

- Donation processing, recurring gifts, refunds/chargebacks handling (per processor rules).
- Compliance: limits, disclosure-related fields, restricted activity flags (jurisdiction-dependent).
- Finance reporting: reconciliation exports, campaign vs PAC vs conduit rules as applicable.

**Key data objects**

- `donation`; `recurring_plan`; `page` / `appeal`; `finance_export`; `compliance_flag`; `disclosure_record` (as required).

**Likely downstream modules/agents**

- Fundraising module; payment provider integration; finance/compliance review workflows—not autonomous disbursement or legal classification agents.

---

## Communications and press

**Purpose:** Owned and earned media coordination: rapid response, press lists, approvals, and message discipline across channels.

**Major workflows**

- Press tracking: inquiries, statements, spokespeople, approvals.
- Rapid response: holding statements, clearance, distribution to surrogates.
- Coordination with digital comms and field so messaging stays aligned.

**Key data objects**

- `press_contact`; `media_hit`; `statement`; `approval_chain`; `surrogate_brief`.

**Likely downstream modules/agents**

- Press desk workspace; briefing agents that aggregate context from approved sources only; no unreviewed external posting.

---

## Compliance

**Purpose:** Encode rules, training signals, and restricted actions so staff and volunteers operate inside legal and policy boundaries.

**Major workflows**

- Rule sets by jurisdiction or entity type; training completion gates for sensitive actions.
- Pre-send checks for comms and fundraising; audit exports.
- Incident logging and escalation paths.

**Key data objects**

- `rule_pack`; `training_record`; `restriction`; `audit_event`; `incident_report`.

**Likely downstream modules/agents**

- Compliance module; policy evaluation service; agents limited to **checklist, cite rule, route to human**—not legal advice.

---

## Research and intelligence

**Purpose:** Synthesize polling, opposition research, local context, and field intelligence into actionable briefs—without turning the OS into an ungoverned research dump.

**Major workflows**

- Research intake: tag, source, sensitivity level; distribution to authorized roles.
- Opposition and messaging testing handoffs to comms and strategy.
- Local intelligence from field (anecdotal, structured reports) feeding strategy.

**Key data objects**

- `research_item`; `source`; `classification`; `brief`; `distribution_list`.

**Likely downstream modules/agents**

- Research library; summarization agents with source citations and access control; human release for external use.

---

## Analytics and modeling

**Purpose:** Operational and electoral analytics with **defined metrics**, reproducible queries, and controlled modeling—fed from unified data.

**Major workflows**

- Dashboards for leadership: progress vs plan, volunteer funnel, field coverage.
- Cohort and retention analysis for volunteers and donors.
- Optional advanced modeling (turnout models, targeting)—often phased and permission-gated.

**Key data objects**

- `metric_definition`; `report`; `dashboard`; `model_run` (metadata, not necessarily the model binary); `data_snapshot`.

**Likely downstream modules/agents**

- Analytics module; Steve may surface **explainable** summaries for volunteers where appropriate; modeling stays staff-facing and governed.

---

## Operations and staffing

**Purpose:** Run the campaign’s internal machine: staffing, scheduling, vendors, and internal tasks that are not voter-facing CRM.

**Major workflows**

- Staff/volunteer leadership scheduling; vendor onboarding; internal ticketing or ops tasks.
- Access provisioning and offboarding tied to identity.
- Runbooks for election week operations.

**Key data objects**

- `staff_assignment`; `vendor`; `internal_task`; `onboarding_checklist`; `access_grant`.

**Likely downstream modules/agents**

- Ops module; HRIS integrations optional; provisioning workflows with audit.

---

## Billing and commercial product layer

**Purpose:** For CAMPOS as a product: subscription, entitlements, usage limits, invoicing, and module activation—without coupling campaign compliance logic to billing inappropriately.

**Major workflows**

- Tenant subscription lifecycle; module enablement; seat or usage metering where used.
- Internal admin: support tooling, impersonation policies (if any), audit.

**Key data objects**

- `subscription`; `entitlement`; `invoice` / `payment_customer` (external processor); `module_license`; `support_ticket` (if internal).

**Likely downstream modules/agents**

- Commercial/admin modules; no campaign-facing “billing agent” with production authority; finance automation stays in governed admin surfaces.

---

## How to use this map

- **Architecture and schema work** should be able to name which domain owns an object and which domains consume it.
- **Sequencing** should not require every domain at full depth before shipping vertical value—see `module-catalog.md` for module groupings and the Volunteer Command-first strategy.
