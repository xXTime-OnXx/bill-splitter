import { Router, UrlTree } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard  {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const userLoggedIn = await this.authService.isLoggedIn();
    if (!userLoggedIn) {
      return this.router.parseUrl('/login');
    }
    return true;
  }
}
