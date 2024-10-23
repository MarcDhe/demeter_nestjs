import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

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
