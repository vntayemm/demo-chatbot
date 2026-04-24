# CHECKLIST THU THAP YEU CAU NGUOI DUNG (BA) - Enterprise Chatbot | AI

Tai lieu **mau BA** de **thu thap yeu cau mot cach day du**, giam thieu thieu sot truoc khi backlog / thiet ke / UAT. Dung song song voi [Quy trinh tiep nhan yeu cau](./quy_trinh_tiep_nhan_yeu_cau.md) (ticket) va [Khung kiem soat](./kiem_soat_hoan_chinh_vu_viec_nghiep_vu.md) §9.1.

- [Vi du case A–Z (container cang & do lead CRM)](../01-overview/vi_du_case_az_container_va_crm_lead.md) — minh hoa dien checklist nay vao hai nghiep vu.

> **Cach dung:** copy muc duoi day vao wiki/ticket epic; dien tung o trong bang; danh dau checkbox khi da **xac nhan voi stakeholder** (ghi ten + ngay).

---

## 1. Thong tin chung du an / yeu cau

| Truong | Noi dung can thu thap | Da co? | Nguoi xac nhan |
|---|---|---|---|
| Ten du an / epic |  |  |  |
| Ma ticket / lien ket |  |  |  |
| Ngay bat dau thu thap |  |  |  |
| PO/BA chu tri |  |  |  |
| Sponsor / nguoi phe duyet nghiep vu |  |  |  |
| Han mong muon (deadline nghiep vu) |  |  |  |

---

## 2. Van de & muc tieu nghiep vu

### 2.1 Hien trang (as-is)

- [ ] **Quy trinh hien tai** mo ta bang buoc (hoac so do don gian).
- [ ] **Noi dau** (pain): thoi gian, loi, chi phi, rui ro — **co so lieu** neu co (SLA noi bo, so ticket, thoi gian xu ly TB).
- [ ] **Ai bi anh huong** (phan quyen nghiep vu, bo phan, khach hang).

### 2.2 Mong muon (to-be)

- [ ] **Ket qua kinh doanh** mong doi (vi du: giam thoi gian tra loi, tang ty le self-service).
- [ ] **KPI / tieu chi thanh cong** do duoc (so, %, thoi gian) — tranh muc tieu mo ho nhu "tot hon".
- [ ] **Pham vi ngoai** (out-of-scope) da thong nhat va **ghi ro**.

### 2.3 Rang buoc & gia dinh

- [ ] Rang buoc **phap ly / hop dong** (neu co).
- [ ] Rang buoc **thoi gian / ngan sach / nguon luc**.
- [ ] **Gia dinh** team dang tin (neu sai se lam thay doi lon — ghi vao [Risk](./risk_register.md) neu can).

---

## 3. Nguoi dung, vai tro, quyen han

| Hang muc | Noi dung can thu thap | Ghi chu |
|---|---|---|
| Nhom nguoi dung chinh | (vi du: Sales, CS noi bo, quan tri vien) |  |
| So luong / tan suat dung (uoc) |  |  |
| Phan quyen theo vai tro | (ai duoc lam gi: xem / sua / phe duyet / xuat) |  |
| Ngon ngu giao dien / noi dung |  |  |
| Kenh truy cap | (web / mobile / API / noi bo) |  |

- [ ] Da co **it nhat 1 nguoi dai dien nghiep vu** tham gia UAT cuoi (ten + lien he).

---

## 4. Luong nghiep vu (user journey) — bat buoc co so do ngan

Voi moi luong chinh (vi du: "hoi gia", "huong dan quy trinh"):

- [ ] **Diem bat dau** va **diem ket thuc** cua luong.
- [ ] **Cac buoc** nguoi dung + he thong (co the bang bullet hoac BPMN tham chieu).
- [ ] **Diem canh bao / ngoai le** (khong co du lieu, loi API, nguoi dung bo giua chung).

---

## 5. Yeu cau chuc nang (functional)

### 5.1 Danh sach tinh nang / luong can co

| ID | Mo ta ngan | Uu tien (P0–P3) | Phu thuoc |
|---|---|---|---|
| F-01 |  |  |  |
| F-02 |  |  |  |

### 5.2 Tiep can chatbot / Q&A (neu ap dung)

- [ ] **Domain / bot** can co (vi du: `price`, `guide`, domain moi — ten + muc dich).
- [ ] **Kieu cau hoi mau** (10–30 cau tieu bieu: happy path + bien).
- [ ] **Cau tra loi mong muon**: do dai, giong van (formal/than thien), co/khong trich dan nguon.
- [ ] **Khi nao can nguoi that** (escalate toi CS/BA) — dieu kien ro.
- [ ] **Du lieu / corpus**: ai so huu noi dung, tan suat cap nhat, format (CSV/MD/HTML), **khong** dua PII nhay cam vao corpus neu khong can.

### 5.3 Tich hop & du lieu

- [ ] He thong can **goi API** ben ngoai (ten, auth, SLA ben thu ba).
- [ ] **Import / export** (file, dinh dang, dung luong toi da).
- [ ] **Luu tru** phia server (field bat buoc, retention).

---

## 6. Yeu cau phi chuc nang (non-functional)

| Hang muc | Cau hoi BA can lam ro | Ghi lai ket luan |
|---|---|---|
| Hieu nang | p95 latency, tai dong thoi uoc? |  |
| San sang | Uptime / cua so bao tri? |  |
| Bao mat | RBAC, log, PII, luu tru log bao lau? |  |
| Tuan thu | GDPR / local law / noi bo — cap do? |  |
| Kha dung | Moi truong prod / DR — yeu cau? |  |
| Da ngon ngu / timezone |  |  |

---

## 7. Bao cao, thong bao, audit

- [ ] Nguoi dung can **bao cao / dashboard** gi (tan suat, dinh dang)?
- [ ] **Email / in-app** thong bao khi nao, toi ai?
- [ ] **Audit trail** can ghi lai hanh dong nao (dang nhap, phe duyet, xuat du lieu)?

---

## 8. UAT & chap thuan

- [ ] **Tieu chap nhan (acceptance criteria)** gan voi tung F-0x hoac epic — viet du de QA/UAT kiem tra.
- [ ] **Du lieu / tai khoan test** do ai cung cap, den khi nao.
- [ ] **Tieu chi PASS toi thieu** (tham khao [UAT checklist](./uat_checklist.md)).

---

## 9. Traceability (BA -> giao hang)

| Tai lieu / buoc tiep theo | Trang thai | Owner |
|---|---|---|
| Ticket / epic cap nhat |  |  |
| [Risk register](./risk_register.md) (neu rui ro moi) |  |  |
| [SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md) / thiet ke ky thuat can cap nhat |  |  |
| [Checklist phan mem theo role](./checklist_phan_mem_va_theo_role.md) §1 (nen tang & bang kha nang) |  |  |

---

## 10. Sign-off thu thap yeu cau (goi y)

| Vai tro | Ho ten | Ngay | Ky / xac nhan |
|---|---|---|---|
| Sponsor / nghiep vu |  |  |  |
| PO/BA |  |  |  |
| PM (neu co) |  |  |  |

- [ ] Da **email / ticket** tong hop phien ban BA v1 cho cac ben **I** (thong bao).

---

**Phien ban:** v1.0  
**Ghi chu:** Khong thay the hop dong; la **bo sung** de giam rework. Cap nhat phien ban khi scope thay doi ([CR](./quy_trinh_quan_ly_du_an.md) §6).
