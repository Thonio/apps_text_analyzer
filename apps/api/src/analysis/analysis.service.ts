import { Injectable } from '@nestjs/common';
import { analyzer } from 'src/engine/analyzer';

export interface AnalyzeType {
  score: number
  status: string
}

@Injectable()
export class AnalysisService {
  analyze(text: string): AnalyzeType {
    const result: AnalyzeType = analyzer(text)

    return result
  }
}
