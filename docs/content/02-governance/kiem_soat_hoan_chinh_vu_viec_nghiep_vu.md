# KHUNG KIEM SOAT HOAN CHINH - Vu viec / Nghiep vu phan mem

Tai lieu nay tom tat **cach kiem soat mot vu viec hoac mot nghiep vu phan mem** sao cho:

- Khong thieu buoc logic (tu tiep nhan den dong).
- Khong thieu **stakeholder** va **vai tro** (RACI ro rang).
- Khong thieu **bang chung** (evidence) va **sign-off** khi can.
- Gan voi **checklist UAT / go-live** va **runbook** da co trong thu vien tai lieu.

> Day la **khung tong hop (meta-framework)**. Chi tiet tung loai viec nam trong tai lieu chuyen sau; ban luon co the mo checklist tuong ung song song khi lam viec.

## 1. Muc dich va pham vi ap dung

### 1.1 Muc dich

Cung cap mot **bo tieu chuan toi thieu** de mot PM/PO/Tech Lead/QA co the tu hoi: *"Neu bo qua muc nay thi co the thieu sot gi?"* truoc khi coi vu viec la **xong** hoac phan mem la **san sang dung that (production-ready)**.

### 1.2 Pham vi ap dung

Khung nay ap dung cho (va co the tuy bien nhe):

- **Su co van hanh** (incident P1/P2/P3).
- **Thay doi pham vi / yeu cau** (change request, CR).
- **Dot nghiem thu / release** (UAT, go-live, rollback).
- **Kenh tiep nhan** (bug, support, feature — theo quy trinh intake).
- **Khieu nai / khieu kien** (neu lien quan den chat luong hoac cam ket).

## 2. Nguyen tac "khong thieu sot"

### 2.1 Bon tru cot bat buoc

1. **Owner + RACI** — Moi hang muc lon phai co **mot owner** va bang RACI (hoac tuong duong) de biet ai **R/A/C/I**; tranh viec "khong ai chiu trach nhiem cuoi cung".
2. **Dau vao — Dau ra — Tieu chap nhan** — Moi phase phai co **dau vao ro**, **dau ra do duoc**, **tieu chap nhan (acceptance criteria)** co the kiem tra.
3. **Bang chung (evidence)** — Quyet dinh quan trong (GO/NO-GO, dong su co, dong CR) phai co **ghi nhan**: ticket, log, bien ban, email/tin nhan theo policy bao mat.
4. **Dong vong lap hoc tap** — Sau khi ket thuc: **lesson learned** hoac **RCA** (tuy muc do) de giam tai dien.

### 2.2 Khi nao coi la "hoan chinh" cho phan mem dung ngay

Mot nghiep vu / phien ban phan mem duoc coi la **hoan chinh de su dung lien tuc** khi toi thieu:

- Da qua **UAT** theo pham vi da thong nhat va co **ket luan PASS** (hoac dieu kien FAIL da xu ly xong).
- Co **sign-off** theo muc do rui ro (xem [UAT sign-off](../03-signoff/uat_sign_off_bien_ban.md), [Go-live sign-off](../03-signoff/go_live_sign_off_bien_ban.md) khi ap dung).
- **Go-live checklist** da duyet cac muc lien quan trien khai, rollback, giam sat sau release.
- **SLA/SLO** va **runbook** da duoc team van hanh biet va truy cap duoc.
- **Risk register** da cap nhat neu phat sinh rui ro moi hoac dieu kien thay doi.

## 3. Mo hinh 6 phase (map nhanh sang tai lieu)

Lop vong doi chuan trong du an duoc mo ta trong [Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md). Anh xa nhanh:

