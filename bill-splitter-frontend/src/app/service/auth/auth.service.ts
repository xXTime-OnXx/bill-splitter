import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StorageService} from '../storage/storage.service';
import {RegisterDto} from './register.dto';
import {firstValueFrom} from 'rxjs';
import {NavigationHandler} from '../navigation/navigation.handler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private navHandler: NavigationHandler) {
  }

  public async login(username: string, password: string): Promise<boolean> {
    let response;
    try {
      response = await firstValueFrom(this.http.post<{
        access_token: string;
      }>(environment.host + 'auth/login', {
        username,
        password
      }));
      await this.storage.set(environment.bearerToken, response.access_token);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async register(username: string, email: string, password: string): Promise<boolean> {
    const registerDto: RegisterDto = {
      username,
      email,
      password
    };
    try {
      await firstValueFrom(this.http.post<void>(environment.host + 'auth/register', registerDto));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async logout(): Promise<void> {
    await this.storage.remove(environment.bearerToken);
    await this.navHandler.navigate('login');
  }

}
