import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { getTypeOrmConfig } from './config/typeorm.config';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
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
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
  // providers: [AppService, DogsService, ...databaseProviders]
})
class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); // https://docs.nestjs.com/middleware see difference usersage / apply / exclude , multiple middleware
  }
}

export { AppModule };
