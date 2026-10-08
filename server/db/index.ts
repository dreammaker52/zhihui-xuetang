import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let db: Database.Database

export function initDb() {
  const dbPath = path.join(__dirname, '../../data.db')
  db = new Database(dbPath)

  // 错题本
  db.exec(`
    CREATE TABLE IF NOT EXISTS wrong_questions (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      lesson_title TEXT NOT NULL,
      question TEXT NOT NULL,
      options TEXT,
      user_answer TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      knowledge_point TEXT,
      created_at INTEGER NOT NULL
    );
  `)

  // 练习记录
  db.exec(`
    CREATE TABLE IF NOT EXISTS practice_records (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      lesson_title TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      score INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
  `)

  // 学习记录（观看课程）
  db.exec(`
    CREATE TABLE IF NOT EXISTS study_records (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      lesson_title TEXT NOT NULL,
      action TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `)

  console.log('Database initialized')
}

export function getDb(): Database.Database {
  return db
}

export function generateId() {
  return uuidv4()
}

// ========== 错题本操作 ==========

export interface WrongQuestion {
  id: string
  subject: string
  lessonId: string
  lessonTitle: string
  question: string
  options: string[]
  userAnswer: string
  correctAnswer: string
  explanation: string
  knowledgePoint: string
  createdAt: number
}

export function addWrongQuestion(data: Omit<WrongQuestion, 'id' | 'createdAt'>) {
  const id = generateId()
  const now = Date.now()
  db.prepare(`
    INSERT INTO wrong_questions (id, subject, lesson_id, lesson_title, question, options, user_answer, correct_answer, explanation, knowledge_point, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.subject,
    data.lessonId,
    data.lessonTitle,
    data.question,
    JSON.stringify(data.options),
    data.userAnswer,
    data.correctAnswer,
    data.explanation,
    data.knowledgePoint || '',
    now
  )
  return { id, createdAt: now }
}

export function getWrongQuestions(subject?: string) {
  let query = 'SELECT * FROM wrong_questions ORDER BY created_at DESC'
  let rows: any[]
  
  if (subject) {
    query = 'SELECT * FROM wrong_questions WHERE subject = ? ORDER BY created_at DESC'
    rows = db.prepare(query).all(subject)
  } else {
    rows = db.prepare(query).all()
  }

  return rows.map(row => ({
    id: row.id,
    subject: row.subject,
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    question: row.question,
    options: row.options ? JSON.parse(row.options) : [],
    userAnswer: row.user_answer,
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
    knowledgePoint: row.knowledge_point,
    createdAt: row.created_at,
  }))
}

export function deleteWrongQuestion(id: string) {
  db.prepare('DELETE FROM wrong_questions WHERE id = ?').run(id)
}

export function getWrongQuestionCount() {
  const result = db.prepare('SELECT COUNT(*) as count FROM wrong_questions').get() as any
  return result.count
}

// ========== 练习记录操作 ==========

export interface PracticeRecord {
  id: string
  subject: string
  lessonId: string
  lessonTitle: string
  totalQuestions: number
  correctCount: number
  score: number
  createdAt: number
}

export function addPracticeRecord(data: Omit<PracticeRecord, 'id' | 'createdAt'>) {
  const id = generateId()
  const now = Date.now()
  db.prepare(`
    INSERT INTO practice_records (id, subject, lesson_id, lesson_title, total_questions, correct_count, score, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.subject,
    data.lessonId,
    data.lessonTitle,
    data.totalQuestions,
    data.correctCount,
    data.score,
    now
  )
  return { id, createdAt: now }
}

export function getPracticeRecords(limit = 20) {
  const rows = db.prepare('SELECT * FROM practice_records ORDER BY created_at DESC LIMIT ?').all(limit)
  return rows.map((row: any) => ({
    id: row.id,
    subject: row.subject,
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    totalQuestions: row.total_questions,
    correctCount: row.correct_count,
    score: row.score,
    createdAt: row.created_at,
  }))
}

export function getStats() {
  const totalPractices = db.prepare('SELECT COUNT(*) as count FROM practice_records').get() as any
  const totalQuestions = db.prepare('SELECT SUM(total_questions) as total FROM practice_records').get() as any
  const totalCorrect = db.prepare('SELECT SUM(correct_count) as total FROM practice_records').get() as any
  const avgScore = db.prepare('SELECT AVG(score) as avg FROM practice_records').get() as any
  const wrongCount = getWrongQuestionCount()

  return {
    totalPractices: totalPractices.count || 0,
    totalQuestions: totalQuestions.total || 0,
    totalCorrect: totalCorrect.total || 0,
    correctRate: totalQuestions.total ? Math.round((totalCorrect.total / totalQuestions.total) * 100) : 0,
    avgScore: Math.round(avgScore.avg || 0),
    wrongCount,
  }
}

// ========== 学习记录操作 ==========

export function addStudyRecord(data: {
  subject: string
  lessonId: string
  lessonTitle: string
  action: string
}) {
  const id = generateId()
  const now = Date.now()
  db.prepare(`
    INSERT INTO study_records (id, subject, lesson_id, lesson_title, action, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, data.subject, data.lessonId, data.lessonTitle, data.action, now)
  return { id, createdAt: now }
}

export function getStudyRecords(limit = 50) {
  const rows = db.prepare('SELECT * FROM study_records ORDER BY created_at DESC LIMIT ?').all(limit)
  return rows.map((row: any) => ({
    id: row.id,
    subject: row.subject,
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    action: row.action,
    createdAt: row.created_at,
  }))
}
