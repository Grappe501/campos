# Volunteer Command — user journeys

This document describes **how different kinds of volunteers move through the system** from first contact through multiplication. It is written for product, design, and operations: journeys imply **surfaces** (Hub, feeds, tasks, messages), **actors** (volunteer, captain, staff, Steve), and **success criteria** per step.

**Shared primitives** across journeys: CRM identity, consent, teams/lanes, tasks, onboarding state, lifecycle state (see `lifecycle-model.md`, `state-machine.md`), Steve behavior rules (`behavior-model.md`).

---

## 1. Brand-new volunteer

**Profile:** First touch with the campaign’s organizing system. May have signed up at an event, on the web, or via a friend. High curiosity, low context; risk of drop-off if overwhelmed.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Lands on intake (form, event check-in, or invite link). Captures identity, minimal consent, and **how they heard about us**. | Record is deduped or clearly new; consent scope matches intended outreach. |
| Welcome | Short confirmation; Steve orients tone: **welcome as essential**, not as “ticket received.” | Volunteer feels invited, not processed. |
| Understand | Lightweight questions: availability, comfort (in-person vs remote), skills, boundaries. **No interrogation.** | System has enough to suggest 2–3 lanes, not a perfect résumé. |
| First win | Assigned a **small, credible task** this week—RSVP, intro call, watch a 5-minute brief, join a team feed. | Task completed or explicitly rescheduled without shame. |
| Assign | Placed in a **lane + team** with visible role description and captain/staff contact. | Volunteer knows where to show up (digital or physical). |
| Support | Feed introduces weekly priorities; Steve offers **one** next-step nudge if stalled; human reachable. | Questions answered; no ghosting. |
| Train | Completes required micro-training for their lane if policy demands it (e.g., voter contact rules). | Gating satisfied before sensitive actions unlock. |
| Encourage | Public recognition appropriate to effort (team feed, not necessarily global). | Motivation without comparison toxicity. |
| Expand | Invited to Power of 5-style relational invites **when ready**, not day one. | First relational ask attempted or declined without penalty. |
| Elevate | Optional path to deeper role (e.g., shift lead) **if** they want it; steady lane remains valid. | Clear fork: “more” vs “steady.” |
| Multiply | Supports onboarding others or hosting a small circle; captain/staff acknowledges. | New people enter intake with attribution. |

**Failure modes to design against:** Long forms, duplicate profiles, no task in week one, generic onboarding that ignores digital-only or anxiety constraints.

---

## 2. Uncertain first-time helper

**Profile:** Signed up but ambivalent—busy, nervous, or unsure if they “belong.” May ghost unless the system stays gentle and low-pressure.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Same intake; flag **low-confidence** signals if offered (optional self-report or short path choice). | Tone is invitational, not demanding. |
| Welcome | Steve emphasizes **fit over speed**; offers “look around” options (read feed, attend listen-only briefing). | Volunteer chooses a low-commitment first step. |
| Understand | Short module: “here’s how we work this week”; avoids dense policy walls up front. | They can articulate one priority in plain language. |
| First win | **Tiny** commitment—confirm availability, react to one post, save a date. | Completion or honest “not this week” without dropping to inactive silently. |
| Assign | **Guided assignment**: staff/captain suggests lane; volunteer confirms or requests alternative (redirect, not discard). | Placement matches stated boundaries. |
| Support | **Needs follow-up** state triggers if no engagement; private nudge from captain or Steve; offer easier task. | Re-engagement before at-risk. |
| Train | Deferred until they opt into a lane that requires it. | Training appears **just-in-time**. |
| Encourage | Private praise first; public only if they opt in. | Trust builds. |
| Expand / Elevate | Slower track; leadership path not pushed. | They stay on radar without being nagged into leadership. |
| Multiply | Optional; may only ever contribute quietly—**valid end state.** | Still counted as active movement if consistent in lane. |

**Failure modes:** Punitive reminders; leaderboards; treating low volume as “bad volunteer.”

---

## 3. Connector / natural networker

