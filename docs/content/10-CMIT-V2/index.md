== Thiết kế giải pháp, Thiết kế ứng dụng, Tiêu chuẩn và Đánh giá
*  Roadmap:

A. Thiết kế giải pháp

Mô hình giải pháp tổng thể: [Xem tài liệu](./mo-hinh-giai-phap-tong-the.md)

Giải pháp Hạ tầng (Infrastructure)

    Mô hình Cài đặt: [Xem tài liệu](./mo-hinh-cai-dat.md)
    Cấu hình server yêu cầu: [Xem tài liệu](./cau-hinh-server-yeu-cau.md)
    Mô hình Network: [Xem tài liệu](./mo-hinh-network.md)
    Cấu hình Network/Domain: [Xem tài liệu](./cau-hinh-network-domain.md)

Giải pháp High Availability (HA) & Platforms

    Mô hình Database HA: [Xem tài liệu](./mo-hinh-database-ha.md)
    Mô hình File Storage HA: [Xem tài liệu](./mo-hinh-file-storage-ha.md)
    Mô hình Stream Messaging HA: [Xem tài liệu](./mo-hinh-stream-messaging-ha.md)
    Mô hình Cài đặt Platforms: [Xem tài liệu](./mo-hinh-cai-dat-platforms.md)
    Các Platform được cài đặt, version, license và mục đích sử dụng: [Xem tài liệu](./platform-inventory-version-license.md)

Giải pháp Auto Scale (Kubernetes)

    Mô hình Kubernetes: [Xem tài liệu](./mo-hinh-kubernetes.md)
    Dockerized (Image/Container management): [Xem tài liệu](./dockerized-image-container-management.md)

Giải pháp Giám sát: [Xem tài liệu](./giai-phap-giam-sat.md)

    OpenTelemetry/Prometheus
    Grafana Dashboard
    Alert Manager

Giải pháp Truy vết & kiểm soát: [Xem tài liệu](./giai-phap-truy-vet-kiem-soat.md)

    JetStream & Jaeger UI

Giải pháp Backup & Recovery: [Xem tài liệu](./giai-phap-backup-recovery.md)
    
    MongoDB
    Redis Cache
    PostgreSQL
    MSSQL/Oracle
    File System/MinIO

Giải pháp Triển khai hạ tầng Thay thế (Alternative To): [Xem tài liệu](./giai-phap-trien-khai-ha-tang-thay-the.md)
    
    Trên Linux OS
    Trên Windows Server OS
    Trên Môi trường Development (DEV)
    System File Storage (Lưu file vật lý trên server)

Giải pháp Bảo mật (Security): [Xem tài liệu](./giai-phap-bao-mat.md)
    Các tiêu chuẩn/ISO trong bảo mật được áp dụng
    Các thiết kế đảm bảo đúng tiêu chuẩn

Các Checklist cài đặt: [Xem tài liệu](./checklist-cai-dat.md)
    Infrastructure (Server)
    Platforms (Phần mềm hệ thống)
    Application (Các API/Microservice apps)

Giải pháp Triển khai ứng dụng: [Xem tài liệu](./giai-phap-trien-khai-ung-dung.md)

    Github/GitLab (Auto CI/CD)
    Delivery & Auto Rollback 
    Môi trường triển khai (Environment)

Các tài liệu hướng dẫn: [Xem tài liệu](./cac-tai-lieu-huong-dan.md)

    Notebook cài đặt mới và thay đổi bổ sung
    Notebook kiểm tra và bảo trì
    Notebook backup & recovery
    Mobile (Apple Store & Google Play) setup

Các thuật ngữ sử dụng: [Xem tài liệu](./cac-thuat-ngu-su-dung.md)

Kết quả: [Xem tài liệu](./ket-qua-giai-phap.md)

    Bảo mật hệ thống, người dùng
    No Downtime và Auto scale
    An toàn thông tin và nhất quán dữ liệu

B. Thiết kế hệ thống CMIT Customer Portal

Các Quy trình, tính năng chính của CMIT Customer Portal: [Xem tài liệu](./quy-trinh-tinh-nang-chinh-customer-portal.md)

    User cases
    Role 
    External System

Thiết kế kiến trúc tổng thể: [Xem tài liệu](./thiet-ke-kien-truc-tong-the-customer-portal.md)

Giới thiệu Công nghệ sử dụng: [Xem tài liệu](./gioi-thieu-cong-nghe-su-dung.md)

    Sử dụng Vue3 - Admin/Customer Website
    Sử dụng Flutter - Mobile (iOS, Android)
    Sử dụng Microsoft Dotnet Core - Microservice
    Sử dụng Redis - Cho cache
    Sử dụng MongoDB - Lưu trữ Các trải nghiệm người dùng
    Sử dụng MSSQL - Lưu trữ data chính
    Các thư viện, version, license đã sử dụng và mục đích sử dụng

