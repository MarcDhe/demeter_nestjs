import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const getTypeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port') || 5432, // Default to 5432 if not specified
  username: configService.get<string>('database.username'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.databaseName'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`] // Load entities
  // synchronize: true // Enable schema synchronization (disable in production)
});

export default getTypeOrmConfig;
