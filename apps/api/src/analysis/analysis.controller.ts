import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('api')
export class AnalysisController {
  constructor(
    private readonly analysisService: AnalysisService,
  ) { }

  @Post('analyze')
  analyze(@Body('text') text: string) {
    return this.analysisService.analyze(text)
  }

  @Get('history')
  history() {
    return this.analysisService.history()
  }

}
