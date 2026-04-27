# Giới thiệu tích hợp với hệ thống bên thứ ba (ví dụ NAVIS / TOS cảng)

**Mục đích:** mô tả **cách tích hợp** hệ điều hành cảng / TOS (**NAVIS** hoặc sản phẩm tương đương) với nền tảng **CEIAP** trong monorepo **demo-cmit-api**, và **vì sao** mô hình này hướng tới **an toàn**, **bảo mật**, và **giảm mất dữ liệu** — không thay hợp đồng với nhà cung cấp NAVIS; tên sản phẩm cụ thể theo **license & tài liệu vendor**.  
**Căn cứ kiến trúc repo:** `integration-service` (cấu hình & instance provider), `sync-service` + `@cmit/platform-sync` (đồng bộ có audit + idempotency), `dbsync-service` (đồng bộ dòng dữ liệu + DLQ tùy cấu hình), `api-gateway`.  
**Đọc thêm:** [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md) · [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) (bảo mật theo tầng) · [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md).

---

## 1. NAVIS / TOS trong bối cảnh cảng biển

**TOS** (*Terminal Operating System*) là hệ thống vận hành bến: container, tàu, cổng, yard, cẩu… **NAVIS** (thương hiệu phổ biến trong ngành, ví dụ dòng sản phẩm N4) là một họ giải pháp TOS — khách hàng có thể dùng TOS khác (homegrown, OEM) nhưng **nguyên tắc tích hợp** dưới đây vẫn áp dụng.

**Dữ liệu điển hình cần trao đổi:** trạng thái container, lịch tàu, gate move, chứng từ điện tử liên quan chuyến, v.v. — luôn qua **API / message / file** do TOS công bố, **không** ghi thẳng vào DB nội bộ của TOS từ hệ thống CEIAP trừ khi có hợp đồng & API chính thức cho phép.

---

## 2. Mô hình tích hợp trên CEIAP (từ biên vào trong)

| Lớp | Vai trò với TOS / NAVIS | Thành phần repo (gợi ý) |
|-----|-------------------------|-------------------------|
| **Biên HTTP** | Client nội bộ / đối tác chỉ gọi **gateway**; không lộ địa chỉ TOS ra Internet công cộng nếu không cần | `api-gateway` |
| **Cấu hình & bí mật** | URL endpoint TOS, client credential, cert — lưu qua **Integration Manager**, không hardcode trong git | `integration-service` |
| **Đồng bộ ứng dụng (DTO / use case)** | Map nội bộ ↔ payload TOS; **idempotency**; **audit** mỗi lần chạy | `sync-service`, `platform/sync` |
| **Đồng bộ dòng (bảng / event)** | CDC / batch / queue — có **DLQ** khi cấu hình | `dbsync-service` (xem DLQ trong service) |
| **Nghiệp vụ cổng khách hàng** | Booking, eDO, thanh toán… dùng dữ liệu đã chuẩn hóa sau tích hợp | Các `services/*` tương ứng |

**Adapter NAVIS:** triển khai như **adapter** trong `platform/*` hoặc module HTTP client trong service — tuân [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md) (interface + factory + `adapters/`).

---

## 3. Vì sao tích hợp này **an toàn** và **bảo mật**

