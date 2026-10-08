import { Router } from 'express'
import { getStats, getPracticeRecords, getStudyRecords } from '../db/index.js'

const router = Router()

// 获取学习统计
router.get('/', (_req, res) => {
  const stats = getStats()
  res.json(stats)
})

// 获取练习记录
router.get('/practices', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20
  const records = getPracticeRecords(limit)
  res.json({ records })
})

// 获取学习记录
router.get('/study', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 50
  const records = getStudyRecords(limit)
  res.json({ records })
})

export default router
