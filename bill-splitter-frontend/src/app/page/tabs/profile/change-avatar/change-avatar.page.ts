import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../../common/avatar/avatar.service';
import {Avatar} from '../../../../common/avatar/avatar.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectableAvatar} from '../../../../common/avatar/selectable-avatar';
import {UserService} from '../../../../service/user/user.service';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {

  public defaultBackHref: string = "/tabs/profile";
  public selectedAvatar: SelectableAvatar;
  public availableAvatars: SelectableAvatar[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.loadUserAvatar();
    this.loadSelectableAvatars();
  }

  private loadSelectableAvatars(): void {
    this.availableAvatars = Object.values(Avatar)
      .map((avatar: Avatar) => {
        return {
          avatar: avatar,
          avatarUrl: AvatarService.imageUrl(avatar)
        }
      });
  }

  private loadUserAvatar(): void {
    const userAvatar: Avatar = this.route.snapshot.paramMap.get('avatar') as Avatar;
    this.selectedAvatar = {
      avatar: userAvatar,
      avatarUrl: AvatarService.imageUrl(userAvatar)
    };
  }

  public async changeAvatar(avatar: SelectableAvatar): Promise<void> {
    this.selectedAvatar = avatar;
  }

  public async saveSelectedAvatar(): Promise<void> {
    await this.userService.updateAvatar(this.selectedAvatar.avatar);
    await this.router.navigate(['/tabs/profile']);
  }
}
