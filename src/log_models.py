from pathlib import Path
from typing import List

import mlflow
import pandas as pd

from src.config import EMBED_BACKEND, EMBED_MODEL_NAME, GUIDE_DATA_DIR, PRICE_DATA_DIR
from src.markdown_loader import read_markdown_files
from src.mlflow_model import MarkdownRetrievalModel


def _save_corpus_artifact(output_path: Path, documents: List[str]) -> None:
    corpus_df: pd.DataFrame = pd.DataFrame({"document": documents})
    corpus_df.to_csv(output_path, index=False)


def log_chatbot_model(bot_name: str, data_dir: Path, artifact_name: str) -> str:
    documents: List[str] = read_markdown_files(folder_path=data_dir)
    if len(documents) == 0:
        raise ValueError(f"Khong tim thay markdown trong {data_dir}")

    artifact_path: Path = Path(f"{artifact_name}_corpus.csv")
    _save_corpus_artifact(output_path=artifact_path, documents=documents)

    with mlflow.start_run(run_name=f"log_{artifact_name}") as run:
        mlflow.pyfunc.log_model(
            artifact_path=artifact_name,
            python_model=MarkdownRetrievalModel(
                bot_name=bot_name,
                embedding_model=EMBED_MODEL_NAME,
                embedding_backend=EMBED_BACKEND,
            ),
            artifacts={"corpus": str(artifact_path)},
            input_example=pd.DataFrame(
                [
                    {
                        "question": "Gia san pham co uu dai gi?",
                        "top_k": 3,
                    }
                ]
            ),
        )
        run_id: str = run.info.run_id
    return run_id


if __name__ == "__main__":
    mlflow.set_experiment("demo-chatbot")
    price_run_id: str = log_chatbot_model(
        bot_name="price-bot",
        data_dir=PRICE_DATA_DIR,
        artifact_name="price_bot",
    )
    guide_run_id: str = log_chatbot_model(
        bot_name="guide-bot",
        data_dir=GUIDE_DATA_DIR,
        artifact_name="guide_bot",
    )
    print(f"price_bot run_id: {price_run_id}")
    print(f"guide_bot run_id: {guide_run_id}")
