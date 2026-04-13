-- Volunteer Command V1 — display-layer name override (does not change people.first_name / people.last_name).

ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS preferred_name text;

COMMENT ON COLUMN public.volunteers.preferred_name IS
  'Volunteer-facing display name; optional override over first/last for greetings and UI.';
