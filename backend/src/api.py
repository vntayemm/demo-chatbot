from pathlib import Path
from typing import Dict

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.chatbot import RetrievalChatbot
from src.config import (
    DOCS_DATA_DIR,
    EMBED_BACKEND,
    EMBED_MODEL_NAME,
    GUIDE_DATA_DIR,
    PRICE_DATA_DIR,
    SALES_DATA_DIR,
    TOP_K_DEFAULT,
)
from src.markdown_loader import read_markdown_files
from src.semantic_search import SemanticSearchEngine


class AskRequest(BaseModel):
    question: str = Field(min_length=2)
    top_k: int = Field(default=TOP_K_DEFAULT, ge=1, le=10)


def _build_chatbot(name: str, data_dir: Path) -> RetrievalChatbot:
    documents = read_markdown_files(folder_path=data_dir)
    if len(documents) == 0:
        raise RuntimeError(f"Khong co du lieu markdown cho {name} tai {data_dir}")
    search_engine: SemanticSearchEngine = SemanticSearchEngine(
        model_name=EMBED_MODEL_NAME,
        documents=documents,
        backend=EMBED_BACKEND,
    )
    return RetrievalChatbot(search_engine=search_engine, name=name)


app = FastAPI(title="Demo Chatbot API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
chatbots: Dict[str, RetrievalChatbot] = {
    "price": _build_chatbot(name="price-bot", data_dir=PRICE_DATA_DIR),
    "guide": _build_chatbot(name="guide-bot", data_dir=GUIDE_DATA_DIR),
    "docs": _build_chatbot(name="docs-bot", data_dir=DOCS_DATA_DIR),
    "sales": _build_chatbot(name="sales-bot", data_dir=SALES_DATA_DIR),
}


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/chat/{bot_type}")
def ask_bot(bot_type: str, payload: AskRequest) -> Dict[str, object]:
    chatbot: RetrievalChatbot | None = chatbots.get(bot_type)
    if chatbot is None:
        raise HTTPException(status_code=404, detail="Bot type khong hop le")
    response = chatbot.ask(question=payload.question, top_k=payload.top_k)
    return {"answer": response.answer, "contexts": response.contexts}
