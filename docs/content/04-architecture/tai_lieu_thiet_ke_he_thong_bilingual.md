# SYSTEM DESIGN DOCUMENT - Enterprise Chatbot | AI

## 1. Muc dich va pham vi / Purpose and Scope

**VI:** Tai lieu mo ta thiet ke ky thuat he thong `demo-chatbot`, gom kien truc, thanh phan, luong xu ly, API, bao mat, va huong mo rong.  
**EN:** This document describes the technical design of `demo-chatbot`, including architecture, components, processing flow, APIs, security, and scalability direction.

## 2. Kien truc tong quan / High-Level Architecture

**VI:** He thong duoc chia thanh 3 lop:

- Presentation layer (`frontend/`)
- Application layer (`backend/`, FastAPI)
- Knowledge/Data layer (`backend/data/`, CSV/Markdown corpus)

**EN:** The system is organized into 3 layers:

- Presentation layer (`frontend/`)
- Application layer (`backend/`, FastAPI)
- Knowledge/Data layer (`backend/data/`, CSV/Markdown corpus)

Bo tro van hanh / Supporting stack:

- MLflow (tracking/logging)
- Governance docs (UAT, go-live, SLA/SLO, risk, incident runbook)

## 3. Luong xu ly chinh / Main Processing Flow

1. User submits a question from frontend.
2. Frontend calls backend endpoint (`/chat/price` or `/chat/guide`).
3. Backend runs semantic retrieval on domain corpus.
4. Backend selects `top_k` relevant contexts.
5. Backend returns response to frontend.
6. Frontend renders answer.

## 4. Thiet ke thanh phan / Component Design

### 4.1 Frontend

**VI:** Thu thap cau hoi, goi API, hien thi cau tra loi, xu ly loi co ban.  
**EN:** Collects user questions, calls APIs, renders responses, and handles basic errors.

### 4.2 Backend (FastAPI)

**VI:** Xu ly request, dieu phoi retrieval pipeline, tra response JSON.  
**EN:** Handles requests, orchestrates retrieval pipeline, returns JSON responses.

### 4.3 Knowledge Layer

**VI:** Tri thuc duoc to chuc theo domain qua corpus CSV/Markdown, de cap nhat doc lap voi code.  
**EN:** Knowledge is organized by domain via CSV/Markdown corpus, enabling updates independent from code.

### 4.4 Observability

**VI/EN:** Theo doi cac chi so chinh / Key metrics:

- p95/p99 latency
- 5xx error rate
- timeout rate
- quality benchmark

## 5. API Design (logical)

### Endpoints
- `POST /chat/price`
- `POST /chat/guide`

### Request model
- `question`: string
- `top_k`: integer

### Response model
- `answer`: string
- `sources`: optional list
- `meta`: optional metadata

## 6. Bao mat / Security Design Principles

- Deploy behind reverse proxy/API gateway
- Enforce TLS in production
- Add auth (JWT/OAuth2/SSO) as required
- Avoid logging sensitive data (token/PII)
- Manage secrets via env/secret manager

## 7. Hieu nang va kha nang mo rong / Performance and Scalability

- Horizontal scaling for backend instances
- Caching for repeated queries
- Retrieval tuning (`top_k`, ranking)
- SLO-driven performance management

Sizing reference:

- 10 concurrent users: 4 vCPU, 7 GB RAM
- 50 concurrent users: 7 vCPU, 13-14 GB RAM
- 200 concurrent users: 12-18 vCPU, 22-36 GB RAM

## 8. Xu ly su co / Failure Handling

- Backend outage -> incident P1, restart/rollback
- Latency spike -> scale + cache + retriever tuning
- Quality drop -> corpus review + benchmark + tuning

Related docs:

- [Runbook incident](../02-governance/runbook_incident.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
- [SLO / SLA](../02-governance/slo_sla.md)

## 9. Quyet dinh thiet ke chinh / Key Design Decisions

1. FastAPI for rapid and maintainable API development.
2. Lightweight Vue UI for fast demo/testing cycles.
3. Retrieval-first approach before custom model training.
4. Early governance documentation to reduce production risk.
5. SLO/SLA-based operational control.

## 10. Gioi han va huong nang cap / Current Limits and Upgrade Path

Current limits:

- UI is still test-oriented
- Automated quality evaluation is limited
- Full security hardening is not default

Upgrade path:

- Hybrid retrieval + re-ranking
- Full observability dashboard
- Production-grade auth/RBAC/audit logging
- New domain bots expansion

## 11. Tai lieu lien quan / Related Documents

- [Tai lieu thiet ke he thong (VI)](./tai_lieu_thiet_ke_he_thong.md)
- [Introduction report](../01-overview/introduction_report.md)
- [Project plan Gantt](../05-execution/project_plan_gantt.md)
- [Project plan Gantt (packages A/B/C)](../05-execution/project_plan_gantt_by_package_ABC.md)
- [Maintenance policy (VI)](../02-governance/chinh_sach_bao_tri.md)
