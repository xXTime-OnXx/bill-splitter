import { Injectable } from '@nestjs/common';
import { HashingService } from '../utils/hashing.service';
import { User } from '../../aggregate/user/user.type';
import { UserRepository } from '../../aggregate/user/user.repository';

@Injectable()
export class UserManager {
  constructor(
    private hashingService: HashingService,
    private userRepository: UserRepository,
  ) {}

  public async saveUser(user: User): Promise<void> {
    user.password = await this.hashingService.hashPassword(user.password);
    await this.userRepository.create(user);
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
