# TAI LIEU THIET KE HE THONG (SDD) - Enterprise Chatbot | AI

## 1. Muc dich va pham vi

Tai lieu nay mo ta thiet ke ky thuat cho he thong `demo-chatbot`, bao gom:
- Kien truc tong the
- Thanh phan he thong va trach nhiem
- Luong xu ly du lieu
- API contract muc cao
- Nguyen tac bao mat, van hanh va mo rong

Pham vi tai lieu tap trung vao he thong hien tai (`price bot`, `guide bot`) va huong mo rong production-ready.

## 2. Tong quan kien truc

He thong theo mo hinh 3 lop chinh:

1. **Presentation layer** (`frontend/`)
    - Giao dien Vue de nhap cau hoi va hien thi ket qua.
2. **Application layer** (`backend/`)
    - FastAPI nhan request, thuc hien retrieval, tao phan hoi.
3. **Knowledge/Data layer** (`backend/data/`, corpus CSV/Markdown)
    - Kho tri thuc theo domain (`price`, `guide`) phuc vu truy xuat.

Bo tro van hanh:
- **MLflow** cho model/log tracking.
- Tai lieu governance: UAT, go-live, SLO/SLA, risk, runbook.

## 3. So do luong xu ly (logical flow)

1. Nguoi dung gui cau hoi tu frontend.
2. Frontend goi endpoint backend:
    - `/chat/price` hoac `/chat/guide`
3. Backend:
    - Tien xu ly cau hoi (neu co)
    - Truy xuat ngu canh lien quan tu corpus (semantic search)
    - Lay `top_k` ngu canh
4. Backend tong hop va tra ket qua.
5. Frontend hien thi cau tra loi cho nguoi dung.

## 4. Thiet ke thanh phan

### 4.1 Frontend

Chuc nang chinh:
- Thu thap cau hoi nguoi dung
- Chon bot/domain phu hop
- Gui request HTTP den backend
- Hien thi response va thong bao loi co ban

Rang buoc thiet ke:
- Don gian, nhe, phuc vu test/demo nhanh
- De mo rong thanh giao dien production sau nay

### 4.2 Backend API (FastAPI)

Chuc nang chinh:
- Expose endpoint chat theo domain
- Dieu phoi retrieval pipeline
- Tra response JSON thong nhat
- Ghi log van hanh (va MLflow khi can)

Rang buoc thiet ke:
- Phan tach logic theo module de de bao tri
- Co kha nang scale ngang theo instance
- De bo sung middleware auth/rate limit khi len production

### 4.3 Knowledge layer (Corpus)

Nguon du lieu:
- CSV corpus (`price_bot_corpus.csv`, `guide_bot_corpus.csv`)
- Markdown trong `backend/data/`

Nguyen tac:
- Tri thuc tach khoi code
- De cap nhat boi team nghiep vu
- Co versioning khi thay doi noi dung

### 4.4 Observability layer

- MLflow: theo doi model/log lien quan
- Monitoring metrics (de xuat production):
  - p95/p99 latency
  - 5xx error rate
  - timeout rate
  - response quality benchmark

## 5. API design muc cao

### 5.1 Endpoint

- `POST /chat/price`
- `POST /chat/guide`

### 5.2 Request model (muc logic)

- `question`: string
- `top_k`: integer (so ngu canh trich xuat)

### 5.3 Response model (muc logic)

- `answer`: string
- `sources` (neu co): danh sach nguon/noi dung tham chieu
- `meta` (neu co): thong tin bo sung nhu thoi gian xu ly

## 6. Nguyen tac thiet ke bao mat

- Dat backend sau reverse proxy/API gateway khi production
- Bat TLS cho kenh truyen
- Bo sung auth (JWT/OAuth2/SSO) theo nhu cau doanh nghiep
- Khong log du lieu nhay cam (token/PII)
- Quan ly secret qua env/secret manager

## 7. Nguyen tac thiet ke hieu nang va scale

- Scale ngang backend theo traffic
- Them cache cho truy van lap lai
- Toi uu retrieval pipeline (ranking/top_k)
- Theo doi va toi uu theo SLO thay vi toi uu cam tinh

Sizing tham chieu:
- 10 user dong thoi: 4 vCPU, 7 GB RAM
- 50 user dong thoi: 7 vCPU, 13-14 GB RAM
- 200 user dong thoi: 12-18 vCPU, 22-36 GB RAM

## 8. Kich ban loi va xu ly

- Backend down -> rollback/restart + incident P1
- Latency tang -> scale ngang + cache + toi uu retriever
- Chat luong giam -> review corpus + benchmark + tune retrieval

Tai lieu lien quan:
- [Runbook incident](../02-governance/runbook_incident.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
- [SLO / SLA](../02-governance/slo_sla.md)

## 9. Quyet dinh thiet ke chinh (Architecture Decision Summary)

1. **Chon FastAPI** de toi uu toc do xay API va maintainability.
2. **Chon Vue nhe** de test nhanh va de mo rong giao dien.
3. **Chon retrieval theo corpus** thay vi train model rieng o giai doan dau.
4. **Chon governance docs som** de giam rui ro khi chuyen production.
5. **Chon SLO/SLA** de quan tri he thong theo metric ro rang.

## 10. Gioi han hien tai va huong nang cap

Gioi han:
- Frontend hien tai nghieng ve test/demo.
- Danh gia quality tu dong chua sau.
- Chua co full security hardening mac dinh.

Huong nang cap:
- Hybrid retrieval (keyword + semantic) + re-ranking
- Dashboard observability day du (metrics/logs/traces)
- Auth/RBAC/audit logging production-grade
- Mo rong them domain bot moi

## 11. Truy vet tai lieu lien quan

- [Introduction report](../01-overview/introduction_report.md)
- [Project plan Gantt](../05-execution/project_plan_gantt.md)
- [Project plan Gantt (goi A/B/C)](../05-execution/project_plan_gantt_by_package_ABC.md)
- [Chinh sach bao tri](../02-governance/chinh_sach_bao_tri.md)
- [Operations index](../02-governance/operations_index.md)
