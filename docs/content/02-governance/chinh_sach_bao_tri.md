# CHINH SACH BAO TRI - Enterprise Chatbot | AI

## 1. Muc dich

Chinh sach nay quy dinh cach thuc bao tri he thong `demo-chatbot` sau khi ban giao, nham:

- Duy tri do on dinh va hieu nang dich vu
- Xu ly loi phat sinh theo muc uu tien
- Lam ro pham vi bao tri va ngoai pham vi

## 2. Pham vi ap dung

Ap dung cho:

- Backend API chatbot (`/chat/price`, `/chat/guide`)
- Frontend test/portal chat (neu nam trong pham vi hop dong)
- Tai lieu van hanh lien quan (UAT, go-live, runbook, SLO/SLA)

Khong mac dinh ap dung cho:

- He thong ben thu ba (CRM/Helpdesk/API ngoai) neu khong co goi support rieng
- Yeu cau tinh nang moi (feature request)

## 3. Thoi han bao tri

- Thoi han bao tri mac dinh: theo hop dong da ky (de xuat 1-3 thang sau ban giao).
- Bat dau tinh tu ngay ky bien ban ban giao/closure sign-off.

## 4. Phan loai yeu cau bao tri

### 4.1 Su co (Incident)

- Loi he thong, suy giam hieu nang, hoac gian doan dich vu.
- Xu ly theo cap do P1/P2/P3.

### 4.2 Loi ky thuat (Defect/Bug)

- Loi phat sinh trong pham vi da ban giao va da nghiem thu.
- Duoc khac phuc trong thoi han bao tri.

### 4.3 Yeu cau thay doi (Change Request)

- Thay doi pham vi, bo sung tinh nang, doi luong nghiep vu.
- Khong thuoc bao tri mien phi; xu ly theo bao gia bo sung.

## 5. Muc do uu tien va SLA phan hoi

| Muc do | Mo ta | Thoi gian phan hoi | Muc tieu khac phuc tam thoi |
|---|---|---|---|
| P1 | Dung he thong/anh huong nghiem trong | <= 15 phut | <= 2 gio |
| P2 | Anh huong mot phan chuc nang chinh | <= 1 gio | <= 8 gio |
| P3 | Loi nho/co workaround | <= 4 gio lam viec | <= 3 ngay lam viec |

Luu y:

- SLA tren ap dung trong khung support da ky.
- Ngoai gio/ngoai ngay lam viec ap dung theo goi support 24/7 neu co.

## 6. Quy trinh tiep nhan va xu ly bao tri

### 6.1 Tiep nhan yeu cau

- Kenh: email/nhom chat/ticket system
- Thong tin toi thieu: mo ta loi, thoi diem, muc anh huong, screenshot/log (neu co)

### 6.2 Phan loai muc do

- PM/Support xac dinh P1/P2/P3 trong 30 phut dau

### 6.3 Xu ly va cap nhat trang thai

- Ky thuat xu ly + cap nhat dinh ky cho khach hang

### 6.4 Dong ticket

- Xac nhan ket qua voi dau moi Ben A truoc khi dong

### 6.5 RCA (neu can)

- Bat buoc voi P1, khuyen nghi voi P2 lap lai

## 7. Noi dung bao tri bao gom

- Khac phuc loi trong pham vi da ban giao
- Dieu chinh cau hinh van hanh co ban
- Ho tro nghiem thu lai sau khi fix loi
- Tu van van hanh co ban de giu on dinh dich vu

## 8. Noi dung bao tri khong bao gom

- Phat trien tinh nang moi
- Tich hop moi voi he thong ben thu ba
- Nang cap ha tang/doi kien truc lon
- Xu ly su co do Ben A thay doi he thong ngoai pham vi ma khong thong bao

## 9. Co che bao cao bao tri

- Bao cao tuan/thang (tuy theo goi):
  - So ticket mo/da dong
  - Thoi gian xu ly trung binh
  - Su co P1/P2/P3
  - Kien nghi phong ngua tai dien

## 10. Dieu kien gia han bao tri

Co the gia han theo goi support:

- Goi co ban (gio hanh chinh)
- Goi nang cao (24/7 + on-call)

Dieu khoan chi phi gia han theo bao gia tai thoi diem ky phu luc.

## 11. Nguyen tac phoi hop 2 ben

### Ben A
- Cung cap thong tin su co day du, kip thoi
- Bo tri dau moi xac nhan nghiem thu fix

### Ben B
- Phan hoi dung SLA
- Cap nhat tien do minh bach
- De xuat bien phap phong ngua tai dien

## 12. Hieu luc chinh sach

- Chinh sach nay co hieu luc khi duoc dan chieu trong hop dong/phu luc hoac bien ban ban giao.
- Truong hop mau thuan voi hop dong da ky, uu tien theo noi dung hop dong.
