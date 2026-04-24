# RISK REGISTER - Enterprise Chatbot | AI

## 1. Muc tieu

Tai lieu nay tong hop cac rui ro trong qua trinh trien khai va van hanh `demo-chatbot`, kem danh gia muc do va phuong an giam thieu.

## 2. Nguyen tac danh gia

- **Xac suat (Probability):** Thap / Trung binh / Cao
- **Tac dong (Impact):** Thap / Trung binh / Cao
- **Muc do rui ro (Risk level):**
  - Cao: uu tien xu ly ngay, co owner va deadline ro rang
  - Trung binh: dua vao ke hoach sprint gan nhat
  - Thap: theo doi dinh ky

## 3. Danh sach rui ro

| ID | Rui ro | Xac suat | Tac dong | Muc do | Dau hieu canh bao som | Phuong an giam thieu | Ke hoach ung pho khi xay ra | Owner |
|---|---|---|---|---|---|---|---|---|
| R1 | Corpus khong dong nhat, thieu cap nhat | Cao | Cao | Cao | Ty le tra loi sai ngu canh tang | Chuan hoa quy trinh cap nhat; review 2 lop (BA + AI); quan ly version | Dong bang release corpus; rollback version truoc; bo sung bo cau hoi test | BA Lead + AI Engineer |
| R2 | Latency API tang cao luc cao diem | Cao | Cao | Cao | p95 tang lien tuc, timeout tang | Bat cache; toi uu retrieval; scale ngang backend | Bat che do giam tai; tang instance; uu tien request quan trong | Backend + DevOps |
| R3 | Lo du lieu nhay cam qua log | Trung binh | Cao | Cao | Log chua token/PII; canh bao bao mat bat thuong | Masking log; cam ghi PII; kiem soat quyen truy cap log | Thu hoi log lien quan; xoay secret; thong bao su co theo quy trinh | Security + DevOps |
| R4 | Dich vu tich hop ngoai thay doi API | Trung binh | Trung binh | Trung binh | Loi tang dot bien o adapter layer | Thiet ke adapter doc lap; version pinning; test contract | Chuyen fallback kenh web; tam tat tich hop anh huong | Integration Engineer |
| R5 | Giam chat luong theo thoi gian (quality drift) | Trung binh | Trung binh | Trung binh | CSAT giam; ticket ho tro tang | Theo doi benchmark thang; feedback loop; cai tien corpus | Uu tien fix nhom cau hoi loi cao; release bo tri thuc cap toc | AI Engineer + PO |
| R6 | Release loi, thieu rollback nhanh | Thap | Cao | Trung binh | Ty le loi sau release tang | Checklist release; canary/blue-green; runbook rollback | Rollback trong 15 phut; khoa release tiep theo den khi on dinh | DevOps Lead |
| R7 | Qua tai tai nguyen ha tang | Trung binh | Trung binh | Trung binh | CPU/RAM cao lien tuc > 80% | Capacity planning; autoscaling; alert som | Scale them node; giam tai tinh nang khong uu tien | DevOps |
| R8 | UAT khong du do phu nghiep vu | Trung binh | Trung binh | Trung binh | Nhieu loi nghiep vu sau go-live | Mo rong bo test UAT theo nhom user; bo sung scenario bien | Kich hoat UAT bo sung; tam gioi han pham vi su dung | BA + QA |

## 4. Ke hoach theo doi

- Review risk register theo chu ky 2 tuan (cung sprint review).
- Cap nhat `Risk level`, owner, va han xu ly cho tung rui ro con mo.
- Neu co rui ro Cao moi: tao action item va gan vao sprint hien tai.

## 5. Tieu chi dong rui ro

Mot rui ro duoc dong khi:

- Da co bien phap phong ngua on dinh trong toi thieu 2 sprint.
- Metric lien quan tro ve nguong chap nhan.
- Da cap nhat tai lieu van hanh va runbook lien quan.