Giới thiệu tính năng nổi bật của Frontend: [Xem tài liệu](./tinh-nang-noi-bat-frontend.md)

    Responsive UI/UX
    Dashboard Friendly
    Helper/User guideline
    Cross Menu Search
    Dark/Light Mode
    Notification
    Activity
    Alert 
    Workspace
    Drag/Drop Dashboard
    Recap/Summary/Report
    Export/Import Data, Template
    Custom View & Favorite View 
    Favorite Color Setup

Giới thiệu các Engine & Hệ thống con sử dụng (Subsystem): [Xem tài liệu](./gioi-thieu-engine-he-thong-con.md)

    Identity Server (user và phân quyền)
    Security Engine (Whitelist IP, 2FA/MFA)
    Scheduler Worker
    Rule Engine
    Policy Engine
    Approval Engine (Cấu hình phê duyệt, workflow)
    Report/Recap Engine (Render Engine - Chart/Table - Drag/Drop Dashboard)
    Notification Engine (Email/SMS/Mobile Notification)
    History Engine (Security log, Business History, Version History)
    Training System (Đào tạo)
    Webhook Engine
    Storage System
    Upload Engine (Xử lý file lớn)
    SyncData System (Đồng bộ, solve conflict dữ liệu, truy vết lỗi)
    EDI Engine
    Render Engine (Phiếu in, Excel, Report Template)

Thiết kế Database (Redis, MSSQL, PostgreSQL, MongoDB): [Xem tài liệu](./thiet-ke-database-customer-portal.md)

Thiết kế CMIT Customer Portal Mobile (iOS & Android Mobile): [Xem tài liệu](./thiet-ke-mobile-customer-portal.md)

Thiết kế CMIT Customer Portal Website (Customer & Admin Site): [Xem tài liệu](./thiet-ke-website-customer-admin.md)

Thiết kế CMIT Customer Portal Services (Backend Services / APIs): [Xem tài liệu](./thiet-ke-services-backend-api.md)

    Webhook Service
    Security Service (Encrypt/Decrypt)
    Auth Service (Chứng thực)
    Cache Service 
    Config Service
    User Service
    Role & Permission Service
    Scheduler Service (Cron Job)
    Upload Service (Chunk/Merge File lớn)
    EDI Service
    File Service
    Template Service (Định nghĩa template)
    Email Service (Pipeline)
    Notification Service (Pipeline)
    Alert Service (Định nghĩa cảnh báo/ Pipeline)
    Approval Service
    TDR Service
    Report Service
    MasterData Service
    SyncData Service
    Track & Trace Service
    eBooking Service
    eDO Service
    Container Service
    Vessel Service
    Barge Service
    Berth Service
    Order Service
    Request Charge Service
    Dispatch Service
    Gate Service
    Document Service
    Training Service
    Payment Service
    eInvoice Service
    JSON Parser Service (Help for Navis N4 Integration)
    API Document (Swagger)

Delivery Strategy - Chiến lược triển khai: [Xem tài liệu](./delivery-strategy.md)

    Dev Environment
    Staging Environment
    Production Environment

Kết quả: [Xem tài liệu](./ket-qua-thiet-ke-he-thong.md)

    Bảo mật hệ thống, người dùng
    Auto Scales
    No Downtime
    Dễ bảo trì
    Dễ triển khai
    An toàn thông tin và nhất quán dữ liệu
    Giao diện thân thiện, phù hợp mọi thiết bị

C. Tiêu chí & tiêu chuẩn thiết kế và quy ước: [Xem tài liệu](./tieu-chi-tieu-chuan-thiet-ke-quy-uoc.md)

Kết quả: [Xem tài liệu](./ket-qua-tieu-chi-tieu-chuan.md)

    Bảo mật hệ thống, người dùng
    Auto Scales
    No Downtime
    Dễ bảo trì
    Dễ triển khai
    An toàn thông tin và nhất quán dữ liệu
    Giao diện thân thiện, phù hợp mọi thiết bị

D. Luận điểm, đánh giá và cam kết: [Xem tài liệu](./luan-diem-danh-gia-cam-ket.md)

E. Tổ chức thực hiện và thời gian triển khai: [Xem tài liệu](./to-chuc-thuc-hien-thoi-gian-trien-khai.md)

Tổng hợp:

- A. Thiết kế giải pháp: [Xem tài liệu](./tong-hop-A-thiet-ke-giai-phap.md)

- B. Thiết kế hệ thống Customer Portal: [Xem tài liệu](./tong-hop-B-thiet-ke-he-thong-customer-portal.md)

- C. Tiêu chí, tiêu chuẩn, quy ước: [Xem tài liệu](./tong-hop-C-tieu-chi-tieu-chuan-quy-uoc.md)

- DE. Đánh giá cam kết và tổ chức thực hiện: [Xem tài liệu](./tong-hop-DE-danh-gia-cam-ket-to-chuc-thuc-hien.md)