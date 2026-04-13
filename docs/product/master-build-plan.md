# CAMPOS master build plan (authoritative)

This is the **internal controlling roadmap** for implementing CAMPOS **module-by-module** without feature sprawl. It consolidates doctrine (`docs/architecture/`), product maps (`docs/product/`), data planning (`docs/db/`), and engineering rules (`docs/architecture/engineering-architecture.md`, `AGENTS.md`).

**Assumptions**

- **Supabase/Postgres** (`peoplebase`) is the system of record; **GitHub** is source of truth; **Netlify** deploys apps; **Cursor** assists implementation under human review.  
- **Volunteer Command** is the **first flagship module**; **Movement Hub** is the volunteer-facing home for that module and grows in phases.  
- **No secrets in git**; **migrations only** for schema changes; **no ad-hoc production destructive SQL**.

---

## What must be true before coding major features

1. **Architecture and data docs exist** — at minimum: engineering architecture, integration wiring, volunteer-command doctrine, `campos-data-architecture.md`, `volunteer-command-data-model.md`.  
2. **Migration discipline is real** — team agrees **PR-reviewed migrations**; no dashboard drift (`refactor_backlog.md`).  
3. **Baseline migration path** — a **clean baseline** from remote (or equivalent) is **captured and understood** before large schema refactors; until then, **limit** schema churn to **urgent** fixes and **document** exceptions.  
4. **Tenancy + RLS strategy chosen** — explicit ADR for **org/campaign** boundaries and **who can read/write what**; **RLS** before exposing volunteer/CRM UIs broadly.  
5. **Identity story** — how **Auth users** bind to **`people`** and **volunteer** rows (even if graph population is incomplete).  
6. **Integration envelope** — pattern for **Edge Functions**, **webhooks**, **secrets**, **idempotency** (`integration-wiring-plan.md`).  
7. **Steve/agents governance** — approval gates and **no client keys** agreed (`core-principles.md`, `workflow-and-runtime-model.md`).

Until **(3)–(5)** are at least **decided**, major feature coding risks **throwaway work** or **data leaks**.

---

## Build order (high level)

| Layer | What ships | Notes |
|-------|------------|--------|
| **Platform foundation** | Auth, tenancy decision, minimal CRM/volunteer wiring, tasks shell, consent/compliance **read path**, audit hooks, Edge Function pattern | Blocks everything else |
| **Volunteer module (V1)** | Volunteer Command **implementation-ready** slice (`phase-1-volunteer-command-v1.md`) | First vertical product value |
| **Movement Hub (basics → depth)** | Home, tasks, then **feeds & groups** (`Feeds & groups` in `module-catalog.md`) | Social/culture layer after core loop works |
| **Growth engine** | Power of 5 hooks, referral attribution, positive-only recognition surfaces | After Hub can display content safely |
| **Leadership + accountability** | Roles, progression, gentle nudges, at-risk **queues** (human-first) | After tasks + lifecycle states exist |
| **Dashboard intelligence** | Command views: funnel, coverage, **metric definitions** | After events/assignments produce truth |
| **Broader module expansion** | Field depth, events depth, comms, fundraising, linkage at scale | After foundation + Volunteer Command prove integration |

---

## V1 vs later (summary)

**V1 (first shippable Volunteer Command + minimal Hub)**

- Intake → onboarding → assignment → first action → early follow-up; **basic** volunteer home; **county/community contact awareness** (light); **Power of 5 hooks** (light); **linkage trigger point** for voter/file identity.  
- **Steve** bounded (server-side, template-heavy).  
- **Staging-first** validation; **RLS** on touched tables.

**Later**

- Full **feeds** (campaign/local/group/personal) and **moderation** depth (`feed-architecture.md`, `culture-and-moderation.md`).  
- Full **growth** analytics and **leaderboard** policy automation.  
- **Leadership** progression with full permission matrix.  
- **Command dashboard** sophistication (cross-module).  
- **Voter Linkage Engine** production scale + disambiguation UI.  
- **Commercial** packaging, **multi-tenant** hardening.

---

## Wait until baseline migration is captured cleanly

- **Broad** refactors of `public` layout (schema split), **mass** renames, or **cleanup** that touches many objects **without** a baseline.  
- **RLS** policies that assume **final** table shapes if migrations are still unstable.  
- **Production** cutover of **integration** webhooks before **staging** proves idempotency.

**May proceed in parallel with care**

- **Product UI** on **staging** with **narrow** tables.  
- **Documentation** and **ADRs**.  
- **Agent** prototypes **without** production credentials.

---

## Planning-only until data and infrastructure exist

These stay **doctrine / ADR / spikes** until prerequisites land:

- **Full** multi-tenant **billing** and **entitlement** enforcement.  
- **Full** relational graph analytics at scale.  
- **Advanced** pacing automation tied to **phase engine** across all lanes.  
- **Deep** field+VAN **parity** assumptions.  
- **Assistive** moderation ML classifiers.

They inform design **now** but should not drive **large** schema or vendor lock-in **before** foundation.

---

## Phase reference

See **`build-sequence-map.md`** for phased numbering and **`dependency-map.md`** for cross-dependencies.  
See **`phase-1-volunteer-command-v1.md`** for the first implementation-ready scope.

---

## Related documents

- `build-sequence-map.md`  
- `phase-1-volunteer-command-v1.md`  
- `dependency-map.md`  
- `docs/db/refactor_backlog.md`  
- `docs/product/module-catalog.md`  
- `docs/architecture/deployment-strategy.md`  
