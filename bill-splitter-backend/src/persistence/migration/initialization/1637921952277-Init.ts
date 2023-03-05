import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { Avatar } from '../../../domain/aggregate/user/avatar.enum';
import {GroupEntity} from "../../group/group.entity";

export class Init1637921952277 implements MigrationInterface {
  name = 'Init1637921952277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = new UserEntity();
    admin.username = 'admin';
    admin.avatar = Avatar.MAN_BEARD;
    admin.email = 'admin@admin.com';
    admin.password =
      '$2b$10$G/dUB.8WO7W5emNqOZarOuYlkmHF9sdx7tsWQJjFmUwDTvd4WsZ8y';
    admin.roles = [Role.USER, Role.ADMIN];
    await admin.save();

    const group = new GroupEntity();
    group.name = "Summer Trip";
    group.description = "Hawaii & Mexico"
    group.users = [admin]
    await group.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return Promise.resolve();
  }
}
