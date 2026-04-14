import type { VolunteerContext } from "./types";
import { VOTER_CONFIRM_TASK_TITLE } from "./voterTaskConstants";

/** Session-only opt-out so developers can return to the normal flow without editing env. */
export const VOLUNTEER_DEV_FIXTURE_SESSION_DISABLE_KEY =
  "campos_volunteer_dev_fixture_off";

/**
 * Dev-only: static context for UI testing without magic-link email.
 * Never active in production builds (`import.meta.env.PROD`).
 */
export function isVolunteerDevFixtureEnabled(): boolean {
  if (import.meta.env.PROD) return false;
  if (import.meta.env.VITE_VOLUNTEER_DEV_FIXTURE !== "true") return false;
  if (typeof window === "undefined") return false;
  if (
    window.sessionStorage.getItem(VOLUNTEER_DEV_FIXTURE_SESSION_DISABLE_KEY) ===
    "1"
  ) {
    return false;
  }
  return true;
}

export function disableVolunteerDevFixtureForSession(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(VOLUNTEER_DEV_FIXTURE_SESSION_DISABLE_KEY, "1");
}

const FIXTURE_NOW = "2026-01-15T18:00:00.000Z";

/**
 * Mirrors a typical post-intake state: one completed task, voter confirmation open,
 * linkage ready for {@link VoterMatchPanel} + {@link VoterRecordSummary} paths.
 */
export const DEV_VOLUNTEER_FIXTURE_CONTEXT: VolunteerContext = {
  volunteer: {
    id: 0,
    person_id: "00000000-0000-0000-0000-000000000001",
    first_name: "Dev",
    last_name: "Fixture",
    preferred_name: null,
    email: "dev-fixture@example.test",
    onboarding_state: "active",
    volunteer_status: "active",
    voter_linkage_status: "needs_disambiguation",
    voter_summary_city: "Little Rock",
    voter_summary_county: "Pulaski",
    voter_summary_precinct: "TEST-01",
    voter_summary_registration_label: "Demo registration label",
    voter_summary_districts: "Demo district",
    lane_interest: "events",
    preference_digital_in_person: "both",
    referred_by_volunteer_id: null,
    created_at: FIXTURE_NOW,
  },
  tasks: [
    {
      id: 900000,
      title: "Welcome — your first step",
      description:
        "Fixture: completed task so you can see continuity before voter confirmation.",
      task_status: "completed",
      created_at: FIXTURE_NOW,
      volunteer_id: 0,
      due_at: null,
      completed_at: FIXTURE_NOW,
    },
    {
      id: 900001,
      title: VOTER_CONFIRM_TASK_TITLE,
      description:
        "Dev fixture — UI only. Server match/complete requires a real signed-in session.",
      task_status: "open",
      created_at: FIXTURE_NOW,
      volunteer_id: 0,
      due_at: null,
      completed_at: null,
    },
  ],
};
