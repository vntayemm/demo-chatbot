# Gioi thieu du an Demo Chatbot

`demo-chatbot` la du an mau xay dung chatbot hoi dap cho nghiep vu CRM, tap trung vao 2 nhu cau chinh:
- Tu van gia/goi san pham (`price bot`)
- Huong dan cai dat va su dung (`guide bot`)

Du an duoc tach thanh 2 phan ro rang:
- `backend/`: FastAPI + semantic search + MLflow logging cho qua trinh goi mo hinh
- `frontend/`: giao dien Vue nhe de test nhanh chat flow voi 2 bot

Nguon tri thuc cua chatbot duoc quan ly trong cac file corpus (CSV/Markdown), giup de dang cap nhat noi dung ma khong can sua logic xu ly. Cach to chuc nay giup du an:
- De mo rong theo tung domain noi dung
- De bao tri va cap nhat theo tai lieu nghiep vu
- De quan sat va theo doi qua trinh van hanh mo hinh thong qua MLflow

Du an phu hop de demo prototype chatbot noi bo, thu nghiem retrieval-based Q&A, hoac lam nen tang khoi dau cho san pham chatbot doanh nghiep.

## Kien truc he thong

He thong duoc thiet ke theo mo hinh client-server gon nhe:
- `frontend` (Vue): nhan cau hoi tu nguoi dung, gui request den API va hien thi cau tra loi
- `backend` (FastAPI): nhan request, tim kiem tai lieu lien quan, tao cau tra loi va tra ket qua ve frontend
- `corpus data` (CSV/Markdown): kho tri thuc cho 2 domain `price` va `guide`
- `MLflow`: ghi log model va thong tin van hanh de theo doi chat luong

Luong xu ly chinh:
1. Nguoi dung nhap cau hoi tren giao dien web.
2. Frontend goi endpoint tuong ung (`/chat/price` hoac `/chat/guide`).
3. Backend thuc hien semantic search tren tap tai lieu domain.
4. He thong lay `top_k` ngu canh phu hop de tao cau tra loi.
5. Ket qua duoc tra ve frontend de hien thi cho nguoi dung.

Thiet ke nay tach biet ro lop giao dien, lop nghiep vu API va lop du lieu tri thuc, giup de mo rong them bot moi hoac domain moi ma khong anh huong lon den cau truc hien tai.

## Cong nghe su dung va uu diem

- `FastAPI`:
  - Hieu nang cao, phan hoi nhanh cho API chat.
  - De xay dung endpoint ro rang, de mo rong cho nhieu bot.
- `Vue.js`:
  - Giao dien nhe, de dung de test va demo hoi dap.
  - Thanh phan hoa tot, de bo sung them man hinh hoac tinh nang.
- `Semantic Search`:
  - Tim ngu canh lien quan theo y nghia, khong chi theo tu khoa.
  - Cai thien do chinh xac cau tra loi voi tap tai lieu nghiep vu.
- `CSV/Markdown Corpus`:
  - De cap nhat noi dung boi team nghiep vu.
  - Tach du lieu khoi code, giam rui ro khi thay doi tri thuc.
- `MLflow`:
  - Theo doi phien ban model va log van hanh.
  - Ho tro danh gia, so sanh va cai tien chat luong chatbot theo thoi gian.

Tong the, stack cong nghe nay giup du an can bang tot giua toc do phat trien, kha nang mo rong va kha nang van hanh thuc te trong moi truong doanh nghiep.

## Ly do lua chon stack nay

Du an chon stack hien tai vi phu hop muc tieu lam prototype nhanh nhung van dam bao kha nang nang cap len san pham that:
- `FastAPI` duoc chon de toi uu toc do xay dung API va de mo rong them endpoint khi tang so luong bot.
- `Vue.js` duoc chon vi don gian, nhe, de demo nhanh cho team nghiep vu va de chinh sua UI theo feedback.
- `Semantic Search` duoc uu tien vi bai toan la hoi dap theo tai lieu noi bo, can truy xuat dung ngu canh hon la huan luyen model lon.
- `CSV/Markdown` duoc chon de team phi ky thuat co the cap nhat tri thuc de dang, giam phu thuoc vao dev.
- `MLflow` duoc chon de theo doi vong doi model va log van hanh, ho tro cai tien lien tuc dua tren du lieu thuc te.

