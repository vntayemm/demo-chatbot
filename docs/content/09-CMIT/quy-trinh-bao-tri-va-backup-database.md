# Quy trình bảo trì & backup cơ sở dữ liệu

**Mục đích:** khung **vận hành** cho môi trường staging/production triển khai **demo-cmit-api**: lịch bảo trì, thứ tự nâng cấp an toàn, **sao lưu — lưu giữ — thử phục hồi** cho PostgreSQL, MongoDB và các thành phần liên quan (Redis, object storage).  
**Phạm vi:** áp dụng sau khi đã có [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) (mạng, TLS, secret); lệnh mẫu dùng tên container **docker-compose** làm tham chiếu — điều chỉnh host/K8s theo triển khai thực tế.

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) · [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md) *(object storage + metadata file)* · [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) *(audit trail + bảo mật định kỳ)* · [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) · [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md)

---

## 1. Nguyên tắc chung

| Nguyên tắc | Giải thích ngắn |
|------------|-------------------|
| **Backup trước, thay đổi sau** | Mọi thay đổi schema / nâng major DB phải có bản backup hoặc snapshot xác nhận OK. |
| **Thử restore định kỳ** | Backup không được coi là hợp lệ cho đến khi **restore thành công** trên máy hoặc namespace tách biệt. |
| **RPO / RTO ghi bằng số** | Thỏa thuận với nghiệp vụ: chấp nhận mất tối đa bao nhiêu phút dữ liệu (RPO), downtime tối đa (RTO). |
| **Mã hóa & phân quyền** | File backup chứa dữ liệu nhạy cảm — lưu kho có **encryption at rest**; chỉ role vận hành được đọc/ghi. |
| **Tách môi trường** | Không restore backup production thẳng vào dev công khai; dùng mask/anonymize nếu cần. |

---

## 2. Quy trình bảo trì (định kỳ)

### 2.1 Lịch gợi ý

| Tần suất | Việc | Ghi chú |
|----------|------|---------|
| **Hàng ngày (tự động)** | Backup incremental/log tùy công cụ; kiểm tra job backup OK | Alert nếu job fail |
| **Hàng tuần** | Xem dashboard disk DB/Redis; log volume; cảnh báo 5xx | |
| **Hàng tháng** | **Drill restore** một DB không quan trọng hoặc full trên staging | Ghi biên bản |
| **Theo CVE** | Quét image + dependency ([software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md)); lên kế hoạch patch | Ưu tiên internet-facing |
| **Theo release ứng dụng** | Tag image; migration DB (nếu có) theo runbook; smoke test | |

### 2.2 Thứ tự nâng cấp an toàn (một phiên)

1. Thông báo cửa sổ bảo trì (nếu có downtime).  
2. **Dừng ghi** hoặc chuyển traffic (read-only / maintenance page) nếu migration lớn.  
3. **Backup full** các DB liên quan (mục 3–4).  
4. Nâng **schema** (migration) trước hoặc cùng phiên với app — theo chiến lược team (expand-contract nếu zero-downtime).  
5. Triển khai **ứng dụng** mới; kiểm health + smoke.  
6. Bật lại ghi; theo dõi 30–60 phút.

### 2.3 Bảo trì ứng dụng (container)

- Giữ **image tag cố định** theo release; không dùng `:latest` trên production.  
- Sau deploy: kiểm tra `GET /health` (hoặc tương đương) từng service quan trọng; gateway route.  
- **Xoay secret** (DB password, `SCHEDULER_INTERNAL_TOKEN`, `SYNC_SERVICE_TOKEN`, API key tích hợp): cập nhật secret store → rollout pod/container → xác minh luồng nội bộ.

### 2.4 Bảo trì Redis (BullMQ)

- Nếu cần **không mất job** sau restart: bật persistence (RDB/AOF) hoặc dùng Redis managed có persistence; xem checklist [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) mục 9.  
- Backup Redis: thường là **snapshot** + copy file; hoặc export queue depth chỉ mang tính vận hành — **source of truth** nghiệp vụ vẫn là DB chính của từng service.

### 2.5 Bảo trì object storage (file)

Chi tiết **volume `file-media`**, bucket S3/MinIO, versioning, drill restore file: **[quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md)**.

---

## 3. Backup PostgreSQL

Stack có **nhiều instance Postgres** (một service — một DB logic). Mỗi instance trong compose có container dạng `cmit-postgres-*` và biến `DB_NAME` tương ứng.

### 3.1 Bảng tham chiếu (docker-compose chính)

| Service / vai trò | Container gợi ý | `DB_NAME` (ví dụ) |
|--------------------|-----------------|-------------------|
| auth | `cmit-postgres-auth` | `auth_db` |
| user | `cmit-postgres-user` | `user_db` |
| payment | `cmit-postgres-payment` | `payment_db` |
| billing | `cmit-postgres-billing` | `billing_db` |
| scheduler | `cmit-postgres-scheduler` | `scheduler_db` |
| notification | `cmit-postgres-notification` | `notification_db` |
| doc-metadata | `cmit-postgres-doc-metadata` | `doc_metadata_db` |
| *(các service khác)* | `cmit-postgres-*` | Xem `DB_NAME` trong `docker-compose.yml` |

