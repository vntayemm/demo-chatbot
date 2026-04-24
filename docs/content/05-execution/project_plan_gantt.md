# PROJECT PLAN - GANTT CHART & TASK LIST

## 1. Tong quan ke hoach

- Tong thoi gian du kien: **10 tuan**
- Pham vi: tu kickoff -> UAT -> go-live -> hypercare
- Muc tieu: dua he thong chatbot vao production co governance day du

## 2. Gantt chart (Mermaid)

**Muc dich:** Truc quan hoa timeline 10 tuan tu kickoff den hypercare, giup doi chieu milestone va duong critical path.

```mermaid
gantt
    title Enterprise Chatbot | AI — Implementation Plan (10 Weeks)
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Phase 0 - Contract & Kickoff
    Contract signed                     :milestone, m1, 2026-05-04, 1d
    Kickoff meeting                     :a1, 2026-05-05, 2d
    Finalize scope & owners             :a2, after a1, 2d

    section Phase 1 - Discovery & Preparation
    Current-state assessment            :b1, 2026-05-11, 4d
    Corpus review & standardization     :b2, after b1, 5d
    Define KPI and acceptance criteria  :b3, after b1, 3d

    section Phase 2 - Build & Integration
    Backend setup and API hardening     :c1, 2026-05-25, 7d
    Frontend flow update                :c2, 2026-05-25, 5d
    Retrieval tuning (top_k/ranking)    :c3, after c1, 5d
    Logging and monitoring baseline     :c4, after c1, 4d

    section Phase 3 - Governance & Operations Docs
    UAT checklist finalization          :d1, 2026-06-09, 2d
    Go-live checklist finalization      :d2, after d1, 2d
    Risk register + SLA/SLO alignment   :d3, after d1, 3d
    Incident runbook finalization       :d4, after d3, 2d

    section Phase 4 - Testing & UAT
    Functional + integration testing    :e1, 2026-06-16, 4d
    Performance and security checks     :e2, after e1, 3d
    Business UAT execution              :e3, after e2, 5d
    UAT sign-off                        :milestone, m2, after e3, 1d

    section Phase 5 - Go-live & Hypercare
    Go-live readiness review            :f1, 2026-06-30, 2d
    Production deployment               :milestone, m3, after f1, 1d
    Hypercare (stabilization)           :f2, after m3, 10d
    Project closure report              :f3, after f2, 2d
```

**Ghi chu thanh phan:**

- **section Phase 0..5:** Nhom cong viec theo giai doan hop dong/trien khai.
- **milestone:** Diem khong co thoi luong thuc hien (Contract, UAT sign-off, Go-live).
- **Task bars (a1, b1, …):** Cong viec co bat dau/ket thuc hoac `after` task khac.

## 3. Task list chi tiet

| ID | Task | Owner chinh | Dau ra mong doi | Phu thuoc |
|---|---|---|---|---|
| T01 | Kickoff va chot RACI | Project Lead | Bien ban kickoff + danh sach owner | Contract signed |
| T02 | Ra soat corpus | BA + AI Engineer | Corpus da chuan hoa theo domain | T01 |
| T03 | Chot KPI/SLO/UAT criteria | PO + Tech Lead | KPI baseline + acceptance criteria | T01 |
| T04 | Hoan thien backend API | Backend Engineer | API on dinh, co logging co ban | T02, T03 |
| T05 | Toi uu retrieval | AI Engineer | Do chinh xac tra loi tang theo benchmark | T04 |
| T06 | Hoan thien tai lieu van hanh | PM + Ops | UAT/Go-live/Risk/SLA/Runbook final | T03 |
| T07 | Test ky thuat | QA + Tech Team | Test report (functional/integration/perf/sec) | T04, T05 |
| T08 | UAT nghiep vu | PO + BA + Key users | Bien ban UAT pass/fail | T07 |
| T09 | Go-live | DevOps + Tech Lead | He thong production running | T08, T06 |
| T10 | Hypercare & closure | PM + Ops + Tech Team | Bao cao dong du an + lesson learned | T09 |

## 4. Milestone quan trong

- `M1`: Contract signed
- `M2`: UAT sign-off
- `M3`: Production go-live

## 5. Nguong kiem soat tien do (project control)

- Weekly governance meeting: 1 lan/tuan
- Trang thai task: `Not started` / `In progress` / `Blocked` / `Done`
- Rule canh bao:
  - Task tre > 2 ngay: PM phai escalation
  - Task critical-path tre > 1 ngay: review ke hoach va tai phan bo nguon luc

## 6. Mau cap nhat tien do hang tuan

- Tuan so:
- % hoan thanh tong:
- Task hoan thanh trong tuan:
- Task dang blocker:
- Rui ro moi:
- Hanh dong tiep theo:
