import { Body, Controller, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('api')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) { }

  @Post('analyze')
  analyze(@Body('text') text: string) {
    return this.analysisService.analyze(text)
  }

}
