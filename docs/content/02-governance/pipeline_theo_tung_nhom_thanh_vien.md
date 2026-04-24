# PIPELINE CHO TUNG NHOM THANH VIEN - Enterprise Chatbot | AI

## 1. Muc dich

Tai lieu nay mo ta pipeline cong viec theo tung nhom thanh vien, nham:

- Ro ai lam gi o moi giai doan
- Ro diem ban giao giua cac nhom
- Giam nghen co chai trong qua trinh trien khai

## 2. Tong quan pipeline lien nhom

Luong tong the:
1. Sales/Pre-sales
2. Business/PO/BA
3. PM/Governance
4. Tech Delivery (Backend/AI + Frontend)
5. QA/UAT
6. DevOps/SRE
7. Security/Compliance (neu ap dung)
8. Operations/Support

## 3. Pipeline chi tiet theo nhom

## 3.1 Sales / Pre-sales Pipeline

### Dau vao
- Lead moi
- Nhu cau business ban dau

### Cong viec chinh
- Discovery call
- Scope fit theo goi A/B/C
- Gui proposal/bao gia
- Chot hop dong va handover delivery

### Dau ra
- Bao gia da chot
- Hop dong da ky
- Scope note cho PM/PO

### KPI
- Lead -> Meeting conversion
- Meeting -> Proposal conversion
- Proposal -> Won conversion

---

## 3.2 Business / PO / BA Pipeline

### Dau vao
- Scope tu Sales handover
- Nhu cau nghiep vu chi tiet

### Cong viec chinh
- Thu thap yeu cau
- Chot acceptance criteria
- Chuan hoa corpus/domain knowledge
- Ho tro UAT va sign-off

### Dau ra
- Requirement baseline
- UAT test scenarios
- UAT sign-off input

### KPI
- Requirement clarity rate
- UAT rework rate

---

## 3.3 PM / Governance Pipeline

### Dau vao
- Hop dong + scope + requirement baseline

### Cong viec chinh
- Lap project plan/Gantt
- Chot RACI va communication cadence
- Theo doi tien do/rui ro/action items
- To chuc GO/NO-GO va closure

### Dau ra
- Weekly status report
- Risk/action tracker
- Project closure report

### KPI
- Milestone on-time rate
- Blocker aging
- Escalation closure rate

---

## 3.4 Tech Delivery Pipeline (Backend/AI + Frontend)

### Dau vao
- Requirement da chot
- Corpus da san sang

### Cong viec chinh
- Build API endpoints
- Build/review retrieval flow
- Build/update frontend flow
- Internal tech test va fix

### Dau ra
- Build san sang UAT
- Tech documentation
- Release note noi bo

### KPI
- Defect density
- Lead time for change
- Build stability

---

## 3.5 QA / UAT Pipeline

### Dau vao
- Build candidate
- Acceptance criteria

### Cong viec chinh
- Test functional/integration
- Chuan bi UAT kit
- Dieu phoi UAT voi business
- Tong hop defect va quality gate

### Dau ra
- Test report
- UAT result pack
- UAT sign-off recommendation

### KPI
- Test pass rate
- Defect reopen rate
- UAT cycle time

---

## 3.6 DevOps / SRE Pipeline

### Dau vao
- Build da qua quality gate
- Go-live readiness inputs

### Cong viec chinh
- Deploy staging/production
- Setup monitoring/alerting
- Verify SLA/SLO baseline
- Hypercare va incident support

### Dau ra
- Deployment record
- Monitoring dashboard
- Hypercare report

### KPI
- Deployment success rate
- MTTR
- SLO compliance rate

---

## 3.7 Security / Compliance Pipeline (neu ap dung)

### Dau vao
- Architecture + deployment plan

### Cong viec chinh
- Review auth/access/audit controls
- Review data handling policy
- Risk/security recommendations

### Dau ra
- Security review notes
- Control gap list
- Go-live security recommendation

### KPI
- Security finding closure rate
- Critical finding count

---

## 3.8 Operations / Support Pipeline

### Dau vao
- Go-live sign-off
- Runbook + maintenance policy

### Cong viec chinh
- Theo doi su co va KPI hang ngay
- Tiep nhan ticket
- Bao tri dinh ky
- Bao cao van hanh thang

### Dau ra
- Incident log
- Monthly service report
- Continuous improvement backlog

### KPI
- Ticket SLA adherence
- Incident recurrence rate
- Customer satisfaction (neu co)

## 4. Diem ban giao giua cac nhom (handoff gates)

1. Sales -> PM/PO: signed scope + contract pack
2. PO/BA -> Tech: requirement + acceptance baseline
3. Tech -> QA: build candidate + release notes
4. QA -> PM/PO: UAT result + go/no-go input
5. PM/PO -> DevOps: go-live approval
6. DevOps -> Operations: production handover + runbook

## 5. Rule tranh nghen pipeline

- Khong co requirement baseline -> khong bat dau build
- Khong co quality gate/UAT pass -> khong go-live
- Khong co monitoring + rollback plan -> khong deploy production
- Blocker > 24h -> escalate theo policy

## 6. Tai lieu lien quan

- [Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md)
- [Quy trinh tiep nhan yeu cau](./quy_trinh_tiep_nhan_yeu_cau.md)
- [Team profile](../05-execution/team_profile.md)
- [Project plan Gantt](../05-execution/project_plan_gantt.md)
- [Report policy](./report_policy.md)
