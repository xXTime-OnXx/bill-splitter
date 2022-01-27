import {Component, OnInit} from '@angular/core';
import {AvatarService} from '../../../common/avatar/avatar.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../service/user/user.type';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public avatarUrl: string;
  public userForm: FormGroup;

  private user: User;

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.createForm();
    await this.loadUserInformation();
  }

  public changeAvatar(): void {
  }

  public saveChanges(): void {
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
    });
  }

  private async loadUserInformation(): Promise<void> {
    this.user = await this.userService.getUserInformation();
    this.avatarUrl = AvatarService.imageUrl(this.user.avatar);
    this.userForm.get('username').patchValue(this.user.username);
    this.userForm.get('email').patchValue(this.user.email);
    this.userForm.get('phone').patchValue(this.user.phone);
  }
}
