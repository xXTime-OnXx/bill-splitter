import {Injectable} from '@nestjs/common';
import {UserRepository} from '../../aggregate/user/user.repository';
import {User} from '../../aggregate/user/user.type';
import {UiUser} from './dto/ui-user';

@Injectable()
export class UserQuery {
    constructor(private userRepository: UserRepository) {
    }

    public async find(username: string): Promise<User | undefined> {
        const user = await this.userRepository.find(username);
        if (user) {
          user.password = undefined;
          return user;
        }
        return undefined;
    }

    public async getUserInformation(userId: string): Promise<UiUser> {
        const user = await this.userRepository.read(userId);
        return UiUser.fromUser(user);
    }

    public async userExists(username: string): Promise<boolean> {
        return !!await this.find(username);
    }

}
