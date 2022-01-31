import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChangeAvatarPageRoutingModule} from './change-avatar-routing.module';

import {ChangeAvatarPage} from './change-avatar-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeAvatarPageRoutingModule
  ],
  declarations: [ChangeAvatarPage]
})
export class ChangeAvatarPageModule {}
