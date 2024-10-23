import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule] // for make it reusable everywhere without import like TypeOrmModule.forFeature([User])]
})
class UsersModule implements NestModule {
  // apply only on this module
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

export { UsersModule };
