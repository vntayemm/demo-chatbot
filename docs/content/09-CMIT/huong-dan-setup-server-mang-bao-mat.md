# Hướng dẫn setup: Server (hạ tầng & nền tảng) — Mạng — Bảo mật

**Đối tượng:** DevOps, hạ tầng, an toàn thông tin, kiến trúc sư triển khai production/staging.  
**Phạm vi:** triển khai **stack demo-cmit-api** (Node, Docker/Kubernetes, MongoDB, PostgreSQL, Redis, API Gateway, dịch vụ tích hợp). Đây là **khung chuẩn**; điền số cụ thể (CIDR, hostname, CA) theo tổ chức.

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) · [trien-khai-onprem-cloud-linux-windows.md](./trien-khai-onprem-cloud-linux-windows.md) · [phat-trien-local-cho-dev.md](./phat-trien-local-cho-dev.md) · [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) *(Docker Compose trên máy dev — đối chiếu với triển khai server)* · [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md) *(cấu hình env & mẫu — đối chiếu secret production)* · [permission-system-design.md](./permission-system-design.md) · [huong-dan-setup-scale.md](./huong-dan-setup-scale.md) *(setup scale — replica, DB, Redis, worker)* · [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) *(bảo trì + backup/restore DB)* · [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md) *(file / object storage)* · [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) *(audit + bảo mật định kỳ)*

---

## Mục lục

