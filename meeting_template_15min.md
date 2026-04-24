# MEETING TEMPLATE 15 PHUT - SALES/PRE-SALES

## 1. Muc tieu buoi hop

- Xac dinh nhu cau thuc te cua khach hang ve chatbot production-ready.
- Lam ro pain point ve go-live risk, reliability, security, va governance.
- Chot duoc next step cu the sau buoi hop.

## 2. Agenda 15 phut (goi y)

- 0:00 - 1:00 | Mo dau va align muc tieu
- 1:00 - 4:00 | Hoi nhanh ve hien trang va pain point
- 4:00 - 8:00 | Trinh bay giai phap va khung governance
- 8:00 - 11:00 | Mapping nhu cau khach hang -> gia tri de xuat
- 11:00 - 13:00 | Q&A ngắn
- 13:00 - 15:00 | Chot next step, owner, timeline

## 3. Script mo dau 60 giay

"Cam on anh/chi da danh thoi gian. Muc tieu buoi nay la hieu ro bai toan chatbot cua anh/chi trong production, sau do doi chieu voi mot mo hinh trien khai co governance day du: UAT, go-live gate, SLA/SLO, risk control, va incident response. Cuoi buoi minh se chot duoc next step ro rang de danh gia nhanh tinh kha thi."

## 4. Discovery questions (uu tien hoi)

### A. Hien trang

- Hien tai chatbot dang o giai doan nao: y tuong, PoC, hay da production?
- Team dang gap van de lon nhat la gi: chat luong, toc do, hay bao mat?
- Co KPI nao dang duoc theo doi cho chatbot khong?

### B. Van hanh va reliability

- Neu chatbot loi, hien tai team xu ly theo quy trinh nao?
- Da co SLA/SLO noi bo hoac cam ket voi nguoi dung chua?
- Co do duoc latency, error rate, va ty le tra loi dung ngu canh khong?

### C. Bao mat va compliance

- Yeu cau security/compliance cua don vi la muc nao?
- Co can audit trail, RBAC, SSO, hoac quy trinh incident reporting khong?

### D. Quyet dinh va timeline

- Ai la stakeholder chinh trong quyet dinh trien khai?
- Moc thoi gian ky vong de go-live la khi nao?

## 5. Mapping pain point -> thong diep de xuat

- Neu khach hang lo rui ro go-live:
  - Nhan manh `go_live_checklist.md` + rollback criteria
- Neu khach hang lo downtime/latency:
  - Nhan manh `slo_sla.md` + runbook P1/P2/P3
- Neu khach hang lo audit/compliance:
  - Nhan manh `risk_register.md` + control intent ISO/SOC
- Neu khach hang lo nghiem thu:
  - Nhan manh `uat_checklist.md` + pass/fail criteria ro rang

## 6. Q&A ngan (goi y)

- "Thuoc chuan gi?"
  - "Can chinh theo ITIL/ITSM, SRE, ISO 27001/SOC 2 control intent, va ISO 31000."
- "Lam sao chung minh hieu qua?"
  - "Bang KPI production: uptime, p95 latency, 5xx error rate, quality benchmark."
- "Neu co su co nghiem trong?"
  - "Co runbook P1/P2/P3, SLA phan hoi, rollback criteria, va RCA sau su co."

## 7. Chot next step (2 phut cuoi)

- De xuat next step muc 1 (nhanh):
  - Workshop 60-90 phut de gap analysis hien trang
- De xuat next step muc 2 (trung binh):
  - Mini-assessment 1-2 tuan, tra ket qua readiness + roadmap
- De xuat next step muc 3 (day du):
  - Pilot co KPI va acceptance criteria de san sang production

Mau chot:
"Neu anh/chi dong y, buoc tiep theo minh de xuat la [workshop/assessment/pilot], thoi gian [x], dau ra [y], va 2 ben cung thong nhat owner de trien khai ngay trong tuan nay."

## 8. Meeting notes template (dien nhanh)

- Ngay hop:
- Thanh phan:
- Pain point chinh:
- Muc uu tien cua khach hang:
- Constraint (bao mat/ngan sach/timeline):
- KPI muc tieu:
- Next step da chot:
- Owner ben khach hang:
- Owner ben minh:
- Han hoan thanh:
