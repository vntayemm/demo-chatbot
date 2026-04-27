# Danh sách chủ đề blog đề xuất (CEIAP / demo-cmit-api)

**Mục đích:** liệt kê **các bài blog có thể viết** để giới thiệu nền tảng, từng thành phần `platform/*`, từng dịch vụ/microservice, kiến trúc–vận hành–bảo mật, và **case study** — dùng làm backlog nội dung, SEO cluster, hoặc onboarding khách hàng.  
**Cách dùng:** mỗi dòng `[]` là một bài độc lập; có thể gom thành **series** (vd. “Platform 101”, “Một tuần với sync-service”). Mỗi bài nên có: vấn đề → giải pháp trong repo → ưu/nhược (nếu là platform) → link doc kỹ thuật.  
**Tham chiếu repo:** `platform/*`, `services/*`, `docs/*`, `api-gateway`.

---

## Phần A — Kiến nền (base knowledge): từng package `platform/*`

Mỗi package một bài (hoặc tách 2 bài: *Kiến trúc* + *Cách dùng trong code*). Cấu trúc gợi ý: **Vấn đề giải quyết** → **Ưu điểm** → **Hạn chế / khi không nên dùng** → **Kiến trúc (interface / adapter / factory)** → **Ví dụ import & cấu hình** → Link [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md).

| # | Chủ đề blog (tiêu đề gợi ý) | Gói `platform/` |
|---|-----------------------------|-------------------|
| A1 | Tại sao cần lớp abstraction messaging trong CEIAP? | `messaging` |
| A2 | KMS trong nền tảng: bảo vệ secret & rotate | `kms` |
| A3 | Secure-config: cấu hình nhạy cảm có audit | `secure-config` |
| A4 | Đồng bộ DTO với audit & idempotency — `platform/sync` | `sync` |
| A5 | Policy engine: gắn quy tắc vào luồng nghiệp vụ | `policy-engine` |
| A6 | Storage abstraction: S3, MinIO, local — chọn thế nào? | `storage` |
| A7 | Identity adapters: Okta, Keycloak, mạng xã hội — ranh giới trách nhiệm | `identity` |
| A8 | MFA (TOTP, …) tách khỏi auth service | `mfa` |
| A9 | Webhook engine: retry, backoff, HMAC | `webhook-engine` |
| A10 | Realtime: Redis Streams vs lựa chọn khác | `realtime` |
| A11 | Notification đa kênh (push, email, …) | `notification` |
| A12 | Email adapters: SES, Mailgun — deliverability & bảo mật | `email` |
| A13 | SMS adapters: Twilio, … | `sms` |
| A14 | Payment adapter layer (không nhét SDK vào domain) | `payment` |
| A15 | Invoice / eInvoice adapter | `invoice` |
| A16 | Search DSL & OpenSearch | `search` |
| A17 | Document DB helpers & pattern truy cập Mongo | `document-db` |
| A18 | Relational DB: Oracle, MSSQL, … — khi nào cần | `relational-db` |
| A19 | Cache-db & Redis patterns | `cache-db` |
| A20 | Warehouse / analytics sinks — batch vs stream | `warehouse`, `analytics` |
| A21 | Alert engine + JSONLogic | `alert-engine` |
| A22 | Calendar adapters (Outlook, Apple, …) | `calendar` |
| A23 | Approval workflow FSM | `approval` |
| A24 | IP allowlist middleware cho admin API | `ip-allowlist` |
| A25 | Isolate: biên dịch SQL/JS an toàn — use case & rủi ro | `isolate` |
| A26 | Data solver: bài toán “ghép dữ liệu” | `data-solver` |
| A27 | Template engine cho thông báo / tài liệu | `template` |
| A28 | Render pipeline (PDF/HTML) | `render` |
| A29 | Trace broker: Kafka/NATS cho observability | `trace-broker` |
| A30 | Integration token & retry bearer | `integration-token` |
| A31 | AI package trong CEIAP — ranh giới sản phẩm vs demo | `ai` |

