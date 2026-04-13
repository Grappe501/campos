# Volunteer Command — control layer

The **control layer** defines **who can change what**, **what must always be human-approved**, and **what can be safely automated** across communication, tasks, leadership, growth, social, moderation, accountability, training, and pacing. It implements **guided autonomy** at scale: volunteers and captains have **real scope**; staff holds **override** and **policy**; automation **never** silently crosses high-risk lines.

Aligned with `docs/architecture/core-principles.md`. No code or SQL—structured for **admin UI**, **permission matrices**, and **audit** design later.

---

## Guided autonomy (summary)

- **Default:** Volunteers act inside **lane** and **role** with **transparent** rules.  
- **Automation:** Suggests, schedules, reminds—**does not** send bulk sensitive messages or alter money/legal posture.  
- **Escalation:** Humans for harassment, safety, compliance ambiguity, and **exceptions** to policy.

---

## Admin approval toggles (conceptual)

Staff-facing controls (Command Center) should exist for:

- **Phase / pacing profile** activation and overrides (`pacing-engine.md`).  
- **Automation presets** for nudges, at-risk thresholds, growth prompt intensity.  
- **Steve** behavior packs (tone, frequency caps) within **policy**.  
- **Training** unlock assignments to risk classes.  
- **Broadcast** authorization—who may originate campaign-wide messages.  
- **Moderation** severity defaults and **mute/ban** authority levels.

**Principle:** Toggles are **audited**; **who changed what when** matters for accountability and disputes.

---

## Automation presets

**Preset** = named bundle of automation rules (nudge cadence, at-risk windows, growth prompt schedules) attachable to **phase** or **tenant**.

- **Safe** presets reduce manual work; **high-risk** dimensions (bulk comms, leadership promotions) remain **gated** per tables below.

---

## Categories of control

### Communication

| Action | Typical default |
|--------|-----------------|
| Volunteer peer message (DM) | Allowed within policy; **report** path always on |
| Group message | Allowed; **moderator** tools |
| Segment broadcast (email/SMS/push) | **Human approval** for bulk; consent enforced |
| Steve-generated outbound to volunteer | **Template-bound**; no unsupervised bulk external send |
| Official campaign feed post | **Authorized roles** only |

**Always require human approval**

- First-contact **voter-facing** content in new jurisdictions where legal review applies.  
- Any message class flagged **compliance** by rule pack.  
- **Crisis** comms overriding narrative (staff).

---

### Tasks

| Action | Typical default |
|--------|-----------------|
| Self-assign task within lane | Allowed |
| Captain assigns to team | Allowed within scope |
| Auto-assign from pool | Allowed if rules transparent; **opt-out** path |
| Irreversible or high-impact task | **Human confirm** (e.g., bulk data export) |

**Always require human approval**

- Tasks touching **financial** or **legal** commitments.  
- Tasks that **expose PII** outside role scope.

---

### Leadership

| Action | Typical default |
|--------|-----------------|
| Suggest emerging leader | System/captain **signal** |
| Promote to captain / expand permissions | **Staff or delegated role** + **training complete** |
| Demote / step-down | **Human-initiated** with dignified UX; audit |

**Always require human approval**

- **Elevated data** or **jurisdiction-sensitive** leadership.  
- **Press-facing** or **official spokesperson** designation.

---

### Growth

| Action | Typical default |
|--------|-----------------|
| Show growth prompts (Steve) | Automated within **positive** framing presets |
| Display team celebration feeds | Automated with **moderation** |
| Show comparative leaderboards | **Discouraged**; if any, **positive-only** and opt-in |

**Always require human approval**

- Campaign-wide **recruiting contests** with material incentives (policy/legal).  
- Any **public** naming of low performers (should be **disallowed** by product policy, not toggled on).

---

### Network / social

| Action | Typical default |
|--------|-----------------|
| Create standard group (event team, precinct) | Often **self-serve** with templates |
| Create organic community group | **Staff approval** or **captain** per policy |
| Discover people | **Guided** browse; restricted for minors/safety |

**Always require human approval**

- **Hidden/sensitive** affinity groups where partner agreements apply.  
- Changes to **visibility** that expose vulnerable populations.

---

### Moderation

| Action | Typical default |
|--------|-----------------|
| Remove post / mute in group | **Moderator** in scope |
| Escalate to staff | **Anyone** can report; **staff** for legal/safety |
| Platform ban | **Staff** with audit |

**Always require human approval**

- **Legal** holds on content (defamation risk, subpoena context)—process defined by campaign counsel workflow, not product alone.

---

### Accountability

| Action | Typical default |
|--------|-----------------|
| Send gentle nudge | Automated within pacing presets |
| Move to **at-risk** | **Rules** + **human dashboard** review before harsh actions |
| **Needs follow-up** queue | **Human** owns resolution |

**Always require human approval**

- Any **public** accountability action (should be **none** for negative framing—use private channels).  
- **Exceptions** to restorative paths involving safety.

---

### Training

| Action | Typical default |
|--------|-----------------|
| Assign micro-module with task | Automated **JIT** |
| Grant **unlock** by exception | **Staff** approval + audit |
| Waive training | **Staff** with reason code |

**Always require human approval**

- Waivers for **legal-required** training.  
- **Custom** jurisdiction packs.

---

### Pacing

| Action | Typical default |
|--------|-----------------|
| Shift phase profile | **Staff** |
| Local override (weather, crisis) | **Staff** or **delegated** regional lead |

**Always require human approval**

- **Emergency calm** and **surge** that materially change volunteer obligations—**staff**; **transparent** volunteer messaging.

---

## What can be safely automated (if configured)

- **Reminders** for tasks and events **within** consent and quiet hours.  
- **Steve** suggestions: phrasing help, next-step recommendations, **routing** to humans.  
- **Positive** recognition templates **pending** moderator quick-approve (optional).  
- **At-risk** **flags** for dashboards—**not** auto-punitive actions.  
- **Training** unlocks when **objective** criteria met (module complete + task class).  
- **Phase-based** pacing **presets** once staff selects phase.

---

## Auditability expectations (cross-cutting)

Events that should leave a **durable record** for later review:

- Permission **grants/revokes** for leadership.  
- **Phase** and pacing **overrides**.  
- **Broadcast** approvals and sends.  
- **Training** waivers and unlock exceptions.  
- **Moderation** actions with actor, scope, reason category.  
- **Automation preset** changes.  
- **Steve** interventions that **gate** user actions (e.g., blocked send)—metadata sufficient to reconstruct **why**.

Volunteer-facing **private coaching** should be **minimally logged**—enough for safety and support continuity, **not** a public transcript by default.

---

## Cross-references

- `pacing-engine.md` — phase knobs  
- `adaptive-training-engine.md` — unlocks  
- `accountability-engine.md` — human queues  
- `growth-engine.md` — growth ethics  
- `leadership-system.md` — promotion authority  
- `docs/architecture/core-principles.md` — human approval, AI bounds  
