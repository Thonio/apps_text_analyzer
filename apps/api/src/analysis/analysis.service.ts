import { Injectable } from '@nestjs/common';
import { AnalysisResult } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface AnalyzeType {
  score: number
  status: string
}

@Injectable()
export class AnalysisService {
  constructor(
    private prismaService: PrismaService,
    private readonly http: HttpService
  ) { }
  async analyze(text: string): Promise<AnalyzeType> {
    const result: any = await firstValueFrom(
      this.http.post('http://localhost:4000/analyze', {
        text
      })
    )

    // Persist result in database
    await this.prismaService.analysisResult.create({
      data: {
        score: result.data.score,
        status: result.data.status,
        text
      }
    })

    return result.data
  }

  async history(): Promise<AnalysisResult[]> {
    return await this.prismaService.analysisResult.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
