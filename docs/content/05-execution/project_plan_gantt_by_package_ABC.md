# PROJECT PLAN GANTT - THEO GOI A/B/C

## 1. Muc dich

Tai lieu nay mo ta ke hoach trien khai rut gon theo tung goi dich vu trong bao gia:

- Goi A (Foundation)
- Goi B (Professional)
- Goi C (Enterprise Readiness)

## 2. Goi A - Foundation (2-3 tuan)

### Gantt (Mermaid)

**Muc dich:** Lich rut gon goi A (nen tang toi thieu) de uoc luong 2-3 tuan.

```mermaid
gantt
    title Package A - Foundation (2-3 Weeks)
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Kickoff
    Contract signed                 :milestone, a_m1, 2026-05-04, 1d
    Kickoff + scope confirmation    :a1, 2026-05-05, 2d

    section Build Basic
    Basic backend/frontend setup    :a2, 2026-05-07, 5d
    Integrate price/guide bot       :a3, after a2, 4d

    section UAT and Handover
    UAT checklist run               :a4, after a3, 2d
    Basic go-live readiness         :a5, after a4, 2d
    Handover                        :milestone, a_m2, after a5, 1d
```

**Ghi chu thanh phan:** `milestone` = moc ky/handover; cac thanh ngang = task theo ngay; `after` = phu thuoc noi tiep.

### Dau ra chinh
- Bot co ban hoat dong duoc (`price`, `guide`)
- UAT/go-live checklist co ban
- Ban giao cho team su dung noi bo

---

## 3. Goi B - Professional (4-6 tuan)

### Gantt (Mermaid)

**Muc dich:** Lich goi B (chuyen nghiep) gom discovery, build, governance docs, test/UAT va go-live.

```mermaid
gantt
    title Package B - Professional (4-6 Weeks)
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Kickoff and Discovery
    Contract signed                 :milestone, b_m1, 2026-05-04, 1d
    Kickoff + RACI                  :b1, 2026-05-05, 2d
    Corpus and KPI baseline         :b2, after b1, 5d

    section Build and Tune
    API and integration completion  :b3, after b2, 6d
    Retrieval tuning                :b4, after b3, 4d
    Monitoring baseline             :b5, after b3, 3d

    section Governance Docs
    Risk + SLA/SLO + runbook        :b6, after b2, 5d

    section Test and UAT
    Functional/integration test     :b7, after b4, 4d
    Business UAT                    :b8, after b7, 4d
    UAT sign-off                    :milestone, b_m2, after b8, 1d

    section Go-live
    Go-live readiness               :b9, after b_m2, 2d
    Production deployment           :milestone, b_m3, after b9, 1d
```

**Ghi chu thanh phan:** Tuong tu goi A — them cac section Build and Tune, Governance Docs, Test; milestone UAT va Production deployment.

### Dau ra chinh
- Bot on dinh cho van hanh noi bo
- Day du tai lieu governance/operations
- Co benchmark co ban va KPI UAT/go-live

---

## 4. Goi C - Enterprise Readiness (8-10 tuan)

### Gantt (Mermaid)

**Muc dich:** Lich goi C (enterprise) voi security/compliance, hardening, E2E test, hypercare dai hon.

```mermaid
gantt
    title Package C - Enterprise Readiness (8-10 Weeks)
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Kickoff and Assessment
    Contract signed                         :milestone, c_m1, 2026-05-04, 1d
    Kickoff + governance alignment          :c1, 2026-05-05, 3d
    Security/compliance readiness review    :c2, after c1, 5d

    section Build and Hardening
    Core implementation                     :c3, after c2, 8d
    Retrieval and performance optimization  :c4, after c3, 6d
    Auth/RBAC/audit baseline hardening      :c5, after c3, 6d
    Observability and alerting setup        :c6, after c3, 5d

    section Governance and Operations
    Complete docs + runbook finalization    :c7, after c2, 6d
    Go-live criteria and rollback rehearsal :c8, after c7, 3d

    section Testing and UAT
    End-to-end testing                      :c9, after c4, 5d
    Security/performance validation         :c10, after c9, 4d
    Business UAT and sign-off               :c11, after c10, 5d
    UAT sign-off                            :milestone, c_m2, after c11, 1d

    section Go-live and Hypercare
    Go-live readiness board                 :c12, after c_m2, 2d
    Production go-live                      :milestone, c_m3, after c12, 1d
    Hypercare 2 weeks                       :c13, after c_m3, 10d
    Closure report                          :c14, after c13, 2d
```

**Ghi chu thanh phan:** Them cac task bao mat, quan sat, rollback rehearsal; milestone UAT/Go-live/Closure.

### Dau ra chinh
- He thong san sang production o muc governance cao
- Hardening auth/RBAC/audit + observability
- Hypercare 2 tuan va bao cao dong du an

---

## 5. Bang so sanh nhanh theo goi

| Tieu chi | Goi A | Goi B | Goi C |
|---|---|---|---|
| Timeline | 2-3 tuan | 4-6 tuan | 8-10 tuan |
| Muc tieu | PoC nhanh | Van hanh noi bo on dinh | Enterprise readiness |
| Tai lieu governance | Co ban | Day du | Day du + hardening |
| UAT/go-live | Co ban | Chuan hoa | Chuan hoa + rehearsal |
| Hypercare | Khong bat buoc | Tuy chon | Co (2 tuan) |
