# Giải pháp Triển khai hạ tầng thay thế (Alternative To)

## Mục tiêu
Đưa ra phương án triển khai linh hoạt theo điều kiện hạ tầng thực tế.

## Các lựa chọn
- Trên Linux OS: ưu tiên production.
- Trên Windows Server OS: phục vụ hệ thống kế thừa.
- Trên môi trường DEV: tối ưu tốc độ cài đặt và debug.
- System File Storage: lưu file vật lý tại server nội bộ khi chưa dùng object storage.

## Nguyên tắc lựa chọn
- Ưu tiên phương án bảo trì đơn giản và ổn định.
- Đảm bảo tương thích với CI/CD và backup/restore.
- Có lộ trình nâng cấp lên mô hình HA chuẩn.

## Kết quả kỳ vọng
- Linh hoạt theo ngân sách/hạ tầng.
- Triển khai nhanh cho từng giai đoạn.
- Không khóa cứng kiến trúc vào một nền tảng duy nhất.
