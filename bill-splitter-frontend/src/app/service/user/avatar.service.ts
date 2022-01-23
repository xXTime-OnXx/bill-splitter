export class AvatarService {
  private static AVATAR_BASE_URL: string = "assets/avatar/";

  public static getAvatarUrl(avatarName: string): string {
    return this.AVATAR_BASE_URL + avatarName;
  }
}
