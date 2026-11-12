from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from google import genai
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR.parent / ".env")
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)


@app.post("/api/chat")
def chat(request: ChatRequest):
    document = (BASE_DIR / "data" / "git_기초.txt").read_text(encoding="utf-8")
    prompt = f"""아래 자료를 바탕으로 질문에 답하세요.
자료에 없으면 찾을 수 없다고 말하세요.

자료:
{document}

질문: {request.question}"""

    client = genai.Client()
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=prompt,
    )
    return {"answer": interaction.output_text}
