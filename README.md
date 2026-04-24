# demo-chatbot

Project nay tao theo luong trong thu muc `process/`, gom 2 chatbot rieng:

- `price-bot`: tu van gia va so sanh goi san pham
- `guide-bot`: huong dan cai dat va su dung

Ca hai bot deu dung:

- Du lieu markdown (`data/price`, `data/guide`)
- Semantic search bang Sentence Transformers + FAISS
- Dong goi MLflow `pyfunc` de co the serve endpoint rieng

## 1) Cai dat

```bash
python3.10 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Luu y: can dung Python 3.10 hoac 3.11 de tranh loi cai dat `torch` tren Python 3.13.
Neu da cai truoc do va gap loi dependency, hay xoa `.venv` hoac chay lai task `Install dependencies` (task da tu dong tao moi `.venv`).

## 2) Chay API local de tich hop web/CRM

```bash
uvicorn src.api:app --host 0.0.0.0 --port 8000
```

Test nhanh:

```bash
curl -X POST http://127.0.0.1:8000/chat/price \
  -H "Content-Type: application/json" \
  -d '{"question":"goi nao phu hop cho doanh nghiep 10 nhan su?","top_k":3}'

curl -X POST http://127.0.0.1:8000/chat/guide \
  -H "Content-Type: application/json" \
  -d '{"question":"cach import khach hang nhu the nao?","top_k":2}'
```

## 3) Log model vao MLflow

Dam bao MLflow tracking server dang chay, sau do:

```bash
python -m src.log_models
```

Lenh tren se tao 2 model artifacts:

- `price_bot`
- `guide_bot`

Ban co the serve rieng tung model bang:

```bash
mlflow models serve -m runs:/<run_id>/price_bot --port 5001
mlflow models serve -m runs:/<run_id>/guide_bot --port 5002
```

## 4) Tich hop frontend (Vue2/HTML hoac CRM)

Frontend chi can goi HTTP POST vao API:

- `/chat/price` cho cau hoi so sanh gia
- `/chat/guide` cho cau hoi huong dan su dung

Mau payload:

```json
{
  "question": "san pham nay co uu dai khong?",
  "top_k": 3
}
```

Đã tạo xong task trong `.vscode/tasks.json` để cài và chạy project.

- `Install dependencies`  
  - Tạo virtualenv `.venv`
  - Upgrade `pip`
  - Cài `requirements.txt`

- `Run API server`  
  - Tự động `dependsOn` task cài dependencies
  - Chạy `uvicorn src.api:app --host 0.0.0.0 --port 8000`

Bạn dùng trong VS Code/Cursor:
- `Cmd + Shift + P` -> `Tasks: Run Task`
- Chọn `Run API server` (nó sẽ tự chạy bước cài trước).  

Nếu bạn muốn, mình có thể thêm luôn task thứ 3 để `log MLflow models` (`python -m src.log_models`).


mlflow server --host 127.0.0.1 --port 5001