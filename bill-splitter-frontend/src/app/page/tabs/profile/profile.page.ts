import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../common/avatar/avatar.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../service/user/user.type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UpdateUser} from '../../../service/user/dto/update-user.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public avatarUrl: string;
  public userForm: FormGroup;

  private user: User;

  constructor(private navCtrl: NavController,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.subscribeUserDetails();
  }

  public async changeAvatar(): Promise<void> {
    await this.navCtrl.navigateForward(['profile/change-avatar', this.user.avatar]);
  }

  public async saveChanges(): Promise<void> {
    if (!this.userForm.valid) {
      return;
    }
    const updateUser = this.createUpdateUser();
    await this.userService.updateUserInformation(updateUser);
  }

  public subscribeUserDetails(): void {
    this.userService.getUserInformation().subscribe((user: User) => {
      this.user = user;
      this.avatarUrl = AvatarService.imageUrl(user.avatar);
      this.userForm.get('username').patchValue(user.username);
      this.userForm.get('email').patchValue(user.email);
      this.userForm.get('phone').patchValue(user.phone);
    });
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
    });
  }

  private createUpdateUser(): UpdateUser {
    const updateUser: UpdateUser = {
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      phone: this.userForm.get('phone').value,
    }
    if (!updateUser.phone) {
      updateUser.phone = '';
    }
    return updateUser;
  }
}
