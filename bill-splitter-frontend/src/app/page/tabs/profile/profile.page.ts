import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../common/avatar/avatar.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../service/user/user.type';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UpdateUser} from '../../../service/user/dto/update-user.dto';
import {AuthService} from '../../../service/auth/auth.service';
import {UsernameAvailableValidator} from '../../../common/validator/username-available.validator';
import {NavigationHandler} from '../../../service/navigation/navigation.handler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public avatarUrl: string;
  public userForm: UntypedFormGroup;

  private user: User;

  constructor(private navHandler: NavigationHandler,
              private userService: UserService,
              private authService: AuthService,
              private usernameAvailableValidator: UsernameAvailableValidator) {
  }

  ngOnInit(): void {
    this.createForm();
    this.subscribeUserDetails();
  }

  public async changeAvatar(): Promise<void> {
    await this.navHandler.navigateForward('profile/change-avatar', this.user.avatar);
  }

  public async saveChanges(): Promise<void> {
    if (!this.userForm.valid) {
      return;
    }
    const updateUser = this.createUpdateUser();
    await this.userService.updateUserInformation(updateUser);
  }

  async changePassword(): Promise<void> {
    await this.navHandler.navigateForward('profile/change-password');
  }

  async logout() {
    await this.authService.logout();
  }

  private createUpdateUser(): UpdateUser {
    const updateUser: UpdateUser = {
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      phone: this.userForm.get('phone').value,
    };
    if (!updateUser.phone) {
      updateUser.phone = '';
    }
    return updateUser;
  }

  private createForm(): void {
    this.userForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl(''),
    }, {
      asyncValidators: [
        this.usernameAvailableValidator.validate(),
      ]
    });
  }

  private subscribeUserDetails(): void {
    this.userService.getUserInformation().subscribe((user: User) => {
      this.user = user;
      this.avatarUrl = AvatarService.imageUrl(user.avatar);
      this.userForm.get('username').patchValue(user.username);
      this.userForm.get('email').patchValue(user.email);
      this.userForm.get('phone').patchValue(user.phone);
    });
    this.userService.loadUserInformation();
  }
}
