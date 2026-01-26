import { Injectable } from '@nestjs/common';

export interface AnalyzeType {
  score: number
  status: string
}

@Injectable()
export class AnalysisService {
  analyze(text: string): AnalyzeType {

    return {
      score: 0,
      status: text
    }
  }
}
