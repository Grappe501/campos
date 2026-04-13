# Agent rules for CAMPOS

These rules apply to all automated changes, contributors, and agents working in this repository.

## Non-negotiables

- **Migrations only for schema changes**: Any database schema change must be expressed as a migration under `supabase/migrations/`. Avoid manual schema edits and avoid “drift”.
- **Never store secrets in the repo**: No API keys, tokens, passwords, private URLs, service account JSON, or production connection strings in git. Use local `.env` files and keep `.env.example` as placeholders only.
- **Document architectural decisions early**: Before major code changes, record the rationale and trade-offs in `docs/decisions/` (keep it short, decision-oriented, and dated).
- **Keep modules isolated and reusable**: Prefer `packages/*` modules with clear boundaries; avoid cross-package coupling and circular dependencies.
- **No direct destructive production database changes**: No ad-hoc `DROP`, `TRUNCATE`, `DELETE` without safe migration paths, backups, and explicit review. Treat production data as immutable unless a migration/maintenance plan exists.
- **Align with a multi-tenant modular campaign OS**: All new work should support a multi-tenant architecture and remain modular (campaigns, organizations, users, permissions, integrations, simulations) without hard-coding single-tenant assumptions.

