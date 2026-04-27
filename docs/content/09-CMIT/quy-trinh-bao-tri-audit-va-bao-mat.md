# Quy trình bảo trì audit & bảo mật

**Mục đích:** quy định **định kỳ** và **theo sự kiện** cho vận hành **nhật ký kiểm tra (audit trail)** và **kiểm soát bảo mật** khi triển khai **demo-cmit-api** (gateway, microservice, DB, Redis).  
**Phạm vi:** bổ sung cho [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) (mục 4) và [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) (backup dữ liệu audit nằm trong backup Mongo/Postgres tương ứng).

**Liên quan:** [permission-system-design.md](./permission-system-design.md) · [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) · [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md)

---

## 1. Phạm vi “audit” trong repo này

| Nguồn | Nội dung ghi nhận | Lưu đâu / đọc thế nào |
|-------|-------------------|------------------------|
| **sync-service** | Mỗi lần `POST /api/sync/runs`: tenant, entity, hướng, trạng thái, lỗi, correlation | MongoDB DB `sync_service`, collection audit (xem [sync-service README](../services/sync-service/README.md)); `GET /api/sync/runs/:runId` |
| **scheduler** | Chạy job: `job_runs` (trạng thái, lỗi, thời gian) | Postgres `scheduler_db` (theo cấu hình service) |
| **API Gateway — security audit** | Sự kiện OIDC allow/deny: path, method, IP, subject, lý do | Bộ nhớ process (tối đa ~1000 sự kiện gần) **hoặc** Redis Stream khi `API_GATEWAY_AUDIT_REDIS_ENABLED=true` (`api-gateway/src/security-audit.store.ts`). HTTP: `GET /security/audit/events`, `.../events.jsonl`, `.../events.cursor`; forward: `POST /security/audit/forward` — mẫu: `api-gateway/security-audit-cursor-e2e.http` |
| **Log ứng dụng** | Lỗi, trace (không ghi secret) | stdout/container log → nên tập trung (ELK/Datadog/CloudWatch) |
| **dbhistory / entity** (nếu bật) | Thay đổi thực thể, audit log nghiệp vụ | Mongo `dbhistory` — theo service dùng module |

**Nguyên tắc:** audit phục vụ **truy vết** và **kiểm toán**; cần **retention**, **quyền đọc hạn chế**, và **đồng hồ chuẩn (NTP)** để timestamp đáng tin.

---

## 2. Quy trình bảo trì audit (định kỳ)

### 2.1 Hàng tuần (15–30 phút)

| Việc | Owner gợi ý | Ghi chú |
|------|----------------|---------|
| Kiểm tra **sink log** tập trung: lỗi 5xx, spike deny OIDC | DevOps / SecOps | Alert rule có ticket |
| Lấy mẫu **correlation id** từ một luồng (sync hoặc payment) và trace qua 2–3 service | On-call | Đảm bảo header `X-Correlation-Id` (hoặc tương đương) không bị strip ở proxy |
| Xem **độ sâu** Redis stream audit gateway (nếu bật) — có backlog consumer không? | DevOps | Tránh mất sự kiện nếu consumer chết |

### 2.2 Hàng tháng

| Việc | Ghi chú |
|------|---------|
| **Rà soát quyền** truy cập `/security/audit/*` và API nội bộ (`/api/internal/*` nếu có) | Chỉ allowlist IP quản trị; tắt ngoài internet — theo [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) mục 4.5 |
| **Retention:** xác nhận policy lưu log/Mongo audit (vd. 90 ngày hot, archive sau đó) | Tuân thủ nội bộ + pháp lý ngành |
| **Drill điều tra giả định:** “Một `invoiceNo` bị nghi ngờ” — truy từ `payments` + log gateway + sync_audit nếu có | Ghi biên bản 1 trang |
| Backup có **bao gồm** DB chứa `sync_audit` / `scheduler` — xem [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) | |

### 2.3 Sau sự cố bảo mật hoặc sự cố vận hành

