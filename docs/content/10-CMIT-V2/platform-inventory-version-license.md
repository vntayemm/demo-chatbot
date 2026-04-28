# Các Platform được cài đặt, version, license và mục đích sử dụng

## 1) Mục tiêu

Tài liệu này tổng hợp các platform và công nghệ chính đang sử dụng trong hệ thống `demo-cmit-api`, phục vụ quản trị kỹ thuật, kiểm soát license và chuẩn bị audit.

Lưu ý:
- Version bên dưới là baseline khuyến nghị theo hiện trạng tài liệu/kỹ thuật.
- Khi triển khai thực tế, cần chốt lại theo lockfile/image digest của từng môi trường.

## 2) Danh mục platform

| Nhóm | Platform/Công nghệ | Version khuyến nghị | License | Mục đích sử dụng |
|---|---|---|---|---|
| Runtime | Node.js | 18 LTS / 20 LTS | Node.js License (MIT-like) | Chạy gateway, services, workers |
| Container | Docker Engine | >= 24.x | Apache-2.0 | Đóng gói và vận hành container |
| Orchestration (DEV/UAT) | Docker Compose | >= 2.20 | Apache-2.0 | Điều phối stack nhiều service |
| Gateway | API Gateway (Express-based) | Nội bộ theo repo | Nội bộ | Routing, orchestration, policy hook, audit |
| Realtime | Realtime Gateway | Nội bộ theo repo | Nội bộ | Kết nối realtime/push event |
| Document Gateway | Doc Gateway | Nội bộ theo repo | Nội bộ | Điều phối luồng upload/download tài liệu |
| Database (Relational) | PostgreSQL | 15.x | PostgreSQL License | Lưu dữ liệu quan hệ nghiệp vụ |
| Database (Document) | MongoDB Community | 7.x | SSPL | Lưu document/event/audit/history |
| Cache | Redis | 7.x | RSALv2/SSPLv1 (theo bản phân phối) | Cache, queue phụ trợ, hiệu năng |
| Messaging | NATS + JetStream | 2.9.x | Apache-2.0 | Pub/Sub, stream messaging, async workflow |
| Observability Metrics | Prometheus | 2.x | Apache-2.0 | Thu thập metrics hệ thống và ứng dụng |
| Dashboard | Grafana | 10.x | AGPLv3 | Dashboard vận hành và cảnh báo |
| Tracing | OpenTelemetry | 1.x | Apache-2.0 | Chuẩn hóa telemetry và trace |
| Trace UI | Jaeger | 1.x | Apache-2.0 | Quan sát distributed tracing |
| Web Framework | Express.js | 4.18.x | MIT | Framework HTTP cho services |
| API Docs | Swagger UI / OpenAPI | Swagger UI 5.x | Apache-2.0 | Tài liệu API và test nhanh |
| Logging | Winston | 3.x | MIT | Structured logging theo service |
| Validation/Policy | Platform Policy Engine | Nội bộ theo repo | Nội bộ | Đánh giá policy rule runtime |
| Workflow | Platform Approval | Nội bộ theo repo | Nội bộ | Workflow/phê duyệt, rule flow |
| Contract | Contract Runtime/Registry | Nội bộ theo repo | Nội bộ | Chuẩn hóa business envelope/contract |
| Security Key | KMS Platform | Nội bộ theo repo | Nội bộ | Quản lý khóa và mã hóa dữ liệu |
| Identity | Identity/MFA/Authorization Platforms | Nội bộ theo repo | Nội bộ | Xác thực, xác minh, phân quyền |
| Integration | Integration Core/Token | Nội bộ theo repo | Nội bộ | Kết nối đối tác ngoài, quản lý token |
| Data Engine | XML/EDI/Render/Template Engines | Nội bộ theo repo | Nội bộ | Chuyển đổi dữ liệu, sinh tài liệu, template |
| File/Object Storage | MinIO hoặc S3-compatible | MinIO RELEASE stable | AGPLv3 (MinIO OSS) | Lưu file và object dữ liệu |
| CI/CD | GitHub Actions/GitLab CI (tùy chọn) | Theo tổ chức | Theo nền tảng | Build, test, deploy tự động |

## 3) Nhóm license cần lưu ý

### 3.1 License permissive (dễ tích hợp)
- MIT, Apache-2.0, PostgreSQL License.
- Phù hợp cho phần lớn use case thương mại nội bộ.

### 3.2 License cần rà soát kỹ điều khoản
- SSPL (MongoDB Community).
- AGPLv3 (Grafana OSS, MinIO OSS).
- RSALv2/SSPLv1 (Redis theo bản phân phối mới).

Khuyến nghị:
- Bộ phận pháp chế/tuân thủ cần rà soát điều khoản phân phối, SaaS, sửa đổi mã nguồn và nghĩa vụ công bố khi triển khai production.

## 4) Cách quản lý version và tuân thủ

- Dùng lockfile (`package-lock.json`) để khóa dependency theo service.
- Dùng image tag rõ ràng + ưu tiên pin theo digest cho môi trường production.
- Lập lịch quét lỗ hổng định kỳ (SCA + container scan).
- Thiết lập quy trình phê duyệt khi nâng major version.
- Lưu biên bản thay đổi version trong tài liệu vận hành/release note.

## 5) Checklist kiểm soát trước go-live

- Đã chốt version thực tế theo môi trường (DEV/UAT/PROD).
- Đã xác minh license của tất cả nền tảng chính.
- Đã quét CVE mức cao/nghiêm trọng và có phương án xử lý.
- Đã có owner kỹ thuật cho từng platform.
- Đã có kế hoạch nâng cấp và rollback cho từng thành phần lõi.
