# TAI LIEU PHAN TICH YEU CAU (BRD/SRS RUT GON) - DEMO-CHATBOT

## 1. Muc dich

Tai lieu nay mo ta nhu cau nghiep vu, yeu cau chuc nang va phi chuc nang cho he thong `demo-chatbot`, lam co so cho:
- Thiet ke giai phap
- Lap ke hoach trien khai
- UAT va nghiem thu

## 2. Pham vi du an

Trong pham vi:
- Chatbot hoi dap theo 2 domain:
  - `Price bot` (tu van goi gia)
  - `Guide bot` (huong dan cai dat/su dung)
- Giao dien web de nguoi dung hoi dap
- API backend xu ly retrieval va tra ket qua
- Bo tai lieu van hanh: UAT, go-live, risk, SLO/SLA, runbook

Ngoai pham vi (giai doan hien tai):
- Phat trien full production UX nang cao
- Tich hop sau voi tat ca he thong ben thu ba
- Chung nhan compliance chinh thuc

## 3. Stakeholders

- Sponsor/Business Owner
- Product Owner/BA
- End user (sales, CS, van hanh)
- IT/Ops team
- Security/Compliance representative
- Delivery team (PM, Backend, AI, QA, DevOps)

## 4. Van de nghiep vu can giai quyet

- Nguoi dung hoi dap thong tin gia/goi va huong dan nghiep vu mat thoi gian tim tai lieu.
- Thong tin tra loi khong dong nhat giua cac nhan su.
- Kho do luong chat luong va hieu qua chatbot khi dua vao van hanh.

## 5. Muc tieu nghiep vu

- Giam thoi gian tra loi cau hoi lap lai.
- Chuan hoa noi dung tra loi theo corpus nghiep vu.
- Dat duoc KPI van hanh co the do luong:
  - p95 latency
  - 5xx error rate
  - ty le tra loi dung ngu canh

## 6. Nhom nguoi dung va use cases chinh

### 6.1 Nhom nguoi dung

- Nguoi dung nghiep vu noi bo
- Quan tri van hanh he thong
- QA/UAT team

### 6.2 Use cases

- UC01: Hoi goi gia phu hop theo quy mo doanh nghiep
- UC02: Hoi thong tin gia, uu dai, chinh sach
- UC03: Hoi huong dan thao tac co ban trong he thong
- UC04: Test/kiem tra API de nghiem thu
- UC05: Theo doi chi so van hanh va xu ly su co

## 7. Yeu cau chuc nang (Functional Requirements)

| ID | Yeu cau | Muc uu tien |
|---|---|---|
| FR-01 | He thong nhan cau hoi tu frontend va goi backend API | Must |
| FR-02 | Ho tro 2 endpoint domain: `/chat/price`, `/chat/guide` | Must |
| FR-03 | Truy xuat ngu canh lien quan tu corpus va tra ket qua | Must |
| FR-04 | Ho tro tham so `top_k` de dieu chinh so ngu canh lay ra | Should |
| FR-05 | Hien thi cau tra loi tren giao dien web | Must |
| FR-06 | Co kha nang test nhanh bang `curl`/API | Must |
| FR-07 | Co tai lieu UAT/go-live/sign-off cho nghiem thu | Must |
| FR-08 | Co runbook xu ly su co P1/P2/P3 | Should |

## 8. Yeu cau phi chuc nang (Non-Functional Requirements)

| ID | Yeu cau | Target de xuat |
|---|---|---|
| NFR-01 | Do san sang dich vu | >= 99.9%/thang |
| NFR-02 | Do tre phan hoi | p95 <= 2.0s |
| NFR-03 | Ty le loi he thong | 5xx <= 1% |
| NFR-04 | Bao mat truyen tin | TLS/HTTPS |
| NFR-05 | Bao mat truy cap | Auth/RBAC (production) |
| NFR-06 | Kha nang truy vet | Logging + audit trail |
| NFR-07 | Kha nang mo rong | Scale ngang backend |

## 9. Gia dinh va rang buoc

Gia dinh:
- Corpus duoc cap nhat va phe duyet boi dau moi nghiep vu.
- Khach hang bo tri dau moi tham gia UAT va sign-off.

Rang buoc:
- Timeline phu thuoc muc do phoi hop va du lieu dau vao.
- Cac tich hop ben thu ba can danh gia rieng.

## 10. Tieu chi chap nhan (Acceptance Criteria)

- UAT pass >= 95% test case.
- Khong con loi Sev1 truoc go-live.
- Cac loi Sev2 con lai co workaround + deadline fix.
- Dat cac KPI toi thieu da thong nhat.
- Co bien ban UAT sign-off va Go-live sign-off.

## 11. Rui ro nghiep vu chinh

- Corpus thieu hoac khong dong nhat -> tra loi sai ngu canh.
- Nguoi dung ky vong qua cao so voi pham vi hien tai.
- Thieu dau moi xac nhan nghiem thu dung han.

Huong giam thieu:
- Chuan hoa corpus + benchmark bo cau hoi.
- Chot ro in-scope/out-of-scope ngay kickoff.
- Chot owner nghiem thu va SLA phan hoi.

## 12. Truy vet tai lieu lien quan

- [Tai lieu thiet ke he thong (SDD)](./tai_lieu_thiet_ke_he_thong.md)
- [Ke hoach du an / Gantt](../05-execution/project_plan_gantt.md)
- [UAT checklist](../02-governance/uat_checklist.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
- [Mau sign-off](../03-signoff/sign_off_template.md)
