Thiết kế giải pháp, Thiết kế ứng dụng, Tiêu chuẩn và Đánh giá
*  Roadmap:

A. Thiết kế giải pháp
Mô hình giải pháp tổng thể
Giải pháp Hạ tầng (Infrastructure)
    Mô hình Cài đặt
    Cấu hình server yêu cầu
    Mô hình Network
    Cấu hình Network/Domain
Giải pháp High Availability (HA) & Platforms
    Mô hình Database HA
    Mô hình File Storage HA
    Mô hình Stream Messaging HA
    Mô hình Cài đặt Platforms
    Các Platform được cài đặt, version, license và mục đích sử dụng
Giải pháp Auto Scale (Kubernetes)
    Mô hình Kubernetes
    Dockerized (Image/Container management)
Giải pháp Giám sát
    OpenTelemetry/Prometheus
    Grafana Dashboard
    Alert Manager
Giải pháp Truy vết & kiểm soát
    JetStream & Jaeger UI
Giải pháp Backup & Recovery
    MongoDB
    Redis Cache
    PostgreSQL
    MSSQL/Oracle
    File System/MinIO
Giải pháp Triển khai hạ tầng Thay thế (Alternative To)
    Trên Linux OS
    Trên Windows Server OS
    Trên Môi trường Development (DEV)
    System File Storage (Lưu file vật lý trên server)
Giải pháp Bảo mật (Security)
    Các tiêu chuẩn/ISO trong bảo mật được áp dụng
    Các thiết kế đảm bảo đúng tiêu chuẩn
Các Checklist cài đặt
    Infrastructure (Server)
    Platforms (Phần mềm hệ thống)
    Application (Các API/Microservice apps)
Giải pháp Triển khai ứng dụng
    Github/GitLab (Auto CI/CD)
    Delivery & Auto Rollback 
    Môi trường triển khai (Environment)
Các tài liệu hướng dẫn
    Notebook cài đặt mới và thay đổi bổ sung
    Notebook kiểm tra và bảo trì
    Notebook backup & recovery
    Mobile (Apple Store & Google Play) setup
Các thuật ngữ sử dụng
Kết quả
    Bảo mật hệ thống, người dùng
    No Downtime và Auto scale
    An toàn thông tin và nhất quán dữ liệu

B. Thiết kế hệ thống CMIT Customer Portal
Các Quy trình, tính năng chính của CMIT Customer Portal
    User cases
    Role 
    External System
Thiết kế kiến trúc tổng thể
Giới thiệu Công nghệ sử dụng
    Sử dụng Vue3 - Admin/Customer Website
    Sử dụng Flutter - Mobile (iOS, Android)
    Sử dụng Microsoft Dotnet Core - Microservice
    Sử dụng Redis - Cho cache
    Sử dụng MongoDB - Lưu trữ Các trải nghiệm người dùng
    Sử dụng MSSQL - Lưu trữ data chính
    Các thư viện, version, license đã sử dụng và mục đích sử dụng
Giới thiệu tính năng nổi bật của Frontend
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
Giới thiệu các Engine & Hệ thống con sử dụng (Subsystem)
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
Thiết kế Database (Redis, MSSQL, PostgreSQL, MongoDB)
Thiết kế CMIT Customer Portal Mobile (iOS & Android Mobile)
Thiết kế CMIT Customer Portal Website (Customer & Admin Site)
Thiết kế CMIT Customer Portal Services (Backend Services / APIs)
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
Delivery Strategy - Chiến lược triển khai
    Dev Environment
    Staging Environment
    Production Environment
Kết quả:
    Bảo mật hệ thống, người dùng
    Auto Scales
    No Downtime
    Dễ bảo trì
    Dễ triển khai
    An toàn thông tin và nhất quán dữ liệu
    Giao diện thân thiện, phù hợp mọi thiết bị
C. Tiêu chí & tiêu chuẩn thiết kế và quy ước
Kết quả:
    Bảo mật hệ thống, người dùng
    Auto Scales
    No Downtime
    Dễ bảo trì
    Dễ triển khai
    An toàn thông tin và nhất quán dữ liệu
    Giao diện thân thiện, phù hợp mọi thiết bị

D. Luận điểm, đánh giá và cam kết

E. Tổ chức thực hiện và thời gian triển khai