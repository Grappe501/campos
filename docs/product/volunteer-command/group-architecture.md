# Volunteer Command — group architecture

Groups are how volunteers **organize in the real world**: geography, turf, events, relational circles, and function. The Hub must make groups **easy to form**, **clear to join**, and **safe to run**—without requiring every circle to pass through headquarters or drown in approval queues.

---

## Why groups matter

- **Distributed leadership** lives in groups—captains, local hosts, functional crews.  
- **Community contacts and geography** attach to groups so field, events, and relational work share the same map of “who is where, doing what.”  
- **Feeds and messaging** need a **container** for permissions, moderation, and discoverability.

---

## Group types

Groups are **typed** so permissions, discovery, and data expectations stay honest. Types can overlap in practice (e.g., an event team inside a county); the product should allow **composition** without forcing duplicate chat rooms for every layer.

| Type | Purpose | Typical scope |
|------|---------|----------------|
| **County** | Regional alignment, local priorities, distributed captains. | County or county-equivalent jurisdiction. |
| **City** | Denser local coordination when county is too large. | Municipality or defined metro slice. |
| **Precinct** | Granular organizing—walk lists, hyper-local hosts, neighborhood energy. | Voting precinct or campaign-defined micro-turf. |
| **Power of 5 cluster** | Relational circle anchored on mutual trust and invites—**small**, repeatable. | ~5 active relationships plus coordinator; not a downline. |
| **Event team** | Staffing and logistics for a specific event or series. | Event-bound; may dissolve or become recurring crew. |
| **Volunteer circle** | Social/coaching group—training cohort, identity cohort, language cohort. | Affinity or learning-based; may be cross-geographic. |
| **Functional team** | Lane-based work—comms helpers, data volunteers, remote phone bank crew. | Skill/lane, may be national or regional. |
| **Organic community group** | Emergent: faith community, union local, campus club—**brought** into the campaign’s structure. | Community-defined; needs cultural competence in moderation. |

---

## Formation: easy by default, controlled where risk demands

**Principle:** **Most groups should be easy to form**—especially precinct crews, event teams, and volunteer circles—so energy is not smothered by process.

**When approval may be required**

- Groups that imply **official** campaign voice (public narrative, press-facing).  
- Groups that unlock **sensitive** data access (voter file adjacent, financial detail).  
- Groups that are **geographically broad** in ways that affect allocation (e.g., new regional hub).  
- **Organic community** groups when campaign policy requires **cultural review** or **partner agreements**.

**When open creation is appropriate**

- Event teams for standard events.  
- Power of 5 clusters with template + norms.  
- Precinct or neighborhood pods within an existing county with clear moderation defaults.

**Policy knob:** campaigns configure **which types** require staff or captain sign-off vs **instant create** with post-hoc review.

---

## Visibility and discoverability (guided)

Not every group should be **globally visible**. Options should exist on a spectrum:

- **Listed** — findable in browse/search for eligible volunteers.  
- **Invite-only** — exists, membership by link or captain add; not advertised broadly.  
- **Hidden** — membership visible only to members; used for sensitive affinity or safety.  

**Guided** discoverability means the product **suggests** relevant groups (by geography, lane, event attendance) rather than dumping every group in one directory.

---

## Community contacts and geographic structure

**Community contacts** (institutional or trusted connectors—pastors, union stewards, club presidents) should be **linkable** to groups and geography:

- A **community contact** may not be a “volunteer” in every sense but is part of the **movement map**.  
- Their group affiliations (e.g., “hosts monthly faith briefing”) help captains **coordinate** without duplicating CRM entries as full volunteer profiles when inappropriate.

**Geographic structure** should **tie into groups** without forcing one rigid hierarchy:

- A volunteer may be in **county** + **precinct** + **event team** + **Power of 5 cluster**—all legitimate.  
- Conflicts (double-booked priorities) are **coordination** problems surfaced in tasks and feeds, not hidden in invisible overlaps.

---

## Moderation and ownership

Every group has:

- **Owners/moderators** — captains, staff sponsors, or elected volunteer leads per policy.  
- **Norms** — pinned expectations; Steve tone guidance where useful (`culture-and-moderation.md`).  
- **Escalation** — path to staff for harassment, disinformation, or policy breaks.

---

## Relationship to CRM and field

- Groups are **not** a second contact database—they **reference** people records and roles.  
- Field and events modules **attach** work items to group context so “who is doing this turf” is answerable in one place.

---

## Suggested phasing: V1 vs later

**V1**

- **County / city / precinct** (as campaign enables), **event team**, **functional team**—with clear creation flows and default moderation templates.  
- **Power of 5 cluster** as a **templated** small group with lightweight setup.

**Later**

- Full **organic community group** workflows with partner tooling; advanced **nested** geography; richer **cross-group** analytics for captains (privacy-preserving).
