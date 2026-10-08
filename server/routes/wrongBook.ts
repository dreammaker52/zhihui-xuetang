import { Router } from 'express'
import { getWrongQuestions, deleteWrongQuestion } from '../db/index.js'
import { explainQuestion, generateVariantQuestion } from '../services/aiService.js'

const router = Router()

// 获取错题列表
router.get('/', (req, res) => {
  const subject = req.query.subject as string | undefined
  const questions = getWrongQuestions(subject)
  res.json({ questions })
})

// 删除错题
router.delete('/:id', (req, res) => {
  try {
    deleteWrongQuestion(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' })
  }
})

// AI讲解错题
router.post('/:id/explain', async (req, res) => {
  try {
    const { question, correctAnswer, explanation, subject } = req.body
    const aiExplanation = await explainQuestion(question, correctAnswer, explanation, subject)
    res.json({ explanation: aiExplanation })
  } catch (error) {
    console.error('Explain error:', error)
    res.status(500).json({ error: 'Failed to explain' })
  }
})

// 生成变式练习
router.post('/:id/variant', async (req, res) => {
  try {
    const { question, knowledgePoint, subject } = req.body
    const variant = await generateVariantQuestion(question, knowledgePoint, subject)
    res.json({ question: variant })
  } catch (error) {
    console.error('Variant error:', error)
    res.status(500).json({ error: 'Failed to generate variant' })
  }
})

export default router
