import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pour la demo
  app.enableCors({
    origin: "http://localhost:5173", // ou l’URL exacte de ton front
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
