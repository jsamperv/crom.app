import { NgModule                           } from '@angular/core';
import { CommonModule                       } from '@angular/common';
import { FormsModule,
         ReactiveFormsModule                } from '@angular/forms';
import { IonicModule                        } from '@ionic/angular';
import { CreateLibraryItemPageRoutingModule } from './create-library-item-routing.module';
import { CreateLibraryItemPage              } from './create-library-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLibraryItemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateLibraryItemPage]
})
export class CreateLibraryItemPageModule {}
