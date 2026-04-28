# Dockerized (Image/Container management)

## 1) Giới thiệu

Tài liệu này mô tả chuẩn Docker hóa hệ thống `demo-cmit-api`, bao gồm quản lý image, container, tagging, build pipeline và vận hành runtime.

Mục tiêu:
- Chuẩn hóa vòng đời image từ build đến deploy.
- Giảm khác biệt giữa môi trường DEV/UAT/PROD.
- Tăng độ an toàn và khả năng truy vết phiên bản phát hành.

## 2) Nguyên tắc Docker hóa

- Mỗi service có `Dockerfile` riêng, build độc lập.
- Chạy theo nguyên tắc `one process per container`.
- Không hardcode secret vào image.
- Image phải immutable, cấu hình runtime qua env/config.
- Ưu tiên base image gọn nhẹ, an toàn (ví dụ Alpine hoặc distroless phù hợp).

## 3) Quản lý Image

### 3.1 Tagging strategy
- `service-name:<semver>`
- `service-name:<git-sha>`
- `service-name:latest` chỉ dùng cho DEV/internal test, không dùng để pin production.

### 3.2 Registry strategy
- Dùng registry tập trung (Docker Hub private, GHCR, ECR, GitLab Registry...).
- Phân repo image theo domain service.
- Áp dụng retention policy cho tag cũ.

### 3.3 Image metadata
- Gắn label:
  - source repo
  - commit SHA
  - build time
  - version
- Hỗ trợ audit và rollback nhanh.

## 4) Quản lý Container runtime

- Cấu hình tài nguyên:
  - CPU limit/request
  - Memory limit/request
- Thiết lập:
  - healthcheck
  - restart policy
  - log driver/rotation
- Giới hạn quyền container:
  - run as non-root (khi khả thi)
  - read-only root filesystem (khi phù hợp)

## 5) Build pipeline khuyến nghị

1. Lint + unit test
2. Build image
3. Scan bảo mật image (CVE)
4. Push image lên registry
5. Deploy theo môi trường
6. Smoke test sau deploy

Khuyến nghị:
- Dùng cache layer để tăng tốc build.
- Pin base image theo digest khi lên production.

## 6) Docker Compose cho DEV/UAT

- Dùng `docker-compose.yml` để dựng nhanh full stack local/integration.
- Chia cấu hình theo file override:
  - `docker-compose.yml` (base)
  - `docker-compose.override.yml` (local dev)
  - `docker-compose.prod.yml` (nếu cần mô phỏng prod)

## 7) Bảo mật Image/Container

- Không để lộ secret trong:
  - Dockerfile
  - build args
  - source code
- Quét lỗ hổng định kỳ:
  - base image
  - dependency layer
- Bật policy chặn deploy image có lỗ hổng mức cao/chí mạng.

## 8) Monitoring và vận hành

- Theo dõi:
  - container restart count
  - OOMKilled events
  - CPU/memory usage
  - image pull errors
- Cảnh báo:
  - crash loop
  - unhealthy container
  - disk pressure do image/log growth

## 9) Checklist go-live Dockerized

- Đã chốt image tag theo version + git SHA.
- Đã scan bảo mật và xử lý CVE nghiêm trọng.
- Đã có healthcheck và restart policy cho từng container.
- Đã chuẩn hóa env vars và secret injection.
- Đã có runbook rollback theo image tag ổn định.
