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
    const hashedPassword = await this.hashingService.hashPassword(
      user.password,
    );
  }

  public async checkPassword(user: User): Promise<boolean> {
    const hashedPassword = (await this.userRepository.find(user.username))
      .password;
    return await this.hashingService.comparePasswordHash(
      user.password,
      hashedPassword,
    );
  }
}
