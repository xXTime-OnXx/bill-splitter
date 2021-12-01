import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/aggregate/user/user.repository';
import { UserEntity } from './user.entity';
import { User } from '../../domain/aggregate/user/user.type';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  async find(username: string): Promise<User> {
    return await UserEntity.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(user: User): Promise<void> {
    const userEntity = new UserEntity();
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.email = user.email;
    userEntity.roles = user.roles;
    await userEntity.save();
  }
}
