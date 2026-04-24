# GO-LIVE CHECKLIST - Enterprise Chatbot | AI

## 1. Thong tin phien ban

- Du an: `demo-chatbot`
- Phien ban release:
- Moi truong: `production`
- Ngay go-live du kien:
- Release owner:
- Nhom truc go-live:

## 2. Dieu kien tien quyet bat buoc

- [ ] Da `PASS` UAT theo [UAT checklist](./uat_checklist.md)
- [ ] Risk muc `Cao` trong [risk register](./risk_register.md) da co bien phap xu ly
- [ ] SLA/SLO trong [SLA/SLO](./slo_sla.md) da duoc thong nhat voi stakeholder
- [ ] Da dong bang pham vi release (feature freeze)
- [ ] Da co rollback plan va nguoi chiu trach nhiem rollback

## 3. Checklist ky thuat truoc go-live

### 3.1 Backend va API

- [ ] Da deploy dung image/tag release
- [ ] Da kiem tra bien moi truong production day du
- [ ] Da kiem tra ket noi den cac dich vu phu tro (MLflow, logging, monitoring)
- [ ] Da test smoke endpoint `/chat/price`
- [ ] Da test smoke endpoint `/chat/guide`
- [ ] Da cau hinh timeout va rate limit dung chinh sach

### 3.2 Frontend

- [ ] Da deploy dung ban build frontend
- [ ] Da kiem tra route frontend -> backend qua reverse proxy
- [ ] Da test luong hoi dap tren trinh duyet thuc te
- [ ] Da xac nhan khong co loi giao dien nghiem trong

### 3.3 Du lieu va corpus

- [ ] Corpus da duoc review va phe duyet boi BA/PO
- [ ] Da gan version cho corpus release
- [ ] Da backup corpus truoc release
- [ ] Da co ke hoach rollback corpus neu chat luong giam

## 4. Checklist bao mat

- [ ] Bat TLS cho toan bo kenh giao tiep production
- [ ] Bat auth/phan quyen cho endpoint production
- [ ] CORS whitelist da cau hinh dung domain
- [ ] Secret quan ly qua env/secret manager, khong hardcode
- [ ] Log da masking token/PII
- [ ] Audit log da bat cho hanh dong quan trong

## 5. Checklist van hanh va giam sat

- [ ] Dashboard theo doi latency, error rate, uptime da san sang
- [ ] Alert p95/p99 latency da cau hinh
- [ ] Alert 5xx error rate da cau hinh
- [ ] Alert resource (CPU/RAM/disk) da cau hinh
- [ ] Nhom on-call da xac nhan lich truc
- [ ] Runbook xu ly su co P1/P2/P3 da duoc cap nhat

## 6. Ke hoach rollback

- [ ] Da luu image/tag truoc release
- [ ] Da luu version frontend truoc release
- [ ] Da luu version corpus truoc release
- [ ] Da xac dinh dieu kien kich hoat rollback
- [ ] Muc tieu rollback: khoi phuc dich vu trong <= 15 phut

Dieu kien kich hoat rollback de xuat:
- [ ] API 5xx vuot nguong trong 15 phut lien tuc
- [ ] p95 latency vuot nguong nghiem trong va khong giam sau khi scale
- [ ] Loi nghiep vu nghiem trong anh huong chuc nang cot loi
- [ ] Co su co bao mat muc do cao

## 7. Kiem tra ngay sau go-live (0-2 gio)

- [ ] Test nhanh 2 endpoint chatbot tren production
- [ ] Kiem tra dashboard khong co canh bao nghiem trong
- [ ] Kiem tra log khong xuat hien loi lap lai bat thuong
- [ ] Kiem tra feedback nguoi dung dau tien
- [ ] Xac nhan trang thai "on dinh tam thoi"

## 8. Kiem tra sau go-live (24-48 gio)

- [ ] Tong hop metric SLA/SLO 24h dau
- [ ] Danh gia chat luong cau tra loi theo nhom cau hoi mau
- [ ] Tong hop su co neu co va hanh dong khac phuc
- [ ] Chot bien ban release va bai hoc rut ra

## 9. Phe duyet go-live

- Dai dien Product/BA:
- Dai dien Ky thuat:
- Dai dien Van hanh/DevOps:
- Thoi gian phe duyet:
- Ket luan: `GO` / `NO-GO`
