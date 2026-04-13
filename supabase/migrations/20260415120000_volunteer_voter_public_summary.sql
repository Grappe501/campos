-- Volunteer Command V1 — volunteer-facing voter summary (safe projection only).
-- Populated server-side when linkage completes; never expose raw_vr to the client.
-- See docs/db/voter-linkage-engine.md (privacy guardrails).

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS voter_summary_city text,
  ADD COLUMN IF NOT EXISTS voter_summary_county text,
  ADD COLUMN IF NOT EXISTS voter_summary_precinct text,
  ADD COLUMN IF NOT EXISTS voter_summary_registration_label text,
  ADD COLUMN IF NOT EXISTS voter_summary_districts text;

COMMENT ON COLUMN public.volunteers.voter_summary_city IS 'Public-facing city from linked file row; no street address.';
COMMENT ON COLUMN public.volunteers.voter_summary_county IS 'Public-facing county from linked file row.';
COMMENT ON COLUMN public.volunteers.voter_summary_precinct IS 'Public-facing precinct label from linked file row.';
COMMENT ON COLUMN public.volunteers.voter_summary_registration_label IS 'Safe registrant status label (e.g. Active) from file; not full VR row.';
COMMENT ON COLUMN public.volunteers.voter_summary_districts IS 'Human-readable district labels (congressional / state) for local context.';
