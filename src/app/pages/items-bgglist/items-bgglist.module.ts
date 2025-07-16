import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsBGGListPageRoutingModule } from './items-bgglist-routing.module';

import { ItemsBGGListPage } from './items-bgglist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsBGGListPageRoutingModule
  ],
  declarations: [ItemsBGGListPage]
})
export class ItemsBGGListPageModule {}
