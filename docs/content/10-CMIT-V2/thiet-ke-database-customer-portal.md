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
