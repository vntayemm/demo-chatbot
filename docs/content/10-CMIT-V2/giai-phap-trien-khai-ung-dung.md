# Giải pháp Triển khai ứng dụng

## Thành phần
- Github/GitLab (Auto CI/CD)
- Delivery và Auto Rollback
- Môi trường triển khai DEV/UAT/PROD

## Luồng triển khai chuẩn
1. Commit + pull request + review.
2. CI chạy lint/test/build/scan.
3. Build image và push registry.
4. Deploy theo môi trường.
5. Smoke test và giám sát sau deploy.
6. Rollback tự động khi vượt ngưỡng lỗi.

## Kết quả kỳ vọng
- Rút ngắn thời gian phát hành.
- Giảm rủi ro lỗi production.
- Tăng khả năng truy vết phiên bản.