---

## Phần B — Thành phần đã thiết kế trong hệ thống (microservice & hạ tầng app)

Mỗi service một bài **“Giới thiệu + API chính + DB + tích hợp gateway”**; nhóm nhỏ có thể gom series “Domain cảng”.

### B.1 Cổng & nền tảng chung

| # | Chủ đề |
|---|--------|
| B1 | API Gateway: định tuyến, `*_SERVICE_URL`, health |
| B2 | Auth-service & JWT: luồng đăng nhập (concept) |
| B3 | Authorization-service & Mongo `cmit_authorization` |
| B4 | RBAC-service (nếu triển khai song song permission-design) |
| B5 | Session-service: state vs stateless |
| B6 | Audit-service: ghi nhận sự kiện hệ thống |
| B7 | MFA-service tách khỏi auth |

### B.2 Nghiệp vụ cảng / portal (mỗi service một bài ngắn hoặc gom theo domain)

| # | Service (thư mục) |
|---|-------------------|
| B10 | `user-service` |
| B11 | `booking-service` |
| B12 | `edo-service` |
| B13 | `tracktrace-service` |
| B14 | `delivery-service` |
| B15 | `dispatch-service` |
| B16 | `training-service` |
| B17 | `payment-service` (+ OIDC, cache, ví dụ E2E) |
| B18 | `billing-service` |
| B19 | `tdr-service` |
| B20 | `upload-service` / `file-service` (chunk, storage) |
| B21 | `notification-service` (runtime) |
| B22 | `csv-service` / `import-service` |
| B23 | `integration-service` — **Integration Manager deep dive** |
| B24 | `einvoice-service` |
| B25 | `approval-service` (workflow runtime) |
| B26 | CRM nhẹ: `lead-service`, `contact-service`, `account-service`, `opportunity-service`, `activity-service`, `quote-service` (series 6 bài hoặc 1 bài tổng + 6 bài ngắn) |

### B.3 Đồng bộ, lịch, lịch sử

| # | Chủ đề |
|---|--------|
| B30 | `sync-service`: API `/api/sync`, token, transport HTTP vs noop |
| B31 | `dbsync-service`: khác sync-service chỗ nào + DLQ |
| B32 | `scheduler-service` + worker: planner `SKIP LOCKED`, `job_runs` |
| B33 | `dbhistory-service`: lịch sử thay đổi / audit bổ sung |

### B.4 Tài liệu & meta

| # | Chủ đề |
|---|--------|
| B40 | `doc-metadata-service` / `doc-upload-service` |
| B41 | Thư mục `_system-design` trong repo: cách dùng nội bộ |

---

## Phần C — Kiến trúc, bảo mật, triển khai (cross-cutting)

| # | Chủ đề blog (gắn doc có sẵn) |
|---|------------------------------|
| C1 | CEIAP là gì? So sánh với “tích hợp point-to-point” — [ceiap-glossary.md](./ceiap-glossary.md) |
| C2 | Microservice vs monolith: bài học từ `demo-cmit-api` |
| C3 | Bảo mật theo tầng từ supply chain đến dữ liệu — [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) §2 |
| C4 | OIDC ở gateway và ở payment: hai lớp — [vi-du-luong-thanh-toan-end-to-end.md](./vi-du-luong-thanh-toan-end-to-end.md) |
| C5 | RBAC/ABAC & workflow — trích [permission-system-design.md](./permission-system-design.md) |
| C6 | Docker Compose full stack: RAM, `sync-service` build context — [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) |
| C7 | Hybrid dev: DB trong Docker, service chạy npm — [phat-trien-local-cho-dev.md](./phat-trien-local-cho-dev.md) |
| C8 | Staging/production: TLS, secret, firewall — [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) |
| C9 | Scale gateway, DB pool, Redis HA — [huong-dan-setup-scale.md](./huong-dan-setup-scale.md) |
| C10 | Polyglot: thêm service .NET sau gateway — [cau-truc-repo-mau-dotnet.md](./cau-truc-repo-mau-dotnet.md) |
| C10b | Polyglot: thêm service Java / Spring Boot — [cau-truc-repo-mau-java.md](./cau-truc-repo-mau-java.md) |
| C11 | Tích hợp NAVIS / TOS: an toàn & không mất dữ liệu — [gioi-thieu-tich-hop-navis-he-thong-thu-ba.md](./gioi-thieu-tich-hop-navis-he-thong-thu-ba.md) |
| C12 | License Mongo SSPL & inventory — [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) |
| C13 | Bảng cam kết tiêu chí & gap — giải thích cho lãnh đạo — [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) |
| C14 | UAT & checklist go-live — [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) |
| C15 | Báo giá triển khai theo gói — [bang-bao-gia-goi-cong-viec-mau.md](./bang-bao-gia-goi-cong-viec-mau.md) |

