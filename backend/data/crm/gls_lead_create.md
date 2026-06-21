# GLS CRM — Tạo Lead (gls.lead.create)

Màn hình tạo lead mới trong CRM GLS. Sales dùng để nhập khách tiềm năng trước khi qualify và convert.

## Cách tạo lead

1. Đăng nhập Sales hoặc Admin qua nút **Đăng nhập** trên màn UAT.
2. Nhập **Họ**, **Tên**, **Công ty** (bắt buộc).
3. Nhập **Email** hoặc **SĐT** — ít nhất một trong hai.
4. Chọn **Nguồn** (Website, Referral, Campaign, Other).
5. Bấm **Tạo Lead** — API `POST /api/v1/leads` trả 201.

## Qualify và Convert

- Sau khi tạo, lead ở trạng thái **New**.
- Qualify lead khi đủ thông tin — chuyển sang **Qualified**.
- Chỉ lead **Qualified** mới convert sang Account + Contact + Opportunity.
- Viewer (read-only) không được POST/PATCH lead.

## Lỗi thường gặp

- **400**: thiếu email và phone.
- **403**: viewer cố tạo lead.
- **409 dedup**: email trùng — kiểm tra cảnh báo dedup trên UI.

## Vai trò

- **Sales**: tạo, qualify, convert theo FSM.
- **Admin**: full quyền + break-glass.
- **Viewer**: chỉ xem danh sách GET leads.
