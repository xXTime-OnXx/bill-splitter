import { Role } from './role.enum';
import { Avatar } from './avatar.enum';

export interface User {
  id: string;
  username: string;
  avatar: Avatar;
  password: string;
  email: string;
  phone: string;
  roles: Role[];
}
