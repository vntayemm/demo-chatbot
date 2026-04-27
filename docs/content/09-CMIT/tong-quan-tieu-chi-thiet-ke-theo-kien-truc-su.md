# Tổng quan tiêu chí thiết kế (góc nhìn kiến trúc sư)

**Mục đích:** một trang **định hướng** các tiêu chí đã/hoặc nên áp dụng khi thiết kế & đánh giá **demo-cmit-api** / **CEIAP**: chuẩn kỹ thuật, bảo mật, scale, HA; triết lý **platform** (mở, bền vững, giảm khóa nhà cung cấp); nguyên lý **SOLID**, **pattern** và **OOP** trong thực tế TypeScript / microservice.  
**Phạm vi:** khung **kiến trúc & chất lượng thiết kế** — không thay tài liệu triển khai chi tiết (Docker, server, scale số).  
**Đọc sâu:** [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) · [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) · [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) · [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) · [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md) · [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md) (triển khai server/TLS/secret).

---

## 1. Bốn trục tiêu chí (chuẩn — bảo mật — scale — HA)

| Trục | Ý nghĩa ngắn | Trong repo / tài liệu |
|------|--------------|------------------------|
| **Chuẩn** | Type safety, versioning API, contract (OpenAPI), CI, logging có ngữ cảnh, code review | TypeScript `strict`; gateway `/api/v1`; inventory license & layer |
| **Bảo mật** | Defense in depth — **từng tầng** xem **mục 2**; least privilege; secret không trong git; TLS prod; audit | Gateway OIDC, policy route, Integration Manager; [permission-system-design.md](./permission-system-design.md) |
| **Scale** | Stateless ở tầng HTTP, tách job nặng, scale replica theo domain | Queue + worker; microservice tách DB; [huong-dan-setup-scale.md](./huong-dan-setup-scale.md) |
| **HA** | Nhiều instance an toàn, DB/Redis không single point khi cam kết SLO | Planner `SKIP LOCKED`; bảng cam kết gap HA DB/Redis/gateway |

**Lưu ý kiến trúc sư:** “đã thiết kế” ≠ “đã triển khai đủ mức production”. Compose dev thường **một node**; HA thật là quyết định **hạ tầng + vận hành** — [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) phân biệt rõ trạng thái vs mục tiêu.

---

## 2. Bảo mật theo tầng (defense in depth)

Mô hình dưới đây xếp từ **gần phần cứng & vòng đời** lên **ứng dụng & dữ liệu**. Mỗi tầng **bổ sung** chứ không thay thế tầng dưới. Triển khai chi tiết (CIDR, TLS, vault): [huong-dan-setup-server-mang-bao-mat.md](./huong-dan-setup-server-mang-bao-mat.md).

### 2.1 Tầng 0 — Nguồn gốc & chuỗi cung ứng (supply chain)

| Hạng mục | Mục tiêu |
|----------|----------|
| **Mã nguồn** | Branch protection, bắt buộc review; merge chỉ qua PR; (tuỳ chọn) signed commit/tag. |
| **Dependency** | Lockfile (`package-lock.json` / `yarn.lock`); quét CVE (Dependabot, Snyk, `npm audit` trong CI); policy license. |
| **SBOM** | Xuất CycloneDX/SPDX cho image release để truy vết thành phần khi có CVE. |
| **Provenance** | (Khuyến nghị) Build có chứng thư SLSA/build attestation — ai build, từ commit nào. |

### 2.2 Tầng 1 — CI/CD & “delivery” build (không chỉ chạy app)

| Hạng mục | Mục tiêu |
|----------|----------|
| **Secret pipeline** | **Không** lưu khóa đám mây dài hạn trong biến repo; ưu tiên **OIDC workload identity** (GitHub Actions → AWS/GCP/Azure) hoặc secret store của CI. |
| **Biến môi trường CI** | Phân tách secret vs config; mask log; không `echo` secret vào artifact log. |
| **Runner** | Ephemeral runner khi có thể; hardening runner theo doc nhà cung cấp; giới hạn quyền job chỉ deploy được vào môi trường đích. |
| **Artifact** | Image/container **sign** (cosign/notary); chỉ deploy digest đã ký; registry private + RBAC. |
| **Static scan** | SAST/secret scanning trên PR; chặn merge nếu leak key mẫu. |
| **Quyền deploy** | Tách role: build ≠ promote prod; multi-env với approval gate. |

### 2.3 Tầng 2 — Bootstrap & hardening hệ điều hành host (VM / bare metal)

Áp dụng khi tự quản OS (VM on-prem hoặc cloud IaaS). PaaS/Kubernetes managed một phần được nhà cung cấp đảm nhận — vẫn nên đối chiếu checklist.

