# CAMPOS core principles

These are **operating principles** for product behavior, engineering practice, and organizational conduct inside the CAMPOS program. They translate philosophy into decisions: what ships, what waits, and what is never acceptable.

## Governance and automation

1. **Human approval where needed.** High-stakes actions—those affecting money, legal posture, bulk outbound communications, irreversible data operations, or sensitive personal data—require explicit human review and accountability. Automation may prepare drafts and routes; it does not own outcomes.

2. **Guided autonomy.** Volunteers and distributed leaders get clear defaults, boundaries, and suggested next steps—not a blank canvas that assumes expert knowledge on day one. Autonomy expands with role, training, and demonstrated judgment.

3. **No destructive freeform production actions.** The system does not offer “run anything” interfaces against production data or external channels. Capabilities are typed, scoped, rate-limited, and auditable. Power users get power through explicit permissions, not through bypassing safety.

4. **AI operates within policy.** Models and agents (including internal-facing assistants) respect tenant rules, consent state, role boundaries, and compliance constraints. They refuse or escalate rather than improvise around policy. **Steve**, the volunteer-facing voice, stays inside the same guardrails.

## Architecture and delivery

5. **Architecture before feature sprawl.** New capabilities must map to module boundaries, data ownership, and permission models *before* they multiply special cases. If a feature does not have a home in the architecture, it is deferred or redesigned—not stuffed into the nearest screen.

6. **Migrations over dashboard drift.** Schema and access rules change through versioned migrations and reviewed definitions—not through manual edits in production consoles that the codebase does not know about. Truth in git; behavior matches the migration history.

7. **Modular build sequence.** Ship vertical slices that prove end-to-end value (e.g., Volunteer Command) before broad horizontal expansion. Each module should leave the platform more coherent, not more fragmented.

## Culture of the movement (product and operations)

8. **Positive public celebration, private correction.** Recognition and momentum happen in shared spaces; coaching and accountability happen in appropriate private channels. The product should not shame volunteers publicly or gamify humiliation.

9. **Growth through relationships.** Metrics matter, but the north star is durable relational capacity: trust, repeat participation, and quality of contact—not only volume. Features that optimize vanity numbers at the expense of trust are misaligned.

## Volunteer experience outcomes

10. **Volunteers should leave onboarding with:**

    - **Clarity** — what the campaign is asking for, what “good” looks like this week, and where to get help.
    - **Fit** — roles and teams that match skills, constraints, and boundaries.
    - **Ownership** — a named scope they can carry without constant staff babysitting.
    - **Path** — a believable next step from first shift to deeper leadership if they want it.
    - **Expansion opportunity** — a clear, ethical way to bring others in without turning organizing into a pyramid scheme; growth means more community capacity, not exploitation.

## Enforcement

Principles are not slogans. Pull requests, designs, and campaign playbooks should be checked against this list. When principles conflict with a deadline, the team resolves the tension explicitly—temporary scope cuts, phased delivery, or policy clarification—not silent exceptions that become permanent debt.
