# QUY TRINH QUAN LY DU AN - Enterprise Chatbot | AI

## 1. Muc dich

Quy trinh nay quy dinh cach quan ly du an chatbot theo huong production-ready, nham:
- Dam bao pham vi, tien do, chat luong
- Minh bach trach nhiem giua cac ben
- Giam rui ro trong UAT/go-live/van hanh

## 2. Pham vi ap dung

Ap dung cho toan bo du an trien khai chatbot:
- Tu pre-kickoff den project closure
- Bao gom governance, sign-off, va handover van hanh

## 3. Vong doi quan ly du an (6 phase)

1. Khoi tao du an (Initiation)
2. Lap ke hoach (Planning)
3. Thuc thi (Execution)
4. Giam sat va kiem soat (Monitoring & Control)
5. Nghiem thu va go-live (Acceptance & Go-live)
6. Dong du an (Closure)

## 4. Chi tiet theo phase

### 4.1 Phase 1 - Khoi tao du an

Muc tieu:
- Chot muc tieu du an, stakeholder, va co so hop tac

Dau vao:
- Bao gia/hop dong da phe duyet
- Customer profile va scope ban dau

Dau ra:
- Kickoff ke hoach
- Danh sach stakeholder + RACI so bo

### 4.2 Phase 2 - Lap ke hoach

Muc tieu:
- Chot plan thuc thi co the do luong

Hang muc:
- Chot scope in/out
- Chot KPI/SLO/UAT criteria
- Lap Gantt + milestone + owner
- Chot risk baseline va communication plan

Dau ra:
- Project plan final
- Risk register baseline
- Governance cadence

### 4.3 Phase 3 - Thuc thi

Muc tieu:
- Trien khai ky thuat theo pham vi da chot

Hang muc:
- Build backend/frontend/retrieval
- Chuan hoa corpus
- Hoan thien tai lieu van hanh
- Test ky thuat noi bo

Dau ra:
- Build san sang UAT
- Test report noi bo

### 4.4 Phase 4 - Giam sat va kiem soat

Muc tieu:
- Theo doi lien tuc tien do, chat luong, rui ro

Co che:
- Daily sync (neu can)
- Weekly status report
- Steering review dinh ky
- Escalation khi co blocker critical

Chi so kiem soat:
- Milestone on-time rate
- Defect trend
- Blocker aging
- Risk status

### 4.5 Phase 5 - Nghiem thu va go-live

Muc tieu:
- Dat dieu kien van hanh production an toan

Hang muc:
- UAT execution va UAT sign-off
- Go-live readiness check
- GO/NO-GO decision
- Production deployment + hypercare

Dau ra:
- UAT sign-off bien ban
- Go-live sign-off bien ban
- Hypercare report

### 4.6 Phase 6 - Dong du an

Muc tieu:
- Chot du an va chuyen giao van hanh ben vung

Hang muc:
- Doi soat deliverables theo hop dong
- Dong action items critical
- Ban giao tai lieu va train team van hanh
- Tong hop lesson learned

Dau ra:
- Project closure report
- Project closure sign-off

## 5. Vai tro va trach nhiem quan ly

- Sponsor/Business Owner:
  - Phe duyet muc tieu, scope va GO/NO-GO cap business
- PM:
  - Quan ly tong the scope/tien do/risk/reporting
- PO/BA:
  - Chot yeu cau nghiep vu, acceptance criteria
- Tech Lead:
  - Chiu trach nhiem chat luong ky thuat va architecture
- QA/UAT:
  - Quan ly quality gate va UAT evidence
- DevOps/SRE:
  - Chiu trach nhiem deploy, monitoring, incident readiness

## 6. Rule change control

Moi thay doi scope phai qua 5 buoc:
1. Ghi nhan CR
2. Danh gia tac dong (scope/time/cost/risk)
3. Phe duyet (PO + PM + stakeholder lien quan)
4. Cap nhat plan va baseline
5. Theo doi va dong CR

## 7. Rule escalation

Escalate khi:
- Task critical-path tre > 1 ngay
- Co loi Sev1 truoc go-live
- KPI quality khong dat 2 chu ky lien tiep
- Rui ro muc Cao khong co owner/hanh dong

Escalation path:
PM -> Tech Lead/PO -> Steering/Sponsor

## 8. Bao cao va cadence

- Daily (neu can): progress + blocker
- Weekly: status report + risk + action items
- Monthly (neu project dai): executive summary + KPI trend

## 9. Definition of Done theo cap du an

Du an duoc xem la hoan tat khi:
- Deliverables da ban giao day du theo scope
- UAT/go-live/closure da sign-off
- Tai lieu van hanh da handover
- Khong con blocker critical mo

## 10. Tai lieu lien quan

- [Project plan Gantt](../05-execution/project_plan_gantt.md)
- [Kickoff playbook](../05-execution/kickoff_playbook.md)
- [Report policy](./report_policy.md)
- [Quy trinh tiep nhan yeu cau](./quy_trinh_tiep_nhan_yeu_cau.md)
- [Bien ban UAT sign-off](../03-signoff/uat_sign_off_bien_ban.md)
- [Bien ban Go-live sign-off](../03-signoff/go_live_sign_off_bien_ban.md)
