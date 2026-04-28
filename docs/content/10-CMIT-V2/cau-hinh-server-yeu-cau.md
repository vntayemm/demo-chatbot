# Cấu hình server yêu cầu

## 1) Mục tiêu

Tài liệu này định nghĩa cấu hình server tối thiểu và khuyến nghị cho hệ thống `demo-cmit-api` theo từng môi trường triển khai.

## 2) Cấu hình đề xuất theo môi trường

### 2.1 Development (DEV)
- CPU: 8 vCPU
- RAM: 16 GB
- Disk: 200 GB SSD
- OS: Ubuntu 22.04 LTS hoặc tương đương
- Mục đích: chạy Docker Compose, test API, debug service

### 2.2 Staging (UAT)
- CPU: 16 vCPU
- RAM: 32 GB
- Disk: 500 GB SSD
- OS: Ubuntu 22.04 LTS hoặc tương đương
- Mục đích: kiểm thử tải vừa, kiểm thử tích hợp và release candidate

### 2.3 Production (PROD) - Khuyến nghị ban đầu
- Mô hình tối thiểu: 3 node application + 3 node database (HA)
- Mỗi node application:
  - CPU: 16 vCPU
  - RAM: 32 GB
  - Disk: 300 GB SSD
- Mỗi node database:
  - CPU: 16-32 vCPU
  - RAM: 64 GB
  - Disk: 1 TB NVMe SSD
- Mục tiêu: High Availability, dễ mở rộng ngang, giảm downtime

## 3) Yêu cầu hệ điều hành và runtime

- OS:
  - Linux ưu tiên: Ubuntu 22.04 LTS / RHEL 9
  - Đồng bộ timezone hệ thống theo `Asia/Ho_Chi_Minh`
- Runtime:
  - Docker Engine >= 24
  - Docker Compose Plugin >= 2.20
  - Node.js LTS (cho thao tác build thủ công khi cần)
- Đồng bộ thời gian:
  - Bật NTP trên tất cả server

## 4) Yêu cầu network và security baseline

- Mở cổng theo nguyên tắc tối thiểu:
  - 80/443 cho gateway
  - Cổng DB/Redis/NATS chỉ mở nội bộ VPC/VLAN
- Phân tách network:
  - Public subnet: gateway/reverse proxy
  - Private subnet: services, DB, cache, messaging
- Bảo mật:
  - TLS cho ingress
  - Secrets không hardcode trong source
  - Giới hạn IP truy cập các endpoint admin
  - Bật audit log cho thao tác nhạy cảm

## 5) Yêu cầu lưu trữ và backup

- Storage class:
  - Database: SSD/NVMe ưu tiên IOPS cao
  - File/object: tách riêng volume hoặc object storage
- Backup:
  - PostgreSQL/MongoDB: backup định kỳ theo ngày + retention
  - Redis: snapshot theo chính sách dữ liệu nghiệp vụ
  - Kiểm tra restore định kỳ tối thiểu mỗi tháng

## 6) Yêu cầu monitoring và vận hành

- Monitoring:
  - CPU, RAM, Disk, Network, container health
  - DB latency, queue lag, error rate API
- Logging:
  - Centralized logs theo service
  - Correlation/trace id xuyên suốt request chain
- Alert:
  - Cảnh báo downtime, high error rate, disk gần đầy, memory pressure

## 7) Checklist trước khi go-live

- Đủ tài nguyên theo sizing đã phê duyệt
- Kiểm tra HA failover cho DB và messaging
- Backup và restore test đạt yêu cầu
- TLS/Domain/DNS hoạt động đúng
- Dashboard giám sát và cảnh báo đã bật
- Runbook vận hành và xử lý sự cố đã sẵn sàng
