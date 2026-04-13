# CAMPOS build sequence map

Phased build order for **dependency-aware** delivery. Phases are **logical**—calendar dates belong in project management tools. Adjust scope within a phase via ADRs; **do not** skip **foundation** dependencies.

---

## Phase 0 — Repo and architecture foundation

**Goal:** A repo and doc stack that can govern implementation.

**Includes**

- Monorepo layout (`apps/`, `packages/`, `supabase/`) per `README.md`.  
- Doctrine: `docs/architecture/*`, `docs/product/*`, `docs/db/*` as referenced by master plan.  
- `AGENTS.md` non-negotiables internalized.  
- Engineering docs: `engineering-architecture.md`, `integration-stack.md`, `workflow-and-runtime-model.md`, `deployment-strategy.md`.

**Exit criteria**

- Contributors can answer: **where does code live**, **where do migrations live**, **where do secrets live**, **what is Volunteer Command**.

---

## Phase 1 — Schema intelligence and migration discipline

**Goal:** **Know what exists**, **stop drift**, **prepare** for safe changes.

**Includes**

- Baseline migration **captured** from remote (`refactor_backlog.md` §6) and **review process** for new migrations.  
- Schema inventory kept current (`schema_inventory.md`) when schema changes.  
- **Tenancy ADR** — org/campaign (or interim) boundary (`refactor_backlog.md` §3).  
- **RLS plan** — which tables expose PostgREST; **role matrix** draft (`refactor_backlog.md` §2).  
- **Integration envelope** sketch — idempotency, webhook immutability (`refactor_backlog.md` §4).

**Exit criteria**

- **Staging** project can apply migrations **reproducibly**.  
- **No** routine reliance on SQL editor edits for schema.

**Blocks**

- Broad volunteer CRM UI on production without **RLS** strategy.

---

## Phase 2 — Volunteer Command V1

**Goal:** First **vertical** volunteer loop on **staging** (then production when ready).

**Scope**

- See **`phase-1-volunteer-command-v1.md`** (naming: “phase-1” = first implementation wave; aligns to **Phase 2** here).

**Exit criteria**

- A volunteer can: **sign up / intake → onboard → get assigned → complete a first action → receive early follow-up** with **basic** home/dashboard.  
- **People** binding path exists (even if **linkage** is “pending”).  
- **Steve** path **stubbed or minimal** server-side only.

---

## Phase 3 — Movement Hub basics

**Goal:** Hub feels like a **movement**, not only a task list.

**Includes**

- **Campaign feed** (official posts) OR **single** combined home feed with **clear** official section.  
- **Group** surfaces: at least **team** or **geography** group + **group feed** MVP (`feed-architecture.md`, `group-architecture.md`).  
- **Notification** semantics (respect quiet hours / consent).  
- **Culture** minimum: pinned norms, **report** path stub (`culture-and-moderation.md`).

**Exit criteria**

- Volunteers see **peers** in scoped groups; leadership can post **official** guidance to a **known** surface.

**Dependency**

- Phase **2** stable (tasks + identity).

---

## Phase 4 — Growth + leadership + accountability

**Goal:** **Engines** from product planning—**without** full analytics sophistication.

**Includes**

- **Power of 5** hooks **deepened**: referral attribution, private follow-up prompts (`growth-engine.md`).  
- **Lifecycle states** operational: **at-risk**, **needs follow-up** queues for humans (`state-machine.md`, `accountability-engine.md`).  
- **Leadership** progression **MVP**: role assignment + **training gate** before elevated permissions (`leadership-system.md`, `control-layer.md`).  
- **Recognition** MVP: positive-only, consent-aware (`growth-engine.md`).

**Exit criteria**

- Captains/staff have **queues**; volunteers have **dignified** pause/reassign paths.

**Dependency**

- Phase **3** (somewhere to show recognition and group context).

---

## Phase 5 — Command dashboard intelligence

**Goal:** Leadership **sees** movement health without exporting spreadsheets.

**Includes**

- **Metric definitions** locked in docs / naming (`analytics` core in `module-catalog.md`).  
- **Funnel**: new → active; **coverage** by geography (as data allows).  
- **Read-heavy** aggregates; **no** second shadow CRM.

**Exit criteria**

- Campaign manager can answer **who is stuck** and **where coverage is thin** from **in-app** views.

**Dependency**

- Phases **2–4** producing **events** (tasks, assignments, states).

---

## Phase 6 — Voter Linkage Engine integration (production-grade)

**Goal:** **Reliable** file/signup → **`people`** linkage at scale.

**Includes**

- **Deterministic** + **review** queues (`voter-linkage-engine.md`).  
- **`person_identifiers`** persistence with **audit**.  
- **States**: matched / needs_disambiguation / not_found / out_of_state.  
- **Privacy** guardrails.

**Exit criteria**

- Field and volunteers **share** one **person** id where linkage succeeds; **disambiguation** is **human**-owned.

**Note:** **Trigger point** for linkage can appear **earlier** (Phase 2); **Phase 6** is **scale + rigor**.

---

## Phase 7 — Broader campaign modules

**Goal:** Expand **domain** coverage using the **same** graph and contracts.

**Includes**

- **Field** depth (turfs, canvass, QC) per `campaign-function-master-map.md`.  
- **Events** depth (mobilization, attendance loops).  
- **Comms** (queue, templates) with **compliance** enforcement.  
- **Fundraising** hooks when ready (`integration-stack.md`).

**Exit criteria**

- Modules **compose**—no duplicate **person** stores.

**Dependency**

- **Phase 6** or **strong interim** linkage for voter-tied work.

---

## Phase 8 — Commercial packaging / multi-tenant expansion

**Goal:** **Sell** and **isolate** tenants safely.

**Includes**

- **Entitlements**, billing connector (no secrets in repo), **admin** console patterns (`module-catalog.md` commercial section).  
- **RLS** + **tenant** enforcement **everywhere** operational tables touch.

**Exit criteria**

- **Two** logical tenants can coexist **without** cross-read in normal operation.

**Dependency**

- **Phase 1** tenancy decision **fully** implemented; **hard**ening across modules.

---

## How to read “Volunteer Command” across phases

- **Phases 2–4** deliver the **Volunteer Command** product story in **layers** (core loop → Hub social → engines).  
- **Phase 5** adds **Command** visibility; **Phase 6** strengthens **identity** for everyone.

---

## Related documents

- `master-build-plan.md`  
- `phase-1-volunteer-command-v1.md`  
- `dependency-map.md`  
