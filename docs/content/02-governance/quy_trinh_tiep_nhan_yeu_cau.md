# QUY TRINH TIEP NHAN YEU CAU - Enterprise Chatbot | AI

## 1. Muc dich

Quy trinh nay giup team tiep nhan va xu ly yeu cau mot cach nhat quan, minh bach, va co the do luong.

Ap dung cho:

- Yeu cau nghiep vu moi
- Yeu cau thay doi (CR)
- Loi/su co van hanh
- Yeu cau ho tro ky thuat

## 2. Kenh tiep nhan

- Email chinh thuc: [support@...]
- Form yeu cau: [link form]
- Nhom chat van hanh: [ten kenh]
- Ticket system (neu co): [Jira/Linear/...]

Luu y:

- Moi yeu cau deu phai duoc tao ticket/ma yeu cau de truy vet.

## 3. Thong tin bat buoc khi gui yeu cau

- Ten don vi/nguoi gui
- Loai yeu cau (new feature / bug / incident / support)
- Mo ta ngan gon van de
- Muc do anh huong (cao/trung binh/thap)
- Thoi diem phat sinh
- Minh chung (screenshot/log/video, neu co)
- Ky vong deadline (neu co)

## 4. Phan loai yeu cau

### 4.1 Nhom nghiep vu
- New feature
- Change request (CR)

### 4.2 Nhom van hanh
- Incident (P1/P2/P3)
- Support request

### 4.3 Nhom bao mat
- Security concern
- Compliance/audit request

## 5. SLA phan hoi tiep nhan

| Loai yeu cau | Phan hoi tiep nhan ban dau |
|---|---|
| Incident P1 | <= 15 phut |
| Incident P2 | <= 1 gio |
| Incident P3 | <= 4 gio lam viec |
| CR/Feature | <= 1 ngay lam viec |
| Support thong thuong | <= 1 ngay lam viec |

Phan hoi tiep nhan bao gom:

- Xac nhan da nhan yeu cau
- Ma ticket
- Nguoi phu trach ban dau
- Buoc tiep theo du kien

## 6. Quy trinh xu ly 7 buoc

1. **Tiep nhan**
    - Tao ticket, ghi nhan du thong tin dau vao.
2. **Phan loai**
    - Xac dinh loai yeu cau + muc do uu tien.
3. **Danh gia tac dong**
    - Danh gia anh huong den nghiep vu, ky thuat, bao mat.
4. **Xep hang uu tien**
    - Chot P1/P2/P3 (incident) hoac high/medium/low (CR/feature).
5. **Phe duyet xu ly**
    - PM/PO/Tech Lead (tuy loai yeu cau) xac nhan huong xu ly.
6. **Thuc thi**
    - Gan owner, ETA, cap nhat trang thai dinh ky.
7. **Dong yeu cau**
    - Xac nhan ket qua voi nguoi gui, dong ticket va luu truy vet.

## 7. Trang thai ticket chuan

- `New`
- `Acknowledged`
- `In Analysis`
- `In Progress`
- `Blocked`
- `Ready for Review/UAT`
- `Resolved`
- `Closed`

## 8. Rule uu tien

- Incident P1/P2 luon duoc uu tien cao hon CR/feature.
- Ticket lien quan bao mat duoc gan flag security va xu ly som.
- Yeu cau khong du thong tin se duoc tra lai trang thai `Need Info`.

## 9. Mau cap nhat trang thai cho khach hang

Mau ngan:

- Ticket: [ID]
- Trang thai: [In Progress/Blocked/...]
- Viec da lam: [...]
- Viec tiep theo: [...]
- ETA cap nhat tiep: [...]

## 10. Escalation path

- Level 1: PM/Support owner
- Level 2: Tech Lead + PO
- Level 3: Steering/Sponsor (neu anh huong milestone/go-live)

Kich hoat escalation khi:

- Ticket critical bi tre > 1 ngay
- Co rui ro anh huong go-live
- Incident P1 chua on dinh sau nguong SLA tam thoi

## 11. KPI theo doi quy trinh tiep nhan

- First response time
- Mean time to acknowledge
- Mean time to resolve (MTTR/MTTR-like)
- % ticket dung han SLA
- % ticket bi reopen
- % ticket thieu thong tin dau vao

## 12. Tai lieu lien quan

- [Report policy](./report_policy.md)
- [Runbook incident](./runbook_incident.md)
- [Go-live checklist](./go_live_checklist.md)
- [Chinh sach bao tri](./chinh_sach_bao_tri.md)
