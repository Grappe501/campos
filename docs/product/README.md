# Product documentation

Product doctrine, **campaign domain maps**, **Volunteer Command** specs, and **build/roadmap** documents. Navigation only—see individual files for content.

**Current status**

- V1 intake/auth gate: PASS
- Current validation phase: authenticated onboarding continuation
- Next target: voter record confirmation flow

---

## Campaign-wide product maps

| Document | What it covers |
|----------|----------------|
| **`campaign-function-master-map.md`** | Major campaign departments and subfunctions: purpose, workflows, key data objects, likely modules/agents. |
| **`replacement-map.md`** | Capability map vs common tool patterns (CRM/mobilization/field/relational); dependencies and rough build stages—not a marketing comparison. |
| **`module-catalog.md`** | Platform backbone, volunteer-facing modules, campaign ops modules, AI agents, commercial/admin; Volunteer Command as first flagship module. |

---

## Build plan and dependencies

| Document | What it covers |
|----------|----------------|
| **`master-build-plan.md`** | Authoritative phased build plan: prerequisites, layer order, V1 vs later, what waits on baseline migration, planning-only areas. |
| **`build-sequence-map.md`** | Phases 0–8 with goals, exit criteria, and dependencies (foundation → Volunteer Command V1 → Hub → growth/leadership → Command intel → linkage → broader modules → commercial/multi-tenant). |
| **`phase-1-volunteer-command-v1.md`** | First implementation-ready scope for Volunteer Command V1 and explicit exclusions. |
| **`dependency-map.md`** | Dependencies between people graph, volunteer model, feeds, leadership, accountability, dashboards, linkage, training, pacing, admin controls. |

---

## Volunteer Command (`volunteer-command/`)

| Area | Files (representative) |
|------|-------------------------|
| Mission & philosophy | `mission.md`, `system-philosophy.md`, `operating-model.md`, `value-proposition.md` |
| Journeys & lifecycle | `user-journeys.md`, `lifecycle-model.md`, `state-machine.md`, `behavior-model.md` |
| Hub / network / culture | `network-layer.md`, `group-architecture.md`, `feed-architecture.md`, `culture-and-moderation.md` |
| Engines & controls | `growth-engine.md`, `leadership-system.md`, `accountability-engine.md`, `adaptive-training-engine.md`, `pacing-engine.md`, `control-layer.md` |

---

## Recommended reading order

### New contributors (product track)

1. `../architecture/product-vision.md` — integrated domains and commercial shape  
2. `../architecture/system-identity.md` — Command Center vs Movement Hub  
3. `module-catalog.md` — where Volunteer Command sits in the platform  
4. `volunteer-command/mission.md` — flagship module role  
5. `campaign-function-master-map.md` — full campaign surface area  
6. `master-build-plan.md` — what ships when  

### Before writing code

1. `../architecture/core-principles.md`  
2. `module-catalog.md`  
3. `master-build-plan.md` and `build-sequence-map.md`  
4. `phase-1-volunteer-command-v1.md` — if working on Volunteer Command  
5. `dependency-map.md` — to see cross-module dependencies  
6. `../db/volunteer-command-data-model.md` and `../db/integration-wiring-plan.md`  

### Before writing migrations

Product docs inform **what** to model; migration mechanics and schema truth live under `docs/db/` and `AGENTS.md`. Minimum:

1. `../db/refactor_backlog.md`  
2. `../db/schema_inventory.md`  
3. `../db/domain_map.md`  
4. `../db/campos-data-architecture.md`  
5. `volunteer-command-data-model.md` (in `../db/`)  
6. `dependency-map.md` — conceptual dependencies before schema changes  

---

## Post-V1 / deferred

| Document | What it covers |
|----------|----------------|
| **`post-v1-backlog.md`** | Features explicitly deferred until after V1 stabilization (e.g. candidate branding package system). |

---

## Related

- Architecture index: [`../architecture/README.md`](../architecture/README.md)  
- Database index: [`../db/README.md`](../db/README.md)  
- Top-level docs index: [`../README.md`](../README.md)  
