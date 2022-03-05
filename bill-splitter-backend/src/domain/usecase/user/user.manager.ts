import { Injectable } from '@nestjs/common';
import { HashingService } from '../utils/hashing.service';
import { UserRepository } from '../../aggregate/user/user.repository';
import { CreateUser } from './dto/create-user';
import { Avatar } from '../../aggregate/user/avatar.enum';
import { UpdateUser } from './dto/update-user';
import { Role } from '../../aggregate/user/role.enum';

@Injectable()
export class UserManager {
  constructor(
    private hashingService: HashingService,
    private userRepository: UserRepository,
  ) {}

  public async saveUser(createUser: CreateUser): Promise<void> {
    createUser.avatar = Avatar.WOMAN_CURLY_HAIR;
    createUser.password = await this.hashingService.hashPassword(
      createUser.password,
    );
    createUser.roles.push(Role.USER);
    await this.userRepository.create(createUser);
  }

  public async checkPassword(
    username: string,
    password: string,
  ): Promise<boolean> {
    const hashedPassword = (await this.userRepository.find(username)).password;
    return await this.hashingService.comparePasswordHash(
      password,
      hashedPassword,
    );
  }

  public async update(userId: string, updateUser: UpdateUser): Promise<void> {
    await this.userRepository.update(userId, updateUser);
  }

  public async updateAvatar(userId: string, avatar: Avatar): Promise<void> {
    await this.userRepository.updateAvatar(userId, avatar);
  }

  public async updatePassword(userId: string, password: string): Promise<void> {
    const hashedPassword = await this.hashingService.hashPassword(password);
    await this.userRepository.updatePassword(userId, hashedPassword);
  }
}
