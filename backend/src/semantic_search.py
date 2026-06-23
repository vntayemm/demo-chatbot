from typing import List, Optional, Tuple

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

_SUPPORTED_BACKENDS: Tuple[str, ...] = ("tfidf", "simcse", "hybrid")
_DEFAULT_HYBRID_TFIDF_WEIGHT: float = 0.4
_DEFAULT_HYBRID_SIMCSE_WEIGHT: float = 0.6


def normalize_embed_backend(backend: str) -> str:
    normalized: str = (backend or "tfidf").strip().lower()
    if normalized not in _SUPPORTED_BACKENDS:
        supported = ", ".join(_SUPPORTED_BACKENDS)
        raise ValueError(f"EMBED_BACKEND must be one of {supported}, got: {backend!r}")
    return normalized


def _l2_normalize_rows(matrix: np.ndarray) -> np.ndarray:
    norms: np.ndarray = np.linalg.norm(matrix, axis=1, keepdims=True)
    safe_norms: np.ndarray = np.clip(norms, a_min=1e-12, a_max=None)
    return matrix / safe_norms


def _l2_normalize_vector(vector: np.ndarray) -> np.ndarray:
    norm: float = float(np.linalg.norm(vector))
    if norm <= 1e-12:
        return np.zeros_like(vector)
    return (vector / norm).astype(np.float32)


def _min_max_normalize_scores(scores: np.ndarray) -> np.ndarray:
    if scores.size == 0:
        return scores
    min_score: float = float(np.min(scores))
    max_score: float = float(np.max(scores))
    if max_score - min_score <= 1e-12:
        return np.ones_like(scores, dtype=np.float32)
    return ((scores - min_score) / (max_score - min_score)).astype(np.float32)


def _load_sentence_transformer(model_name: str):
    try:
        from sentence_transformers import SentenceTransformer
    except ImportError as exc:
        raise RuntimeError(
            "EMBED_BACKEND simcse/hybrid requires sentence-transformers. "
            "Install: pip install -r requirements-embeddings.txt"
        ) from exc
    return SentenceTransformer(model_name)


class SemanticSearchEngine:
    def __init__(
        self,
        model_name: str,
        documents: List[str],
        backend: str = "tfidf",
        hybrid_tfidf_weight: Optional[float] = None,
        hybrid_simcse_weight: Optional[float] = None,
    ) -> None:
        self._documents: List[str] = documents
        if len(documents) == 0:
            raise ValueError("documents must not be empty")
        self._model_name: str = model_name
        self._backend: str = normalize_embed_backend(backend)
        tfidf_weight: float = (
            _DEFAULT_HYBRID_TFIDF_WEIGHT
            if hybrid_tfidf_weight is None
            else float(hybrid_tfidf_weight)
        )
        simcse_weight: float = (
            _DEFAULT_HYBRID_SIMCSE_WEIGHT
            if hybrid_simcse_weight is None
            else float(hybrid_simcse_weight)
        )
        weight_sum: float = tfidf_weight + simcse_weight
        if weight_sum <= 0:
            raise ValueError("hybrid weights must sum to a positive value")
        self._hybrid_tfidf_weight: float = tfidf_weight / weight_sum
        self._hybrid_simcse_weight: float = simcse_weight / weight_sum

        self._vectorizer: Optional[TfidfVectorizer] = None
        self._tfidf_document_matrix: Optional[np.ndarray] = None
        self._simcse_encoder = None
        self._simcse_document_matrix: Optional[np.ndarray] = None

        if self._backend in ("tfidf", "hybrid"):
            self._vectorizer = TfidfVectorizer(ngram_range=(1, 2))
            self._tfidf_document_matrix = self._build_tfidf_matrix(documents)
        if self._backend in ("simcse", "hybrid"):
            self._simcse_encoder = _load_sentence_transformer(model_name)
            self._simcse_document_matrix = self._build_simcse_matrix(documents)

    @property
    def backend(self) -> str:
        return self._backend

    def _build_tfidf_matrix(self, documents: List[str]) -> np.ndarray:
        if self._vectorizer is None:
            raise RuntimeError("TF-IDF vectorizer is not initialized")
        sparse_matrix = self._vectorizer.fit_transform(documents)
        dense_matrix: np.ndarray = sparse_matrix.toarray().astype(np.float32)
        return _l2_normalize_rows(dense_matrix)

    def _build_simcse_matrix(self, documents: List[str]) -> np.ndarray:
        if self._simcse_encoder is None:
            raise RuntimeError("SimCSE encoder is not initialized")
        embeddings: np.ndarray = self._simcse_encoder.encode(
            documents,
            batch_size=16,
            show_progress_bar=False,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )
        return embeddings.astype(np.float32)

    def _tfidf_similarities(self, question: str) -> np.ndarray:
        if self._vectorizer is None or self._tfidf_document_matrix is None:
            raise RuntimeError("TF-IDF index is not initialized")
        question_sparse = self._vectorizer.transform([question])
        question_vector: np.ndarray = question_sparse.toarray().astype(np.float32).reshape(-1)
        question_vector = _l2_normalize_vector(question_vector)
        return np.matmul(self._tfidf_document_matrix, question_vector).astype(np.float32)

    def _simcse_similarities(self, question: str) -> np.ndarray:
        if self._simcse_encoder is None or self._simcse_document_matrix is None:
            raise RuntimeError("SimCSE index is not initialized")
        question_embedding: np.ndarray = self._simcse_encoder.encode(
            [question],
            batch_size=1,
            show_progress_bar=False,
            convert_to_numpy=True,
            normalize_embeddings=True,
        ).astype(np.float32)
        question_vector: np.ndarray = question_embedding.reshape(-1)
        return np.matmul(self._simcse_document_matrix, question_vector).astype(np.float32)

    def _combined_similarities(self, question: str) -> np.ndarray:
        tfidf_scores: np.ndarray = _min_max_normalize_scores(self._tfidf_similarities(question))
        simcse_scores: np.ndarray = _min_max_normalize_scores(self._simcse_similarities(question))
        return (
            self._hybrid_tfidf_weight * tfidf_scores
            + self._hybrid_simcse_weight * simcse_scores
        ).astype(np.float32)

    def query(self, question: str, top_k: int) -> List[Tuple[str, float]]:
        normalized_top_k: int = max(1, min(top_k, len(self._documents)))
        if self._backend == "tfidf":
            similarities = self._tfidf_similarities(question)
        elif self._backend == "simcse":
            similarities = self._simcse_similarities(question)
        else:
            similarities = self._combined_similarities(question)

        indices: np.ndarray = np.argsort(-similarities)[:normalized_top_k]
        results: List[Tuple[str, float]] = []
        for idx in indices:
            results.append((self._documents[int(idx)], float(similarities[int(idx)])))
        return results
