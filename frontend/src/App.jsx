import { useState } from 'react'

const firstMessage = {
  role: 'assistant',
  text: '안녕하세요. git_기초.txt 내용을 바탕으로 질문에 답하는 챗봇입니다.',
}

function App() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([firstMessage])
  const [loading, setLoading] = useState(false)

  async function send(event) {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed || loading) return

    setMessages((current) => [...current, { role: 'user', text: trimmed }])
    setQuestion('')
    setLoading(true)

    try {
      // 실습 5에서 이 두 줄을 Python API 호출로 교체합니다.
      await new Promise((resolve) => setTimeout(resolve, 300))
      const answer = `임시 답변: “${trimmed}” 질문을 받았습니다.`
      setMessages((current) => [...current, { role: 'assistant', text: answer }])
    } catch (error) {
      setMessages((current) => [...current, {
        role: 'assistant',
        text: `연결 오류: ${error.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <header className="header">
        <span className="eyebrow">KION LABS · LLM 애플리케이션 개발</span>
        <h1>나의 문서 질문 챗봇</h1>
        <p>수업 자료에 대해 궁금한 점을 입력해 보세요.</p>
      </header>

      <section className="chat" aria-label="대화 내용">
        {messages.map((message, index) => (
          <div className={`message ${message.role}`} key={index}>
            <span className="role">{message.role === 'user' ? '나' : '챗봇'}</span>
            <p>{message.text}</p>
          </div>
        ))}
        {loading && <p className="status">답변을 작성하고 있습니다...</p>}
      </section>

      <form className="composer" onSubmit={send}>
        <label htmlFor="question">질문</label>
        <div className="input-row">
          <input
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="예: Git commit은 무엇인가요?"
            maxLength={500}
          />
          <button type="submit" disabled={loading || !question.trim()}>
            보내기
          </button>
        </div>
      </form>
    </main>
  )
}

export default App