**Profile:** Brings people constantly; thrives on relationships. Risk: overwork and lack of structure; also risk of informal lists outside CRM if the system is clunky.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Referral-heavy intake; capture **who invited them** for attribution. | Relational edge recorded where policy allows. |
| Welcome | Acknowledgment that **their network is the work**. | Feels seen beyond task counts. |
| Understand | Fast path to **relational lane** and Power of 5 framing. | Clear ethical boundaries (consent, no pressure tactics). |
| First win | Log a first relational invite or host a small intro—**structured** so data lands in CRM. | Invites tracked without exploitative scoring. |
| Assign | **Dual-track**: relational responsibilities + optional light operational tasks. | Two tracks visible; neither hidden. |
| Support | Captain or staff checks **sustainability** (burnout); Steve suggests pacing. | Connector not punished for saying no. |
| Train | Emphasis on compliance for contact and messaging. | They know what not to do as well as what to do. |
| Encourage | Recognition emphasizes **community building**, not only raw headcount. | Healthy norms reinforced. |
| Expand | System prompts **follow-through** with new contacts (welcome, onboarding handoff). | New entrants get real onboarding, not a dump of names. |
| Elevate | Path to **captain / ambassador** role with permissions and training gates. | Leadership is opt-in with scope. |
| Multiply | Formal role in bringing circles; metrics support **quality of onboarding** for invites. | Multiplication shows up as retained volunteers, not only leads. |

**Failure modes:** Reducing people to numbers; ignoring CRM hygiene; skipping consent on peer outreach.

---

## 4. Digital-only volunteer

**Profile:** Remote, accessibility constraints, or preference for async work. Must not be treated as second-class.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Intake captures **digital-first** preference and timezone. | No default assumption of door knocking. |
| Welcome | Hub experience is **fully usable** without in-person steps. | Parity of belonging signals. |
| Understand | Lanes offered: text banking, digital relational, content, research help, remote phone shifts, etc. | Clear “what good looks like” for remote work. |
| First win | Digital task with explicit deadline and link; async check-in. | Task done or rescheduled in-channel. |
| Assign | Teams/feeds structured for async; **office hours** or captain DM expectations set. | No silent expectation of showing up physically. |
| Support | Steve uses **short, skimmable** prompts; long briefings avoided. | Engagement without notification spam. |
| Train | Online modules; gating same as in-person where rules match. | Compliance satisfied remotely. |
| Encourage | Team feed shout-outs; optional video/live moments **not required**. | Inclusion without mandating camera-on culture. |
| Expand | Power of 5 via DMs, small video coffees, or group chats per campaign norms. | Relational growth still tracked ethically. |
| Elevate | Remote team lead / moderator paths. | Leadership titles match actual mode of work. |
| Multiply | Hosts digital house parties or trainings; recruits through personal networks online. | New volunteers enter same intake loop. |

**Failure modes:** All milestones assume turf; events require physical RSVP without hybrid; notifications only during local business hours for global volunteers.

---

## 5. In-person organizer

**Profile:** Wants turf, events, tabling, neighborhood work. Needs geography, safety, and coordination—not only tasks in an app.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Captures **geography**, transportation, accessibility, pairing needs. | Safe assignment possible. |
| Welcome | Orientation to **local team** and point of contact. | Knows where and when to meet. |
| Understand | Brief on local goals, turf etiquette, and reporting. | Clear reporting loop for outcomes. |
| First win | Scheduled shift or small on-site task with backup plan for weather/no-show. | Show rate tracked; excused absence path exists. |
| Assign | Turf/event/shift objects tied to team; **field module** hooks when live. | Single place for time, place, materials. |
| Support | Captain accountability for huddles; Steve only nudges **between** shifts, not during. | On-the-ground humans stay primary during action. |
| Train | Required field training (safety, legal, de-escalation) before sensitive work. | Gates enforced. |
| Encourage | Public recognition for teams; private debrief for improvements. | Doctrine: celebrate publicly, correct privately. |
| Expand | Recruit neighbors; host local meetups; Power of 5 in real life. | Local intake attributed correctly. |
| Elevate | Captain / turf lead path with **progressive** permissions. | Scope matches demonstrated reliability. |
| Multiply | Trains others on turf; expands coverage map. | New volunteers onboarded to same standards. |

