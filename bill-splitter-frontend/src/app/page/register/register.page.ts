import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {FieldsEqualValueValidator} from '../../common/validator/fields-equal-value.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitted: boolean;
  isRegisterSuccessful: boolean;

  constructor(
    private authService: AuthService,
    private fieldsEqualValueValidator: FieldsEqualValueValidator,
    private router: Router) {
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
      await this.router.navigate(['login']);
    }
  }

  private buildForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validators: [this.fieldsEqualValueValidator.validate('password', 'confirmPassword')]
    });
  }
}
