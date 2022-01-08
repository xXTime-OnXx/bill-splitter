import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StorageService} from '../storage/storage.service';
import {RegisterDto} from './register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {
  }

  public async login(username: string, password: string): Promise<boolean> {
    let response;
    try {
      response = await this.http.post<{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        access_token: string;
      }>(environment.host + 'auth/login', {
        username,
        password
      }).toPromise();
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
      await this.http.post(environment.host + 'auth/register', registerDto);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

}
