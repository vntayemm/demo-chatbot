# Giải pháp — Bảo mật — Kiến trúc — Vận hành — Giao nhận (UAT & kiểm tra)

**Đối tượng:** kiến trúc sư, DevOps, bảo mật, quản lý dự án, đội QA.  
**Phạm vi:** monorepo **demo-cmit-api** (microservice + `platform/*`). Đây là **khung tài liệu vận hành**; môi trường production phải bổ sung số liệu sizing và chính sách nội bộ của tổ chức.

**Tài liệu liên quan (tiếng Anh / chuyên sâu):**  
[platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) · [ceiap-glossary.md](./ceiap-glossary.md) · [executive-summary-one-slide.md](./executive-summary-one-slide.md) · [permission-system-design.md](./permission-system-design.md)  
**On-prem / Cloud / OS:** [trien-khai-onprem-cloud-linux-windows.md](./trien-khai-onprem-cloud-linux-windows.md)  
**Dev local:** [phat-trien-local-cho-dev.md](./phat-trien-local-cho-dev.md)  
**Docker Compose (lab / dev):** [huong-dan-setup-docker.md](./huong-dan-setup-docker.md)  
**Cấu hình (env, mẫu `.env`, gateway, tích hợp):** [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md)  
**Setup server / mạng / bảo mật (production):** [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md)  
**Danh mục phần mềm + license + tầng:** [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md)  
**Summary & cam kết:** [summary-va-cam-ket.md](./summary-va-cam-ket.md)  
**Phương pháp, tổ chức, timeline:** [phuong-phap-to-chuc-va-timeline.md](./phuong-phap-to-chuc-va-timeline.md)  
**Ví dụ luồng thanh toán E2E:** [vi-du-luong-thanh-toan-end-to-end.md](./vi-du-luong-thanh-toan-end-to-end.md)  
**Bảng thuật ngữ tổng hợp (VN):** [bang-thuat-ngu-chuyen-nganh-tong-hop.md](./bang-thuat-ngu-chuyen-nganh-tong-hop.md)  
**Bảng cam kết tiêu chí hệ thống (bảo mật, HA, scale, .NET, gap):** [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md)  
**Ví dụ E2E (sync, payment lỗi, cổng TT, eInvoice):** [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md)  
**Vì sao bảo mật / scale / SOC·ISO·audit / durability / “thông minh”:** [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md)  
**Quy trình bảo trì & backup database:** [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md)  
**Quy trình bảo trì audit & bảo mật:** [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md)  
**Quy trình bảo trì & backup file (storage):** [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md)  
**Hướng mở rộng no-code / low-code:** [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md)  
**Hướng mở rộng CRM:** [huong-mo-rong-crm.md](./huong-mo-rong-crm.md)  
**Hướng mở rộng ERP:** [huong-mo-rong-erp.md](./huong-mo-rong-erp.md)  
**Hướng mở rộng AI:** [huong-mo-rong-ai.md](./huong-mo-rong-ai.md)  
**Setup scale (replica, DB, Redis, worker):** [huong-dan-setup-scale.md](./huong-dan-setup-scale.md)  
**Setup Docker (build, compose, troubleshooting):** [huong-dan-setup-docker.md](./huong-dan-setup-docker.md)  
**Hướng dẫn cấu hình:** [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md)  
**Cấu trúc repo mẫu (.NET / polyglot):** [cau-truc-repo-mau-dotnet.md](./cau-truc-repo-mau-dotnet.md)  
**Cấu trúc repo mẫu (Java / Spring Boot):** [cau-truc-repo-mau-java.md](./cau-truc-repo-mau-java.md)  
**Cấu trúc `platform/` (thư viện dùng chung):** [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md)  
**Tổng quan tiêu chí thiết kế** (kiến trúc sư: chuẩn, bảo mật theo tầng — mục 2, scale, HA, SOLID, pattern): [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md)  
**Bảng báo giá theo gói công việc (mẫu):** [bang-bao-gia-goi-cong-viec-mau.md](./bang-bao-gia-goi-cong-viec-mau.md)  
**Tích hợp hệ thống bên thứ ba (NAVIS / TOS):** [gioi-thieu-tich-hop-navis-he-thong-thu-ba.md](./gioi-thieu-tich-hop-navis-he-thong-thu-ba.md)  
**Danh sách chủ đề blog đề xuất:** [danh-sach-chu-de-blog-de-xuat.md](./danh-sach-chu-de-blog-de-xuat.md)  
**Giới thiệu kiến trúc tổng thể (sơ đồ + problem/solution):** [gioi-thieu-kien-truc-tong-the-he-thong.md](./gioi-thieu-kien-truc-tong-the-he-thong.md)  
**Giám sát & cảnh báo:** [gioi-thieu-he-thong-giam-sat-va-canh-bao.md](./gioi-thieu-he-thong-giam-sat-va-canh-bao.md)

