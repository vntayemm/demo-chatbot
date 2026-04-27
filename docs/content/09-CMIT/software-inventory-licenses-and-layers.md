# Software inventory: license, layer, dependency, what & why

**Mục đích:** một danh mục **kiến trúc + pháp lý (license)** cho hạ tầng và stack ứng dụng **demo-cmit-api**.  
**Lưu ý pháp lý:** cột *License (tóm tắt)* phản ánh **giấy phép công khai thường gặp** của từng sản phẩm; **mã nguồn dự án** cần đối chiếu `package.json` / `LICENSE` từng gói và chạy **SBOM / license scan** trong CI. MongoDB Server có điều khoản **SSPL** — kiểm tra tư vấn pháp trước khi dùng SaaS công khai trên MongoDB.

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) · [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) *(tiêu chí thiết kế & platform mở/dài hạn)* · [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md) *(cấu trúc thư mục `platform/`)* · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) · [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md)

---

## 1. Legend — “Layer” (tầng)

| Mã | Tầng | Ý nghĩa |
|----|--------|---------|
| **L0** | Hạ tầng vật lý / ảo hóa | Máy chủ, CPU/RAM, disk, mạng DC hoặc cloud VM |
| **L1** | Nền tảng container | Docker Engine, (tuỳ chọn) Kubernetes |
| **L2** | Lưu trữ dữ liệu | MongoDB, PostgreSQL, volume file |
| **L3** | Hàng đợi / message | Redis, NATS |
| **L4** | Nhận thực / IAM | Keycloak (+ DB Keycloak) |
| **L5** | Runtime ứng dụng | Node.js trong container |
| **L6** | Framework & thư viện runtime | Express, driver DB, BullMQ, … |
| **L7** | Công cụ build / dev | TypeScript, ts-node-dev, types packages |

**Dependency (cột):** *ai phụ thuộc ai* ở mức **logic triển khai** (không liệt kê toàn bộ cây npm transitive).

---

## 2. Hạ tầng & image container (Docker Compose chính)

| Software | What (là gì) | License (tóm tắt) | Layer | Phụ thuộc / bị phụ thuộc | Why (vì sao) |
|----------|----------------|-------------------|-------|---------------------------|---------------|
| **Docker Engine + Compose** | Đóng gói & orchestrate container | Apache 2.0 (Docker CE/Moby ecosystem) | L1 | L0 | Chuẩn triển khai dev/staging, lặp lại được |
| **node:18-alpine** (base image) | Image Node trên Alpine Linux | Node.js + build của Joyent/contrib; Alpine packages có license riêng | L5 | L1 | Nhẹ, phổ biến cho microservice TypeScript |
| **mongo:7** | MongoDB Server | **Server: SSPL** (đọc kỹ điều khoản phân phối/SaaS) | L2 | L1 | Document store cho nhiều service (file, integration, sync, …) |
| **postgres:15-alpine** | PostgreSQL | PostgreSQL License (BSD-style) | L2 | L1 | RDBMS per-service pattern trong compose |
| **redis:7-alpine** | Redis in-memory | BSD-3-Clause | L3 | L1 | BullMQ, cache tùy service |
| **nats:2.9** | NATS message broker | Apache 2.0 | L3 | L1 | DLQ / messaging (vd. dbsync, notification) |

---

## 3. Nhận thực (tài liệu / compose ngoài stack chính)

| Software | What | License (tóm tắt) | Layer | Dependency | Why |
|----------|------|-------------------|-------|------------|-----|
| **Keycloak** (`identity-setup/`) | IdP OIDC/SAML | Apache 2.0 | L4 | Postgres cho realm | Chuẩn doanh nghiệp, tích hợp gateway OIDC |
| **postgres:16-alpine** (Keycloak DB) | DB cho Keycloak | PostgreSQL License | L2 | L1 | Lưu realm/user Keycloak |

---

## 4. Ứng dụng — runtime & framework (lặp lại trên nhiều service)

Các dịch vụ Node trong `services/*`, `api-gateway/`, `workers/*` dùng **cùng họ công nghệ** sau (phiên bản cụ thể xem `package.json` từng thư mục).

