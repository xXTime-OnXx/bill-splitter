import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../../common/avatar/avatar.service';
import {Avatar} from '../../../../common/avatar/avatar.enum';
import {ActivatedRoute} from '@angular/router';
import {SelectableAvatar} from '../../../../common/avatar/selectable-avatar';
import {UserService} from '../../../../service/user/user.service';
import {NavigationHandler} from '../../../../service/navigation/navigation.handler';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {

  public defaultBackHref: string = "/tabs/profile";
  public selectedAvatar: SelectableAvatar;
  public availableAvatars: SelectableAvatar[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private navHandler: NavigationHandler) {
  }

  async ngOnInit(): Promise<void> {
    this.loadUserAvatar();
    this.loadSelectableAvatars();
  }

  private loadSelectableAvatars(): void {
    this.availableAvatars = Object.values(Avatar).map(ChangeAvatarPage.createSelectableAvatar);
  }

  private loadUserAvatar(): void {
    const userAvatar: Avatar = this.route.snapshot.paramMap.get('avatar') as Avatar;
    this.selectedAvatar = ChangeAvatarPage.createSelectableAvatar(userAvatar);
  }

  public async changeAvatar(avatar: SelectableAvatar): Promise<void> {
    this.selectedAvatar = avatar;
  }

  public async saveSelectedAvatar(): Promise<void> {
    await this.userService.updateAvatar(this.selectedAvatar.avatar);
    await this.navHandler.navigateBack(this.defaultBackHref)
  }

  private static createSelectableAvatar(userAvatar: Avatar) {
    return {
      avatar: userAvatar,
      avatarUrl: AvatarService.imageUrl(userAvatar)
    };
  }
}
