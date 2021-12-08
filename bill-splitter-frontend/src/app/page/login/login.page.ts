import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  isLoginSuccessful = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  async login(): Promise<any> {
    this.isSubmitted = true;
    this.isLoginSuccessful = true;
    if (!this.loginForm.valid) {
      return false;
    }
    this.isLoginSuccessful = await this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    if (this.isLoginSuccessful) {
      await this.router.navigate(['tabs']);
    }
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
