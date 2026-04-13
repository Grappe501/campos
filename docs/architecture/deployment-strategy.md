# CAMPOS deployment strategy

This document describes **how code moves from repo to production**, how **environments** and **secrets** are handled, and **guardrails** against unreviewed or unsafe changes—including **no direct AI changes to production**.

---

## Repo → GitHub → Netlify flow

1. **Developers** work in git branches; changes include **apps/**, **packages/**, **supabase/** (migrations, functions).  
2. **Pull requests** to the default branch are **reviewed** (humans + optional CI).  
3. **Merge** to main (or release branch) **triggers** Netlify **build** for the **web app**—**build** reads **netlify.toml** or dashboard settings and **environment variables** configured in Netlify (not in repo).  
4. **Supabase** schema changes **do not** come from Netlify alone—they apply via **`supabase` CLI** or **CI** applying **migrations** to the target project (staging first, then production).

**Principle:** **GitHub** is **source of truth** for **code and migrations**; **Netlify** deploys **app assets**; **Supabase** holds **database** truth after migrations.

---

## Environment variable handling

| Class | Where it lives |
|-------|----------------|
| **Public / anon** | `VITE_*` or framework equivalent for **supabase URL** and **anon key**—safe for browser with **RLS**. |
| **Server-only** | Netlify **build** env for SSR/serverless if used; **Supabase Edge Function** secrets for API keys and **service** credentials. |
| **Local dev** | **`.env`** (gitignored); **`.env.example`** with **placeholders only** (`AGENTS.md`). |

**Rules**

- **Never** commit **service role**, **provider API keys**, **webhook signing secrets**, or **production connection strings**.  
- **Rotate** keys if exposure suspected; **document** rotation in ADR if process changes.

---

## Migration discipline

- **All** schema changes ship as **files** under `supabase/migrations/`—**reviewed** in PR.  
- **Order:** apply to **staging** Supabase project **first**; validate app + RLS; then **production** during a **planned** window if needed.  
- **No** “fix production in SQL editor” as a routine practice—emergency only with **post-hoc** migration capture (`refactor_backlog.md`).

---

## Staging vs production expectations

| | **Staging** | **Production** |
|--|-------------|----------------|
| **Data** | Synthetic or **anonymized**; may mirror **structure** | Real voter/CRM data—**highest** care |
| **Migrations** | **First** application point | **After** staging success |
| **Secrets** | Separate keys; **can** be less restricted | **Minimal** access; **audit** logging |
| **Integrations** | Sandbox numbers, test inboxes | Live providers; **webhook** URLs point to prod |

**Staging** must exercise **RLS** and **Edge Functions**—not “RLS off for convenience.”

---

## No direct AI changes to production without review

- **Cursor** and other assistants **edit files locally** or in branches; they **do not** receive **production credentials** as a default workflow.  
- **No** automated pipeline should **apply** migrations or **deploy** to production **solely** from an LLM without **human** merge and **CI** approval.  
- **Production** database access is for **on-call** humans with **break-glass** procedures—not for routine agent use.

---

## Supabase project alignment

- **Primary** project: **peoplebase** for production-aligned work; the Supabase **project ref** (e.g. `<SUPABASE_PROJECT_REF>`) must come from **environment or dashboard**—never hardcode real refs in tracked files. **Separate** dev/staging projects recommended so **mistakes** do not hit live data.  
- **Link** CLI to the correct project; **document** which branch deploys to which Netlify **context** (production vs staging).

---

## CI expectations (high level)

- **Lint/test** on PR where configured.  
- **Migration** validation (syntax, dry-run) where possible.  
- **No** secrets in CI logs—mask outputs.

---

## Related documents

- `AGENTS.md`  
- `engineering-architecture.md`  
- `workflow-and-runtime-model.md`  
- `integration-stack.md`  
- `docs/db/refactor_backlog.md`  
