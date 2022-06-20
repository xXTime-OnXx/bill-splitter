import {Component, OnInit} from '@angular/core';
import {NavigationHandler} from '../../../service/navigation/navigation.handler';
import {Group} from "../../../service/group/group. type";
import {GroupService} from "../../../service/group/group.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage implements OnInit {

  public groups: Group[];
  public imageUrl = 'assets/group/sunset.png';

  constructor(private groupService: GroupService,
              private navHandler: NavigationHandler) {
  }

  async ngOnInit(): Promise<void> {
    this.groups = await this.groupService.loadGroups();
    this.groupService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });
  }

  async createGroup(): Promise<void> {
    await this.navHandler.navigateForward('group/create');
  }

}
