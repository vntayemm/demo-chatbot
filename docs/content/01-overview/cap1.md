Đã tạo xong chatbot project theo hướng dẫn trong `process/` với kiến trúc tách **2 bot riêng** và có thể chạy local ngay.

- **Đã triển khai 2 chatbot đúng mục tiêu**
  - `price-bot`: tra cứu/sơ bộ so sánh giá từ markdown.
  - `guide-bot`: hỏi đáp hướng dẫn cài đặt/sử dụng từ markdown.

- **Code chính đã thêm**
  - `src/semantic_search.py`: semantic search bằng `SentenceTransformer` + `FAISS`.
  - `src/chatbot.py`: lớp chatbot retrieval và format câu trả lời.
  - `src/api.py`: API FastAPI với endpoint:
    - `POST /chat/price`
    - `POST /chat/guide`
  - `src/mlflow_model.py`: custom `mlflow.pyfunc.PythonModel`.
  - `src/log_models.py`: script log 2 model vào MLflow.
  - `src/markdown_loader.py`, `src/config.py`: load dữ liệu + cấu hình.

- **Dữ liệu mẫu markdown đã tạo**
  - `data/price/*.md`
  - `data/guide/*.md`

- **Tài liệu chạy đã cập nhật**
  - [README (repo)](https://github.com/vntayemm/demo-chatbot/blob/main/README.md): hướng dẫn cài đặt, chạy API local, test `curl`, log model MLflow, serve model theo run ID.
  - `requirements.txt`: dependency cần thiết.

- **Kiểm tra kỹ thuật**
  - Đã chạy `python3 -m compileall src` thành công (không lỗi syntax).
  - Không có linter errors trên thư mục `src`.

Vì sao cách này tốt hơn:
- Tách 2 bot giúp dữ liệu và logic rõ ràng, dễ kiểm soát chất lượng trả lời theo từng nghiệp vụ.
- Dùng semantic search giúp trả lời theo ngữ nghĩa tốt hơn keyword match.
- Có sẵn `pyfunc` để đóng gói/triển khai MLflow, thuận tiện tích hợp CRM/website qua REST API.

Nếu bạn muốn, mình có thể làm tiếp bước 2: thêm file frontend mẫu `Vue2 + HTML` gọi trực tiếp `POST /chat/{bot_type}` để demo UI chat ngay trong repo này.