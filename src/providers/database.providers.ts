import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.databaseName'), // ensure database key is present
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`], // import all "model" in /entity or do [USer, Company , ...]
        // synchronize: true, // not for production
        logging: false,
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        subscribers: []
      });

      return dataSource
        .initialize()
        .then(() => {
          console.log('TYORM CONNECTION DATABASE SUCCESS ');
        })
        .catch((error) => {
          console.log('TYORM CONNECTION DATABASE FAIL ');

          console.log(error);
        });
    },
    // Inject ConfigService into the factory function
    inject: [ConfigService]
  }
];

// get an environment variable
// const dbUser = this.configService.get<string>('DATABASE_USER');
