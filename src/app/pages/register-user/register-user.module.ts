import { NgModule                      } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { FormsModule,
         ReactiveFormsModule           } from '@angular/forms';
import { IonicModule                   } from '@ionic/angular';
import { RegisterUserPageRoutingModule } from './register-user-routing.module';
import { RegisterUserPage              } from './register-user.page';
import { TranslateModule               } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [RegisterUserPage]
})
export class RegisterUserPageModule {}
