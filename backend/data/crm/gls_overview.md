# GLS CRM — Tổng quan AI Help

Hệ thống CRM GLS demo qua gateway `http://localhost:8080`, tenant `demo-tenant`.

## Đăng nhập UAT

| User | Password | Vai trò |
|------|----------|---------|
| admin | admin123 | Admin |
| sales | sales123 | Sales |
| viewer | viewer123 | Read-only |

Header: `Authorization: Bearer {jwt}` và `x-tenant-id: demo-tenant`.

## Các màn UAT chính

- **Lead create** — tạo, qualify, convert.
- **Contact** — CRUD, merge duplicate.
- **Opportunity** — Kanban pipeline.
- **Quote** — pricing + tạo báo giá.
- **Dashboard** — widgets + export Excel.

## Trợ giúp trên UI

- **F1 / ?** — Screen Help tĩnh (EPIC-14).
- **Nút AI** — hỏi chatbot tiếng Việt theo màn hình (EPIC-13).

Khi hỏi AI, hệ thống gửi kèm metadata màn hình (screenKey, title, role) để trả lời đúng ngữ cảnh.
