import { Router } from 'express'
import { courses } from '../courses.js'

const router = Router()

// 获取所有课程
router.get('/', (_req, res) => {
  res.json(courses)
})

// 获取单个科目课程
router.get('/:subjectId', (req, res) => {
  const subject = courses.find(s => s.id === req.params.subjectId)
  if (!subject) {
    return res.status(404).json({ error: 'Subject not found' })
  }
  res.json(subject)
})

export default router
