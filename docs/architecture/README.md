# Architecture documentation

Doctrine and **engineering direction** for CAMPOS: how the system should behave, how it is deployed, and how integrations are governed.

---

## Documents

| Document | What it covers |
|----------|----------------|
| **`system-philosophy.md`** | CAMPOS as a campaign operating system: volunteer-centered, modular, trust-first, AI-assisted within policy. |
| **`product-vision.md`** | Problem (fragmented tools), integrated domains, commercial shape (modular SaaS, agents, multi-tenant direction). |
| **`system-identity.md`** | Dual experience: **Command Center** (leadership) vs **Movement Hub** (volunteers); Steve as volunteer-facing voice. |
| **`core-principles.md`** | Operating principles: human approval, guided autonomy, migrations over drift, public celebration / private correction, onboarding outcomes. |
| **`engineering-architecture.md`** | Supabase as SoR, GitHub/Netlify/Cursor roles, modular packages, Edge Functions, multi-tenant considerations, audit/safety. |
| **`integration-stack.md`** | Intended external services (Supabase, OpenAI, email/SMS providers, Census/BLS, future hooks): purpose, secrets, client vs server, timing. |
| **`workflow-and-runtime-model.md`** | How users, agents, approvals, and backend operations interact; environments; alignment with repo doctrine. |
| **`deployment-strategy.md`** | GitHub → Netlify flow, env vars, migration discipline, staging vs production, no unreviewed AI production changes. |

---

## Recommended reading order

### New contributors (architecture track)

1. `system-philosophy.md` — intent and boundaries  
2. `system-identity.md` — who the product serves  
3. `core-principles.md` — non-negotiables for automation and data  
4. `engineering-architecture.md` — how engineering embodies the above  
5. `deployment-strategy.md` — how changes reach environments  

### Before writing code

1. `AGENTS.md` (repository root)  
2. `core-principles.md`  
3. `engineering-architecture.md`  
4. `workflow-and-runtime-model.md`  
5. `integration-stack.md` (for anything touching external APIs or secrets)  
6. `../product/master-build-plan.md` — current phased scope  
7. `../db/integration-wiring-plan.md` — data and Edge Function expectations  

### Before writing migrations

1. `AGENTS.md` — migrations only; no secrets in repo  
2. `../db/refactor_backlog.md` — baseline and structural gaps  
3. `../db/schema_inventory.md` — what exists today  
4. `../db/domain_map.md` — how domains connect  
5. `../db/campos-data-architecture.md` — layers and SoR  
6. `deployment-strategy.md` — staging-first, no dashboard drift  
7. `core-principles.md` — auditability and destructive-change caution  

---

## Related

- Product doctrine and build plan: [`../product/README.md`](../product/README.md)  
- Data layer: [`../db/README.md`](../db/README.md)  
- Top-level docs index: [`../README.md`](../README.md)  
