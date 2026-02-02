import express from 'express'
import { analyzeText } from '../engine/analyzer'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.post('/analyze', (req, res) => {
  const { text } = req.body

  const result = analyzeText(text)

  if (result.status === 'error') {
    return res.status(400).json(result)
  }

  return res.json(result)
})

app.get('/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Analyzer microservice running on port ${PORT}`)
})