| Nguyên tắc | Giải thích ngắn |
|------------|-----------------|
| **Tách biên (adapter tại biên)** | Logic NAVIS/TOS **không** tràn sâu vào domain nội bộ; thay đổi API vendor chỉ đụng lớp adapter + test — giảm diện tích lỗi và rò rỉ pattern nội bộ. |
| **Secret không trong mã** | Credential chỉ trong **instance** Integration Manager / secret store runtime — [huong-dan-cau-hinh.md](./huong-dan-cau-hinh.md), [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md). |
| **Mạng có kiểm soát** | Gọi TOS từ **subnet ứng dụng** / VPN site-to-site / private link; DB nội bộ **không** public; TLS đến endpoint TOS khi hỗ trợ. |
| **Least privilege** | Tài khoản API TOS chỉ quyền **đọc/ghi tối thiểu** cần cho luồng (vd. chỉ đọc container visit, không admin TOS). |
| **Nhận thực hai chiều** | CEIAP dùng **OIDC/JWT** cho người dùng; gọi TOS dùng **token/cert** theo vendor; webhook từ TOS (nếu có) nên **chữ ký / IP allowlist** — xem mục bảo mật tầng ứng dụng & edge trong [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) **§2**. |
| **Không thực thi mã tùy ý** | Không nhận “script” từ TOS để chạy trên server CEIAP; chỉ **dữ liệu đã validate** theo schema. |
| **Audit & truy vết** | `sync_audit` (và luồng tương đương) cho phép trả lời “ai/ khi nào/ kết quả gì” sau sự cố — [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md). |

**Lưu ý:** an toàn **thực tế** còn phụ thuộc cấu hình production (TLS, firewall, pentest) — [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md).

---

## 4. Vì sao **giảm mất dữ liệu** (durability & consistency)

| Cơ chế | Ý nghĩa |
|--------|---------|
| **Idempotency key** | Gọi lặp (retry mạng, user bấm lại) **không** tạo bản ghi trùng nghiệp vụ — ví dụ luồng sync: `REPLAYED` khi đã thành công trước đó — [vi-du-luong-e2e-sync-payment-einvoice.md](./vi-du-luong-e2e-sync-payment-einvoice.md) §1. |
| **Ghi audit trước / sau trạng thái** | Mỗi lần chạy có dấu vết trong DB (`sync_audit`); có thể đối soát với TOS khi nghi ngờ lệch. |
| **Hàng đợi & DLQ** | Luồng **dbsync** / event: message không “rơi” im lặng — lỗi đưa vào **DLQ** để xử lý lại hoặc bù tay — xem tài liệu DLQ trong `services/dbsync-service`. |
| **Sở hữu dữ liệu rõ** | DB nghiệp vụ CEIAP do CEIAP backup; đồng bộ là **sao chép / tham chiếu** có kiểm soát, không thay thế chính sách backup của TOS. |
| **Không ghi đè mù** | Mapper & rule versioning: đổi mapping có chiến lược migration / backfill có kiểm soát (ADR + runbook). |

**Không cam kết tuyệt đối “không mất một byte”:** sự cố **hai chiều ghi** (race), lỗi logic mapper, hoặc xóa nhầm trên TOS vẫn có thể xảy ra — kiến trúc trên **giảm xác suất** và **tăng khả năng phục hồi có bằng chứng**.

---

## 5. Rủi ro điển hình & giảm thiểu

| Rủi ro | Giảm thiểu |
|--------|-------------|
| API TOS thay đổi version | Contract test + adapter versioned; giám sát deprecation vendor |
| Credential lộ | Rotate key; secret manager; không log header Authorization |
| Tải cao làm timeout | Retry có backoff + idempotency; queue giữa hai hệ |
| Lệch schema | Validate ingress/egress; schema registry hoặc Zod/OpenAPI nội bộ |
| Mất đồng hồ (JWT/OIDC) | NTP trên host — [tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) §2.3 |

---

## 6. Bước tiếp theo (triển khai thực tế)

1. Thu thập **tài liệu API** (hoặc file/message) từ đội vận hành TOS / NAVIS.  
2. Đăng ký **instance** trong Integration Manager (base URL, auth, scope).  
3. Viết **adapter** + mapper; bật transport HTTP hoặc queue theo môi trường.  
4. Viết **kịch bản UAT** đồng bộ hai chiều + rollback nghiệp vụ — [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md).  
5. Thỏa thuận **RPO/RTO** và drill backup — [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md).

---

| Trường | Giá trị |
|--------|---------|
| File | `docs/gioi-thieu-tich-hop-navis-he-thong-thu-ba.md` |
