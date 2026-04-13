# CAMPOS system identity

CAMPOS is one platform with **two primary experiences**, reflecting two legitimate modes of campaign life: leadership running the operation, and volunteers building the movement. Neither mode is an afterthought; they share data and standards but differ in tone, density, and primary tasks.

## 1. Command Center

**Audience:** Campaign manager, department heads, leads, and staff who own outcomes, budgets, legal exposure, and narrative.

**Feel:** War-room / mission control—clarity under pressure, situational awareness, and fast decisions grounded in shared truth. Dense information is acceptable when it is *actionable*: bottlenecks, coverage gaps, risk flags, and progress against plan.

**Primary jobs:**

- See the state of the campaign across departments without exporting to a second system.
- Allocate people, turf, events, and messaging capacity with consistent priorities.
- Enforce policy where required: approvals, restricted actions, audit-relevant trails.
- Coordinate across teams so field, comms, events, and fundraising do not contradict each other.

Command Center should feel serious and calm: fewer surprises, fewer mysteries about “what is true right now.” It is not the place for performative gamification at the expense of legibility.

## 2. Movement Hub

**Audience:** Volunteers and grassroots leaders who opt in repeatedly—relational organizers, event hosts, team captains, and supporters deepening commitment over time.

**Feel:** Community hub and social movement—belonging, momentum, and visible progress together. The Hub should reward consistency and relationships, not only raw task volume. It should feel human: recognition, story, and team context matter as much as checkboxes.

**Primary jobs:**

- **Campaign feeds:** Timely, relevant updates—what matters this week, what changed, what success looks like—without burying people in noise.
- **Group feeds:** Team- and locality-scoped conversation and coordination so decentralized leadership has a home.
- **Interactive collaboration:** Shared tasks, asks, handoffs, and lightweight coordination loops that do not depend on a separate chat product for basic alignment.

**Voice:** The internal AI campaign manager persona **Steve** speaks to volunteers from this side of the house: encouraging, clear, never condescending, aligned with campaign values and compliance boundaries. Steve is a guide inside policy—not a substitute for human organizers or legal judgment.

## Shared foundation

Both experiences sit on the same system of record (Supabase as the authoritative store in the current stack), the same identity and permission model, and the same event and task semantics. Divergence is **presentation and workflow emphasis**, not competing databases or incompatible definitions of “volunteer” or “contact.”

## Design implication

Features should declare which experience they primarily serve, and whether they require bridging (e.g., a staff approval surfaced to a volunteer only after decision). Building “one generic UI” that tries to serve both modes usually serves neither; CAMPOS explicitly plans for dual surfaces with shared contracts underneath.