1. **Đóng băng** bằng chứng: snapshot volume / export audit DB **trước** khi sửa hàng loạt.  
2. Truy vết theo **thời gian + IP + subject** (gateway security audit + IdP logs).  
3. **Rotate** secret nghi ngờ (DB, `SCHEDULER_INTERNAL_TOKEN`, `SYNC_SERVICE_TOKEN`, API key tích hợp).  
4. Post-mortem: nguyên nhân gốc, hành động khắc phục, ngày tái kiểm.

---

## 3. Quy trình bảo trì bảo mật (định kỳ)

### 3.1 Hàng tuần / theo CVE

| Việc | Chi tiết |
|------|----------|
| **Dependency & image** | Chạy `npm audit` / SCA; cập nhật base image khi CVE; xem [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) |
| **Surface** | Rà soát port public: chỉ 443 (hoặc LB); DB/Redis **không** lộ Internet |

### 3.2 Hàng tháng

| Việc | Chi tiết |
|------|----------|
| **Xoay secret** | DB password, token nội bộ scheduler/sync, key S3/MinIO, Stripe secret — theo lịch tổ chức |
| **TLS** | Kiểm tra ngày hết hạn chứng chỉ; ACME renew hoạt động |
| **OIDC / Keycloak** | Realm/client: audience, redirect URI; xoay client secret nếu có; kiểm thử token hết hạn |
| **CORS / rate limit** | Production không `*`; bật rate limit endpoint nhạy cảm (đăng nhập, webhook) nếu đã triển khai |
| **Phân quyền ứng dụng** | Rà soát policy route mới; đối chiếu [permission-system-design.md](./permission-system-design.md) |

### 3.3 Hàng quý (hoặc theo hợp đồng)

| Việc | Chi tiết |
|------|----------|
| **Pentest / vulnerability scan** | Ứng dụng + hạ tầng; lưu báo cáo và ticket remediation |
| **Access review** | Ai có quyền deploy, đọc secret store, đọc audit export |
| **Integration Manager** | Ai đã đổi `setPrimary` payment/einvoice; log thay đổi (Mongo instance — cân nhắc bổ sung audit collection nếu chưa có) |

### 3.4 Hardening host & container (nhắc lại)

- SSH key-only; patch OS.  
- Docker/K8s: least privilege service account; không mount docker.sock vào workload không tin cậy.  
- Chi tiết: [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) mục 4.6.

---

## 4. Ma trận RACI rút gọn

| Hoạt động | DevOps | SecOps / ATTT | Dev lead |
|------------|--------|---------------|----------|
| Cấu hình log tập trung + retention | R | A | C |
| Xoay secret / TLS | R | A | I |
| Rà soát policy OIDC/RBAC | C | A | R |
| Drill điều tra audit | R | A | C |
| Patch CVE dependency | R | C | A |

*(R/A/C/I theo convention RACI.)*

---

## 5. Checklist nhanh trước go-live (audit + security)

- [ ] Correlation id đi qua gateway → service quan trọng (đo thử).  
- [ ] Security audit gateway: quyết định in-memory vs Redis Stream; nếu Redis — backup/consumer rõ ràng.  
- [ ] Endpoint `/security/audit/*` **không** public (chỉ mạng quản trị / LB allowlist).  
- [ ] Log không chứa PAN, mật khẩu, raw JWT đầy đủ (mask).  
- [ ] `sync_service` / `scheduler_db` nằm trong kế hoạch backup + restore drill.  
- [ ] Runbook sự cố: liên hệ, bước rotate secret, bước preserve evidence.

---

## 6. Biên bản rà soát (mẫu điền)

| Trường | Giá trị |
|--------|---------|
| Ngày | |
| Người thực hiện | |
| Phạm vi (staging/prod) | |
| Mục đã kiểm (tick từ mục 2–3) | |
| Phát hiện | |
| Việc đã xử lý / ticket | |

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/quy-trinh-bao-tri-audit-va-bao-mat.md` |
| Cập nhật | Khi thêm nguồn audit mới hoặc đổi cơ chế gateway security audit |
