# HUONG DAN CAI DAT VA SU DUNG (VI-EN) - Enterprise Chatbot | AI

## 1. Muc tieu tai lieu / Document Objective

**VI:** Tai lieu nay huong dan cai dat, chay he thong local, va su dung chatbot.  
**EN:** This document guides local setup, system startup, and chatbot usage.

## 2. Yeu cau truoc khi cai dat / Prerequisites

- Python `3.10+`
- Web browser (Chrome/Edge/Safari)
- Terminal access

**VI:** Khuyen nghi dung `venv` rieng cho backend.  
**EN:** A dedicated Python `venv` for backend is recommended.

## 3. Cau truc thu muc chinh / Main Directory Structure

- `backend/`: FastAPI backend, semantic search, MLflow logging
- `frontend/`: Vue test UI
- `backend/data/`: bot corpus data

## 4. Cai dat va chay local / Local Setup and Run

### 4.1 Cai dat backend / Backend setup

```bash
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 4.2 Chay backend API / Run backend API

```bash
cd backend
source .venv/bin/activate
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

- API URL: `http://127.0.0.1:8000`

### 4.3 Chay MLflow (tuy chon) / Run MLflow (optional)

```bash
cd backend
source .venv/bin/activate
mlflow server --host 127.0.0.1 --port 5001
```

- MLflow URL: `http://127.0.0.1:5001`

### 4.4 Chay frontend / Run frontend

```bash
cd frontend
python3 -m http.server 5173
```

- Frontend URL: `http://127.0.0.1:5173`

## 5. Huong dan su dung / Usage Guide

### 5.1 Su dung tren UI / Using the web UI

1. Mo `http://127.0.0.1:5173`.  
   Open `http://127.0.0.1:5173`.
2. Chon bot:
   - `crm-chat-bot` (`/chat/price`)
   - `crm-guidline-bot` (`/chat/guide`)
3. Nhap cau hoi va gui.  
   Enter your question and submit.
4. Xem cau tra loi tren giao dien.  
   Review the response in the UI.

### 5.2 Test API nhanh / Quick API tests

**Price bot:**

```bash
curl -X POST http://127.0.0.1:8000/chat/price \
  -H "Content-Type: application/json" \
  -d '{"question":"goi nao phu hop cho doanh nghiep 10 nhan su?","top_k":3}'
```

**Guide bot:**

```bash
curl -X POST http://127.0.0.1:8000/chat/guide \
  -H "Content-Type: application/json" \
  -d '{"question":"huong dan tao co hoi moi","top_k":3}'
```

## 6. Loi thuong gap / Common Issues

- `python3.10: command not found`
  - **VI:** Cai dat Python 3.10 hoac dung ban Python phu hop.
  - **EN:** Install Python 3.10 or use an available compatible Python version.

- `ModuleNotFoundError`
  - **VI:** Kiem tra da kich hoat `.venv` va da cai dependency.
  - **EN:** Ensure `.venv` is activated and dependencies are installed.

- Frontend khong nhan phan hoi / Frontend gets no response
  - **VI:** Kiem tra backend dang chay cong `8000`.
  - **EN:** Verify backend is running on port `8000`.

- Khong vao duoc MLflow / MLflow not accessible
  - **VI:** Kiem tra MLflow dang chay cong `5001`.
  - **EN:** Verify MLflow server is running on port `5001`.

## 7. Checklist truoc ban giao / Pre-handover Checklist

- [ ] `/chat/price` works
- [ ] `/chat/guide` works
- [ ] Frontend chat flow works
- [ ] Curl tests pass
- [ ] MLflow accessible (if used)

## 8. Tai lieu lien quan / Related Documents

- [README (repo)](https://github.com/vntayemm/demo-chatbot/blob/main/README.md)
- [Huong dan cai dat va su dung (VI)](./huong_dan_cai_dat_va_su_dung.md)
- [Introduction report](./introduction_report.md)
- [UAT checklist](../02-governance/uat_checklist.md)
- [Go-live checklist](../02-governance/go_live_checklist.md)
