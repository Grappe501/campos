# CAMPOS workflow and runtime model

This document explains **how actors and systems interact at runtime**: users, **agents** (e.g., Steve), **dashboard** actions, **controlled backend** operations, **approvals**, and **shared data**. It gives Cursor and humans a **common picture** before feature code lands.

---

## Actors

| Actor | Role |
|-------|------|
| **Volunteer / staff user** | Uses **apps** (Netlify) with **Auth** identity; subject to **RLS** and **roles**. |
| **AI agent (Steve, etc.)** | **Suggests**, **drafts**, **routes**—runs **server-side** with **policy** and **tool allowlists**; **no** raw DB superuser access. |
| **Integration workers** | **Edge Functions**, scheduled jobs, webhook handlers—**apply** idempotent writes from external providers. |
| **Human approver** | Releases **bulk** or **sensitive** actions (comms, permission elevation, some training waivers) per `core-principles.md`. |

---

## Request paths (conceptual)

1. **User action in UI** — e.g., complete task, RSVP, request captain role.  
2. **Client** sends **authorized** request (anon key + user JWT + RLS) or calls **Edge Function** for privileged operations.  
3. **Edge Function** may: call **OpenAI**, call **Twilio/SendGrid**, validate **approval** token, write **audit** row, then **mutate** DB via **scoped** credentials.  
4. **Agents** follow the **same** path—**never** a separate “backdoor” to Postgres.

**Rule:** **No** service role key in browser; **no** secrets in client bundles.

---

## Approvals in workflows

**Typical approval-gated actions**

- **Bulk** or **high-risk** outbound sends (email/SMS).  
- **Leadership** permission elevation.  
- **Sensitive** training waivers.  
- **Mass** data export or merge.

**Pattern**

- **Draft** → **pending approval** record → **human** approves in **Command** UI or **internal** tool → **execute** with **audit** (who, when, what scope).  
- **Steve** may **draft** content; **approval** releases the actual `comms_queue` entry or equivalent.

---

## How modules talk to shared data

- **Single graph** — modules **read/write** `people` and operational tables **through** shared contracts (`volunteer-command-data-model.md`).  
- **No** duplicate “volunteer CRM” table per module.  
- **Events** and **integration logs** are **append-oriented** where possible; **projections** update read models.  
- **Cross-module** handoffs use **stable IDs** (`people.id`, `events.id`, `workflow_tasks.id`)—not string matching in UI.

---

## Cursor-generated work and repo doctrine

- **Align** with `packages/*` boundaries and **existing** `docs/architecture/` and `docs/db/` before large changes.  
- **Migrations** for every schema change; **no** dashboard-only edits (`AGENTS.md`).  
- **Docs** for decisions that affect multiple modules—**short** entries in `docs/decisions/`.  
- **PR review** treats AI-generated diffs like any other: **security**, **RLS**, **tenant** assumptions.

---

## Environments

| Environment | Purpose |
|-------------|---------|
| **Local / dev** | Developer machines; **local** Supabase or **dev** project; **fake** or **scoped** API keys; **seed** data. |
| **Staging** | **Parity** with prod patterns—**migrations** applied first; **RLS** on; **test** webhooks; **no** real voter PII unless governed. |
| **Production** | **peoplebase** (or designated prod); **strict** secrets; **no** direct AI/schema edits; **monitored** integrations. |

**Expectations**

- **Staging** proves migrations + deploy + RLS **before** production.  
- **Production** data treated as **immutable** except through **migrations** and **application** flows with audit (`AGENTS.md`).  
- **Feature flags** or **tenant** config can **narrow** blast radius without branching codebases.

---

## Summary diagram (logical)

```
[User] → [App on Netlify] → [Supabase Auth + RLS + RPC]
                ↓
         [Edge Function] → [OpenAI / Twilio / …] 
                ↓
         [Postgres] ← audit / compliance / queue
                ↑
[Approver] → [Command UI] → approval-gated writes
```

---

## Related documents

- `engineering-architecture.md`  
- `deployment-strategy.md`  
- `integration-stack.md`  
- `docs/db/integration-wiring-plan.md`  
- `docs/architecture/core-principles.md`  
