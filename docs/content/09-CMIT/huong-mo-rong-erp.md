# Hướng mở rộng: ERP trên nền CEIAP / demo-cmit-api

**Mục đích:** đặt **monorepo hiện tại** trong khung **ERP doanh nghiệp** (tài chính, chuỗi cung ứng, vận hành, master data, tích hợp), chỉ rõ **service nào đã có** (thường là mảnh hoặc stub), và **lộ trình** mở rộng tới ERP đầy đủ hoặc **coexist** với SAP/Oracle/Microsoft Dynamics.  
**Lưu ý:** repo là **nền tảng tích hợp + nhiều bounded context** — không đồng nghĩa đã có module GL/AP/AR hay kho MRP hoàn chỉnh; phần đó là **roadmap hoặc tích hợp ngoài**.

**Liên quan:** [huong-mo-rong-crm.md](./huong-mo-rong-crm.md) *(quote-to-cash, khách hàng)* · [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md) · [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md) · [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md) · [services/dbsync-service/README.md](../services/dbsync-service/README.md) · [permission-system-design.md](./permission-system-design.md)

---

## 1. ERP là gì trong ngữ cảnh tài liệu này?

**ERP** (*Enterprise Resource Planning*): tập hợp quy trình và dữ liệu dùng chung — **sổ cái**, mua hàng, bán hàng, kho, sản xuất, nhân sự, tài sản — thường trên **một sổ sách nhất quán** (chart of accounts) và **chính sách đăng bút**.

**CEIAP / demo-cmit-api** hiện mạnh ở: **cổng API**, **tích hợp** (Integration Manager + adapter), **đồng bộ** (sync-service + dbsync-service), **workflow**, **lập lịch**, **thanh toán / hóa đơn điện tử** hướng adapter, **CRM** tách service — phù hợp làm **lớp orchestration** hoặc **domain satellite** quanh một ERP lõi.

---

## 2. Bản đồ service trong repo → nhóm chức năng ERP

| Nhóm ERP (khái niệm) | Service / thành phần trong repo | Ghi chú |
|----------------------|----------------------------------|---------|
| **Tài chính — thu tiền / hóa đơn** | `payment-service`, `billing-service`, `einvoice-service` | Thanh toán cổng; billing/invoice theo Postgres; eInvoice qua Integration Manager |
| **Bán hàng / CRM (phần đầu pipeline)** | `quote-service`, CRM `lead|contact|account|opportunity|activity` | Quote-to-cash **một phần**; chi tiết CRM: [huong-mo-rong-crm.md](./huong-mo-rong-crm.md) |
| **Vận đơn / logistics (tên nghiệp vụ)** | `booking-service`, `edo-service` (Electronic Delivery Order), `tracktrace-service`, `delivery-service`, `dispatch-service` | Postgres per service; mở rộng ERP vận hành / TMS |
| **Nhân sự / đào tạo (góc độ tên)** | `training-service` | Có thể mở rộng HRIS hoặc nối HRM ngoài |
| **Master / identity** | `auth-service`, `user-service` | Người dùng, phiên — thường đồng bộ với HR master qua tích hợp |
| **Tài liệu & chứng từ** | `file-service`, `doc-gateway`, `doc-metadata-service`, `doc-upload-service` | Lưu trữ chứng từ ERP (PDF, scan) |
| **Tích hợp & đồng bộ dữ liệu** | `integration-service`, `sync-service`, `dbsync-service`, `import-service`, `csv-service` | **Đồng bộ bảng** (dbsync) vs **đồng bộ entity/API** (sync) — chọn đúng công cụ theo runbook |
| **Quy trình & tự động** | `approval-service`, `scheduler-service` + worker | Phê duyệt chứng từ, job định kỳ đối soát |
| **Thông báo** | `notification-service` | Cảnh báo workflow, lỗi đồng bộ |

---

## 3. Lộ trình mở rộng theo giai đoạn

### 3.1 Giai đoạn 1 — **Quote-to-cash & chứng từ**

