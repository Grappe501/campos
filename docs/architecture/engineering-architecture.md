# CAMPOS engineering architecture

This document states **how the system should be engineered** so implementation (including Cursor-assisted work) stays aligned with product doctrine and data discipline. It complements `docs/db/campos-data-architecture.md` and `AGENTS.md`.

---

## Supabase as system of record

- **Postgres** (via Supabase) holds **authoritative** state: people graph, volunteer records, compliance, comms queue projections, field operations, and integration-derived facts.  
- **Clients** (browser, mobile) **read and request changes** through **controlled** surfaces—PostgREST with RLS, RPCs, and **Edge Functions**—not ad-hoc direct admin connections for product features.  
- **Analytics** and **exports** are **downstream**; they do not become implicit write paths.

---

## GitHub as source of truth

- **Application code**, **migrations**, **edge function source**, and **documentation** live in git; **reviewed** changes are the norm.  
- **Schema truth** is what is **merged** in `supabase/migrations/`—not manual edits in a production dashboard (`AGENTS.md`).  
- **Branching and PRs** are the default path for anything that affects production behavior.

---

## Netlify as app deployment surface

- **Web app(s)** in `apps/` deploy to **Netlify** (build from repo, environment-specific configuration).  
- **Static assets** and **serverless** functions on Netlify (if used) hold **no database credentials** in client bundles—**server-side** secrets stay in Netlify env or delegated to Supabase Edge Functions.

---

## Cursor as implementation copilot

- **Cursor** accelerates **editing, refactors, and exploration**—it does **not** replace architecture review, security review, or migration review.  
- Generated work must **match** repo layout (`apps/`, `packages/`, `supabase/`), **follow** `AGENTS.md`, and **reference** docs in `docs/architecture/` and `docs/db/` before large refactors.  
- **No autonomous** production deploys or **production schema edits** from the assistant; humans approve merges and migrations.

---

## Modular app architecture

- **`packages/*`** — reusable boundaries: core domain logic, DB access patterns, UI primitives, agents, simulations—**avoid** circular dependencies (`AGENTS.md`).  
- **`apps/*`** — thin surfaces that compose packages; **no** business logic duplicated as one-off in app folders when it belongs in a package.  
- **Modules** (Volunteer Command, field, comms, etc.) **consume** shared **tenant + identity + CRM** contracts—see **`docs/product/module-catalog.md`**.

---

## Documentation-first and migration-first discipline

- **Documentation-first:** meaningful behavior and cross-module contracts **should** have a doc or ADR before or alongside code (`docs/decisions/` for major changes).  
- **Migration-first:** any **schema** change ships as a **versioned migration**; no “fix it in the dashboard” drift (`refactor_backlog.md`).

---

## Edge functions for controlled server-side operations

- **Supabase Edge Functions** (or equivalent controlled RPC layer) own **privileged** operations: calling external APIs with secrets, **webhook** ingestion, **approval-gated** actions, **idempotent** integration writes.  
- **Never** expose **service role** keys to browsers; **never** embed **secrets** in client code (`AGENTS.md`, `integration-wiring-plan.md`).

---

## Future multi-tenant considerations

- **Design** for **org → campaign → workspace** boundaries even when early deployments are single-tenant (`refactor_backlog.md`).  
- **RLS** and **tenant scoping** on operational tables are **non-optional** before exposing volunteer or CRM UIs to untrusted networks.  
- **Feature flags** and **module entitlements** should align with **billing** later without rewriting core identity.

---

## Auditability and safety requirements

- **Consent, suppression, linkage decisions, merges, moderation actions, leadership permission changes** must be **explainable** and **traceable** (`docs/db/campos-data-architecture.md`, `core-principles.md`).  
- **Append-only** logs preferred for high-stakes events (comms, compliance, integration envelopes).  
- **AI/agents** do not receive **destructive** SQL or **unreviewed** production writes; **human approval** gates for bulk and sensitive actions.

---

## Related documents

- `AGENTS.md` — non-negotiables  
- `deployment-strategy.md` — environments and CI  
- `workflow-and-runtime-model.md` — runtime interactions  
- `integration-stack.md` — external services  
- `docs/db/integration-wiring-plan.md` — data wiring and engineering rules  
