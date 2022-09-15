import { NgModule                    } from '@angular/core';
import { CommonModule                } from '@angular/common';
import { FormsModule,
         ReactiveFormsModule         } from '@angular/forms';
import { IonicModule                 } from '@ionic/angular';
import { ResetPasswPageRoutingModule } from './reset-passw-routing.module';
import { ResetPasswPage              } from './reset-passw.page';
import { TranslateModule             } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswPage]
})
export class ResetPasswPageModule {}
