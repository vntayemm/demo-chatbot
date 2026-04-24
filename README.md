# demo-chatbot
cd backend
source .venv/bin/activate
mlflow server --host 127.0.0.1 --port 5001
Project duoc tach thanh 2 phan ro rang:

cd backend
source .venv/bin/activate
python -m src.log_models

- `backend/`: API FastAPI, semantic search, MLflow logging.
- `frontend/`: Vue test UI voi 2 component:
  - `crm-chat-bot` (goi `/chat/price`)
  - `crm-guidline-bot` (goi `/chat/guide`)

## Cau truc

- `backend/src`: code Python backend
- `backend/data`: markdown corpus cho 2 bot
- `frontend/index.html`: trang test
- `frontend/main.js`: code Vue components

## Chay bang VSCode Tasks

Da co san tasks trong `.vscode/tasks.json`:

- `Install backend dependencies`
- `Run backend API server`
- `Log MLflow models`
- `Run frontend (Vue test UI)`

## Chay thu cong

### Backend

```bash
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
python3 -m http.server 5173
```

Mo trinh duyet: `http://127.0.0.1:5173`

## API test nhanh

```bash
curl -X POST http://127.0.0.1:8000/chat/price \
  -H "Content-Type: application/json" \
  -d '{"question":"goi nao phu hop cho doanh nghiep 10 nhan su?","top_k":3}'
```

## Docs library (public)

Bo tai lieu da duoc tong hop theo MkDocs Material de public tren GitHub Pages:

- `docs/index.md` (trang chu docs)
- `docs/catalog.md` (muc luc day du)
- `docs/publish_github_pages.md` (huong dan publish)
- `mkdocs.yml` (cau hinh navigation/theme)

### Preview docs local

```bash
pip install -r requirements-docs.txt
mkdocs serve
```