# VI DU CASE A-Z — Nghiep vu container (ha bai / xuat tau) & Do lead CRM

Tai lieu **minh hoa** (khong phai hop dong van hanh thuc te cang): di tu **tiep nhan yeu cau** den **van hanh sau go-live**, ap dung cung mot **khung** voi hai nghiep vu khac nhau. Tham chieu:

- [Checklist thu thap yeu cau BA](../02-governance/checklist_thu_thap_yeu_cau_nguoi_dung_ba.md)
- [Khung kiem soat hoan chinh](../02-governance/kiem_soat_hoan_chinh_vu_viec_nghiep_vu.md)
- [Quy trinh tiep nhan yeu cau](../02-governance/quy_trinh_tiep_nhan_yeu_cau.md) · [UAT checklist](../02-governance/uat_checklist.md) · [Go-live checklist](../02-governance/go_live_checklist.md)

---

## 1. Khung A–Z (gom 14 buoc — "tu dau den cuoi")

| Buoc | Ten goi ngan | Output chinh | Vai tro chu dao |
|---|---|---|---|
| **A** | Acknowledge — tiep nhan | Ticket / ma yeu cau | PM / dieu hanh van hanh |
| **B** | Business intake — BA | BRD ngan / bang yeu cau day du | PO/BA |
| **C** | Criteria — tieu chap nhan | Acceptance criteria + UAT script so bo | PO/BA + QA |
| **D** | Design — ky thuat | SDD/API/luong du lieu | Tech Lead |
| **E** | Estimate — ke hoach | WBS, milestone, rui ro | PM + Tech Lead |
| **F** | Feature — lap trinh | PR / build staging | Dev |
| **G** | Gate QA — kiem thuat | Bao cao loi / regression | QA |
| **H** | Handover nghiep vu — UAT | Bien ban PASS/FAIL | PO + user dai dien |
| **I** | Integrate — tich hop | Ket noi TOS/CRM/SSO (neu co) | Dev + DevOps |
| **J** | Judgment — GO/NO-GO | Quyet dinh release | PM + Sponsor |
| **K** | Kickoff go-live | Deploy + giam sat 0–2h | DevOps |
| **L** | Live — van hanh | SLO, ticket, hypercare | Ops / CS |
| **M** | Monitor — sau 24–48h | Metric on dinh | DevOps/SRE |
| **N** | Note — dong / hoc | Lesson learned / cap nhat risk | PM |

Hai case duoi day **dien chi tiet** vao cac buoc A–N (co the bo bot buoc neu du an nho).

---

## 2. So sanh nhanh hai nghiep vu

| Khia canh | Case 1: Container — ha bai / xuat tau (noi bo cang) | Case 2: Do lead CRM |
|---|---|---|
| Muc tieu kinh doanh | Giam thoi gian / loi khi nhan container tu tau xuong bai va lam thu tuc xuat | Phan bo lead dung nguoi, dung thoi han, giam tranh chap gianh lead |
| User chinh | Dieu bo bai, cong vu tau, lai xe, gate, khach / forwarder | SDR, AE, Sales Manager, Marketing Ops |
| He thong cot loi | TOS/yard/gate/EIR (he thong cang) | CRM + (optional) CDP, calendar, telephony |
| Rui ro lon | Sai vi tri bai, sai container, seal/hazmat, tich hop tau delay | Trung lead, rule sai vung, khong SLA goi lai |
| Bang chung UAT | Quet container, in EIR, luong gate | Lead test vao queue, log phan bo, email thong bao |

---

## 3. Case 1 — Nghiep vu container: tu tau xuong bai den xuat (minh hoa A–N)

**Gia dinh:** Ben A trien khai module ho tro **dien bo container ha tau xuong bai**, **ghi nhan vi tri block/bay**, va **chuan bi luong gate-out xuat** (lien ket booking/EIR — minh hoa).

### A — Tiep nhan

- Ticket: "Can mobile ghi nhan vi tri ha bai ngay khi cau tau dat container xuong."
- Phan loai: **new feature**; muc do: **cao** (anh huong truc tiep luong tau-bai-xe).

### B — BA thu thap (tom tat can co)

- [ ] **As-is:** Hien ghi tay radio + Excel — de trung so / mat trace.
- [ ] **To-be:** Quet barcode/QR container -> he thong de xuat **block-bay-row-tier**; dong bo trang thai `YARDED` (ten trang thai minh hoa).
- [ ] **Stakeholder:** Dieu bo bai, cong vu tau, gate security, IT cang, dai dien hang tau (quan sat UAT).
- [ ] **Out-of-scope:** Khong lam thay thi hoan toan TOS core; chi **tich hop API** doc trang thai container + ghi vi tri.
- [ ] **Du lieu:** So container, so booking/BL (neu xuat), **hazmat** flag — rule xu ly rieng (tham khao nghiep vu noi bo).

Tham chiieu day du: [Checklist BA](../02-governance/checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) §2–§5.

### C — Tieu chap nhan (vi du)

- 100% container ha trong ca UAT co **vi tri bai** sau khi xac nhan.
- Khong ghi nhan duoc **hai vi tri song song** cho cung mot container (khoa logic).
- Thoi gian dong bo trang thai tu TOS **<= X giay** (thoa thuan).

### D — Thiet ke ky thuat (vi du)

