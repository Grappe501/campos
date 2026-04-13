/**
 * Safe, volunteer-facing fields derived from a linked raw_vr row.
 * No addresses, no raw file payload — only what we intentionally show in Command V1.
 */

export type RawVrPublicSummarySource = {
  res_city: string | null;
  county: string | null;
  precinct_name: string | null;
  registrant_status: string | null;
  congressional_district: string | null;
  state_senate_district: string | null;
  state_representative_district: string | null;
};

export type VolunteerVoterSummaryColumns = {
  voter_summary_city: string | null;
  voter_summary_county: string | null;
  voter_summary_precinct: string | null;
  voter_summary_registration_label: string | null;
  voter_summary_districts: string | null;
};

function buildDistrictLabels(row: RawVrPublicSummarySource): string | null {
  const parts: string[] = [];
  const cd = row.congressional_district?.trim();
  const ss = row.state_senate_district?.trim();
  const sh = row.state_representative_district?.trim();
  if (cd) parts.push(`Congressional ${cd}`);
  if (ss) parts.push(`State Senate ${ss}`);
  if (sh) parts.push(`State House ${sh}`);
  return parts.length ? parts.join(" · ") : null;
}

/** Maps a raw_vr row to nullable summary columns on volunteers. */
export function volunteerSummaryFromRawVr(
  row: RawVrPublicSummarySource,
): VolunteerVoterSummaryColumns {
  return {
    voter_summary_city: row.res_city?.trim() || null,
    voter_summary_county: row.county?.trim() || null,
    voter_summary_precinct: row.precinct_name?.trim() || null,
    voter_summary_registration_label: row.registrant_status?.trim() || null,
    voter_summary_districts: buildDistrictLabels(row),
  };
}

export function nullVolunteerSummary(): VolunteerVoterSummaryColumns {
  return {
    voter_summary_city: null,
    voter_summary_county: null,
    voter_summary_precinct: null,
    voter_summary_registration_label: null,
    voter_summary_districts: null,
  };
}
