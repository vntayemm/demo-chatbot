# Huong Dan Publish | GitHub Pages Deployment Guide (MkDocs Material)

## 1) Cau truc docs sau khi nang cap | Upgraded docs structure

Repo hien su dung MkDocs Material de co giao dien docs chuyen nghiep:
- Thanh dieu huong ben trai (tree navigation)
- Muc luc ben phai (outline/TOC)
- Tim kiem nhanh va theme hien dai

Cac file cau hinh chinh | Core config files:
- `mkdocs.yml`
- `requirements-docs.txt`
- `.github/workflows/docs.yml`
- `docs/index.md`
- `docs/catalog.md`

## 2) Cau hinh GitHub Pages | Configure GitHub Pages

1. Vao repo tren GitHub | Open your repository on GitHub.
2. Mo `Settings` -> `Pages`.
3. Trong `Build and deployment`:
   - Chon `Source: GitHub Actions`
4. Luu cau hinh | Save.

Sau khi push len `main`, workflow `docs` se tu dong build va deploy.  
After each push to `main`, the `docs` workflow builds and deploys automatically.

## 3) URL truy cap | Access URL

Thong thuong URL co dang | The URL usually looks like:
- `https://<username>.github.io/<repo>/`

## 4) Chay local de preview | Local preview

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Truy cap local | Open locally:
- `http://127.0.0.1:8000`

## 5) Quy tac cap nhat | Update rules

- Cap nhat tong quan tai `docs/index.md` | Update overview in `docs/index.md`.
- Cap nhat muc luc tai `docs/catalog.md` | Update catalog in `docs/catalog.md`.
- Cap nhat menu trong `mkdocs.yml` (`nav`) | Update top-level navigation in `mkdocs.yml`.
- Luon kiem tra lai links sau khi doi ten file | Recheck links after renaming files.

## 6) Cac buoc verify sau publish | Post-deploy verification

- Kiem tra sidebar trai co hien tree docs | Verify left sidebar tree is visible.
- Kiem tra TOC ben phai theo heading | Verify right TOC follows headings.
- Kiem tra search hoat dong dung | Verify search works.
- Kiem tra 10-15 links quan trong trong `catalog` | Validate 10-15 key links from catalog.

## 7) Luu y bao mat | Security notes

Khong public du lieu nhay cam | Do not publish sensitive data:
- Token, key, endpoint private
- Email/phone noi bo
- Dieu khoan hop dong chua an danh

Su dung placeholder khi can | Use placeholders when needed:
- `[TEN CONG TY]`, `[EMAIL]`, ...

## 8) Luu y ve links ngoai docs | Notes for links outside docs folder

- `docs/index.md` va `docs/catalog.md` dang dung GitHub absolute URL cho cac file nam o root repo.
- Cach nay giu cau truc `docs/` gon nhe va tranh warning link noi bo khong nam trong docs tree.
- Neu can docs hoat dong hoan toan noi bo, hay tao mirror cac file root can thiet vao `docs/`.
