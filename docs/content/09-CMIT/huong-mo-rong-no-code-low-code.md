# Hướng mở rộng: no-code & low-code trên nền CEIAP / demo-cmit-api

**Mục đích:** mô tả **lộ trình sản phẩm / kiến trúc** để mở rộng hệ thống hiện tại (API-first, adapter, Integration Manager, policy, workflow) theo hướng **low-code** và **no-code** — phân biệt rõ phần **đã có trong repo** với phần **portal / builder** thường nằm ngoài monorepo API.  
**Đọc kèm:** [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) · [permission-system-design.md](./permission-system-design.md) (mục 11 Builder) · [ceiap-glossary.md](./ceiap-glossary.md) (*Control plane*) · [executive-summary-one-slide.md](./executive-summary-one-slide.md) (gaps) · [huong-mo-rong-crm.md](./huong-mo-rong-crm.md) *(CRM)* · [huong-mo-rong-erp.md](./huong-mo-rong-erp.md) *(ERP)* · [huong-mo-rong-ai.md](./huong-mo-rong-ai.md) *(AI — gợi ý form/flow)*.

---

## 1. Định nghĩa ngắn (cùng từ vựng)

| Thuật ngữ | Ý nghĩa trong bối cảnh này |
|-----------|----------------------------|
| **No-code** | Người dùng nghiệp vụ / quản trị cấu hình **không viết code** (bật tích hợp, tham số form, quy tắc đơn giản) — giới hạn bởi **khối chức năng** đã được kỹ sư đóng gói sẵn. |
| **Low-code** | Người có kỹ năng tối thiểu (hoặc IT citizen) **ghép luồng** từ API, schema, biểu mẫu; vẫn có chỗ cho **mã tùy chỉnh** (script, expression, adapter) khi vượt ngưỡng. |
| **Pro-code (repo hiện tại)** | Microservice TypeScript, `platform/*`, contract OpenAPI — nơi định nghĩa **hành vi phức tạp** và **biên an toàn**. |

**Nguyên tắc:** no-code/low-code **không thay** lớp domain nhạy cảm (sổ cái, ký số, phân quyền sâu) nếu chưa có **kiểm soát phiên bản, test, và phân quyền** tương đương pro-code.

---

## 2. Vì sao kiến trúc hiện tại **thuận lợi** cho mở rộng LC/NC

| Yếu tố đã có | Cách “ăn” với low-code / no-code |
|--------------|-----------------------------------|
| **Integration Manager** (`integration-service`) | Gần với **no-code tích hợp**: chọn provider, điền `config` theo `configSchema`, đặt primary — không redeploy service nếu adapter đã tồn tại. |
| **Adapter tại biên** | Builder chỉ thao tác **metadata + mapping**; SDK nhà cung cấp vẫn nằm trong adapter đã review. |
| **OpenAPI / REST thống nhất** | Low-code flow engine (Power Automate, n8n, tự build) gọi **cùng contract** qua gateway. |
| **`platform/sync` + mapper registry** | Low-code: UI chọn **entityType** + map field (lưu JSON mapping) sinh payload cho `POST /api/sync/runs` — vẫn qua engine đã audit. |
| **Scheduler + `job_runs`** | Low-code: “khi có webhook / lịch” → tạo job type đã đăng ký; ledger giữ **khả kiểm toán**. |
| **Policy / authorization-service** | Low-code: gán **permission code** vào bước luồng; đánh giá qua `POST .../evaluate` thay vì hardcode trong UI tùy tiện. |
| **`platform/secure-config` + KMS hướng** | No-code form **không** lộ secret; chỉ tham chiếu key trong vault. |

---

## 3. Lộ trình mở rộng theo lớp (đề xuất)

### 3.1 Giai đoạn A — **No-code vận hành** (rút ngắn thời gian triển khai)

- Portal quản trị trên API có sẵn: **instance** payment / storage / eInvoice / email (đã có pattern REST).  
- Wizard: validate body theo **JSON Schema** từ seed provider (đã có `configSchema` trong `integration-service`).  
- **Không** cần builder tự do: chỉ **form động** theo schema.

### 3.2 Giai đoạn B — **Low-code tích hợp & luồng**

- **Trình soạn thứ tự bước** (HTTP call, điều kiện, retry) gọi gateway — metadata lưu DB “flow definition”.  
- **Mapper UI** cho sync: ánh xạ field local ↔ remote, sinh cấu hình cho mapper động (cần mở rộng engine: hiện mapper **cố định** trong code, có thể thêm registry load từ DB sau review).  
- **Workflow designer** gắn `required_permission_codes` / `resolver_key` — đúng hướng [permission-system-design.md](./permission-system-design.md) mục 11.

### 3.3 Giai đoạn C — **Control plane / builder nghiệp vụ** (dài hạn)

- **Tenant, quota, template ứng dụng** — glossary gọi là *Control plane (future)*.  
- **Form runtime + data model** (entity động) cần **isolate** (đã có hướng `platform/isolate`, `data-solver`) + rule không cho citizen bypass policy.  
- **Conflict resolver UI** cho sync — explicit gap trong executive summary; cần thiết kế **chiến lược merge** trước khi no-code hóa.

---

## 4. Ranh giới an toàn (nên công bố cho khách hàng)

| Khu vực | Khuyến nghị |
|---------|-------------|
| **Thanh toán / ký số / hóa đơn** | No-code tới mức **cấu hình + luồng duyệt**; thuật toán kế toán / ký pháp lý vẫn pro-code hoặc package đã chứng nhận. |
| **Phân quyền** | UI chỉnh role/permission **trong tập mã đã seed**; thêm permission mới vẫn qua **release + review** (hoặc plugin ký số). |
| **Đồng bộ hai chiều** | Low-code mapping **một chiều** trước; hai chiều + conflict cần policy + test tải. |
| **Thực thi tùy ý (script)** | Nếu có expression engine — sandbox, timeout, không truy cập mạng tùy tiện. |

---

## 5. Khối công nghệ cần bổ sung (ngoài repo API thuần)

1. **Portal front-end** (React/Vue…) — SSO OIDC giống app chính.  
2. **Flow engine service** (lưu definition, phiên bản, audit ai sửa flow).  
3. **JSON Schema / form renderer** đồng bộ với `configSchema` provider.  
4. **Feature flag** + môi trường staging cho “flow nháp”.  
5. (Tuỳ chọn) **Catalog mẫu** (template tích hợp) export/import YAML.

---

## 6. Liên hệ với tài liệu cam kết & gap

- Bảng cam kết: dòng **i18n UI**, **control plane** — trạng thái *ngoài repo* / roadmap; tài liệu này **không** đổi cam kết pháp lý.  
- [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md): mở rộng LC/NC phải giữ được **audit** và **least privilege**.

---

## 7. Một slide tóm tắt

- **Hôm nay:** API + Integration Manager + policy + sync/scheduler **đã config-driven** ở nhiều điểm.  
- **Low-code tiếp theo:** flow HTTP + form schema + workflow UI trên nền **authorization-service** và ledger có sẵn.  
- **No-code đích:** vận hành và tích hợp **không dev** trong phạm vi template; **control plane** đầy đủ là hạng mục riêng.  
- **Không làm:** nhét logic tài chính tùy ý vào “script ô trong form” mà không governance.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/huong-mo-rong-no-code-low-code.md`](./huong-mo-rong-no-code-low-code.md) |
| Cập nhật | Khi ship portal đầu tiên hoặc flow engine trong monorepo |
