# Volunteer Command — pacing engine

**Pacing** is how the Hub matches **energy and urgency** to the **campaign calendar** without burning people out. The pacing engine defines **default rhythm**, **phase-based escalation**, **staff-controlled overrides**, and how **tasks, tone, and follow-up timing** shift together.

No code or SQL—structured for **configuration objects**, **dashboard controls**, and **Steve behavior** later.

---

## Steady, intentional default pace

**Baseline:** Day-to-day organizing runs at a **sustainable** rhythm—clear weekly priorities, predictable notification budgets, **one primary CTA** per volunteer touch where possible (`behavior-model.md`).

**Implications**

- Default **nudge frequency** is **low**; escalation requires **signals** (phase, role, or staff toggle).  
- **Paused** and **low-capacity** volunteers see **reduced** intensity automatically (`state-machine.md`).

---

## Campaign phase model (conceptual)

Phases are **campaign-defined** labels with attached **pacing profiles**. Example skeleton (names vary by campaign):

| Phase | Intent | Typical pace shift |
|-------|--------|-------------------|
| **Foundation / early organizing** | Build teams, relationships, infrastructure | Steady; relationship-heavy; fewer hard deadlines |
| **Acceleration** | Expand coverage, events, narrative pushes | Increased asks; more parallel workstreams |
| **Peak / GOTV window** | Maximum mobilization | High urgency; **short** tasks; tight follow-up; **respect sleep** |
| **Closeout / transition** | Thank-you, data hygiene, alumni paths | Softer asks; reflection; **no** endless panic tone |

**Rule:** Phase changes **never** excuse **consent** or **compliance**—they change **cadence and emphasis**, not rules.

---

## Urgency increasing over phases

**Product behavior**

- **Task intensity** — more shifts, shorter windows, more **time-bound** items in peak.  
- **Tone** — still **calm** in copy; urgency via **clarity** (“today only,” “shift starts in 2 hours”), not ALL-CAPS fear.  
- **Follow-up timing** — reminders tighten **within** policy (quiet hours, channel consent); **never** harassment-level frequency.

**Steve**

- Adjusts **density** of suggestions; **still** offers pause and redirect (`accountability-engine.md`).

---

## Dashboard-controlled pace adjustments

**Who:** Campaign managers / designated staff in **Command Center** (not every captain—unless explicitly delegated).

**Controls (conceptual)**

- **Global pacing profile** — select active phase template.  
- **Lane overrides** — e.g., digital-only volunteers on **steady** profile during peak field surge.  
- **Geographic overrides** — e.g., storm day: reduce in-person nudges in affected county.  
- **Emergency calm** — **pause surge** after crisis (safety, legal, grief)—reduces automated intensity campaign-wide.

**Transparency**

- Volunteers see **why** pace changed when it affects them (“campaign is in peak week—here’s what that means for you”)—**without** leaking sensitive staff reasons.

---

## Task intensity by pace

| Pace level | Task design |
|------------|-------------|
| **Low** | Fewer concurrent tasks; longer horizons; emphasis on onboarding and fit |
| **Medium** | Balanced weekly load; mix of relational and operational |
| **High** | More concurrent **small** tasks; clear prioritization; **mandatory** rest signals where possible (e.g., “you’ve done a lot—want to pause?”) |

**Guardrail:** High pace **increases** load only for volunteers **opted in** to that lane—don’t auto-flood **paused** users.

---

## Tone by pace

- **Steady:** Belonging, clarity, patient invitation.  
- **Peak:** Direct, time-bound, still **respectful**—no shame for those who can only contribute a little.

**Steve voice** follows `behavior-model.md`; phase changes **do not** turn Steve into a scold.

---

## Follow-up timing by pace

- **Reminders** scale with phase and **task half-life** (RSVP soon vs weekly habit).  
- **At-risk** thresholds may **tighten** in peak (faster human queue)—**not** faster public shame.  
- **Cooldowns** after burst periods—especially post-election.

---

## Interaction with other engines

- **Growth engine** — relational prompts may **soften** in peak if noise risk rises; or **focus** on bring-a-friend for specific events (`growth-engine.md`).  
- **Training engine** — micro-refreshers surge before peak (`adaptive-training-engine.md`).  
- **Control layer** — who may change phase and overrides (`control-layer.md`).

---

## Cross-references

- `state-machine.md` — paused / at-risk interaction with pacing  
- `culture-and-moderation.md` — tone under stress  
- `accountability-engine.md` — nudges stay supportive  
