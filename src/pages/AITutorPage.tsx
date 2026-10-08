import { useState, useRef, useEffect } from 'react'
import { learningAPI } from '../api/learning'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const subjects = [
  { id: 'chinese', name: '语文', icon: '📖' },
  { id: 'math', name: '数学', icon: '🔢' },
  { id: 'english', name: '英语', icon: '🔤' },
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是AI学习助手🤖\n\n我可以帮你解答语文、数学、英语的问题。有什么不懂的，随时问我哦！',
    },
  ])
  const [input, setInput] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('chinese')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const data = await learningAPI.chat(userMessage, subjects.find(s => s.id === selectedSubject)?.name || '语文')
      setMessages(prev => [...prev, { role: 'assistant', content: (data as any).answer }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我现在有点忙，请稍后再试一次吧！' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    '什么是比喻句？',
    '怎么计算两位数乘法？',
    'How are you 是什么意思？',
    '什么是面积？',
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🤖</div>
        <h1 className="text-2xl font-bold text-xes-dark">AI答疑助手</h1>
        <p className="text-xes-gray text-sm mt-1">有任何学习问题，随时问我！</p>
      </div>

      {/* Subject Selector */}
      <div className="flex justify-center gap-2 mb-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedSubject === subject.id
                ? 'bg-xes-primary text-white'
                : 'bg-white text-xes-gray hover:bg-xes-accent'
            }`}
          >
            {subject.icon} {subject.name}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto xes-card p-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-xes-primary text-white'
                    : 'bg-gray-100 text-xes-dark'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center mb-1">
                    <span className="text-lg mr-2">🤖</span>
                    <span className="text-xs text-xes-gray">AI老师</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <span className="animate-bounce">🤖</span>
                  <span className="text-xes-gray">正在思考...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-sm text-xes-gray mb-2">💡 试试这些问题：</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => setInput(q)}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-xes-gray hover:border-xes-primary hover:text-xes-primary transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-xes-primary focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-12 h-12 rounded-full bg-xes-primary text-white flex items-center justify-center hover:bg-xes-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}
