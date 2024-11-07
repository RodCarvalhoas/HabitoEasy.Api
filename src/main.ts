import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:3001' } });

    await app.listen(process.env.PORT, () => {
    console.log(`Starting on PORT: ${process.env.PORT}`);
  });
}
bootstrap();
