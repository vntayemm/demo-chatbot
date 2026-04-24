# SLA SLO - DEMO-CHATBOT (PRODUCTION)

## 1. Pham vi

Tai lieu nay xac dinh cam ket dich vu (SLA) va muc tieu van hanh ky thuat (SLO) cho he thong `demo-chatbot` trong moi truong production.

## 2. Dinh nghia nhanh

- **SLA (Service Level Agreement):** Cam ket dich vu voi ben su dung.
- **SLO (Service Level Objective):** Muc tieu ky thuat noi bo de dat SLA.
- **SLI (Service Level Indicator):** Chi so do luong de danh gia SLO.

## 3. SLA de xuat

### 3.1 Do san sang dich vu

- Uptime theo thang: **>= 99.9%**
- Thoi gian bao tri co ke hoach duoc thong bao truoc toi thieu 24 gio va khong tinh vao downtime SLA.

### 3.2 Muc do su co va thoi gian phan hoi

| Muc su co | Mo ta | Thoi gian phan hoi | Muc tieu khoi phuc |
|---|---|---|---|
| P1 | Dung toan bo dich vu hoac anh huong nghiem trong | <= 15 phut | Khoi phuc tam thoi <= 2 gio |
| P2 | Anh huong mot phan chuc nang chinh | <= 1 gio | Khoi phuc <= 8 gio |
| P3 | Loi nho, co workaround | <= 4 gio lam viec | Xu ly trong 3 ngay lam viec |

## 4. SLO ky thuat de xuat

### 4.1 Hieu nang

| SLI | Muc tieu SLO |
|---|---|
| p95 response time API chat | <= 2.0s |
| p99 response time API chat | <= 3.0s |
| Throughput on dinh | Dat theo tai trong thiet ke da phe duyet |

### 4.2 Do tin cay

| SLI | Muc tieu SLO |
|---|---|
| API 5xx error rate | <= 1.0% / thang |
| Timeout rate | <= 0.5% / thang |
| Ty le request thanh cong | >= 99.0% / thang |

### 4.3 Chat luong tra loi

| SLI | Muc tieu SLO |
|---|---|
| Ti le cau tra loi dung ngu canh (benchmark noi bo) | >= 85% |
| Ty le handoff khong mong muon | <= 10% |
| CSAT trung binh (neu co thu thap) | >= 4.0 / 5 |

## 5. Error budget va nguong canh bao

- Error budget theo thang duoc suy ra tu SLA 99.9%.
- Dat canh bao som theo 3 muc:
  - Muc 1: 50% budget da su dung.
  - Muc 2: 80% budget da su dung (khoi dong che do on dinh).
  - Muc 3: 100% budget da su dung (tam dung rollout tinh nang moi).

## 6. Do luong, bao cao va xu ly vi pham

- Dashboard theo doi theo ngay/tuan/thang cho latency, error rate, uptime, quality.
- Bao cao tong hop SLO hang thang gui cho PO, Tech Lead, DevOps.
- Neu vi pham SLO 2 chu ky lien tiep:
  - Tam dung phat hanh tinh nang moi.
  - Uu tien backlog on dinh he thong.
  - Thuc hien RCA (root cause analysis) va ke hoach hanh dong.

## 7. Dieu kien xem xet lai SLA/SLO

SLA/SLO can duoc review lai khi:
- Tang gap doi so user dong thoi trong 1 quy.
- Them domain bot moi hoac thay doi retrieval pipeline lon.
- Co thay doi kien truc ha tang (cloud, region, gateway, auth model).
