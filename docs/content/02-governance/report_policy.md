# REPORT POLICY (CHINH SACH BAO CAO) - Enterprise Chatbot | AI

## 1. Muc dich

Chinh sach nay quy dinh cach thuc lap, gui, va theo doi bao cao trong qua trinh:
- Trien khai du an
- UAT/Go-live
- Van hanh sau ban giao

Muc tieu:
- Minh bach tien do va chat luong
- Co du lieu de ra quyet dinh nhanh
- Co can cu truy vet khi phat sinh su co

## 2. Pham vi ap dung

Ap dung cho:
- Team delivery (PM, Tech Lead, QA, DevOps)
- Team business/PO Ben A
- Stakeholder quan ly (Sponsor/Steering)

## 3. Nguyen tac bao cao

- Dung han, dung mau, dung so lieu.
- Bao cao phai co:
  - Tinh trang hien tai
  - Van de/rui ro
  - Hanh dong tiep theo + owner + deadline
- Co phan "decision needed" neu can stakeholder quyet dinh.

## 4. Chu ky bao cao

### 4.1 Giai doan trien khai

- **Daily (neu can):** status ngan cho team thuc thi
- **Weekly:** bao cao tien do chinh cho PM/PO
- **Steering review (2-4 tuan):** tong hop cap quan ly

### 4.2 Giai doan van hanh

- **Weekly ops report:** su co, KPI, backlog fix
- **Monthly service report:** SLA/SLO, quality trend, risk trend

## 5. Noi dung bat buoc theo loai bao cao

### 5.1 Weekly project report

- % hoan thanh theo milestone
- Task da xong / dang lam / bi blocker
- Risk moi va risk dang mo
- Chat luong (defect, test pass rate)
- Action items tuan tiep theo

### 5.2 UAT report

- So test case tong / pass / fail
- Loi Sev1/Sev2/Sev3
- Danh sach ton dong va han xu ly
- Ket luan: PASS / PASS CO DIEU KIEN / NO-GO

### 5.3 Go-live readiness report

- Trang thai checklist go-live
- KPI ky thuat co dat nguong khong
- Rollback readiness
- Ket luan: GO / GO CO DIEU KIEN / NO-GO

### 5.4 Monthly service report

- Uptime, p95 latency, 5xx error rate, timeout rate
- Tong hop incident P1/P2/P3
- Nguyen nhan lap lai va hanh dong phong ngua
- Kien nghi toi uu va ke hoach thang tiep theo

## 6. KPI de bao cao

### KPI du an

- Milestone on-time rate
- Defect leakage rate
- UAT pass rate

### KPI van hanh

- Uptime (%)
- p95 latency
- 5xx error rate
- MTTR
- Quality benchmark score

## 7. Vai tro va trach nhiem bao cao

- **PM:** tong hop weekly project report
- **QA/UAT lead:** tong hop UAT report
- **DevOps/SRE:** tong hop go-live va monthly ops report
- **PO/Business:** xac nhan ket qua nghiep vu va quyet dinh go/no-go

## 8. Quy trinh escalation tu bao cao

Escalate khi:
- Milestone critical tre > 1 ngay
- Co loi Sev1 chua dong truoc go-live
- KPI production vuot nguong canh bao
- Vi pham SLO 2 chu ky lien tiep

Escalation path:
1. PM/Tech Lead
2. PO/Business Owner
3. Steering/Sponsor

## 9. Mau tom tat bao cao 1 trang

- Ky bao cao:
- Tong quan:
- 3 diem tot:
- 3 van de lon:
- KPI chinh:
- Rui ro can quyet dinh:
- Action tuan/toi ky tiep:

## 10. Luu tru va truy vet

- Moi bao cao duoc luu trong thu muc tai lieu du an (co timestamp).
- Co version control neu cap nhat sau khi gui.
- Khuyen nghi dat ten file:
  - `report_weekly_YYYYMMDD.md`
  - `report_uat_YYYYMMDD.md`
  - `report_golive_YYYYMMDD.md`
  - `report_monthly_YYYYMM.md`

---

**Phien ban:** v1.0  
**Ngay cap nhat:** [dd/mm/yyyy]
