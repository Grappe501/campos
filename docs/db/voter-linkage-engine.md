# Voter Linkage Engine (planning)

This document is the **formal planning spec** for the **Voter Linkage Engine**: how raw and directory **voter-related records** resolve to the **canonical people graph** (`people`, `person_identifiers`, supporting `person_*` tables) in the **peoplebase** Supabase project. It aligns with `domain_map.md` (VR/VH → person graph) and `refactor_backlog.md` (graph population as unblocker).

**Scope:** Planning only—**no SQL or migrations** in this document.

---

## Purpose

- **Unify identities** across voter file, signups, volunteers, and outreach so **one person** drives field, comms, compliance, and Volunteer Command.  
- **Reduce duplicate** CRM rows and **dangerous** merges through **deterministic rules**, **scoring**, and **human review** where needed.  
- **Persist** durable identifiers and provenance in **`person_identifiers`** (and related) so downstream modules **do not** re-invent matching.

---

## Why it matters

- **Volunteer Command** cannot trust “movement” features if the same human exists as **three** `people` rows.  
- **Compliance** depends on **one** effective consent view per person per channel.  
- **Field** and **analytics** lose validity if contacts are not stably linked to **`people`**.  
- **Audit** and **legal** posture require **explainable** match decisions—not opaque model output.

---

## Minimal-question match flow (conceptual)

**Goal:** Ask humans **only** when automation cannot safely decide—**minimize** friction for volunteers and signups.

**Typical stages**

1. **Ingest** raw row or signup payload with **normalized** fields (names, address, DOB, voter ID where present).  
2. **Deterministic keys** — exact matches on **state voter ID**, **unique external IDs**, or **prior confirmed** `person_identifiers`.  
3. **Probabilistic scoring** — when no exact key: weighted features (name, address, ZIP, demographic fields).  
4. **Threshold routing**  
   - High confidence → **auto-link** (policy-defined).  
   - Medium → **needs_disambiguation** queue (human review UI).  
   - Low → **not_found** (new `people` creation or **hold** until more data).  
5. **Out-of-state** handling — file IDs from other jurisdictions may **not** merge with local keys without explicit rules → **out_of_state** or separate branch.  
6. **Persist** accepted links to **`person_identifiers`** with **source**, **confidence**, **method**, **timestamp**, **actor** (system vs human).

**Volunteer-specific path**  
Signups often arrive with **email/phone** first—linkage should use **`person_contact_methods`** and **consent** to narrow candidates **before** asking for voter details, **minimizing** questions.

---

## Deterministic scoring (conceptual)

**Principle:** **Deterministic rules first**—probabilistic models only where **policy** allows and **audit** is preserved.

**Feature families (examples)**

- **Exact identifiers** — state voter ID, SBID, prior `person_identifiers`.  
- **Address normalization** — street, unit, city, ZIP, county FIPS alignment with `geo_*`.  
- **Name normalization** — tokenization, generational suffixes, hyphenation.  
- **Temporal** — DOB match, registration date windows.

**Outputs**

- A **score** or **tier** plus **reason codes** (why this candidate was chosen).  
- **No silent merge** without a **merge log** entry (`person_merge_log`).

---

## Persistence into `person_identifiers`

**Expectation**

- Each durable external key (voter ID, file registration number, external signup ID) exists as a **`person_identifiers`** row pointing to **`people.id`**.  
- **Confidence** and **match method** (deterministic vs reviewed vs manual override) are **first-class**—not afterthought comments.  
- **Revocation** or **correction** appends new facts or **supersedes** with audit—never silent deletes in production outside migrations.

---

## Auditability

**Minimum audit trail**

- **Match candidate** record (for `person_match_candidates` or equivalent process) with **inputs hash** or normalized snapshot.  
- **Decision** — who/what accepted or rejected the link.  
- **Merge** — `person_merge_log` with **survivor** and **merged** IDs.  
- **Human reviewer** identity when **needs_disambiguation** resolves.

**Retention**

- Align with **compliance_access_log** expectations—access to sensitive linkage UIs **logged**.

---

## Outcome states

| State | Meaning | Typical next step |
|-------|---------|-------------------|
| **matched** | Stable link to exactly one `people` row with acceptable confidence. | Downstream modules use `people` id. |
| **needs_disambiguation** | Multiple plausible `people` or ambiguous file row. | Human review queue; **no** auto-merge. |
| **not_found** | No acceptable candidate; may create **new** `people` or **hold** until more signals. | Intake flows or volunteer follow-up. |
| **out_of_state** | Identifiers indicate jurisdiction outside current campaign scope or incompatible rules. | Separate linkage policy; do not force wrong merge. |

**Note:** Exact enum or table design is **implementation**—states are **planning contracts** for UI and pipelines.

---

## Privacy guardrails

- **Minimize** display of full voter file fields in volunteer-facing UIs—**role-based** access.  
- **Purpose limitation** — linkage uses data for **organizing and compliance**; **not** for unrelated profiling.  
- **Do not** expose match **scores** to volunteers in ways that feel like surveillance.  
- **Retention** — raw candidate lists and **review** artifacts **governed**; **no secrets** in repo (`AGENTS.md`).  
- **Youth and sensitive cohorts** — additional restrictions on visibility and linkage prompts.

---

## Relationship to Volunteer Command

- Volunteer **referrals** and **Power of 5** edges require **both** endpoints on `people` when possible—linkage **must** resolve invitees from partial signups.  
- **Onboarding** should not assume voter file match—**pre-match** volunteers remain valid with **pending** linkage state.

---

## Related documents

- `domain_map.md` — VR/VH → person graph intent  
- `schema_inventory.md` — `person_match_candidates`, `people_match_review_v`  
- `volunteer-command-data-model.md` — referrals and profile  
- `refactor_backlog.md` — graph population unblocker  
- `campos-data-architecture.md` — layer stack  