| Hạng mục | Mục tiêu |
|----------|----------|
| **Cài đặt ban đầu** | OS **LTS** tối thiểu; disk/partition tách (OS / data / Docker root); **full disk encryption** nếu yêu cầu compliance. |
| **Đồng bộ giờ (NTP/Chrony)** | Bật **chronyd** / **systemd-timesyncd** — JWT/OIDC, cert X509, log correlation và audit trail **phụ thuộc** đồng hồ đúng; tránh skew lớn giữa node. |
| **Đăng nhập quản trị** | **Tắt đăng nhập SSH bằng root** (hoặc chỉ break-glass có kiểm soát); chỉ **SSH key**, có thể kèm **AllowUsers**/bastion; đổi port SSH *không* thay thế firewall. |
| **Tài khoản dịch vụ** | Ứ dụng/container chạy dưới user **không phải root** trên host khi chạy trực tiếp; với Docker: daemon root nhưng **process trong container** nên `USER` non-root trong Dockerfile. |
| **Sudo & session** | `sudo` có log/audit; timeout session; không chia sẻ tài khoản admin cá nhân cho automation. |
| **Patch** | Kênh cập nhật bảo mật tự động hoặc lịch patch có cửa sổ; reboot có kế hoạch. |
| **Baseline** | Tham chiếu **CIS Benchmark** / **DISA STIG** (RHEL/Ubuntu) cho sysctl, service disable, auditd. |
| **chroot / namespace** | Với container, cô lập là **namespaces + cgroups**; “chroot” cổ điển ít dùng đơn lẻ — ưu tiên **container runtime** đã hardening. |

### 2.4 Tầng 3 — Runtime nền tảng (container orchestration / VM app layer)

| Hạng mục | Mục tiêu |
|----------|----------|
| **Kubernetes** | RBAC tối thiểu; **NetworkPolicy** cô lập namespace; **Pod Security** (restricted); admission (OPA/Kyverno) chặn privileged, hostPath nguy hiểm. |
| **Secret tại runtime** | External Secrets / Sealed Secrets / CSI secret driver — không bake secret vào image. |
| **Node** | Kubelet/OS patch; giới hạn quyền workload chạy trên control plane (nếu tự host). |

### 2.5 Tầng 4 — Mạng & TLS

| Hạng mục | Mục tiêu |
|----------|----------|
| **Phân vùng** | DB/Redis/queue chỉ **private subnet**; chỉ LB/Ingress public. |
| **TLS** | Termination tại LB/Ingress; cert rotation; (tuỳ chọn) **mTLS** nội bộ service-to-service. |
| **Firewall / SG** | Default deny; chỉ mở cổng cần thiết theo luồng (xem `huong-dan-setup-server-mang-bao-mat.md`). |

### 2.6 Tầng 5 — Biên HTTP (edge)

| Hạng mục | Mục tiêu |
|----------|----------|
| **WAF / rate limit** | Theo nhà cung cấp LB; bảo vệ path công khai. |
| **API Gateway** | Một điểm vào; TLS; có thể bật OIDC; không lộ địa chỉ nội bộ từng microservice ra client. |

### 2.7 Tầng 6 — Ứng dụng & nhận thực / phân quyền

| Hạng mục | Mục tiêu |
|----------|----------|
| **OIDC/JWT** | Xác thực người dùng/dịch vụ; kiểm tra issuer, audience, thời hạn token. |
| **Authorization** | RBAC/ABAC, scope route — [permission-system-design.md](./permission-system-design.md). |
| **Input & header** | Validate payload; Helmet/CORS/body limit theo service. |
| **Tích hợp** | Secret provider qua Integration Manager; không hardcode key bên thứ ba trong repo. |

### 2.8 Tầng 7 — Dữ liệu, log, backup

| Hạng mục | Mục tiêu |
|----------|----------|
| **At rest** | Disk/bucket encryption; TLS tới DB trong VPC. |
| **Least privilege DB** | User/role riêng từng DB/schema; không dùng superuser cho app. |
| **Backup** | Mã hóa backup; quyền restore tách quyền xóa — [quy-trinh-bao-tri-va-backup-database.md](./quy-trinh-bao-tri-va-backup-database.md). |
| **Log / PII** | Không log secret/token đầy đủ; audit có retention & access control — [quy-trinh-bao-tri-audit-va-bao-mat.md](./quy-trinh-bao-tri-audit-va-bao-mat.md). |

### 2.9 Vận hành & con người

- **Break-glass** root/emergency có quy trình, có log.  
- **Access review** định kỳ cho cloud IAM, K8s RBAC, repo admin.  
- UAT bảo mật / pentest theo cam kết — [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md).

---

## 3. Platform: mở, minh bạch license, định hướng dài hạn

**Không nhầm:** “open source” **không** đồng nghĩa mọi thành phần đều “miễn phí vô điều kiện” cho mọi mô hình kinh doanh (ví dụ điều khoản **SSPL** với MongoDB Server — cần tư vấn pháp khi SaaS công khai). Xem [software-inventory-licenses-and-layers.md](./software-inventory-licenses-and-layers.md).

