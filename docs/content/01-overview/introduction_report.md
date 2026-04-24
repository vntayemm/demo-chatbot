# BAO CAO TOM TAT DU AN Enterprise Chatbot | AI

## 1. Tong quan

`demo-chatbot` la du an chatbot hoi dap cho nghiep vu CRM, gom 2 nhom chuc nang chinh:

- `Price bot`: tu van goi gia san pham.
- `Guide bot`: huong dan cai dat va su dung.

Muc tieu cua du an:

- Tao prototype nhanh de kiem chung bai toan hoi dap theo tai lieu.
- Xay nen tang co the nang cap len moi truong production.

## 2. Kien truc va thanh phan chinh

He thong theo mo hinh client-server:

- `frontend/` (Vue): giao dien nhap cau hoi va hien thi cau tra loi.
- `backend/` (FastAPI): xu ly request, truy xuat ngu canh, tao phan hoi.
- `corpus` (CSV/Markdown): nguon tri thuc cho tung domain.
- `MLflow`: theo doi model va log van hanh.

Luong xu ly:
1. Nguoi dung gui cau hoi tren frontend.
2. Frontend goi API (`/chat/price` hoac `/chat/guide`).
3. Backend tim ngu canh lien quan bang semantic search.
4. He thong lay `top_k` ngu canh de tao cau tra loi.
5. Ket qua tra ve frontend.

## 3. Cong nghe su dung va ly do lua chon

- `FastAPI`: hieu nang tot, de mo rong endpoint, phu hop API chat.
- `Vue.js`: nhe, de trien khai giao dien test/demo nhanh.
- `Semantic Search`: phu hop bai toan hoi dap theo tai lieu noi bo.
- `CSV/Markdown Corpus`: de cap nhat noi dung, tach tri thuc khoi code.
- `MLflow`: theo doi vong doi model, log va danh gia van hanh.

Ket luan: stack hien tai can bang giua toc do phat trien, kha nang mo rong va kha nang van hanh.

## 4. Moi truong su dung va yeu cau toi thieu

Moi truong phat trien:

- OS: macOS, Linux hoac Windows.
- Python `3.10+`, `venv`, `uvicorn`.
- Frontend test bang `python -m http.server`.
- MLflow local port `5001` (khuyen nghi bat).

Yeu cau phan cung toi thieu:

- Local demo: 4 cores, 8 GB RAM (khuyen nghi 16 GB), 10 GB disk.
- Production nho: 4-6 vCPU, 8-10 GB RAM.

Sizing tham chieu:

- 10 user dong thoi: ~4 vCPU, ~7 GB RAM.
- 50 user dong thoi: ~7 vCPU, ~13-14 GB RAM.
- 200 user dong thoi: ~12-18 vCPU, ~22-36 GB RAM.

## 5. Huong dan cai dat va trien khai

### Cai dat local

**1. Backend**

