# GLS CRM — Quote + Pricing (gls.quote.uat)

Màn tạo báo giá với pricing calculate và format `QT-YYYYMM-xxxx-Vn`.

## Tính pricing

1. Nhập **Customer name**, **Qty**, **Unit price**, **Line discount ratio**.
2. Bấm **Tính pricing** — `POST /api/pricing/calculate`.
3. Xem subtotal, discount, VAT, total trước khi submit.

## Tạo quote

- Điền Customer / Opportunity ID nếu có.
- Submit — `POST /api/v1/quotes`.
- Quote **Pending** không cho Sales sửa (E-UAT-5).

## Approval

- Quote giá trị cao có thể cần workflow approval (crm.quote.approval.v1).

## Vai trò

- Sales: tạo draft, submit pending.
- Admin: duyệt và override.
