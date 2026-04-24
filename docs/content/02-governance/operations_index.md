# OPERATIONS DOCUMENT INDEX - Enterprise Chatbot | AI

## Quick links

- [Introduction report](../01-overview/introduction_report.md)
- [UAT checklist](./uat_checklist.md)
- [Go-live checklist](./go_live_checklist.md)
- [Risk register](./risk_register.md)
- [SLA SLO](./slo_sla.md)
- [Incident runbook](./runbook_incident.md)
- [Setup and usage guide](../01-overview/huong_dan_cai_dat_va_su_dung.md)
- [Setup and usage guide VI-EN](../01-overview/huong_dan_cai_dat_va_su_dung_bilingual.md)
- [Sign-off template](../03-signoff/sign_off_template.md)
- [UAT sign-off minutes](../03-signoff/uat_sign_off_bien_ban.md)
- [Go-live sign-off minutes](../03-signoff/go_live_sign_off_bien_ban.md)
- [Maintenance policy](./chinh_sach_bao_tri.md)
- [System design document (SDD)](../04-architecture/tai_lieu_thiet_ke_he_thong.md)
- [System design document (SDD) VI-EN](../04-architecture/tai_lieu_thiet_ke_he_thong_bilingual.md)
- [Architecture and diagrams](../04-architecture/tai_lieu_kien_truc_va_diagrams.md)
- [Architecture and diagrams VI-EN](../04-architecture/tai_lieu_kien_truc_va_diagrams_bilingual.md)
- [Project organization and roles](../05-execution/to_chuc_du_an_team_role_va_thuc_hien.md)

## Suggested reading order (5 phut)

1. [Introduction report](../01-overview/introduction_report.md) (2 phut): nam tong quan du an, kien truc, KPI.
2. [SLA/SLO](./slo_sla.md) (1 phut): nam nguong van hanh production.
3. [UAT checklist](./uat_checklist.md) + [Go-live checklist](./go_live_checklist.md) (1 phut): nam quy trinh truoc release.
4. [Risk register](./risk_register.md) + [Runbook incident](./runbook_incident.md) (1 phut): nam cach phong ngua va xu ly su co.

## 30-minute deep onboarding order

1. [Introduction report](../01-overview/introduction_report.md) (8 phut)
    - Muc tieu du an, kien truc, cong nghe, gioi han hien tai, roadmap.
2. [SLA/SLO](./slo_sla.md) (5 phut)
    - Nguong SLA/SLO, error budget, cach do luong va xu ly vi pham.
3. [Risk register](./risk_register.md) (5 phut)
    - Top rui ro muc Cao/Trung binh, owner, dau hieu canh bao som.
4. [UAT checklist](./uat_checklist.md) (4 phut)
    - Tieu chi PASS/FAIL, pham vi test nghiep vu, mau ghi nhan ket qua.
5. [Go-live checklist](./go_live_checklist.md) (4 phut)
    - Dieu kien GO/NO-GO, rollback trigger, kiem tra 0-2h va 24-48h.
6. [Runbook incident](./runbook_incident.md) (4 phut)
    - Quy trinh ung pho P1/P2/P3, vai tro, timeline, RCA sau su co.

Ket qua mong doi sau onboarding 30 phut:
- Hieu duoc cach release an toan tu UAT -> GO-LIVE -> VAN HANH.
- Biet tai lieu nao can mo ngay khi gap su co hoac vi pham SLO.
- Co kha nang tham gia truc van hanh voi checklist va runbook co san.

## First day checklist for new member

### A. Truy cap va moi truong

- [ ] Da co quyen truy cap repository va moi truong staging.
- [ ] Da cai dat local environment chay duoc backend/frontend.
- [ ] Da truy cap duoc dashboard monitoring va log viewer.
- [ ] Da vao duoc kenh thong bao su co cua team.

### B. Hieu tai lieu cot loi

- [ ] Da doc `Suggested reading order (5 phut)`.
- [ ] Da doc `30-minute deep onboarding order`.
- [ ] Da hieu su khac nhau giua UAT checklist, go-live checklist, runbook incident.

### C. Bai tap thuc hanh ngay dau

- [ ] Chay smoke test local cho `/chat/price` va `/chat/guide`.
- [ ] Gia lap mot loi nhe (P3) va thuc hanh cap nhat theo mau incident update.
- [ ] Tim trong [risk register](./risk_register.md) 1 rui ro Cao va trinh bay cach giam thieu.
- [ ] Mo [SLA/SLO](./slo_sla.md) va xac dinh 3 chi so can theo doi hang ngay.

### D. Xac nhan san sang tham gia van hanh

- [ ] Nhan su moi co the neu quy trinh GO/NO-GO truoc release.
- [ ] Nhan su moi biet dieu kien kich hoat rollback.
- [ ] Nhan su moi biet tai lieu can mo khi co su co P1/P2.
- [ ] Tech Lead/DevOps xac nhan "ready for shadow on-call".

## 1. Muc dich

Tai lieu nay la muc luc trung tam cho bo tai lieu van hanh `demo-chatbot`, giup team truy cap nhanh dung tai lieu theo tung giai doan: truoc UAT, truoc go-live, khi van hanh, va khi co su co.

## 2. Danh sach tai lieu

- [Introduction report](../01-overview/introduction_report.md)
  - Bao cao tom tat du an, kien truc, roadmap, KPI, risk, test plan, SLA/SLO.
