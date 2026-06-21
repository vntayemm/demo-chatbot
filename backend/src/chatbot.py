from dataclasses import dataclass
from typing import Dict, List, Optional

from src.semantic_search import SemanticSearchEngine


@dataclass
class ChatbotResponse:
    answer: str
    contexts: List[str]


class RetrievalChatbot:
    def __init__(self, search_engine: SemanticSearchEngine, name: str) -> None:
        self._search_engine: SemanticSearchEngine = search_engine
        self._name: str = name

    def ask(
        self,
        question: str,
        top_k: int,
        screen_context: Optional[Dict[str, str]] = None,
    ) -> ChatbotResponse:
        search_query: str = question
        if screen_context:
            screen_key: str = str(screen_context.get("screenKey") or "").strip()
            title: str = str(screen_context.get("title") or screen_key).strip()
            role: str = str(screen_context.get("role") or "guest").strip()
            intro: str = str(screen_context.get("intro") or "").strip()
            search_query = (
                f"CRM GLS man hinh {title} screenKey {screen_key} vai tro {role}. "
                f"{intro} Cau hoi: {question}"
            )
        search_results = self._search_engine.query(question=search_query, top_k=top_k)
        contexts: List[str] = [item[0] for item in search_results]
        answer: str = self._format_answer(
            question=question,
            contexts=contexts,
            screen_context=screen_context,
        )
        return ChatbotResponse(answer=answer, contexts=contexts)

    def _format_answer(
        self,
        question: str,
        contexts: List[str],
        screen_context: Optional[Dict[str, str]],
    ) -> str:
        if self._name == "crm-help-bot":
            return self._format_crm_vi_answer(question, contexts, screen_context)
        return (
            f"[{self._name}] Mình tìm thấy {len(contexts)} đoạn liên quan nhất "
            "từ dữ liệu markdown. Bạn có thể dùng nội dung dưới đây để tư vấn khách hàng."
        )

    def _format_crm_vi_answer(
        self,
        question: str,
        contexts: List[str],
        screen_context: Optional[Dict[str, str]],
    ) -> str:
        parts: List[str] = []
        if screen_context:
            title: str = str(screen_context.get("title") or screen_context.get("screenKey") or "CRM")
            role: str = str(screen_context.get("role") or "guest")
            parts.append(f"Trợ giúp AI cho màn **{title}** (vai trò: {role}):")
        else:
            parts.append("Trợ giúp AI CRM GLS:")
        if len(contexts) == 0:
            parts.append(
                "Chưa tìm thấy tài liệu phù hợp. Hãy mô tả rõ thao tác trên màn hình hoặc thử từ khóa khác."
            )
            return "\n\n".join(parts)
        parts.append(
            f"Dựa trên {len(contexts)} đoạn hướng dẫn liên quan tới «{question.strip()}»:"
        )
        for index, context in enumerate(contexts, start=1):
            snippet: str = context.strip().replace("\n", " ")
            if len(snippet) > 420:
                snippet = snippet[:420] + "…"
            parts.append(f"{index}. {snippet}")
        return "\n\n".join(parts)
