# Quy ước format tài liệu CMIT

## Mục tiêu
- Đồng bộ cấu trúc tài liệu trong thư mục `cmit/`.
- Dễ đọc, dễ review, dễ mở rộng.

## Template khuyến nghị cho mỗi file
1. `# <Tên tài liệu>`
2. `## 1) Giới thiệu` hoặc `## 1) Mục tiêu`
3. `## 2) Thành phần chính` hoặc `## 2) Phạm vi`
4. `## 3) Diagram` (nếu có kiến trúc/luồng)
5. `## 4) Giải thích`
6. `## 5) Checklist/Kết luận` (tùy loại tài liệu)

## Quy ước nội dung
- Dùng tiếng Việt nhất quán.
- Tên công nghệ giữ nguyên tiếng Anh chuẩn (`Kubernetes`, `OpenTelemetry`, `Jaeger`).
- Tránh lỗi chính tả trong tiêu đề vì ảnh hưởng mục lục và điều hướng.
- Mỗi mục lớn trong `index.md` nên có link đến file chi tiết tương ứng.
