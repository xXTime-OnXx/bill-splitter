import {Avatar} from './avatar.enum';

export class AvatarService {
  private static AVATAR_BASE_URL = 'assets/avatar/';
  private static IMAGE_FORMAT = '.png';

  public static imageUrl(avatar: Avatar): string {
    return AvatarService.AVATAR_BASE_URL + avatar.toString().toLowerCase() + AvatarService.IMAGE_FORMAT;
  }
}
