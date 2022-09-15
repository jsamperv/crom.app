// IMPORTS
import { Component,
         OnInit            } from '@angular/core';
import { FirebaseError     } from '@angular/fire/app';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { Router            } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService  } from '@ngx-translate/core';
import { GlobalService     } from 'src/app/services/global.service';
import { AuthService       } from '../../services/auth.service';

// CLASS
@Component({
  selector: 'app-reset-passw',
  templateUrl: './reset-passw.page.html',
  styleUrls: ['./reset-passw.page.scss'],
})
export class ResetPasswPage implements OnInit {

  // VARIABLES
  private fgResetPasswCredentials: FormGroup;

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private globalService: GlobalService
  ) { GlobalService.devlog('reset-passw: constructor()'); }

  // propietats formulari
  get resetPasswCredentials() { return this.fgResetPasswCredentials; }
  get email()                 { return this.fgResetPasswCredentials.get('email'); }

  ngOnInit() {
    GlobalService.devlog('reset-passw: ngOnInit()');
    this.fgResetPasswCredentials =
        this.fb.group({
          email:   ['', [Validators.email, Validators.required]]
      } // , {validators:[],updateOn:'blur'}
      );
  }

  async resetPassw() {
    GlobalService.devlog('reset-passw: resetPassw()');
    if (!this.email.valid) {
      GlobalService.devlog('  Invalid form. ');
      // display errors in the respective <ion-note>
      this.email.markAllAsTouched();
      return;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user = await this.authService.resetPassw(this.email.value);
      await loading.dismiss();
      this.globalService.showAlert('RESET_PASSW.reset_passw_begins', 'RESET_PASSW.reset_passw_sent', 'RESET_PASSW.ok');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
    catch (e) {
        await loading.dismiss();
        switch ((e as FirebaseError).code) {
          case 'auth/invalid-email': {
            this.globalService.showAlert('RESET_PASSW.reset_passw_error', 'RESET_PASSW.invalid_email', 'RESET_PASSW.ok');
            break; }
          case 'auth/user-not-found': {
            this.globalService.showAlert('RESET_PASSW.reset_passw_error', 'RESET_PASSW.user_not_found', 'RESET_PASSW.ok');
            break; }
          default: this.globalService.showAlert('RESET_PASSW.reset_passw_error',(e as FirebaseError).code, 'RESET_PASSW.ok');
        }
    }
  }
}



