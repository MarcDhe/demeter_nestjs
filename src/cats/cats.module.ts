import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [ConfigModule]
})
class CatsModule implements NestModule {
  // apply only on this module
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}

export { CatsModule };
