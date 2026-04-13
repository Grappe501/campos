import { useCallback, useEffect, useMemo, useState } from "react";
import type { EdgeInvokeOptions } from "../lib/edgeFunctions";
import { invokeEdgeFunction } from "../lib/edgeFunctions";
import { getSupabase } from "../lib/supabaseClient";
import type { TaskRow, VolunteerContext } from "./types";
import { VoterMatchPanel } from "./VoterMatchPanel";
import { VoterRecordSummary } from "./VoterRecordSummary";
import { VOTER_CONFIRM_TASK_TITLE } from "./voterTaskConstants";
import "./volunteer-home.css";

const COMPLETE_FN = "complete-volunteer-task";
const SET_PREFERRED_FN = "set-volunteer-preferred-name";

type CompleteTaskResponse = {
  ok: boolean;
  task_id: number;
  completed_at: string;
};

type CommandView = "home" | "tasks" | "voter_record";

function displayName(v: VolunteerContext["volunteer"]): string {
  const pref = v.preferred_name?.trim();
  if (pref) return pref;
  const fn = v.first_name?.trim();
  if (fn) return fn;
  const parts = [v.first_name, v.last_name].filter(Boolean);
  if (parts.length) return parts.join(" ");
  return v.email?.trim() || "there";
}

function friendlyOnboarding(state: string): string {
  const s = state.toLowerCase();
  if (s === "new") {
    return "You’re just getting started — that’s exactly where every teammate begins.";
  }
  if (s.includes("progress") || s === "active") {
    return "You’re in motion. Keep going.";
  }
  return `Status: ${state.replace(/_/g, " ")}`;
}

function friendlyVolunteerStatus(status: string): string {
  const s = status.toLowerCase();
  if (s === "active") return "Active on the team";
  return status.replace(/_/g, " ");
}

function friendlyLinkage(status: string): string {
  switch (status) {
    case "linked":
      return "Your voter record is linked — that helps with local placement.";
    case "out_of_state":
      return "You told us you’re registered outside Arkansas — you’re still all in.";
    case "not_found":
      return "No file match yet — that happens sometimes. You’re still on the team.";
    case "not_started":
      return "Voter confirmation isn’t finished yet — when it is, we can anchor local context here.";
    case "needs_disambiguation":
      return "Pick the voter file row that matches you — we’ll finish linking.";
    default:
      return status.replace(/_/g, " ");
  }
}

function nextStepMessage(
  pending: TaskRow | undefined,
  hasAnyTasks: boolean,
  voterTaskPending: boolean,
): string {
  if (voterTaskPending) {
    return "When you’re ready, confirm your voter info above — it helps place you in the right local context.";
  }
  if (pending) {
    return "Finish the step above when you’re ready — then we’ll line up what makes sense next.";
  }
  if (hasAnyTasks) {
    return "Nothing open right now. When there’s another move for you, it’ll show up here.";
  }
    return "We’re lining up your first action — check back soon, or message your organizer if something feels stuck.";
}

type Props = {
  context: VolunteerContext;
  opts: EdgeInvokeOptions;
  onRefresh: () => Promise<void>;
  onSignOut: () => void | Promise<void>;
};

