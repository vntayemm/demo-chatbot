# Phương pháp luận — Tổ chức thực hiện — Timeline

**Mục đích:** định hướng **cách làm** (methodology), **cách tổ chức** (roles, nghiệp vụ, artefact), và **lịch giai đoạn** (timeline mẫu) để đưa nền tảng **demo-cmit-api** từ tài liệu + code hiện có đến môi trường **staging/production** có kiểm soát.

**Liên quan:** [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) (RACI, UAT, checklist) · [summary-va-cam-ket.md](./summary-va-cam-ket.md) · [bang-bao-gia-goi-cong-viec-mau.md](./bang-bao-gia-goi-cong-viec-mau.md) *(mẫu báo giá theo gói & tổng thể)* · [gioi-thieu-tich-hop-navis-he-thong-thu-ba.md](./gioi-thieu-tich-hop-navis-he-thong-thu-ba.md) *(TOS / NAVIS)* · [gioi-thieu-kien-truc-tong-the-he-thong.md](./gioi-thieu-kien-truc-tong-the-he-thong.md) *(kiến trúc tổng thể + sơ đồ)* · [gioi-thieu-he-thong-giam-sat-va-canh-bao.md](./gioi-thieu-he-thong-giam-sat-va-canh-bao.md) *(giám sát & cảnh báo)* · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md)

---

## 1. Phương pháp luận (methodology)

### 1.1 Nguyên tắc

| Nguyên tắc | Ý nghĩa thực thi |
|------------|------------------|
| **Kiến trúc dẫn dắt** | Quyết định bounded context, gateway route, và adapter **trước** khi nhân rộng feature nghiệp vụ. |
| **Tăng dần theo giá trị** | Mỗi giai đoạn có **một luồng đầu cuối** có thể demo (ví dụ: đăng nhập → một API domain → ghi log). |
| **Rủi ro sớm** | OIDC, secret, network zone, license (Mongo SSPL), payment sandbox — xử lý **trước** tuần go-live. |
| **Tài liệu = định nghĩa xong** | Mỗi gate (xem mục 3) yêu cầu cập nhật [`docs/content/09-CMIT/`](./index.md) hoặc README service tương ứng. |
| **Adapter ở biên** | Không nhúng SDK nhà cung cấp sâu trong domain; xem [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md). |

### 1.2 Vòng lặp công việc (gợi ý)

```
Khám phá phạm vi → Thiết kế / ADR ngắn → Triển khai nhỏ → Kiểm thử tự động + thủ công
       ↑                                                    │
       └──────────── Retrospective & cập nhật timeline ────┘
```

- **Không** cố “big bang” tất cả microservice cùng lúc nếu đội nhỏ; ưu tiên **đường ray** (gateway + auth + 1–2 domain + integration).

### 1.3 Chất lượng & kiểm soát thay đổi

- **CI:** `npm run build` (và test nếu có) trên service bị ảnh hưởng.  
- **Peer review** cho thay đổi cross-cutting (`api-gateway`, `platform/*`, env chung).  
- **Architecture Decision Record (ADR):** một file ngắn trong `docs/adr/` (tùy tổ chức tạo thư mục) khi đổi DB, broker, hoặc mô hình auth.

---

## 2. Phương pháp tổ chức thực hiện

### 2.1 Cấu trúc đội (mô hình gợi ý)

| Nhóm | Trách nhiệm chính |
|------|-------------------|
| **Steering / Product** | Ưu tiên backlog, phạm vi UAT, chấp nhận gate |
| **Platform / Kiến trúc** | Gateway, `platform/*`, integration, sync, scheduler patterns |
| **Squad domain** | Một hoặc nhiều service nghiệp vụ (booking, payment, …) |
| **DevOps / Hạ tầng** | Compose/K8s, mạng, secret, backup, monitoring |
| **An toàn thông tin** | Rà soát checklist bảo mật, license, endpoint admin |
| **QA** | Kịch bản UAT trong `giai-phap-van-hanh-va-giao-nhan.md` |

RACI chi tiết: xem mục 5 trong [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md).

### 2.2 Nghiệp vụ định kỳ (cadence)

| Sự kiện | Tần suất gợi ý | Output |
|---------|----------------|--------|
| Lập kế hoạch theo giai đoạn | Theo timeline mục 3 | Cập nhật ngày/milestone thực tế |
| Architecture review | Hai tuần / khi có ADR | Quyết định ghi nhận |
| Security sync | Hai tuần | Checklist B.2 trong `summary-va-cam-ket.md` |
| Demo nội bộ | Cuối mỗi phase | Slide one-page + smoke |
| Release / tag | Theo train (vd. 2 tuần) | Changelog, image tag |

### 2.3 Artefact bắt buộc tại mỗi gate (tối thiểu)

