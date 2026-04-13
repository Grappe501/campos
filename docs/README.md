# CAMPOS documentation index

This folder holds **architecture**, **product**, **database**, and **build-planning** documentation for the CAMPOS repository. Use it as the **navigation layer** for humans and for AI-assisted work in Cursor.

**Repository-wide rules** also live in `AGENTS.md` (root) and `README.md` (root).

---

## Map of the documentation system

### Architecture (`docs/architecture/`)

Doctrine and engineering direction: system philosophy, product vision, identity (Command Center vs Movement Hub), core principles, **engineering architecture**, **integration stack**, **workflow/runtime model**, **deployment strategy**.

→ Start: [`architecture/README.md`](architecture/README.md)

### Product (`docs/product/`)

Campaign domain maps, module catalog, **Volunteer Command** doctrine and engines, **master build plan**, dependency map, and phased scope (e.g. Volunteer Command V1).

→ Start: [`product/README.md`](product/README.md)

### Database (`docs/db/`)

Schema inventory, domain relationships, refactor backlog, **data architecture**, **Volunteer Command data model**, **Voter Linkage Engine** planning, **integration wiring** for Supabase and downstream modules.

→ Start: [`db/README.md`](db/README.md)

### Module docs (within product)

**Volunteer Command** is documented under `docs/product/volunteer-command/` (mission, journeys, state machine, Hub/network/culture, engines, build-facing phase-1 scope). The **module catalog** in `docs/product/module-catalog.md` situates Volunteer Command relative to other modules.

### Build plan docs (within product)

Roadmap and sequencing: **`master-build-plan.md`**, **`build-sequence-map.md`**, **`phase-1-volunteer-command-v1.md`**, **`dependency-map.md`**.

### Decisions (`docs/decisions/`)

Short, dated **architecture decisions** (ADRs) per `AGENTS.md`. The folder may be empty until decisions are recorded—create files here when choices affect implementation.

---

## Recommended reading order

See section **“Recommended reading order”** in:

- [`architecture/README.md`](architecture/README.md) — architecture-focused paths  
- [`product/README.md`](product/README.md) — product and Volunteer Command paths  
- [`db/README.md`](db/README.md) — data and migration paths  

---

## Quick links

| Area | Index |
|------|--------|
| Architecture | [architecture/README.md](architecture/README.md) |
| Product & build | [product/README.md](product/README.md) |
| Database | [db/README.md](db/README.md) |
