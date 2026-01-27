import { Injectable } from '@nestjs/common';
import { AnalysisResult } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { analyzer } from 'src/engine/analyzer';

export interface AnalyzeType {
  score: number
  status: string
}

@Injectable()
export class AnalysisService {
  constructor(
    private prismaService: PrismaService
  ) { }
  async analyze(text: string): Promise<AnalyzeType> {
    const result: AnalyzeType = analyzer(text)

    // Persist result in database
    await this.prismaService.analysisResult.create({
      data: {
        score: result.score,
        status: result.status,
        text
      }
    })

    return result
  }

  async history(): Promise<AnalysisResult[]> {
    return await this.prismaService.analysisResult.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
