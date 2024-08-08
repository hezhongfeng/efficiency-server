import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from './pipe/validation.pipe';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
