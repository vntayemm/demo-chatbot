# BLOG 02 - CHECKLIST GO-LIVE CHATBOT DOANH NGHIEP

## Mo dau

Go-live chatbot that bai khong phai vi model yeu, ma thuong vi thieu checklist van hanh.  
Duoi day la checklist ngan gon de giam rui ro truoc khi len production.

## 1) UAT da pass chua?

- Ty le test case pass >= nguong da thong nhat
- Khong con loi Sev1
- Loi Sev2 co workaround + owner + deadline

## 2) KPI ky thuat da dat chua?

- p95 latency dat nguong muc tieu
- 5xx error rate trong nguong chap nhan
- Monitoring va alert da bat

## 3) Bao mat da du chua?

- HTTPS/TLS da bat
- Auth/RBAC da cau hinh
- Khong log token/PII
- Co audit trail cho hanh dong quan trong

## 4) Rollback plan da ro chua?

- Co dieu kien kich hoat rollback
- Co image/version truoc release
- Co nguoi chiu trach nhiem rollback

## 5) Runbook su co da san sang chua?

- Phan loai P1/P2/P3 ro rang
- Co SLA phan hoi
- Co kenh on-call va escalation

## Ket luan

Go-live an toan khong den tu may man.  
No den tu checklist dung va ky luat van hanh.

**CTA:** Nhan mau go-live checklist mien phi de doi chieu voi he thong chatbot hien tai cua ban.
