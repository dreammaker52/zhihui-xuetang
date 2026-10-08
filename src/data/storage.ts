import type { WrongQuestion, Stats, StudyRecord } from '../types'

const STORAGE_KEY = 'xuexi_wrong_book'
const STUDY_KEY = 'xuexi_study_records'
const PRACTICE_KEY = 'xuexi_practice_records'

// 错题本操作
export function getWrongQuestions(subject?: string): WrongQuestion[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const questions: WrongQuestion[] = data ? JSON.parse(data) : []
    if (subject) {
      return questions.filter(q => q.subject === subject)
    }
    return questions.sort((a, b) => b.createdAt - a.createdAt)
  } catch {
    return []
  }
}

export function addWrongQuestion(q: Omit<WrongQuestion, 'id' | 'createdAt'>): void {
  try {
    const questions = getWrongQuestions()
    const newQ: WrongQuestion = {
      ...q,
      id: Date.now().toString(),
      createdAt: Date.now(),
    }
    questions.push(newQ)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
  } catch (e) {
    console.error('Failed to save wrong question:', e)
  }
}

export function deleteWrongQuestion(id: string): void {
  try {
    const questions = getWrongQuestions().filter(q => q.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
  } catch (e) {
    console.error('Failed to delete wrong question:', e)
  }
}

// 学习记录
export function addStudyRecord(record: Omit<StudyRecord, 'id' | 'createdAt'>): void {
  try {
    const data = localStorage.getItem(STUDY_KEY)
    const records: StudyRecord[] = data ? JSON.parse(data) : []
    records.push({ ...record, id: Date.now().toString(), createdAt: Date.now() })
    localStorage.setItem(STUDY_KEY, JSON.stringify(records))
  } catch (e) {
    console.error('Failed to save study record:', e)
  }
}

export function getStudyRecords(limit?: number): StudyRecord[] {
  try {
    const data = localStorage.getItem(STUDY_KEY)
    let records: StudyRecord[] = data ? JSON.parse(data) : []
    records = records.sort((a, b) => b.createdAt - a.createdAt)
    return limit ? records.slice(0, limit) : records
  } catch {
    return []
  }
}

// 练习记录
export function addPracticeRecord(record: {
  subject: string
  lessonId: string
  lessonTitle: string
  score: number
  correctCount: number
  totalQuestions: number
}): void {
  try {
    const data = localStorage.getItem(PRACTICE_KEY)
    const records = data ? JSON.parse(data) : []
    records.push({
      ...record,
      id: Date.now().toString(),
      createdAt: Date.now(),
    })
    localStorage.setItem(PRACTICE_KEY, JSON.stringify(records))
  } catch (e) {
    console.error('Failed to save practice record:', e)
  }
}

export function getPracticeRecords(limit?: number): any[] {
  try {
    const data = localStorage.getItem(PRACTICE_KEY)
    let records = data ? JSON.parse(data) : []
    records = records.sort((a: any, b: any) => b.createdAt - a.createdAt)
    return limit ? records.slice(0, limit) : records
  } catch {
    return []
  }
}

// 统计
export function getStats(): Stats {
  const practices = getPracticeRecords()
  const wrongQuestions = getWrongQuestions()

  const totalPractices = practices.length
  const totalQuestions = practices.reduce((sum: number, r: any) => sum + r.totalQuestions, 0)
  const totalCorrect = practices.reduce((sum: number, r: any) => sum + r.correctCount, 0)
  const correctRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  const avgScore = totalPractices > 0 ? Math.round(practices.reduce((sum: number, r: any) => sum + r.score, 0) / totalPractices) : 0

  return {
    totalPractices,
    totalQuestions,
    totalCorrect,
    correctRate,
    avgScore,
    wrongCount: wrongQuestions.length,
  }
}
