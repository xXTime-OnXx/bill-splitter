import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldsEqualValueValidator} from '../../../../common/validator/fields-equal-value.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  public defaultBackHref: string = "/tabs/profile";
  public changePasswordForm: FormGroup;

  constructor(private fieldsEqualValueValidator: FieldsEqualValueValidator) {
  }

  async ngOnInit() {
    this.buildForm();
  }

  async changePassword() {

  }

  private buildForm(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validators: [this.fieldsEqualValueValidator.validate('password', 'confirmPassword')]
    });
  }
}
