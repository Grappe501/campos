# Database documentation

Planning-level **data architecture** for CAMPOS on **Supabase/Postgres**: inventory, domain wiring, backlog, Volunteer Command data concepts, **Voter Linkage Engine**, and **integration** rules. Schema **truth** is ultimately in migrations and generated types; these docs explain intent and dependencies.

---

## Documents

| Document | What it covers |
|----------|----------------|
| **`schema_inventory.md`** | Baseline inventory of tables/views from generated types—read-only snapshot to guide cleanup and modularization. |
| **`domain_map.md`** | How major domains (raw VR/VH, elections, geo, field, comms, compliance, volunteers, analytics) **should** connect via the **canonical person graph**. |
| **`refactor_backlog.md`** | Structural gaps before heavy product work: graph population, RLS, multi-tenancy, integration envelopes, migration discipline, ETL gaps. |
| **`campos-data-architecture.md`** | Layered stack: raw voter intelligence → canonical people graph → campaign operations → comms → compliance → analytics → billing/commercial → AI/agent interaction. |
| **`volunteer-command-data-model.md`** | Planning entities for Volunteer Command (profile, onboarding events, assignments, trainings, referrals, etc.) and ties to `people`, `person_*`, geography, activities. |
| **`voter-linkage-engine.md`** | Linking file/signup records to `people`: minimal-question flow, deterministic scoring, `person_identifiers`, audit, outcome states, privacy. |
| **`integration-wiring-plan.md`** | How Volunteer Command connects to field, events, messaging, fundraising, feeds, Command dashboard, Steve/governance; engineering rules (no destructive agent SQL, secrets off-repo). |

---

## Recommended reading order

### New contributors (data track)

1. `domain_map.md` — mental model of how data should flow  
2. `schema_inventory.md` — what exists today  
3. `campos-data-architecture.md` — layers and system of record  
4. `refactor_backlog.md` — known gaps and unblockers  
5. `volunteer-command-data-model.md` — flagship module data concepts  
6. `voter-linkage-engine.md` — identity resolution planning  

### Before writing code (data-touching features)

1. `AGENTS.md` (repository root)  
2. `domain_map.md` and `campos-data-architecture.md`  
3. `integration-wiring-plan.md`  
4. `../product/dependency-map.md`  
5. `../product/volunteer-command/` as relevant to the feature  
6. `refactor_backlog.md` — RLS and tenancy expectations  

### Before writing migrations

1. `AGENTS.md` — migrations only; no secrets in repo; no ad-hoc destructive production changes  
2. `refactor_backlog.md` — baseline migration and drift prevention  
3. `schema_inventory.md` — current objects  
4. `domain_map.md` — avoid breaking intended joins  
5. `campos-data-architecture.md` — which layer a change belongs to  
6. `../architecture/deployment-strategy.md` — staging-first  
7. `../architecture/core-principles.md` — auditability  
8. If touching volunteers/linkage: `volunteer-command-data-model.md`, `voter-linkage-engine.md`  

---

## Related

- Architecture index: [`../architecture/README.md`](../architecture/README.md)  
- Product / build index: [`../product/README.md`](../product/README.md)  
- Top-level docs index: [`../README.md`](../README.md)  
- Decision records (when present): [`../decisions/`](../decisions/)  
