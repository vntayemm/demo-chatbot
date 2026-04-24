# CHECKLIST PHAN MEM VA THEO ROLE - Enterprise Chatbot | AI

Tai lieu **goi y** (suggestive): dung de **tu kiem** va **kiem soat bo sung** truoc / trong / sau trien khai. Tuy du an, bo bot muc khong ap dung; **khong** coi day la hop dong phap ly.

- [Khung kiem soat tong hop](./kiem_soat_hoan_chinh_vu_viec_nghiep_vu.md) — logic owner, RACI, evidence, gate BA/tech/code/test.
- [Checklist thu thap yeu cau BA](./checklist_thu_thap_yeu_cau_nguoi_dung_ba.md) — thu thap nghiep vu truoc khi dien bang §1.4.
- [UAT checklist](./uat_checklist.md) — nghiem thu nghiep vu chi tiet.
- [Go-live checklist](./go_live_checklist.md) — dieu kien len production.

---

## 1. Checklist phan mem — nen tang, moi truong, yeu cau

Dung khi **khoi tao** hoac **truoc go-live** de khong bo sot mat phan mem / ha tang / nghiep vu.

### 1.1 Loai san pham & nen tang (chon mot hoac nhieu)

- [ ] **Web** (browser, responsive, SSO neu can).
- [ ] **Windows desktop** (WPF/WinForms/Electron/… — ghi ro).
- [ ] **Mobile** (iOS / Android / cross-platform — ghi ro).
- [ ] **API / backend only** (khong UI, client tu ben thu ba).
- [ ] **Job/batch** (scheduler, worker — ghi ro).
- [ ] Khac (ghi ro): ___

### 1.2 Moi truong trien khai & vi tri

- [ ] Da xac dinh **moi truong**: dev / staging / production (hoac tuong duong).
- [ ] Co **bang URL / endpoint / region** (neu cloud) luu noi team truy cap duoc.
- [ ] Da ro **ai co quyen** deploy / xem log production.
- [ ] Co **ke hoach rollback** hoac huong xu ly khi deploy loi (tham khao [Go-live checklist](./go_live_checklist.md)).

### 1.3 Yeu cau & phe duyet

