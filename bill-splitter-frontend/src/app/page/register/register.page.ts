import {Component, EventEmitter, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {FieldsEqualValueValidator} from '../../common/validator/fields-equal-value.validator';
import {NavigationHandler} from '../../service/navigation/navigation.handler';
import {UsernameAvailableValidator} from '../../common/validator/username-available.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: UntypedFormGroup;
  isSubmitted: boolean;
  isRegisterSuccessful: boolean;
  usernamePopoverEvent = new EventEmitter();

  constructor(
    private authService: AuthService,
    private navHandler: NavigationHandler,
    private usernameAvailableValidator: UsernameAvailableValidator,
    private fieldsEqualValueValidator: FieldsEqualValueValidator) {
  }

  ngOnInit() {
    this.buildForm();
  }

  async register() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      return false;
    }
    this.isRegisterSuccessful = await this.authService.register(
      this.registerForm.get('username').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    );
    if (this.isRegisterSuccessful) {
      await this.navHandler.navigate('login');
    }
  }

  private buildForm(): void {
    this.registerForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    }, {
      asyncValidators: [
        this.usernameAvailableValidator.validate(),
      ],
      validators: [
        this.fieldsEqualValueValidator.validate('password', 'confirmPassword')
      ]
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }
}
