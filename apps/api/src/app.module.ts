import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisController } from './analysis/analysis.controller';
import { AnalysisService } from './analysis/analysis.service';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    HttpModule
  ],
  controllers: [AppController, AnalysisController],
  providers: [AppService, AnalysisService, PrismaService],
})
export class AppModule { }
