
from pathlib import Path

def read_document():
    return Path("data/git_기초.txt").read_text(encoding="utf-8")

def save_preview(preview):
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)
    (output_dir / "미리보기.txt").write_text(preview, encoding="utf-8")

text = read_document()
preview = text[:100]
print(preview)
save_preview(preview)
