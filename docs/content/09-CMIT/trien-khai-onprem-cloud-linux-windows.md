# Triển khai: On-premises vs Cloud — Linux vs Windows Server

**Đối tượng:** kiến trúc sư, hạ tầng, an toàn thông tin.  
**Phạm vi:** stack **demo-cmit-api** (Node.js, Docker, MongoDB, PostgreSQL, Redis, gateway). Không bán nhà cung cấp cloud cụ thể; so sánh theo **mô hình**.

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md)

---

## Mục lục

1. [On-premises vs Cloud — tổng quan](#1-on-premises-vs-cloud--tổng-quan)  
2. [Bảng so sánh nhanh](#2-bảng-so-sánh-nhanh)  
3. [Áp dụng cho repo này](#3-áp-dụng-cho-repo-này)  
4. [Linux vs Windows Server](#4-linux-vs-windows-server)  
5. [Khuyến nghị chọn nền](#5-khuyến-nghị-chọn-nền)  

---

## 1. On-premises vs Cloud — tổng quan

### 1.1 On-premises (tự chủ trung tâm dữ liệu)

**Ý nghĩa:** Máy chủ và storage đặt tại **datacenter của khách** (hoặc thuê rack colocation); tổ chức tự vận hành OS, mạng, backup, HA.

**Ưu điểm thường gặp**

- Kiểm soát **dữ liệu và luồng mạng** tối đa (phù hợp quy định nội địa, ngành).  
- Latency nội bộ ổn định nếu người dùng trong LAN/VPN.  
- Chi phí **CAPEX** rõ (mua server); OPEX dự đoán nếu đội vận hành ổn định.

**Nhược điểm / rủi ro**

- **Tự chịu trách nhiệm** HA, backup, patch, điện, cooling.  
- Mở rộng nhanh (burst) kém linh hoạt hơn cloud nếu chưa dự trù capacity.  
- Cần đội **DevOps / sysadmin** hoặc đối tác vận hành.

### 1.2 Cloud (public hoặc private cloud được vận hành như dịch vụ)

**Ý nghĩa:** Tính toán, DB managed, object storage, LB, DNS… thuê theo mô hình **IaaS / PaaS / managed** (AWS, GCP, Azure, hoặc private cloud OpenStack/VMware tương đương).

**Ưu điểm thường gặp**

- **Elastic:** tăng replica, disk, DB read replica tương đối nhanh.  
- Dịch vụ **managed** (RDS, Atlas, ElastiCache) giảm thời gian vận hành DB/Redis.  
- Tích hợp IAM, KMS, logging, WAF theo ecosystem.

**Nhược điểm / rủi ro**

- **Phụ thuộc nhà cung cấp** (giá, API, region).  
- Chi phí biến đổi nếu không giám sát usage (egress, storage, API call).  
- Dữ liệu ra khỏi biên giới / sector — cần đánh giá **compliance**.

### 1.3 Hybrid (thực tế nhiều doanh nghiệp)

- **Core + dữ liệu nhạy cảm** on-prem; **burst / analytics / integration** trên cloud.  
- Hoặc: production on-prem, **DR** trên cloud.  
- Kiến trúc **adapter** trong repo hỗ trợ hướng này (đổi storage, queue, IdP theo môi trường).

---

## 2. Bảng so sánh nhanh

| Tiêu chí | On-premises | Cloud (public) |
|-----------|-------------|------------------|
| **Kiểm soát dữ liệu** | Cao (trong tường của bạn) | Phụ thuộc contract + region |
| **Thời gian có HA “chuẩn”** | Phụ thuộc đầu tư & kỹ năng nội bộ | Nhanh hơn nếu dùng managed + multi-AZ |
| **Chi phí ban đầu** | CAPEX server/storage | OPEX, thường thấp ban đầu |
| **Burst / mùa cao điểm** | Cần dự phòng capacity | Scale ngang/dọc linh hoạt hơn |
| **Bảo trì OS/DB** | Tự làm hoặc thuê | Giảm với managed service |
| **Kết nối Internet** | Có thể chỉ VPN + partner | Luôn cần thiết kế egress/ingress |
| **Khóa nhà cung cấp** | Thấp hơn (nếu dùng chuẩn mở) | Trung bình–cao tùy dịch vụ đặc thù |

---

## 3. Áp dụng cho repo này

Cùng một **image/container** (Node + `docker compose` / Kubernetes) có thể chạy **on-prem hoặc cloud**; khác biệt nằm ở **hạ tầng bên dưới**:

| Thành phần | On-prem điển hình | Cloud điển hình |
|------------|-------------------|-----------------|
| **API Gateway** | VM/K8s + LB nội bộ + TLS chứng chỉ nội bộ | ALB/GLB/Ingress + ACM/cert-manager |
| **Mongo / Postgres** | Self-managed hoặc DB appliance | Atlas / RDS / Cloud SQL (managed) |
| **Redis** | VM cluster / Sentinel | ElastiCache / Memorystore |
| **Object storage (file)** | MinIO on-prem / NAS | S3 / GCS / Azure Blob |
| **Secret** | Vault on-prem / HSM | Cloud KMS + Secret Manager |
| **Observability** | Prometheus/Grafana self-host | Managed APM + cloud logging |

**Ghi chú CEIAP:** “build once — run anywhere” nghĩa là **cùng codebase và adapter**; không có nghĩa mọi thứ tự động giống nhau giữa on-prem và cloud mà không cấu hình.

---

## 4. Linux vs Windows Server

### 4.1 Bối cảnh stack demo-cmit-api

- Runtime chính: **Node.js** — được hỗ trợ tốt trên **Linux** và **Windows**.  
- Triển khai tham chiếu trong repo: **Dockerfile Linux** (Alpine/Debian-based), `docker compose` — **mặc định tâm lý vận hành là Linux**.

### 4.2 Linux (khuyến nghị cho production container)

**Ưu điểm với microservice + Docker/K8s**

- Hình ảnh container **nhỏ**, ecosystem CI/CD và K8s **chuẩn thị trường**.  
- Script vận hành (`bash`, systemd), quyền file, đường dẫn **khớp** hầu hết tutorial DevOps.  
- Chi phí license OS thường **thấp** (RHEL/SLES có subscription; Ubuntu/CentOS stream tùy chính sách).

**Nhược điểm**

- Nếu tổ chức chỉ có **Windows admin** legacy, đào tạo hoặc thuê đối tác Linux.

### 4.3 Windows Server

**Khi nào hợp lý**

- Chuẩn **doanh nghiệp** chỉ cấp Windows; ứng dụng legacy .NET cùng máy (ít gặp với pure Node stack này).  
- Dùng **Windows Server + Docker** (hoặc VM Linux guest) để chạy container Node — **được**, nhưng **footprint và vận hành** thường nặng hơn Linux thuần.

**Đặc thù cần lưu ý**

- **Đường dẫn:** Windows `\` vs Linux `/` — volume bind mount trong compose cần đúng syntax.  
- **Dòng kết thúc file** (CRLF) đôi khi gây lỗi script shell trong CI nếu không chuẩn hóa.  
- **Giấy phép:** Windows Server + CAL (tùy mô hình).  
- **Kubernetes trên Windows:** thường dùng **Linux node** cho workload container chính; Windows node cho container Windows — stack **này** không yêu cầu Windows container.

### 4.4 Bảng so sánh nhanh (Linux vs Windows cho *repo này*)

| Tiêu chí | Linux (container host) | Windows Server (container host) |
|-----------|------------------------|-----------------------------------|
| **Docker/K8s mặc định tài liệu** | Phù hợp trực tiếp | Cần kiểm tra version Docker/WSL/K8s |
| **Kích thước image / tài nguyên** | Thường tối ưu hơn | Thường cao hơn một chút |
| **Đội vận hành Việt Nam** | Phổ biến cho web/cloud | Phổ biến cho AD/file/ERP |
| **Phù hợp demo-cmit-api** | **Khuyến nghị** | Chấp nhận được nếu chính sách bắt buộc |

---

## 5. Khuyến nghị chọn nền

1. **Production microservice Node + Docker/K8s:** ưu tiên **Linux** làm node worker; database có thể managed trên cloud hoặc on-prem tùy compliance.  
2. **On-prem vs cloud:** quyết định theo **dữ liệu**, **latency**, **chi phí 5 năm**, **năng lực vận hành** — không theo “mốt”.  
3. **Hybrid:** tách rõ **dữ liệu nhạy cảm** (on-prem) và **integration / burst** (cloud) với **gateway + audit** thống nhất.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/trien-khai-onprem-cloud-linux-windows.md`](./trien-khai-onprem-cloud-linux-windows.md) |
| Cập nhật | Khi thay đổi chiến lược triển khai chính thức của tổ chức |
