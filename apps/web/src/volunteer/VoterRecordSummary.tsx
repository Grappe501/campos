import type { TaskRow, VolunteerRow } from "./types";
import { VOTER_CONFIRM_TASK_TITLE } from "./voterTaskConstants";

type Props = {
  volunteer: VolunteerRow;
  tasks: TaskRow[];
};

function hasSummaryData(v: VolunteerRow): boolean {
  return Boolean(
    v.voter_summary_county?.trim() ||
      v.voter_summary_city?.trim() ||
      v.voter_summary_precinct?.trim() ||
      v.voter_summary_districts?.trim() ||
      v.voter_summary_registration_label?.trim(),
  );
}

export function VoterRecordSummary({ volunteer, tasks }: Props) {
  const status = volunteer.voter_linkage_status ?? "not_started";
  const pendingTask = tasks.find((t) => t.task_status !== "completed");
  const voterConfirmOpen = pendingTask?.title === VOTER_CONFIRM_TASK_TITLE;

  if (status === "linked") {
    const detail = hasSummaryData(volunteer);
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--linked"
        aria-label="Voter record summary"
      >
        <h2 className="vh-h2">Voter record summary</h2>
        <p className="vh-voter-summary-lead">
          We’ve confirmed your voter record. This helps us understand your local context — without
          showing your full street address here.
        </p>
        {detail ? (
          <dl className="vh-voter-summary-dl">
            {volunteer.voter_summary_registration_label?.trim() && (
              <div>
                <dt>Registration</dt>
                <dd>{volunteer.voter_summary_registration_label.trim()}</dd>
              </div>
            )}
            {volunteer.voter_summary_county?.trim() && (
              <div>
                <dt>County</dt>
                <dd>{volunteer.voter_summary_county.trim()}</dd>
              </div>
            )}
            {volunteer.voter_summary_city?.trim() && (
              <div>
                <dt>City</dt>
                <dd>{volunteer.voter_summary_city.trim()}</dd>
              </div>
            )}
            {volunteer.voter_summary_precinct?.trim() && (
              <div>
                <dt>Precinct</dt>
                <dd>{volunteer.voter_summary_precinct.trim()}</dd>
              </div>
            )}
            {volunteer.voter_summary_districts?.trim() && (
              <div>
                <dt>Districts</dt>
                <dd>{volunteer.voter_summary_districts.trim()}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="vh-muted vh-voter-summary-muted">
            Local placement details will appear here as soon as they’re synced to your profile.
          </p>
        )}
        <p className="vh-voter-summary-footnote">
          Check from time to time that your registration details are still correct — especially after a
          move.
        </p>
      </section>
    );
  }

  if (status === "out_of_state") {
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
        aria-label="Voter record"
      >
        <h2 className="vh-h2">Voter record</h2>
        <p className="vh-voter-summary-lead">
          You told us you’re registered outside Arkansas — you’re still part of the team. We won’t
          match an Arkansas voter file row for this step, and that’s expected.
        </p>
      </section>
    );
  }

  if (status === "not_found") {
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
        aria-label="Voter record"
      >
        <h2 className="vh-h2">Voter record</h2>
        <p className="vh-voter-summary-lead">
          We couldn’t match a row in the Arkansas voter file with what we had — that’s okay. You can
          still organize with us, and we can refine this over time.
        </p>
      </section>
    );
  }

  if (status === "needs_disambiguation") {
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
        aria-label="Voter record"
      >
        <h2 className="vh-h2">Voter record</h2>
        <p className="vh-voter-summary-lead">
          More than one possible match — common when names or places overlap. Use the buttons in your
          task to pick the one that fits; then we’ll save a short summary here.
        </p>
      </section>
    );
  }

  if (status === "not_started" && voterConfirmOpen) {
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
        aria-label="Voter record"
      >
        <h2 className="vh-h2">Voter record</h2>
        <p className="vh-voter-summary-lead">
          Finish the voter confirmation step in your workspace when you’re ready — then a short
          summary of your local placement will show up here.
        </p>
      </section>
    );
  }

  if (status === "not_started") {
    return (
      <section
        className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
        aria-label="Voter record"
      >
        <h2 className="vh-h2">Voter record</h2>
        <p className="vh-voter-summary-lead">
          When you’re ready, complete the voter confirmation step — then we can anchor local context
          without exposing your full address in this workspace.
        </p>
      </section>
    );
  }

  return (
    <section
      className="vh-surface vh-section vh-voter-summary vh-voter-summary--muted"
      aria-label="Voter record"
    >
      <h2 className="vh-h2">Voter record</h2>
      <p className="vh-voter-summary-lead">
        Your linkage status: {status.replace(/_/g, " ")}. You’re still on the team — we’ll keep this
        updated as we learn more.
      </p>
    </section>
  );
}
