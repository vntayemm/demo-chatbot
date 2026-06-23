import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
PRICE_DATA_DIR = DATA_DIR / "price"
GUIDE_DATA_DIR = DATA_DIR / "guide"
DOCS_DATA_DIR = DATA_DIR / "docs"
SALES_DATA_DIR = DATA_DIR / "sales"
CRM_DATA_DIR = DATA_DIR / "crm"

EMBED_MODEL_NAME = os.getenv("EMBED_MODEL_NAME", "VoVanPhuc/sup-SimCSE-VietNamese-phobert-base")
EMBED_BACKEND = os.getenv("EMBED_BACKEND", "tfidf")
HYBRID_TFIDF_WEIGHT = float(os.getenv("HYBRID_TFIDF_WEIGHT", "0.4"))
HYBRID_SIMCSE_WEIGHT = float(os.getenv("HYBRID_SIMCSE_WEIGHT", "0.6"))
TOP_K_DEFAULT = int(os.getenv("TOP_K_DEFAULT", "3"))