### 3.2 Lệnh `pg_dump` (logical backup — một database)

Chạy từ host có Docker, đưa file ra thư mục backup đã mount:

```bash
# Ví dụ: backup payment_db trong container postgres-payment
mkdir -p ./backups/postgres
docker exec cmit-postgres-payment pg_dump -U postgres -d payment_db -Fc -f /tmp/payment_db.dump
docker cp cmit-postgres-payment:/tmp/payment_db.dump ./backups/postgres/payment_db_$(date +%Y%m%d_%H%M).dump
```

- **`-Fc`**: định dạng custom (nén, restore linh hoạt). Có thể dùng `-Fp` (SQL thuần) nếu cần đọc tay.  
- **Production**: dùng user backup **chỉ quyền đọc** (ROLE) thay vì `postgres` superuser.

### 3.3 Restore kiểm thử (namespace riêng / máy ảo)

```bash
docker cp ./backups/postgres/payment_db_YYYYMMDD.dump cmit-postgres-payment:/tmp/restore.dump
docker exec cmit-postgres-payment pg_restore -U postgres -d payment_db --clean --if-exists /tmp/restore.dump
```

*(File tạo bằng `pg_dump -Fc` dùng `pg_restore`. Trên DB đang có dữ liệu production thật: dùng DB/staging riêng; cân nhắc `--single-transaction` tùy kích thước.)*

### 3.4 Tự động hóa

- Cron trên host backup + `rclone`/`aws s3 cp` lên object storage **mã hóa**.  
- Hoặc **managed Postgres** (RDS, Cloud SQL, …): bật automated backup + PITR; vẫn nên export logical định kỳ cho portability.

---

## 4. Backup MongoDB

Một cluster **mongo-dbhistory** (`cmit-mongo-dbhistory`) thường chứa **nhiều database logic** (`MONGODB_DB_NAME` khác nhau trên từng service): `integration_service`, `sync_service`, `file_service`, `dbhistory`, CRM modules, v.v.

### 4.1 Sao lưu theo database (mongodump)

```bash
mkdir -p ./backups/mongo
docker exec cmit-mongo-dbhistory mongodump --db integration_service --archive=/tmp/integration_service.archive
docker cp cmit-mongo-dbhistory:/tmp/integration_service.archive ./backups/mongo/integration_service_$(date +%Y%m%d_%H%M).archive
```

Lặp lại với `--db sync_service`, `--db file_service`, … theo danh sách `MONGODB_DB_NAME` trong `docker-compose.yml`.

### 4.2 Toàn cục (ops copy volume / snapshot disk)

- Trên cloud: **snapshot volume** EBS/disk gắn `/data/db` theo lịch; nhanh cho DR nhưng restore cần quy trình gắn volume mới.  
- Kết hợp **mongodump** (logical) để dễ import sang cluster khác.

### 4.3 Restore thử (staging)

```bash
docker cp ./backups/mongo/integration_service_YYYYMMDD.archive cmit-mongo-dbhistory:/tmp/restore.archive
docker exec cmit-mongo-dbhistory mongorestore --db integration_service --archive=/tmp/restore.archive --drop
```

**Cảnh báo:** `--drop` xóa collection hiện có — chỉ trên môi trường thử.

---

## 5. Kiểm tra sau backup / sau restore

- [ ] Kích thước file backup **không** bằng 0 byte; checksum (SHA256) ghi nhận.  
- [ ] Restore staging: chạy **smoke** (login, một API đọc/ghi nhẹ).  
- [ ] Scheduler: sau restore `scheduler_db`, xác minh job còn nhất quán với Redis (có thể cần reconcile thủ công nếu mất queue).  
- [ ] Ghi **log backup**: ai chạy, phiên bản DB, đường dẫn artifact, kết quả.

---

## 6. RPO / RTO — bảng điền nội bộ

| Hạ tầng | RPO mục tiêu (điền) | RTO mục tiêu (điền) | Công cụ backup |
|---------|---------------------|---------------------|-----------------|
| Postgres (payment, …) | | | pg_dump / managed snapshot |
| Mongo (integration, sync, file, …) | | | mongodump / volume snapshot |
| Redis | | | RDB/AOF hoặc chấp nhận mất queue ngắn |
| File object storage | | | Replication / versioning |

---

## 7. Liên hệ kiểm toán / SOC

- Lưu **biên bản drill restore** (ngày, người thực hiện, DB, kết quả).  
- Retention backup: theo chính sách pháp lý (vd. 7 năm hóa đơn — tùy quốc gia; không cố định trong repo).

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/quy-trinh-bao-tri-va-backup-database.md` |
| Cập nhật | Khi thêm DB mới vào compose hoặc đổi chiến lược backup tổ chức |
