# Assistant Campaign Manager OS / CAMPOS

CAMPOS is a modular campaign operating system built around **Supabase**, **Cursor**, **GitHub**, and **Netlify**.

This repository is intentionally scaffolded as a multi-package workspace so product capabilities can evolve as isolated, reusable modules (core logic, UI, DB access, agents, and simulations) while keeping infrastructure and documentation first-class.

## Repository layout

- `apps/`: application surfaces (e.g. dashboard UI)
- `packages/`: reusable modules (core, db, ui, agents, simulations)
- `supabase/`: database schema migrations, edge functions, seeds, and generated types
- `docs/`: architecture, product notes, db notes, prompts, and decision records
- `scripts/`: repo automation scripts

## Principles

- No secrets in git; use `.env` locally and keep `.env.example` up to date.
- Schema changes happen via migrations only (no ad-hoc production edits).
- Major architectural changes should be documented in `docs/decisions/` before implementation.