Voi huong chon nay, he thong vua de trien khai thu nghiem nhanh, vua giu duoc nen tang ky thuat on dinh de mo rong trong cac giai doan tiep theo.

## Moi truong su dung

Du an hien tai huong den moi truong phat trien va demo noi bo, de cai dat va van hanh nhanh:
- He dieu hanh: macOS, Linux hoac Windows (khuyen nghi dung moi truong Unix-like de thao tac terminal de hon).
- Backend: Python `3.10+`, su dung `venv`, chay API bang `uvicorn`.
- Frontend: chay bang web server don gian (`python -m http.server`) de test giao dien Vue.
- Model tracking: MLflow server chay local tai cong `5001` de theo doi log.

Moi truong de xuat theo giai doan:
- **Development (local):** 1 may tinh ca backend + frontend + MLflow, phu hop cho lap trinh va test nhanh.
- **Staging (noi bo):** tach backend va frontend thanh 2 service rieng, bo sung reverse proxy va log tap trung.
- **Production:** trien khai dang container, cau hinh bien moi truong ro rang, bat health check va giam sat de dam bao do on dinh.

Cach chia moi truong nay giup team di tu prototype den he thong that theo lo trinh an toan, giam rui ro khi mo rong nguoi dung va luu luong truy cap.

## Yeu cau phan cung toi thieu

Muc cau hinh toi thieu de van hanh on dinh duoc de xuat nhu sau:

- **Local demo/development (1 may):**
  - CPU: toi thieu 4 cores
  - RAM: toi thieu 8 GB (khuyen nghi 16 GB)
  - Disk trong: toi thieu 10 GB
  - Mang: on dinh de cai dat package va goi API noi bo

- **Staging/Production nho (tach service co ban):**
  - Backend API: 2 vCPU, 4 GB RAM
  - Frontend static: 1 vCPU, 1-2 GB RAM
  - MLflow + storage log: 2 vCPU, 4 GB RAM, 20 GB disk
  - Tong toi thieu: 4-6 vCPU, 8-10 GB RAM

- **Khuyen nghi mo rong khi tang tai:**
  - Tang RAM backend truoc khi tang so luong instance.
  - Dat reverse proxy va cache de giam tai cho API chat.
  - Theo doi CPU/RAM/latency theo thoi gian thuc de quyet dinh scale chinh xac.

Thong so tren giup du an dam bao chi phi hop ly o giai doan dau, dong thoi van du du phong de nang cap khi so luong nguoi dung tang.

## Uoc luong tai nguyen theo so user dong thoi

Moc tham chieu duoi day dung de sizing ban dau, can duoc hieu chinh theo traffic thuc te va do phuc tap cau hoi:

- **10 user dong thoi (muc nho):**
  - Backend: 2 vCPU, 4 GB RAM
  - Frontend: 1 vCPU, 1 GB RAM
  - MLflow + log: 1 vCPU, 2 GB RAM
  - Tong goi y: 4 vCPU, 7 GB RAM
  - Muc tieu do tre API: < 1.5s/cau hoi

- **50 user dong thoi (muc trung binh):**
  - Backend: 4 vCPU, 8 GB RAM
  - Frontend: 1 vCPU, 1-2 GB RAM
  - MLflow + log: 2 vCPU, 4 GB RAM
  - Tong goi y: 7 vCPU, 13-14 GB RAM
  - Muc tieu do tre API: < 2.0s/cau hoi

- **200 user dong thoi (muc cao):**
  - Backend: 8-12 vCPU, 16-24 GB RAM (nen chia nhieu instance)
  - Frontend: 2 vCPU, 2-4 GB RAM
  - MLflow + log: 2-4 vCPU, 4-8 GB RAM
  - Tong goi y: 12-18 vCPU, 22-36 GB RAM
  - Muc tieu do tre API: < 2.5s/cau hoi

Luu y van hanh:
- Can bat giam sat CPU, RAM, latency p95, ty le loi va throughput (request/phut).
- Khi tai tang, uu tien scale ngang backend API truoc, sau do toi uu cache va toi uu retriever.
- Nen stress test dinh ky de cap nhat lai sizing cho tung giai doan phat trien.

## Huong dan cai dat va trien khai

### 1) Cai dat local (de development/demo)

**Backend**

