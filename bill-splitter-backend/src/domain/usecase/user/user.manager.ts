import { Injectable } from '@nestjs/common';
import { HashingService } from '../utils/hashing.service';
import { User } from '../../aggregate/user/user.type';

@Injectable()
export class UserManager {
  constructor(private hashingService: HashingService) {}

  public async saveUser(user: User): Promise<void> {
    const hashedPassword = await this.hashingService.hashPassword(
      user.password,
    );
  }

  public async checkPassword(user: User): Promise<boolean> {
    // TODO: get hashed password of user
    return await this.hashingService.comparePasswordHash(user.password);
  }
}
