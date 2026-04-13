# Volunteer Command — network layer

The volunteer-facing product is **not** a sterile task dashboard. It is a **Movement Hub**: a place where people see each other’s contributions, form teams, coordinate locally, and feel part of something larger—**without** becoming an unmanaged social network. This document defines the **network architecture**: how volunteers connect, how messages move, and how discovery stays **guided and calm** (see `culture-and-moderation.md`).

---

## Design intent

- **Belonging and energy** — volunteers should feel peers beside them, not only staff above them.  
- **Guided non-chaos** — openness is real; so are **boundaries**, **tone norms**, and **escalation** when things go wrong.  
- **Same person, same truth** — network relationships sit on the **shared CRM identity**; no shadow “social graph” that contradicts consent or field data.  
- **Alignment with doctrine** — private correction, public celebration; growth through relationships; Steve as supportive voice, not surveillance.

---

## Visible network

**Definition:** The parts of the volunteer ecosystem a given user can **see**—profiles, teams, geography, and activity signals—subject to **role, consent, and campaign policy**.

**Principles**

- **Default to clarity** — people understand what others can see about them; settings where sensitivity matters (e.g., visibility of neighborhood, display name).  
- **Staff visibility ≠ volunteer visibility** — leadership may see coverage maps and gaps; volunteers see **peer-appropriate** views.  
- **No stalker maps** — discoverability supports **organizing**, not surveillance of individuals.

**What “visible” typically includes (conceptually)**

- Team and group memberships appropriate to the viewer.  
- Shared wins and recognition surfaces (with consent).  
- Public-facing event and action listings tied to real campaign objects—not anonymous gossip.

---

## Volunteer-to-volunteer connectivity

**Purpose:** Movements scale through **peer ties**—captains, buddies, relational partners—not only top-down lists.

**Forms of connectivity**

- **Affiliation** — same group, lane, or geography (implicit connection).  
- **Named relationships** — mentor/buddy, Power of 5 circle, co-captain (explicit, often lightweight).  
- **Handoffs** — “I’m introducing you to Alex for turf X” with a structured handoff so nothing falls through cracks.

**Guardrails**

- Relational edges that imply **sensitive** access (e.g., voter-adjacent work) follow **training and role** rules—see `group-architecture.md` and compliance doctrine.  
- Connectivity is **opt-in to visibility** where the campaign could expose someone unintentionally (e.g., quiet volunteers).

---

## Direct messaging

**Role:** Private, 1:1 or small coordination—**not** a replacement for staff escalation paths or safety reporting.

**Expectations**

- Used for **logistics**, **encouragement**, **private correction**, and **coaching**—aligned with culture doctrine.  
- **Harassment and safety**—clear **report** path; DM is not a place without rules.  
- Steve may **suggest** phrasing in context (see `culture-and-moderation.md`) but does not read DMs inappropriately beyond what product policy allows—**transparency** matters.

**Anti-chaos**

- Rate limits and abuse signals at the **product** level; humans for serious cases.  
- No “invisible” campaign-wide DM blasts from random accounts—**broadcast** uses separate semantics.

---

## Group messaging

**Role:** Coordination inside **groups** (teams, local circles, event crews)—the social heart of decentralized organizing.

**Expectations**

- Tied to a **group object** with known membership and moderators.  
- **Tone guidance** visible (pinned norms, Steve prompts on conflict).  
- Distinct from **campaign feed** (official rhythm) vs **group chatter** (local energy)—see `feed-architecture.md`.

---

## Broadcast messaging

**Role:** One-to-many messaging from **authorized senders**—campaign leadership, comms-approved accounts, captains within scope—so volunteers get **official** asks without checking five apps.

**Expectations**

- **Channel and consent** rules apply—same suppression story as email/SMS in the broader platform.  
- **Human approval** for sensitive or bulk outreach per core principles; Steve drafts, humans release where required.  
- Volunteers experience broadcast as **clarity**, not spam: predictable cadence, clear CTA.

---

## Discoverability: people, groups, and local action

**Purpose:** Help volunteers answer: **Who is with me? Where is the work? What can I join?**

**Mechanisms (conceptual)**

- **People** — find by team, geography, lane, event attendance, or **invitation**—not indiscriminate directory scraping.  
- **Groups** — browse or be invited; some groups **listed**, some **invite-only** (see `group-architecture.md`).  
- **Local action** — events, shifts, meetups, local priorities surfaced by **geography** and **relevance**, with accessibility notes.

**Guided discoverability**

- **Recommendations** may prioritize **fit** (lane, distance, availability) over raw popularity.  
- **Steve** can suggest “near you” or “your team” without creating a competitive leaderboard of people.  
- **Safety** — minors, vulnerable locations, or sensitive communities may use **restricted discoverability** by policy.

---

## Relationship to feeds and groups

- **Network layer** = who can connect to whom and how.  
- **Feed architecture** = what surfaces in which streams.  
- **Group architecture** = containers for membership, geography, and purpose.

Cross-reference: `feed-architecture.md`, `group-architecture.md`, `culture-and-moderation.md`.

---

## Suggested phasing: V1 vs later

**V1 (prove the Hub)**

- Campaign feed (official + mixed content types per `feed-architecture.md`).  
- Group feeds for **assigned or created** teams with clear membership (geography/functional/event).  
- Volunteer-to-volunteer context via **groups and @mentions** inside feeds; **basic** direct messaging optional if policy-ready—otherwise structured “message captain” flows first.  
- Discoverability: **invitation-first** + browse **sanctioned** groups and local events; limited people search by **team/geography**.

**Later**

- Richer DM (threads, media policies), **organic community** groups with lighter friction, advanced **network graph** insights for captains (privacy-preserving), broadcast from more role types with stricter audit, **personal/network** algorithmic feeds beyond chronological.

This phasing is planning guidance—not a fixed contract—until ADRs lock scope.
