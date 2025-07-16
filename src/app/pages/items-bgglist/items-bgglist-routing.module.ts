import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsBGGListPage } from './items-bgglist.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsBGGListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsBGGListPageRoutingModule {}
