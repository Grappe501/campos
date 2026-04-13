# CAMPOS dependency map

Directed **“depends on”** relationships between major **platform and product** constructs. Use this to avoid building **upstream** features on **missing** foundations. (Planning doc—no implementation.)

---

## Legend

- **Hard dependency** — should not ship B without A for real users.  
- **Soft dependency** — can ship a **thin** B with **manual** processes until A matures.

---

## People graph

| Depends on | Relationship |
|------------|----------------|
| **Volunteer data model** | **Hard** — volunteer rows must **resolve** to `people` for unified CRM (`volunteer-command-data-model.md`). |
| **Voter linkage** | **Soft** early — volunteers can exist with **pending** linkage; **hard** for voter-tied field at scale (`voter-linkage-engine.md`). |
| **Feeds/groups** | **Hard** — posts and membership **reference** people and roles; anonymous spam surfaces **blocked** by identity. |
| **Leadership system** | **Hard** — elevated permissions assume **one** person identity. |
| **Accountability signals** | **Hard** — reliability metrics **attach** to `people` / volunteer record. |
| **Dashboard intelligence** | **Hard** — aggregates **mean** consistent person keys. |
| **Training engine** | **Hard** — completions **per person** (and role). |
| **Pacing engine** | **Soft** — can use **global** phase first; **per-person** pacing uses **profile** state. |
| **Admin controls** | **Soft** — manual admin until **audit** tables exist; **hard** for production governance. |

**Upstream of almost everything** — **populate graph** and **RLS** are the critical enablers (`refactor_backlog.md`).

---

## Volunteer data model

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — canonical join (`people`). |
| **Training engine** | **Soft** — tasks-only training first. |
| **Accountability signals** | **Soft** — manual follow-up before automation. |
| **Feeds/groups** | **Hard** — teams need **membership** records tied to volunteers/people. |
| **Leadership system** | **Hard** — roles **volunteer_role_assignments** family. |
| **Dashboard intelligence** | **Soft** until **events** exist from tasks/states. |
| **Voter linkage** | **Soft** — can onboard **without** file match. |
| **Pacing engine** | **Soft** — profile fields + phase. |
| **Admin controls** | **Hard** for promotions and **exceptions**. |

---

## Feeds / groups

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — authors, moderators, members. |
| **Volunteer data model** | **Hard** — team/geography **membership**. |
| **Leadership system** | **Soft** — moderator = **declared** role. |
| **Accountability signals** | **Soft** — public correction **should not** be automated here (`culture-and-moderation.md`). |
| **Dashboard intelligence** | **Soft** — engagement metrics later. |
| **Voter linkage** | **None** required for **internal** movement feeds. |
| **Training engine** | **Soft** — pinned training posts. |
| **Pacing engine** | **Soft** — what gets **pinned** by phase. |
| **Admin controls** | **Hard** — who can post **official** campaign feed. |

---

## Leadership system

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard**. |
| **Volunteer data model** | **Hard** — roles, assignments, training gates. |
| **Training engine** | **Hard** for **elevated** permissions (`adaptive-training-engine.md`). |
| **Accountability signals** | **Soft** — human check-ins before automated **signals** drive demotion. |
| **Feeds/groups** | **Soft** — captain tools improve with groups. |
| **Dashboard intelligence** | **Soft** — bench pipeline views. |
| **Voter linkage** | **None** unless role touches **file** data. |
| **Pacing engine** | **Soft** — leadership load by phase. |
| **Admin controls** | **Hard** — promote/demote **audit**. |

---

## Accountability signals

| Depends on | Relationship |
|------------|----------------|
| **Volunteer data model** | **Hard** — tasks, completions, states. |
| **People graph** | **Hard** — who is being measured. |
| **Feeds/groups** | **None** for core signals (avoid public shame). |
| **Leadership system** | **Soft** — captains consume **queues**. |
| **Dashboard intelligence** | **Hard** — staff visibility into **at-risk** **queues**. |
| **Voter linkage** | **None**. |
| **Training engine** | **Soft** — “training overdue” as signal. |
| **Pacing engine** | **Hard** — thresholds **shift** by phase (`pacing-engine.md`). |
| **Admin controls** | **Soft** — threshold **tuning**. |

