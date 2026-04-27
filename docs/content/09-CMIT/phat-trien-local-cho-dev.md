# Giải pháp phát triển local cho developer

**Mục tiêu:** làm việc trên máy cá nhân nhanh, ít ma sát, tái lập được kết quả.  
**Repo:** `demo-cmit-api` (Node.js + Docker + Mongo/Postgres/Redis).

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) · [trien-khai-onprem-cloud-linux-windows.md](./trien-khai-onprem-cloud-linux-windows.md) · [huong-dan-setup-docker.md](./huong-dan-setup-docker.md) *(Docker Compose: build, mạng nội bộ, volume, troubleshooting)* · [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md) *(mẫu `.env`, lớp cấu hình, gateway OIDC)* · [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md) *(cấu trúc package `platform/`)*

---

## 1. Chuẩn bị môi trường

| Thành phần | Phiên bản / ghi chú |
|------------|---------------------|
| **Git** | Bất kỳ bản ổn định |
| **Node.js** | **18 LTS** trở lên (khớp Dockerfile nhiều service) |
| **Docker Desktop** (Windows/macOS) hoặc **Docker Engine + Compose** (Linux) | Bật đủ RAM (xem handbook — khuyến nghị 16 GB+ khi compose full stack) |
| **Windows** | Khuyến nghị **WSL2** + Docker integration để đường dẫn/volume ổn định hơn so với Docker Desktop Hyper-V thuần |

**Công cụ tùy chọn:** `jq`, `curl`, REST Client (VS Code), MongoDB Compass, `psql`.

---

## 2. Hai kiểu làm việc phổ biến

### 2.1 Cách A — Full stack bằng Docker Compose (ổn định nhất)

Phù hợp: tích hợp end-to-end, QA nội bộ, demo. Chi tiết cài đặt Docker, cổng host vs cổng container, `sync-service`: [huong-dan-setup-docker.md](./huong-dan-setup-docker.md).

```bash
git clone <url> demo-cmit-api
cd demo-cmit-api
docker compose build
docker compose up -d
```

- **Cổng vào chính:** API Gateway `http://localhost:8080` → các route `/api/...` đã proxy.  
- **Health:** `curl -s http://localhost:8080/health`  
- **Logs:** `docker compose logs -f api-gateway` (hoặc tên service).

**Dừng / dọn:** `docker compose down` (thêm `-v` nếu muốn xóa volume — **mất dữ liệu DB local**).

### 2.2 Cách B — Hybrid: DB/Redis bằng Docker, service chạy `npm run dev`

Phù hợp: sửa code một service, debug nhanh, ít RAM.

1. Chỉ bật dependency trong compose (ví dụ `mongo-dbhistory`, `redis`, `postgres-*` tùy service) — có thể tách file compose override hoặc comment service không cần (tự quản lý local).  
2. Trong thư mục service: copy `.env.example` → `.env`, chỉnh `MONGODB_URI`, `REDIS_URL`, … trỏ `localhost` và đúng **port map** từ compose.  
3. Chạy:

```bash
cd services/<tên-service>
npm install
npm run dev
```

**Lưu ý:** một số service trong compose map port host khác container (ví dụ `3017:3000` cho file-service); khi gọi **trực tiếp** service từ máy host dùng port **bên trái** của map.

---

## 3. Service đặc biệt: `sync-service` (phụ thuộc `platform/sync`)

Image Docker của **sync-service** build từ **context gốc repo** (xem `docker-compose.yml` và `services/sync-service/Dockerfile`).

- **Chỉ chạy local bằng npm:** cần build platform trước:

```bash
cd platform/sync && npm install && npm run build
cd ../../services/sync-service && npm install && npm run dev
```

- **Chỉ dùng Docker:** `docker compose build sync-service` từ root (đúng context) là đủ.

---

## 4. Gợi ý cổng & điểm vào (dev)

| Mục đích | URL / cổng (tham chiếu compose hiện tại) |
|----------|-------------------------------------------|
| Toàn bộ API qua gateway | `http://localhost:8080` |
| File service trực tiếp | `http://localhost:3017` (host) |
| Integration | `http://localhost:3018` |
| Scheduler API | `http://localhost:3090` |
| Sync API | `http://localhost:3092` |
| Redis | `localhost:6379` |
| Mongo (dbhistory) | `localhost:27017` |

Danh sách đầy đời: xem `docker-compose.yml` tại nhánh đang làm việc.

---

## 5. Biến môi trường & bí mật

- **Không commit** file `.env` chứa secret thật.  
- Dùng `.env.example` trong từng service (nếu có) làm mẫu.  
- Token nội bộ (scheduler, sync): trong dev compose thường có giá trị mẫu — **đổi** khi chia sẻ mạng LAN hoặc đẩy lên môi trường dùng chung.

Bảng file mẫu & lớp cấu hình (Compose, gateway, platform): [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md).

---

## 6. File `.http` / kiểm thử nhanh

- Ví dụ chunk upload: `services/file-service/chunk-upload-e2e.http`  
- Điền biến `@base`, chạy từng request theo thứ tự trong REST Client.

---

## 7. Xử lý sự cố thường gặp

| Triệu chứng | Hướng xử lý |
|-------------|-------------|
| `port is already allocated` | Đổi map port trong compose hoặc tắt process đang chiếm cổng (`lsof -i :8080`). |
| `Cannot connect to Mongo` | Kiểm tra container `mongo-dbhistory` chạy; URI dùng hostname `localhost` khi app ngoài Docker, dùng hostname service khi app trong Docker. |
| `ENOSPC` khi build | Ổ đĩa đầy hoặc inotify limit (Linux) — dọn `node_modules`/`dist`, tăng inotify nếu cần. |
| `file:../../platform/sync` lỗi khi npm install | Chạy `npm run build` trong `platform/sync` trước; hoặc dùng Docker build sync-service. |
| Build chậm | `DOCKER_BUILDKIT=1`, cache layer; không build toàn monorepo nếu chỉ sửa một service. |

---

## 8. Quy ước git & PR (gợi ý)

- Branch theo ticket; PR nhỏ dễ review.  
- Trước PR: `npm run build` (và `npm test` nếu service có) trong thư mục service đã đụng.  
- Không commit `dist/` hoặc secret — tuân `.gitignore` của repo.

---

## 9. Checklist “máy dev mới”

- [ ] Docker chạy được `hello-world`.  
- [ ] `docker compose up` gateway + 1–2 service + DB tối thiểu cho task của bạn.  
- [ ] Clone repo, mở IDE tại root monorepo.  
- [ ] Đọc README của **service đang làm**.  
- [ ] Gọi thành công một health hoặc một API qua gateway.

---

*Tài liệu này bổ sung cho README gốc ở root repo (tiếng Anh, danh sách service); giữ song song: thay đổi cổng trong compose phải cập nhật mục 4.*
