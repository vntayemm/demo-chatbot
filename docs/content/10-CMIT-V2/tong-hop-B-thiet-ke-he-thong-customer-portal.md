# Tong hop B - Thiet ke he thong CMIT Customer Portal

Trang nay tong hop noi dung da gom tu cac file con nhom B.

## Quy trinh va tinh nang chinh

# Các Quy trình, tính năng chính của CMIT Customer Portal

## Phạm vi
- User cases
- Role
- External System

## Quy trình nghiệp vụ chính
- Lead-to-Quote-to-Order-to-Invoice
- Theo dõi vận đơn, container, giao nhận
- Quản lý tài liệu, upload/download và đối soát
- Notification và activity timeline

## Nhóm vai trò chính
- Customer
- Sales/CS
- Operations
- Finance
- Admin/System Operator

## Tích hợp hệ thống ngoài
- eInvoice provider
- Email/SMS/ZaloOA gateway
- EDI/Navis N4 (qua JSON parser/integration)
- Payment provider

## Thiet ke kien truc tong the

# Thiết kế kiến trúc tổng thể

## Mô hình lớp
- Client Layer: Web, Mobile, External APIs
- Gateway Layer: API/Realtime/Document Gateway
- Service Layer: CRM, Core, Integration, Data Flow
- Platform Layer: Approval, Policy, Messaging, Security, Render/XML/EDI
- Data Layer: PostgreSQL, MongoDB, Redis, NATS, Object Storage

## Nguyên tắc kiến trúc
- Domain-oriented microservices
- Contract-driven integration
- Event-driven cho luồng bất đồng bộ
- Observability by default
- Security-by-design

## Kết quả kỳ vọng
- Dễ mở rộng theo module nghiệp vụ
- Dễ bảo trì, dễ scale
- Truy vết tốt và kiểm soát thay đổi tốt

## Gioi thieu cong nghe su dung

# Giới thiệu Công nghệ sử dụng

## Frontend
- Vue3 cho Admin/Customer Website
- Flutter cho Mobile iOS/Android

## Backend
- .NET Core (theo định hướng kiến trúc tổng thể)
- Node.js/TypeScript (theo repo demo hiện tại)

## Data/Cache/Messaging
- Redis cho cache
- MongoDB cho document/history/audit
- MSSQL/PostgreSQL cho dữ liệu quan hệ
- NATS JetStream cho event streaming

## Ghi chú quản trị
- Version/License tham chiếu tại `platform-inventory-version-license.md`

## Tinh nang noi bat frontend

# Giới thiệu tính năng nổi bật của Frontend

## Trải nghiệm người dùng
- Responsive UI/UX
- Dark/Light mode
- Dashboard thân thiện và tùy biến
- Search, Helper, User guideline

## Năng lực vận hành
- Notification/Activity/Alert tập trung
- Drag/Drop dashboard widget
- Recap/Summary/Report trực quan
- Export/Import data và template

## Tùy biến cá nhân hóa
- Custom view
- Favorite view
- Favorite color setup

## Gioi thieu engine va he thong con

# Giới thiệu các Engine và Hệ thống con

## Nhóm nhận diện và bảo mật
- Identity Server
- Security Engine (Whitelist IP, 2FA/MFA)

## Nhóm governance và workflow
- Rule Engine
- Policy Engine
- Approval Engine

## Nhóm dữ liệu và tích hợp
- SyncData System
- EDI Engine
- Upload Engine
- Storage System
- Webhook Engine

## Nhóm trải nghiệm và vận hành
- Notification Engine
- History Engine
- Report/Recap Engine
- Render Engine
- Training System

## Thiet ke database

# Thiết kế Database (Redis, MSSQL, PostgreSQL, MongoDB)

## Nguyên tắc
- Dữ liệu quan hệ: PostgreSQL/MSSQL
- Dữ liệu document/history: MongoDB
- Dữ liệu cache/session: Redis

## Mô hình phân lớp dữ liệu
- Transactional data tách theo domain service
- Event/audit lưu riêng để truy vết
- Cache key theo tenant/context rõ ràng

## Kiểm soát chất lượng dữ liệu
- Backup/restore định kỳ
- Index theo luồng truy vấn chính
- Theo dõi latency/query plan định kỳ

## Thiet ke mobile

# Thiết kế CMIT Customer Portal Mobile (iOS và Android)

## Công nghệ
- Flutter cho ứng dụng đa nền tảng

## Năng lực chính
- Đăng nhập an toàn, quản lý phiên
- Theo dõi tiến trình nghiệp vụ theo thời gian thực
- Nhận notification và xử lý tác vụ nhanh
- Tối ưu UX cho màn hình nhỏ và kết nối không ổn định

## Phiên bản phát hành
- Quản lý release qua App Store và Google Play
- Đồng bộ version policy với backend API

## Thiet ke website

# Thiết kế CMIT Customer Portal Website (Customer và Admin)

## Mục tiêu
- Một nền tảng web thống nhất cho customer và admin.
- Tối ưu hiệu suất, khả năng sử dụng và kiểm soát truy cập.

## Thành phần chính
- Customer site: thao tác nghiệp vụ và theo dõi trạng thái.
- Admin site: vận hành, cấu hình, dashboard và giám sát.

## Nguyên tắc UI/UX
- Component-based, tái sử dụng cao.
- Chuẩn responsive cho desktop/tablet/mobile web.
- Tối ưu accessibility và khả năng học nhanh cho người dùng mới.

## Thiet ke services backend API

# Thiết kế CMIT Customer Portal Services (Backend Services/APIs)

## Mục tiêu
- Tách service theo domain nghiệp vụ.
- Chuẩn hóa hợp đồng API và event contract.
- Đảm bảo scale độc lập và triển khai độc lập.

## Nhóm service chính
- Security/Auth/User/Role
- Scheduler/Upload/File/Template
- Notification/Email/Alert
- Approval/TDR/Report/MasterData/SyncData
- TrackTrace/eBooking/eDO/Container/Vessel/Barge/Berth
- Order/Dispatch/Gate/Document/Training/Payment/eInvoice

## Chuẩn API
- OpenAPI/Swagger cho mọi service chính.
- Versioning rõ ràng (`/api/v1`).
- Error model thống nhất và có trace id.

## Delivery strategy

# Delivery Strategy - Chiến lược triển khai

## Môi trường
- Dev Environment
- Staging Environment
- Production Environment

## Chiến lược phát hành
- CI/CD tự động cho build/test/scan/deploy
- Release theo batch nhỏ, có rollback nhanh
- Canary/Blue-Green cho thay đổi rủi ro cao

## Kiểm soát chất lượng
- Smoke test sau deploy
- Theo dõi SLI/SLO theo service
- Đánh giá hậu kiểm và ghi nhận release note

## Ket qua

# Kết quả (Thiết kế hệ thống CMIT Customer Portal)

## Kết quả đạt được
- Bảo mật hệ thống và người dùng tốt hơn
- Auto Scale và giảm downtime
- Dễ bảo trì, dễ triển khai theo môi trường
- Đảm bảo an toàn thông tin và nhất quán dữ liệu
- Giao diện thân thiện, phù hợp nhiều thiết bị
