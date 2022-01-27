import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from './user.type';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public async getUserInformation(): Promise<User> {
    return await firstValueFrom(this.http.get<User>(environment.host + 'user'));
  }

}
