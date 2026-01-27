import { rules } from "./rules"

export interface AnalysisType {
  status: "ok" | "error"
  score: number
}

export function analyzer(text: string): AnalysisType {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return {
      status: 'error',
      score: 0
    }
  }

  let score = 50 // init score

  // Apply all rules from index
  for (const rule of rules) {
    const delta = rule(text)
    score += delta
  }

  // Borner le score entre 0 et 100
  score = Math.max(0, Math.min(100, score))

  return {
    status: 'ok',
    score
  }
}
