import type { Subject, Question, PracticeResult, WrongQuestion, Stats, StudyRecord } from '../types'
import { coursesData } from '../data/courses'
import {
  mockGenerateQuestions,
  mockGradeQuestions,
  mockExplain,
  mockGenerateVariant,
  mockChat,
} from '../data/mockAI'
import * as store from '../data/storage'

// 开发环境由 Vite 代理到 http://localhost:3001，生产环境由后端直接托管静态文件
// 静态部署模式（GitHub Pages）：构建时设置 VITE_STATIC_MODE=1，全部走本地数据，无需后端
const STATIC_MODE = import.meta.env.VITE_STATIC_MODE === '1'
const API_BASE = '/api'

// 科目中文名转 key（错题本/答疑页面传入的是中文科目名）
const subjectKey = (name: string) =>
  ({ '语文': 'chinese', '数学': 'math', '英语': 'english' } as Record<string, string>)[name] || name

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${path} failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<T>
}

export const learningAPI = {
  // 课程
  getCourses: () =>
    STATIC_MODE
      ? Promise.resolve(coursesData)
      : request<Subject[]>('/courses'),

  getCourse: (subjectId: string) =>
    STATIC_MODE
      ? Promise.resolve(coursesData.find(s => s.id === subjectId) as Subject)
      : request<Subject>(`/courses/${subjectId}`),

  // 练习
  generateQuestions: (data: {
    subject: string
    lessonTitle: string
    knowledgePoints: string[]
    count?: number
  }): Promise<{ questions: Question[] }> => {
    if (STATIC_MODE) {
      return mockGenerateQuestions(data.subject, data.lessonTitle, data.knowledgePoints, data.count || 5)
        .then(questions => ({ questions }))
    }
    return request<{ questions: Question[] }>('/practice/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  submitPractice: (data: {
    subject: string
    lessonId: string
    lessonTitle: string
    questions: any[]
    answers: string[]
    knowledgePoints?: string[]
  }): Promise<{
    score: number
    correctCount: number
    totalQuestions: number
    results: PracticeResult[]
  }> => {
    if (STATIC_MODE) {
      return mockGradeQuestions(data.questions, data.answers).then(result => {
        // 错题自动存入本地错题本，并记录练习记录
        const kp = data.knowledgePoints?.[0] || data.lessonTitle
        result.results.forEach((r: PracticeResult) => {
          if (!r.correct) {
            store.addWrongQuestion({
              subject: data.subject,
              lessonId: data.lessonId,
              lessonTitle: data.lessonTitle,
              question: r.question,
              options: data.questions[r.questionIndex]?.options || [],
              userAnswer: r.userAnswer,
              correctAnswer: r.correctAnswer,
              explanation: r.explanation,
              knowledgePoint: kp,
            })
          }
        })
        store.addPracticeRecord({
          subject: data.subject,
          lessonId: data.lessonId,
          lessonTitle: data.lessonTitle,
          score: result.score,
          correctCount: result.correctCount,
          totalQuestions: result.totalQuestions,
        })
        return result
      })
    }
    return request<{
      score: number
      correctCount: number
      totalQuestions: number
      results: PracticeResult[]
    }>('/practice/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // 错题本
  getWrongQuestions: (subject?: string): Promise<{ questions: WrongQuestion[] }> =>
    STATIC_MODE
      ? Promise.resolve({ questions: store.getWrongQuestions(subject) })
      : request<{ questions: WrongQuestion[] }>(`/wrong-book${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`),

  deleteWrongQuestion: (id: string): Promise<{ success: boolean }> => {
    if (STATIC_MODE) {
      store.deleteWrongQuestion(id)
      return Promise.resolve({ success: true })
    }
    return request<{ success: boolean }>(`/wrong-book/${id}`, { method: 'DELETE' })
  },

  explainWrongQuestion: (
    id: string,
    body: { question: string; correctAnswer: string; explanation: string; subject: string }
  ): Promise<{ explanation: string }> => {
    if (STATIC_MODE) {
      return mockExplain(body.question, body.correctAnswer, body.explanation, subjectKey(body.subject))
        .then(explanation => ({ explanation }))
    }
    return request<{ explanation: string }>(`/wrong-book/${id}/explain`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  generateVariant: (id: string, body: { question: string; knowledgePoint: string; subject: string }): Promise<{ question: Question }> => {
    if (STATIC_MODE) {
      return mockGenerateVariant(body.question, body.knowledgePoint, subjectKey(body.subject))
    }
    return request<{ question: Question }>(`/wrong-book/${id}/variant`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  // AI答疑
  chat: (question: string, subject: string): Promise<{ answer: string }> => {
    if (STATIC_MODE) {
      return mockChat(question, subjectKey(subject)).then(answer => ({ answer }))
    }
    return request<{ answer: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ question, subject }),
    })
  },

  // 记录学习行为
  recordStudy: (data: { subject: string; lessonId: string; lessonTitle: string; action: string }): Promise<{ success: boolean }> => {
    if (STATIC_MODE) {
      store.addStudyRecord(data)
      return Promise.resolve({ success: true })
    }
    return request<{ success: boolean }>('/ai/study', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // 统计
  getStats: (): Promise<Stats> =>
    STATIC_MODE
      ? Promise.resolve(store.getStats())
      : request<Stats>('/stats'),

  getPracticeRecords: (limit = 20): Promise<{ records: any[] }> =>
    STATIC_MODE
      ? Promise.resolve({ records: store.getPracticeRecords(limit) })
      : request<{ records: any[] }>(`/stats/practices?limit=${limit}`),

  getStudyRecords: (limit = 50): Promise<{ records: StudyRecord[] }> =>
    STATIC_MODE
      ? Promise.resolve({ records: store.getStudyRecords(limit) })
      : request<{ records: StudyRecord[] }>(`/stats/study?limit=${limit}`),
}