---

## Phần D — Case study (kịch bản nghiệp vụ)

Mỗi case: **bối cảnh** → **actor** → **luồng kỹ thuật** (gateway → service → integration/sync) → **sự cố & cách xử** → **KPI** (thời gian, độ chính xác dữ liệu).

| # | Tiêu đề case study gợi ý |
|---|---------------------------|
| D1 | “Một booking đi qua toàn bộ cổng: từ portal đến billing” |
| D2 | “Đồng bộ trạng thái container với TOS: retry, idempotency, audit trail” |
| D3 | “Thanh toán thất bại: NO_PROVIDER, cấu hình Integration Manager, UX” |
| D4 | “eInvoice: đổi provider Viettel ↔ VNPT không redeploy” |
| D5 | “Scheduler: job trùng lặp và cách planner chống double-run” |
| D6 | “File lớn: chunk upload + virus scan (nếu có) + MinIO” |
| D7 | “Multi-tenant: header tenant + policy evaluation” |
| D8 | “Sự cố mạng: queue đầy, scale worker, quan sát BullMQ” |
| D9 | “Khôi phục sau sự cố: restore DB + đối soát sync_audit” |
| D10 | “Zero-downtime deploy: chiến lược blue/green hoặc canary (khái niệm + gap hiện tại)” |

---

## Phần E — So sánh & ý kiến (thought leadership)

| # | Chủ đề |
|---|--------|
| E1 | CEIAP vs iPaaS SaaS: kiểm soát vs tốc độ |
| E2 | Tại sao “một Integration Manager” thắng “mười script cron” |
| E3 | Sync DTO vs dbsync: bảng quyết định nhanh |
| E4 | GenAI trên CEIAP: ranh giới đề xuất trong [huong-mo-rong-ai.md](./huong-mo-rong-ai.md) |
| E5 | Roadmap CRM/ERP/no-code — trích các `huong-mo-rong-*.md` |

---

## Gợi ý series xuất bản (thứ tự)

1. **Tuần 1–2:** C1, C2, B1, B23 (CEIAP + gateway + Integration Manager).  
2. **Tuần 3–6:** A1–A8 (platform lõi: messaging, KMS, secure-config, sync, …).  
3. **Tuần 7–10:** B10–B20 (domain cảng) xen C3–C6 (bảo mật & Docker).  
4. **Tuần 11+:** D1–D5 case study + E1–E3 ý kiến.

---

## Metadata SEO (mẫu cho mỗi bài)

- **Slug:** tiếng Anh ngắn, trùng cluster (vd. `ceiap-platform-sync-idempotency`).  
- **Meta description:** 1–2 câu, có từ khóa “cảng”, “tích hợp”, “microservice” nếu phù hợp.  
- **Internal link:** 2–3 link sang `docs/` tương ứng.

---

| Trường | Giá trị |
|--------|---------|
| File | `docs/danh-sach-chu-de-blog-de-xuat.md` |
