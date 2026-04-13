import { type FormEvent, useEffect, useMemo, useState } from "react";
import { invokeEdgeFunction } from "../lib/edgeFunctions";
import "./volunteer-onboarding.css";

const CREATE_FN = "create-volunteer-from-intake";
const COMPLETE_FN = "complete-volunteer-task";

type Step = "form" | "confirmation" | "task" | "done";

export type FirstTask = {
  id: number;
  title: string;
  description: string | null;
  task_status: string;
  created_at: string;
  volunteer_id: number | null;
};

type CreateVolunteerResponse = {
  volunteer_id: number;
  person_id: string | null;
  first_task: FirstTask;
  status: {
    onboarding_state: string;
    volunteer_status: string;
    voter_linkage_status: string;
  };
};

type CompleteTaskResponse = {
  ok: boolean;
  volunteer_id: number;
  task_id: number;
  completed_at: string;
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

  const [step, setStep] = useState<Step>("form");
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

  const [created, setCreated] = useState<CreateVolunteerResponse | null>(null);
  const [taskCompletedAt, setTaskCompletedAt] = useState<string | null>(null);

  useEffect(() => {
    const ref = readReferrerFromQuery();
    if (ref !== null) setReferredByVolunteerId(ref);
  }, []);

  const opts = useMemo(() => {
    if (!envUrl || !envKey) return null;
    return { supabaseUrl: envUrl, anonKey: envKey };
  }, [envUrl, envKey]);

  const missingConfig = !opts;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please add your first and last name.");
      return;
    }
    if (email.trim() && !validateEmail(email)) {
      setError("That email doesn’t look quite right — double-check it?");
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
    };

    setLoading(true);
    invokeEdgeFunction<CreateVolunteerResponse>(CREATE_FN, payload, opts)
      .then((res) => {
        setCreated(res);
        setStep("confirmation");
      })
      .catch((err: Error) => {
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  function handleCompleteTask() {
    if (!created || !opts) return;
    setError(null);
    setLoading(true);
    invokeEdgeFunction<CompleteTaskResponse>(
      COMPLETE_FN,
      {
        volunteer_id: created.volunteer_id,
        task_id: created.first_task.id,
      },
      opts,
    )
      .then((res) => {
        setTaskCompletedAt(res.completed_at);
        setStep("done");
      })
      .catch((err: Error) => {
        setError(err.message || "Couldn’t mark that complete. Try again?");
      })
      .finally(() => setLoading(false));
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

  return (
    <div className="vo-root">
      {step === "form" && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">Step in — we’re building this together</h1>
            <p className="vo-lead">
              No roster yet? That’s the point. Add your name and how you want to
              help, and we’ll put your first real action in front of you right
              away.
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
              Email
              <input
                className="vo-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {error && <p className="vo-error">{error}</p>}

            <button className="vo-button" type="submit" disabled={loading}>
              {loading ? "Sending…" : "Count me in"}
            </button>
          </form>
        </section>
      )}

      {step === "confirmation" && created && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">You’re in — welcome</h1>
            <p className="vo-lead">
              You’re officially on the roster as volunteer #
              {created.volunteer_id}. This campaign doesn’t grow on autopilot;
              it grows because people like you say yes to one clear next step.
              Here’s yours.
            </p>
          </header>

          <div className="vo-card">
            <p className="vo-strong">Your first task</p>
            <h2 className="vo-task-title">{created.first_task.title}</h2>
            {created.first_task.description && (
              <p className="vo-task-desc">{created.first_task.description}</p>
            )}
          </div>

          <p className="vo-next">
            When you’re ready, open the task below, do the thing, and mark it
            complete. That’s how we turn interest into momentum — one person at a
            time.
          </p>

          <button
            className="vo-button"
            type="button"
            onClick={() => setStep("task")}
          >
            Show me the task
          </button>
        </section>
      )}

      {step === "task" && created && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">Your first move</h1>
            <p className="vo-lead">
              Small, concrete, yours. Finish this and you’ve already helped this
              team exist.
            </p>
          </header>

          <div className="vo-card vo-card-emph">
            <h2 className="vo-task-title">{created.first_task.title}</h2>
            {created.first_task.description && (
              <p className="vo-task-desc">{created.first_task.description}</p>
            )}
          </div>

          {error && <p className="vo-error">{error}</p>}

          <button
            className="vo-button"
            type="button"
            onClick={handleCompleteTask}
            disabled={loading}
          >
            {loading ? "Saving…" : "I did it — mark complete"}
          </button>
        </section>
      )}

      {step === "done" && created && (
        <section className="vo-surface">
          <header className="vo-header">
            <h1 className="vo-title">Nice work — that counts</h1>
            <p className="vo-lead">
              You turned “I’m interested” into something real. The team is a
              little stronger because you showed up. When there’s a next step,
              you’ll hear it here — and you can always bring someone along who
              cares like you do.
            </p>
          </header>
          <p className="vo-muted">
            Recorded: <strong>{created.first_task.title}</strong>
            {taskCompletedAt && (
              <>
                {" "}
                · {new Date(taskCompletedAt).toLocaleString()}
              </>
            )}
          </p>
        </section>
      )}
    </div>
  );
}