- [UAT checklist](./uat_checklist.md)
  - Checklist nghiem thu UAT va tieu chi pass/fail truoc go-live.
- [Go-live checklist](./go_live_checklist.md)
  - Checklist trien khai production, rollback va kiem tra sau release.
- [Risk register](./risk_register.md)
  - Danh sach rui ro, muc do, dau hieu canh bao, bien phap giam thieu, owner.
- [SLA/SLO](./slo_sla.md)
  - Cam ket dich vu (SLA), muc tieu ky thuat (SLO), error budget, co che bao cao.
- [Runbook incident](./runbook_incident.md)
  - Quy trinh xu ly su co P1/P2/P3, timeline ung pho, checklist, mau RCA.
- [Huong dan cai dat va su dung](../01-overview/huong_dan_cai_dat_va_su_dung.md)
  - Huong dan cai dat local va su dung he thong.
- [Huong dan cai dat va su dung (song ngu)](../01-overview/huong_dan_cai_dat_va_su_dung_bilingual.md)
  - Huong dan cai dat/su dung song ngu VI-EN.
- [Sign-off template](../03-signoff/sign_off_template.md)
  - Mau sign-off tong quat cho UAT, Go-live, va Project Closure.
- [Bien ban UAT sign-off](../03-signoff/uat_sign_off_bien_ban.md)
  - Bien ban sign-off cho giai doan UAT.
- [Bien ban Go-live sign-off](../03-signoff/go_live_sign_off_bien_ban.md)
  - Bien ban sign-off cho giai doan go-live.
- [Chinh sach bao tri](./chinh_sach_bao_tri.md)
  - Chinh sach bao tri: pham vi, SLA phan hoi, quy trinh xu ly va bao cao.
- [Tai lieu thiet ke he thong (SDD)](../04-architecture/tai_lieu_thiet_ke_he_thong.md)
  - Tai lieu thiet ke he thong (SDD) ban tieng Viet.
- [Tai lieu thiet ke he thong (SDD) song ngu](../04-architecture/tai_lieu_thiet_ke_he_thong_bilingual.md)
  - Tai lieu thiet ke he thong (SDD) song ngu VI-EN.
- [Tai lieu kien truc va diagrams](../04-architecture/tai_lieu_kien_truc_va_diagrams.md)
  - Tai lieu kien truc tong hop va cac diagram (Landscape, HLA, Sequence, Workflow, ERD, HA, Scale, Network, Security, User Role).
- [Tai lieu kien truc va diagrams (song ngu)](../04-architecture/tai_lieu_kien_truc_va_diagrams_bilingual.md)
  - Ban song ngu VI-EN cho bo tai lieu kien truc va diagram.
- [To chuc du an, team/role va thuc hien](../05-execution/to_chuc_du_an_team_role_va_thuc_hien.md)
  - Tai lieu to chuc du an, team/role, RACI, governance va mo hinh thuc hien.

## 3. Thu tu su dung de xuat

### Giai doan 1 - Chuan bi truoc UAT

1. Doc [introduction report](../01-overview/introduction_report.md) de thong nhat pham vi va muc tieu.
2. Ra soat [risk register](./risk_register.md) de chot rui ro uu tien.
3. Cau hinh nguong van hanh theo [SLA/SLO](./slo_sla.md).

### Giai doan 2 - Thuc hien UAT

1. Thuc hien theo [UAT checklist](./uat_checklist.md).
2. Ghi nhan loi va cap nhat rui ro lien quan vao [risk register](./risk_register.md).
3. Chot ket qua PASS/FAIL va dieu kien khac phuc.

### Giai doan 3 - Truoc go-live

1. Thuc hien [go-live checklist](./go_live_checklist.md).
2. Xac nhan ket qua UAT PASS.
3. Xac nhan rollback plan va on-call da san sang.

### Giai doan 4 - Van hanh production

1. Theo doi SLA/SLO theo [SLA/SLO](./slo_sla.md).
2. Review rui ro dinh ky theo [risk register](./risk_register.md).
3. Neu co su co: kich hoat ngay [runbook incident](./runbook_incident.md).

## 4. RACI de xuat (vai tro chinh)

- Product Owner / BA:
  - So huu pham vi nghiep vu, phe duyet UAT, theo doi chat luong cau tra loi.
- Tech Lead / Backend / AI Engineer:
  - So huu chat luong ky thuat, retrieval, benchmark, khac phuc loi ung dung.
- DevOps / SRE:
  - So huu ha tang production, SLA/SLO dashboard, alerting, rollback.
- Security:
  - So huu bao mat endpoint, secret, audit va xu ly su co bao mat.

## 5. Chu ky review tai lieu

- [UAT checklist](./uat_checklist.md): review moi dot release.
- [Go-live checklist](./go_live_checklist.md): review truoc moi lan go-live.
- [Risk register](./risk_register.md): review moi 2 tuan (theo sprint).
- [SLA/SLO](./slo_sla.md): review hang thang hoac khi thay doi tai trong/kien truc.
- [Runbook incident](./runbook_incident.md): review sau moi su co P1/P2.

## 6. Tieu chuan cap nhat

- Moi cap nhat can ghi ro:
  - Ngay cap nhat
  - Nguoi cap nhat
  - Noi dung thay doi chinh
- Khuyen nghi dung cung mot format dat ten va cau truc muc de de tra cuu.
