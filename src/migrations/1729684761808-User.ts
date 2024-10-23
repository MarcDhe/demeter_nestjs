import { MigrationInterface, QueryRunner, Table } from 'typeorm';
// https://docs.nestjs.com/techniques/database#migrations
export class User1729684761808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'firstName',
            type: 'varchar'
          },
          {
            name: 'lastName',
            type: 'varchar'
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
