# HUONG DAN CAI DAT VA SU DUNG - Enterprise Chatbot | AI

## 1. Muc tieu tai lieu

Tai lieu nay huong dan:
- Cai dat he thong `demo-chatbot` tren may local.
- Chay backend, frontend, MLflow.
- Test nhanh API va su dung giao dien web.

## 2. Yeu cau truoc khi cai dat

- Python `3.10+`
- Trinh duyet web (Chrome/Edge/Safari)
- Terminal (macOS/Linux/Windows)

Khuyen nghi:
- Dung moi truong `venv` rieng cho backend.
- Dung 2 terminal: 1 cho backend, 1 cho frontend.

## 3. Cau truc thu muc chinh

- `backend/`: API FastAPI, semantic search, MLflow logging
- `frontend/`: giao dien test Vue
- `backend/data/`: du lieu corpus cho bot

## 4. Huong dan cai dat va chay local

### Buoc 1 - Cai dat backend

```bash
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Buoc 2 - Chay backend API

```bash
cd backend
source .venv/bin/activate
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

Khi chay thanh cong, API co san tai: `http://127.0.0.1:8000`

### Buoc 3 - Chay MLflow (tuy chon nhung khuyen nghi)

```bash
cd backend
source .venv/bin/activate
mlflow server --host 127.0.0.1 --port 5001
```

MLflow UI: `http://127.0.0.1:5001`

### Buoc 4 - Chay frontend

```bash
cd frontend
python3 -m http.server 5173
```

Mo trinh duyet tai: `http://127.0.0.1:5173`

## 5. Huong dan su dung

### 5.1 Su dung tren giao dien web

1. Mo `http://127.0.0.1:5173`.
2. Chon bot can dung:
   - `crm-chat-bot` (goi `/chat/price`)
   - `crm-guidline-bot` (goi `/chat/guide`)
3. Nhap cau hoi va gui.
4. Xem cau tra loi duoc hien thi tren giao dien.

### 5.2 Test nhanh bang API (curl)

Test `price bot`:

```bash
curl -X POST http://127.0.0.1:8000/chat/price \
  -H "Content-Type: application/json" \
  -d '{"question":"goi nao phu hop cho doanh nghiep 10 nhan su?","top_k":3}'
```

Test `guide bot`:

```bash
curl -X POST http://127.0.0.1:8000/chat/guide \
  -H "Content-Type: application/json" \
  -d '{"question":"huong dan tao co hoi moi","top_k":3}'
```

## 6. Cac loi thuong gap va cach xu ly

- Loi `python3.10: command not found`
  - Cai dat Python 3.10 hoac dieu chinh lenh theo ban Python hien co.

- Loi `ModuleNotFoundError`
  - Kiem tra da kich hoat `.venv` va da chay `pip install -r requirements.txt`.

- Frontend mo duoc nhung khong tra loi
  - Kiem tra backend da chay tai cong `8000`.
  - Kiem tra khong bi xung dot cong.

- Khong vao duoc MLflow
  - Kiem tra lenh `mlflow server` dang chay tai cong `5001`.

## 7. Kiem tra truoc khi ban giao cho nguoi dung

- [ ] Backend tra loi duoc ca `/chat/price` va `/chat/guide`
- [ ] Frontend gui/nhan thong diep binh thuong
- [ ] Co test curl thanh cong
- [ ] (Neu dung) MLflow truy cap duoc

## 8. Tai lieu lien quan

- [README (repo)](https://github.com/vntayemm/demo-chatbot/blob/main/README.md)
- [Introduction report](./introduction_report.md)
- [UAT checklist](../02-governance/uat_checklist.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
