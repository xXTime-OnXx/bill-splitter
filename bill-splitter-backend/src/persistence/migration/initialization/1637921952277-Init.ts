import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1637921952277 implements MigrationInterface {
  name = 'Init1637921952277';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
