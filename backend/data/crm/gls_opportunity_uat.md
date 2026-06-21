# GLS CRM — Opportunity Kanban (gls.opportunity.uat)

Màn Kanban pipeline opportunity — kéo thả stage, PATCH stage và xem lịch sử.

## Tạo opportunity

1. Nhập **Account ID** và **Tên opportunity**.
2. **Amount**: giá trị deal (dùng báo cáo và quote).
3. Chọn **Stage ban đầu**: prospect hoặc qualified.
4. Bấm **Tạo Opportunity**.

## Kanban drag-drop

- Kéo card sang cột stage khác để cập nhật pipeline.
- API `PATCH` stage — xem raw JSON stage-history sau thao tác.

## Quote liên kết

- Từ opportunity qualified có thể tạo quote trên màn Quote UAT.

## Vai trò

- Sales: tạo opp và kéo stage.
- Viewer: chỉ xem Kanban, không drag-drop.
