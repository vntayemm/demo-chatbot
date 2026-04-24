from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
PRICE_DATA_DIR = DATA_DIR / "price"
GUIDE_DATA_DIR = DATA_DIR / "guide"
DOCS_DATA_DIR = DATA_DIR / "docs"
SALES_DATA_DIR = DATA_DIR / "sales"

EMBED_MODEL_NAME = "VoVanPhuc/sup-SimCSE-VietNamese-phobert-base"
EMBED_BACKEND = "tfidf"
TOP_K_DEFAULT = 3
