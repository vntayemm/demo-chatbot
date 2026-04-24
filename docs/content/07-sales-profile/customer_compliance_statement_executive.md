# CUSTOMER COMPLIANCE EXECUTIVE SUMMARY (1-PAGE)

## Muc tieu

`demo-chatbot` duoc thiet ke de trien khai chatbot doanh nghiep theo huong **governance-first**: do duoc chat luong, kiem soat rui ro, va van hanh on dinh o production.

## Vi sao khach hang nen quan tam

- Giam rui ro khi dua chatbot vao quy trinh thuc te.
- Co cam ket van hanh ro rang thay vi chi “demo chay duoc”.
- Co co che xu ly su co nhanh, minh bach va co truy vet.
- Tao nen tang de mo rong quy mo va nang cap compliance sau nay.

## Khung chuan tham chieu

- ITIL/ITSM practices (incident, release readiness)
- SRE practices (SLI/SLO/SLA, error budget)
- ISO 27001/SOC 2 control intent (security, logging, auditability)
- ISO 31000 risk management intent
- QA/UAT governance practices

> Luu y: Day la huong can chinh theo best practices, khong mac dinh la chung nhan chinh thuc.

## Van de duoc giai quyet

- Go-live rui ro cao -> co [go-live checklist](../02-governance/go_live_checklist.md) + rollback criteria
- Kho do chat luong chatbot -> co [SLA/SLO](../02-governance/slo_sla.md) + metric ro rang
- Xu ly su co cham -> co [Runbook incident](../02-governance/runbook_incident.md) (P1/P2/P3)
- Thieu minh bach rui ro -> co [Risk register](../02-governance/risk_register.md) (owner + mitigation)
- Nghiem thu khong dong nhat -> co [UAT checklist](../02-governance/uat_checklist.md) (pass/fail)

## Cam ket van hanh de xuat

- Moi release production deu qua UAT va go-live checklist.
- Co SLO ky thuat va SLA dich vu duoc thong nhat.
- Co quy trinh incident response theo muc do uu tien.
- Co review rui ro dinh ky va cap nhat owner/action.
- Co bo tai lieu onboarding de giam phu thuoc ca nhan.

## KPI production de xuat

- Uptime: >= 99.9% / thang
- API error rate (5xx): <= 1%
- p95 latency: <= 2.0s (tai tai trong thiet ke)
- Ti le cau tra loi dung ngu canh (benchmark noi bo): >= 85%

## Xu huong thi truong (2024-2026)

- Enterprise AI mua theo tieu chi governance va auditability, khong chi theo demo.
- Reliability/observability tro thanh dieu kien bat buoc truoc khi scale.
- Security-by-design va incident readiness la diem cong lon trong pre-sales.

## Thong diep chot voi khach hang

Giai phap nay khong chi cung cap chatbot, ma cung cap **khung van hanh va kiem soat** de chatbot co the di duong dai trong moi truong doanh nghiep.