```bash
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

**2. MLflow (tuy chon)**

Chay trong terminal khac (hoac sau khi da `cd backend` va kich hoat `.venv`):

```bash
mlflow server --host 127.0.0.1 --port 5001
```

**3. Frontend**

```bash
cd frontend
python3 -m http.server 5173
```

Mo trinh duyet tai: [http://127.0.0.1:5173](http://127.0.0.1:5173)

Goi y trien khai production:

- Dong goi backend thanh container.
- Trien khai frontend static qua Nginx/static hosting.
- Dat reverse proxy/API Gateway, bat TLS.
- Cau hinh giam sat (CPU, RAM, p95 latency, error rate).

## 6. Kha nang tich hop

He thong co kha nang tich hop cao theo huong API-first:

- CRM/ERP noi bo.
- Kenh chat: web widget, Slack, Teams, Telegram, Zalo OA.
- Helpdesk: goi y cau tra loi cho agent, handoff khi bot khong xu ly duoc.
- He thong monitoring/logging (ELK, Grafana, Datadog).
- Bao mat doanh nghiep: JWT/OAuth2/SSO, API Gateway, RBAC.

## 7. Bao mat

Nhom yeu cau bao mat can ap dung:

- Xac thuc va phan quyen cho endpoint production.
- Bao ve API bang TLS, rate limit, timeout, CORS whitelist.
- Bao mat du lieu: khong log thong tin nhay cam, quan ly secret an toan.
- Giam sat va audit log cho hanh dong quan trong.
- Van hanh an toan: cap nhat dependency, backup, quy trinh ung pho su co.

## 8. Danh gia tong quan

Uu diem:

- Kien truc ro rang, de bao tri va mo rong.
- Toc do trien khai nhanh, chi phi ban dau hop ly.
- Phu hop bai toan hoi dap theo tai lieu nghiep vu.

Han che:

- Chat luong phu thuoc manh vao corpus.
- Chua co benchmark/evaluation tu dong day du.
- Frontend hien tai chu yeu phuc vu test/demo.

Huong cai tien uu tien:

- Nang cap retrieval (hybrid, re-ranking, query rewrite).
- Bo sung bo benchmark va feedback loop nguoi dung.
- Toi uu hieu nang, cache va scale ngang backend.
- Chuan hoa bao mat van hanh theo checklist go-live.

## 9. Lo trinh phat trien 3 giai doan

- `1-3 thang`: on dinh nen tang, chuan hoa corpus, dat baseline metric.
- `3-6 thang`: cai thien chat luong tra loi, tich hop he thong nghiep vu dau tien.
- `6-12 thang`: san pham hoa, autoscaling, observability day du, bao mat enterprise.

KPI khuyen nghi:

- p95 latency: < 2.0s (muc trung binh).
- API error rate: < 1%.
- Uptime production: >= 99.9%.
- Ti le cau tra loi dung ngu canh (benchmark noi bo): >= 85% o giai doan production.

## 10. Risk register (rui ro, muc do, phuong an giam thieu)

- **R1 - Chat luong corpus khong dong nhat**
  - **Muc do:** Cao
  - **Tac dong:** Cau tra loi sai ngu canh, giam do tin cay he thong
  - **Giam thieu:** Chuan hoa quy trinh cap nhat corpus, review 2 lop (BA + AI), versioning tai lieu

- **R2 - Do tre API tang khi luong truy cap cao**
  - **Muc do:** Cao
  - **Tac dong:** Giam trai nghiem nguoi dung, tang ty le roi bo
  - **Giam thieu:** Bat cache cho truy van lap lai, scale ngang backend, load test dinh ky

- **R3 - Lo thong tin nhay cam qua log/telemetry**
  - **Muc do:** Cao
  - **Tac dong:** Vi pham bao mat va quy dinh du lieu
  - **Giam thieu:** Masking log, cam ghi token/PII, soat quyen truy cap log, audit dinh ky

- **R4 - Phu thuoc manh vao mot kenh tich hop**
  - **Muc do:** Trung binh
  - **Tac dong:** Gian doan dich vu khi kenh ngoai thay doi API
  - **Giam thieu:** Thiet ke adapter layer, fallback kenh web chat, test tuong thich theo phien ban

- **R5 - Drift chat luong theo thoi gian**
  - **Muc do:** Trung binh
  - **Tac dong:** Giam do chinh xac, tang ticket ho tro
  - **Giam thieu:** Theo doi chi so quality theo thang, bo sung feedback loop, retrain/reindex theo chu ky

- **R6 - Trien khai thay doi khong co rollback ro rang**
  - **Muc do:** Trung binh
  - **Tac dong:** Keo dai downtime khi phat sinh su co
  - **Giam thieu:** Chuan hoa release checklist, blue-green/canary, runbook rollback 15 phut

## 11. Test plan va UAT checklist

### 11.1 Test plan (ky thuat)

Checklist chi tiet va tieu chi pass/fail nam trong: [UAT checklist](../02-governance/uat_checklist.md) va [Go-live checklist](../02-governance/go_live_checklist.md). Duoi day la muc luc ky thuat tom tat (dang task list de dong bo voi muc 11.2).

#### Functional test

- [ ] Kiem tra endpoint `/chat/price` va `/chat/guide` voi bo cau hoi chuan
- [ ] Kiem tra dau vao loi: rong, qua dai, ky tu dac biet, `top_k` ngoai nguong

#### Integration test

- [ ] Kiem tra luong frontend -> backend -> retrieval -> response
- [ ] Kiem tra tich hop logging/MLflow va metric thu duoc

#### Performance test

- [ ] Benchmark 10/50/200 concurrent users
- [ ] Theo doi p95 latency, throughput, error rate

#### Security test

- [ ] Kiem tra auth, RBAC, CORS, rate limit, TLS
- [ ] Kiem tra khong lo secret/PII trong log

#### Regression test

- [ ] Chay lai bo test sau moi lan cap nhat corpus, retrieval, hoac release backend

### 11.2 UAT checklist (nghiep vu)

- [ ] Cau tra loi dung noi dung nghiep vu cho 20 cau hoi mau/nhom bot
- [ ] Cau tra loi co ngu canh ro rang, khong mo ho, khong sai chinh sach
- [ ] Ty le phan hoi chap nhan duoc bo phan nghiep vu >= 85%
- [ ] Thoi gian phan hoi trung binh dat muc chap nhan trong gio cao diem
- [ ] Luong handoff sang nhan vien (neu co) hoat dong dung
- [ ] Log truy vet day du cho cac phien UAT
- [ ] Cac loi nghiem trong (sev1/sev2) da dong truoc go-live

Tieu chi pass UAT de go-live:

- Khong con loi sev1
- Loi sev2 con lai co workaround ro rang va da co ke hoach fix
- Dat nguong chat luong nghiep vu va nguong hieu nang da thong nhat

## 12. SLA/SLO cho production

### 12.1 SLA de xuat (cam ket dich vu)

- **Do san sang dich vu hang thang:** >= 99.9%
- **Thoi gian phan hoi su co**
  - P1: phan hoi <= 15 phut, khoi phuc tam thoi <= 2 gio
  - P2: phan hoi <= 1 gio, khoi phuc <= 8 gio
  - P3: phan hoi <= 4 gio lam viec, xu ly trong 3 ngay lam viec

### 12.2 SLO ky thuat de xuat

- **Latency**
  - p95 <= 2.0s (tai tai trong thiet ke)
  - p99 <= 3.0s
- **Reliability**
  - API error rate (5xx) <= 1%/thang
  - Ti le timeout <= 0.5%/thang
- **Quality**
  - Ti le cau tra loi dung ngu canh (tap benchmark noi bo) >= 85%
  - Ty le phan hoi can handoff khong mong muon <= 10%

### 12.3 Do luong va quan tri SLO

- Theo doi qua dashboard theo ngay/tuan/thang.
- Dat alert theo nguong canh bao som (80% budget loi).
- Neu vi pham SLO 2 chu ky lien tiep: dung rollout tinh nang moi, uu tien on dinh he thong.
