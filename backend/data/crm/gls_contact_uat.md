# GLS CRM — Contact UAT (gls.contact.uat)

Màn hình quản lý contact gắn Account, lookup email trùng và merge duplicate.

## Tạo contact

1. Nhập **Account ID** hoặc bấm **Tạo account mới**.
2. Điền **Họ**, **Tên**, **Email** (bắt buộc), **SĐT** (tùy chọn).
3. Submit form — `POST /api/v1/contacts`.

## Lookup email trùng (US-032)

- Nhập email vào ô Lookup → bấm **Lookup**.
- Nếu trùng, cân nhắc merge thay vì tạo mới.

## Merge contact

- **Target ID**: contact giữ lại.
- **Source ID**: contact bị gộp và xóa.
- Gọi merge API khi chắc chắn trùng email/phone.

## Vai trò

- Sales: CRUD contact trên account được phép.
- Admin: merge mọi contact.
- Viewer: không POST/PATCH.
