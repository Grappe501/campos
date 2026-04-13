# Schema inventory (baseline)

This document inventories the **existing remote Supabase schema** as observed via generated types (`supabase/types/database.types.ts`). It is intended as a **read-only baseline** to guide cleanup and modularization before product features are built.

> Note: table “emptiness” cannot be confirmed from types alone. Items flagged as “likely empty/WIP” should be validated with row counts in a safe, read-only query session.

## Domains

### People / CRM (canonical person graph)

**Tables**
- `people` *(canonical node; likely empty/WIP until graph population is implemented)*
- `person_activity`
- `person_addresses`
- `person_contact_methods`
- `person_identifiers`
- `person_match_candidates`
- `person_merge_log`
- `person_relationships`
- `person_source_links`
- `person_tags`
- `tag_definitions`

**Views**
- `people_master_v`
- `people_match_review_v`

**Notable**
- This looks like the intended **canonical CRM layer**, but it competes with raw voter tables (`raw_vr`, `raw_vh`) and voter directory tables. Confirm the direction: *person graph as the canonical join surface*.

### Raw voter data / voter file ingestion

**Tables**
- `raw_vr`
- `raw_vr_backup_20260408` *(backup table; should be time-bounded and governed)*
- `raw_vh`
- `raw_election_results`
- `voter_directory_entries`

**Views**
- `raw_vr_county_mapped`
- `vh_events`
- `vh_events_clean`
- `vh_voter_participation` *(table)*
- `voter_behavior_signals`

**Notable**
- These appear to be ingestion/landing + derived layers. A formal staging → canonical flow is needed.

### Elections / results / turnout

**Tables**
- `elections`
- `races`
- `race_candidates`
- `election_contests`
- `election_results`
- `election_results_county_v` *(view)*
- `election_results_precinct_v` *(view)*
- `county_election_results`
- `city_election_results`
- `county_election_turnout`
- `city_election_turnout`
- `election_import_log`

**Views**
- `analytics_city_election_candidate_votes`
- `analytics_city_election_totals`
- `analytics_city_election_turnout`
- `analytics_county_election_candidate_votes`
- `analytics_county_election_totals`
- `analytics_county_election_turnout`
- `precinct_results`

### Geography (counties, cities, districts)

**Tables**
- `geo_counties`
- `geo_county_aliases`
- `geo_cities`
- `geo_city_primary_county_overrides`
- `county_cd_map`
- `county_congressional_districts`
- `cd2_county_export`

**Views**
- `geo_city_primary_county_v`
- `county_detail_export_v`
- `statewide_city_master_v`
- `statewide_county_master_v`
- `cd2_county_master_v`
- `cd2_county_intel_v`
- `cd2_precinct_intel_v`
- `cd2_precinct_priority_v`
- `cd2_precinct_trend_scaffold_v`

### Polling / research

**Tables**
- `poll_surveys`
- `poll_questions`
- `poll_crosstabs`

### Field / canvassing / outreach

**Tables**
- `canvass_sessions`
- `canvass_units`
- `canvass_contacts`
- `canvass_responses`
- `field_notes`
- `field_followups`
- `field_data_quality_flags`
- `field_sync_events`
- `outreach_queue`
- `reach_out_list_items`
- `turf_assignments`
- `turfs`
- `ward_organizers`

**Views**
- `events_rollup_v` *(see Events domain below)*

### Campaign operations (events + approvals)

**Tables**
- `events`
- `event_approvals`
- `campaign_events`
- `campaign_admins`

**Views**
- `events_rollup_v`

### Communications + deliverability

**Tables**
- `comms_queue`
- `comms_templates`
- `comms_webhook_events`
- `voice_transcripts`
- `deliverability_threshold_configs`

**Views**
- `compliance_person_channel_status_v` *(see Compliance)*

### Compliance / consent / suppression

**Tables**
- `compliance_access_log`
- `compliance_consent_events`
- `compliance_message_log`
- `compliance_suppressions`

**Views**
- `compliance_person_channel_status_v`

### Workforce / volunteer management

**Tables**
- `volunteers`
- `volunteer_roles`
- `volunteer_role_assignments`
- `volunteer_signups`
- `volunteer_tasks`
- `volunteer_task_completions`

### Workflow / task system

**Tables**
- `workflow_tasks`
- `workflow_task_dependencies`

### Data integrations / ETL bookkeeping

**Tables**
- `cm_agent_onboarding` *(agent ops / onboarding metadata)*

### Public data: Census / BLS

**Tables**
- `census_county_acs`
- `census_place_acs`
- `census_tract_acs`
- `bls_laus_county`
- `bls_qcew_county`

**Views**
- `bls_laus_county_latest`
- `bls_qcew_county_latest`
- `analytics_county_economic_stress`
- `analytics_county_election_turnout`
- `analytics_county_power_profile`
- `analytics_county_registration_gap`
- `analytics_county_economic_stress`

## High-signal “canonical CRM/person” candidates

If the goal is a coherent multi-tenant campaign OS, the likely canonical person surface is:
- `people` + `person_*` tables
- `people_master_v` and `people_match_review_v` as review/curation tools

Validate whether these are currently populated; if they’re mostly empty, **graph population becomes the primary unblocker** before product features.

