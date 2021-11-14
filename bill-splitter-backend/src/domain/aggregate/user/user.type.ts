import { Role } from './role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}
