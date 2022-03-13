import {Component} from '@angular/core';
import {NavigationHandler} from '../../../service/navigation/navigation.handler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage {

  constructor(private navHandler: NavigationHandler) {}

  async createGroup(): Promise<void> {
    await this.navHandler.navigateForward('group/create');
  }
}
