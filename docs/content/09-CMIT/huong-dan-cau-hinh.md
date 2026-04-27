# Hướng dẫn cấu hình (môi trường, biến, secret)

**Mục đích:** một chỗ **định hướng** cách cấu hình monorepo **demo-cmit-api**: lớp nào đặt biến ở đâu, file mẫu nào tham chiếu, và đọc thêm ở đâu.  
**Đọc trước:** [phat-trien-local-cho-dev.md](./phat-trien-local-cho-dev.md) (workflow dev) · [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) (Compose, volume, override env) · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) (production: secret, TLS, mạng).

---

## 1. Các lớp cấu hình

| Lớp | Vị trí / cách dùng | Ghi chú |
|-----|-------------------|---------|
| **Docker Compose** | `docker-compose.yml` → khối `environment:` từng service | Dev đủ chạy nhanh; URL nội bộ giữa container dùng **cổng trong container** (thường `3000`), không nhầm với `ports:` map ra host. |
| **Override Compose** | `.env` ở thư mục gốc (Compose interpolate) hoặc `docker compose --env-file .env.local up` | Dùng cho secret/token không commit; xem [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) mục biến môi trường. |
| **Chạy từng service (npm)** | `services/<tên>/.env` — copy từ `.env.example` nếu có | Hybrid: DB/Redis trong Docker, `MONGODB_URI` / `REDIS_URL` trỏ `localhost` + **port map host**. |
| **API Gateway (tùy chọn)** | `api-gateway/.env` — tham chiếu [`api-gateway/.env.identity.example`](../api-gateway/.env.identity.example) | OIDC gateway, audit Redis/SIEM, allowlist admin — **không** bắt buộc cho stack tối thiểu. |
| **Tích hợp runtime** | **Integration Manager** (`integration-service`): instance active trong DB | Nhiều adapter (payment, storage…) không cần redeploy khi đổi cấu hình; xem [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md). |
| **Platform packages** | `platform/*/.env.example` + README từng package | Dùng khi dev/build thư viện dùng chung (messaging, document-db, …). |

---

## 2. File mẫu trong repo (tham chiếu)

### 2.1 Service (`services/*`)

| Đường dẫn | Ghi chú ngắn |
|-----------|---------------|
| `services/authorization-service/.env.example` | Mongo authz, HTTP port — [permission-system-design.md](./permission-system-design.md). |
| `services/csv-service/.env.example` | CSV / pipeline tùy service. |
| `services/dbhistory-service/.env.example` | DB history / Mongo. |
| `services/dbsync-service/.env.example` | Đồng bộ dòng + DLQ (NATS…) — thêm [services/dbsync-service/DLQ.md](../services/dbsync-service/DLQ.md). |
| `services/file-service/.env.example` | Storage local/S3, media path. |
| `services/import-service/.env.example` | Import job / DB. |
| `services/integration-service/.env.example` | Mongo integration; tùy chọn secure-config HTTP — **chỉnh URI/secret theo môi trường**, không dùng credential mẫu nếu có trong file. |

### 2.2 Payment (hai profile)

| File | Khi nào |
|------|---------|
| [`services/payment-service/.env.single.example`](../services/payment-service/.env.single.example) | Cache/KMS **single** (một Redis, KMS dev). |
| [`services/payment-service/.env.cache.hybrid.example`](../services/payment-service/.env.cache.hybrid.example) | Chế độ **hybrid** (nhiều node / mô phỏng HA). |

Luồng OIDC payment + gateway: [vi-du-luong-thanh-toan-end-to-end.md](./vi-du-luong-thanh-toan-end-to-end.md) (mục cache, OIDC).

### 2.3 API Gateway — identity / audit

| File | Nội dung chính |
|------|----------------|
| [`api-gateway/.env.identity.example`](../api-gateway/.env.identity.example) | `API_GATEWAY_OIDC_ENABLED`, `OIDC_ISSUER_URL`, `OIDC_AUDIENCE`, audit Redis, SIEM webhook, IP allowlist admin. |

Keycloak / realm mẫu (lab): thư mục [`identity-setup/`](../identity-setup/) (compose, export realm).

### 2.4 Platform (`platform/*`)

| Đường dẫn | README |
|-----------|--------|
| `platform/alert-engine/.env.example` | [platform/alert-engine/README.md](../platform/alert-engine/README.md) |
| `platform/document-db/.env.example` | [platform/document-db/README.md](../platform/document-db/README.md) |
| `platform/messaging/.env.example` | [platform/messaging/README.md](../platform/messaging/README.md) |
| `platform/search/.env.example` | [platform/search/README.md](../platform/search/README.md) |
| `platform/warehouse/.env.example` | [platform/warehouse/README.md](../platform/warehouse/README.md) |

Service không có `.env.example` vẫn có thể đọc biến từ `docker-compose.yml` hoặc `README.md` trong thư mục service.

---

## 3. Nguyên tắc bảo mật cấu hình

- **Không commit** `.env` chứa secret thật; dùng secret manager / Vault / biến CI được mã hóa ở production — [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) mục secret.  
- Token nội bộ trong compose (scheduler, sync, …) chỉ dùng **LAN dev**; đổi khi nhiều người dùng chung một host.  
- Sau khi chỉnh URL dịch vụ upstream, restart `api-gateway` (hoặc `docker compose up -d --build api-gateway` nếu đổi image).

---

## 4. Kiểm tra nhanh sau khi cấu hình

| Kiểm tra | Lệnh / hành động |
|----------|------------------|
| Gateway sống | `curl -s http://localhost:8080/health` (port host theo compose). |
| Service đơn lẻ | `curl -s http://localhost:<port-host>/health` — port lấy từ `ports:` trong compose. |
| Hybrid | Service chạy `npm run dev` phải ping được Mongo/Postgres/Redis theo URI trong `.env`. |

---

## 5. Polyglot — repository .NET mẫu

Khi thêm **service ASP.NET Core** đứng sau `api-gateway` (cùng contract HTTP/OpenAPI), dùng mẫu cấu trúc thư mục & solution: [cau-truc-repo-mau-dotnet.md](./cau-truc-repo-mau-dotnet.md).  
Tương tự với **Java / Spring Boot**: [cau-truc-repo-mau-java.md](./cau-truc-repo-mau-java.md).

---

## 6. Cấu trúc `platform/` (thư viện TypeScript dùng chung)

Mẫu thư mục package `@cmit/platform-*`, adapter, factory, nối với `services/*`: [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md).

---

## 7. Liên quan trong bộ tài liệu

| Chủ đề | Tài liệu |
|--------|----------|
| Cổng & mạng nội bộ Docker | [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) |
| Phân quyền, authz service | [permission-system-design.md](./permission-system-design.md) |
| Cam kết bảo mật / gap | [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) |
| Danh mục phần mềm & tầng | [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) |
| Cấu trúc repo .NET (polyglot) | [cau-truc-repo-mau-dotnet.md](./cau-truc-repo-mau-dotnet.md) |
| Cấu trúc repo Java / Spring Boot (polyglot) | [cau-truc-repo-mau-java.md](./cau-truc-repo-mau-java.md) |
| Cấu trúc `platform/` (thư viện) | [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md) |
| Tiêu chí thiết kế + bảo mật theo tầng (kiến trúc sư, mục 2) | [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) |
| Giám sát & cảnh báo (health, Prometheus, alert-engine) | [gioi-thieu-he-thong-giam-sat-va-canh-bao.md](./gioi-thieu-he-thong-giam-sat-va-canh-bao.md) |

---

| Trường | Giá trị |
|--------|---------|
| File | `docs/huong-dan-cau-hinh.md` |
