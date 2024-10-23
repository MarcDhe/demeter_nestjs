import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'demeter_db',
  port: 5432,
  username: 'app_user',
  password: 'password',
  database: 'demeter',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`], // Load entities
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: []
});