- [ ] **Pham vi** va **ngoai pham vi** da van ban hoa va stakeholder **dong y** (hoac sign-off theo muc do rui ro).
- [ ] **Acceptance criteria** da gan voi tung hang muc lon / ticket.
- [ ] **Rui ro** da xem xet ([Risk register](./risk_register.md) neu du an dung).
- [ ] **CR (thay doi pham vi)** da quy trinh neu phat sinh sau baseline ([Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §6).

### 1.4 Kha nang he thong — co yeu cau khong? Da thoa man / phe duyet chua?

Voi moi dong, ghi: **Co / Khong / N/A**; neu **Co** thi danh dau **Da thiet ke + Da test + Da van hanh** (hoac ly do hoan).

| Hang muc | Co yeu cau? | Da phe duyet / thiet ke? | Ghi chu ngan |
|---|---|---|---|
| **Thong bao trong app** (toast/in-app) |  |  |  |
| **Email / SMTP** gui tu he thong |  |  |  |
| **Push / SMS** (mobile) |  |  |  |
| **Logging** (structured, level, retention) |  |  |  |
| **Audit trail** (ai lam gi, luc nao) |  |  |  |
| **Database** (loai, backup, migration) |  |  |  |
| **Cache** (Redis/Memcached/in-memory — muc dich TTL) |  |  |  |
| **Queue / async** |  |  |  |
| **Tich hop API** ben thu ba (auth, rate limit, timeout) |  |  |  |
| **LLM / inference** (provider, model, quota, timeout, fallback khi API loi) |  |  |  |
| **Embedding + vector DB / RAG** (index, top_k, rerank neu co) |  |  |  |
| **Corpus / tri thuc** (format, versioning, quyen so huu noi dung, khong dua PII nhay cam) |  |  |  |
| **Prompt / system prompt** (version, review truoc release, rollback prompt) |  |  |  |
| **Guardrail** (blocklist, gioi do dai, chu de nhay cam, noi dung cam) |  |  |  |
| **Benchmark chat luong / eval** (tap cau hoi regression, nguong PASS) |  |  |  |
| **Ghi nhan nguon / trich dan** (citations, `sources` trong response) |  |  |  |
| **Human-in-the-loop** (escalate khi do tin cay thap / ngoai pham vi) |  |  |  |
| **Artifact model / experiment tracking** (MLflow hoac tuong duong) |  |  |  |
| **File upload** (gioi han size, type, virus scan, storage) |  |  |  |
| **Export** (CSV/PDF/Excel — dung luong, async) |  |  |  |
| **Mau bieu / template** (in, merge field) |  |  |  |
| **Quy trinh phe duyet** (multi-step, escalade) |  |  |  |
| **Phan quyen / RBAC** |  |  |  |
| **Da ngon ngu / timezone** |  |  |  |
| **Gioi han thoi gian / SLA** theo nghiep vu |  |  |  |
| **Ngan sach** (cloud cost, license) da uoc va gioi han |  |  |  |
| **Nguon luc nguoi** (owner tung hang muc, on-call) |  |  |  |

Goi y: voi **chatbot / GenAI**, uu tien dien cac dong LLM, corpus, RAG, guardrail, benchmark truoc cac dong UI thuan.

### 1.5 Bao mat & van hanh (goi y nhanh)

- [ ] TLS / HTTPS cho kenh nguoi dung; secret khong hard-code.
- [ ] Khong log **PII / token** tranh du ([SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md) §6).
- [ ] **Monitoring**: metric canh bao (latency, 5xx, queue depth…).
- [ ] **SLO/SLA** da thong nhat voi stakeholder ([SLA/SLO](./slo_sla.md)).

---

## 2. Inspection list theo role (goi y)

Moi role: **truoc khi ket thuc sprint / dot UAT / release**, owner tu danh dau; PM co the tong hop.

### 2.1 Sponsor / Business Owner

- [ ] Muc tieu kinh doanh va **uu tien** da truyen dat cho PM/PO.
- [ ] **GO/NO-GO** hoac uy quyen phe duyet da ro khi vu viec lon / chi phi vuot nguong.
- [ ] Da biet **ai la nguoi chap nhan cuoi** cho nghiep vu (UAT dai dien).

### 2.2 PM (Project Manager)

- [ ] **Scope / timeline / risk** cap nhat tren cong cu (ticket/board/report).
- [ ] **Stakeholder** va **RACI** khong de trong o hang muc dang chay.
- [ ] **Phu thuoc** (noi bo + ben thu ba) da liet ke va co owner theo doi.
- [ ] **Bao cao** dinh ky theo [Report policy](./report_policy.md) (neu ap dung).
- [ ] **CR** da vao quy trinh neu lech pham vi ([Quy trinh quan ly du an](./quy_trinh_quan_ly_du_an.md) §6).

### 2.3 PO / BA

- [ ] **Acceptance criteria** tren moi story/ticket lon **do duoc** (khong mo ho).
- [ ] **Happy path + edge cases** da neu cho QA/UAT.
- [ ] **Du lieu mau / kich ban UAT** da chuan bi hoac yeu cau ro tu nghiep vu.
- [ ] Sau UAT: **ket luan** va feedback da luu (link bien ban / ticket).

### 2.4 Tech Lead

- [ ] **Thiet ke / API / luong du lieu** khop pham vi; lien ket SDD hoac ADR ngan ([SDD](../04-architecture/tai_lieu_thiet_ke_he_thong.md)).
- [ ] **Rui ro ky thuat** (performance, bao mat, no debt lon) da ghi va co huong xu ly hoac chap nhan ro rang.
- [ ] **Review** PR nhay cam / thay doi kien truc da thuc hien.
- [ ] **Tieu chi chat luong ky thuat** (latency, error rate, retrieval) da thong nhat voi team neu lien quan chatbot.
- [ ] **RAG / LLM**: thay doi corpus hoac prompt **co ke hoach kiem thu** va **phien ban / trace** (tranh doi tac dong tren production khong luu vet).

### 2.5 Developer (Backend / Frontend / Full-stack)

- [ ] Code **map** ticket; PR co mo ta + link thiet ke khi can.
- [ ] **Self-review**: style, loi ro, khong log bi mat, xu ly loi ro rang.
- [ ] **Test toi thieu** (unit/integration/manual script) da chay truoc khi giao QA.
- [ ] **Migration / config** moi da ghi trong README hoac runbook noi bo.
- [ ] Neu cham **LLM / embedding**: khong commit key; feature flag hoac gioi quota khi can.

### 2.6 QA / Tester

- [ ] Co **ke hoach test** ngan: pham vi, moi truong, du lieu, ngay bat dau/ket thuc.
- [ ] **Bao cao loi**: buoc tai hien, muc do, log/screenshot — tuan thu khong dinh PII.
- [ ] **Regression** sau fix cho vung anh huong.
- [ ] Ho tro **UAT**: huong dan user, ghi nhan PASS/FAIL theo [UAT checklist](./uat_checklist.md).
- [ ] **Regression chatbot**: tap cau hoi co dinh (theo domain) chay lai sau doi retrieval/prompt/model.

### 2.7 DevOps / SRE

- [ ] **Pipeline** build/deploy; quyen truy cap moi truong da kiem soat.
- [ ] **Secret** qua env/secret manager; khong commit file nhay cam.
- [ ] **Monitoring + alert** (neu production) da noi ten nguoi nhan alert.
- [ ] **Backup / restore** DB (neu co) da thu hoac co ke hoach.
- [ ] **Runbook** incident team biet vi tri ([Runbook incident](./runbook_incident.md)).
- [ ] **Quota / rate limit** phia LLM provider (neu co) da ghi nhan va canh bao khi gan tran.

### 2.8 Customer Success / Support (neu co)

- [ ] Kenh **tiep nhan** va **SLA tra loi** khach da ro ([Chinh sach bao tri](./chinh_sach_bao_tri.md) neu goi support).
- [ ] **FAQ / huong dan** ngan cho loi thuong gap da cap nhat sau release lon.

### 2.9 Security / Compliance (neu co vai tro rieng hoac Tech Lead kiem)

- [ ] **Phan quyen**, session, audit theo yeu cau hop dong.
- [ ] **DPA / luu tru du lieu** (neu GDPR / local law) da xem voi phap che.
- [ ] **Pen-test / scan** (neu bat buoc) da len lich truoc go-live.

---

## 3. Cach dung nhanh trong du an that

1. **Lap §1** mot lan cho moi san pham / major release — luu thanh file hoac trang wiki du an.
2. **Moi sprint**: moi role chi can quet **§2** tuong ung 5–10 phut.
3. Truoc **go-live**: ghep §1.4 + [Go-live checklist](./go_live_checklist.md) + [UAT checklist](./uat_checklist.md).

---

**Phien ban:** v1.1  
**Ghi chu:** Bang §1.4 da co nhom **LLM / RAG / corpus / guardrail / benchmark**; van co the them cot (vi du: owner ky thuat) tuy du an.
