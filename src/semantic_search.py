from typing import List, Tuple

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


class SemanticSearchEngine:
    def __init__(self, model_name: str, documents: List[str]) -> None:
        self._documents: List[str] = documents
        self._model: SentenceTransformer = SentenceTransformer(model_name)
        self._index: faiss.IndexFlatIP = self._build_index(documents)

    def _build_index(self, documents: List[str]) -> faiss.IndexFlatIP:
        if len(documents) == 0:
            raise ValueError("documents must not be empty")

        embeddings: np.ndarray = self._model.encode(
            documents,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )
        embedding_dim: int = int(embeddings.shape[1])
        index: faiss.IndexFlatIP = faiss.IndexFlatIP(embedding_dim)
        index.add(embeddings.astype(np.float32))
        return index

    def query(self, question: str, top_k: int) -> List[Tuple[str, float]]:
        normalized_top_k: int = max(1, min(top_k, len(self._documents)))
        question_embedding: np.ndarray = self._model.encode(
            [question],
            convert_to_numpy=True,
            normalize_embeddings=True,
        ).astype(np.float32)
        similarities, indices = self._index.search(question_embedding, normalized_top_k)

        results: List[Tuple[str, float]] = []
        for idx, score in zip(indices[0], similarities[0]):
            results.append((self._documents[int(idx)], float(score)))
        return results
