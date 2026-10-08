import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { initDb } from './db/index.js'
import coursesRouter from './routes/courses.js'
import practiceRouter from './routes/practice.js'
import wrongBookRouter from './routes/wrongBook.js'
import aiRouter from './routes/ai.js'
import statsRouter from './routes/stats.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Initialize database
initDb()

// API routes
app.use('/api/courses', coursesRouter)
app.use('/api/practice', practiceRouter)
app.use('/api/wrong-book', wrongBookRouter)
app.use('/api/ai', aiRouter)
app.use('/api/stats', statsRouter)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // 兼容 tsx 直接运行（server/）和编译后运行（dist/server/）两种布局
  const clientDist = [
    path.join(__dirname, '../dist/client'),
    path.join(__dirname, '../client'),
    path.join(process.cwd(), 'dist/client'),
  ].find(p => fs.existsSync(path.join(p, 'index.html')))

  if (clientDist) {
    app.use(express.static(clientDist))
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'))
    })
    console.log(`Serving static files from ${clientDist}`)
  } else {
    console.warn('Static client build not found, run `npm run build` first')
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
