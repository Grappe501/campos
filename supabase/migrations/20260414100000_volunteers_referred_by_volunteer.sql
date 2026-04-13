-- Volunteer Command V1 — Power of 5: direct inviter link on volunteers (self-referencing).
-- Additive only; no other tables. See docs/product/phase-1-volunteer-command-v1.md (Power of 5 hooks).

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS referred_by_volunteer_id integer;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'volunteers_referred_by_volunteer_id_fkey'
  ) THEN
    ALTER TABLE public.volunteers
      ADD CONSTRAINT volunteers_referred_by_volunteer_id_fkey
      FOREIGN KEY (referred_by_volunteer_id) REFERENCES public.volunteers (id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS volunteers_referred_by_volunteer_id_idx ON public.volunteers (referred_by_volunteer_id);

COMMENT ON COLUMN public.volunteers.referred_by_volunteer_id IS 'Volunteer who invited this row (Power of 5); nullable. Not a full referral graph.';
