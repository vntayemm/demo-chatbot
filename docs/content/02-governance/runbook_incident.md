# RUNBOOK INCIDENT RESPONSE - Enterprise Chatbot | AI

## 1. Muc tieu

Tai lieu nay huong dan xu ly su co van hanh cho `demo-chatbot` trong moi truong production, bao gom:
- Phan loai muc do su co (P1/P2/P3)
- Quy trinh ung pho theo thoi gian
- Vai tro va trach nhiem
- Tieu chi dong su co va bao cao RCA

## 2. Dinh nghia muc do su co

| Muc do | Dinh nghia | Vi du |
|---|---|---|
| P1 | Dich vu ngung hoan toan hoac anh huong nghiem trong den chuc nang cot loi | API chatbot khong phan hoi, ty le loi tang dot bien toan he thong |
| P2 | Anh huong mot phan chuc nang quan trong, co workaround tam thoi | Mot endpoint chat bi cham/lien tuc loi, frontend van dung duoc mot phan |
| P3 | Loi nho, anh huong han che, khong tac dong lon den nghiep vu cot loi | Loi hien thi UI nho, metric canh bao khong nghiem trong |

## 3. Kenh kich hoat su co

- Nguon phat hien:
  - Alert tu monitoring (latency, 5xx, uptime, resource)
  - Bao cao tu nguoi dung/CS/BA
  - Kiem tra dinh ky cua team van hanh
- Kenh thong bao:
  - Nhom truc on-call (chat noi bo/phone)
  - War room cho su co P1/P2

## 4. SLA phan hoi su co (theo muc do)

| Muc do | Thoi gian phan hoi | Muc tieu khoi phuc tam thoi |
|---|---|---|
| P1 | <= 15 phut | <= 2 gio |
| P2 | <= 1 gio | <= 8 gio |
| P3 | <= 4 gio lam viec | <= 3 ngay lam viec |

## 5. Vai tro va trach nhiem

- **Incident Commander (IC):**
  - Dieu phoi tong the, quyet dinh uu tien, chot huong xu ly/rollback
- **Tech Lead (Backend/AI):**
  - Phan tich nguyen nhan ky thuat, dua ra phuong an khac phuc
- **DevOps/SRE:**
  - Kiem tra ha tang, scale he thong, quan ly alert va deployment rollback
- **Communicator (PO/BA/CS):**
  - Cap nhat tinh hinh cho stakeholder theo chu ky
- **Recorder:**
  - Ghi timeline su co, hanh dong da lam, ket qua tung buoc

## 6. Quy trinh xu ly su co

### 6.1 Buoc 1 - Tiep nhan va xac minh (0-10 phut)

- Xac minh su co co that hay false alert.
- Thu thap thong tin ban dau:
  - Thoi diem bat dau
  - Pham vi anh huong
  - Muc do tac dong nghiep vu
- Gan muc do tam thoi: P1/P2/P3.

### 6.2 Buoc 2 - Co lap va giam tac dong (10-30 phut)

- Kich hoat war room voi su co P1/P2.
- Ap dung bien phap giam tac dong:
  - Scale them backend instance
  - Bat cache/che do giam tai
  - Tam tat tinh nang phu neu can
- Neu can, kich hoat rollback ban gan nhat on dinh.

### 6.3 Buoc 3 - Khac phuc tam thoi (30-120 phut voi P1)

- Xac dinh nhanh nhom nguyen nhan:
  - Ha tang (CPU/RAM/network)
  - Ung dung (bug release moi)
  - Du lieu/retrieval (corpus/index)
  - Bao mat (tan cong, bat thuong truy cap)
- Trien khai fix tam thoi de phuc hoi dich vu.
- Theo doi metric on dinh toi thieu 30 phut sau fix.

### 6.4 Buoc 4 - Khac phuc triet de va dong su co

- Lap ke hoach fix goc (permanent fix) co owner, deadline.
- Cap nhat runbook/checklist neu co bai hoc moi.
- Chot su co khi:
  - Dich vu tro lai nguong SLA/SLO
  - Khong con canh bao nghiem trong lap lai
  - Stakeholder xac nhan muc anh huong da duoc kiem soat

## 7. Checklist xu ly nhanh theo tung loai su co

### 7.1 API 5xx tang cao

- [ ] Kiem tra release gan nhat
- [ ] Kiem tra log loi backend
- [ ] Kiem tra ket noi dich vu phu tro
- [ ] Rollback neu loi lien quan release moi
- [ ] Xac nhan error rate ve nguong chap nhan

### 7.2 Latency p95/p99 vuot nguong

- [ ] Kiem tra tai CPU/RAM
- [ ] Kiem tra truy van retrieval cham
- [ ] Bat cache cho request lap lai
- [ ] Scale ngang backend
- [ ] Theo doi sau can thiep 30-60 phut

### 7.3 Su co bao mat nghi ngo

- [ ] Co lap thanh phan nghi ngo bi anh huong
- [ ] Thu hoi/rotate secret neu can
- [ ] Kiem tra log truy cap bat thuong
- [ ] Bao cao Security owner
- [ ] Kich hoat quy trinh thong bao su co theo chinh sach noi bo

## 8. Mau cap nhat tinh hinh su co

Mau update moi 30 phut cho P1/P2:
- Thoi gian:
- Muc do su co:
- Pham vi anh huong:
- Hanh dong da thuc hien:
- Ket qua tam thoi:
- Buoc tiep theo:
- ETA cap nhat tiep:

## 9. RCA (Root Cause Analysis) sau su co

Can hoan thanh trong 48h (voi P1) hoac 5 ngay lam viec (voi P2):
- Mo ta su co va timeline day du
- Nguyen nhan goc (technical + process)
- Hanh dong khac phuc tam thoi va triet de
- Bai hoc rut ra
- Action item phong ngua tai dien (owner + deadline)

## 10. Tieu chi ket thuc su co

Su co duoc dong khi dat dong thoi:
- Dich vu on dinh theo nguong SLO da dinh
- Khong con alert nghiem trong lap lai trong cua so theo doi
- Da phat hanh thong bao ket thuc su co
- Da tao ticket theo doi fix triet de (neu chua hoan tat)
