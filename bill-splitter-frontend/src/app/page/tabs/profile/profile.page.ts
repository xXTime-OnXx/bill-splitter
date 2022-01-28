import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../common/avatar/avatar.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../service/user/user.type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ViewWillEnter} from '@ionic/angular';
import {UpdateUser} from '../../../service/user/dto/update-user.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {

  public avatarUrl: string;
  public userForm: FormGroup;

  private user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async ionViewWillEnter(): Promise<void> {
    await this.loadUserInformation();
  }

  public changeAvatar(): void {
    // https://github.com/xXTime-OnXx/bill-splitter/issues/8
  }

  public async saveChanges(): Promise<void> {
    if (!this.userForm.valid) {
      return;
    }
    const updateUser = this.createUpdateUser();
    await this.userService.updateUserInformation(updateUser);
    await this.loadUserInformation();
  }

  public async loadUserInformation(): Promise<void> {
    this.user = await this.userService.getUserInformation();
    this.avatarUrl = AvatarService.imageUrl(this.user.avatar);
    this.userForm.get('username').patchValue(this.user.username);
    this.userForm.get('email').patchValue(this.user.email);
    this.userForm.get('phone').patchValue(this.user.phone);
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