| Tiêu chí | Hướng xử lý trong CEIAP |
|-----------|-------------------------|
| **Giảm khóa nhà cung cấp** | Adapter tại biên (`platform/*`, Integration Manager); đổi broker/DB/storage bằng cấu hình + code adapter, không phân tán SDK sâu trong domain |
| **Mở & kiểm chứng được** | Ưu tiên stack có license rõ, có thể rà SBOM / CVE định kỳ |
| **Dài hạn** | Contract HTTP ổn định (`/api/v1`), bounded context, tài liệu ADR/runbook khi thay đổi lớn; tránh “magic” không tài liệu |

Cấu trúc thư mục `platform/`: [cau-truc-repo-mau-platform.md](./cau-truc-repo-mau-platform.md).

---

## 4. SOLID (áp dụng thực dụng, không học thuộc lý thuyết)

| Nguyên tắc | Gợi ý trong monorepo này |
|------------|---------------------------|
| **S — Single Responsibility** | Một service một bounded context; `platform` package một trách nhiệm (messaging, storage, …). |
| **O — Open/Closed** | Mở rộng provider qua **adapter mới** + đăng ký factory; ít sửa lõi handler khi thêm Viettel/VNPT/…. |
| **L — Liskov** | Mọi adapter cùng interface phải **thay thế được** trong factory (không ném lỗi “not implemented” ở path chuẩn). |
| **I — Interface Segregation** | Export **hẹp** từ `platform/*/src/index.ts`; consumer không phụ thuộc API nội bộ dài. |
| **D — Dependency Inversion** | Service phụ thuộc **abstraction** (interface sync, broker, storage), không import trực tiếp client nhà cung cấp ở tầng domain. |

---

## 5. Pattern kiến trúc & tích hợp (đã gợi ý trong thiết kế)

| Pattern | Vai trò | Ghi chú repo |
|---------|---------|--------------|
| **API Gateway** | Một điểm vào, định tuyến upstream | `api-gateway` |
| **Backend for Frontend (nhẹ)** | Gom route theo domain client | Có thể mở rộng theo route gateway |
| **Adapter** | Dịch interface nội bộ ↔ SDK/API bên thứ ba | `platform/*/adapters`, payment/storage adapters |
| **Factory** | Chọn implementation theo config | Factory broker, KMS, sync transport |
| **Registry / Strangler (tiến hóa)** | Integration Manager: instance active theo loại | `integration-service` |
| **Queue + worker** | Tách latency job khỏi request đồng bộ | Scheduler + BullMQ |
| **Idempotency (sync / thanh toán)** | Retry an toàn | `idempotencyKey`, sync audit |

---

## 6. OOP và TypeScript

- **OOP** dùng có chừng: **class** cho adapter/stateful provider; **module + function** cho route handler mỏng.  
- **Composition** ưu tiên hơn kế thừa sâu — tránh cây class khó test.  
- **Type** thể hiện contract (`interface`, `type`, generics cho factory) — phần “contract” của thiết kế nằm ở type + OpenAPI, không chỉ comment.

Polyglot (.NET sau gateway) vẫn giữ cùng triết lý biên: [cau-truc-repo-mau-dotnet.md](./cau-truc-repo-mau-dotnet.md).

---

## 7. Checklist kiến trúc sư khi review thay đổi lớn

- [ ] Có **rủi ro bảo mật** mới (bề mặt API, secret, log PII)?  
- [ ] Có **điểm nghẽn scale** (session state, DB chung không chủ)?  
- [ ] Có **phụ thuộc license** mới cần ghi inventory?  
- [ ] Adapter có **thay thế được** và test tối thiểu?  
- [ ] Tài liệu **vận hành** (runbook, env) đã cập nhật?

---

## 8. Liên quan nhanh

| Chủ đề | Tài liệu |
|--------|----------|
| Bảng cam kết tiêu chí & gap | [bang-cam-ket-tieu-chi-he-thong.md](./bang-cam-ket-tieu-chi-he-thong.md) |
| Luận cứ bảo mật / scale / audit | [tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md](./tai-sao-he-thong-bao-mat-scale-chuan-va-thong-minh.md) |
| Vận hành, UAT, checklist | [giai-phap-van-hanh-va-giao-nhan.md](./giai-phap-van-hanh-va-giao-nhan.md) |
| Chiến lược CTO / CEIAP | [platform-strategy-cto-handbook.md](./platform-strategy-cto-handbook.md) |
| Thuật ngữ | [bang-thuat-ngu-chuyen-nganh-tong-hop.md](./bang-thuat-ngu-chuyen-nganh-tong-hop.md) · [ceiap-glossary.md](./ceiap-glossary.md) |

---

| Trường | Giá trị |
|--------|---------|
| File | [`docs/content/09-CMIT/tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md`](./tong-quan-tieu-chi-thiet-ke-theo-kien-truc-su.md) |
