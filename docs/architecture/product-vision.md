# CAMPOS product vision

This document describes what CAMPOS is for in product terms: the problem space, the integrated surface area, and the commercial shape of the platform. It is written for builders and operators deciding what to build next and what *not* to duplicate.

## Problem: fragmented campaign tooling

Campaigns routinely run a patchwork of tools that do not share a consistent model of people, permissions, tasks, or outcomes. That fragmentation produces duplicate data, conflicting views of “who did what,” weak handoffs between teams, and expensive integration glue. Staff burn time on reconciliation; volunteers burn trust on mixed messages.

**CAMPOS is intended to replace that fragmentation** with a single system of record and a modular product layer that can grow by domain without splitting the truth across silos.

## Functional scope (integrated domains)

CAMPOS is aimed at unifying work that today typically spans separate products and ad-hoc channels:

| Domain | Role in the OS |
|--------|------------------|
| **CRM** | Durable record of people, relationships, consent, and interaction history—shared across teams. |
| **Field** | Canvassing, turf, assignments, outcomes, and follow-up—tied to volunteers and geography without orphan spreadsheets. |
| **Events** | Scheduling, roles, attendance, and post-event actions—connected to volunteer capacity and communications. |
| **Communications** | Segmentation, messaging, and narrative consistency—grounded in the same people and campaign structure as field and fundraising. |
| **Volunteer management** | Onboarding, roles, teams, recognition, and pathways—treated as core product, not an admin afterthought. |
| **Relational organizing** | Who knows whom, asks, and accountability—first-class objects, not a side project in a generic contact list. |
| **Fundraising** | Donor pipeline, compliance-sensitive handling, and reporting—integrated where legal and campaign rules require alignment. |
| **Compliance** | Rules, disclosures, training signals, and restricted actions—visible constraints, not hidden tribal knowledge. |
| **Analytics** | Operational and movement health metrics—derived from unified data with clear definitions. |
| **Command dashboard** | Leadership visibility: progress, risk, bottlenecks, and narrative—without duplicating a second CRM in a BI tool. |

The point is not that every domain reaches full parity with every incumbent on day one; it is that **the architecture and data model assume eventual coverage** so the campaign does not outgrow the platform structurally.

## Commercial vision

**Modular SaaS.** Customers buy and expand capabilities as modules (e.g., volunteer command, field operations, fundraising workflows) rather than as a pile of one-off features. Modules share identity, permissions, audit expectations, and core CRM concepts.

**One system, multiple sellable agents.** The same platform hosts automations and assistants that behave as *agents* with scoped permissions—useful for drafting, routing, summarizing, and suggesting—without becoming ungoverned actors. Commercially, agent capabilities can be packaged and priced as add-ons where they deliver clear operational value.

**Candidate command center + volunteer movement hub.** Two primary experiences (see `system-identity.md`) map to how campaigns actually run: leadership needs a mission-control view; volunteers need a hub that feels like a movement, not an HR portal.

**Future multi-tenant architecture.** The product is built so multiple organizations and campaigns can coexist on shared infrastructure with strict tenant isolation, role models that do not leak across boundaries, and schema evolution through migrations—not ad-hoc dashboard edits. Single-tenant deployments may exist early; multi-tenant readiness is a design constraint, not a distant rewrite.

## Non-goals (for clarity)

- Replacing every specialized tool in every jurisdiction on launch day.
- Optimizing solely for the shortest path to a demo; the vision assumes sustained operation through primary season and general election workloads.
- Treating AI as the product’s moral or legal decision-maker; humans remain accountable for campaign conduct and compliance.

## Relationship to “Volunteer Command”

Volunteer Command is the **first major module** in this vision: it proves the volunteer-centered OS in production—onboarding, teams, movement-facing surfaces, and leadership alignment—before the full breadth of domains is complete. Later modules extend the same core identity and data contracts.
