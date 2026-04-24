# UAT CHECKLIST - Enterprise Chatbot | AI

## 1. Thong tin dot UAT

- Ten du an: `demo-chatbot`
- Phien ban release:
- Moi truong kiem thu: `staging` / `production-like`
- Ngay bat dau UAT:
- Ngay ket thuc UAT:
- Dai dien nghiep vu (BA/PO):
- Dai dien ky thuat (Dev/QA):

## 2. Pham vi UAT

- `Price bot`: tu van goi gia, so sanh goi, uu dai.
- `Guide bot`: huong dan cai dat, huong dan su dung, xu ly cau hoi co ban.
- Luong tich hop: frontend -> backend -> retrieval -> response.

## 3. Dieu kien tien quyet

- [ ] Da deploy dung phien ban can UAT.
- [ ] Da cap nhat corpus moi nhat va xac nhan version.
- [ ] Da bat logging, monitoring, va dashboard theo doi.
- [ ] Da cau hinh auth/phan quyen theo yeu cau.
- [ ] Da co danh sach tai khoan test theo vai tro.

## 4. Checklist UAT nghiep vu

### 4.1 Chat luong cau tra loi

- [ ] Cau tra loi dung nghia nghiep vu cho bo cau hoi mau.
- [ ] Cau tra loi dung domain (`price`/`guide`), khong nham ngu canh.
- [ ] Cau tra loi ro rang, de hieu, khong mo ho.
- [ ] Khong tra loi thong tin trai chinh sach noi bo.

### 4.2 Do day du va tinh huu ich

- [ ] Co du thong tin de nguoi dung thuc hien buoc tiep theo.
- [ ] Co neu ro dieu kien/ngoai le neu cau hoi dac thu.
- [ ] Co huong dan fallback khi bot khong du du lieu.

### 4.3 Luong nghiep vu va tich hop

- [ ] Frontend gui/nhan thong diep on dinh.
- [ ] Endpoint `/chat/price` hoat dong dung voi bo cau hoi gia.
- [ ] Endpoint `/chat/guide` hoat dong dung voi bo cau hoi huong dan.
- [ ] Luong handoff sang nhan vien (neu ap dung) hoat dong dung.

### 4.4 Hieu nang cam nhan tu nguoi dung

- [ ] Toc do phan hoi dat muc chap nhan nghiep vu.
- [ ] Khong co hien tuong treo UI hoac mat phan hoi bat thuong.
- [ ] He thong on dinh trong khung gio test cao diem UAT.

### 4.5 Bao mat va truy vet

- [ ] Khong hien thi hoac tra ve du lieu nhay cam.
- [ ] Log truy vet day du cho phien test (request id, thoi gian, ket qua).
- [ ] Khong lo token/secret/PII trong log va man hinh.

## 5. Mau ghi ket qua test case

| ID | Nhom | Mo ta test case | Ket qua mong doi | Ket qua thuc te | Trang thai (Pass/Fail) | Muc do loi (Neu Fail) | Ghi chu |
|---|---|---|---|---|---|---|---|
| UAT-001 | Price | Hoi goi phu hop cho 10 nhan su | Goi duoc de xuat dung ngu canh |  |  |  |  |
| UAT-002 | Guide | Hoi cach tao co hoi moi | Tra loi dung quy trinh co ban |  |  |  |  |
| UAT-003 | Integration | Gui cau hoi tu UI va nhan tra loi | Luong xu ly thong suot |  |  |  |  |

## 6. Tieu chi pass/fail UAT

Dieu kien `PASS` de de xuat go-live:
- [ ] Khong con loi `Sev1`.
- [ ] Loi `Sev2` con lai co workaround ro rang va co ke hoach fix.
- [ ] Ty le test case `Pass` >= 95%.
- [ ] Dat nguong chat luong nghiep vu da thong nhat (de xuat >= 85% cau tra loi dung ngu canh).
- [ ] Dat nguong hieu nang da thong nhat (de xuat p95 <= 2.0s o tai trong thiet ke).

Dieu kien `FAIL`:
- Con loi nghiem trong anh huong nghiep vu cot loi.
- Ty le pass thap hon nguong chap nhan.
- Co loi bao mat/co nguy co ro du lieu chua duoc xu ly.

## 7. Tong hop ket qua va phe duyet

- Tong so test case:
- So test case Pass:
- So test case Fail:
- Ty le Pass:
- So loi Sev1:
- So loi Sev2:
- Ket luan UAT: `PASS` / `FAIL`

Phe duyet:
- Dai dien nghiep vu:
- Dai dien ky thuat:
- Ngay phe duyet:
