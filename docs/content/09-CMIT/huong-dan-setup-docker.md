# Hướng dẫn setup Docker (Docker Engine + Compose)

**Mục đích:** cài đặt và chạy **toàn stack** `demo-cmit-api` bằng **Docker Compose** từ thư mục gốc repo — bổ sung chi tiết Docker cho [phat-trien-local-cho-dev.md](./phat-trien-local-cho-dev.md) (workflow dev rộng hơn: hybrid, cổng, sync).  
**Phạm vi:** máy dev / lab; production xem [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) và [huong-dan-setup-scale.md](./huong-dan-setup-scale.md).

**Liên quan:** [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) · [trien-khai-onprem-cloud-linux-windows.md](./trien-khai-onprem-cloud-linux-windows.md)

---

## 1. Điều kiện trước khi chạy

| Thành phần | Khuyến nghị |
|-------------|-------------|
| **Docker Engine** | 24+ (hoặc Docker Desktop tương đương) |
| **Docker Compose** | V2 (`docker compose` — plugin; không bắt buộc `docker-compose` binary cũ) |
| **RAM** | **≥ 16 GB** khi `docker compose up` **full** stack (nhiều container Node + Postgres + Mongo + Redis) |
| **Disk** | SSD; Docker có đủ dung lượng cho image + volume DB (có thể vài chục GB sau vài lần build) |
| **OS** | Linux native hoặc **Windows/macOS + WSL2** (Docker Desktop dùng WSL2 backend) — tránh đường dẫn volume lạ trên Windows thuần |

**Quyền:** user trong nhóm `docker` (Linux) hoặc Docker Desktop đã cấp quyền.

---

## 2. Clone và vị trí làm việc

Mọi lệnh `docker compose` trong tài liệu này giả định **current working directory = gốc repo** (nơi có `docker-compose.yml`).

```bash
git clone <url-repo> demo-cmit-api
cd demo-cmit-api
```

---

## 3. Build image

```bash
docker compose build
```

- Lần đầu có thể mất **nhiều phút** (nhiều service TypeScript).  
- **sync-service** build với **`context: .`** (gốc repo) và `dockerfile: services/sync-service/Dockerfile` — **bắt buộc** chạy build từ root; không `cd services/sync-service` rồi build nếu Dockerfile expect `platform/*` từ root.

```bash
# Đúng: từ root
docker compose build sync-service
```

---

## 4. Khởi động stack

**Nền (khuyến nghị dev):**

```bash
docker compose up -d
```

**Xem log:**

```bash
docker compose logs -f api-gateway
docker compose ps
```

**Kiểm tra gateway:**

```bash
curl -s http://localhost:8080/health
```

**Dừng (giữ volume — giữ dữ liệu DB local):**

```bash
docker compose down
```

**Dừng và xóa volume (mất dữ liệu trong volume được định nghĩa trong compose):**

```bash
docker compose down -v
```

Chỉ dùng `-v` khi muốn reset DB/file media hoàn toàn.

---

## 5. Mạng & tên container

- Compose tạo **network** riêng (ví dụ `cmit-network`); các service gọi nhau bằng **hostname** = tên service trong file YAML. **Cổng trong URL nội bộ** phải là cổng process **lắng nghe trong container** (thường `3000` theo biến `PORT` của từng service Node) — nếu `*_SERVICE_URL` trên gateway lệch cổng sẽ `ECONNREFUSED`.  
- Trong `docker-compose.yml` của repo, `api-gateway` gọi các microservice Node qua **`:3000`** (ngoại lệ: `integration-service` **`:3018`** theo `PORT` của service đó).  
- Từ **máy host**, dùng **localhost + port map** (cột trái trong `ports:`), ví dụ gateway `8080`, payment host `3009`, file-service `3017`, integration `3018`, Mongo `27017`, Redis `6379`.

Danh sách cổng có thể thay theo nhánh — luôn đối chiếu `docker-compose.yml` hiện tại.

---

## 6. Volume & dữ liệu

- Postgres / Mongo / Redis dùng **named volumes** trong compose — dữ liệu tồn sau `docker compose down` (không `-v`).  
- **file-service** volume `file-media` gắn `/app/media` khi `STORAGE_TYPE=local`.  
- Backup: [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md), [quy-trinh-bao-tri-va-backup-file-storage.md](./quy-trinh-bao-tri-va-backup-file-storage.md).

---

## 7. Biến môi trường

- Compose inject `environment:` trực tiếp trong file — đủ cho dev.  
- **Không** commit secret production; override bằng file `.env` ở root (Compose tự đọc nếu đặt tên biến trùng — tùy phiên bản) hoặc `docker compose --env-file .env.local up`.  
- Token mẫu (`SCHEDULER_INTERNAL_TOKEN`, …) chỉ dùng LAN dev.

Bảng file `.env.example` / lớp cấu hình (gateway OIDC, payment, platform): [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md).

---

## 8. Xử lý sự cố thường gặp

| Hiện tượng | Hướng xử lý |
|-------------|-------------|
| `port is already allocated` | Đổi map port trong compose hoặc tắt process đang chiếm cổng (`lsof -i :8080`). |
| `no space left on device` | `docker system prune` (cẩn thận), tăng disk Docker Desktop, xóa image không dùng. |
| Build sync-service lỗi thiếu `platform` | Đảm bảo build từ **root** với `context: .`. |
| Container `Restarting` | `docker compose logs <service>` — thường thiếu DB hoặc sai `*_URL`. |
| Windows: volume chậm / lỗi file | Chuyển project vào **WSL2 filesystem** (`\\wsl$\...`), không để project trên `/mnt/c` nếu có thể. |

---

## 9. Compose từng phần (tiết kiệm RAM)

Không có profile sẵn trong repo mặc định — có thể:

```bash
docker compose up -d mongo-dbhistory redis postgres-payment integration-service payment-service api-gateway
```

Chỉnh danh sách theo service đang cần; dependency (`depends_on`) vẫn cần thỏa mãn khi service đó khởi động.

---

## 10. Lệnh tham khảo nhanh

| Mục đích | Lệnh |
|----------|------|
| Rebuild một service | `docker compose build api-gateway && docker compose up -d api-gateway` |
| Vào shell container | `docker exec -it cmit-api-gateway sh` |
| Dung lượng volume | `docker volume ls` / `docker system df` |

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/huong-dan-setup-docker.md`](./huong-dan-setup-docker.md) |
| Cập nhật | Khi đổi cú pháp compose bắt buộc hoặc đổi context build sync-service |
