import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GroupPage} from './group.page';

import {GroupPageRoutingModule} from './group-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GroupPageRoutingModule
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