- Cập nhật **timeline** (bảng mục 3) với trạng thái ✅ / ⏳ / ❌.  
- Link **runbook** hoặc ghi chú triển khai trong [`docs/content/09-CMIT/`](./index.md) hoặc wiki nội bộ.  
- **Cam kết** đã ký phần liên quan gate (xem `summary-va-cam-ket.md`).

---

## 3. Timeline (lịch giai đoạn — mẫu điền ngày)

*Điền **ngày bắt đầu dự án** vào dòng dưới; chỉnh **số tuần** theo quy mô đội. Timeline mang tính **mẫu** (12–18 tuần tổng).*

**Ngày bắt đầu dự án:** ____ / ____ / ______  

### 3.1 Bảng tổng quan theo phase

| Phase | Tên | Tuần (gợi ý) | Mục tiêu kết thúc phase | Gate chấp nhận |
|-------|-----|----------------|-------------------------|----------------|
| **0** | Căn chỉnh & phạm vi | 1–2 | Đọc docs; chọn on-prem/cloud; danh sách service **trong phạm vi** go-live đầu | Steering ký phạm vi |
| **1** | Nền tảng chạy được | 2–4 | Gateway + DB/Redis + **1** domain service smoke; dev local ổn định | Health toàn path; doc `phat-trien-local-cho-dev` áp dụng được |
| **2** | Tích hợp & luồng nền | 3–5 | `integration-service` + 1 provider thật (vd. storage/payment sandbox); OIDC nếu có | UAT nhóm U-05 tối thiểu |
| **3** | Job & sync | 2–4 | Scheduler + worker + 1 job thật; `sync-service` smoke (entity `order`) | `job_runs` + `sync_audit` có bản ghi SUCCESS |
| **4** | Cứng hóa bảo mật & vận hành | 3–5 | Checklist server/mạng/bảo mật; secret manager; backup thử restore | ATTT + DevOps ký gate B.2/B.3 |
| **5** | UAT nghiệp vụ & tinh chỉnh | 2–4 | Chạy bộ UAT đã thống nhất; sửa blocker | Product ký UAT |
| **6** | Go-live & hypercare | 1–2 | Prod cutover; theo dõi 24–72h | Runbook + on-call |

**Tổng (gợi ý):** 14–22 tuần — **rút ngắn** nếu phạm vi chỉ 3–4 service; **kéo dài** nếu thêm compliance hoặc nhiều tích hợp legacy.

### 3.2 Timeline dạng Gantt đơn (Markdown)

Điền `█` theo tuần thực tế (ví dụ 16 tuần = 16 cột).

```
Tuần:     1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16
Phase 0   ██
Phase 1      ████
Phase 2          █████
Phase 3                ████
Phase 4                      █████
Phase 5                            ████
Phase 6                                ██
```

### 3.3 Phụ thuộc (dependency) giữa các phase

- Phase **2** phụ thuộc Phase **1** (gateway + DB).  
- Phase **3** có thể song song một phần với Phase **2** nếu đủ người — nhưng **không** go-live sync nếu chưa có Mongo/backup.  
- Phase **4** nên **chồng lên** cuối Phase 2–3 (rà soát sớm secret/OIDC).  
- Phase **5** bắt buộc sau Phase **4** tối thiểu (baseline bảo mật).

---

## 4. Rủi ro làm trễ timeline

| Rủi ro | Ứng phó |
|--------|---------|
| Thiếu quyết định IdP / OIDC | Phase 0–1 có workshop 1 buổi + owner |
| License Mongo / cloud policy | Phase 0 đọc `software-inventory-licenses-and-layers.md` + pháp chế |
| Một service “đặc thù” chưa build được Docker | Phase 1 ưu tiên sửa Dockerfile hoặc loại khỏi scope go-live 1 |
| Thiếu môi trường staging giống prod | Phase 4 yêu cầu ít nhất một staging |

---

## 5. Điều kiện “xong dự án” (definition of done — gợi ý)

- [ ] Timeline mục 3: tất cả gate **✅** hoặc có **miễn trừ** đã ký.  
- [ ] `summary-va-cam-ket.md` phần B đã điền và ký phần áp dụng.  
- [ ] Production (hoặc staging cuối) khớp `huong-dan-setup-server-mang-bao-mat.md` tối thiểu.  
- [ ] Một buổi **handover** đã diễn ra (ghi biên bản).

---

## Kiểm soát phiên bản

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/phuong-phap-to-chuc-va-timeline.md`](./phuong-phap-to-chuc-va-timeline.md) |
| Cập nhật | Khi đổi số tuần mặc định hoặc thêm phase bắt buộc (vd. DR drill) |

---

*Timeline là kế hoạch; thực tế cần cập nhật hàng tuần trong họp steering.*
