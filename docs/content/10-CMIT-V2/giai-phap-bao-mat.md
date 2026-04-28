# Giải pháp Bảo mật (Security)

## Các tiêu chuẩn/ISO áp dụng
- Tham chiếu ISO/IEC 27001 cho quản lý an toàn thông tin.
- Áp dụng nguyên tắc least privilege và defense-in-depth.

## Thiết kế bảo mật chính
- Xác thực và phân quyền nhiều lớp (Identity, MFA, Authorization).
- Mã hóa dữ liệu in-transit và at-rest.
- Quản lý secret tập trung, không hardcode.
- Audit log đầy đủ cho thao tác nhạy cảm.
- IP allowlist cho endpoint quản trị.

## Kiểm soát vận hành
- Quét lỗ hổng định kỳ cho image/dependency.
- Theo dõi bất thường truy cập và cảnh báo thời gian thực.
- Kiểm thử khôi phục và diễn tập sự cố bảo mật.
