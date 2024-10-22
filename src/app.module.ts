import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsService } from './dogs/dogs.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', load: [configuration] }),
    CatsModule,
    DogsModule
  ],
  controllers: [AppController],
  providers: [AppService, DogsService]
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); // https://docs.nestjs.com/middleware see difference usersage / apply / exclude , multiple middleware
  }
}

export { AppModule };
