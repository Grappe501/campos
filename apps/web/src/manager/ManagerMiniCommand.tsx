import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { invokeEdgeFunction } from "../lib/edgeFunctions";
import { getEmailRedirectUrl } from "../lib/authRedirect";
import { getSupabase } from "../lib/supabaseClient";
import "./manager-mini-command.css";

const METRICS_FN = "get-volunteer-command-metrics";

export type VolunteerCommandMetrics = {
  total_volunteers: number;
  new_volunteers_7d: number;
  active_volunteers_7d: number;
  first_task_completion_rate: number | null;
  voter_linkage_counts: {
    linked: number;
    not_started: number;
    not_found: number;
    out_of_state: number;
    needs_disambiguation: number;
  };
  referred_volunteer_count: number;
  computed_at: string;
};

type LoadState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "need_auth" }
  | { kind: "forbidden" }
  | { kind: "error"; message: string }
  | { kind: "ok"; data: VolunteerCommandMetrics };

function pct(rate: number | null): string {
  if (rate === null || Number.isNaN(rate)) return "—";
  return `${Math.round(rate * 1000) / 10}%`;
}

export function ManagerMiniCommand() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [state, setState] = useState<LoadState>({ kind: "idle" });

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setAuthReady(true);
      setState({ kind: "error", message: "App is not configured." });
      return;
    }
    void sb.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthReady(true);
    });
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const sb = getSupabase();
    const envUrl = import.meta.env.VITE_SUPABASE_URL;
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!sb || !envUrl || !envKey) {
      setState({ kind: "error", message: "App is not configured." });
      return;
    }
    const { data: s } = await sb.auth.getSession();
    const token = s.session?.access_token;
    if (!token) {
      setState({ kind: "need_auth" });
      return;
    }
    setState({ kind: "loading" });
    try {
      const data = await invokeEdgeFunction<VolunteerCommandMetrics>(
        METRICS_FN,
        {},
        {
          supabaseUrl: envUrl,
          anonKey: envKey,
          accessToken: token,
        },
      );
      setState({ kind: "ok", data });
    } catch (e) {
      const err = e as Error & { code?: string };
      if (err.code === "FORBIDDEN") {
        setState({ kind: "forbidden" });
        return;
      }
      if (err.code === "UNAUTHORIZED") {
        setState({ kind: "need_auth" });
        return;
      }
      setState({
        kind: "error",
        message: "Could not load metrics. Try again in a moment.",
      });
    }
  }, []);

  useEffect(() => {
    if (!authReady) return;
    void load();
  }, [authReady, session?.access_token, load]);

  const sb = getSupabase();
  const signInEmail = async (email: string) => {
    if (!sb) return;
    setState({ kind: "loading" });
    const redirect =
      typeof window !== "undefined" ? getEmailRedirectUrl() : undefined;
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirect },
    });
    if (error) {
      setState({ kind: "error", message: "Could not send sign-in link." });
      return;
    }
    setMagicSent(true);
    setState({ kind: "need_auth" });
  };

  return (
    <div className="mmc-root">
      <header className="mmc-header">
        <h1 className="mmc-title">Field test snapshot</h1>
        <p className="mmc-sub">
          Volunteer Command V1 · quick counts for one manager — not a full dashboard
        </p>
      </header>

      {!authReady && <p className="mmc-muted">Loading…</p>}

      {authReady && state.kind === "need_auth" && (
        <section className="mmc-card mmc-card-wide">
          <p>Sign in with the email your team added for manager access.</p>
          {magicSent && (
            <p className="mmc-muted">
              Open the link in your email, then come back here — your numbers will load automatically.
            </p>
          )}
          <ManagerMagicLink onSubmit={signInEmail} />
        </section>
      )}

      {authReady && state.kind === "forbidden" && (
        <section className="mmc-card mmc-card-wide">
          <p>You don’t have access to manager metrics.</p>
          <p className="mmc-muted">
            If you should, ask an admin to add your email to the server allowlist.
          </p>
        </section>
      )}

      {authReady && state.kind === "error" && (
        <section className="mmc-card mmc-card-wide">
          <p>{state.message}</p>
          <button type="button" className="mmc-btn" onClick={() => void load()}>
            Retry
          </button>
        </section>
      )}

      {authReady && state.kind === "loading" && (
        <p className="mmc-muted">Loading metrics…</p>
      )}

      {authReady && state.kind === "ok" && (
        <MetricsGrid data={state.data} onRefresh={() => void load()} />
      )}

    </div>
  );
}

function ManagerMagicLink({
  onSubmit,
}: {
  onSubmit: (email: string) => void | Promise<void>;
}) {
  const [email, setEmail] = useState("");
  return (
    <form
      className="mmc-form"
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit(email);
      }}
    >
      <label className="mmc-label">
        Email
        <input
          className="mmc-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <button type="submit" className="mmc-btn mmc-btn-primary">
        Send magic link
      </button>
    </form>
  );
}

function MetricsGrid({
  data,
  onRefresh,
}: {
  data: VolunteerCommandMetrics;
  onRefresh: () => void;
}) {
  const total = data.total_volunteers;
  const noVolunteers = total === 0;
  const noRecent =
    !noVolunteers &&
    data.new_volunteers_7d === 0 &&
    data.active_volunteers_7d === 0;

  const v = data.voter_linkage_counts;

  return (
    <div className="mmc-metrics">
      {noVolunteers && (
        <p className="mmc-banner">
          No volunteers in the system yet. When people complete intake, counts will appear here.
        </p>
      )}
      {!noVolunteers && noRecent && (
        <p className="mmc-banner mmc-banner-soft">
          No new or active-touch volunteers in the last 7 days — either a quiet week or people haven’t
          signed in yet.
        </p>
      )}

      <div className="mmc-actions">
        <button type="button" className="mmc-btn" onClick={onRefresh}>
          Refresh
        </button>
        <span className="mmc-muted mmc-compact">
          Updated {new Date(data.computed_at).toLocaleString()}
        </span>
      </div>

      <div className="mmc-grid">
        <MetricCard label="Total volunteers" value={String(total)} />
        <MetricCard
          label="New volunteers (7 days)"
          hint="People who joined in the last week — by signup time"
          value={String(data.new_volunteers_7d)}
        />
        <MetricCard
          label="Active volunteers (7 days)"
          hint="Status active and updated in the last 7 days"
          value={String(data.active_volunteers_7d)}
        />
        <MetricCard
          label="First-task completion rate"
          hint="Share with ≥1 task whose earliest task is completed"
          value={pct(data.first_task_completion_rate)}
        />
        <MetricCard
          label="Referred volunteers"
          hint="Volunteers with a referrer set"
          value={String(data.referred_volunteer_count)}
        />
      </div>

      <section className="mmc-card">
        <h2 className="mmc-section-title">Voter confirmation status</h2>
        <p className="mmc-linkage-lead">
          Where people are in the voter match step — counts, not quality scores.
        </p>
        <ul className="mmc-linkage-list">
          <li>
            <span>Linked</span> <strong>{v.linked}</strong>
          </li>
          <li>
            <span>Not started</span> <strong>{v.not_started}</strong>
          </li>
          <li>
            <span>Not found</span> <strong>{v.not_found}</strong>
          </li>
          <li>
            <span>Out of state</span> <strong>{v.out_of_state}</strong>
          </li>
          <li>
            <span>Needs disambiguation</span>{" "}
            <strong>{v.needs_disambiguation}</strong>
          </li>
        </ul>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="mmc-card">
      <p className="mmc-metric-label">{label}</p>
      {hint && <p className="mmc-hint">{hint}</p>}
      <p className="mmc-metric-value">{value}</p>
    </div>
  );
}
