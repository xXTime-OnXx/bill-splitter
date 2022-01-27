import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../aggregate/user/user.repository';
import { User } from '../../aggregate/user/user.type';
import { UiUser } from './dto/ui-user';

@Injectable()
export class UserQuery {
  constructor(private userRepository: UserRepository) {}

  public async find(username: string): Promise<User> {
    const user = await this.userRepository.find(username);
    user.password = undefined;
    return user;
  }

  public async getUserInformation(userId: string): Promise<UiUser> {
    const user = await this.userRepository.read(userId);
    return UiUser.fromUser(user);
  }
}
