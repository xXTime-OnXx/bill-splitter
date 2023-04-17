import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Subject} from 'rxjs';
import {Group} from './group. type';
import {CreateGroup} from './dto/create-group.type';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Subject<Group[]> = new Subject<Group[]>();

  constructor(private http: HttpClient) {
    this.loadGroups();
  }

  public getGroups(): Subject<Group[]> {
    return this.groups;
  }

  public async createGroup(createGroup: CreateGroup): Promise<void> {
    await firstValueFrom(this.http.post<void>(environment.host + 'group/create', createGroup));
    this.loadGroups();
  }

  public async loadGroups(): Promise<Group[]> {
    // TODO: revert later, temporary data for ui
    const gps = [{name: 'Summer Trip', description: 'Hawaii & Mexico'}]
    const groups = await firstValueFrom(this.http.get<Group[]>(environment.host + 'group'));
    this.groups.next(gps);
    return gps;
  }

}
