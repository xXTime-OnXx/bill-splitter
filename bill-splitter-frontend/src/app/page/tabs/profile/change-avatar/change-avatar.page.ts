import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../../common/avatar/avatar.service';
import {Avatar} from '../../../../common/avatar/avatar.enum';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {

  public defaultBackHref: string = "/tabs/profile";
  public avatarUrl: string = AvatarService.imageUrl(Avatar.MAN_BEARD);

  constructor() { }

  ngOnInit() {
  }

}
