# Quy trình bảo trì & backup file (object storage + metadata)

**Mục đích:** vận hành **an toàn** lớp lưu file của **file-service** (và các luồng dùng chung pattern S3): **metadata** trong MongoDB, **byte thật** trên local disk hoặc **S3/MinIO**.  
**Căn cứ:** [services/file-service/README.md](../services/file-service/README.md), `platform/storage`, `docker-compose` (volume `file-media`, env `STORAGE_TYPE`).

**Liên quan:** [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) *(mongodump DB `file_service`)* · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) · [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md)

---

## 1. Hai tầng dữ liệu (bắt buộc hiểu trước khi backup)

| Tầng | Chứa gì | Rủi ro nếu chỉ backup một bên |
|------|---------|--------------------------------|
| **Metadata** | `file_object`, `file_version`, `entity_attachment`, `file_activity_log`, `file_tag` — MongoDB database **`file_service`** (trên cluster thường dùng chung `mongo-dbhistory` trong compose) | Có danh sách file nhưng **mất object** → download 404 / corrupt |
| **Object storage** | Nội dung file (path dạng `YYYY/MM/fileId_vN.ext` khi local; key S3 khi `STORAGE_TYPE=s3`) | Có file trên disk nhưng **mất metadata** → orphan objects, khó map quyền/entity |

**Khuyến nghị:** lập lịch backup **cả hai**; khi restore drill, kiểm tra **một fileId** end-to-end (metadata + download stream).

---

## 2. Backup metadata (MongoDB `file_service`)

Dùng cùng quy trình [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) mục Mongo:

```bash
docker exec cmit-mongo-dbhistory mongodump --db file_service --archive=/tmp/file_service.archive
docker cp cmit-mongo-dbhistory:/tmp/file_service.archive ./backups/mongo/file_service_$(date +%Y%m%d_%H%M).archive
```

Restore thử chỉ trên staging; cảnh báo `--drop` xóa dữ liệu hiện có.

---

## 3. Backup object storage — chế độ **local** (`STORAGE_TYPE=local`)

Compose mẫu: volume Docker **`file-media`** gắn vào `cmit-file-service:/app/media` (`STORAGE_LOCAL_PATH=/app/media`).

### 3.1 Sao chép volume / thư mục

**Cách 1 — tạo archive từ volume Docker (host cần đủ disk):**

```bash
mkdir -p ./backups/file-media
docker run --rm -v file-media:/src -v "$(pwd)/backups/file-media:/dst" alpine \
  tar czf "/dst/file-media_$(date +%Y%m%d_%H%M).tgz" -C /src .
```

*(Tên volume có thể có prefix project, ví dụ `demo-cmit-api_file-media` — kiểm tra `docker volume ls`.)*

**Cách 2 — snapshot ở tầng hypervisor / EBS** nếu toàn bộ data-root Docker nằm trên một volume: nhanh cho DR, nhưng restore cần quy trình gắn lại volume.

### 3.2 Nhất quán (consistency)

- **Khuyến nghị:** trong cửa sổ bảo trì **ít ghi**, hoặc snapshot **đóng băng** ứng dụng file-service ngắn nếu cần độ nhất quán tuyệt đối.  
- Nếu không downtime: chấp nhận RPO vài phút — backup incremental/rsync lặp lại.

---

## 4. Backup object storage — chế độ **S3 / MinIO** (`STORAGE_TYPE=s3`)

- Bật **versioning** trên bucket production; cấu hình **lifecycle** (archive IA/Glacier, xóa version cũ theo policy).  
- **Replication** cross-region hoặc bucket đích thứ hai (same-account hoặc log account).  
- **Sync định kỳ** (một chiều) sang bucket backup:

```bash
aws s3 sync s3://bucket-prod/ s3://bucket-backup/file-mirror/ --storage-class STANDARD_IA
```

*(Với MinIO: dùng `mc mirror` hoặc endpoint `--endpoint-url` tương đương.)*

### 4.1 Credential & bảo mật

- IAM policy **chỉ** quyền cần thiết (list/get trên bucket backup; put nếu sync ngược).  
- Xoay access key theo [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) (lịch secret).

### 4.2 Doc stack (tuỳ triển khai)

`doc-upload-service` / metadata có thể dùng bucket **`doc-gateway`** (xem `docker-compose`). **Backup bucket đó** theo cùng mục 4 — tách runbook nếu bucket khác `file-service`.

---

## 5. Bảo trì vận hành (định kỳ)

| Tần suất | Việc |
|----------|------|
| **Hàng ngày** | Giám sát **dung lượng** volume `file-media` hoặc usage bucket; alert ngưỡng 80%. |
| **Hàng tuần** | Kiểm tra job backup metadata + object (log thành công, kích thước snapshot). |
| **Hàng tháng** | **Drill restore** một file mẫu: restore Mongo `file_service` + object tương ứng → `GET .../download` qua gateway. |
| **Theo release** | Sau khi đổi `STORAGE_TYPE` hoặc đổi bucket: smoke upload + download + version. |

### 5.1 Chunk upload (file lớn)

- Session tạm theo TTL `CHUNK_UPLOAD_SESSION_HOURS`; disk tạm trong container có thể đầy nếu nhiều upload dở.  
- Bảo trì: theo dõi inode/disk container; restart có chủ đích sau khi hết session hợp lệ (hoặc công cụ dọn session hết hạn nếu team bổ sung).

### 5.2 Đổi nhà cung cấp storage (Integration Manager)

Khi `file-service` lấy cấu hình từ **active storage** (`integration-service`): đổi primary là thay **đích ghi mới** — cần **migration có kế hoạch** (copy object cũ → bucket mới + cập nhật metadata nếu đổi key), không chỉ đổi env trong một bước nếu đã có dữ liệu production.

---

## 6. Thứ tự restore sau sự cố (gợi ý)

1. Khôi phục **MongoDB `file_service`** (metadata + version list).  
2. Khôi phục **object storage** vào cùng **base path / bucket prefix** mà metadata đang trỏ tới (`storagePath` / key).  
3. Nếu path thay đổi: cần script cập nhật metadata — tránh làm tay từng bản ghi trừ khi số lượng nhỏ.  
4. Smoke: upload mới + download + list version.

---

## 7. Checklist nhanh

- [ ] Backup `file_service` (Mongo) nằm trong lịch `mongodump`.  
- [ ] Backup bytes: local volume **hoặc** S3 replication/sync.  
- [ ] Bucket/versioning/lifecycle đã cấu hình (S3/MinIO prod).  
- [ ] Drill restore ít nhất **một** fileId mỗi quý.  
- [ ] Giám sát dung lượng + alert.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/quy-trinh-bao-tri-va-backup-file-storage.md` |
| Cập nhật | Khi đổi layout path, chunk TTL, hoặc tách bucket doc vs file |
