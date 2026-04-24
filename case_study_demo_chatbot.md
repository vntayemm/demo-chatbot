# CASE STUDY - DEMO-CHATBOT PRODUCTION-READY

## 1. Tong quan khach hang

- Nganh: CRM/Sales Operations
- Quy mo: Doanh nghiep vua (nhieu nhom sales va CS noi bo)
- Bai toan: Kho tri thuc phan tan, cau hoi lap lai cao, phan hoi khong dong nhat

## 2. Thach thuc ban dau

Truoc khi trien khai chatbot, khach hang gap 4 van de chinh:

1. **Thoi gian phan hoi cham**
   - Team van hanh ton nhieu thoi gian tra loi cau hoi lap lai.
2. **Noi dung khong dong nhat**
   - Moi nhan su tra loi theo cach rieng, kho dam bao tinh nhat quan.
3. **Kho mo rong**
   - Khi luong cau hoi tang, team support qua tai.
4. **Khong co co che do luong**
   - Khong co KPI ro rang de danh gia chatbot co hieu qua hay khong.

## 3. Muc tieu du an

- Xay dung chatbot hoi dap theo 2 domain:
  - `Price bot`
  - `Guide bot`
- Chuyen tu "demo" sang "production-ready" voi governance day du.
- Dat duoc KPI ky thuat va KPI nghiep vu toi thieu de van hanh ben vung.

## 4. Giai phap trien khai

### 4.1 Kien truc va cong nghe

- Frontend: Vue test UI
- Backend: FastAPI
- Retrieval: Semantic search dua tren corpus CSV/Markdown
- Tracking: MLflow + logs/metrics

### 4.2 Governance va van hanh

Bo khung duoc ap dung:
- UAT checklist
- Go-live checklist
- Risk register
- SLA/SLO
- Incident runbook P1/P2/P3
- UAT/Go-live sign-off templates

### 4.3 Lo trinh thuc hien

1. Kickoff va chot scope/KPI
2. Chuan hoa corpus
3. Build + integration
4. Test + UAT
5. Go-live + hypercare

## 5. Ket qua dat duoc (tham chieu)

### 5.1 Ket qua nghiep vu

- Giam khoi luong cau hoi lap lai do team CS/Sales xu ly thu cong.
- Tang tinh nhat quan trong tra loi noi bo.
- Tang toc do phan hoi cho cau hoi co ban.

### 5.2 Ket qua ky thuat/van hanh

- Co KPI de theo doi chat luong he thong:
  - Uptime
  - p95 latency
  - 5xx error rate
  - quality benchmark
- Co quy trinh su co va escalation ro rang.
- Co tai lieu hoan chinh de de handover cho team van hanh.

## 6. Yeu to thanh cong

- Chot pham vi va out-of-scope tu dau.
- Co dau moi BA/PO phoi hop lien tuc.
- Chuan hoa corpus som truoc giai doan UAT.
- Ky luat sign-off o tung moc (UAT/Go-live).

## 7. Bai hoc rut ra

1. Chatbot khong chi la model, ma la he thong van hanh.
2. KPI/SLO can duoc dat ngay tu giai doan planning.
3. Khong co go-live checklist thi rui ro trien khai tang manh.
4. Team khach hang va team delivery phai co owner ro rang cho tung action.

## 8. Huong mo rong tiep theo

- Bo sung hybrid retrieval + re-ranking.
- Nang cap dashboard quan tri quality theo domain.
- Tich hop CRM/Helpdesk sau hon.
- Tang maturity security/compliance readiness theo roadmap.

## 9. Tai lieu lien quan

- `marketing_blog_03_case_study.md`
- `customer_compliance_statement_executive.md`
- `project_plan_gantt_by_package_ABC.md`
- `slo_sla.md`
