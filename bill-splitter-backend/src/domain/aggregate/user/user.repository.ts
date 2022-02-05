import {User} from './user.type';
import {CreateUser} from '../../usecase/user/dto/create-user';
import {UpdateUser} from '../../usecase/user/dto/update-user';
import {Avatar} from './avatar.enum';

export abstract class UserRepository {
    abstract read(userId: string): Promise<User>;
    abstract find(username: string): Promise<User>;
    abstract create(createUser: CreateUser): Promise<void>;
    abstract update(userId: string, updateUser: UpdateUser): Promise<void>;
    abstract updateAvatar(userId: string, avatar: Avatar): Promise<void>;
}
