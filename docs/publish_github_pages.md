# Huong Dan Publish Thu Vien Docs Len GitHub Pages

## 1. Cau truc de xuat

Repo da co thu muc:
- `docs/index.md`
- `docs/catalog.md`
- `docs/publish_github_pages.md`

Ban co the public docs bang GitHub Pages theo cach don gian.

## 2. Bat GitHub Pages

1. Vao repo tren GitHub.
2. Mo `Settings` -> `Pages`.
3. O `Build and deployment`:
   - Source: `Deploy from a branch`
   - Branch: `main` (hoac branch chinh ban dang dung)
   - Folder: `/docs`
4. Save.

Sau 1-5 phut, GitHub se cap URL Pages.

## 3. URL truy cap

Thong thuong co dang:
- `https://<username>.github.io/<repo>/`

Trang mac dinh se lay tu `docs/index.md`.

## 4. Quy tac cap nhat

- Moi tai lieu moi nen duoc them link vao `docs/catalog.md`.
- Neu la tai lieu quan trong, them vao `docs/index.md`.
- Kiem tra link tuong doi sau moi lan doi ten file.

## 5. Khuyen nghi khi public

- Loai bo thong tin nhay cam truoc khi public:
  - Email/phone noi bo
  - Thong tin hop dong that
  - Token, endpoint private
- Dung placeholder cho thong tin chua cong khai (`[TEN CONG TY]`, `[EMAIL]`, ...).

## 6. Cac buoc verify sau khi publish

- Mo URL Pages va kiem tra `index`.
- Mo `catalog` va click 10-15 link bat ky.
- Kiem tra markdown render dung (table, code block, headings).
- Kiem tra ky tu tieng Viet hien thi dung.

## 7. Tinh nang mo rong (tuy chon)

Neu can docs dep hon, co the nang cap sang:
- MkDocs + Material theme
- Docusaurus
- Docsify

Hien tai, mode `/docs` la nhanh nhat de public ngay.
