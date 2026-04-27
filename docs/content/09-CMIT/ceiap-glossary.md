# CEIAP glossary

**Purpose:** shared vocabulary for engineering, product, and sales — aligned with **this repository** where possible.  
**Related:** [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) · [permission-system-design.md](./permission-system-design.md) · [bang-thuat-ngu-chuyen-nganh-tong-hop.md](./bang-thuat-ngu-chuyen-nganh-tong-hop.md) (VN: một bảng tổng hợp)

Terms are **English-first**; some entries include a short Vietnamese hint for mixed teams.

---

## A

**Adapter (integration)**  
Implementation that hides a vendor SDK or protocol behind a **small interface** (e.g. payment provider, storage backend). *VN: lớp “cắm” nhà cung cấp.*

**API Gateway**  
Single north-south entry for HTTP routing, TLS, and often **OIDC validation** before traffic hits domain services. *Repo: `api-gateway/`.*

**Audit (job / sync)**  
Append-only record of an execution: inputs, outcome, errors, correlation id. *Examples: `job_runs` (scheduler), `sync_audit` (sync-service).*

---

## B

**Bounded context**  
A module that owns its data model and release cycle (e.g. scheduler DB vs sync Mongo vs integration Mongo). Prevents one “global schema” fantasy.

**Bi-directional sync**  
Data may flow **push** (local → remote) and **pull** (remote → local). Requires **mapper**, **state**, and **conflict policy** — not only cron.

---

## C

**CEIAP**  
*Composable Enterprise Integration & Application Platform* — umbrella name for adapter-first integration + orchestration + governance.

**Composable**  
Swap implementations without rewriting domain rules, as long as **contracts** (interfaces, DTOs, events) stay stable.

**Conflict (sync)**  
Same logical entity diverged in two systems; resolution may be LWW, version-based, merge, or **manual**. *Not fully automated in MVP sync-service.*

**Control plane (future)**  
Central UI/API for tenants, quotas, integrations — distinct from **data plane** microservices. Roadmap no-code / low-code: [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md).

**Correlation ID**  
End-to-end identifier for tracing one user or system action across gateway → service → job → sync run.

---

## D

**Data plane**  
Runtime services and stores that execute business and integration work (microservices, DBs, queues, object storage).

**DLQ (dead letter queue)**  
Holding area for work that **failed after retries**; enables replay and ops triage. *Example pattern: `dbsync-service` + NATS adapter.*

---

## E

**Event-driven**  
Work is triggered by **events** (webhook, message, domain change) rather than only by polling. Often pairs with a **broker** and idempotent consumers.

---

## G

**Governance (architecture)**  
Rules for when to add adapters, where sync vs dbsync applies, and how secrets and policies are managed — see CTO handbook §6.

---

## I

**Idempotency**  
Repeating the same operation with the same **idempotency key** does not duplicate side effects. Critical for retries and webhooks.

**Integration Manager**  
Service that registers **providers** and **instances**, resolves **active** config per type (storage, payment, email, …). *Repo: `integration-service/`.*

---

## J

**Job (scheduled)**  
Configured unit of recurring work (cron, payload, tenant). *Persisted in scheduler Postgres; execution tracked in `job_runs`.*

---

## M

**Mapper (sync)**  
`SyncMapper<L,R>`: deterministic **local ↔ remote** DTO transform. *Repo: `@cmit/platform-sync` + per-entity mappers in `sync-service`.*

---

## O

**OIDC**  
OpenID Connect — typical pattern for **JWT**-based auth at gateway and services. *See identity-setup / gateway middleware.*

---

## P

**Planner vs worker (scheduler)**  
**Planner** decides *when* due jobs fire and enqueues work; **worker** executes handlers and reports terminal status. Enables independent scaling.

**Policy engine (direction)**  
Rules for authorization / environment beyond raw RBAC — see permission-system-design and `platform/policy-engine`.

**Push / pull (sync)**  
**Push:** local payload → map → transport to external system. **Pull:** external payload → map → local representation.

---

## R

**Retry vs non-retry**  
Transient failures (network, 5xx) should **retry** with backoff; business validation failures should **not** retry blindly (e.g. `JobNonRetryableError` → Bull `UnrecoverableError`).

---

## S

**State (sync)**  
Cursor / `last_sync_at` / remote id / version for incremental sync — avoids full reprocessing. *Collection: `sync_state`.*

**Sync service**  
HTTP API wrapping **`SyncEngine`**: mapper + transport + audit + state. *Repo: `services/sync-service/` + `platform/sync/`.*

---

## T

**Tenant**  
Isolation boundary for data, config, and sometimes scheduling quotas. *Often `tenantId` on jobs, sync runs, policies.*

**Transport (sync)**  
Mechanism that carries remote DTOs (HTTP JSON in MVP, gRPC/Kafka in advanced designs). *Interfaces in `platform/sync`.*

**Trigger source (execution)**  
Who caused a run: `cron`, `api`, `webhook`, `pipeline` — unified in scheduler **job_runs** model.

---

## W

**Webhook**  
Inbound HTTP callback from an external system; must be **authenticated**, **idempotent**, and usually translated into an **internal event or job**.

**Workflow**  
Multi-step business process with optional human tasks; often ties to **approval** and **policy**. *Repo: `platform/approval`, `services/approval-service`.*

---

## Document control

| Field | Value |
|-------|--------|
| Owner | Architecture / Platform lead (assign) |
| Updates | When naming or boundaries change (e.g. new adapter family) |
