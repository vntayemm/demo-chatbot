# Tổ chức thực hiện và thời gian triển khai

## 1) Tổ chức thực hiện
- Ban chỉ đạo/PM: quản lý tiến độ, phạm vi, rủi ro.
- Kiến trúc sư: kiểm soát kiến trúc và tiêu chuẩn kỹ thuật.
- Team Backend/Platform: triển khai service, platform, data flow.
- Team Frontend/Mobile: triển khai trải nghiệm người dùng.
- Team QA/DevOps/SRE: kiểm thử, CI/CD, vận hành, giám sát.

## 2) Kế hoạch thời gian tham chiếu

### Giai đoạn 1: Chuẩn bị (1-2 tuần)
- Chốt phạm vi, kiến trúc, môi trường và tiêu chuẩn.

### Giai đoạn 2: Triển khai nền tảng (2-4 tuần)
- Dựng hạ tầng, security baseline, observability, CI/CD.

### Giai đoạn 3: Phát triển nghiệp vụ lõi (4-8 tuần)
- Hoàn thiện các service chính và tích hợp hệ thống ngoài.

### Giai đoạn 4: UAT và tối ưu (2-3 tuần)
- Kiểm thử tích hợp, hiệu năng, bảo mật, sửa lỗi.

### Giai đoạn 5: Go-live và ổn định (1-2 tuần)
- Phát hành production theo checklist, giám sát sát sao.

## 3) Quản trị rủi ro tiến độ
- Theo dõi burn-down theo tuần.
- Có buffer cho hạng mục tích hợp ngoài.
- Có phương án rollback cho từng mốc phát hành.
