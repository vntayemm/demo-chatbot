# CASE STUDY CHI TIET (DETAILED) - Enterprise Chatbot | AI

## 1. Executive Summary

Khach hang can giam tai cho team Sales/CS do khoi luong cau hoi lap lai tang nhanh, trong khi chat luong tra loi khong dong nhat va kho do luong.

Giai phap duoc trien khai theo huong `production-ready chatbot`:

- `Price bot` + `Guide bot`
- Governance framework day du (UAT, Go-live, SLA/SLO, Risk, Runbook, Sign-off)

Ket qua: he thong duoc dua vao van hanh co kiem soat, co KPI ro rang, va san sang mo rong.

## 2. Customer Context

- Industry: CRM/Sales Operations
- Organization size: Mid-size, nhieu nhom Sales/CS noi bo

### 2.1. Existing state

- Thong tin nghiep vu nam rai rac o tai lieu/ca nhan
- Tra loi thu cong qua chat/email
- Chua co bo chi so van hanh chatbot

## 3. Problem Statement

### 3.1 Van de nghiep vu

- Thoi gian phan hoi cau hoi lap lai cao
- Noi dung tra loi khong nhat quan giua cac nhan su
- Kho bao cao nang suat va chat luong

### 3.2 Van de ky thuat/van hanh

- Chua co quy trinh UAT/go-live ro rang
- Chua co SLA/SLO de danh gia he thong
- Chua co incident process theo muc do uu tien

## 4. Project Objectives and Success Criteria

### 4.1. Muc tieu chinh

1. Trien khai chatbot hoi dap theo 2 domain (`price`, `guide`).
2. Chuan hoa quy trinh release va van hanh.
3. Dat nguong KPI toi thieu de du dieu kien production.

### 4.2 Success criteria (de xuat)

- UAT pass rate >= 95%
- Khong con loi Sev1 truoc go-live
- p95 latency <= 2.0s (tai tai trong thiet ke)
- API 5xx error rate <= 1%
- Context-grounded answer rate >= 85%

## 5. Scope

### 5.1 In-scope

- Backend API cho `/chat/price`, `/chat/guide`
- Frontend test flow
- Corpus standardization
- Governance docs va sign-off forms
- Go-live readiness + hypercare

### 5.2 Out-of-scope (phase hien tai)

- Full enterprise UI productization
- Deep integration voi tat ca he thong ben thu ba
- Official certification audit (ISO/SOC)

## 6. Solution Design

### 6.1 Architecture

- Frontend: Vue UI
- Backend: FastAPI
- Knowledge layer: CSV/Markdown corpus
- Retrieval: semantic search + top_k
- Observability: logs/metrics + MLflow support

### 6.2 Governance Stack

- [UAT checklist](../02-governance/uat_checklist.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
- [Risk register](../02-governance/risk_register.md)
- [SLA/SLO](../02-governance/slo_sla.md)
- [Runbook incident](../02-governance/runbook_incident.md)
- [Bien ban UAT sign-off](../03-signoff/uat_sign_off_bien_ban.md)
- [Bien ban Go-live sign-off](../03-signoff/go_live_sign_off_bien_ban.md)

## 7. Delivery Timeline (Reference)

| Phase | Duration | Key outputs |
|---|---|---|
| Kickoff & scope alignment | Week 1 | Scope baseline, KPI baseline, RACI |
| Build & integration | Week 2-3 | Working API + retrieval flow |
| Test & UAT | Week 4 | UAT report + UAT sign-off |
| Go-live readiness | Week 5 | GO/NO-GO decision pack |
| Hypercare | Week 6-7 | Stabilization report + closure |

## 8. Implementation Details

### 8.1 Corpus and Knowledge Preparation

- Gom nhom va lam sach noi dung theo 2 domain
- Chuan hoa van ban de retrieval tra ve ngu canh sat nhu cau
- Dat quy trinh cap nhat corpus co owner

### 8.2 Backend and Retrieval

- Tach endpoint theo domain de de monitor va tune rieng
- Cau hinh `top_k` linh hoat de can bang quality/latency
- Them logging cho cac truong hop timeout/error

### 8.3 Testing and Validation

- Functional and integration test
- Performance spot checks
- Business UAT voi bo cau hoi thuc te

## 9. Before/After Snapshot (Reference)

| Chi so | Before | After (target/observed model) |
|---|---|---|
| Tra loi lap lai bang tay | Cao | Giam dang ke |
| Tinh nhat quan cau tra loi | Khong dong nhat | On dinh theo corpus |
| Co KPI van hanh | Gan nhu khong co | Co dashboard KPI/SLO |
| Co quy trinh incident | Ad-hoc | Runbook P1/P2/P3 |
| Readiness go-live | Thap | Co checklist + sign-off |

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Corpus quality khong dong nhat | Sai ngu canh | Corpus review loop BA + AI |
| KPI khong dat truoc go-live | Delay release | Tune retrieval + scale + re-test |
| Stakeholder response cham | Tre milestone | Chot owner + SLA phan hoi |
| Scope creep | Vuot timeline/cost | CR governance + sign-off scope |

## 11. Operational Outcomes

- Co khung van hanh minh bach de quan tri theo so lieu
- Co co che quyet dinh GO/NO-GO ro rang
- Co mau bao cao, sign-off, va policy ho tro ban giao ben vung

## 12. Lessons Learned

### 12.1. Van hanh nhu service, khong chi demo

Chatbot gia tri cao nhat khi duoc van hanh nhu mot service, khong phai mot demo.

### 12.2. Governance song song voi build

Governance docs can duoc tao song song voi build, khong de den cuoi.

### 12.3. KPI/SLO chot som

KPI/SLO can chot som de tranh tranh cai o giai doan nghiem thu.

## 13. Next-Phase Recommendations

- Hybrid retrieval + reranking cho quality cao hon
- Dashboard quality chi tiet theo domain/intent
- Tich hop sau hon voi CRM/Helpdesk
- Nang cap security maturity theo roadmap (control evidence + readiness audit)

## 14. Reusable Assets from This Case

- [Case study (tom tat)](./case_study_demo_chatbot.md)
- [Customer compliance statement (executive)](./customer_compliance_statement_executive.md)
- [Project plan Gantt (goi A/B/C)](../05-execution/project_plan_gantt_by_package_ABC.md)
- [Marketing blog 03 — Case study](../08-marketing/marketing_blog_03_case_study.md)
- [Pitch pack](./pitch_pack.md)
