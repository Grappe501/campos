# Phase 1 (implementation wave) — Volunteer Command V1

This document defines the **first implementation-ready scope** for **Volunteer Command**—the vertical slice that **Phase 2** in `build-sequence-map.md` implements. It is **binding for sequencing conversations**; detailed tickets may subdivide further.

**Environment:** Target **staging** first; production when **RLS**, **tenancy**, and **review** gates are satisfied.

---

## Objectives

- Prove **intake → onboarding → assignment → first action → follow-up** on the **canonical person** path.  
- Establish **Movement Hub** **minimum**: a credible **home** and **task** experience (full feeds may follow in **Phase 3**).  
- Wire **doctrine**: clarity, fit, ownership, path; **redirect not discard**; **no public shaming**.  
- Establish **voter linkage trigger point** without requiring full **Voter Linkage Engine** maturity.

---

## In scope

### Intake

- Web (or app) flow creating **volunteer intent** with **consent** scope for intended channels.  
- **Dedup** awareness: if email/phone matches existing `people` / contact methods, **surface** merge or “already with us” path (policy-defined).  
- **Attribution** field: how they heard (feeds **referral** later).

### Onboarding

- **Adaptive-lite** path: digital vs in-person preference, availability, **lane** interest—not a 40-field form.  
- **Steve** (optional V1): **server-side** prompts only; **bounded** copy; **escalation** to human for sensitive topics.  
- Completion marks **onboarding** state transition per `state-machine.md` (implementation detail deferred).

### Role matching

- **Guided assignment** model (`behavior-model.md`): suggest **2–3** lanes or teams; volunteer **confirms** or **requests alternative**.  
- **County** (or campaign-enabled geography) **tagging** for placement.

### Immediate + pathway assignment

- **Immediate:** one **first action** within a short window (task or RSVP-style).  
- **Pathway:** visible **optional** “next steps” for those who want depth—**not** mandatory leadership track.

### First action

- Single **clear** task or event RSVP with **completion** signal feeding **active** state.

### Early follow-up

- **Private** nudge if stalled (captain message pattern and/or **Steve** template **approved** by campaign tone).  
- **No** public callouts for non-completion.

### Basic volunteer dashboard views

- **Home:** priorities, **my tasks**, **my team/geography** (as available).  
- **Profile** segment: lifecycle state, lane, **pause** control (if implemented in V1—recommended minimal).

### County / community contact awareness

- **Light:** show **county** alignment and “your captain / point of contact” **if** assigned—**not** full community-contact CRM in V1.  
- **Community contact** as **named field** or **linked** placeholder per `leadership-system.md`—**display** before **deep** partner workflows.

### Power of 5 hooks

- **Invite** intent capture (who you might bring).  
- **Referral** edge **placeholder** toward `person_relationships` / signup metadata—**full** graph analytics **not** V1.

### Voter linkage trigger point

- At end of intake/onboarding: **optional** collection of **match keys** (address, voter ID if appropriate) **or** explicit **“link later.”**  
- Creates **`person_identifiers`** / **match candidate** **workflow handoff** per `voter-linkage-engine.md`—**processing** may be **manual** or **batch** in V1.

---

## Intentionally excluded from V1

- **Full** campaign / local / personal / group **feed** matrix (`feed-architecture.md`)—**basic** official updates strip optional.  
- **Direct messaging** parity with consumer chat apps—may be **“message captain”** only.  
- **Group creation** for **organic community** partners with full moderation—**template groups** only if any.  
- **Leaderboard** mechanics beyond **positive** team shout-outs.  
- **Full** **leadership** progression (captain permissions **wide**)—**role display** only unless training gate ready.  
- **Full** **accountability** automation—**human queue** first.  
- **Fundraising** flows.  
- **Field** canvass **parity** (MiniVAN-class)—**link** only if already in schema.  
- **Production-scale** linkage **disambiguation UI**—queue can be **staff-facing** spreadsheet + **admin** tool **initially**.  
- **Multi-tenant** **billing** and **commercial** packaging.

---

## Engineering prerequisites (reminder)

- **Migrations** for any new columns/tables; **RLS** on volunteer-facing paths.  
- **Edge Functions** for Steve and **any** privileged write.  
- **Secrets** not in repo (`AGENTS.md`).

---

## Success criteria (V1)

- A **pilot cohort** can run a **week** of volunteer activity **without** duplicate spreadsheets for **identity** and **tasks**.  
- **Staff** can see **who is new**, **who completed first action**, and **who needs follow-up** in a **single** system.

---

## Related documents

- `build-sequence-map.md` — Phase 2 context  
- `dependency-map.md`  
- `docs/product/volunteer-command/*` — journeys, state machine, behavior  
- `docs/db/volunteer-command-data-model.md`  