| Phase (tom tat) | Y nghia kiem soat | Tai lieu tham chieu |
|---|---|---|
| Khoi tao | Stakeholder, scope, co so hop tac | [Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §4.1 |
| Lap ke hoach | KPI, UAT criteria, ke hoach do luong | §4.2, [UAT checklist](./uat_checklist.md) |
| Thuc thi | Build, tich hop, san sang UAT | §4.3 |
| Giam sat & kiem soat | CR, bao cao, lech tien do | §6 CR, [Report policy](./report_policy.md) |
| Nghiem thu & go-live | UAT, GO/NO-GO, rollback | [UAT checklist](./uat_checklist.md), [Go-live checklist](./go_live_checklist.md) |
| Dong du an / van hanh | Handover, tai lieu, lesson learned | §4.6, [Operations index](./operations_index.md) |

## 4. Ban do loai viec -> checklist / runbook trong thu vien

| Loai viec | Muc tieu kiem soat | Mo checklist / tai lieu chinh |
|---|---|---|
| Su co van hanh | Phan loai P, ung pho, dong ticket, RCA khi can | [Runbook incident](./runbook_incident.md), [SLA/SLO](./slo_sla.md), [Chinh sach bao tri](./chinh_sach_bao_tri.md) §6 |
| Tiep nhan yeu cau / bug / feature | Khong mat trace, dung workflow trang thai | [Quy trinh tiep nhan yeu cau](./quy_trinh_tiep_nhan_yeu_cau.md) |
| Nghiem thu nghiep vu | Pass/Fail co tieu chi, co bang chung | [UAT checklist](./uat_checklist.md) |
| Len production | GO/NO-GO, rollback, giam sat sau release | [Go-live checklist](./go_live_checklist.md) |
| Rui ro | Owner, mitigations, dau hieu som | [Risk register](./risk_register.md) |
| Khieu nai | Thoi han, cap do, luu vet | [Quy trinh khieu nai](./quy_trinh_giai_quyet_khieu_nai_khieu_kien.md) |
| Thay doi pham vi | Danh gia tac dong, phe duyet, cap nhat baseline | [Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §6 |

## 5. RACI toi thieu (mau ap dung cho moi vu viec)

Truoc khi bat dau xu ly (hoac trong 30 phut dau voi incident), dien bang ngan:

| Hang muc | R (thuc hien) | A (phe duyen) | C (tu van) | I (duoc bao tin) |
|---|---|---|---|---|
| Phan loai muc do / uu tien |  |  |  |  |
| Ky thuat / fix / trien khai |  |  |  |  |
| Kiem chung / UAT / QA |  |  |  |  |
| Thong bao khach / CS |  |  |  |  |
| Ghi nhan / bien ban / ticket |  |  |  |  |

- **R** co the nhieu nguoi; **A** nen **mot** nguoi de tranh deadlock.
- Voi incident, tham khao vai tro trong [Runbook](./runbook_incident.md) §5 (IC, Tech Lead, DevOps, Communicator, Recorder).

## 6. Checklist tong hop (meta) — truoc khi dong vu viec

Dung bang nay cho **bat ky** vu viec co pham vi ro (incident, CR, go-live, dot UAT lon):

### 6.1 Pham vi va muc tieu

- [ ] Da **mo ta pham vi** va **ngoai pham vi** (out-of-scope) bang van ban.
- [ ] Da **phan loai** (incident P1-P3 / CR / release / khieu nai...).
- [ ] Da gan **ticket ID** hoac so bien ban thong nhat.

### 6.2 Nguoi va trach nhiem

- [ ] Da dien **owner** va **RACI** (hoac bang tuong duong trong du an).
- [ ] Stakeholder **bi anh huong truc tiep** da duoc **bao tin** theo dung tan suat (xem [Report policy](./report_policy.md) neu can).

### 6.3 Thuc thi va bang chung

- [ ] Da luu **bang chung** ky thuat can thiet (log, trace id, phien ban deploy, screenshot — tuan thu khong log PII/token).
- [ ] Da cap nhat **trang thai** tren kenh lam viec (ticket/chat) theo [Quy trinh tiep nhan](./quy_trinh_tiep_nhan_yeu_cau.md).

### 6.4 Kiem chung (UAT / xac nhan nghiep vu)

- [ ] Da chay **tieu chi chap nhan** da thong nhat truoc do.
- [ ] Neu la phan mem user-facing: da tham chieu [UAT checklist](./uat_checklist.md) va ghi nhan **PASS/FAIL**.

### 6.5 Chap thuan va trien khai (neu co release)

- [ ] Da thuc hien [Go-live checklist](./go_live_checklist.md) (neu len production).
- [ ] Co **GO/NO-GO** hoac tuong duong bang van ban / sign-off.

### 6.6 Dong vu viec va hoc tap

- [ ] Da **dong ticket** voi ly do ro; khach / PO xac nhan khi can.
- [ ] Da cap nhat **risk register** neu phat sinh rui ro moi.
- [ ] Voi su co nang: da len lich / hoan thanh **RCA** theo [Runbook](./runbook_incident.md).
- [ ] Rut **lesson learned** (1-3 dong) de cai quy trinh lan sau.

## 7. So sanh nhanh: Incident vs UAT vs Go-live

| Khia canh | Incident | UAT | Go-live |
|---|---|---|---|
| Trong tam | Giam thieu thoi gian ngung / anh huong | Xac nhan dung pham vi nghiep vu | Dieu kien an toan khi mo khoa production |
| Tieu chi ket thuc | Dich vu on, dong su co, RCA (neu can) | UAT PASS + sign-off | GO checklist + giam sat sau release |
| Tai lieu chinh | [Runbook](./runbook_incident.md) | [UAT checklist](./uat_checklist.md) | [Go-live checklist](./go_live_checklist.md) |

## 8. Lien ket bo sung

- [Operations index](./operations_index.md) — thu tu doc tai lieu va onboarding.
- [Pipeline theo nhom thanh vien](./pipeline_theo_tung_nhom_thanh_vien.md) — luong cong viec theo vai tro.
- [Comment policy](./comment_policy.md) — neu vu viec lien quan review / blocker release.

---

**Phien ban:** v1.0  
**Ghi chu:** Khung nay duoc thiet ke de **bo sung** cac checklist chi tiet, khong thay the chung. Khi mau thay doi, cap nhat phien ban va muc "lesson learned" o §6.6.
