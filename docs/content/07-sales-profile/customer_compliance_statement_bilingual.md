# CUSTOMER-FACING COMPLIANCE STATEMENT (VI-EN)

## 1. Muc dich tai lieu / Document Purpose

**VI:** Tai lieu nay mo ta khung quan tri van hanh cho `demo-chatbot` theo thong le quoc te, nham dam bao he thong co the trien khai doanh nghiep voi muc do kiem soat cao.  
**EN:** This document describes the operational governance framework for `demo-chatbot`, aligned with international best practices to support enterprise-grade deployment and control.

## 2. Khung chuan tham chieu / Reference Frameworks

**VI:** Giai phap duoc xay dung theo huong phu hop voi cac khung chuan pho bien:
- ITIL/ITSM practices (Incident, Change, Release readiness)
- SRE practices (SLI/SLO/SLA, error budget, reliability operations)
- ISO 27001/SOC 2 control intent (access control, logging, auditability, incident response)
- ISO 31000 risk management intent (risk identification, assessment, mitigation)
- QA/UAT governance practices (pass/fail criteria with evidence)

**EN:** The solution is designed to align with commonly adopted frameworks:
- ITIL/ITSM practices (Incident, Change, Release readiness)
- SRE practices (SLI/SLO/SLA, error budget, reliability operations)
- ISO 27001/SOC 2 control intent (access control, logging, auditability, incident response)
- ISO 31000 risk management intent (risk identification, assessment, mitigation)
- QA/UAT governance practices (pass/fail criteria with evidence)

**VI:** Luu y day la muc do can chinh theo best practices, khong mac dinh la chung nhan ISO/SOC chinh thuc.  
**EN:** Note: this reflects best-practice alignment and does not by default constitute official ISO/SOC certification.

## 3. Van de duoc giai quyet / Problems Addressed

**VI:**
- Rui ro go-live cao -> giai quyet bang `go_live_checklist.md` va rollback criteria ro rang
- Kho do luong chat luong chatbot -> giai quyet bang `slo_sla.md`
- Xu ly su co cham, phan tan -> giai quyet bang `runbook_incident.md`
- Thieu minh bach rui ro van hanh -> giai quyet bang `risk_register.md`
- Nghiem thu khong dong nhat -> giai quyet bang `uat_checklist.md`

**EN:**
- High go-live risk -> mitigated through `go_live_checklist.md` and explicit rollback criteria
- Difficult chatbot quality measurement -> addressed via `slo_sla.md`
- Slow or fragmented incident response -> standardized in `runbook_incident.md`
- Limited risk transparency -> formalized in `risk_register.md`
- Inconsistent acceptance testing -> standardized in `uat_checklist.md`

## 4. Pham vi ap dung / Scope

**VI:** Pham vi hien tai bao phu:
- Release governance truoc production
- Production operations theo SLA/SLO
- Incident response va post-incident improvement
- Risk management va business UAT governance

**EN:** Current scope covers:
- Pre-production release governance
- Production operations based on SLA/SLO
- Incident response and post-incident improvement
- Risk management and business UAT governance

**VI:** Ngoai pham vi mac dinh:
- Chung nhan compliance chinh thuc boi ben thu ba
- Danh gia phap ly nganh dac thu (tai chinh/y te/du lieu nhay cam cao)

**EN:** Out of default scope:
- Formal third-party compliance certification
- Industry-specific legal assessments (e.g., finance, healthcare, highly sensitive data)

## 5. Cam ket van hanh de xuat / Proposed Operational Commitments

**VI:**
- Co checklist UAT va go-live truoc moi release production
- Co SLO (technical objective) va SLA (service commitment) ro rang
- Co incident response process theo muc do uu tien
- Co risk review dinh ky va owner ro rang
- Co onboarding operations docs de dam bao continuity

**EN:**
- UAT and go-live checklists are enforced before each production release
- Clear SLOs (technical objectives) and SLAs (service commitments) are defined
- Incident response process is prioritized by severity levels
- Periodic risk reviews with explicit ownership are maintained
- Operations onboarding documentation ensures team continuity

## 6. Gia tri cho khach hang / Customer Value

**VI:**
- Giam rui ro trien khai chatbot vao quy trinh thuc te
- Tang do tin cay va kha nang mo rong
- Tang tinh minh bach trong van hanh va xu ly su co
- Rut ngan thoi gian khac phuc (lower MTTR)
- Tao nen tang de tien toi compliance maturity cao hon

**EN:**
- Reduces deployment risk for production chatbot workflows
- Improves reliability and scalability
- Increases transparency in operations and incident handling
- Reduces recovery time (lower MTTR)
- Establishes a foundation for higher compliance maturity

## 7. Xu huong thi truong / Market Trend

**VI:** Cach tiep can nay phu hop xu huong AI enterprise 2024-2026:
- Governance-first for GenAI/LLM applications
- Reliability and observability as preconditions for scaling
- Security-by-design and auditability in enterprise procurement
- Standardized runbooks to reduce person-dependent operations

**EN:** This approach aligns with 2024-2026 enterprise AI trends:
- Governance-first for GenAI/LLM applications
- Reliability and observability as scaling prerequisites
- Security-by-design and auditability in enterprise procurement
- Standardized runbooks to reduce person-dependent operations

## 8. Lo trinh nang cap compliance / Compliance Maturity Roadmap

**VI:**
1. Gap analysis theo ISO 27001/SOC 2 controls
2. Bo sung evidence collection cho controls
3. Chuan hoa security/change management policies
4. Internal audit va readiness assessment
5. Danh gia boi don vi doc lap (neu can certification)

**EN:**
1. Perform gap analysis against ISO 27001/SOC 2 controls
2. Establish control evidence collection
3. Standardize security and change management policies
4. Conduct internal audit and readiness assessment
5. Engage independent assessors (if certification is required)
