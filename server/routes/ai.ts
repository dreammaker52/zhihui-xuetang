import { Router } from 'express'
import { chatWithAI } from '../services/aiService.js'
import { addStudyRecord } from '../db/index.js'

const router = Router()

// AI答疑
router.post('/chat', async (req, res) => {
  try {
    const { question, subject } = req.body
    
    if (!question || !subject) {
      return res.status(400).json({ error: 'Missing question or subject' })
    }

    const answer = await chatWithAI(question, subject)
    res.json({ answer })
  } catch (error) {
    console.error('AI chat error:', error)
    res.status(500).json({ error: 'Failed to get answer' })
  }
})

// 记录学习行为
router.post('/study', (req, res) => {
  try {
    const { subject, lessonId, lessonTitle, action } = req.body
    addStudyRecord({ subject, lessonId, lessonTitle, action })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to record' })
  }
})

export default router