| Software | What | License (tóm tắt) | Layer | Dependency | Why |
|----------|------|-------------------|-------|------------|-----|
| **Node.js** | V8 + runtime JavaScript/TypeScript | Node.js license (MIT core + phần thành phần khác — xem nodejs.org) | L5 | OS/container | Runtime thống nhất monorepo |
| **Express** | Web framework HTTP | MIT | L6 | Node | REST API nhẹ, ecosystem lớn |
| **TypeScript** | Ngôn ngữ có kiểu, biên dịch → JS | Apache 2.0 | L7 | Node (dev/build) | An toàn kiểu, DX |
| **dotenv** | Đọc biến môi trường | BSD-2-Clause | L6 | — | Cấu hình 12-factor |
| **cors** | CORS middleware | MIT | L6 | Express | Kiểm soát cross-origin |
| **helmet** | Header bảo mật HTTP | MIT | L6 | Express | Giảm lỗ hổng XSS/clickjacking cơ bản |
| **winston** | Logging | MIT | L6 | — | Log có cấu trúc |
| **http-proxy-middleware** | Reverse proxy trong gateway | MIT | L6 | Express | Định tuyến tới microservice |
| **mongodb** (driver) | Client MongoDB chính thức | Apache 2.0 | L6 | MongoDB Server | Truy cập document DB |
| **pg** | Client PostgreSQL | MIT | L6 | PostgreSQL | Truy cập SQL per-service |
| **bullmq** | Hàng đợi job trên Redis | MIT | L6 | Redis | Scheduler worker, retry |
| **ioredis** | Client Redis | MIT | L6 | Redis | Redis usage (gateway audit tùy cấu hình) |
| **cron-parser** | Parse biểu thức cron | MIT | L6 | — | Tính `next_run` scheduler |
| **uuid** | UUID | MIT | L6 | — | Id execution |
| **prom-client** | Metrics Prometheus | Apache 2.0 | L6 | — | `/metrics` scheduler |
| **multer** | Multipart upload | MIT | L6 | Express | Upload/chunk file |
| **@aws-sdk/client-s3** | SDK S3 | Apache 2.0 | L6 | AWS/MinIO | Object storage khi `STORAGE_TYPE=s3` |
| **stripe** (SDK) | Thanh toán Stripe | MIT (SDK); **dịch vụ Stripe** theo ToS riêng | L6 | Stripe API | Payment adapter |
| **axios** | HTTP client | MIT | L6 | — | Worker gọi scheduler internal API |
| **@cmit/platform-*** | Thư viện nội bộ monorepo | Theo `package.json` từng package (thường ISC/MIT) | L6 | Node | Tái sử dụng identity, ip-allowlist, sync, … |

---

## 5. Gói dev-only (không vào image production nếu `npm prune --production`)

| Software | What | License (tóm tắt) | Layer | Why |
|----------|------|-------------------|-------|-----|
| **typescript** | Trình biên dịch `.ts` | Apache 2.0 | L7 | Build chất lượng kiểu |
| **ts-node-dev** | Dev reload | MIT | L7 | Vòng lặp dev nhanh |
| **@types/*** | Định nghĩa kiểu cho thư viện JS | MIT | L7 | TypeScript strict |

---

## 6. Sơ đồ phụ thuộc logic (rút gọn)

```
[L0 Host]
   └── [L1 Docker]
          ├── [L2 Mongo]  ←── services (file, integration, sync, …)
          ├── [L2 Postgres]* ←── mỗi domain service (auth, payment, …)
          ├── [L3 Redis]  ←── scheduler-worker (BullMQ), gateway (tuỳ audit)
          ├── [L3 NATS]   ←── dbsync DLQ, notification (tuỳ cấu hình)
          └── [L5 Node containers]
                  └── [L6 Express + driver + business libs]
```

\*Nhiều container `postgres:15-alpine` — mỗi service một DB logic.

---

## 7. Cách xuất danh sách đầy đủ (transitive) cho compliance

Trong thư mục từng service (hoặc dùng tool monorepo):

```bash
cd services/<service>
npm install
npx license-checker-rseidelsohn --summary
# hoặc
npm ls --all
```

Khuyến nghị CI: **SBOM** (CycloneDX SPDX) + quét lỗ hổng (`npm audit`) theo lịch release.

---

## 8. “Why” tổng hợp theo vai trò kiến trúc

| Vai trò | Phần mềm đại diện | Vì sao chọn |
|---------|-------------------|-------------|
| **Edge API** | Express + Helmet + CORS + Gateway proxy | Một cổng, dễ gắn OIDC và rate limit |
| **Dữ liệu đa dạng** | Mongo + Postgres | Document cho metadata/integration; SQL cho domain có quan hệ chặt |
| **Job / retry** | Redis + BullMQ | Mô hình queue đã tích hợp retry/backoff |
| **Tích hợp file cloud** | AWS SDK S3 | Chuẩn thị trường; MinIO tương thích S3 API |
| **Thanh toán** | Stripe SDK | PCI tập trung phía Stripe; adapter trong code |
| **IdP** | Keycloak | Tự host, OIDC, realm import cho dev |

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/software-inventory-licenses-and-layers.md` |
| Cập nhật | Khi thêm image Docker mới, provider thanh toán mới, hoặc đổi DB chính |

---

*Bảng trên không thay thế tư vấn pháp lý (đặc biệt SSPL MongoDB và điều khoản dịch vụ bên thứ ba như Stripe).*
