import { Avatar } from '../../../aggregate/user/avatar.enum';
import { User } from '../../../aggregate/user/user.type';

export class UiUser {
  username: string;
  avatar: Avatar;
  email: string;
  phone: string;

  public static fromUser(user: User): UiUser {
    const uiUser = new UiUser();
    uiUser.username = user.username;
    uiUser.avatar = user.avatar;
    uiUser.email = user.email;
    uiUser.phone = user.phone;
    return uiUser;
  }
}
