import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from './user.type';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {UpdateUser} from './dto/update-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public async getUserInformation(): Promise<User> {
    return await firstValueFrom(this.http.get<User>(environment.host + 'user'));
  }

  public async updateUserInformation(updateUser: UpdateUser): Promise<void> {
    await firstValueFrom(this.http.post<void>(environment.host + 'user/update', updateUser))
  }

}
