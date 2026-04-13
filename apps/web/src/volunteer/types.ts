/** Shared shapes for Volunteer Command V1 (Edge `get-volunteer-context` + UI). */

export type TaskRow = {
  id: number;
  title: string;
  description: string | null;
  task_status: string;
  created_at: string;
  volunteer_id: number | null;
  due_at: string | null;
  /** Present when a completion row exists (authoritative timestamp). */
  completed_at: string | null;
};

export type VolunteerRow = {
  id: number;
  person_id: string | null;
  first_name: string | null;
  last_name: string | null;
  /** Display-layer override; does not replace CRM person names. */
  preferred_name?: string | null;
  email: string | null;
  onboarding_state: string;
  volunteer_status: string;
  voter_linkage_status: string;
  /** Safe projection from linked file row; set server-side only (may be absent before deploy). */
  voter_summary_city?: string | null;
  voter_summary_county?: string | null;
  voter_summary_precinct?: string | null;
  voter_summary_registration_label?: string | null;
  voter_summary_districts?: string | null;
  lane_interest: string | null;
  preference_digital_in_person: string | null;
  referred_by_volunteer_id: number | null;
  created_at: string;
};

export type VolunteerContext = {
  volunteer: VolunteerRow;
  tasks: TaskRow[];
};
