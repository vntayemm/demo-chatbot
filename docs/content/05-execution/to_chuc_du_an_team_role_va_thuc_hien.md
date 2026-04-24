# TO CHUC DU AN, TEAM/ROLE VA THUC HIEN - Enterprise Chatbot | AI

## 1. Muc dich

Tai lieu nay xac dinh mo hinh to chuc du an de dam bao:
- Ro vai tro, trach nhiem, quyen han
- Ro co che phoi hop giua business va ky thuat
- Ro cach thuc thuc hien tu kickoff den van hanh

## 2. Co cau to chuc du an

Du an de xuat to chuc theo 3 lop:

1. **Steering layer (dinh huong/quyet dinh)**
   - Sponsor
   - Business Owner
2. **Management layer (dieu phoi/thuc thi)**
   - Project Manager
   - Product Owner/BA
3. **Delivery layer (ky thuat/van hanh)**
   - Tech Lead
   - Backend/AI Engineer
   - Frontend Engineer
   - QA/UAT Coordinator
   - DevOps/SRE
   - Security Representative (neu co)

## 3. Team structure de xuat

### Ben A (Khach hang)

- **Sponsor**: chap thuan muc tieu, ngan sach, moc quan trong
- **Business Owner/PO**: xac nhan pham vi nghiep vu, phe duyet UAT
- **BA/SME**: cung cap quy trinh, corpus, test cases nghiep vu
- **IT/Ops**: ho tro moi truong, quyen truy cap, van hanh sau go-live
- **Security/Compliance**: review controls va policy neu can

### Ben B (Don vi cung cap)

- **Project Manager (PM)**: dieu phoi tong, bao cao tien do, quan tri rui ro
- **Tech Lead**: kien truc, giam sat chat luong ky thuat
- **Backend/AI Engineer**: xay dung API, retrieval, tuning
- **Frontend Engineer**: giao dien va luong tuong tac
- **QA Lead**: test ky thuat, ho tro UAT
- **DevOps/SRE**: deployment, monitoring, incident readiness

## 4. RACI matrix (mau de xac nhan)

| Workstream | Sponsor | PO/BA | PM | Tech Lead | Dev Team | QA | DevOps | Security |
|---|---|---|---|---|---|---|---|---|
| Chot muc tieu/KPI | A | R | C | C | I | I | I | I |
| Chot pham vi/in-scope | C | A/R | R | C | I | I | I | I |
| Thiet ke ky thuat | I | C | C | A/R | R | C | C | C |
| Phat trien va tich hop | I | C | C | A | R | C | C | I |
| Test ky thuat | I | I | C | C | R | A/R | C | I |
| UAT nghiep vu | I | A/R | C | I | C | R | I | I |
| Go-live readiness | I | A | R | C | C | C | A/R | C |
| Van hanh su co | I | C | C | C | C | I | A/R | C |

Chu thich:
- **R**: Responsible
- **A**: Accountable
- **C**: Consulted
- **I**: Informed

## 5. Mo hinh thuc hien du an

De xuat mo hinh theo phase:

1. **Phase 0 - Initiation**
   - Ky hop dong
   - Kickoff
   - Chot RACI + governance cadence
2. **Phase 1 - Discovery and Planning**
   - Thu thap yeu cau
   - Chot KPI/UAT criteria
   - Chot project plan va milestones
3. **Phase 2 - Build and Integration**
   - Phat trien backend/frontend
   - Tich hop domain bot
   - Hoan thien docs van hanh
4. **Phase 3 - Test and UAT**
   - Test ky thuat
   - UAT nghiep vu
   - UAT sign-off
5. **Phase 4 - Go-live and Hypercare**
   - Go-live readiness
   - Production deployment
   - Hypercare va closure

## 6. Co che governance va bao cao

- **Daily sync (neu can):** 15 phut trong giai doan build/UAT cao diem
- **Weekly governance meeting:** 30-60 phut
- **Steering review:** 2-4 tuan/lan

Mau noi dung weekly:
- Tien do theo milestone
- Blocker/risk moi
- KPI chat luong (defect, latency, pass rate)
- Action items va owner

## 7. Quy trinh ra quyet dinh

- Quyet dinh nghiep vu: PO/Business Owner (Ben A)
- Quyet dinh ky thuat: Tech Lead + PM (Ben B), co tham van Ben A
- Quyet dinh go-live: GO/NO-GO board (PO + PM + Tech + Ops + Security neu co)

## 8. Quy trinh quan tri thay doi (Change Control)

1. Ghi nhan yeu cau thay doi (CR)
2. Danh gia tac dong pham vi - timeline - chi phi - rui ro
3. Trinh phe duyet (PO + PM + Sponsor neu can)
4. Cap nhat plan, backlog, va tai lieu lien quan
5. Theo doi thuc thi va dong CR

## 9. Nguong canh bao va escalation

- Task critical-path tre > 1 ngay -> PM escalate Tech Lead + PO
- Blocker nghiep vu > 2 ngay -> escalate Business Owner
- Rui ro P1/P2 -> kich hoat runbook incident va thong bao steering layer

## 10. Definition of Done theo cap du an

Mot giai doan duoc xem la hoan tat khi:
- Deliverables da ban giao dung pham vi
- Tai lieu lien quan da cap nhat
- Action items critical da dong
- Co bien ban sign-off phu hop (UAT/go-live/closure)

## 11. Tai lieu lien quan

- [Project plan (Gantt)](./project_plan_gantt.md)
- [Project plan theo goi A/B/C](./project_plan_gantt_by_package_ABC.md)
- [Kickoff playbook](./kickoff_playbook.md)
- [Sign-off template](../03-signoff/sign_off_template.md)
- [Bien ban UAT sign-off](../03-signoff/uat_sign_off_bien_ban.md)
- [Bien ban go-live sign-off](../03-signoff/go_live_sign_off_bien_ban.md)
