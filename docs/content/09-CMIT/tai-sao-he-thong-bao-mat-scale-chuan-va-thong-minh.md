# Tại sao hệ thống này bảo mật, scale, “chuẩn” SOC/ISO/audit, ít mất dữ liệu, và được coi là thông minh?

**Mục đích:** trả lời **bằng luận cứ kiến trúc & vận hành** (có căn cứ repo + tài liệu), đồng thời **phân tách** điều gì do **phần mềm** hỗ trợ và điều gì chỉ hoàn thành khi **tổ chức** triển khai quy trình, chứng nhận, và backup.  
**Không nhầm lẫn:** có mã nguồn theo hướng **SOC 2 / ISO 27001** **không** đồng nghĩa đã **được chứng nhận** SOC 2 Type II hay ISO 27001 — chứng nhận là chương trình QMS + kiểm toán độc lập của doanh nghiệp.

**Liên quan:** [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) · [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) *(tiêu chí thiết kế + **mục 2** tầng bảo mật từ supply chain đến dữ liệu)* · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) · [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md) · [huong-mo-rong-ai.md](./huong-mo-rong-ai.md) *(GenAI / ML — tách khỏi “thông minh” kiến trúc mục 5)* · [permission-system-design.md](./permission-system-design.md) · [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) · [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md)

---

## 1. Tại sao hệ thống này **bảo mật**?

**Luận cứ chính:** bảo mật tốt không đến từ một tính năng đơn lẻ mà từ **nhiều lớp kiểm soát** (defense in depth) và **giảm bề mặt tấn công** ở ranh giới hợp lý.

| Lớp | Hệ thống hỗ trợ gì? | Vì sao giảm rủi ro? |
|-----|---------------------|---------------------|
| **Cổng API tập trung** | API Gateway làm điểm vào thống nhất | Dễ gắn TLS, rate limit, WAF, logging tập trung; client không cần biết địa chỉ nội bộ từng service |
| **Nhận thực OIDC / JWT** | Gateway và/hoặc service (vd. payment) xác minh token | Người dùng/dịch vụ không tin được nếu không có chứng thư từ IdP; giảm “API mở” |
| **Phân quyền theo policy** | Route nhạy cảm gắn scope/role (mở rộng trong `permission-system-design`) | Lộ token vẫn chưa đủ nếu thiếu quyền; tách **ai được làm** khỏi **ai đã đăng nhập** |
| **Tách biên tích hợp** | Payment, storage, eInvoice qua **Integration Manager** + adapter | Secret nhà cung cấp không hardcode rải rác; đổi provider ít đụng lõi nghiệp vụ |
| **HTTP hardening** | Helmet, CORS, body parser có giới hạn (theo từng service) | Giảm lỗi header XSS/clickjacking cơ bản; kiểm soát nguồn gọi cross-origin |
| **Mạng & TLS (production)** | Tài liệu triển khai: TLS tại LB/Ingress, DB không public | Mã hóa đường truyền; giảm sniffing và scan mù từ Internet |

**Điều kiện để “bảo mật” trở thành hiện thực:** bật đúng cấu hình prod (TLS, firewall, secret manager), **không** commit secret, rotate key, pentest/UAT bảo mật — xem [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) cột gap.

---

## 2. Tại sao hệ thống này **scale** (mở rộng quy mô)?

**Luận cứ chính:** scale ngang đòi hỏi **stateless ở tầng xử lý** và **tách tài nguyên nặng** (DB, queue) ra khỏi luồng request đồng bộ dài.

| Yếu tố | Trong kiến trúc này | Vì sao scale được? |
|--------|----------------------|---------------------|
| **Microservice** | Nhiều service độc lập deploy | Tăng replica **service nóng** (gateway, API đọc nhiều) mà không phải scale cả monolith |
| **API stateless** | JWT/OIDC, không session file cố định trên pod | Pod thêm/bớt sau load balancer **không** phụ thuộc sticky session |
| **Queue (Redis + BullMQ)** | Job nặng đưa vào worker | Request HTTP trả nhanh; worker scale theo độ sâu hàng đợi |
| **DB per service (hướng)** | Postgres/Mongo tách theo bounded context | Tránh một DB ún tắc toàn hệ thống; có thể read replica/shard **theo service** |
| **Đồng bộ có idempotency** | `sync-service` + `idempotencyKey` | Gọi lặp an toàn khi retry mạng — giảm “bắn đôi” giao dịch khi scale worker |

**Giới hạn thực tế:** compose dev thường **một node** DB/Redis; scale thật cần Redis HA, pool kết nối, và giám sát — đã nêu trong bảng cam kết tiêu chí.

---

## 3. Tại sao có thể nói hệ thống **hỗ trợ** SOC, ISO, audit, CoC / kiểm soát nội bộ?

**Định nghĩa rõ:**  
- **SOC 2** (AICPA TSC): đánh giá **kiểm soát** của tổ chức cung cấp dịch vụ (bảo mật, tính sẵn sàng, tính toàn vẹn xử lý, bảo mật dữ liệu, tính bảo mật… tùy báo cáo).  
- **ISO/IEC 27001**: hệ thống quản lý an toàn thông tin (ISMS) — **chính sách + bằng chứng vận hành**, không gói gọn trong một repo.  
- **Audit (kiểm toán nội bộ / bên ngoài):** cần **bằng chứng** (log, ticket, thay đổi cấu hình, access review).  
- **CoC:** thường là **Code of Conduct** (ứng xử con người) hoặc người dùng ý **chuỗi kiểm soát (chain of controls)** — dù là gì, phần mềm chỉ là **một mảnh** trong chuỗi.

