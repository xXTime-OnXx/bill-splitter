import {Avatar} from '../../common/avatar/avatar.enum';

export interface User {
  username: string;
  avatar: Avatar;
  email: string;
  phone: string;
}
