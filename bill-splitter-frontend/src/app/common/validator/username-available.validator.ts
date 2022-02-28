import {AsyncValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';

@Injectable({providedIn: 'root'})
export class UsernameAvailableValidator {

  constructor(private authService: AuthService) {}

  public validate(): AsyncValidatorFn {
    return async (formGroup: FormGroup): Promise<ValidationErrors | null> => {
      const username = formGroup.get('username').value;
      const usernameExists = await this.authService.usernameExists(username);
      return !usernameExists ? null : {usernameAvailable: false};
    };
  }
}
