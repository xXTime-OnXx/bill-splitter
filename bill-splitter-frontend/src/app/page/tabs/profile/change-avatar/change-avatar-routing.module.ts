import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChangeAvatarPage} from './change-avatar-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeAvatarPageRoutingModule {}
