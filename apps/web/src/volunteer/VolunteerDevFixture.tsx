import { useCallback, useMemo } from "react";
import { VolunteerHome } from "./VolunteerHome";
import {
  DEV_VOLUNTEER_FIXTURE_CONTEXT,
  disableVolunteerDevFixtureForSession,
} from "./devVolunteerFixture";
import "./volunteer-dev-fixture.css";
import "./volunteer-onboarding.css";

/**
 * Local/dev-only shell: renders {@link VolunteerHome} with a static context so
 * Volunteer Command UI can be exercised without magic-link email rate limits.
 * Gated by {@link isVolunteerDevFixtureEnabled} in App (never in production builds).
 */
export function VolunteerDevFixture() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const opts = useMemo(() => {
    if (!envUrl || !envKey) return null;
    return { supabaseUrl: envUrl, anonKey: envKey };
  }, [envUrl, envKey]);

  const onRefresh = useCallback(async () => {
    /* Fixture data is static; real refresh runs after sign-in via VolunteerOnboarding. */
  }, []);

  const onSignOut = useCallback(() => {
    disableVolunteerDevFixtureForSession();
    window.location.reload();
  }, []);

  if (!opts) {
    return (
      <section className="vo-surface" style={{ padding: "1.5rem" }}>
        <h1 className="vo-title">Dev fixture needs config</h1>
        <p className="vo-lead">
          Set <code className="vo-code">VITE_SUPABASE_URL</code> and{" "}
          <code className="vo-code">VITE_SUPABASE_ANON_KEY</code> in{" "}
          <code className="vo-code">apps/web/.env.local</code> (edge calls from
          this UI still require a real session).
        </p>
      </section>
    );
  }

  return (
    <>
      <div className="vo-dev-fixture-banner" role="status">
        <strong>Dev fixture mode.</strong> Static sample data — not your account.
        Edge actions (voter match, complete task, save name) need a real session;
        use this to review VolunteerHome, voter summary, and task layout.{" "}
        <strong>Sign out</strong> returns to the normal volunteer flow (fixture
        stays off in this tab until you clear{" "}
        <code>sessionStorage</code> key{" "}
        <code>campos_volunteer_dev_fixture_off</code> or open a new tab).
      </div>
      <VolunteerHome
        context={DEV_VOLUNTEER_FIXTURE_CONTEXT}
        opts={opts}
        onRefresh={onRefresh}
        onSignOut={onSignOut}
        devFixtureShell
      />
    </>
  );
}
