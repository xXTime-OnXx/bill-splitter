import {Avatar} from './avatar.enum';

export class AvatarService {
  private static AVATAR_BASE_URL: string = 'assets/avatar/';
  private static IMAGE_FORMAT: string = '.png';

  public static imageUrl(avatar: Avatar): string {
    return this.AVATAR_BASE_URL + avatar.toString().toLowerCase() + this.IMAGE_FORMAT;
  }
}
