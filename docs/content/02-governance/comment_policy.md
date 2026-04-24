# COMMENT POLICY (CHINH SACH COMMENT) - Enterprise Chatbot | AI

## 1. Muc dich

Chinh sach nay quy dinh cach viet comment trong code va tai lieu ky thuat, nham:
- Tang kha nang doc hieu va bao tri
- Giam sai khac ve style comment giua cac thanh vien
- Dam bao comment phuc vu gia tri ky thuat, khong gay nhieu

## 2. Nguyen tac chung

- Comment de giai thich **tai sao** va **y do thiet ke**, khong lap lai dieu code da ro.
- Uu tien code ro rang; chi them comment khi logic khong tu mo ta duoc.
- Comment phai cap nhat dong bo khi code thay doi.
- Khong de comment sai su that hoac da loi thoi.

## 3. Khi nao bat buoc comment

- Logic nghiep vu phuc tap, co nhieu nhanh xu ly.
- Rule hoac rang buoc khong hien nhien tu ten bien/ham.
- Workaround tam thoi co rang buoc ky thuat.
- Xu ly su co bao mat, performance, hoac fallback quan trong.
- Quy trinh lien quan den go-live, sign-off, hoac incident handling.

## 4. Khi nao khong nen comment

- Comment mo ta lai dong code don gian.
- Comment chung chung, khong tao gia tri.
- Comment de placeholder khong ro rang ("TODO later", "fix this").
- Comment qua dai, thay cho viec tach ham/module.

## 5. Dinh dang comment de xuat

### 5.1 Inline comment

Dung cho giai thich ngan, sat dong logic:

`// Use cached value to reduce repeated retrieval cost.`

### 5.2 Block comment

Dung cho doan logic dai hoac business rule:

`/*
Business rule:
- If UAT is not signed off, GO decision must be blocked.
Reason:
- Prevent production deployment without acceptance criteria.
*/`

### 5.3 Tag co cau truc

Su dung co kiem soat:
- `TODO:` viec can lam tiep (co owner/date neu quan trong)
- `FIXME:` van de da biet can sua
- `NOTE:` thong tin bo sung can luu y
- `WARNING:` canh bao khi sua logic

## 6. Ngon ngu va van phong

- Uu tien tieng Anh trong code comment de de mo rong team.
- Neu can dung tieng Viet cho business context, comment phai ngan gon, ro nghia.
- Khong dung emoji hoac ky tu dac biet khong can thiet trong comment.
- Van phong trung lap, ky thuat, tranh ngu dien cam.

## 7. Comment lien quan bao mat va du lieu

- Khong de lo thong tin nhay cam trong comment (token, password, endpoint private).
- Khong ghi du lieu ca nhan that trong vi du comment.
- Neu comment ve bao mat, mo ta quy tac, khong mo ta chi tiet de bi khai thac.

## 8. Quy tac review comment

Trong code review, can kiem tra:
- Comment co con dung voi code hien tai khong?
- Comment co giai thich "why" thay vi "what" khong?
- Co duoc dat dung vi tri va do dai hop ly khong?
- Co vi pham bao mat/noi dung nhay cam khong?

## 9. Xu ly comment loi thoi

- Comment khong con dung phai duoc sua hoac xoa trong cung PR.
- Neu chua xu ly ngay duoc, thay bang TODO co owner va deadline ro rang.

## 10. Vi du comment tot va chua tot

### Chua tot

`// Set value to variable`

Ly do: mo ta lai dieu hiển nhien.

### Tot

`// Keep top_k configurable to tune retrieval precision per domain.`

Ly do: giai thich y do thiet ke va muc dich van hanh.

---

**Phien ban:** v1.0  
**Ngay cap nhat:** [dd/mm/yyyy]
