# Cấu hình Network/Domain

## 1) Mục tiêu

Tài liệu này mô tả chuẩn cấu hình network và domain cho hệ thống `demo-cmit-api`, đảm bảo truy cập ổn định, bảo mật, dễ mở rộng và dễ vận hành theo nhiều môi trường.

## 2) Quy ước domain theo môi trường

Ví dụ quy ước:
- DEV:
  - `api.dev.cmit.local`
  - `docs.dev.cmit.local`
  - `ws.dev.cmit.local`
- UAT:
  - `api.uat.cmit.vn`
  - `docs.uat.cmit.vn`
  - `ws.uat.cmit.vn`
- PROD:
  - `api.cmit.vn`
  - `docs.cmit.vn`
  - `ws.cmit.vn`

Nguyên tắc:
- Tách subdomain theo vai trò (API, Docs, Realtime).
- Không dùng chung một endpoint cho tất cả loại traffic.
- Tên domain phải phản ánh rõ môi trường.

## 3) Cấu hình DNS khuyến nghị

### 3.1 Record cơ bản
- `A/AAAA`:
  - Trỏ `api.*`, `docs.*`, `ws.*` về Load Balancer/Ingress public.
- `CNAME`:
  - Dùng khi cần alias giữa các tên miền dịch vụ.
- `TXT`:
  - Phục vụ xác minh domain, bảo mật mail hoặc xác thực provider.

### 3.2 TTL
- DEV/UAT: `TTL 60-300s` để đổi nhanh khi test.
- PROD: `TTL 300-600s` để cân bằng giữa ổn định và khả năng failover.

## 4) Cấu hình TLS/SSL

- Bắt buộc HTTPS cho toàn bộ endpoint public.
- Chứng chỉ:
  - Wildcard: `*.cmit.vn` hoặc
  - Chứng chỉ riêng theo từng subdomain.
- TLS policy:
  - Chỉ cho phép TLS 1.2 trở lên.
  - Tắt cipher yếu, bật HSTS theo chính sách bảo mật.
- Gia hạn chứng chỉ:
  - Tự động hóa và cảnh báo trước khi hết hạn.

## 5) Cấu hình Ingress/Load Balancer

- Routing theo host:
  - `api.*` -> `api-gateway`
  - `docs.*` -> `doc-gateway`
  - `ws.*` -> `realtime-gateway`
- Thiết lập health check riêng cho từng backend.
- Bật sticky session khi use case realtime yêu cầu.
- Giới hạn request size/timeout theo loại traffic (API thường, upload file, streaming).

## 6) Cấu hình bảo mật network

- Chỉ mở public inbound:
  - `80` (redirect sang 443)
  - `443` (HTTPS chính thức)
- Cổng nội bộ (DB, Redis, NATS):
  - Chỉ cho phép private subnet hoặc security group được chỉ định.
- IP allowlist:
  - Áp dụng cho endpoint admin và endpoint nội bộ nhạy cảm.
- DDoS/WAF:
  - Bật protection ở lớp edge nếu có public internet traffic lớn.

## 7) Cấu hình CORS và trusted origins

- DEV:
  - Cho phép origin kiểm soát theo danh sách local dev.
- UAT/PROD:
  - Chỉ allow danh sách frontend domain chính thức.
- Không dùng wildcard `*` cho API có auth credentials.

## 8) Quan sát và kiểm soát vận hành

- Theo dõi:
  - TLS handshake error
  - DNS resolution error
  - 4xx/5xx theo host
  - Latency theo endpoint/domain
- Cảnh báo:
  - Domain/certificate sắp hết hạn
  - Tăng đột biến error rate theo host
  - Backend unhealthy sau LB

## 9) Checklist go-live Network/Domain

- Domain và DNS record đúng môi trường
- TLS certificate hợp lệ và còn hạn
- Route host -> gateway/backend đúng
- CORS origin đúng whitelist
- Security group/firewall đã khóa cổng không cần thiết
- Monitoring/alert theo host đã hoạt động
