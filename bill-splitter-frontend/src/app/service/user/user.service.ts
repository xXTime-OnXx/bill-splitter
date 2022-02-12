import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from './user.type';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Subject} from 'rxjs';
import {UpdateUser} from './dto/update-user.dto';
import {Avatar} from '../../common/avatar/avatar.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.loadUserInformation();
  }

  public getUserInformation(): Subject<User> {
    return this.user;
  }

  public async updateUserInformation(updateUser: UpdateUser): Promise<void> {
    await firstValueFrom(this.http.post<void>(environment.host + 'user/update', updateUser))
    this.loadUserInformation();
  }

  public async updateAvatar(avatar: Avatar): Promise<void> {
    await firstValueFrom(this.http.post<void>(environment.host + 'user/update/avatar', {avatar}))
    this.loadUserInformation();
  }

  public async loadUserInformation(): Promise<User> {
    const userInformation = await firstValueFrom(this.http.get<User>(environment.host + 'user'));
    this.user.next(userInformation);
    return userInformation;
  }

  public async updatePassword(password: string): Promise<void> {
    await firstValueFrom(this.http.post<void>(environment.host + 'user/update/password', {password}))
  }
}
