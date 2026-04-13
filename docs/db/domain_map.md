# Domain map (how data ties together)

This map describes the *intended* relationships between major domains in the current schema. It prioritizes “how it should work” as a campaign operating system, without adding new product features.

## Core idea: canonical person graph + event/activity streams

To build reliable targeting, outreach, compliance, and analytics, the system needs a single canonical identity layer:

- **Raw sources** (voter registration, voter history, contact lists, signups, webhooks) land in *raw/staging tables*.
- A **person graph** (the `people` + `person_*` family) becomes the canonical join surface.
- Downstream modules (field, comms, polling, compliance, analytics) attach activity to `people`.

## Domains

## 1) Raw voter registration (VR)

**What it is**
- State/County voter registration snapshots (name, address, party, status, IDs).

**Where it lives**
- `raw_vr` (plus an explicit backup table `raw_vr_backup_20260408`)
- Mapping/coverage views like `raw_vr_county_mapped` and diagnostics views.

**How it should connect**
- VR rows should create/update `person_identifiers` and `person_addresses`, and link into `people` via `person_source_links`.
- County/city joins should resolve through `geo_counties`, `geo_cities`, and alias/override tables.

## 2) Voter history (VH) + behavior signals

**What it is**
- Election participation events by voter across time.

**Where it lives**
- `raw_vh`
- Normalized event views: `vh_events`, `vh_events_clean`
- Aggregates: `vh_voter_participation`, `voter_behavior_signals`

**How it should connect**
- VH events should attach to `people` as `person_activity` (or an equivalent activity/event table), enabling segmentation and turnout modeling.

## 3) Elections, contests, results, turnout

**What it is**
- Election metadata and results at county/city/precinct levels; candidate/race structure.

**Where it lives**
- Canonical-ish election tables: `elections`, `races`, `race_candidates`, `election_contests`
- Results/turnout tables: `election_results`, `county_election_results`, `city_election_results`, `county_election_turnout`, `city_election_turnout`
- Import audit: `election_import_log`
- Analytics views roll these up (various `analytics_*` and `precinct_results`).

**How it should connect**
- Election geography depends on consistent `geo_*` entities and county/district maps.
- VH uses election identifiers; results/turnout inform scoring and targeting layers.

## 4) Geography

**What it is**
- Counties, cities, congressional districts, mapping glue, and aliasing/overrides.

**Where it lives**
- `geo_counties`, `geo_county_aliases`, `geo_cities`, `geo_city_primary_county_overrides`
- District maps: `county_cd_map`, `county_congressional_districts`
- Export/intel views (`cd2_*`, `statewide_*`, `county_detail_export_v`)

**How it should connect**
- All raw datasets (VR, VH, Census, BLS, Results) should resolve to a consistent county/city keyspace.
- Any “primary county for city” logic should be centralized (views suggest this already exists).

## 5) Polling / research

**What it is**
- Surveys, questions, cross-tabs.

**Where it lives**
- `poll_surveys`, `poll_questions`, `poll_crosstabs`

**How it should connect**
- Poll responses (when added) should attach to `people` and/or geography aggregates and then feed analytics/targeting modules.

## 6) Field (canvassing, turf, outreach)

**What it is**
- Door knocks/calls/texts as operational workflows; turfs/assignments; followups/notes.

**Where it lives**
- `canvass_*` tables, `field_notes`, `field_followups`, `field_sync_events`, `field_data_quality_flags`
- `turfs`, `turf_assignments`, plus list/queue surfaces (`outreach_queue`, `reach_out_list_items`)

**How it should connect**
- Field contacts should link to `people` (or to voter directory entries that then map into `people`).
- Followups should become workflow tasks (`workflow_tasks`) and/or person activity.

## 7) Communications (comms) + webhooks

**What it is**
- Message templates, outbound queue, inbound provider events, transcripts.

**Where it lives**
- `comms_queue`, `comms_templates`, `comms_webhook_events`, `voice_transcripts`
- Deliverability config: `deliverability_threshold_configs`

**How it should connect**
- Communications must reference `people` and respect compliance suppression/consent.
- Webhooks should write to immutable logs and derive person-channel status (`compliance_person_channel_status_v` suggests this).

## 8) Compliance (consent, suppression, audit)

**What it is**
- Consent events, suppression lists, message logs, access logging.

**Where it lives**
- `compliance_*` tables, plus `compliance_person_channel_status_v`

**How it should connect**
- Compliance enforcement should sit between comms/field and outbound messaging.
- All changes should be auditable and append-only where possible.

## 9) Workforce (volunteers) + workflow

**What it is**
- Volunteer roster, roles, tasks, completions; general workflow dependencies.

**Where it lives**
- `volunteer_*` tables; `workflow_tasks`, `workflow_task_dependencies`

**How it should connect**
- Assignments should connect to campaigns/events/turfs and optionally geography.

## 10) Public datasets (Census ACS, BLS)

**What it is**
- County/place/tract ACS, county labor stats, wages/employment by industry.

**Where it lives**
- `census_*_acs`, `bls_*`
- “latest” views and county analytics views.

**How it should connect**
- These enrich geography entities (`geo_counties` / `geo_cities`) and power “county intel” outputs for targeting and strategy.

