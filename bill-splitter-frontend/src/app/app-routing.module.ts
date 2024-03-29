import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {RouteGuard} from './service/navigation/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'profile/change-avatar/:avatar',
    loadChildren: () => import('./components/profile/change-avatar/change-avatar.module').then(m => m.ChangeAvatarPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'profile/change-password',
    loadChildren: () => import('./components/profile/change-password/change-password.module').then(m => m.ChangePasswordPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'group/create',
    loadChildren: () => import('./components/group/create-group/create-group.module').then(m => m.CreateGroupPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
