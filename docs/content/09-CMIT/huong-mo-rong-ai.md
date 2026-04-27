# Hướng mở rộng: AI (GenAI / ML) trên nền CEIAP / demo-cmit-api

**Mục đích:** định hướng **tích hợp trí tuệ nhân tạo** (gợi ý quy trình, hỗ trợ vận hành, phân loại, RAG tài liệu nội bộ) **mà không gán** cho repo hiện tại các module AI đã hoàn thiện.  
**Trạng thái thực tế:** monorepo **chưa** có service inference hay vector DB mặc định; mọi mở rộng AI là **lựa chọn kiến trúc** và thường thêm service hoặc worker mới.

**Liên quan:** [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) *(mục “thông minh” kiến trúc)* · [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) · [permission-system-design.md](./permission-system-design.md) · [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md) · [huong-mo-rong-crm.md](./huong-mo-rong-crm.md) · [huong-mo-rong-erp.md](./huong-mo-rong-erp.md) · [file-service README](../services/file-service/README.md) *(chứng từ / PDF)*

---

## 1. Phân loại “AI” hữu ích cho nền tảng này

| Nhóm | Ví dụ use case | Gắn với thành phần có sẵn |
|------|----------------|----------------------------|
| **Hỗ trợ vận hành (copilot)** | Trả lời “job sync này fail vì sao?” từ `sync_audit` + log | Correlation id, [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) |
| **RAG tài liệu** | Hỏi đáp trên `docs/*.md`, OpenAPI, runbook — **không** đưa secret vào prompt | `file-service` / doc-gateway cho nguồn bản đã được phân loại |
| **Gợi ý cấu hình (human-in-the-loop)** | Điền field Integration Manager từ mô tả tiếng Việt; **người** bấm Lưu | `integration-service`, `configSchema` |
| **Phân loại / routing** | Phân loại webhook, ưu tiên queue theo nội dung | `scheduler-service`, BullMQ worker |
| **Phát hiện bất thường** | Spike lỗi 5xx, `job_runs` FAILED tăng đột biến | Metrics worker, log tập trung |
| **Xử lý tài liệu** | OCR, tóm tắt hợp đồng (sau khi có pipeline và **pháp lý** đồng ý) | `document-processing-worker`, `doc-metadata-service` |

---

## 2. Kiến trúc mở rộng gợi ý

```
Client / Portal
      │
      ▼
 API Gateway  ──►  Domain services (không đổi contract công khai)
      │
      └──►  ai-assistant-service (mới) hoặc serverless function
                 │
                 ├── Vector store (pgvector / managed) — chỉ embedding tài liệu **được phép**
                 ├── LLM API (vendor) — key trong secret manager
                 └── Policy: PII mask, max token, allowlist path
```

- **Không** gắn SDK LLM trực tiếp vào `payment-service` / handler thanh toán — giữ **adapter tại biên**; AI là **lớp tùy chọn** gọi qua service riêng.  
- **Output** của model dùng cho **gợi ý** hoặc **nháp**; hành động có tác dụng pháp lý (posting, ký, xóa) vẫn qua API đã có + **OIDC/policy**.

---

## 3. Lộ trình theo giai đoạn (an toàn triển khai)

### 3.1 Giai đoạn 0 — Chuẩn bị dữ liệu & quyền

- Danh mục tài liệu được phép đưa vào RAG (public internal + không chứa secret).  
- Phân quyền endpoint AI: chỉ role `support` / `architect`; rate limit — xem [permission-system-design.md](./permission-system-design.md).  
- **Audit:** mỗi prompt/response (hash hoặc truncation) log vào store tách, retention theo policy.

### 3.2 Giai đoạn 1 — Read-only assistant

- Chat trên docs + OpenAPI; trích dẫn nguồn (citation).  
- Không gọi tool tự động sửa production.

### 3.3 Giai đoạn 2 — Tool có kiểm soát (optional)

- Tool **chỉ đọc**: `GET /api/sync/runs?...`, health, metrics.  
- Tool **ghi** (tạo instance integration, retry job): bắt buộc **xác nhận người** + idempotency + audit trail.

### 3.4 Giai đoạn 3 — ML cổ điển (không GenAI)

- Dự báo tải queue, phân loại spam lead, scoring đơn giản — train trên **dữ liệu đã anonymize**, pipeline riêng (notebook → model registry).

---

## 4. Rủi ro & kiểm soát (bắt buộc nêu trong đấu thầu / DPIA)

| Rủi ro | Giảm thiểu |
|--------|-------------|
| **Lộ PII / secret vào LLM** | Masking; không gửi JWT đầy đủ; contract với vendor (không train trên data khách). |
| **Hallucination** | Không tin output làm sự thật; UI hiển thị “gợi ý”; nguồn trích dẫn. |
| **Chi phí & latency** | Cache embedding; model nhỏ cho routing; timeout ngắn. |
| **Bản quyền / license code** | Không paste license lạ vào repo; quét dependency AI SDK. |
| **Pháp lý ngành** | Hóa đơn, ký số: AI chỉ hỗ trợ đọc/tóm tắt nếu **pháp chế** chấp thuận. |

---

## 5. Liên hệ với no-code / low-code

- Form / flow builder có thể có **“gợi ý AI”** cho mapping field (luôn human-in-the-loop) — xem [huong-mo-rong-no-code-low-code.md](./huong-mo-rong-no-code-low-code.md).  
- **Không** mở “chạy Python tùy ý” từ prompt mà không sandbox.

---

## 6. Một trang tóm tắt (slide)

- **Hiện tại:** nền tảng API + audit + tích hợp — **sẵn sàng gắn** AI như lớp assistant.  
- **Bước 1:** RAG read-only + policy + audit.  
- **Bước 2:** Tool có xác nhận + idempotency.  
- **Không:** tự động hóa giao dịch tài chính chỉ bằng LLM không giám sát.

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | `docs/huong-mo-rong-ai.md` |
| Cập nhật | Khi thêm `ai-*-service` hoặc chính sách dữ liệu AI được phê duyệt |
