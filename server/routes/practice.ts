import { Router } from 'express'
import { generateQuestions, gradeAnswer } from '../services/aiService.js'
import { addPracticeRecord, addWrongQuestion } from '../db/index.js'

const router = Router()

// 生成练习题
router.post('/generate', async (req, res) => {
  try {
    const { subject, lessonTitle, knowledgePoints, count } = req.body
    
    if (!subject || !lessonTitle || !knowledgePoints) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const questions = await generateQuestions(subject, lessonTitle, knowledgePoints, count || 5)
    res.json({ questions })
  } catch (error) {
    console.error('Generate questions error:', error)
    res.status(500).json({ error: 'Failed to generate questions' })
  }
})

// 提交答案并批改
router.post('/submit', async (req, res) => {
  try {
    const { 
      subject, 
      lessonId, 
      lessonTitle, 
      questions, 
      answers 
    } = req.body

    if (!questions || !answers) {
      return res.status(400).json({ error: 'Missing questions or answers' })
    }

    const results = []
    let correctCount = 0

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      const userAnswer = answers[i] || ''
      
      const result = await gradeAnswer(q.question, userAnswer, q.answer, q.explanation)
      
      if (result.correct) {
        correctCount++
      } else {
        // 自动加入错题本
        addWrongQuestion({
          subject,
          lessonId,
          lessonTitle,
          question: q.question,
          options: q.options || [],
          userAnswer,
          correctAnswer: q.answer,
          explanation: q.explanation,
          knowledgePoint: q.knowledgePoint || '',
        })
      }

      results.push({
        questionIndex: i,
        question: q.question,
        userAnswer,
        correctAnswer: q.answer,
        correct: result.correct,
        score: result.score,
        comment: result.comment,
        explanation: q.explanation,
      })
    }

    const score = Math.round((correctCount / questions.length) * 100)

    // 保存练习记录
    addPracticeRecord({
      subject,
      lessonId,
      lessonTitle,
      totalQuestions: questions.length,
      correctCount,
      score,
    })

    res.json({
      score,
      correctCount,
      totalQuestions: questions.length,
      results,
    })
  } catch (error) {
    console.error('Submit practice error:', error)
    res.status(500).json({ error: 'Failed to submit practice' })
  }
})

export default router
