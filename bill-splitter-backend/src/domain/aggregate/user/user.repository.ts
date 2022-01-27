import { User } from './user.type';
import { CreateUser } from '../../usecase/user/dto/create-user';

export abstract class UserRepository {
  abstract read(userId: string): Promise<User>;
  abstract find(username: string): Promise<User>;
  abstract create(createUser: CreateUser): Promise<void>;
}
