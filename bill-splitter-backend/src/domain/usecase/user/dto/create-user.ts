import { Role } from '../../../aggregate/user/role.enum';
import { Avatar } from '../../../aggregate/user/avatar.enum';

export interface CreateUser {
  username: string;
  avatar: Avatar;
  password: string;
  email: string;
  roles: Role[];
}
