# Hướng dẫn setup & scale (mở rộng quy mô)

**Mục đích:** hướng dẫn **thực hành** triển khai để hệ **demo-cmit-api** chịu tải cao hơn: scale **tầng ứng dụng** (stateless), **hàng đợi**, **scheduler/worker**, sau đó **tầng dữ liệu** (Postgres, Mongo, Redis, object storage).  
**Đọc trước:** [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) (mạng, TLS, secret) · [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) mục **4. High availability & scale** · [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md).

---

## 1. Nguyên tắc (thứ tự ưu tiên)

1. **Xác định bottleneck:** CPU API, độ sâu queue Redis, I/O DB, latency tích hợp ngoài — đo trước khi scale mù.  
2. **Scale ngang tầng stateless trước:** `api-gateway`, các microservice HTTP (tăng **replica** sau load balancer).  
3. **Không** scale nhiều bản `file-service` dùng **cùng volume local** — chuyển **S3/MinIO** hoặc NFS có khóa file phù hợp.  
4. **Redis / queue:** một cluster logic cho BullMQ; tăng **worker** và `WORKER_CONCURRENCY` trước khi nhân scheduler planner nếu queue là nút thắt.  
5. **DB:** replica đọc / pool / sharding theo **service** — tránh một Postgres ún cho toàn monorepo.

---

## 2. API Gateway & microservice (stateless)

| Việc | Gợi ý |
|------|--------|
| **Số replica** | Bắt đầu 2+ gateway; service nóng (payment, file upload) tách replica riêng. |
| **Load balancer** | Health check `GET /health` (hoặc path tương đương từng service); **readiness** chỉ pass khi DB/Redis sẵn sàng. |
| **Session** | Dùng **JWT/OIDC** — **không** cần sticky session cho API thuần. |
| **Timeout** | Gateway: tăng `proxyTimeout` cho upload/chunk merge (đã có hướng dẫn trong doc file-service). |
| **Env nội bộ** | `*_SERVICE_URL` trỏ **DNS nội bộ** (K8s Service name), không gắn IP pod. |

**Kubernetes (gợi ý):** `Deployment.spec.replicas` + **HPA** (CPU hoặc custom metric request rate); `PodDisruptionBudget` cho gateway.

**Docker Compose (giới hạn):** `docker compose up --scale api-gateway=2` chỉ hữu ích khi phía trước có **reverse proxy** cân bằng tải — compose một mình không gắn LB tự động cho cùng port published.

---

## 3. Scheduler & worker (BullMQ)

| Thành phần | Scale |
|-------------|--------|
| **scheduler-service** (planner) | Nhiều replica **an toàn** — claim job bằng transaction `SKIP LOCKED` (xem `scheduler-service/README.md`). |
| **scheduler-worker** | Tăng số replica **hoặc** `WORKER_CONCURRENCY` (xử lý song song nhiều job trong một process). |
| **Redis** | Một logical queue `scheduler-jobs`; Redis phải đủ RAM và (tuỳ chính sách) **persistence** để giảm mất job khi restart. |

**Công thức vận hành (tham khảo):**  
`throughput_job_per_min ≈ (số_worker × concurrency_trung_bình) / thời_gian_trung_bình_một_job_phút` — điều chỉnh theo đo thực tế.

---

## 4. sync-service

- **Replica nhiều:** OK nếu mỗi request độc lập; dùng chung Mongo `sync_audit` + **idempotencyKey** để retry an toàn.  
- **Tải HTTP transport:** tăng timeout `SYNC_HTTP_TIMEOUT_MS`; cân nhắc **circuit breaker** (chưa bắt buộc trong repo) khi đích ngoài chậm.

---

## 5. PostgreSQL & MongoDB

| Việc | Gợi ý |
|------|--------|
| **Postgres** | Read replica cho truy vấn nặng; **PgBouncer** (transaction mode) giới hạn kết nối tới DB; pool trong app (`max` pool) theo `(replica_app × pool_per_process)` không vượt `max_connections` DB. |
| **Mongo** | Replica set; **readPreference** `secondary` cho đọc báo cáo nếu chấp nhận eventual consistency. |
| **Per-service DB** | Giữ pattern **một service — một DB** để scale độc lập (đã thấy trong `docker-compose`). |

---

## 6. Redis (BullMQ + cache)

- **Production:** Redis Sentinel hoặc Redis Cluster; **AUTH** + ACL mạng nội bộ.  
- **Persistence:** RDB/AOF nếu chấp nhận chi phối hiệu năng nhưng cần **ít mất job** sau restart.  
- **Giám sát:** memory usage, evicted keys, độ sâu queue Bull.

---

## 7. File / object storage

- **Nhiều replica `file-service`:** bắt buộc `STORAGE_TYPE=s3` (hoặc MinIO) — không dùng volume local chung kiểu dev.  
- Chi tiết backup: [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md).

---

## 8. Checklist trước khi tăng tải production

- [ ] Health/readiness cho mọi service nằm sau LB.  
- [ ] Giới hạn pool DB + timeout HTTP đích ngoài.  
- [ ] Redis HA hoặc chấp nhận RPO job khi Redis đơn.  
- [ ] File storage không phụ thuộc disk pod.  
- [ ] HPA hoặc runbook scale thủ công có ngưỡng (CPU 70%, latency p95).  
- [ ] Load test staging (vd. k6) với **cùng** số replica dự kiến prod.

---

## 9. Chống pattern thường gặp

| Sai lầm | Hậu quả |
|---------|---------|
| Scale gateway mà không scale DB | DB trở thành nút thắt, timeout lan tràn. |
| Nhiều worker + pool quá lớn | `too many connections` Postgres. |
| Scale file-service + local volume | Ghi đè file / không nhất quán. |
| Bỏ qua idempotency khi retry client | Trùng sync / trùng side-effect. |

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/huong-dan-setup-scale.md` |
| Cập nhật | Khi thêm HPA mẫu Helm hoặc đổi khuyến nghị Redis HA |
