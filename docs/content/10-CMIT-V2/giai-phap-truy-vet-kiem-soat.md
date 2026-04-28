# Giải pháp Truy vết và kiểm soát

## Giới thiệu
Giải pháp truy vết và kiểm soát đảm bảo mọi hành động nghiệp vụ có thể theo dõi theo chuỗi nguyên nhân-kết quả.

## Thành phần chính
- JetStream: lưu và phân phối event bền vững.
- Jaeger UI: quan sát distributed trace theo `traceId`.
- Security Audit Store: lưu log bảo mật và quyết định policy.

## Nguyên tắc
- Mỗi event có `eventId`, `traceId`, `causationId`.
- Gắn actor, decision, reason trong event/audit.
- Lưu timeline sự kiện để phục vụ điều tra và compliance.

## Kết quả kỳ vọng
- Truy nguyên sự cố nhanh.
- Kiểm soát thay đổi nghiệp vụ rõ ràng.
- Đáp ứng yêu cầu kiểm toán nội bộ.
