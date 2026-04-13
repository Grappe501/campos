import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { invokeEdgeFunction } from "../lib/edgeFunctions";
import { getSupabase } from "../lib/supabaseClient";
// TEMP: Turnstile disabled for V1 field testing — re-enable: import { IntakeTurnstile } from "./IntakeTurnstile";
import { VolunteerHome } from "./VolunteerHome";
import type { VolunteerContext } from "./types";
import "./volunteer-onboarding.css";

const CREATE_FN = "create-volunteer-from-intake";
const CONTEXT_FN = "get-volunteer-context";

type Step = "form" | "intake_success" | "home" | "no_profile";

type CreateVolunteerResponse = {
  volunteer_id: number;
  person_id: string | null;
  first_task: {
    id: number;
    title: string;
    description: string | null;
    task_status: string;
    created_at: string;
    volunteer_id: number | null;
  };
  status: {
    onboarding_state: string;
    volunteer_status: string;
    voter_linkage_status: string;
  };
  intake_result?: "created" | "existing";
};

function readReferrerFromQuery(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("ref");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function VolunteerOnboarding() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  // TEMP: Turnstile disabled for V1 field testing — re-enable VITE_TURNSTILE_SITE_KEY + IntakeTurnstile after validation

  const [step, setStep] = useState<Step>("form");
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availabilitySummary, setAvailabilitySummary] = useState("");
  const [preferenceDigitalInPerson, setPreferenceDigitalInPerson] =
    useState("");
  const [laneInterest, setLaneInterest] = useState("");
  const [attributionSource, setAttributionSource] = useState("");
  const [referredByVolunteerId, setReferredByVolunteerId] = useState<
    number | null
  >(null);

  const [intakeTaskPreview, setIntakeTaskPreview] = useState<{
    title: string;
    description: string | null;
  } | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const [context, setContext] = useState<VolunteerContext | null>(null);

  useEffect(() => {
    const ref = readReferrerFromQuery();
    if (ref !== null) setReferredByVolunteerId(ref);
  }, []);

  const opts = useMemo(() => {
    if (!envUrl || !envKey) return null;
    return { supabaseUrl: envUrl, anonKey: envKey };
  }, [envUrl, envKey]);

  const missingConfig = !opts;

  /** Stable per page load — dedupes double-submit / retries via Edge idempotency. */
  const intakeIdempotencyKey = useMemo(
    () =>
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `intake-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`,
    [],
  );

  const loadContext = useCallback(
    async (accessToken: string, options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      if (!opts) return;
      if (!silent) setLoading(true);
      setError(null);
      try {
        const data = await invokeEdgeFunction<VolunteerContext>(
          CONTEXT_FN,
          {},
          { ...opts, accessToken },
        );
        setContext(data);
        setStep("home");
        setIntakeTaskPreview(null);
      } catch (e: unknown) {
        const err = e as Error & { code?: string };
        if (silent) {
          /* Keep showing last good context after task refresh failures. */
        } else if (err.code === "NO_VOLUNTEER_PROFILE") {
          setStep("no_profile");
          setContext(null);
        } else {
          setError(err.message || "Could not load your volunteer profile.");
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [opts],
  );

  const refreshContext = useCallback(async () => {
    const sb = getSupabase();
    if (!sb || !opts) return;
    const {
      data: { session: s },
    } = await sb.auth.getSession();
    if (!s) return;
    await loadContext(s.access_token, { silent: true });
  }, [opts, loadContext]);

  useEffect(() => {
    if (missingConfig) {
      setAuthReady(true);
      return;
    }
    const sb = getSupabase();
    if (!sb) {
      setAuthReady(true);
      return;
    }

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((event, sess) => {
      setSession(sess);
      if (event === "INITIAL_SESSION") {
        if (sess) {
          void loadContext(sess.access_token);
        }
        setAuthReady(true);
        return;
      }
      if (sess) {
        void loadContext(sess.access_token);
      } else {
        setContext(null);
        setStep("form");
      }
    });

    return () => subscription.unsubscribe();
  }, [missingConfig, loadContext]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please add your first and last name.");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError("We need a real email so you can sign in and see your task.");
      return;
    }

    if (!opts) {
      setError("App configuration is missing. Ask your organizer for help.");
      return;
    }

    const payload: Record<string, unknown> = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      availability_summary: availabilitySummary.trim() || null,
      preference_digital_in_person:
        preferenceDigitalInPerson.trim() || null,
      lane_interest: laneInterest.trim() || null,
      attribution_source: attributionSource.trim() || null,
      referred_by_volunteer_id: referredByVolunteerId,
      idempotency_key: intakeIdempotencyKey,
      turnstile_token: null,
    };

    setLoading(true);
    invokeEdgeFunction<CreateVolunteerResponse>(CREATE_FN, payload, opts)
      .then((res) => {
        setIntakeTaskPreview({
          title: res.first_task.title,
          description: res.first_task.description,
        });
        setLoginEmail(email.trim());
        setMagicLinkSent(false);
        setStep("intake_success");
      })
      .catch((err: Error) => {
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  async function handleSendMagicLink() {
    const sb = getSupabase();
    if (!opts || !sb) return;
    if (!loginEmail.trim() || !validateEmail(loginEmail)) {
      setError("Enter the same email you used on the form.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: otpErr } = await sb.auth.signInWithOtp({
      email: loginEmail.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`,
      },
    });
    setLoading(false);
    if (otpErr) {
      setError(otpErr.message);
      return;
    }
    setMagicLinkSent(true);
  }

  async function handleSignOut() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    setContext(null);
    setStep("form");
    setIntakeTaskPreview(null);
    setMagicLinkSent(false);
  }

  if (missingConfig) {
    return (
      <section className="vo-surface">
        <h1 className="vo-title">Join the team</h1>
        <p className="vo-lead">
          This page needs{" "}
          <code className="vo-code">VITE_SUPABASE_URL</code> and{" "}
          <code className="vo-code">VITE_SUPABASE_ANON_KEY</code> set for your
          environment. Copy{" "}
          <code className="vo-code">.env.example</code> to{" "}
          <code className="vo-code">.env</code> and fill in your Supabase
          project values.
        </p>
      </section>
    );
  }

  if (!authReady) {
    return (
      <section className="vo-surface">
        <p className="vo-lead">Loading…</p>
      </section>
    );
  }

  if (
    session &&
    loading &&
    !context &&
    step !== "no_profile" &&
    !error
  ) {
    return (
      <section className="vo-surface">
        <p className="vo-lead">Loading your volunteer home…</p>
      </section>
    );
  }

  if (session && !context && !loading && error && step !== "no_profile") {
    return (
      <section className="vo-surface">
        <h1 className="vo-title">Couldn’t load your profile</h1>
        <p className="vo-error">{error}</p>
        <button
          type="button"
          className="vo-button"
          onClick={() => void handleSignOut()}
        >
          Sign out
        </button>
      </section>
    );
  }

  return (
    <div className="vo-root">
      {step === "home" && context && (
        <VolunteerHome
          context={context}
          opts={opts!}
          onRefresh={refreshContext}
          onSignOut={handleSignOut}
        />
      )}

      {step === "form" && !session && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">Step in — we’re building this together</h1>
            <p className="vo-lead">
              Tell us who you are and how you’d like to help. We only need a few
              fields to get started. Next, you’ll sign in with email (we’ll send a
              link — no password to remember) so your tasks stay private and tied
              to you.
            </p>
          </header>

          <form className="vo-form" onSubmit={handleSubmit}>
            <label className="vo-label">
              First name <span className="vo-req">*</span>
              <input
                className="vo-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
            </label>
            <label className="vo-label">
              Last name <span className="vo-req">*</span>
              <input
                className="vo-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </label>
            <label className="vo-label">
              Email <span className="vo-req">*</span>
              <span className="vo-hint vo-hint--tight">
                We’ll send your sign-in link here — use an inbox you can open on
                this device.
              </span>
              <input
                className="vo-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label className="vo-label">
              Phone
              <input
                className="vo-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
            <label className="vo-label">
              When can you usually help? (a sentence is enough)
              <textarea
                className="vo-textarea"
                value={availabilitySummary}
                onChange={(e) => setAvailabilitySummary(e.target.value)}
                rows={3}
              />
            </label>
            <label className="vo-label">
              Do you prefer digital work, in-person, or a mix?
              <select
                className="vo-input"
                value={preferenceDigitalInPerson}
                onChange={(e) => setPreferenceDigitalInPerson(e.target.value)}
              >
                <option value="">Choose one</option>
                <option value="digital">Mostly digital</option>
                <option value="in_person">Mostly in person</option>
                <option value="both">A mix works for me</option>
              </select>
            </label>
            <label className="vo-label">
              What lane interests you most right now?
              <input
                className="vo-input"
                value={laneInterest}
                onChange={(e) => setLaneInterest(e.target.value)}
                placeholder="e.g. texting neighbors, events, data"
              />
            </label>
            <label className="vo-label">
              How did you hear about us?
              <input
                className="vo-input"
                value={attributionSource}
                onChange={(e) => setAttributionSource(e.target.value)}
                placeholder="Friend, social post, event…"
              />
            </label>
            {referredByVolunteerId !== null && (
              <p className="vo-hint">
                You were referred by volunteer #{referredByVolunteerId}. Thank
                you for growing the team.
              </p>
            )}

            {/* TEMP: Turnstile disabled for V1 field testing — restore vo-turnstile-wrap + IntakeTurnstile when re-enabled */}

            {error && <p className="vo-error">{error}</p>}

            <button className="vo-button" type="submit" disabled={loading}>
              {loading ? "Sending…" : "Count me in"}
            </button>
          </form>
        </section>
      )}

      {step === "intake_success" && intakeTaskPreview && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">You’re on the roster</h1>
            <p className="vo-lead">
              Your info is saved. One more step: open the sign-in link we email
              you (same address as below). That keeps your volunteer space
              private — only you can open it from your inbox.
            </p>
          </header>

          <div className="vo-card">
            <p className="vo-strong">Your first task when you’re in</p>
            <h2 className="vo-task-title">{intakeTaskPreview.title}</h2>
            {intakeTaskPreview.description && (
              <p className="vo-task-desc">{intakeTaskPreview.description}</p>
            )}
          </div>

          <p className="vo-next">
            {magicLinkSent
              ? "We sent an email — open it and tap the link. You can close this tab after you’re signed in; bookmark this page if you want to come back the same way."
              : "Request a link below. It expires after a while for security — if it does, come back here and send a fresh one."}
          </p>

          <label className="vo-label">
            Email (same as you used above)
            <input
              className="vo-input"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          {error && <p className="vo-error">{error}</p>}

          <button
            className="vo-button"
            type="button"
            onClick={() => void handleSendMagicLink()}
            disabled={loading}
          >
            {loading ? "Sending…" : "Email me a sign-in link"}
          </button>
        </section>
      )}

      {step === "no_profile" && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">We’re still connecting your profile</h1>
            <p className="vo-lead">
              This login doesn’t match a volunteer signup yet. Try the same
              email you used on the intake form, or contact your organizer — we
              can sort it out without any fuss.
            </p>
          </header>
          <button
            className="vo-button"
            type="button"
            onClick={() => void handleSignOut()}
          >
            Sign out and try again
          </button>
        </section>
      )}
    </div>
  );
}
