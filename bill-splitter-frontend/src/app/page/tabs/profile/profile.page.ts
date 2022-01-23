import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../service/user/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor() {
  }

  ngOnInit() {
    this.user = ProfilePage.loadUser();
  }

  changeAvatar(): void {
  }

  private static loadUser(): any {
    return {
      avatar: AvatarService.getAvatarUrl('woman-curly-hair.png')
    }
  }
}
