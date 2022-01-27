import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { Avatar } from '../../../domain/aggregate/user/avatar.enum';

export class Init1637921952277 implements MigrationInterface {
  name = 'Init1637921952277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = new UserEntity();
    admin.username = 'admin';
    admin.avatar = Avatar.MAN_BEARD;
    admin.email = 'admin@admin.com';
    admin.password =
      '$2b$10$zP5r1ohKRf7holpv0NLlOeh7S.wHUw/AEs0TFYC6mBdIvu6mpWlu2';
    admin.roles = [Role.USER, Role.ADMIN];
    await admin.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return Promise.resolve();
  }
}
