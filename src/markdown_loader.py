from pathlib import Path
from typing import List


def read_markdown_files(folder_path: Path) -> List[str]:
    documents: List[str] = []
    if not folder_path.exists():
        return documents

    markdown_paths: List[Path] = sorted(folder_path.glob("*.md"))
    for markdown_path in markdown_paths:
        file_text: str = markdown_path.read_text(encoding="utf-8").strip()
        if file_text:
            documents.append(file_text)
    return documents