export function VolunteerHome({ context, opts, onRefresh, onSignOut }: Props) {
  const { volunteer, tasks } = context;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionBanner, setCompletionBanner] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<CommandView>("home");
  const [preferredDraft, setPreferredDraft] = useState("");
  const [prefSaving, setPrefSaving] = useState(false);
  const [prefError, setPrefError] = useState<string | null>(null);

  useEffect(() => {
    setPreferredDraft(volunteer.preferred_name?.trim() ?? "");
  }, [volunteer.preferred_name]);

  const showPreferredPrompt = !volunteer.preferred_name?.trim();

  const handleSavePreferred = useCallback(async () => {
    const t = preferredDraft.trim();
    if (!t) {
      setPrefError("Add what you’d like us to call you.");
      return;
    }
    if (t.length > 120) {
      setPrefError("Use 120 characters or fewer.");
      return;
    }
    const sb = getSupabase();
    if (!sb) return;
    setPrefError(null);
    setPrefSaving(true);
    try {
      const {
        data: { session },
      } = await sb.auth.getSession();
      if (!session) {
        setPrefError("Sign in again to save.");
        return;
      }
      await invokeEdgeFunction<{ preferred_name: string | null }>(
        SET_PREFERRED_FN,
        { preferred_name: t },
        { ...opts, accessToken: session.access_token },
      );
      await onRefresh();
    } catch (e: unknown) {
      const err = e as Error;
      setPrefError(err.message || "Couldn’t save. Try again?");
    } finally {
      setPrefSaving(false);
    }
  }, [preferredDraft, opts, onRefresh]);

  const pendingTask = useMemo(
    () => tasks.find((t) => t.task_status !== "completed"),
    [tasks],
  );

  const voterConfirmPending =
    pendingTask?.title === VOTER_CONFIRM_TASK_TITLE;

  const handleGenericComplete = useCallback(async () => {
    if (!pendingTask || voterConfirmPending) return;
    const sb = getSupabase();
    if (!sb) return;
    setError(null);
    setLoading(true);
    try {
      const {
        data: { session },
      } = await sb.auth.getSession();
      if (!session) {
        setError("Sign in again to complete your task.");
        return;
      }
      const res = await invokeEdgeFunction<CompleteTaskResponse>(
        COMPLETE_FN,
        { task_id: pendingTask.id },
        { ...opts, accessToken: session.access_token },
      );
      setCompletionBanner(
        `Recorded: “${pendingTask.title}” · ${new Date(res.completed_at).toLocaleString()}`,
      );
      await onRefresh();
    } catch (e: unknown) {
      const err = e as Error;
      setError(err.message || "Couldn’t mark that complete. Try again?");
    } finally {
      setLoading(false);
    }
  }, [onRefresh, opts, pendingTask, voterConfirmPending]);

  const referredNote =
    volunteer.referred_by_volunteer_id != null ? (
      <p className="vh-muted">
        You joined through someone already on the team — thank you for growing
        this with us.
      </p>
    ) : null;

  const mainHeading =
    activeView === "home"
      ? "Today"
      : activeView === "tasks"
        ? "Tasks"
        : "Voter record";

  return (
    <div className="vh-root">
      {completionBanner && (
        <div className="vh-banner vh-banner--global" role="status">
          <strong>Got it.</strong> {completionBanner}
          <button
            type="button"
            className="vh-banner-dismiss"
            onClick={() => setCompletionBanner(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="vh-shell">
        <aside className="vh-left" aria-label="Volunteer navigation">
          <div className="vh-brand">
            <span className="vh-brand-mark" aria-hidden />
            <div>
              <div className="vh-brand-title">Volunteer Command</div>
              <div className="vh-brand-sub">Your workspace</div>
            </div>
          </div>

          <div className="vh-identity">
            <p className="vh-identity-name">{displayName(volunteer)}</p>
            {showPreferredPrompt && (
              <div className="vh-preferred-prompt">
                <label className="vh-preferred-label" htmlFor="vh-preferred-input">
                  What should we call you?
                </label>
                <p className="vh-preferred-hint">
                  Optional — how we greet you in this space. You can change it anytime.
                </p>
                <div className="vh-preferred-row">
                  <input
                    id="vh-preferred-input"
                    className="vh-preferred-input"
                    type="text"
                    maxLength={120}
                    value={preferredDraft}
                    onChange={(e) => setPreferredDraft(e.target.value)}
                    placeholder="e.g. Alex"
                    autoComplete="nickname"
                  />
                  <button
                    type="button"
                    className="vh-preferred-save"
                    disabled={prefSaving}
                    onClick={() => void handleSavePreferred()}
                  >
                    {prefSaving ? "Saving…" : "Save"}
                  </button>
                </div>
                {prefError && <p className="vh-error vh-preferred-error">{prefError}</p>}
              </div>
            )}
            <p className="vh-identity-lead">{friendlyOnboarding(volunteer.onboarding_state)}</p>
            <p className="vh-status-pill">{friendlyVolunteerStatus(volunteer.volunteer_status)}</p>
            <p className="vh-linkage-compact">
              {friendlyLinkage(volunteer.voter_linkage_status ?? "not_started")}
            </p>
          </div>

          <nav className="vh-nav" aria-label="Primary">
            <button
              type="button"
              className={`vh-nav-item${activeView === "home" ? " vh-nav-item--active" : ""}`}
              onClick={() => setActiveView("home")}
            >
              Home
            </button>
            <button
              type="button"
              className={`vh-nav-item${activeView === "tasks" ? " vh-nav-item--active" : ""}`}
              onClick={() => setActiveView("tasks")}
            >
              Tasks
            </button>
            <button
              type="button"
              className={`vh-nav-item${activeView === "voter_record" ? " vh-nav-item--active" : ""}`}
              onClick={() => setActiveView("voter_record")}
            >
              Voter record
            </button>
            <div className="vh-nav-divider" role="presentation" />
            <button
              type="button"
              className="vh-nav-item vh-nav-item--placeholder"
              disabled
              title="Coming in a later release"
              aria-label="Community — coming in a later release"
            >
              Community
            </button>
            <button
              type="button"
              className="vh-nav-item vh-nav-item--placeholder"
              disabled
              title="Coming in a later release"
              aria-label="Notes — coming in a later release"
            >
              Notes
            </button>
            <button
              type="button"
              className="vh-nav-item vh-nav-item--placeholder"
              disabled
              title="Coming in a later release"
              aria-label="Calendar — coming in a later release"
            >
              Calendar
            </button>
          </nav>

          <dl className="vh-meta vh-meta--rail">
            <div>
              <dt>Onboarding</dt>
              <dd>{volunteer.onboarding_state.replace(/_/g, " ")}</dd>
            </div>
            {volunteer.lane_interest?.trim() && (
              <div>
                <dt>Lane you’re drawn to</dt>
                <dd>{volunteer.lane_interest}</dd>
              </div>
            )}
            {volunteer.preference_digital_in_person?.trim() && (
              <div>
                <dt>How you like to help</dt>
                <dd>
                  {volunteer.preference_digital_in_person.replace(/_/g, " ")}
                </dd>
              </div>
            )}
          </dl>

          {referredNote}

          <button
            type="button"
            className="vh-linkish vh-signout"
            onClick={() => void onSignOut()}
          >
            Sign out
          </button>
        </aside>

        <main className="vh-main" aria-label="Workspace">
          <div className="vh-main-header">
            <h1 className="vh-main-title">{mainHeading}</h1>
            {activeView === "home" && (
              <p className="vh-main-lead">
                Your home base — open tasks and next steps show up here.
              </p>
            )}
            {activeView === "tasks" && (
              <p className="vh-main-lead">Everything assigned to you in one place.</p>
            )}
            {activeView === "voter_record" && (
              <p className="vh-main-lead">
                Linking your voter file row helps place you in the right local context.
              </p>
            )}
          </div>

          <VoterRecordSummary volunteer={volunteer} tasks={tasks} />

          {activeView === "tasks" && (
            <section className="vh-surface vh-section" aria-label="All tasks">
              <h2 className="vh-h2 vh-h2--inline">Your list</h2>
              {tasks.length === 0 ? (
                <p className="vh-empty">
                  No tasks on your list yet. Your organizer will add your first step when it’s ready.
                </p>
              ) : (
                <ul className="vh-task-list">
                  {tasks.map((t) => (
                    <li key={t.id} className="vh-task-row">
                      <span className="vh-task-row-title">{t.title}</span>
                      <span
                        className={
                          t.task_status === "completed"
                            ? "vh-task-badge vh-task-badge--done"
                            : "vh-task-badge vh-task-badge--open"
                        }
                      >
                        {t.task_status === "completed" ? "Done" : "Open"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className="vh-surface vh-section" aria-label="Current task">
            <h2 className="vh-h2">Current task</h2>
            {tasks.length === 0 && (
              <p className="vh-empty">
                You don’t have a task yet — we’ll get you your next step soon. If
                something feels stuck, reach out to your organizer.
              </p>
            )}
            {tasks.length > 0 && !pendingTask && (
              <p className="vh-empty">
                You’re all caught up — no open tasks right now. We’ll put the next
                move here when it’s ready.
              </p>
            )}
            {pendingTask && voterConfirmPending && (
              <VoterMatchPanel
                task={pendingTask}
                opts={opts}
                onRefresh={onRefresh}
                onDoneMessage={(msg) => setCompletionBanner(msg)}
              />
            )}
            {pendingTask && !voterConfirmPending && (
              <>
                <div className="vh-card">
                  <h3 className="vh-task-title">{pendingTask.title}</h3>
                  {pendingTask.description && (
                    <p className="vh-task-desc">{pendingTask.description}</p>
                  )}
                  {pendingTask.due_at && (
                    <p className="vh-due">
                      Due: {new Date(pendingTask.due_at).toLocaleString()}
                    </p>
                  )}
                </div>
                {error && <p className="vh-error">{error}</p>}
                <button
                  type="button"
                  className="vh-button"
                  onClick={() => void handleGenericComplete()}
                  disabled={loading}
                >
                  {loading ? "Saving…" : "I did it — mark complete"}
                </button>
              </>
            )}
          </section>
        </main>

        <aside className="vh-right" aria-label="Context and next steps">
          <section className="vh-surface vh-section vh-next">
            <h2 className="vh-h2">What’s next</h2>
            <p className="vh-next-text">
              {nextStepMessage(
                pendingTask,
                tasks.length > 0,
                Boolean(voterConfirmPending),
              )}
            </p>
          </section>
          <section className="vh-surface vh-section vh-help">
            <h2 className="vh-h2">Guidance</h2>
            <p className="vh-help-text">
              Stuck or need a human? Reach out to your organizer — they can help you get unstuck
              without you having to explain the whole app.
            </p>
          </section>
          <section className="vh-surface vh-section vh-slot">
            <h2 className="vh-h2">Local context</h2>
            <p className="vh-slot-text">
              Reminders, turf notes, and local officials will land here in a later release.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
