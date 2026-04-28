# Giải pháp Backup và Recovery

## Phạm vi
- MongoDB
- Redis Cache
- PostgreSQL
- MSSQL/Oracle (nếu tích hợp ngoài)
- File System/MinIO

## Chiến lược backup
- Full backup hằng ngày.
- Incremental/WAL/oplog theo chu kỳ ngắn.
- Mã hóa backup và lưu tại vùng tách biệt.
- Retention theo chính sách dữ liệu.

## Chiến lược recovery
- Xác định RPO/RTO theo mức độ nghiệp vụ.
- Runbook phục hồi theo từng hệ dữ liệu.
- Kiểm thử restore định kỳ tối thiểu mỗi tháng.
- Đánh giá integrity dữ liệu sau restore.

## Kết quả kỳ vọng
- Giảm rủi ro mất dữ liệu.
- Đảm bảo khôi phục nhanh khi có thảm họa.
- Duy trì tính liên tục nghiệp vụ.
