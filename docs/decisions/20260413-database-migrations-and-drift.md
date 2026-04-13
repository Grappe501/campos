# Database migrations and drift (2026-04-13)

## Context

CAMPOS ships SQL under `supabase/migrations/`. The production database already contains a large baseline schema (CRM, analytics, volunteers). **Migrations in this repo are additive** (new columns/tables/indexes for Volunteer Command V1 and related features). They do **not** recreate the full schema from scratch.

## Source of truth

- **Deployed Postgres (Supabase project)** is the authority for what runs in production.
- **Git migrations** are the authority for *changes* we intend to apply everywhere; every schema change must land as a new timestamped file under `supabase/migrations/`.

## Matching migrations to the deployed DB

1. **Link CLI to the project** (once per machine): `npx supabase login` then `npx supabase link --project-ref <ref>` from the repo root.
2. **See what is applied remotely vs local files**: `npm run db:migration:list` (or `npx supabase migration list`).
3. **After editing SQL locally**, apply to the linked remote in a controlled window: `npx supabase db push` (review the plan; avoid destructive ops without backup/review).
4. **Regenerate TypeScript types** when schema changes: `npm run db:types` against the same DB you care about (`--local` after `db:reset`, or `--linked` for remote — prefer flags documented in Supabase CLI for your version).
5. **Drift detection**: if someone changed the remote by hand, use `npx supabase db diff` (with care) to emit a migration that brings git and DB back in sync — prefer never to hand-edit production without a migration follow-up.
6. **Regenerate `supabase/types/database.types.ts`** after schema changes:  
   `npx supabase gen types typescript --linked > supabase/types/database.types.ts` (review diff; use `--local` only when your local DB matches what you intend to type).

## Local sandbox

- `npm run db:start` requires Docker. `npm run db:reset` applies migrations then `seed.sql`.
- A **fresh** local DB that only has Supabase defaults **cannot** apply our first migration if core tables (`volunteers`, `people`, …) do not exist. Local development should use a **linked** project’s shadow/pulled baseline, or restore from a dump of the shared dev/prod shape. Do not “invent” duplicate `CREATE TABLE` for core CRM tables in this repo without an explicit baseline migration strategy.

## Volunteer intake debugging

Edge Function `create-volunteer-from-intake` logs Postgres/PostgREST fields under `pg` (message, code, details, hint) on failed inserts. User-facing errors append a `correlation_id` reference in the web client for matching to logs.
