import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLibraryItemPage } from './create-library-item.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLibraryItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLibraryItemPageRoutingModule {}
