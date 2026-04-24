#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

cleanup() {
  rm -rf "$ROOT_DIR/docs/frontend"
}

trap cleanup EXIT

echo "[docs] Sync frontend -> docs/frontend"
rm -rf "$ROOT_DIR/docs/frontend"
cp -R "$ROOT_DIR/frontend" "$ROOT_DIR/docs/frontend"

if [[ ! -d "$ROOT_DIR/.venv-docs" ]]; then
  echo "[docs] Create .venv-docs"
  python3 -m venv "$ROOT_DIR/.venv-docs"
fi

echo "[docs] Activate .venv-docs and install requirements"
source "$ROOT_DIR/.venv-docs/bin/activate"
pip install -r "$ROOT_DIR/requirements-docs.txt"

echo "[docs] Serve at http://127.0.0.1:8000"
mkdocs serve
