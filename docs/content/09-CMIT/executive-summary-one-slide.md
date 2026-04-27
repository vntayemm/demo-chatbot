# Executive summary (one slide)

**Use:** copy into Keynote / Google Slides — one slide, large type, no appendix.  
**Companion:** [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) · [ceiap-glossary.md](./ceiap-glossary.md) · [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md) · [huong-mo-rong-crm.md](./huong-mo-rong-crm.md) · [huong-mo-rong-erp.md](./huong-mo-rong-erp.md) · [huong-mo-rong-ai.md](./huong-mo-rong-ai.md)

---

## Title

**Composable Enterprise Integration & Application Platform (CEIAP)**  
*Build once · integrate everywhere · control boundaries*

---

## Problem (bullets)

- Teams ship **vendor-specific** code → costly swaps (cloud, DB, queue, storage).
- **Integration** grows faster than product logic → fragile cron scripts and opaque retries.
- **Security and config** drift per service → audit and compliance pain.

---

## Solution (one line + three pillars)

**Standardize the edges:** every external capability sits behind an **adapter**; core domain stays clean.

| Pillar | What we ship |
|--------|----------------|
| **Integrate** | Registry + active provider (integration manager); sync orchestration + row-level sync where needed |
| **Orchestrate** | API gateway + workflow/approval + scheduler (planner ≠ worker) + execution audit |
| **Trust** | OIDC at edge; KMS/secure-config direction; policy/isolation building blocks |

---

## Proof (this codebase)

- **Live:** gateway, integration-service, scheduler + worker + job runs, sync-service + `platform-sync`, dbsync + DLQ, payment/file patterns on integration.
- **Explicit gaps:** admin UI, conflict-resolution UI, full multi-tenant control plane — **roadmap**, not implied. Chi tiết hướng **no-code / low-code:** [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md).

---

## Ask (pick one per meeting)

| Audience | Ask |
|----------|-----|
| **Board / investor** | Fund bounded contexts above + one vertical reference implementation |
| **Customer** | Pilot: one domain + two integrations + observability baseline |
| **Engineering** | Adopt adapter-at-boundary rule + correlation IDs end-to-end |

---

## Footer (small text)

Repo: `demo-cmit-api` · Docs: [`platform-strategy-cto-handbook.md`](./platform-strategy-cto-handbook.md) · Security model: [`permission-system-design.md`](./permission-system-design.md)
