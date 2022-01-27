import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/aggregate/user/user.repository';
import { UserEntity } from './user.entity';
import { User } from '../../domain/aggregate/user/user.type';
import { CreateUser } from '../../domain/usecase/user/dto/create-user';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  async read(userId: string): Promise<User> {
    return await UserEntity.findOne(userId);
  }

  async find(username: string): Promise<User> {
    return await UserEntity.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(createUser: CreateUser): Promise<void> {
    const userEntity = new UserEntity();
    userEntity.username = createUser.username;
    userEntity.avatar = createUser.avatar;
    userEntity.password = createUser.password;
    userEntity.email = createUser.email;
    userEntity.roles = createUser.roles;
    await userEntity.save();
  }
}