- API doc: `GET /container/{id}/status`; `POST /yard-placement` (payload: vi tri, thoi diem, nguoi thao tac).
- Mobile: offline queue + sync (neu song sat bo bai).
- Audit log: ai dat container o dau.

### E — Uoc luong & rui ro

- Rui ro: mat mang bo bai; sai mapping ma tau; **can rollback** cau hinh phan bo.
- Ghi [Risk register](../02-governance/risk_register.md) neu co policy noi bo.

### F — Lap trinh

- Feature flag theo **bai thu nhat**; map ticket F-01…

### G — QA ky thuat

- Test dong bo loi API TOS; test trung vi tri; test hazmat canh bao (neu co rule).

### H — UAT nghiep vu

- Kich ban: 5–10 container thu; dieu bo + cong vu tau + **1 lai xe** thu gate-out (neu trong pham vi).
- Bien ban: [UAT checklist](../02-governance/uat_checklist.md).

### I — Tich hop

- Ket noi moi truong **staging TOS**; xac thuc quyen service account.

### J — GO/NO-GO

- Kiem [Go-live checklist](../02-governance/go_live_checklist.md); co **ke hoach rollback** neu dong bo sai hang loat.

### K — Go-live

- Bat flag theo ca; **hypercare** 24–48h voi dieu bo.

### L–N — Van hanh & hoc

- SLO: ti le dong bo loi, thoi gian ghi nhan TB; sau dot ca: **lesson learned** (vi du: can them double-scan seal).

---

## 4. Case 2 — Do lead trong CRM (minh hoa A–N)

**Gia dinh:** Ben A trien khai **rule phan bo lead** (round-robin theo vung + cap do uu tien campaign + cap Sales Manager override).

### A — Tiep nhan

- Ticket: "Lead tu form web + ads vao chung queue; tranh 2 AE cung goi 1 lead."
- Phan loai: **new feature** + **CR** sau do (neu them nguon lead).

### B — BA thu thap

- [ ] **Nguon lead:** Form, LinkedIn, partner CSV, event — **format field** chuan (ten, SDT, email, company, campaign).
- [ ] **Rule:** Vung (geo), ngon ngu, san pham quan tam; **dedupe** theo email+SĐT trong X ngay.
- [ ] **SLA:** "SDR goi trong 15 phut" hay "AE nhan trong 4h" — **do duoc**.
- [ ] **Override:** Sales Manager keo lead cho AE (log ly do).
- [ ] **Out-of-scope:** Khong lam CDP day du; chi CRM.

Tham chiieu: [Checklist BA](../02-governance/checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) §5.2 (domain/chatbot) **thay bang** "queue lead + rule + SLA".

### C — Tieu chap nhan (vi du)

- Lead moi **dung mot** owner tai moi thoi diem trong CRM.
- Email/notify **AE + SDR** dung template; khong lo **PII** ra ngoai log (tham khao SDD bao mat).

### D — Thiet ke

- Object model: Lead/Queue/AssignmentRule/Audit.
- Tich hop **email service** + (optional) **calendar** slot.

### E — Uoc luong

- So luong lead/ngay uoc; **quota API** email; rui ro **sai timezone** SLA.

### F — Lap trinh

- Job dinh ky + real-time trigger; idempotent khi duplicate webhook.

### G — QA

- 50 lead gia lap: dedupe, phan vung sai, override manager, fail email retry.

### H — UAT

- SDR/AE/Manager dung **tai khoan test**; kich ban "2 nguoi cung claim" phai **khong xay ra**.

### I — Tich hop

- Form marketing -> CRM; **OAuth** CRM prod/staging tach biet.

### J–N

- GO/NO-GO theo checklist; go-live; metric: **time-to-first-call**, **% lead unassigned qua nguong**; lesson learned (vi du: can UI hien thi "ly do khong phan bo duoc").

---

## 5. Bang anh xa: buoc A–N -> tai lieu trong thu vien

| Buoc | Tai lieu / checklist goi y |
|---|---|
| A | [Quy trinh tiep nhan](../02-governance/quy_trinh_tiep_nhan_yeu_cau.md) |
| B | [Checklist BA](../02-governance/checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) |
| C–D | [Khung kiem soat](../02-governance/kiem_soat_hoan_chinh_vu_viec_nghiep_vu.md) §9.1–9.2; [SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md) |
| E–F | [Quy trinh quan ly du an](../02-governance/quy_trinh_quan_ly_du_an.md) §4–6; [Comment policy](../02-governance/comment_policy.md) |
| G–H | [UAT checklist](../02-governance/uat_checklist.md); [Sign-off UAT](../03-signoff/uat_sign_off_bien_ban.md) |
| I–K | [Go-live checklist](../02-governance/go_live_checklist.md); [Checklist phan mem theo role](../02-governance/checklist_phan_mem_va_theo_role.md) §1 |
| L–N | [SLA/SLO](../02-governance/slo_sla.md); [Runbook](../02-governance/runbook_incident.md); [Report policy](../02-governance/report_policy.md) |

---

## 6. Ghi chu su dung

- Hai case tren **khong** mo ta dung nghiep vu phap ly tung cang hay tung CRM; team phai **thay the** tieu chi, ten trang thai, va tich hop that.
- Khi viet BRD that, **copy** [Checklist BA](../02-governance/checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) lam phieu lam viec workshop.

---

**Phien ban:** v1.0
