import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {NavigationHandler} from '../../service/navigation/navigation.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: UntypedFormGroup;
  isSubmitted = false;
  isLoginSuccessful = true;

  constructor(private formBuilder: UntypedFormBuilder,
              private authService: AuthService,
              private navHandler: NavigationHandler) {
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.buildForm();
  }

  async login(): Promise<any> {
    this.isSubmitted = true;
    this.isLoginSuccessful = true;
    if (!this.loginForm.valid) {
      return false;
    }
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.isLoginSuccessful = await this.authService.login(username, password);
    if (this.isLoginSuccessful) {
      await this.navHandler.navigate('tabs');
    }
  }


  private buildForm(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }
}
