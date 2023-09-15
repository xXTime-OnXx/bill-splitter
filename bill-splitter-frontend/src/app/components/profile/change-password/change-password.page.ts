import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FieldsEqualValueValidator} from '../../../common/validator/fields-equal-value.validator';
import {UserService} from '../../../service/user/user.service';
import {NavigationHandler} from '../../../service/navigation/navigation.handler';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  public defaultBackHref = '/tabs/profile';
  public changePasswordForm: UntypedFormGroup;

  constructor(private userService: UserService,
              private navHandler: NavigationHandler,
              private fieldsEqualValueValidator: FieldsEqualValueValidator) {
  }

  async ngOnInit(): Promise<void> {
    this.buildForm();
  }

  async changePassword(): Promise<void> {
    if (!this.changePasswordForm.valid) {
      return;
    }
    const password = this.changePasswordForm.get('password').value;
    await this.userService.updatePassword(password);
    await this.navHandler.navigateBack(this.defaultBackHref);
  }

  private buildForm(): void {
    this.changePasswordForm = new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    }, {
      validators: [this.fieldsEqualValueValidator.validate('password', 'confirmPassword')]
    });
  }
}
