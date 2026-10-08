import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { learningAPI } from '../api/learning'
import type { Question, PracticeResult } from '../types'

export default function PracticePage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [searchParams] = useSearchParams()
  
  const subject = searchParams.get('subject') || ''
  const lessonTitle = searchParams.get('lessonTitle') || ''
  const knowledgePoints = JSON.parse(searchParams.get('knowledgePoints') || '[]') as string[]

  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{
    score: number
    correctCount: number
    totalQuestions: number
    results: PracticeResult[]
  } | null>(null)
  const [error, setError] = useState('')

  const generateQuestions = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await learningAPI.generateQuestions({
        subject,
        lessonTitle,
        knowledgePoints,
        count: 5,
      })
      setQuestions((data as any).questions || data as any)
      setAnswers(new Array(((data as any).questions || data as any).length).fill(''))
    } catch (err) {
      setError('生成题目失败，请重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [subject, lessonTitle, knowledgePoints])

  useEffect(() => {
    generateQuestions()
  }, [generateQuestions])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const data = await learningAPI.submitPractice({
        subject,
        lessonId: lessonId!,
        lessonTitle,
        questions,
        answers,
      })
      setResult(data as any)
    } catch (err) {
      setError('提交失败，请重试')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'single_choice': return '单选题'
      case 'true_false': return '判断题'
      case 'fill_blank': return '填空题'
      default: return type
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse-soft">🤖</div>
          <p className="text-lg text-xes-dark font-medium">AI老师正在出题...</p>
          <p className="text-xes-gray mt-2">根据"{lessonTitle}"的知识点定制练习题</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😢</div>
        <p className="text-lg text-xes-dark mb-4">{error}</p>
        <button onClick={generateQuestions} className="xes-btn">
          重新生成
        </button>
      </div>
    )
  }

  // 结果页面
  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-6xl mb-4">
            {result.score >= 80 ? '🎉' : result.score >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-xes-dark mb-2">
            练习完成！
          </h2>
          <div className="text-5xl font-bold text-xes-primary mb-2">{result.score}分</div>
          <p className="text-xes-gray">
            答对 {result.correctCount} / {result.totalQuestions} 题
          </p>
        </div>

        {/* 题目回顾 */}
        <div className="space-y-6 mb-8">
          {result.results.map((r, index) => (
            <div key={index} className={`xes-card p-6 ${r.correct ? 'border-l-4 border-xes-success' : 'border-l-4 border-xes-error'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-xes-accent flex items-center justify-center text-xes-primary font-bold mr-3">
                    {index + 1}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {r.correct ? '✓ 正确' : '✗ 错误'}
                  </span>
                </div>
                <span className="text-sm text-xes-gray">{r.score}分</span>
              </div>

              <p className="text-lg text-xes-dark mb-4">{r.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-xes-gray">你的答案：</span>
                  <span className={r.correct ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {r.userAnswer || '未作答'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <span className="text-sm text-xes-gray">正确答案：</span>
                  <span className="text-green-600 font-medium">{r.correctAnswer}</span>
                </div>
              </div>

              {!r.correct && (
                <div className="p-4 rounded-xl bg-xes-accent">
                  <p className="text-sm font-medium text-xes-dark mb-2">💡 解题方法：</p>
                  <p className="text-xes-gray">{r.explanation}</p>
                </div>
              )}

              <p className="text-sm text-xes-gray mt-3 italic">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/subject/${subject}`} className="xes-btn-secondary text-center">
            返回课程
          </Link>
          <button onClick={generateQuestions} className="xes-btn">
            再练一组
          </button>
          <Link to="/wrong-book" className="xes-btn-secondary text-center">
            查看错题本
          </Link>
        </div>
      </div>
    )
  }

  // 答题页面
  const q = questions[currentQuestion]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-xes-gray mb-2">
          <span>{lessonTitle}</span>
          <span>{currentQuestion + 1} / {questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-xes-primary to-xes-secondary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 题目卡片 */}
      <div className="xes-card p-6 mb-6 animate-fade-in">
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 bg-xes-primary text-white text-sm rounded-full">
            {getQuestionTypeLabel(q.type)}
          </span>
        </div>

        <h3 className="text-xl font-medium text-xes-dark mb-6 leading-relaxed">
          {q.question}
        </h3>

        {/* 选项 */}
        <div className="space-y-3">
          {q.type === 'fill_blank' ? (
            <input
              type="text"
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="请输入答案"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-xes-primary focus:outline-none text-lg"
            />
          ) : (
            q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  answers[currentQuestion] === option
                    ? 'bg-xes-primary text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-xes-accent text-xes-dark'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))
          )}
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-full border-2 border-gray-200 text-xes-gray disabled:opacity-50 disabled:cursor-not-allowed hover:border-xes-primary hover:text-xes-primary transition-all"
        >
          上一题
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || answers.some(a => !a)}
            className="xes-btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {submitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                提交中...
              </>
            ) : (
              '提交答案'
            )}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            className="px-6 py-3 rounded-full bg-xes-primary text-white hover:bg-xes-secondary transition-all"
          >
            下一题
          </button>
        )}
      </div>

      {/* 题目导航 */}
      <div className="mt-8 flex justify-center gap-2 flex-wrap">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-10 h-10 rounded-full font-medium transition-all ${
              index === currentQuestion
                ? 'bg-xes-primary text-white'
                : answers[index]
                ? 'bg-xes-accent text-xes-primary'
                : 'bg-gray-200 text-xes-gray'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
