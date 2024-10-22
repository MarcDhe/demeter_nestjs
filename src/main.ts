import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // default controller cf pegasus /!\ The useGlobalFilters() method does not set up filters for gateways or hybrid applications.
  // app.use(logger); // https://docs.nestjs.com/techniques/logger
  await app.listen(3000);
}
bootstrap();

// db conneciton / ORM
// logger => https://docs.nestjs.com/techniques/logger
// swagger
// creation model et table
// middleware => OK
