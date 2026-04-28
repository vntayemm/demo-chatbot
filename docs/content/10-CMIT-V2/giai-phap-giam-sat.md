# Giải pháp Giám sát

## Giới thiệu
Giải pháp giám sát cho `demo-cmit-api` tập trung vào 3 lớp: metrics, logs, traces để phát hiện sớm sự cố và tối ưu vận hành.

## Thành phần chính
- OpenTelemetry/Prometheus: thu thập metrics hệ thống và ứng dụng.
- Grafana Dashboard: trực quan hóa tình trạng dịch vụ theo thời gian thực.
- Alert Manager: cảnh báo theo ngưỡng lỗi, độ trễ, tài nguyên.

## Cách triển khai
- Chuẩn hóa metric endpoint cho từng service.
- Gắn `traceId` xuyên suốt request chain.
- Thiết lập dashboard theo domain: Gateway, CRM, Data, Worker.
- Định nghĩa alert theo severity: warning/high/critical.

## Kết quả kỳ vọng
- Giảm MTTR khi có sự cố.
- Chủ động phát hiện bottleneck.
- Tăng độ ổn định khi scale hệ thống.