- Khép kín: **Opportunity → Quote → Order** (cần `order-service` hoặc mở rộng booking/edo làm “đơn hàng” chuẩn) → **Payment** → **eInvoice** → lưu `file-service`.  
- **Số chứng từ**, **trạng thái**, **audit** (`dbhistory-service` nếu dùng) theo chính sách kế toán.

### 3.2 Giai đoạn 2 — **Procure-to-pay (mua hàng)**

- Service **PO / GR / Invoice nhà cung cấp** (mới) hoặc đồng bộ từ ERP ngoài qua `sync-service` + mapper `purchase_order`.  
- **3-way match** (PO – nhận hàng – hóa đơn NCC): workflow + integration email/PDF parse (tuỳ độ phức tạp).

### 3.3 Giai đoạn 3 — **Kho & sản xuất (inventory / MRP)**

- **Inventory service** (tồn kho, movement, reservation) — thường Postgres + rule allocation.  
- Liên kết `dispatch` / `delivery` với xuất kho; **không** nhân đôi số liệu tồn giữa nhiều service không có chủ sở hữu rõ.

### 3.4 Giai đoạn 4 — **Sổ cái tổng hợp (GL) & báo cáo**

- **GL service** hoặc **kết nối SAP B1 / S/4 / Finance module**: CEIAP đóng vai **gateway sự kiện** (posting journal), không tự thay thế chứng từ pháp lý nếu chưa chứng nhận.  
- Data warehouse / BI đọc từ **read replica** hoặc lake — tránh query nặng trên OLTP.

### 3.5 Mô hình **coexist** (khuyến nghị nhiều doanh nghiệp vừa và lớn)

- ERP lõi (SAP/Oracle/D365) giữ **sổ kế toán và compliance**.  
- CEIAP: **omni-channel**, **tích hợp đối tác**, **workflow linh hoạt**, **file**, **CRM**, **API công khai** — đồng bộ hai chiều có **idempotency** và **audit** (đã có pattern trong platform).

---

## 4. Đồng bộ với ERP ngoài (kỹ thuật)

| Nhu cầu | Công cụ gợi ý |
|---------|----------------|
| Bảng–bảng, batch, CDC | `dbsync-service` (+ NATS/DLQ theo cấu hình) |
| Entity qua API, push/pull có mapper | `sync-service` + `platform/sync` |
| File / chứng từ | `file-service` + metadata; hash dedup |
| Lỗi & replay | Scheduler + `job_runs`; DLQ pattern |

Luồng thanh toán / hóa đơn mẫu: [vi-du-luong-thanh-toan-end-to-end.md](./vi-du-luong-thanh-toan-end-to-end.md), [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md).

---

## 5. Rủi ro & kiểm soát

| Rủi ro | Giảm thiểu |
|--------|-------------|
| **Hai nguồn sự thật** cho cùng một số dư / tồn kho | Chỉ một service “owner” sổ liệu; các nơi khác **tham chiếu** hoặc **read model**. |
| **Đăng bút kép** khi retry | Idempotency key (sync, payment, scheduler). |
| **Compliance** (thuế, ký số) | eInvoice / payment theo adapter đã review; log không chứa secret. |
| **Phân quyền chứng từ** | Policy theo tenant + role; [permission-system-design.md](./permission-system-design.md). |

---

## 6. Một trang tóm tắt (slide)

- **Hiện có:** tài chính-cạnh (payment, billing, einvoice), logistics (booking/edo/track/delivery/dispatch), CRM, import/csv, sync + dbsync, workflow.  
- **Tiếp theo:** order chuẩn quote-to-cash, PO nhà cung cấp, tồn kho.  
- **Tuỳ chọn:** GL trong nền tảng hoặc **ERP lõi ngoài** + CEIAP làm lớp tích hợp.  
- **Luôn:** một domain — một DB logic; audit đủ cho đối soát.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/huong-mo-rong-erp.md` |
| Cập nhật | Khi thêm module GL/inventory hoặc đổi chiến lược coexist |
