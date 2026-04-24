from typing import List, Tuple

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


class SemanticSearchEngine:
    def __init__(self, model_name: str, documents: List[str], backend: str = "tfidf") -> None:
        del model_name
        self._documents: List[str] = documents
        if len(documents) == 0:
            raise ValueError("documents must not be empty")
        self._backend: str = backend
        self._vectorizer: TfidfVectorizer = TfidfVectorizer(ngram_range=(1, 2))
        self._document_matrix: np.ndarray = self._build_tfidf_matrix(documents)

    def _build_tfidf_matrix(self, documents: List[str]) -> np.ndarray:
        sparse_matrix = self._vectorizer.fit_transform(documents)
        dense_matrix: np.ndarray = sparse_matrix.toarray().astype(np.float32)
        norms: np.ndarray = np.linalg.norm(dense_matrix, axis=1, keepdims=True)
        safe_norms: np.ndarray = np.clip(norms, a_min=1e-12, a_max=None)
        return dense_matrix / safe_norms

    def query(self, question: str, top_k: int) -> List[Tuple[str, float]]:
        normalized_top_k: int = max(1, min(top_k, len(self._documents)))
        question_sparse = self._vectorizer.transform([question])
        question_vector: np.ndarray = question_sparse.toarray().astype(np.float32)
        question_norm: float = float(np.linalg.norm(question_vector))
        if question_norm <= 1e-12:
            question_vector = np.zeros_like(question_vector)
        else:
            question_vector = question_vector / question_norm
        similarities: np.ndarray = np.matmul(self._document_matrix, question_vector.T).reshape(-1)
        indices: np.ndarray = np.argsort(-similarities)[:normalized_top_k]

        results: List[Tuple[str, float]] = []
        for idx in indices:
            results.append((self._documents[int(idx)], float(similarities[int(idx)])))
        return results
