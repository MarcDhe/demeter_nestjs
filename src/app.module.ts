import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import getTypeOrmConfig from './config/typeorm.config';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsService } from './dogs/dogs.service';
import { DogsModule } from './dogs/dogs.module';
// import { databaseProviders } from './providers/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      inject: [ConfigService], // Inject ConfigService into useFactory
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService) // Use the exported function
    }),
    CatsModule,
    DogsModule
  ],
  controllers: [AppController],
  providers: [AppService, DogsService]
  // providers: [AppService, DogsService, ...databaseProviders]
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); // https://docs.nestjs.com/middleware see difference usersage / apply / exclude , multiple middleware
  }
}

export { AppModule };
