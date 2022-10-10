import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path: 'user-profile',
    loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'create-library-item',
    loadChildren: () => import('../create-library-item/create-library-item.module').then( m => m.CreateLibraryItemPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('../register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
