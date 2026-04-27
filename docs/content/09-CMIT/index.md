# 09-CMIT | CMIT

Nhóm tài liệu **CMIT / CEIAP** trong repo này nằm tại `docs/content/09-CMIT/`.

**Gợi ý đọc:** tóm tắt lãnh đạo / chiến lược → kiến trúc & bảo mật → phương pháp & vận hành → cài đặt → ví dụ luồng nghiệp vụ → hướng mở rộng → thư viện tham chiếu.

---

## 1) Định hướng & chiến lược

- [Executive summary (one slide)](./executive-summary-one-slide.md)
- [Platform strategy & architecture handbook (CTO / CIO)](./platform-strategy-cto-handbook.md)
- [Summary & cam kết](./summary-va-cam-ket.md)

## 2) Kiến trúc & thiết kế

- [Giới thiệu kiến trúc tổng thể hệ thống](./gioi-thieu-kien-truc-tong-the-he-thong.md)
- [Tổng quan tiêu chí thiết kế (góc nhìn kiến trúc sư)](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md)
- [Thiết kế RBAC + ABAC đa tenant, workflow, integration](./permission-system-design.md)
- [Tại sao hệ thống bảo mật, scale, chuẩn SOC/ISO, ít mất dữ liệu, “thông minh”](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md)

## 3) Phương pháp, vận hành & bảo trì

- [Phương pháp luận — Tổ chức thực hiện — Timeline](./phuong-phap-to-chuc-va-timeline.md)
- [Giải pháp — Bảo mật — Kiến trúc — Vận hành — Giao nhận (UAT & kiểm tra)](./giai-phap-van-hanh-va-giao-nhan.md)
- [Giới thiệu hệ thống giám sát & cảnh báo](./gioi-thieu-he-thong-giam-sat-va-canh-bao.md)
- [Quy trình bảo trì audit & bảo mật](./quy-trinh-bao-tri-audit-va-bao-mat.md)
- [Quy trình bảo trì & backup cơ sở dữ liệu](./quy-trinh-bao-tri-va-backup-database.md)
- [Quy trình bảo trì & backup file (object storage + metadata)](./quy-trinh-bao-tri-va-backup-file-storage.md)

## 4) Cài đặt & môi trường

- [Phát triển local cho developer](./phat-trien-local-cho-dev.md)
- [Hướng dẫn setup Docker](./huong-dan-setup-docker.md)
- [Hướng dẫn setup & scale](./huong-dan-setup-scale.md)
- [Hướng dẫn setup server, mạng & bảo mật](./huong-dan-setup-server-mang-bao-mat.md)
- [Hướng dẫn cấu hình (môi trường, biến, secret)](./huong-dan-cau-hinh.md)
- [Triển khai on-prem vs cloud — Linux vs Windows Server](./trien-khai-onprem-cloud-linux-windows.md)

## 5) Tích hợp & luồng nghiệp vụ (ví dụ)

- [Ví dụ luồng thanh toán end-to-end](./vi-du-luong-thanh-toan-end-to-end.md)
- [Ví dụ luồng E2E: đồng bộ, thanh toán, eInvoice](./vi-du-luong-e2e-sync-payment-einvoice.md)
- [Tích hợp hệ thống bên thứ ba (ví dụ NAVIS / TOS)](./gioi-thieu-tich-hop-navis-he-thong-thu-ba.md)

## 6) Lộ trình mở rộng

- [Hướng mở rộng CRM](./huong-mo-rong-crm.md)
- [Hướng mở rộng ERP](./huong-mo-rong-erp.md)
- [Hướng mở rộng AI (GenAI / ML)](./huong-mo-rong-ai.md)
- [Hướng mở rộng no-code & low-code](./huong-mo-rong-no-code-low-code.md)

## 7) Thư viện & tham chiếu

- [CEIAP glossary](./ceiap-glossary.md)
- [Software inventory: license, layer, dependency](./software-inventory-licenses-and-layers.md)
- [Danh sách chủ đề blog đề xuất](./danh-sach-chu-de-blog-de-xuat.md)

---

## Hướng dẫn thêm file

1. Đặt file `.md` vào thư mục này (tên dạng `chu_de_ngan_gon.md`, không dấu, gạch dưới).
2. Thêm tên file vào `.pages` trong mục `nav:` — nên xếp gần đúng cùng **nhóm** như mục lục trên. Xem mẫu [`../08-marketing/.pages`](../08-marketing/.pages).
3. Thêm mục (hoặc bullet) trong `index.md` đúng nhóm.
4. Chạy `mkdocs build` hoặc `mkdocs serve` để kiểm tra.
