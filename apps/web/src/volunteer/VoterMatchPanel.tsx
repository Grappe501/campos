import { type FormEvent, useCallback, useState } from "react";
import type { EdgeInvokeOptions } from "../lib/edgeFunctions";
import { invokeEdgeFunction } from "../lib/edgeFunctions";
import { getSupabase } from "../lib/supabaseClient";
import type { TaskRow } from "./types";
import { VOTER_CONFIRM_TASK_TITLE } from "./voterTaskConstants";

const MATCH_FN = "match-volunteer-to-voterfile";

type Candidate = { id: number; label: string };

type LookupResponse =
  | {
      result: "matched";
      message: string;
      task_completed: boolean;
      voter_linkage_status: string;
    }
  | {
      result: "needs_disambiguation";
      candidates: Candidate[];
      message: string;
    }
  | {
      result: "not_found";
      message: string;
      task_completed: boolean;
      voter_linkage_status: string;
    }
  | {
      result: "out_of_state";
      message: string;
      task_completed: boolean;
      voter_linkage_status: string;
    }
  | {
      result: "not_eligible";
      message: string;
      task_completed: boolean;
      voter_linkage_status: string;
    };

type ConfirmResponse = {
  result: string;
  message: string;
  task_completed: boolean;
  voter_linkage_status: string;
};

type Props = {
  task: TaskRow;
  opts: EdgeInvokeOptions;
  onRefresh: () => Promise<void>;
  onDoneMessage: (message: string) => void;
  /**
   * `embedded`: shorter intro; heading lives in {@link VolunteerHome} (less duplicate chrome).
   */
  presentation?: "default" | "embedded";
  /** Dev fixture shell only — reminds that actions do not persist without a real session. */
  showDevFixtureHint?: boolean;
};

