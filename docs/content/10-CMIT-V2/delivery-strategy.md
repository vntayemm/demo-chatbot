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
