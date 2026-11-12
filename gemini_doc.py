from pathlib import Path
from dotenv import load_dotenv
from google import genai

def read_document():
    
    return Path("data/git_기초.txt").read_text(encoding="utf-8")

load_dotenv()               
client = genai.Client()

document = read_document()
question = "Git branch가 무엇인가요?"   

prompt = f"""너는 교육 자료를 설명하는 도우미다.
아래 [자료]에 있는 내용만 근거로 답해라.
자료에 없으면 "자료에 없습니다"라고만 답해라.
두 문장 이내로 답해라.

[자료]
{document}

[질문]
{question}"""

interaction = client.interactions.create(
    model="gemini-3.5-flash-lite",
    input=prompt,
)
print(interaction.output_text)