---

## Mục lục

1. [Tổng quan giải pháp](#1-tổng-quan-giải-pháp)  
2. [Kiến trúc & thiết kế theo nhóm hệ thống](#2-kiến-trúc--thiết-kế-theo-nhóm-hệ-thống)  
3. [Bảo mật](#3-bảo-mật)  
4. [High availability & scale](#4-high-availability--scale)  
5. [Đội ngũ & vai trò (RACI gợi ý)](#5-đội-ngũ--vai-trò-raci-gợi-ý)  
6. [Yêu cầu máy chủ & tài nguyên](#6-yêu-cầu-máy-chủ--tài-nguyên)  
7. [Mạng & cổng](#7-mạng--cổng)  
8. [Cài đặt](#8-cài-đặt)  
9. [Checklist triển khai](#9-checklist-triển-khai)  
10. [UAT (User Acceptance Test)](#10-uat-user-acceptance-test)  
11. [Kiểm tra / Inspection](#11-kiểm-tra--inspection)  
12. [On-prem, Cloud, Linux, Windows](./trien-khai-onprem-cloud-linux-windows.md) *(tài liệu riêng)*  
13. [Phát triển local cho dev](./phat-trien-local-cho-dev.md) *(tài liệu riêng)*  
14. [Setup server, mạng, bảo mật](./huong-dan-setup-server-mang-bao-mat.md) *(tài liệu riêng)*  
15. [Software, license, layer, dependency](./software-inventory-licenses-and-layers.md) *(tài liệu riêng)*  
16. [Summary & cam kết](./summary-va-cam-ket.md) *(tài liệu riêng)*  
17. [Phương pháp, tổ chức, timeline](./phuong-phap-to-chuc-va-timeline.md) *(tài liệu riêng)*  
18. [Ví dụ luồng thanh toán end-to-end](./vi-du-luong-thanh-toan-end-to-end.md) *(tài liệu riêng)*  
19. [Bảng thuật ngữ chuyên ngành tổng hợp](./bang-thuat-ngu-chuyen-nganh-tong-hop.md) *(tài liệu riêng)*  
20. [Bảng cam kết tiêu chí hệ thống](./bang-cam-ket-tieu-chi-he-thong.md) *(tài liệu riêng)*  
21. [Ví dụ E2E sync / payment lỗi / cổng TT / eInvoice](./vi-du-luong-e2e-sync-payment-einvoice.md) *(tài liệu riêng)*  
22. [Vì sao bảo mật, scale, chuẩn audit, durability, thông minh](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) *(tài liệu riêng)*  
23. [Quy trình bảo trì & backup database](./quy-trinh-bao-tri-va-backup-database.md) *(tài liệu riêng)*  
24. [Quy trình bảo trì audit & bảo mật](./quy-trinh-bao-tri-audit-va-bao-mat.md) *(tài liệu riêng)*  
25. [Quy trình bảo trì & backup file (storage)](./quy-trinh-bao-tri-va-backup-file-storage.md) *(tài liệu riêng)*  
26. [Hướng mở rộng no-code / low-code](./huong-mo-rong-no-code-low-code.md) *(tài liệu riêng)*  
27. [Hướng mở rộng CRM](./huong-mo-rong-crm.md) *(tài liệu riêng)*  
28. [Hướng mở rộng ERP](./huong-mo-rong-erp.md) *(tài liệu riêng)*  
29. [Hướng mở rộng AI](./huong-mo-rong-ai.md) *(tài liệu riêng)*  
30. [Hướng dẫn setup scale](./huong-dan-setup-scale.md) *(tài liệu riêng)*  
31. [Hướng dẫn setup Docker](./huong-dan-setup-docker.md) *(tài liệu riêng)*  
32. [Hướng dẫn cấu hình](./huong-dan-cau-hinh.md) *(tài liệu riêng)*  
33. [Cấu trúc repository mẫu .NET](./cau-truc-repo-mau-dotnet.md) *(tài liệu riêng)*  
34. [Cấu trúc repository mẫu Java](./cau-truc-repo-mau-java.md) *(tài liệu riêng)*  
35. [Cấu trúc repository mẫu `platform/`](./cau-truc-repo-mau-platform.md) *(tài liệu riêng)*  
36. [Tổng quan tiêu chí thiết kế (kiến trúc sư)](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) *(tài liệu riêng)*  
37. [Bảng báo giá theo gói công việc (mẫu)](./bang-bao-gia-goi-cong-viec-mau.md) *(tài liệu riêng)*  
38. [Giới thiệu tích hợp NAVIS / hệ thống thứ ba](./gioi-thieu-tich-hop-navis-he-thong-thu-ba.md) *(tài liệu riêng)*  
39. [Danh sách chủ đề blog đề xuất](./danh-sach-chu-de-blog-de-xuat.md) *(tài liệu riêng)*  
40. [Giới thiệu kiến trúc tổng thể hệ thống](./gioi-thieu-kien-truc-tong-the-he-thong.md) *(tài liệu riêng)*  
41. [Giới thiệu hệ thống giám sát và cảnh báo](./gioi-thieu-he-thong-giam-sat-va-canh-bao.md) *(tài liệu riêng)*  

---

## 1. Tổng quan giải pháp

### 1.1 Mục tiêu nghiệp vụ

- **Cổng API thống nhất** (`api-gateway`) định tuyến tới nhiều domain service.  
- **Tích hợp có kiểm soát:** registry provider/instance (`integration-service`), sync có audit (`sync-service` + `platform/sync`), đồng bộ dòng dữ liệu (`dbsync-service`).  
- **Điều phối thời gian:** lập lịch tách planner/worker (`scheduler-service` + worker), có `job_runs`.  
- **Nền tảng tái sử dụng:** thư viện trong `platform/*` (identity, storage, secure-config, policy, …).

### 1.2 Giả định & giới hạn (demo vs production)

| Khía cạnh | `docker-compose` (dev demo) | Production cần thêm |
|-----------|----------------------------|----------------------|
| TLS | Thường HTTP nội bộ | TLS end-to-end, cert rotation |
| Secret | Env trong compose | Vault/KMS, không commit `.env` |
| HA | 1 replica/container | Nhiều replica, health probe, PDB |
| DB | Single Mongo/Postgres | Replica set / HA cluster, backup |
| Giám sát | Tối thiểu | Metrics, log tập trung, trace |

---

## 2. Kiến trúc & thiết kế theo nhóm hệ thống

### 2.1 Lớp biên (edge)

| Thành phần | Vai trò thiết kế | Ghi chú |
|------------|------------------|---------|
| **API Gateway** | Reverse proxy, gom route `/api/*`, có thể bật OIDC | `api-gateway/src/index.ts` — mỗi upstream một `SERVICE_URL` |

### 2.2 Nhận thực & phân quyền

| Thành phần | Vai trò | Ghi chú |
|------------|---------|---------|
| **auth-service** | Đăng nhập/JWT (theo triển khai repo) | Tích hợp gateway tùy cấu hình |
| **Keycloak / OIDC** (tùy bật) | IdP bên ngoài | Xem `identity-setup/`, middleware gateway |
| **permission-system-design** | RBAC/ABAC, workflow | Tài liệu [`permission-system-design.md`](./permission-system-design.md) (`docs/content/09-CMIT/permission-system-design.md`) |

### 2.3 Tích hợp & đồng bộ

| Thành phần | Vai trò | Dữ liệu / hàng đợi |
|------------|---------|-------------------|
| **integration-service** | Provider + instance + `active?type=` | Mongo `integration_service` |
| **sync-service** + **platform/sync** | Mapper + transport + audit + state | Mongo `sync_service` |
| **dbsync-service** | Đồng bộ bảng/row, DLQ tùy cấu hình | Theo service (Postgres/Mongo/NATS…) |

### 2.4 Lập lịch & hàng đợi công việc

| Thành phần | Vai trò | Dữ liệu |
|------------|---------|---------|
| **scheduler-service** | CRUD job, dispatcher `SKIP LOCKED`, metrics `/metrics` | Postgres `scheduler_db` |
| **scheduler-worker** | BullMQ consumer | Redis |
| **redis** | BullMQ, cache tùy dịch vụ | — |

### 2.5 Domain nghiệp vụ (ví dụ)

Các service dưới `services/*` (booking, payment, file, …): **stateless HTTP**, state trong DB riêng; thiết kế từng service = REST + model DB + (tuỳ chọn) gọi `integration-service` / storage.

### 2.6 Nền tảng dùng chung (`platform/*`)

- **storage, document-db, relational-db, cache-db, search, messaging, …** — abstraction để dịch vụ không khóa cứng nhà cung cấp.  
- Triển khai thực tế: **từng service chọn** gói nào được import; không bắt buộc toàn bộ stack.

---

## 3. Bảo mật

### 3.1 Nguyên tắc

- **Không lộ secret** trong repo; dùng biến môi trường / KMS.  
- **Gateway** là điểm gắn OIDC / rate limit / IP allowlist (nếu bật).  
- **Token nội bộ** (ví dụ `SCHEDULER_INTERNAL_TOKEN`, `SYNC_SERVICE_TOKEN`): chỉ mạng nội bộ, độ dài đủ, xoay định kỳ.  
- **Đa tenant:** mọi API nhạy cảm lọc theo `tenantId` / policy (xem permission design).

### 3.2 Checklist bảo mật (tối thiểu)

- [ ] Đổi mật khẩu/secret mặc định Postgres/Mongo/Redis/Keycloak.  
- [ ] Bật TLS cho traffic client → gateway (production).  
- [ ] Giới hạn CORS theo domain thật, không `*` trong prod.  
- [ ] Rà soát endpoint admin (`/api/internal/*`, audit export) — chỉ allowlist IP hoặc tắt ngoài mạng quản trị.  
- [ ] Log không ghi PAN, password, raw JWT đầy đủ.  
- [ ] Phân vùng mạng: DB/Redis không public Internet.

---

## 4. High availability & scale

Chi tiết **LB, readiness, HPA, pool DB, Redis HA, worker, file S3:** [huong-dan-setup-scale.md](./huong-dan-setup-scale.md).

### 4.1 Stateless vs stateful

| Loại | Ví dụ | Cách scale |
|------|--------|------------|
| Stateless | Gateway, hầu hết Node API | H horizontal + load balancer |
| Stateful | Postgres, Mongo primary, Redis single | Replica / Sentinel / Cluster + ứng dụng hỗ trợ failover |

### 4.2 Scheduler

- **Nhiều replica scheduler-service:** an toàn nhờ `FOR UPDATE SKIP LOCKED` khi claim job.  
- **Nhiều worker:** tăng `WORKER_CONCURRENCY` và số pod worker; cùng queue Redis.

### 4.3 Sync & tích hợp

- **sync-service:** scale horizontal nếu không giữ session; dùng chung Mongo và idempotency key.  
- **Transport HTTP:** timeout (`SYNC_HTTP_TIMEOUT_MS`), circuit breaker (nâng cấp sau).

### 4.4 Dữ liệu

- Mongo/Postgres: **backup + restore drill** định kỳ.  
- File (`file-service`): metadata Mongo + object local/S3 — [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md).

---

## 5. Đội ngũ & vai trò (RACI gợi ý)

| Hoạt động | Platform / Kiến trúc | Backend | DevOps | Bảo mật | QA |
|-----------|----------------------|---------|--------|---------|-----|
| Thiết kế API & bounded context | **A** | C | C | C | I |
| Triển khai docker/K8s | C | I | **A** | C | I |
| OIDC / policy / permission | C | C | C | **A** | I |
| Tích hợp provider (Stripe, S3…) | C | **A** | I | C | C |
| UAT kịch bản nghiệp vụ | I | C | I | I | **A** |
| Incident / on-call | C | C | **A** | C | I |

*(A = chịu trách nhiệm chính, C = tham gia, I = được thông tin)*

---

## 6. Yêu cầu máy chủ & tài nguyên

### 6.1 Môi trường dev (docker-compose trên một máy)

- **CPU:** 4 vCPU trở lên khuyến nghị (nhiều container Node + DB).  
- **RAM:** 16 GB trở lên (Mongo + nhiều Postgres + Redis + Keycloak nếu bật).  
- **Disk:** SSD, dung lượng theo volume DB + file-media.  
- **OS:** Linux/macOS có Docker Desktop / Engine.

### 6.2 Production (định hướng)

- Tách **node pool** hoặc host cho DB vs app.  
- Giới hạn CPU/RAM per pod; autoscaling HPA theo CPU hoặc custom metrics (queue depth).  
- **Backup:** RPO/RTO thỏa thuận với nghiệp vụ.

---

## 7. Mạng & cổng

### 7.1 Luồng mạng logic

```
Client → (TLS) → API Gateway:8080 → mạng nội bộ Docker/K8s → từng service:3000 (nội bộ)
                                      → Mongo, Postgres, Redis (chỉ nội bộ)
```

### 7.2 Cổng host (dev — tham chiếu `docker-compose.yml`)

- **8080** — API Gateway (vào toàn bộ `/api/*` đã proxy).  
- Các service map **host:container** ví dụ: `3001` auth, `3017` file, `3018` integration, `3090` scheduler, `3092` sync, `6379` Redis, `27017` Mongo, v.v.  
- **Bắt buộc:** bảng cổng đầy đủ lấy từ `docker-compose.yml` tại thời điểm release; cập nhật khi thêm service.

### 7.3 Firewall & DNS (production)

- Chỉ mở **443 → gateway** ra Internet.  
- DNS nội bộ cho `*.svc.cluster.local` (K8s) hoặc service discovery tương đương.

---

## 8. Cài đặt

### 8.1 Chuẩn bị

- Docker Engine + Docker Compose plugin.  
- Node.js 18+ (khi build/chạy từng service ngoài Docker).  
- Git clone repo.

### 8.2 Chạy toàn stack (dev)

```bash
cd demo-cmit-api
docker compose build
docker compose up -d
```

- Kiểm tra gateway: `curl -s http://localhost:8080/health`  
- Kiểm tra từng service qua route gateway hoặc port map trực tiếp (tùy mục đích debug).

### 8.3 Build từng service (CI / local)

```bash
cd services/<tên-service> && npm install && npm run build
```

- **sync-service** khi build Docker: context **gốc repo** (xem `docker-compose` và `services/sync-service/Dockerfile`).

### 8.4 Biến môi trường quan trọng (ví dụ)

- Gateway: `*_SERVICE_URL`, OIDC nếu bật.  
- Scheduler: `DB_*`, `REDIS_URL`, `SCHEDULER_INTERNAL_TOKEN`.  
- Worker: `REDIS_URL`, `SCHEDULER_SERVICE_URL`, token nội bộ.  
- Sync: `MONGODB_URI`, `MONGODB_DB_NAME`, `SYNC_SERVICE_TOKEN` (tùy), `SYNC_USE_HTTP_TRANSPORT`.  
- File: `MONGODB_URI`, `STORAGE_TYPE`, …  

Chi tiết: README từng service + `.env.example` nếu có; mục lục file mẫu: [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md).

---

## 9. Checklist triển khai

### 9.1 Trước go-live

- [ ] Danh sách service & phiên bản image/tag ghi nhận (release note).  
- [ ] Secret quản lý ngoài git; quyền đọc theo role DevOps.  
- [ ] Backup DB + thử restore trên môi trường staging.  
- [ ] Health check từng service + dependency (DB, Redis).  
- [ ] Gateway: đủ `*_SERVICE_URL`, không trỏ nhầm host Docker.  
- [ ] OIDC (nếu dùng): issuer, audience, clock skew.  
- [ ] Redis/Bull: persistence policy (nếu cần không mất job).  
- [ ] File storage: S3 credentials hoặc volume HA; backup metadata + object theo [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md).  
- [ ] Giới hạn body size / timeout gateway cho upload lớn / merge file.

### 9.2 Sau go-live

- [ ] Dashboard CPU/RAM/latency.  
- [ ] Cảnh báo lỗi 5xx, queue depth, disk DB.  
- [ ] Lịch xoay token nội bộ scheduler/sync.  
- [ ] Backup DB theo [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md); drill restore định kỳ.  
- [ ] Lịch **audit & bảo mật** (log, correlation, xoay secret, export audit): [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md).  
- [ ] Backup **file / object storage** (Mongo `file_service` + volume hoặc S3): [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md).

---

## 10. UAT (User Acceptance Test)

### 10.1 Mục tiêu UAT

Xác nhận **luồng nghiệp vụ** và **phi chức năng** (bảo mật cơ bản, hiệu năng chấp nhận được) trên môi trường gần production.

### 10.2 Kịch bản gợi ý (rút gọn)

| ID | Nhóm | Kịch bản | Kết quả mong đợi |
|----|------|----------|------------------|
| U-01 | Gateway | Gọi `/health` và một API public | 200, schema ổn định |
| U-02 | Auth | Đăng nhập / token theo thiết kế dự án | Token hợp lệ, hết hạn đúng policy |
| U-03 | File | Upload nhỏ + (nếu dùng) chunk upload hoàn tất | File tải lại trùng nội dung |
| U-04 | Payment | Charge thử sandbox | Trạng thái PENDING/SUCCESS theo provider |
| U-05 | Integration | Đổi active provider (nếu có quyền admin) | Service đọc config mới |
| U-06 | Scheduler | Tạo job cron + manual run | `job_runs` SUCCESS/FAILED đúng |
| U-07 | Sync | `POST /api/sync/runs` push order stub | `sync_audit` ghi nhận |
| U-08 | RBAC | User không đủ quyền gọi API nhạy cảm | 403 theo thiết kế |

### 10.3 Tiêu chí chấp nhận (mẫu)

- Không có **lỗi chặn (blocker)** nghiệp vụ trong phạm vi UAT đã thống nhất.  
- Không có lỗ hổng **high** đã ghi nhận mà chưa có kế hoạch vá (bảo mật).  
- Hiệu năng: p95 API chính < ngưỡng dự án (đo trên staging).

---

## 11. Kiểm tra / Inspection

### 11.1 Kiểm tra kỹ thuật định kỳ

| Hạng mục | Nội dung |
|----------|----------|
| Patch OS / image base | Node LTS, Alpine, distroless — theo chính sách |
| Dependency | `npm audit` / SCA — ưu tiên lỗ hổng supply chain |
| Certificate | Hết hạn TLS, chain đầy đủ |
| Quyền file | Volume không world-writable không cần thiết |
| Log | Không PII nhạy cảm; retention đủ compliance |

### 11.2 Kiểm tra kiến trúc (architecture review)

- Dịch vụ mới có **bounded context** và DB riêng?  
- Có đi qua **gateway** thay vì expose trực tiếp ra ngoài?  
- Có **idempotency** cho webhook / job / sync?  
- Có **runbook** khi Redis/Mongo/Postgres down?

### 11.3 Bàn giao (handover)

- Sơ đồ mạng + bảng cổng cập nhật.  
- Runbook incident + liên hệ on-call.  
- Link tài liệu: handbook CTO, permission design, **tài liệu này**.

---

## Kiểm soát phiên bản tài liệu

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/giai-phap-van-hanh-va-giao-nhan.md`](./giai-phap-van-hanh-va-giao-nhan.md) |
| Cập nhật | Ghi ngày trong commit message khi đổi cổng/service quan trọng |

---

*Nếu cần tách thành nhiều file (ví dụ `security.md`, `runbook-uat.md` trong cùng `docs/content/09-CMIT/`), có thể tách sau khi nội dung ổn định để tránh trùng lặp.*
