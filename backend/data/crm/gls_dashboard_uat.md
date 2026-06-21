# GLS CRM — Dashboard (gls.dashboard.uat)

Dashboard widgets Sales/Manager và export Excel US-120–122.

## Tải widgets

1. Đăng nhập admin hoặc sales.
2. Chọn **Sales dashboard** hoặc **Manager dashboard** trong dropdown role.
3. Bấm **Tải widgets** — `GET /api/v1/crm/orchestration/dashboard/sales` hoặc manager.

## Export Excel

- Bấm **Export Excel** — tải file `.xlsx` (US-122).
- Smoke assert thời gian phản hồi dưới 5 giây.

## Widgets

- Leads, quotes, pipeline metrics theo role.
- Manager có KPI mở rộng hơn Sales.

## Vai trò

- Sales: widgets sales.
- Admin/Manager: KPI + export toàn tenant.