```bash
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

**MLflow (tuy chon nhung khuyen nghi bat)**

Trong thu muc `backend` voi moi truong ao da kich hoat, hoac terminal rieng:

```bash
cd backend
source .venv/bin/activate
mlflow server --host 127.0.0.1 --port 5001
```

**Frontend**

```bash
cd frontend
python3 -m http.server 5173
```

Truy cap: [http://127.0.0.1:5173](http://127.0.0.1:5173)

### 2) Kiem tra nhanh sau cai dat

- Kiem tra API health (neu co endpoint health) hoac test truc tiep endpoint chat.
- Test endpoint `price bot`:

```bash
curl -X POST http://127.0.0.1:8000/chat/price \
  -H "Content-Type: application/json" \
  -d '{"question":"goi nao phu hop cho doanh nghiep 10 nhan su?","top_k":3}'
```
- Test endpoint `guide bot` voi cau hoi huong dan su dung co ban.
- Mo UI frontend va gui cau hoi thuc te de xac nhan full luong.

### 3) Trien khai staging/production (de xuat)

1. **Dong goi backend thanh container**
    - Build image cho `backend`, cau hinh bien moi truong qua file env.
2. **Trien khai frontend static**
    - Build/serve frontend bang Nginx hoac static hosting service.
3. **Dat reverse proxy**
    - Dung Nginx/Traefik de route:
     - `/chat/*` -> backend API
     - `/` -> frontend
4. **Cau hinh van hanh**
    - Bat CORS dung domain
    - Dat timeout hop ly
    - Bat access log + error log
5. **Giam sat va canh bao**
    - Theo doi CPU, RAM, p95 latency, ty le loi 4xx/5xx.
6. **Scale**
    - Scale ngang backend API khi luu luong tang.

### 4) Checklist truoc khi go-live

- Da tach bien moi truong `dev/staging/prod`.
- Da khoa cac key/secret trong bien moi truong (khong hardcode).
- Da test tai (load test co ban) va dat nguong canh bao.
- Da backup/luu tru du lieu log quan trong.
- Da co rollback plan neu ban phat hanh gap su co.

## Kha nang tich hop

He thong duoc thiet ke theo huong API-first nen de tich hop vao he sinh thai san pham hien co:

- **Tich hop voi CRM/ERP noi bo**
  - Goi API chatbot tu man hinh khach hang, co hoi, ticket hoac portal noi bo.
  - Tai su dung du lieu nghiep vu san co de ca nhan hoa cau tra loi.

- **Tich hop voi kenh giao tiep**
  - Co the ket noi web widget, live chat, Zalo OA, Telegram, Slack, Microsoft Teams thong qua lop adapter.
  - Dong bo cau hoi/cau tra loi ve he thong quan ly hoi dap trung tam.

- **Tich hop voi he thong ho tro khach hang (Helpdesk)**
  - Tu dong de xuat cau tra loi cho agent khi xu ly ticket.
  - Chuyen tiep hoi dap khong xu ly duoc sang nhan vien, kem ngu canh da truy xuat.

- **Tich hop quan tri va theo doi**
  - Ket noi he thong logging/monitoring (ELK, Grafana, Datadog...) de theo doi chat luong dich vu.
  - Trich xuat metric de danh gia hieu qua bot theo thoi gian.

- **Tich hop bao mat va xac thuc**
  - Ho tro dat sau API Gateway, them JWT/OAuth2 hoac SSO tuy theo chuan doanh nghiep.
  - Co the bo sung rate limiting, IP filtering, audit log cho moi truong co yeu cau cao.

Nho kien truc tach lop va endpoint ro rang, du an co the trien khai doc lap hoac nhung vao he thong lon hon ma khong can thay doi nhieu phan loi.

## Bao mat

De van hanh an toan trong moi truong doanh nghiep, he thong nen ap dung cac lop bao mat sau:

- **Xac thuc va phan quyen**
  - Bat xac thuc cho tat ca endpoint production (JWT/OAuth2/SSO).
  - Ap dung phan quyen theo vai tro (RBAC) de gioi han quyen truy cap theo ngu canh nguoi dung.

- **Bao ve API**
  - Dat he thong sau API Gateway hoac reverse proxy co TLS.
  - Bat rate limiting, request size limit, va timeout de giam rui ro tan cong tu choi dich vu.
  - Kiem soat CORS dung danh sach domain duoc phep.

- **Bao mat du lieu**
  - Ma hoa du lieu khi truyen (HTTPS/TLS) va khi luu tru neu co du lieu nhay cam.
  - Khong log thong tin nhay cam (token, mat khau, du lieu dinh danh ca nhan).
  - Tach secret khoi source code, quan ly qua bien moi truong hoac secret manager.

- **Giam sat va kiem toan**
  - Ghi audit log cho hanh dong quan trong (dang nhap, thay doi cau hinh, goi API nhay cam).
  - Theo doi canh bao bao mat: so lan dang nhap that bai, traffic bat thuong, ty le loi tang dot bien.

- **Bao mat van hanh**
  - Cap nhat dependency dinh ky de va loi hong bao mat.
  - Chay dich vu voi quyen toi thieu (principle of least privilege).
  - Co ke hoach backup, phuc hoi va quy trinh ung pho su co ro rang.

Voi kien truc hien tai, cac co che bao mat co the duoc them theo tung lop ma khong can thay doi lon trong logic nghiep vu, giup he thong vua an toan vua de bao tri.

## Uu diem, nhuoc diem va diem can phat trien them

### Uu diem

- Kien truc tach lop ro rang (`frontend`, `backend`, `corpus`, `monitoring`) nen de bao tri.
- Trien khai nhanh cho muc tieu demo/prototype, chi phi dau tu ban dau thap.
- De mo rong theo domain noi dung moi bang cach bo sung corpus va endpoint.
- Semantic search phu hop bai toan hoi dap theo tai lieu nghiep vu.
- Co nen tang theo doi van hanh/model thong qua MLflow.

### Nhuoc diem

- Chat luong cau tra loi phu thuoc manh vao do day du va do sach cua corpus.
- Chua co co che danh gia chat luong tra loi tu dong (offline eval/benchmark) mot cach day du.
- Frontend hien tai mang tinh chat test UI, chua toi uu trai nghiem nguoi dung production.
- Chua mo ta chi tiet ve cache, queue, va co che retry cho tai cao.
- Bao mat da co dinh huong, nhung can chuan hoa thanh checklist va quy trinh van hanh cu the.

### Diem can phat trien them

- **Nang cap retrieval pipeline**
  - Bo sung hybrid search (keyword + semantic), re-ranking, va query rewrite.
- **Danh gia chat luong co he thong**
  - Xay bo test question-answer chuan, do cac chi so nhu accuracy, grounding, latency p95.
- **Toi uu hieu nang va kha nang scale**
  - Them cache cho truy van lap lai, toi uu index, scale ngang backend theo traffic.
- **Nang cap trai nghiem nguoi dung**
  - Bo sung luu lich su hoi dap, goi y cau hoi, va giao dien quan tri noi dung.
- **Hoan thien bao mat va van hanh**
  - Chuan hoa secret management, audit log, SIEM/alerting, backup-restore drill dinh ky.
- **Mo rong tich hop doanh nghiep**
  - Ket noi sau hon voi CRM/Helpdesk/SSO, dong bo ngu canh nguoi dung theo thoi gian thuc.

Huong phat trien nay giup du an chuyen tu muc "demo hoat dong tot" sang muc "san pham van hanh on dinh, do luong duoc, va mo rong ben vung".

## Ke hoach phat trien theo 3 giai doan

### Giai doan 1 (1-3 thang): On dinh nen tang va do luong co ban

**Muc tieu**
- On dinh hoa he thong hien tai, dat baseline ve chat luong va hieu nang.

**Hang muc chinh**
- Chuan hoa corpus, bo sung quy trinh cap nhat noi dung.
- Xay bo cau hoi kiem thu chuan cho `price bot` va `guide bot`.
- Do va theo doi chi so co ban: latency p95, ty le loi, ty le tra loi dung ngu canh.
- Hoan thien checklist bao mat truoc go-live (auth, secret, log, rate limit).

**Ket qua dau ra**
- He thong van hanh on dinh o quy mo nho-trung binh.
- Co dashboard metric co ban va tai lieu van hanh toi thieu.

### Giai doan 2 (3-6 thang): Nang cao chat luong tra loi va kha nang tich hop

**Muc tieu**
- Cai thien do chinh xac cau tra loi va mo rong tich hop nghiep vu.

**Hang muc chinh**
- Nang cap retrieval: hybrid search, re-ranking, query rewrite.
- Bo sung feedback loop tu nguoi dung de cai tien corpus lien tuc.
- Tich hop voi it nhat 1 he thong CRM/Helpdesk thuc te.
- Nang cap frontend theo huong production: lich su chat, goi y cau hoi, UX tot hon.

**Ket qua dau ra**
- Tang chat luong tra loi do duoc bang benchmark noi bo.
- Co case tich hop thuc te trong quy trinh nghiep vu.

### Giai doan 3 (6-12 thang): San pham hoa va mo rong ben vung

**Muc tieu**
- Dua he thong len muc production enterprise, co kha nang scale va quan tri day du.

**Hang muc chinh**
- Trien khai container/orchestration, autoscaling backend theo tai.
- Chuan hoa observability: logging, tracing, alerting, SLO/SLA.
- Hoan thien bao mat nang cao: SSO, RBAC chi tiet, audit trail day du.
- Xay quy trinh release/rollback va disaster recovery drill dinh ky.
- Mo rong them domain bot moi (support, sales enablement, knowledge base noi bo).

**Ket qua dau ra**
- He thong dat muc san pham co the van hanh dai han.
- San sang mo rong nguoi dung, domain va tich hop trong he sinh thai doanh nghiep.

## KPI quan ly theo sprint (owner, deadline, metric target)

### Giai doan 1 (1-3 thang)

- **Workstream:** Chat luong corpus
  - **Owner:** BA Lead + AI Engineer
  - **Deadline:** Cuoi thang 1
  - **Metric target:** 100% tai lieu cot loi duoc chuan hoa; ti le tai lieu trung lap < 5%

- **Workstream:** Bo benchmark cau hoi-tra loi
  - **Owner:** AI Engineer
  - **Deadline:** Giua thang 2
  - **Metric target:** Toi thieu 200 cau hoi test/noi dung cho 2 bot

- **Workstream:** Baseline hieu nang API
  - **Owner:** Backend Engineer
  - **Deadline:** Cuoi thang 2
  - **Metric target:** p95 latency < 2.0s (tai 50 concurrent users), error rate < 1%

- **Workstream:** Checklist bao mat go-live
  - **Owner:** DevOps/SecOps
  - **Deadline:** Cuoi thang 3
  - **Metric target:** 100% muc bat buoc dat, khong con critical finding

### Giai doan 2 (3-6 thang)

- **Workstream:** Nang cap retrieval (hybrid + re-ranking)
  - **Owner:** AI Engineer
  - **Deadline:** Cuoi thang 4
  - **Metric target:** Tang do chinh xac benchmark >= 12% so voi baseline giai doan 1

- **Workstream:** Feedback loop nguoi dung
  - **Owner:** Product Owner + AI Engineer
  - **Deadline:** Giua thang 5
  - **Metric target:** >= 30% hoi dap co feedback, CSAT >= 4.0/5

- **Workstream:** Tich hop CRM/Helpdesk dau tien
  - **Owner:** Integration Engineer
  - **Deadline:** Cuoi thang 5
  - **Metric target:** 1 luong nghiep vu chay on dinh, success rate >= 99%

- **Workstream:** Nang cap frontend production UX
  - **Owner:** Frontend Engineer
  - **Deadline:** Cuoi thang 6
  - **Metric target:** Thoi gian phan hoi giao dien < 1s cho thao tac chinh; user adoption tang >= 20%

### Giai doan 3 (6-12 thang)

- **Workstream:** Autoscaling + do tin cay
  - **Owner:** DevOps Engineer
  - **Deadline:** Cuoi thang 8
  - **Metric target:** Uptime >= 99.9%, khong co su co P1 do qua tai

- **Workstream:** Observability day du (logs/metrics/traces)
  - **Owner:** SRE/DevOps
  - **Deadline:** Cuoi thang 9
  - **Metric target:** 100% service co dashboard + alert; MTTD < 10 phut

- **Workstream:** Bao mat enterprise (SSO, RBAC chi tiet, audit)
  - **Owner:** Security Engineer
  - **Deadline:** Cuoi thang 10
  - **Metric target:** 100% endpoint production co auth; audit log day du cho hanh dong quan trong

- **Workstream:** Mo rong domain bot
  - **Owner:** Product Owner + AI Team
  - **Deadline:** Cuoi thang 12
  - **Metric target:** Them toi thieu 2 domain moi; ti le cau hoi duoc tra loi dung ngu canh >= 85%

Luu y ap dung:
- Moi sprint nen review KPI theo chu ky 2 tuan, cap nhat target dua tren ket qua do luong thuc te.
- Neu metric khong dat 2 sprint lien tiep, uu tien xu ly no truoc khi mo rong pham vi tinh nang.
