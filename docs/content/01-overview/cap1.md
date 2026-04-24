# Cap 1 — Hai bot (price / guide) va nen tang chay local

Da tao xong chatbot project theo huong dan trong `process/` voi kien truc tach **2 bot rieng** va co the chay local ngay.

## 1. Da trien khai 2 chatbot dung muc tieu

- **`price-bot`:** tra cuu/so bo so sanh gia tu markdown.
- **`guide-bot`:** hoi dap huong dan cai dat/su dung tu markdown.

## 2. Code chinh da them

- **`src/semantic_search.py`:** semantic search bang `SentenceTransformer` + `FAISS`.
- **`src/chatbot.py`:** lop chatbot retrieval va format cau tra loi.
- **`src/api.py`:** API FastAPI; endpoint chinh: `POST /chat/price`, `POST /chat/guide`.
- **`src/mlflow_model.py`:** custom `mlflow.pyfunc.PythonModel`.
- **`src/log_models.py`:** script log 2 model vao MLflow.
- **`src/markdown_loader.py`**, **`src/config.py`:** load du lieu + cau hinh.

## 3. Du lieu mau markdown da tao

- `data/price/*.md`
- `data/guide/*.md`

## 4. Tai lieu chay da cap nhat

- [README (repo)](https://github.com/vntayemm/demo-chatbot/blob/main/README.md): huong dan cai dat, chay API local, test `curl`, log model MLflow, serve model theo run ID.
- `requirements.txt`: dependency can thiet.

## 5. Kiem tra ky thuat

- Da chay `python3 -m compileall src` thanh cong (khong loi syntax).
- Khong co linter errors tren thu muc `src`.

## Vi sao cach nay tot hon

- Tach 2 bot giup du lieu va logic ro rang, de kiem soat chat luong tra loi theo tung nghiep vu.
- Dung semantic search giup tra loi theo ngu nghia tot hon keyword match.
- Co san `pyfunc` de dong goi/trien khai MLflow, thuan tien tich hop CRM/website qua REST API.

## Buoc tiep theo (goi y)

Neu ban muon, co the lam tiep buoc 2: them file frontend mau `Vue2 + HTML` goi truc tiep `POST /chat/{bot_type}` de demo UI chat ngay trong repo nay.
