-- Volunteer Command V1 — additive schema for onboarding, profile, people link, signup linkage placeholders.
-- See docs/product/phase-1-volunteer-command-v1.md

-- ---------------------------------------------------------------------------
-- volunteers: canonical person link, onboarding_state, profile, linkage placeholder
-- ---------------------------------------------------------------------------

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS person_id uuid;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'volunteers'
      AND column_name = 'onboarding_status'
  )
     AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'volunteers'
      AND column_name = 'onboarding_state'
  ) THEN
    ALTER TABLE public.volunteers RENAME COLUMN onboarding_status TO onboarding_state;
  END IF;
END $$;

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS onboarding_state text NOT NULL DEFAULT 'pending';

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS attribution_source text,
  ADD COLUMN IF NOT EXISTS lane_interest text,
  ADD COLUMN IF NOT EXISTS availability_summary text,
  ADD COLUMN IF NOT EXISTS preference_digital_in_person text,
  ADD COLUMN IF NOT EXISTS voter_linkage_status text NOT NULL DEFAULT 'not_started';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'volunteers_person_id_fkey'
  ) THEN
    ALTER TABLE public.volunteers
      ADD CONSTRAINT volunteers_person_id_fkey
      FOREIGN KEY (person_id) REFERENCES public.people (id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS volunteers_person_id_idx ON public.volunteers (person_id);

COMMENT ON COLUMN public.volunteers.person_id IS 'Canonical CRM person; volunteer rows attach here when identity is resolved.';
COMMENT ON COLUMN public.volunteers.onboarding_state IS 'Simple lifecycle for onboarding (string; app-defined values).';
COMMENT ON COLUMN public.volunteers.attribution_source IS 'How the volunteer heard about the campaign (intake).';
COMMENT ON COLUMN public.volunteers.lane_interest IS 'Optional lane/team interest from adaptive-lite intake.';
COMMENT ON COLUMN public.volunteers.availability_summary IS 'Short availability note from intake.';
COMMENT ON COLUMN public.volunteers.preference_digital_in_person IS 'digital | in_person | both | unknown — free text or controlled in app.';
COMMENT ON COLUMN public.volunteers.voter_linkage_status IS 'Placeholder for linkage workflow; no linkage logic in DB.';

-- ---------------------------------------------------------------------------
-- volunteer_signups: optional person link for dedup / handoff (no linkage engine)
-- ---------------------------------------------------------------------------

ALTER TABLE public.volunteer_signups
  ADD COLUMN IF NOT EXISTS person_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'volunteer_signups_person_id_fkey'
  ) THEN
    ALTER TABLE public.volunteer_signups
      ADD CONSTRAINT volunteer_signups_person_id_fkey
      FOREIGN KEY (person_id) REFERENCES public.people (id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS volunteer_signups_person_id_idx ON public.volunteer_signups (person_id);

COMMENT ON COLUMN public.volunteer_signups.person_id IS 'Set when signup matches an existing person; optional for V1 intake/dedup.';
