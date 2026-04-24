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

Dong bo frontend vao docs truoc khi chay:

```bash
rm -rf docs/frontend
cp -R frontend docs/frontend
```

Sau do chay:

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Hoac dung script 1 lenh:

```bash
./scripts/serve_docs_with_frontend.sh
```

Truy cap local | Open locally:

- `http://127.0.0.1:8000`

## 4b) Xuat Word bang Pandoc tren GitHub | Pandoc DOCX on GitHub Actions

MkDocs **khong** tich hop Pandoc. Workflow rieng `.github/workflows/pandoc-docx.yml` chay **thu cong** (`workflow_dispatch`), cai `pandoc` tren runner Ubuntu, doi moi file `*.md` trong `docs/` (tru `docs/frontend/`) sang `.docx` va dong goi **artifact** ZIP tren tab Actions cua run do.

MkDocs does **not** embed Pandoc. The separate workflow `pandoc-docx.yml` runs **manually**, installs Pandoc, converts each `docs/**/*.md` (skips `docs/frontend/`) to `.docx`, and uploads a ZIP **artifact** on that workflow run (Actions -> workflow run -> Artifacts).

PDF tren CI thuong phai cai them TeX hoac pdf-engine; xuat DOCX thi pandoc mac dinh la du. | PDF in CI usually needs TeX or another `--pdf-engine`; DOCX export works with the default Pandoc binary only.

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

## 8) Cau truc noi bo docs | Internal docs structure

Tai lieu Markdown nghiep vu nam trong `docs/content/`; sau khi `mkdocs build`, moi nhom co **trang index** tren GitHub Pages (URL dang `/content/<thu-muc>/`, **khong** phai link raw tren GitHub).

**Muc luc theo nhom (mo trong site docs):**

- [01 Overview](./content/01-overview/index.md)
- [02 Governance](./content/02-governance/index.md)
- [03 Signoff](./content/03-signoff/index.md)
- [04 Architecture](./content/04-architecture/index.md)
- [05 Execution](./content/05-execution/index.md)
- [06 Commercial Legal](./content/06-commercial-legal/index.md)
- [07 Sales Profile](./content/07-sales-profile/index.md)
- [08 Marketing](./content/08-marketing/index.md)
- [99 Other](./content/99-other/index.md)

**Trang goc va catalog:** `docs/index.md`, `docs/catalog.md`, `docs/roadmap*.md` — dung link tuong doi `content/...` hoac `./frontend/...` de mo **trong cung origin** Pages (tranh `github.com/.../blob/` neu ban doc can trai nghiem web).

**Frontend HTML (trong site Pages, cung origin):** file nam trong `docs/frontend/` khi build. Vi du (tu root site sau khi deploy):

- [Landing (VI)](./frontend/landing.html)
- [Landing song ngu](./frontend/landing_bilingual.html)
- [Blogs web](./frontend/blogs.html)

**README repo:** file o root repo (`README.md`) — link day du toi GitHub la hop ly vi khong nam trong `docs/`.
