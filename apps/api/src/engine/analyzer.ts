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

  return {
    status: 'ok',
    score
  }
}
