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
