import { rules } from '../rules'
import type { AnalysisResult } from '../types/analysis-result.type'

export function analyzeText(text: string): AnalysisResult {
  if (!text || typeof text !== 'string') {
    return {
      status: 'error',
      score: 0,
    }
  }

  let score = 50

  for (const rule of rules) {
    score += rule(text)
  }

  score = Math.max(0, Math.min(100, score))

  return {
    status: 'ok',
    score
  }
}