1. [Nguyên tắc chung](#1-nguyên-tắc-chung)  
2. [Setup server & nền tảng (infrastructure / platforms)](#2-setup-server--nền-tảng-infrastructure--platforms)  
3. [Setup mạng (network)](#3-setup-mạng-network)  
4. [Setup bảo mật (security)](#4-setup-bảo-mật-security)  
5. [Checklist tổng hợp trước go-live](#5-checklist-tổng-hợp-trước-go-live)  
6. [Quy trình bảo trì & backup DB (tài liệu riêng)](#6-quy-trình-bảo-trì--backup-db-tài-liệu-riêng)  
7. [Quy trình bảo trì audit & bảo mật (tài liệu riêng)](#7-quy-trình-bảo-trì-audit--bảo-mật-tài-liệu-riêng)  
8. [Quy trình bảo trì & backup file storage (tài liệu riêng)](#8-quy-trình-bảo-trì--backup-file-storage-tài-liệu-riêng)  
9. [Hướng dẫn setup scale (tài liệu riêng)](#9-hướng-dẫn-setup-scale-tài-liệu-riêng)  

---

## 1. Nguyên tắc chung

- **Phân tầng:** client chỉ nói chuyện với **edge** (LB + reverse proxy + TLS); database và Redis **không** public Internet.  
- **Cấu hình tách secret:** không đặt mật khẩu production trong git; dùng vault/KMS hoặc secret store của nền tảng (K8s Secret + sealed-secrets/External Secrets, v.v.).  
- **Đo được:** health check + log có **correlation id**; metrics tối thiểu cho gateway và dịch vụ quan trọng.  
- **Cùng một codebase:** on-prem hay cloud chỉ khác **hạ tầng bên dưới** và biến môi trường (xem tài liệu on-prem vs cloud).

---

## 2. Setup server & nền tảng (infrastructure / platforms)

### 2.1 Hệ điều hành & máy chủ

| Hạng mục | Khuyến nghị |
|-----------|-------------|
| OS | **Linux LTS** (Ubuntu Server / RHEL / Rocky) làm host container |
| CPU / RAM | Theo sizing dự án; stack đầy đủ compose dev thường cần **16 GB RAM+** để tham chiếu |
| Disk | SSD; phân vùng riêng cho Docker data-root và volume DB |
| Đồng hồ | NTP/Chrony bật — tránh lệch JWT/OIDC |

### 2.2 Nền tảng chạy ứng dụng (chọn một)

| Lựa chọn | Khi dùng | Ghi chú ngắn |
|-----------|----------|--------------|
| **Docker Compose** trên VM | Staging nhỏ, pilot on-prem | Đơn giản; HA cần thiết kế thêm (LB + nhiều VM hoặc Swarm) |
| **Kubernetes** (EKS/GKE/AKS hoặc on-prem) | Production, scale ngang | Ingress + Service + HPA; Secret tách khỏi image |
| **PaaS managed** (ít can thiệp OS) | Đội nhỏ | Ràng buộc theo nhà cung cấp; vẫn cần cấu hình network + IAM |

**Ứng dụng Node:** chạy trong container image đã build từ `Dockerfile` từng service; **không** cài Node trực tiếp trên host production trừ khi có lý do đặc biệt.

### 2.3 Thành phần dữ liệu & hàng đợi

| Thành phần | Vai trò | Gợi ý triển khai |
|-------------|---------|------------------|
| **MongoDB** | Nhiều service (file, integration, sync, …) | Replica set; backup định kỳ; user/pass riêng từng DB |
| **PostgreSQL** | Scheduler, billing, … (tùy service) | HA theo vendor; connection pool giới hạn |
| **Redis** | BullMQ, cache | Persistence nếu cần không mất job; AUTH bật; mạng nội bộ |
| **Object storage** | File: local dev / **S3-MinIO** production | TLS nội bộ tới MinIO; IAM key rotate |

### 2.4 Nền tảng hỗ trợ (tuỳ dự án)

- **Keycloak / OIDC:** máy hoặc container riêng; DB riêng cho Keycloak.  
- **NATS / Kafka:** nếu dùng DLQ / event (ví dụ `dbsync-service`) — triển khai trong cùng VPC/VNet, không public.

### 2.5 Thứ tự triển khai gợi ý (lần đầu)

1. Mạng + firewall (mục 3).  
2. TLS / chứng chỉ (mục 4.3).  
3. DB + Redis (bảo mật + backup).  
4. Secret store + inject env cho container.  
5. API Gateway + từng microservice (health OK).  
6. IdP (Keycloak) nếu có + cấu hình gateway OIDC.  
7. Kiểm thử smoke + UAT (xem `giai-phap-van-hanh-va-giao-nhan.md`).

---

## 3. Setup mạng (network)

### 3.1 Mô hình phân vùng (logical)

```
Internet
   │
   ▼
[ WAF / DDoS tùy nhà cung cấp ]
   │
   ▼
[ TLS termination — LB / Ingress ]
   │
   ▼  (VPC/VNet: subnet public — chỉ LB/reverse proxy)
[ API Gateway ]
   │
   ▼  (subnet private — application)
[ Microservices ]
   │
   ▼  (subnet private — data)
[ Mongo / Postgres / Redis / MinIO ]
```

### 3.2 Firewall (nguyên tắc)

| Nguồn → Đích | Giao thức | Ghi chú |
|--------------|-----------|---------|
| Internet → LB | **443** (TCP) | Chỉ HTTPS công khai |
| LB → Gateway | 443 hoặc 3000 nội bộ | Tùy terminate TLS ở đâu |
| Gateway → services | **Nội bộ** (3000 hoặc mesh) | Không route trực tiếp từ Internet |
| App → Mongo/Postgres/Redis | Port DB **chỉ** từ subnet app | Không `0.0.0.0/0` |
| Admin → Bastion | SSH/RDP giới hạn IP | Không SSH thẳng vào DB |

### 3.3 DNS

- **Public:** `api.example.com` → LB/Ingress.  
- **Internal:** `*.internal` hoặc service discovery (K8s DNS: `http://payment-service:3009`).  
- **Gateway env:** mọi `*_SERVICE_URL` trỏ hostname **nội bộ** đúng môi trường (Docker network name hoặc K8s service).

### 3.4 Egress (đi ra ngoài)

- Giới hạn outbound nếu chính sách yêu cầu; cho phép HTTPS tới payment provider, object storage, webhooks đối tác.  
- Ghi log / proxy egress tùy compliance.

### 3.5 MTU, proxy, và container

- Nếu đi qua VPN site-to-site, kiểm tra **MTU** tránh lỗi fragment.  
- HTTP proxy doanh nghiệp: cấu hình `HTTP_PROXY` cho build CI — **runtime** container thường cần **no_proxy** nội bộ cho DB.

---

## 4. Setup bảo mật (security)

**Mô hình tầng tổng quan** (supply chain, CI/CD, bootstrap OS, K8s, mạng, edge, app, dữ liệu): [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) — **mục 2**.

### 4.1 Danh tính & truy cập

| Hạng mục | Việc cần làm |
|-----------|--------------|
| **OIDC / Keycloak** | Issuer HTTPS; realm/client đúng audience; đồng bồ thời gian |
| **Gateway** | Bật middleware OIDC khi `API_GATEWAY_OIDC_ENABLED=true`; kiểm tra claim (xem `api-gateway` + tài liệu identity) |
| **Service-to-service** | Token nội bộ dài, xoay định kỳ (`SCHEDULER_INTERNAL_TOKEN`, `SYNC_SERVICE_TOKEN`, …) |

### 4.2 Bảo vệ bề mặt HTTP

- **Helmet**, **CORS** whitelist domain thật (không `*` production).  
- **Rate limit** gateway cho login / webhook (tùy triển khai).  
- **Kích thước body** phù hợp upload / chunk merge.

### 4.3 TLS & chứng chỉ

- TLS **1.2+**; HSTS trên domain public.  
- Chứng chỉ: ACME (Let’s Encrypt) hoặc CA nội bộ; **renew tự động**.  
- Nội bộ service mesh / mTLS: tùy chọn nâng cao (Istio/Linkerd).

### 4.4 Secret & cấu hình nhạy cảm

- Không commit `.env` production.  
- Dùng **KMS/Vault** hoặc secret manager; inject vào pod/container lúc runtime.  
- **Rotate** key định kỳ (payment, S3, DB).  
- Xem hướng **secure-config / KMS** trong `platform/` khi tích hợp.

### 4.5 Dữ liệu & log

- Backup DB **mã hóa** at-rest (disk/volume provider).  
- Log: không ghi secret, PAN; retention theo policy.  
- Endpoint **admin / audit** (`/security/audit/*`, `/api/internal/*`): chỉ allowlist IP hoặc tắt ngoài mạng quản trị — chi tiết lịch rà soát: [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md).

### 4.6 Hardening host (tối thiểu)

- SSH: key-only, tắt root login password; cập nhật patch OS.  
- Docker: không mount socket Docker vào container không tin cậy; user non-root trong image khi có thể.  
- **RBAC K8s:** least privilege cho service account deploy.

### 4.7 Phân quyền ứng dụng

- Mô hình RBAC/ABAC, tenant: xem **[permission-system-design.md](./permission-system-design.md)**.

---

## 5. Checklist tổng hợp trước go-live

### Hạ tầng & nền tảng

- [ ] OS patch + NTP.  
- [ ] Docker/K8s version cố định, có runbook upgrade.  
- [ ] DB/Redis HA + backup + thử restore.  
- [ ] Disk monitoring & alert.

### Mạng

- [ ] Chỉ 443 public; DB/Redis không public.  
- [ ] DNS + TLS hợp lệ.  
- [ ] `*_SERVICE_URL` gateway trỏ đúng dịch vụ nội bộ.

### Bảo mật

- [ ] Secret không trong git; rotation plan.  
- [ ] OIDC (nếu dùng) kiểm thử token hết hạn / refresh.  
- [ ] CORS, rate limit, admin surface locked down.  
- [ ] Correlation ID / logging tập trung (mục tiêu).

---

## 6. Quy trình bảo trì & backup DB (tài liệu riêng)

Chi tiết **lịch bảo trì**, thứ tự nâng cấp, **`pg_dump` / `mongodump`**, restore drill, RPO/RTO và Redis: xem **[quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md)**.

---

## 7. Quy trình bảo trì audit & bảo mật (tài liệu riêng)

**Retention log**, rà soát export audit, correlation id, xoay secret/TLS/OIDC, pentest và drill điều tra: xem **[quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md)**.

---

## 8. Quy trình bảo trì & backup file storage (tài liệu riêng)

**Metadata MongoDB `file_service`**, volume **`file-media`** (local), hoặc bucket **S3/MinIO**, chunk upload, drill restore file: xem **[quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md)**.

---

## 9. Hướng dẫn setup scale (tài liệu riêng)

Replica gateway/service, HPA Kubernetes, pool Postgres, Redis HA, scale **scheduler-worker**, **file-service** với S3, checklist load test: xem **[huong-dan-setup-scale.md](./huong-dan-setup-scale.md)**.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/huong-dan-setup-server-mang-bao-mat.md`](./huong-dan-setup-server-mang-bao-mat.md) |
| Cập nhật | Khi đổi mô hình mạng mặc định, bật OIDC bắt buộc toàn cục, hoặc đổi chiến lược backup |

---

*Tài liệu này không thay thế chính sách bảo mật nội bộ (ISMS) của tổ chức — dùng làm input cho tài liệu đó.*
