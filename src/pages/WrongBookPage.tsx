import { useState, useEffect } from 'react'
import { learningAPI } from '../api/learning'
import type { WrongQuestion } from '../types'

const subjectNames: Record<string, string> = {
  chinese: '语文',
  math: '数学',
  english: '英语',
}

const subjectIcons: Record<string, string> = {
  chinese: '📖',
  math: '🔢',
  english: '🔤',
}

export default function WrongBookPage() {
  const [questions, setQuestions] = useState<WrongQuestion[]>([])
  const [filter, setFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [aiExplanation, setAiExplanation] = useState<Record<string, string>>({})
  const [variantQuestion, setVariantQuestion] = useState<Record<string, any>>({})
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadQuestions()
  }, [filter])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const data = await learningAPI.getWrongQuestions(filter || undefined)
      setQuestions((data as any).questions)
    } catch (error) {
      console.error('Failed to load wrong questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await learningAPI.deleteWrongQuestion(id)
      setQuestions(questions.filter(q => q.id !== id))
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleExplain = async (q: WrongQuestion) => {
    setActionLoading({ ...actionLoading, [`explain_${q.id}`]: true })
    try {
      const data = await learningAPI.explainWrongQuestion(q.id, {
        question: q.question,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        subject: subjectNames[q.subject],
      })
      setAiExplanation({ ...aiExplanation, [q.id]: (data as any).explanation })
    } catch (error) {
      console.error('Failed to explain:', error)
    } finally {
      setActionLoading({ ...actionLoading, [`explain_${q.id}`]: false })
    }
  }

  const handleVariant = async (q: WrongQuestion) => {
    setActionLoading({ ...actionLoading, [`variant_${q.id}`]: true })
    try {
      const data = await learningAPI.generateVariant(q.id, {
        question: q.question,
        knowledgePoint: q.knowledgePoint,
        subject: subjectNames[q.subject],
      })
      setVariantQuestion({ ...variantQuestion, [q.id]: (data as any).question })
    } catch (error) {
      console.error('Failed to generate variant:', error)
    } finally {
      setActionLoading({ ...actionLoading, [`variant_${q.id}`]: false })
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-soft">📝</div>
          <p className="text-xes-gray">加载错题本...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <span className="text-4xl mr-4">📝</span>
          <div>
            <h1 className="text-2xl font-bold text-xes-dark">错题本</h1>
            <p className="text-xes-gray text-sm">共 {questions.length} 道错题</p>
          </div>
        </div>

        {/* 筛选 */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !filter ? 'bg-xes-primary text-white' : 'bg-white text-xes-gray hover:bg-xes-accent'
            }`}
          >
            全部
          </button>
          {Object.entries(subjectNames).map(([id, name]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === id ? 'bg-xes-primary text-white' : 'bg-white text-xes-gray hover:bg-xes-accent'
              }`}
            >
              {subjectIcons[id]} {name}
            </button>
          ))}
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-20 xes-card">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-xes-dark mb-2">太棒了！</h3>
          <p className="text-xes-gray">暂无错题，继续保持哦！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="xes-card overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              {/* Header */}
              <button
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <span className="text-2xl mr-4">{subjectIcons[q.subject]}</span>
                  <div className="text-left min-w-0">
                    <p className="font-medium text-xes-dark truncate">{q.question}</p>
                    <p className="text-sm text-xes-gray mt-1">
                      {q.lessonTitle} · {formatDate(q.createdAt)}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-xes-gray transition-transform flex-shrink-0 ml-4 ${expandedId === q.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Content */}
              {expandedId === q.id && (
                <div className="border-t px-6 py-4 bg-gray-50">
                  {/* 答案对比 */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-red-50 rounded-xl">
                      <p className="text-sm text-xes-gray mb-1">你的答案</p>
                      <p className="text-red-600 font-medium">{q.userAnswer}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-xes-gray mb-1">正确答案</p>
                      <p className="text-green-600 font-medium">{q.correctAnswer}</p>
                    </div>
                  </div>

                  {/* 解析 */}
                  <div className="p-4 bg-white rounded-xl mb-4">
                    <p className="text-sm font-medium text-xes-dark mb-2">💡 解题思路</p>
                    <p className="text-xes-gray">{q.explanation}</p>
                  </div>

                  {/* AI 讲解 */}
                  {aiExplanation[q.id] && (
                    <div className="p-4 bg-blue-50 rounded-xl mb-4">
                      <p className="text-sm font-medium text-blue-700 mb-2">🤖 AI老师讲解</p>
                      <p className="text-blue-900 whitespace-pre-wrap">{aiExplanation[q.id]}</p>
                    </div>
                  )}

                  {/* 变式练习 */}
                  {variantQuestion[q.id] && (
                    <div className="p-4 bg-purple-50 rounded-xl mb-4">
                      <p className="text-sm font-medium text-purple-700 mb-2">📝 变式练习</p>
                      <p className="text-purple-900 font-medium mb-2">{variantQuestion[q.id].question}</p>
                      {variantQuestion[q.id].options?.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {variantQuestion[q.id].options.map((opt: string, i: number) => (
                            <p key={i} className="text-purple-800">{String.fromCharCode(65 + i)}. {opt}</p>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-purple-600">
                        答案：{variantQuestion[q.id].answer}
                      </p>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleExplain(q)}
                      disabled={actionLoading[`explain_${q.id}`]}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {actionLoading[`explain_${q.id}`] ? (
                        <><span className="animate-spin mr-1">⏳</span> 讲解中...</>
                      ) : (
                        <>🤖 AI详细讲解</>
                      )}
                    </button>
                    <button
                      onClick={() => handleVariant(q)}
                      disabled={actionLoading[`variant_${q.id}`]}
                      className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {actionLoading[`variant_${q.id}`] ? (
                        <><span className="animate-spin mr-1">⏳</span> 生成中...</>
                      ) : (
                        <>📝 生成变式练习</>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="px-4 py-2 border border-gray-300 text-xes-gray rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      移除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
