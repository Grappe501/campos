# CAMPOS integration stack (planning)

This document lists **intended integrations**, their **role**, **secret handling**, **where code runs**, and **rough dependency timing**. It is **planning-level**—no vendor SDK specifics, no code. Deep implementation belongs in ADRs and service code later.

**Principles**

- **Secrets** live in **Supabase secrets**, **Netlify env**, or **local `.env`**—**never** committed (`AGENTS.md`).  
- **Browser** runs **UI only**; **privileged** calls go **server-side** (Edge Functions, Netlify functions, or server components with safe patterns).  
- **Primary system of record** remains **Supabase/Postgres** (`engineering-architecture.md`).

---

## Supabase / Postgres

| | |
|--|--|
| **Purpose** | Canonical data store, auth, RLS, realtime, Edge Functions host. |
| **System role** | **System of record** for CRM, operations, compliance projections, integration logs. |
| **Secrets** | `SUPABASE_URL`, `SUPABASE_ANON_KEY` (client-safe with RLS), **service role** and DB passwords **server-only**; never in client bundles. |
| **Client vs server** | Client uses **anon** + RLS; **service role** only in **Edge Functions** / trusted workers. |
| **Dependency timing** | **Day zero** — foundation for everything. |

---

## OpenAI

| | |
|--|--|
| **Purpose** | LLM for **Steve**, drafting assistants, summarization—**inside policy** (`core-principles.md`). |
| **System role** | **Suggestion and routing** layer; **not** legal/compliance authority; **no** unsupervised bulk outbound. |
| **Secrets** | `OPENAI_API_KEY` (or provider-specific) in **Supabase secrets** or **Edge Function** env only. |
| **Client vs server** | **Server-side** calls from Edge Functions (or dedicated backend); **avoid** exposing keys in browser. |
| **Dependency timing** | **Early** for Volunteer Command Hub experience; **gated** by approval workflows for sensitive outputs. |

---

## Gmail / Google Calendar

| | |
|--|--|
| **Purpose** | Staff/captain **scheduling**, **inbox** workflows, optional **calendar** for events and shifts—**not** the system of record for campaign data. |
| **System role** | **Integration** for convenience and notifications; **sync** into `events` / tasks where valuable. |
| **Secrets** | OAuth client credentials + refresh tokens in **secure storage** (per user or per org), **never** in repo. |
| **Client vs server** | **Server-side** OAuth completion and token refresh; minimal client surface. |
| **Dependency timing** | **Mid** — after core events and identity exist; **optional** per campaign. |

---

## Twilio

| | |
|--|--|
| **Purpose** | **SMS** and **voice** for peer-to-peer, reminders, and comms queue delivery. |
| **System role** | **Provider adapter** behind `comms_*` and compliance gates; **webhooks** for delivery receipts. |
| **Secrets** | Account SID, auth token, API keys in **server env** / Supabase secrets; **webhook** validation secrets likewise. |
| **Client vs server** | **Server-side** send; **webhooks** hit **Edge Functions** with signature verification. |
| **Dependency timing** | **Early** for mobilization-heavy modules; **always** behind consent + suppression. |

---

## SendGrid

| | |
|--|--|
| **Purpose** | **Transactional email** and campaign broadcast plumbing (may be one of several providers). |
| **System role** | **Provider adapter** for `comms_queue`; **templates** and **events** in webhooks. |
| **Secrets** | API keys in **server env**; **signed** webhook verification. |
| **Client vs server** | **Server-side** send; **inbound** parse events to Edge Functions if used. |
| **Dependency timing** | **Early** alongside email comms; **swap** provider possible via integration layer. |

---

## Census API

| | |
|--|--|
| **Purpose** | **ACS** and geography enrichment for county/city/tract intel—**aligned** with existing `census_*` tables (`schema_inventory.md`). |
| **System role** | **ETL / batch** import into Postgres; **not** per-request from browser for heavy pulls. |
| **Secrets** | API key if required—**CI** and **worker** env only. |
| **Client vs server** | **Server-side** jobs; **read** enriched data from DB in app. |
| **Dependency timing** | **Mid** — after geography keys stable (`refactor_backlog.md`). |

---

## BLS API

| | |
|--|--|
| **Purpose** | **Labor / economic** series for county stress views—**aligned** with `bls_*` tables. |
| **System role** | **Batch** import into Postgres; **analytics** views downstream. |
| **Secrets** | API key if required—**worker** env only. |
| **Client vs server** | **Server-side** jobs; **read** from DB in app. |
| **Dependency timing** | **Mid** — parallel to Census enrichment. |

---

## Future fundraising hooks

| | |
|--|--|
| **Purpose** | Payment processor, recurring gifts, donor CRM alignment—**FEC/compliance** sensitive. |
| **System role** | **External** system-of-record for money movement; **our** DB stores **references**, **ids**, **reconciliation** state, **not** card data. |
| **Secrets** | Processor keys in **server** env; **webhooks** verified server-side. |
| **Client vs server** | **Server-side** for intents and webhooks; **client** may load **hosted** checkout if provider supports it—**no** raw secrets in app. |
| **Dependency timing** | **Later** — after `people` graph and compliance solid; **legal** review before launch. |

---

## Future social profile / handle storage

| | |
|--|--|
| **Purpose** | Optional **social handles** or **profile links** for volunteers—**movement Hub** and **relational** context—**not** a full social graph clone. |
| **System role** | **Attributes** on `people` or dedicated table with **consent** and **visibility** prefs; **no** OAuth tokens in client storage. |
| **Secrets** | OAuth for **social** platforms—**server-only**; **per-user** tokens encrypted at rest. |
| **Client vs server** | **Server-side** token exchange; **client** shows **display** fields only. |
| **Dependency timing** | **Later** — after identity and moderation model exist (`culture-and-moderation.md`). |

---

## Cross-cutting

- **Provider substitution** — adapters behind a **single** internal comms/integration contract (`refactor_backlog.md` integration envelope).  
- **Idempotency** — webhooks and sends use **dedupe** keys to survive retries.  
- **Audit** — integration actions write **append-friendly** logs before mutating projections.

---

## Related documents

- `engineering-architecture.md`  
- `workflow-and-runtime-model.md`  
- `docs/db/integration-wiring-plan.md`  
- `docs/db/campos-data-architecture.md`  
