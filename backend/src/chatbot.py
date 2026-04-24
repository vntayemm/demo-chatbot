from dataclasses import dataclass
from typing import List

from src.semantic_search import SemanticSearchEngine


@dataclass
class ChatbotResponse:
    answer: str
    contexts: List[str]


class RetrievalChatbot:
    def __init__(self, search_engine: SemanticSearchEngine, name: str) -> None:
        self._search_engine: SemanticSearchEngine = search_engine
        self._name: str = name

    def ask(self, question: str, top_k: int) -> ChatbotResponse:
        search_results = self._search_engine.query(question=question, top_k=top_k)
        contexts: List[str] = [item[0] for item in search_results]
        answer: str = (
            f"[{self._name}] Mình tìm thấy {len(contexts)} đoạn liên quan nhất "
            "từ dữ liệu markdown. Bạn có thể dùng nội dung dưới đây để tư vấn khách hàng."
        )
        return ChatbotResponse(answer=answer, contexts=contexts)
