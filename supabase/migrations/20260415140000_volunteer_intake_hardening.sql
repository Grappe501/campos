-- Volunteer Command V1 — intake rate limiting + idempotency (Edge service role only; RLS on, no policies).

CREATE TABLE IF NOT EXISTS public.volunteer_intake_rate_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_hash text NOT NULL,
  email_norm text
);

CREATE INDEX IF NOT EXISTS volunteer_intake_rate_events_ip_time_idx
  ON public.volunteer_intake_rate_events (ip_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS volunteer_intake_rate_events_email_time_idx
  ON public.volunteer_intake_rate_events (email_norm, created_at DESC)
  WHERE email_norm IS NOT NULL;

ALTER TABLE public.volunteer_intake_rate_events ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.volunteer_intake_rate_events IS
  'Sliding-window rate limit audit for create-volunteer-from-intake; no direct client access.';

CREATE TABLE IF NOT EXISTS public.volunteer_intake_idempotency (
  idempotency_key text PRIMARY KEY,
  volunteer_id integer NOT NULL REFERENCES public.volunteers (id) ON DELETE CASCADE,
  response_json jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteer_intake_idempotency ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.volunteer_intake_idempotency IS
  'Cached successful intake JSON by client idempotency key; no direct client access.';
