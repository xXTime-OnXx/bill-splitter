import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
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
      // TODO: create Storage service
      // this.storage.setItem(environment.bearerToken, response.access_token);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

}
