# Vercel 배포 준비 (실습 5 완료 후)

이 파일들은 기존 `LLM_Application` 프로젝트에 **추가**합니다. 기존 `frontend` 폴더와 Python 실습 파일은 그대로 둡니다.

```text
LLM_Application/
├─ vercel.json                ← 이 ZIP에서 추가
├─ backend/                  ← 이 ZIP에서 추가
│  ├─ main.py
│  ├─ requirements.txt
│  └─ data/git_기초.txt
├─ frontend/                 ← 실습 4에서 추가한 폴더
└─ .env                      ← 로컬 전용, GitHub에 올리지 않음
```

## 1. React가 API를 호출하는지 확인

`frontend/src/App.jsx`의 `send(event)` 안에 임시 답변 대신 `fetch("/api/chat", ...)` 코드가 있어야 합니다. 수업 PPT의 실습 5를 참고하세요.

## 2. GitHub에 올리기

프로젝트 루트에서 실행합니다.

```powershell
git status
git add vercel.json backend frontend
git diff --cached --stat
git commit -m "Prepare Vercel deployment"
git push
```

`git status`와 staged 파일 목록에서 `.env`, `.venv`, `node_modules`가 없는지 확인하세요.

## 3. Vercel에서 Import

Vercel 대시보드 → Add New → Project → GitHub 저장소 Import. **Root Directory는 프로젝트 루트 `./`**로 두세요. `frontend`로 지정하면 루트의 `vercel.json`과 `backend`를 읽지 못합니다.

Import 화면의 Environment Variables에서 이름 `GEMINI_API_KEY`, 값은 본인의 키를 입력합니다. Production 환경에 적용합니다. 키를 GitHub나 React 코드에 적지 않습니다. 이미 배포한 프로젝트라면 Settings → Environment Variables에서 추가한 뒤 다시 배포합니다.

Deploy가 끝나면 생성된 URL에서 질문을 입력합니다. `https://생성된-주소/api/docs`에서 Python API도 확인할 수 있습니다. 먼저 Vercel의 배포 로그가 성공인지 확인하고, 응답이 안 나오면 Functions 로그를 살펴봅니다.

Vercel Services는 2026년 11월 기준 Beta입니다. 현재 공식 설정 예시: https://vercel.com/docs/services