**Failure modes:** App-only coordination with no human huddle; safety issues with lone assignments; mixed signals from comms vs field script.

---

## 6. Leadership-oriented volunteer

**Profile:** Wants scope quickly; may have prior campaign experience. Risk: under-supervision or over-permission before trust is earned.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| First contact | Intake may capture **prior experience** (optional). | Not used to skip compliance training. |
| Welcome | Clear that leadership is **opt-in with accountability**. | Expectations stated up front. |
| Understand | Conversation or form path toward **captain / lead** interest. | Staff/captain review before broad permissions. |
| First win | Delivers on a committed small scope—e.g., run a single shift well—with debrief. | Reliability signal before promotion. |
| Assign | **Progressive leadership escalation**: expanded tasks after checkpoints, not instant admin keys. | Permissions ladder matches doctrine. |
| Support | Regular 1:1 or team lead touchpoints (human-led); Steve supports prep, not supervision. | Leaders feel backed, not abandoned. |
| Train | Leadership modules: harassment response, data hygiene, delegation without burnout. | Training gates for elevated roles. |
| Encourage | Recognition that highlights **care for volunteers**, not only output. | Healthy leadership norms. |
| Expand | Responsible for onboarding slice of new volunteers; Power of 5 with mentorship quality. | Their recruits get real support. |
| Elevate | Formal role: team captain, regional lead—**staff confirmation** for sensitive boundaries. | Role recorded; audit trail clean. |
| Multiply | Builds bench; succession plan when they step back. | **Paused** or **alumni** path dignified when life changes. |

**Failure modes:** Instant admin access; leadership burnout; leaders competing on metrics.

---

## 7. Volunteer who goes inactive and gets re-engaged

**Profile:** Was active; life happened. System should **preserve dignity** and make return easy.

| Stage | What happens | Success signal |
|-------|----------------|----------------|
| Detection | Engagement drops below threshold → **at-risk** or **paused** (see `state-machine.md`). | No automatic shaming emails. |
| First response | Private, low-stakes check-in: “still with us?” from captain or Steve template **approved** by campaign tone. | Volunteer can reply “busy,” “pause,” or “tell me more.” |
| Needs follow-up | Human triage if they expressed friction, conflict, or bad experience. | Issues routed to staff, not argued by AI. |
| Path A — Pause | Explicit **paused** state: fewer pings; keeps light subscription to major updates if they want. | Consent respected. |
| Path B — Re-engage | Offer **fresh lane** or smaller ask; acknowledge past contribution. | New first win scheduled. |
| Re-onboard | Short “what’s changed” brief; no full repetition unless rules changed. | Faster time-to-task than brand-new. |
| Assign | **Fluid reassignment**: new team or digital lane if old one no longer fits. | Redirect, not discard. |
| Support | Rejoin team feed; buddy optional. | Belonging restored. |
| Train | Refreshers only where compliance requires (e.g., new election law window). | No redundant walls. |
| Encourage | Welcome-back recognition appropriate to privacy preferences. | Public only if they want. |
| Elevate / Multiply | May re-enter leadership path later; **alumni** if they only donate/follow. | Long-term relationship honored. |

**Failure modes:** “We miss you” spam; deleting their history; treating return as failure.

---

## Cross-journey dependencies

- **Consent and channel rules** must follow the volunteer across journeys—especially connectors and digital-only paths.  
- **Captain/staff capacity** is a real constraint; journeys should fail gracefully to **queued human follow-up** rather than infinite Steve loops.  
- **Field and events modules** deepen in-person and hybrid journeys without replacing Hub as the home base.

## Related documents

- `lifecycle-model.md` — phases in order  
- `state-machine.md` — states and triggers  
- `behavior-model.md` — Steve, assignment models, accountability  
