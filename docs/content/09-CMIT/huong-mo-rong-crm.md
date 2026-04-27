# Hướng mở rộng: CRM trên nền CEIAP / demo-cmit-api

**Mục đích:** mô tả **trạng thái hiện tại** các microservice CRM trong repo, **nguyên tắc kiến trúc** (sở hữu dữ liệu, chuyển đổi lead), và **lộ trình mở rộng** tới CRM doanh nghiệp (bán hàng, marketing, dịch vụ, đồng bộ hệ thống ngoài).  
**Căn cứ mã:** `lead-service`, `contact-service`, `account-service`, `opportunity-service`, `activity-service`, proxy gateway `/api/v1/leads|contacts|accounts|opportunities|activities`, `quote-service`, `file-service` (đính kèm theo entity), `sync-service`, `approval-service`.

**Liên quan:** [huong-mo-rong-erp.md](./huong-mo-rong-erp.md) *(tài chính, logistics, đồng bộ ERP)* · [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md) · [permission-system-design.md](./permission-system-design.md) · [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md) *(mẫu sync entity)* · [services/lead-service/note.md](../services/lead-service/note.md)

---

## 1. CRM trong repo hiện tại (data plane)

Các bounded context **tách DB Mongo** (`MONGODB_DB_NAME` riêng trên cluster thường dùng chung `mongo-dbhistory` trong compose):

| Service | Vai trò CRM | API qua gateway (ví dụ) |
|---------|-------------|-------------------------|
| **lead-service** | Tiềm năng: nguồn, trạng thái, qualify, **convert** sang contact/account/opportunity (lưu ID) | `/api/v1/leads`, `.../convert` |
| **contact-service** | Người: email/phone, liên kết `accountId` | `/api/v1/contacts` |
| **account-service** | Tổ chức / khách hàng doanh nghiệp | `/api/v1/accounts` |
| **opportunity-service** | Cơ hội bán, pipeline | `/api/v1/opportunities` |
| **activity-service** | Task, call, meeting, note gắn lead/contact/account/opportunity | `/api/v1/activities` |

**OpenAPI:** gateway có route tài liệu `/api/v1/leads/docs`, `.../contacts/docs`, … (swagger từng service).

**Quy tắc đã thể hiện trong tài liệu lead:** không cross-write DB giữa service; **liên kết bằng ID + API** (hoặc sự kiện sau này). Luồng convert khuyến nghị: client/orchestrator tạo contact/account/opportunity rồi gọi `POST .../leads/:id/convert` với body ID — xem [lead-service/note.md](../services/lead-service/note.md).

---

## 2. Vì sao tách service (và cách mở rộng an toàn)

| Lợi ích | Ý nghĩa khi mở rộng CRM |
|---------|-------------------------|
| **Scale theo domain** | Tăng replica `opportunity-service` khi pipeline nặng mà không kéo `lead-service`. |
| **Team độc lập** | Nhóm bán hàng vs nhóm master data có thể release lịch khác nhau. |
| **Phân quyền tinh** | Policy khác nhau cho “đọc lead” vs “sửa cơ hội” — map sang [permission-system-design.md](./permission-system-design.md). |
| **Đồng bộ ra ngoài** | Mỗi entity type có thể có **mapper sync** riêng (pattern giống `order` trong `sync-service`) mà không phá vỡ schema nội bộ. |

---

## 3. Lộ trình mở rộng theo giai đoạn

### 3.1 Giai đoạn 1 — **Hoàn thiện lõi bán hàng (SFA)**

- Thống nhất **OIDC + tenant** trên mọi route CRM (giống `payment-service`).  
- **Orchestration convert lead** (tùy chọn): một service mỏng `crm-orchestration` gọi tuần tự contact → account → opportunity → lead convert, **một transaction nghiệp vụ** (saga + bù lỗi) nếu khách cần atomic UX.  
- **Quote / báo giá:** liên kết `quote-service` với `opportunityId` / `accountId` (field tham chiếu + API), trạng thái thắng/thua cập nhật opportunity.

### 3.2 Giai đoạn 2 — **Marketing & engagement**

- **Campaign / segment** (service mới hoặc mở rộng lead `source` + bảng campaign): import lead, tracking UTM.  
- **Email/SMS** qua Integration Manager (`type=email` / `sms`) — workflow gửi sau sự kiện (scheduler + template).  
- **Web-to-lead:** form công khai → rate limit gateway → `POST /api/v1/leads`.

### 3.3 Giai đoạn 3 — **Dịch vụ khách hàng (service)**

- Ticket/case service, SLA, queue; liên kết `accountId` / `contactId`.  
- **Knowledge base** + file đính kèm (`file-service` + `entity_attachment`).

### 3.4 Giai đoạn 4 — **Đồng bộ & hệ sinh thái**

- **CRM ngoài** (Salesforce, HubSpot, Zoho): mapper `sync-service` push/pull account/contact/opportunity; **idempotency** + audit bắt buộc.  
- **ERP / đơn hàng:** đã có `order` mapper mẫu — mở rộng entity `invoice` / `sales_order` hai chiều với policy conflict.  
- **Sự kiện nội bộ:** NATS/Kafka — `LeadCreated` → activity + notification.

---

## 4. Thành phần nền tảng đã có — tái sử dụng cho CRM

| Thành phần | Ứng dụng CRM |
|-------------|----------------|
| **approval-service** + `platform/approval` | Phê duyệt giảm giá, chuyển giai đoạn opportunity bất thường, mở credit. |
| **file-service** | Hợp đồng, báo giá PDF đính kèm opportunity/account (`entity_attachment`). |
| **scheduler-service** | Nhắc follow-up activity, sync định kỳ sang CRM ngoài. |
| **authorization-service** | `evaluate` / batch cho UI danh sách (ẩn dòng không đủ quyền). |
| **integration-service** | Kết nối kênh marketing, enrichment dữ liệu (tuỳ adapter). |

---

## 5. Rủi ro & kiểm soát

| Rủi ro | Giảm thiểu |
|--------|-------------|
| **Phân mảnh liên kết** (orphan ID sau convert lỗi giữa chừng) | Saga có bù + idempotency key; hoặc orchestration một API. |
| **Trùng contact/email** | Rule dedup (ở contact-service hoặc lớp orchestration) + merge UI (low-code). |
| **Rò rỉ tenant** | Mọi query theo `tenantId`; index + test cross-tenant; xem [permission-system-design.md](./permission-system-design.md). |
| **Đồng bộ hai chiều** | Chính sách conflict (LWW / manual) trước khi bật pull từ CRM ngoài. |

---

## 6. Một trang tóm tắt (slide)

- **Hiện có:** Lead → Contact / Account / Opportunity / Activity + Quote + gateway versioning `/api/v1/...`.  
- **Tiếp theo:** OIDC đồng bộ, orchestration convert, quote-opportunity, event.  
- **Sau nữa:** Campaign, service desk, sync CRM ngoài có audit.  
- **Luôn giữ:** một service — một DB logic; liên kết qua ID/API; policy ở edge và trong service.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/huong-mo-rong-crm.md` |
| Cập nhật | Khi thêm service CRM mới hoặc đổi contract convert lead |
