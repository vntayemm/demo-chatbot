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
- **Day chuyen giao hang** (phan tich nghiep vu -> phan tich ky thuat -> lap trinh -> test -> UAT) — xem **§9**.

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
| Phan tich nghiep vu (BA) | Pham vi, tieu chap nhan, stakeholder dong thuan | §9.1, [Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §4.2, [Team profile](../05-execution/team_profile.md) |
| Phan tich ky thuat | Thiet ke on dinh, rui ro da ghi nhan | §9.2, [SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md) |
| Lap trinh | Code map voi yeu cau, review, traceability | §9.3, [Comment policy](./comment_policy.md), [Pipeline](./pipeline_theo_tung_nhom_thanh_vien.md) |
| Test / QA | Bang chung test, bao cao, chan loi som | §9.4, [UAT checklist](./uat_checklist.md), [Report policy](./report_policy.md) |

## 5. RACI toi thieu (mau ap dung cho moi vu viec)

Truoc khi bat dau xu ly (hoac trong 30 phut dau voi incident), dien bang ngan:

| Hang muc | R (thuc hien) | A (phe duyen) | C (tu van) | I (duoc bao tin) |
|---|---|---|---|---|
| Phan loai muc do / uu tien |  |  |  |  |
| Ky thuat / fix / trien khai |  |  |  |  |
| Kiem chung / UAT / QA |  |  |  |  |
| Phan tich nghiep vu (BA) |  |  |  |  |
| Phan tich / thiet ke ky thuat |  |  |  |  |
| Lap trinh / code review |  |  |  |  |
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

- [Vi du case A–Z (container cang & do lead CRM)](../01-overview/vi_du_case_az_container_va_crm_lead.md) — minh hoa vong doi A–N cho hai nghiep vu khac nhau.
- [Checklist phan mem + inspection theo role](./checklist_phan_mem_va_theo_role.md) — nen tang (web/desktop/mobile…), bang kha nang he thong (mail, log, DB, cache…), checklist goi y **tung role**.
- [Operations index](./operations_index.md) — thu tu doc tai lieu va onboarding.
- [Pipeline theo nhom thanh vien](./pipeline_theo_tung_nhom_thanh_vien.md) — luong cong viec theo vai tro.
- [Comment policy](./comment_policy.md) — neu vu viec lien quan review / blocker release.

## 9. Kiem soat phan tich nghiep vu, ky thuat, lap trinh va test

Bon lop nay la **xuong song** cua giao hang phan mem truoc UAT/go-live. Moi lop can cung mot logic: **owner (A)**, **dau ra do duoc**, **bang chung luu ticket/tai lieu**, **tieu chap nhan** khong mo ho.

### 9.1 Kiem soat phan tich nghiep vu (BA / PO)

**Muc tieu:** Khong thieu stakeholder, khong thieu tieu chap nhan, khong de yeu cau mo ho xuong ky thuat.

| Cot | Noi dung kiem soat |
|---|---|
| Owner | **PO/BA** chiu trach nhiem **A** cho pham vi nghiep vu va acceptance criteria (tham khao [Team profile](../05-execution/team_profile.md)). |
| Dau vao | Yeu cau da qua [Tiep nhan](./quy_trinh_tiep_nhan_yeu_cau.md); da xac dinh stakeholder va uu tien. |
| Dau ra | User story / ticket ro; **acceptance criteria** kiem tra duoc (Given/When/Then hoac bang dieu kien PASS/FAIL); ngoai pham vi ghi ro. |
| Bang chung | Link ticket, bien ban workshop, email/tin nhan theo policy; cap nhat [Risk](./risk_register.md) neu phat hien rui ro nghiep vu. |
| Gate truoc code | Tech Lead/PM xac nhan: *da du thong tin de uoc luong va thiet ke* — tranh lap trinh khi BA chua dong. |

**Checklist ngan:**

- [ ] Da dien day du [Checklist thu thap yeu cau BA](./checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) (hoac tuong duong) cho epic / du an.
- [ ] Stakeholder **phe duyet** pham vi va uu tien (hoac ghi ro "tam thoi chap nhan" voi han review).
- [ ] Moi tieu chap nhan gan voi **mot nguoi kiem** (PO/BA hoac dai dien nghiep vu).
- [ ] Cac truong hop bien / ngoai le da duoc **liet ke** (khong chi happy path).

### 9.2 Kiem soat phan tich ky thuat (Tech / thiet ke)

**Muc tieu:** Thiet ke va quyet dinh ky thuat duoc ghi lai, co the truy vet, rui ro duoc lam ro truoc khi code lon.

| Cot | Noi dung kiem soat |
|---|---|
| Owner | **Tech Lead** thuong giu **A** cho quyet dinh kien truc / trade-off (tham khao [Team profile](../05-execution/team_profile.md)). |
| Dau vao | Acceptance criteria tu BA; rang buoc phi chuc nang (SLO, bao mat, hieu nang) neu co. |
| Dau ra | Thiet ke muc hop ly: API, luong du lieu, mo hinh loi, phuong an rollback khi can — **can bang** giua do sau va toc do; tham chieu [SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md). |
| Bang chung | ADR ngan / muc SDD cap nhat / comment tren ticket; lien ket commit hoac PR sau nay. |
| Gate truoc code | Da ro **phien ban API**, **phan tach module**, **diem tich hop**; khong con "chua biet lam gi" o phan cot loi. |

**Checklist ngan:**

- [ ] Da danh gia tac dong len **corpus / retrieval / latency** (voi chatbot).
- [ ] Da xac dinh **log/metric** can co de quan sat sau trien khai.
- [ ] Neu thay doi pham vi: da chay quy trinh **CR** ([Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §6).

### 9.3 Kiem soat lap trinh (Implementation)

**Muc tieu:** Code khop yeu cau, co review, co the lien ket nguoc ve ticket/thiet ke.

| Cot | Noi dung kiem soat |
|---|---|
| Owner | **Dev** (R) thuc hien; **Tech Lead** (A/C) tuy do phuc tap — review bat buoc truoc merge theo [Comment policy](./comment_policy.md). |
| Dau vao | Ticket + thiet ke / API da chot; branch theo quy uoc team. |
| Dau ra | PR merge; build/deploy staging (neu quy trinh co); khong de TODO silent trong nhanh release. |
| Bang chung | PR link, mo ta PR, checklist self-review; trich dan ticket ID. |
| Gate truoc test | CI (neu co) pass; khong merge khi blocker anh huong UAT da neu trong comment policy. |

**Checklist ngan:**

- [ ] Moi PR **map** ro toi ticket / yeu cau.
- [ ] Da self-review theo tieu chi team (style, test toi thieu, khong log bi mat).
- [ ] Da co **it nhat mot** nguoi khac xem (peer hoac Tech Lead) truoc merge len nhanh chinh.

### 9.4 Kiem soat test (QA / kiem thu)

**Muc tieu:** Phat hien loi som theo lop test phu hop; UAT la lop **nghiep vu**, khong thay the het test ky thuat.

| Lop | Vai tro | Kiem soat toi thieu |
|---|---|---|
| Test ky thuat (QA dev) | QA / Dev | Smoke + regression theo pham vi release; ghi nhan phien ban build test. |
| Test tich hop / API | QA / Dev | Luong API, hop dong request/response (tham chieu SDD §5). |
| UAT nghiep vu | PO/BA + user dai dien | Theo [UAT checklist](./uat_checklist.md); ket luan PASS/FAIL co bang chung. |

**Checklist ngan:**

- [ ] Co **ke hoach test** ngan (muc tieu, moi truong, du lieu mau) truoc dot test lon.
- [ ] Loi da phat hien duoc **log ticket** voi muc do, khong chi sua ngam.
- [ ] Sau UAT: bao cao tong hop theo huong dan [Report policy](./report_policy.md) (neu du an ap dung).

### 9.5 Chuoi lien thong bon lop (tom tat)

```text
BA (tieu chap nhan, pham vi)  -->  Tech (thiet ke, rui ro, API)
        -->  Dev (code, review, trace)  -->  QA (test ky thuat)
                -->  UAT (nghiep vu)  -->  Go-live / van hanh
```

Neu bo qua mot lop (vi du: khong co tieu chap nhan BA nhung da code lon), rui ro **thieu sot nghiep vu** hoac **refactor muon** tang manh — khung §2 van ap dung: luon co **dau vao / dau ra / evidence**.

---

**Phien ban:** v1.1  
**Ghi chu:** Khung nay duoc thiet ke de **bo sung** cac checklist chi tiet, khong thay the chung. Khi mau thay doi, cap nhat phien ban va muc "lesson learned" o §6.6.