export function VoterMatchPanel({
  task,
  opts,
  onRefresh,
  onDoneMessage,
  presentation = "default",
  showDevFixtureHint = false,
}: Props) {
  if (task.title !== VOTER_CONFIRM_TASK_TITLE) {
    return null;
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cityOrCounty, setCityOrCounty] = useState("");
  const [scope, setScope] = useState<"ar" | "other">("ar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [resultNote, setResultNote] = useState<string | null>(null);

  const embedded = presentation === "embedded";

  const runLookup = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      setError(null);
      setResultNote(null);
      const sb = getSupabase();
      if (!sb) return;
      const {
        data: { session },
      } = await sb.auth.getSession();
      if (!session) {
        setError("Sign in again to continue.");
        return;
      }

      if (scope === "other") {
        setLoading(true);
        try {
          const res = await invokeEdgeFunction<LookupResponse>(
            MATCH_FN,
            {
              action: "lookup",
              first_name: "",
              last_name: "",
              birth_year: 1990,
              registration_scope: "other",
            },
            { ...opts, accessToken: session.access_token },
          );
          setCandidates(null);
          setResultNote(res.message);
          if ("task_completed" in res && res.task_completed) {
            onDoneMessage(res.message);
            await onRefresh();
          }
        } catch (err: unknown) {
          setError(
            err instanceof Error
              ? err.message
              : "We couldn’t complete that step. Try again in a moment.",
          );
        } finally {
          setLoading(false);
        }
        return;
      }

      const y = parseInt(birthYear.trim(), 10);
      if (!firstName.trim() || !lastName.trim()) {
        setError(
          "Add your first and last name the way they usually appear on your voter registration.",
        );
        return;
      }
      if (!Number.isInteger(y)) {
        setError("Birth year should be four digits, e.g. 1990.");
        return;
      }

      setLoading(true);
      try {
        const res = await invokeEdgeFunction<LookupResponse>(
          MATCH_FN,
          {
            action: "lookup",
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            birth_year: y,
            zip_code: zipCode.trim() || null,
            city_or_county: cityOrCounty.trim() || null,
            registration_scope: scope,
          },
          { ...opts, accessToken: session.access_token },
        );

        if (res.result === "needs_disambiguation") {
          setCandidates(res.candidates);
          setResultNote(res.message);
          return;
        }

        setCandidates(null);
        if ("message" in res && res.message) {
          setResultNote(res.message);
        }
        if ("task_completed" in res && res.task_completed) {
          onDoneMessage(res.message);
          await onRefresh();
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "We couldn’t look that up. Try again in a moment.",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      birthYear,
      cityOrCounty,
      firstName,
      lastName,
      onDoneMessage,
      onRefresh,
      opts,
      scope,
      zipCode,
    ],
  );

  const pickCandidate = useCallback(
    async (rawVrId: number) => {
      setError(null);
      const sb = getSupabase();
      if (!sb) return;
      const {
        data: { session },
      } = await sb.auth.getSession();
      if (!session) {
        setError("Sign in again to continue.");
        return;
      }
      const y = parseInt(birthYear.trim(), 10);
      setLoading(true);
      try {
        const res = await invokeEdgeFunction<ConfirmResponse>(
          MATCH_FN,
          {
            action: "confirm",
            raw_vr_id: rawVrId,
            birth_year: y,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
          { ...opts, accessToken: session.access_token },
        );
        setCandidates(null);
        setResultNote(res.message);
        if (res.task_completed) {
          onDoneMessage(res.message);
          await onRefresh();
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "We couldn’t save that choice. Try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [birthYear, firstName, lastName, onDoneMessage, onRefresh, opts],
  );

  return (
    <div className={`vh-voter${embedded ? " vh-voter--embedded" : ""}`}>
      {showDevFixtureHint && (
        <p className="vh-voter-fixture-hint" role="note">
          <strong>Preview only.</strong> Buttons here do not save or change data
          until you use a real signed-in session — not the static dev fixture.
        </p>
      )}
      {embedded ? (
        <p className="vh-voter-why vh-voter-why--compact">
          We match against the public voter file (never your full street address
          here). <strong>Out of state?</strong> Choose “registered in another
          state” in the form — we skip the Arkansas lookup.
        </p>
      ) : (
        <div className="vh-card">
          <h3 className="vh-task-title">{task.title}</h3>
          {task.description && (
            <p className="vh-task-desc">{task.description}</p>
          )}
          <p className="vh-voter-why">
            This step links you to a public voter record so we can place you in
            the right local context — we never show your full street address here.
          </p>
          <p className="vh-voter-why">
            <strong>If we find a match,</strong> we’ll save a short summary (like
            county or precinct) to your profile. <strong>If we don’t,</strong> you
            can still volunteer — we’ll note what happened and you can move on.
          </p>
          <p className="vh-voter-why">
            <strong>Out of state?</strong> Choose “registered in another state”
            below — no judgment, we just won’t run an Arkansas file match.
          </p>
        </div>
      )}

      {resultNote && !candidates?.length && (
        <p className="vh-voter-result" role="status">
          {resultNote}
        </p>
      )}

      {candidates && candidates.length > 0 && (
        <div className="vh-voter-pick">
          <p className="vh-voter-result">{resultNote}</p>
          <p className="vh-voter-disambig-hint">
            We found more than one possible match — that’s common. Tap the line
            that sounds like you. If none fit, go back and adjust ZIP or
            city/county, then try “Look up my record” again.
          </p>
          <ul className="vh-voter-candidates">
            {candidates.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="vh-candidate-btn"
                  disabled={loading}
                  onClick={() => void pickCandidate(c.id)}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!candidates?.length && (
        <form className="vh-voter-form" onSubmit={(e) => void runLookup(e)}>
          <fieldset className="vh-fieldset">
            <legend className="vh-legend">Registration</legend>
            <label className="vh-radio">
              <input
                type="radio"
                name="scope"
                checked={scope === "ar"}
                onChange={() => setScope("ar")}
              />{" "}
              I’m registered to vote in Arkansas
            </label>
            <label className="vh-radio">
              <input
                type="radio"
                name="scope"
                checked={scope === "other"}
                onChange={() => setScope("other")}
              />{" "}
              I’m registered in another state
            </label>
          </fieldset>

          {scope === "ar" && (
            <>
              <label className="vh-label">
                Legal first name
                <span className="vh-field-hint">
                  Use the name on your registration, not a nickname.
                </span>
                <input
                  className="vh-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="vh-label">
                Legal last name
                <input
                  className="vh-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </label>
              <label className="vh-label">
                Birth year
                <input
                  className="vh-input"
                  inputMode="numeric"
                  placeholder="e.g. 1990"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  required
                />
              </label>
              <label className="vh-label">
                ZIP code (5 digits) — or leave blank if you use city/county below
                <input
                  className="vh-input"
                  inputMode="numeric"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  autoComplete="postal-code"
                />
              </label>
              <label className="vh-label">
                City or county (if no ZIP)
                <input
                  className="vh-input"
                  value={cityOrCounty}
                  onChange={(e) => setCityOrCounty(e.target.value)}
                />
              </label>
            </>
          )}

          {error && <p className="vh-error">{error}</p>}

          <button
            type="submit"
            className="vh-button"
            disabled={loading}
          >
            {loading
              ? "Working…"
              : scope === "other"
                ? "Save and continue"
                : "Look up my record"}
          </button>
        </form>
      )}
    </div>
  );
}
