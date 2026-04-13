# Refactor backlog (before product work)

This backlog captures structural gaps that should be addressed **before** building product features on top of the current schema.

## Highest priority gaps

### 1) Canonical person graph population (unblocker)

- **Problem**: The schema includes a full person graph surface (`people`, `person_*`), but the repo lacks a documented, enforced pipeline that populates it from raw sources (VR/VH, outreach lists, comms, volunteers).
- **Needed**:
  - Define canonical identity keys and matching strategy (deterministic + probabilistic review loop).
  - Establish `raw_*` → `person_*` ingestion jobs and reconciliation logic (append-only logs, merge audit).
  - Make `people` the required join surface for comms/field/compliance.

### 2) Security/RLS review across all operational tables

- **Problem**: Supabase-backed apps require consistent RLS. With the current breadth (comms, compliance, people), RLS gaps can become data leaks quickly.
- **Needed**:
  - Inventory which tables/views are exposed via PostgREST.
  - Document intended access patterns (campaign admin, volunteer, analyst, system).
  - Implement and test RLS policies *before* building UI/agents that assume safety.

### 3) Multi-tenancy model is not explicit

- **Observation**: The schema as represented in types shows **no `tenant_id` / `org_id` / `campaign_id` pattern** broadly applied.
- **Needed**:
  - Choose the tenancy boundary (org → campaign → workspace) and enforce it consistently.
  - Avoid “implicit single-tenant” assumptions in future modules.

### 4) Integration tables & eventing contract

- **Problem**: There are webhook/event tables (`comms_webhook_events`, `field_sync_events`) but no unified integration contract.
- **Needed**:
  - Standardize provider event envelopes (idempotency keys, provider, event type, received_at, payload hash).
  - Make webhook logs immutable; derive projections separately.
  - Add integration catalog tables (providers, credentials references—*not secrets*—and sync state).

### 5) ETL gaps for BLS and ACS (tract/place)

- **Problem**: Tables exist for BLS/ACS at multiple grains, but the “gold” joins into geography and downstream analytics aren’t formalized.
- **Needed**:
  - Confirm canonical geography keys (county FIPS, place GEOID, tract GEOID) and enforce constraints.
  - Add import batching discipline (batch tables, provenance fields, validation reports).
  - Ensure tract/place ACS has clear mapping to cities/counties for reporting surfaces.

### 6) Migration discipline + baseline protection

- **Problem**: Without a real baseline migration and clear rules, schema drift will accumulate.
- **Needed**:
  - Establish a baseline migration captured from remote.
  - Enforce “migrations only” changes, with naming and review conventions.
  - Prevent accidental empty/broken migrations from landing.

## Additional structural concerns

### 7) Raw vs canonical vs analytics separation

- **Problem**: Raw tables, operational tables, and analytics views are interleaved in `public`.
- **Needed**:
  - Define layer boundaries (e.g., `raw`, `core`, `ops`, `analytics` schemas) or enforce naming + exposure discipline if staying in `public`.
  - Ensure analytics views never become implicit sources of truth for writes.

### 8) Backups and “one-off” tables governance

- **Problem**: Presence of `raw_vr_backup_20260408` suggests ad-hoc backups.
- **Needed**:
  - A policy for backups (retention, naming, access restrictions, storage location, and why it exists).

### 9) Compliance invariants as first-class constraints

- **Problem**: Compliance tables exist, but invariants likely aren’t enforced (suppression must be respected, consent provenance must be traceable).
- **Needed**:
  - Append-only logs for consent/message send decisions.
  - Clear suppression precedence rules and enforcement points.

### 10) Observability + data quality diagnostics

- **Problem**: There are diagnostics views for VR mapping coverage, but similar coverage may be needed across other imports.
- **Needed**:
  - Standard data quality flags, dashboards, and “blocker thresholds” for pipelines.

