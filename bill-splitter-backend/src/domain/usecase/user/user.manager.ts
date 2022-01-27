import { Injectable } from '@nestjs/common';
import { HashingService } from '../utils/hashing.service';
import { UserRepository } from '../../aggregate/user/user.repository';
import { CreateUser } from './dto/create-user';
import { Avatar } from '../../aggregate/user/avatar.enum';

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
}