**Vì sao kiến trúc này “ăn khớp” với câu hỏi kiểm toán thường gặp:**

| Chủ đề kiểm toán (ý rút gọn) | Repo / tài liệu hỗ trợ bằng chứng kỹ thuật |
|-------------------------------|--------------------------------------------|
| **Truy cập logic (ai làm gì)** | OIDC + policy route; mở rộng RBAC/ABAC trong `permission-system-design.md` |
| **Theo dõi & truy vết** | Correlation id (sync, gateway tùy cấu hình); audit `sync_audit`, `job_runs` scheduler |
| **Toàn vẹn & nhất quán tác vụ** | Transaction planner (`SKIP LOCKED`), idempotency sync |
| **Quản lý thay đổi & license** | `software-inventory-licenses-and-layers.md`, gợi ý SBOM/scan trong CI |
| **Sẵn sàng vận hành** | HA worker/planner, queue — khi triển khai đúng doc |

**Câu trả lời trung thực cho sếp / khách:** “Hệ thống được **thiết kế để thu thập bằng chứng** và **gắn kiểm soát kỹ thuật** phù hợp khung SOC2/ISO; **chứng nhận** là việc của tổ chức (chính sách, con người, DR drill, vendor risk).”

---

## 4. Tại sao hệ thống này **hướng tới không mất dữ liệu** (durability)?

**Luận cứ:** “Không mất dữ liệu” trong production = **lưu trữ bền** + **sao lưu/phục hồi** + **idempotent retry** + **RPO/RTO** thỏa thuận — không phải chỉ có Docker volume.

| Cơ chế | Ý nghĩa |
|--------|---------|
| **Postgres / Mongo có persistence** | Dữ liệu giao dịch, audit, integration instance nằm trên disk đã commit — không mất khi restart container nếu volume/db cluster đúng chuẩn |
| **Ghi trạng thái job / sync** | `job_runs`, `sync_audit` giúp **biết đã xử lý tới đâu** sau sự cố worker |
| **Idempotency** | Tránh tạo bản ghi trùng khi retry — giảm “mất nghiệp vụ” dạng double charge / double push |
| **Queue + acknowledgment** | Mô hình xử lý bất đồng bộ có thể **không mất message** khi cấu hình persistence Redis / NATS đúng (tùy triển khai) |

**Rủi ro còn lại:** một node dev, không backup off-site, không DR document — **vẫn có thể mất dữ liệu** nếu xóa volume hoặc thảm họa DC. Triển khai cụ thể: [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md); gap tổng hợp: [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) mục DR.

---

## 5. Tại sao hệ thống này được gọi là **thông minh** (trong nghĩa kiến trúc phần mềm)?

Ở đây “thông minh” **không** có nghĩa AI suy nghĩ thay người, mà là **giảm chi phí nhận thức và thay đổi**:

| Khía cạnh | Cách hệ thống “thông minh” |
|------------|----------------------------|
| **Tách biến đổi** | Adapter payment / storage / eInvoice — đổi nhà cung cấp **không** viết lại toàn bộ nghiệp vụ |
| **Một nơi cấu hình tích hợp** | Integration Manager — vận hành bật/tắt/đổi primary provider **không** redeploy code |
| **Đồng bộ có mô hình** | Mapper + audit + idempotency — suy nghĩ “integration” thành **pipeline có kiểm chứng** |
| **Nền tảng dùng lại** | `platform/*` (secure-config, sync, invoice, …) — pattern chung, ít lỗi lặp lại |
| **Tự động hóa theo thời gian** | Scheduler + worker — giảm can thiệp tay cho tác vụ định kỳ |

Càng nhiều logic nghiệp vụ được **mô tả rõ** (OpenAPI, policy, runbook), hệ thống càng **dễ vận hành đúng** — đó là dạng “thông minh” bền vững trong doanh nghiệp.

**Bổ sung GenAI / ML** (copilot, RAG tài liệu, gợi ý cấu hình) là **lớp mở rộng tùy chọn** — không trộn với định nghĩa trên; xem [huong-mo-rong-ai.md](./huong-mo-rong-ai.md).

---

## 6. Một trang tóm tắt cho slide

| Câu hỏi | Câu trả lời một dòng |
|---------|----------------------|
| Bảo mật? | Nhiều lớp: gateway, OIDC, policy, adapter, hardening — cần cấu hình prod + secret manager. |
| Scale? | Microservice stateless, queue, DB tách; scale replica & worker theo tải — chi tiết: [huong-dan-setup-scale.md](./huong-dan-setup-scale.md). |
| SOC / ISO / audit? | Kiến trúc **hỗ trợ kiểm soát & bằng chứng**; chứng nhận là chương trình tổ chức. |
| Không mất dữ liệu? | DB + audit + idempotency; **backup/DR** là bắt buộc để cam kết đầy đủ. |
| Thông minh? | Adapter, integration hub, platform libs, automation — ít thay đổi code khi đổi thế giới bên ngoài. |
| AI / GenAI? | Tùy chọn: copilot + RAG + tool có kiểm soát — [huong-mo-rong-ai.md](./huong-mo-rong-ai.md); tách khỏi “thông minh” kiến trúc lõi. |

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md`](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) |
| Cập nhật | Khi bổ sung DR chính thức hoặc thay đổi lớp bảo mật mặc định |
