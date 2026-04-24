# Huong Dan Publish Thu Vien Docs Len GitHub Pages (MkDocs Material)

## 1. Cau truc docs sau khi nang cap

Repo su dung MkDocs Material de co:
- Tree navigation ben trai
- Outline (TOC) ben phai
- Search va theme docs chuyen nghiep

Cac file cau hinh chinh:
- `mkdocs.yml`
- `requirements-docs.txt`
- `.github/workflows/docs.yml`
- `docs/index.md`
- `docs/catalog.md`

## 2. Cau hinh GitHub Pages

1. Vao repo tren GitHub.
2. Mo `Settings` -> `Pages`.
3. O `Build and deployment`:
   - Source: `GitHub Actions`
4. Save.

Khi push len `main`, workflow `docs` se tu dong build va deploy.

## 3. URL truy cap

Thong thuong co dang:
- `https://<username>.github.io/<repo>/`

## 4. Chay local de preview

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Truy cap local:
- `http://127.0.0.1:8000`

## 5. Quy tac cap nhat

- Tai lieu tong quan cap nhat trong `docs/index.md`.
- Muc luc tong hop cap nhat trong `docs/catalog.md`.
- Dieu huong trang cap 1 cap nhat trong `mkdocs.yml` (muc `nav`).
- Kiem tra lai link sau moi lan doi ten file.

## 6. Cac buoc verify sau khi publish

- Kiem tra sidebar trai co hien tree docs.
- Kiem tra TOC ben phai hien dung theo heading.
- Kiem tra thanh search hoat dong.
- Kiem tra 10-15 links quan trong trong `catalog`.

## 7. Luu y bao mat

- Khong public thong tin nhay cam:
  - Token, key, endpoint private
  - Email/phone noi bo
  - Dieu khoan hop dong chua an danh
- Dung placeholder khi can (`[TEN CONG TY]`, `[EMAIL]`).

## 8. Luu y ve links ra ngoai thu muc docs

- `docs/index.md` va `docs/catalog.md` da duoc doi sang GitHub URL tuyet doi cho cac file nam o root repo.
- Cach nay giu duoc tinh gon cua thu muc `docs/`, dong thoi tranh canh bao link noi bo khong thuoc docs tree.
- Neu muon docs hoat dong hoan toan noi bo (khong mo GitHub), co the tao mirror cac file can thiet trong `docs/`.
