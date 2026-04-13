# Volunteer Command — growth engine

The **growth engine** is how Volunteer Command scales **people power** without turning organizing into coercion. It encodes **Power of 5** culture, **recognition mechanics**, and **referral logic** so growth is **expected culturally** but **not demanded individually**, and so metrics reinforce **relationships**, not shame.

This document is structured so product can map **entities**, **surfaces**, and **policy knobs** later—no implementation or SQL here.

---

## Power of 5 — cultural and growth core

**Definition (doctrine):** Each volunteer is invited to bring a **small circle of trusted people** into the work—**five** as a practical anchor, not a rigid quota. Growth happens through **personal asks and follow-through**, not impersonal blasts.

**Product implications**

- **Culture-first:** UI copy, feeds, and Steve prompts frame **invitation** and **care for new entrants**—not downlines or exploitation.  
- **Tracking:** The system may support **invite intents**, **introductions completed**, and **onboarding quality** of invited people—**not** public rankings of “who recruited most” as a default shaming surface.  
- **Ethical floor:** No pyramid incentives, no financialized recruiting, no hidden pressure campaigns.

---

## Growth expected but not demanded

**Principle:** The movement **expects** that volunteers will bring others over time; no single person is **required** to hit a number to remain valued.

**Behaviors**

- **Opt-in prompts** for relational growth (Steve, captains) with **skip** and **not now** paths that do not penalize lifecycle state.  
- **Steady-lane volunteers** remain first-class; growth prompts defer or soften automatically when **pacing** or **capacity** signals say so (`pacing-engine.md`).  
- Leadership paths **do not** universally require recruitment—some roles scale through **care** and **reliability** instead.

---

## Public celebration only (growth context)

- **Wins** in feeds: stories of teams and individuals who **invited well**, welcomed newcomers, or sustained circles—**with consent** for names and photos.  
- **No public callouts** for low invite counts or “lagging” recruiters—ever.  
- **Private encouragement** for someone who wants to grow but feels stuck—coaching, not exposure (`accountability-engine.md`, `culture-and-moderation.md`).

---

## Private encouragement

- Captains and Steve use **DM / private task notes** patterns to suggest next relational steps.  
- **Feedback** on how someone invited (too aggressive, unclear consent) is **private** and actionable.

---

## Positive-only leaderboards

**Rule:** Any **ranked** surface must be **positive framing**—e.g., “teams celebrating new welcomes this week” with **opt-in** participation—or **non-comparative** stats (your own streak, your own circle health), not “bottom 10 volunteers.”

**Forbidden defaults**

- Public leaderboards by raw headcount or downline size.  
- Shaming copy tied to rank.

**Allowed patterns**

- **Geographic** celebration: county or precinct highlights **without** naming lowest performers.  
- **Team** recognition where teams opt in to friendly internal comparisons—still moderated for toxicity.

---

## Individual, geographic, and team growth recognition

| Layer | What gets recognized | Surfaces |
|-------|----------------------|----------|
| **Individual** | Personal invites, follow-through, mentoring quality | Private + optional public opt-in |
| **Geographic** | Local momentum, coverage of neighborhoods, local hosts | Local feed, Command coverage maps (staff) |
| **Team** | Crews that onboard well together, event teams that fill roles | Group feed, campaign feed highlights |

**Balance:** Recognition emphasizes **retention and welcome quality**, not invites alone—see **referral tree** below.

---

## Referral / network-tree logic (conceptual)

**Purpose:** Give organizers **line of sight** from **inviter → invitee** for attribution, coaching, and **welcome quality**—without building a social network solely for surveillance.

**Conceptual objects (for later schema mapping)**

- **Invitation** — who invited whom, which channel, which campaign moment.  
- **Support edge** — optional “buddy” or “captain supports this subtree” for handoffs.  
- **Onboarding outcome** — did the invitee reach **active**, **first task**, **training**—used for **healthy growth**, not punishment of inviter if invitee ghosts (life happens).

**Visibility rules**

- **Volunteers** see their own tree scope and team-relevant slices.  
- **Captains** see broader subtree per policy.  
- **Staff** see coverage analytics; **PII-minimized** views where possible.  
- **No** public “family tree” exposing vulnerable relationships without consent.

**Steve**

- May suggest **follow-through** with invited contacts; may **never** shame for “failed” invites in public.

---

## Dashboard hooks (growth)

- **Command Center:** coverage by geography, invite funnel health, **quality** metrics (time-to-first-task for invitees), **not** only volume.  
- **Captain view:** subtree summary, people needing welcome, **no** punitive rankings.

---

## Cross-references

- `system-philosophy.md` — Power of 5 doctrine  
- `pacing-engine.md` — when growth prompts intensify  
- `control-layer.md` — who can toggle growth automation and visibility  
- `culture-and-moderation.md` — public vs private norms  
