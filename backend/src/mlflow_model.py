from pathlib import Path
from typing import Any, Dict, List

import mlflow.pyfunc
import pandas as pd

from src.chatbot import RetrievalChatbot
from src.semantic_search import SemanticSearchEngine


class MarkdownRetrievalModel(mlflow.pyfunc.PythonModel):
    def __init__(self, bot_name: str, embedding_model: str, embedding_backend: str) -> None:
        self._bot_name: str = bot_name
        self._embedding_model: str = embedding_model
        self._embedding_backend: str = embedding_backend
        self._chatbot: RetrievalChatbot | None = None

    def load_context(self, context: mlflow.pyfunc.model.PythonModelContext) -> None:
        corpus_path: Path = Path(context.artifacts["corpus"])
        corpus_df: pd.DataFrame = pd.read_csv(corpus_path)
        documents: List[str] = corpus_df["document"].astype(str).tolist()

        search_engine: SemanticSearchEngine = SemanticSearchEngine(
            model_name=self._embedding_model,
            documents=documents,
            backend=self._embedding_backend,
        )
        self._chatbot = RetrievalChatbot(search_engine=search_engine, name=self._bot_name)

    def predict(self, context: Any, model_input: pd.DataFrame) -> List[Dict[str, Any]]:
        if self._chatbot is None:
            raise RuntimeError("Model is not loaded.")

        outputs: List[Dict[str, Any]] = []
        for _, row in model_input.iterrows():
            question: str = str(row["question"])
            top_k: int = int(row.get("top_k", 3))
            response = self._chatbot.ask(question=question, top_k=top_k)
            outputs.append(
                {
                    "answer": response.answer,
                    "contexts": response.contexts,
                }
            )
        return outputs