---

## Dashboard intelligence

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — deduped counts. |
| **Volunteer data model** | **Hard** — funnel states. |
| **Accountability signals** | **Hard** — at-risk, follow-up. |
| **Feeds/groups** | **None** for **Command** KPIs (ops not social). |
| **Leadership system** | **Soft** — bench depth. |
| **Voter linkage** | **Soft** — coverage analytics **better** with file linkage. |
| **Training engine** | **Soft** — completion rates. |
| **Pacing engine** | **Soft** — phase context on charts. |
| **Admin controls** | **Hard** — who sees **PII-heavy** views. |

---

## Voter linkage

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — **target** of linkage. |
| **Volunteer data model** | **Soft** — signups **feed** candidates. |
| **Feeds/groups** | **None**. |
| **Leadership system** | **None** unless roles access **file**. |
| **Accountability signals** | **None**. |
| **Dashboard intelligence** | **Soft** — match rates, queue depth. |
| **Training engine** | **None**. |
| **Pacing engine** | **None**. |
| **Admin controls** | **Hard** — **review** queue access, **merge** authority. |

---

## Training engine

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — who completed what. |
| **Volunteer data model** | **Hard** — tasks/unlocks. |
| **Feeds/groups** | **Soft** — surface modules. |
| **Leadership system** | **Hard** — **gates**. |
| **Accountability signals** | **Soft** — overdue training. |
| **Dashboard intelligence** | **Soft** — completion dashboards. |
| **Voter linkage** | **None**. |
| **Pacing engine** | **Hard** — **surge** training before peak (`pacing-engine.md`). |
| **Admin controls** | **Hard** — **waivers**. |

---

## Pacing engine

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Soft** — optional per-person tuning. |
| **Volunteer data model** | **Soft** — lane + **pause**. |
| **Feeds/groups** | **Soft** — **pin** phase-appropriate posts. |
| **Leadership system** | **Soft** — captain load. |
| **Accountability signals** | **Hard** — nudge **cadence** must align with **pacing** to avoid harassment. |
| **Dashboard intelligence** | **Soft** — phase labels on reports. |
| **Voter linkage** | **None**. |
| **Training engine** | **Hard** — **JIT** surges. |
| **Admin controls** | **Hard** — **phase** **change** **audit**. |

---

## Admin controls

| Depends on | Relationship |
|------------|----------------|
| **People graph** | **Hard** — **who** **admin** **acts** **on**. |
| **Volunteer data model** | **Hard** — **role** **changes**. |
| **Feeds/groups** | **Soft** — **moderation** **scope**. |
| **Leadership system** | **Hard** — **promotion** **workflow**. |
| **Accountability signals** | **Soft** — **threshold** **configs**. |
| **Dashboard intelligence** | **Soft** — **metric** **definitions** **governance**. |
| **Voter linkage** | **Hard** — **merge** **and** **review** **permissions**. |
| **Training engine** | **Hard** — **waivers**. |
| **Pacing engine** | **Hard** — **phase** **controls**. |

**Depends on** **audit** **infrastructure** **everywhere** (`control-layer.md`, `engineering-architecture.md`).

---

## Visual summary (conceptual)

```
People graph (+ RLS)
       ↑
       ├── Volunteer data model ──┬── Feeds/groups
       │                           ├── Leadership system
       │                           └── Accountability signals
       │
       ├── Voter linkage (parallel/scales in later phase)
       │
       ├── Training engine ──────── Leadership system
       │
       ├── Pacing engine ────────── Accountability + Training
       │
       └── Admin controls ───────── (overlays all sensitive actions)

Dashboard intelligence ←── Volunteer data + Accountability (+ linkage optional)
```

---

## Related documents

- `master-build-plan.md`  
- `build-sequence-map.md`  
- `phase-1-volunteer-command-v1.md`  
- `docs/db/campos-data-architecture.md`  
