// IMPORTS
import { Component,
         OnInit            } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { GlobalService     } from '../../services/global.service';
import { TranslateService  } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';
import { AuthService       } from '../../services/auth.service';
import { FirebaseError     } from 'firebase/app';
import { UserCredential    } from '@angular/fire/auth';
import { Router            } from '@angular/router';

// INTERFACES

// CLASS
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // VARIABLES
  private fgLoginCredentials: FormGroup;
  private bIsPasswordVisible: boolean;
  private sEmailString: string;

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router) {
      GlobalService.devlog('login: constructor()');
  }

  // PROPERTIES
  get loginCredentials()  { return this.fgLoginCredentials; }
  get email()             { return this.fgLoginCredentials.get('email'); }
  get password()          { return this.fgLoginCredentials.get('password'); }
  get isPasswordVisible() { return this.bIsPasswordVisible; }
  get langs()             { return this.translate.getLangs(); }
  get currentLang()       { return this.translate.currentLang; }
  get emailString()       { return this.sEmailString; }

  // NGONINIT
  ngOnInit() {
    GlobalService.devlog('login: ngOnInit()');

    this.bIsPasswordVisible = false;
    this.sEmailString =
      'mailto:cromrolesa@gmail.com?Subject=CROM.APP registre &body= Siusplau, registreu-me a la app, amb el correu: XXX@XXX.XXX';

    // Form Group Inicialization
    this.fgLoginCredentials =
        this.fb.group({
          email:   ['', [Validators.email, Validators.required]],
          password:['', [Validators.minLength(6), Validators.required]]
      } // , {validators:[],updateOn:'blur'}
      );
  }

  // FUNCTIONS
  // login()
  async login() {
    GlobalService.devlog('login: login()');

    if (!this.loginCredentials.valid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.loginCredentials.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      const user = await this.authService.login(this.email.value, this.password.value);
      await this.loadUserSettings(user, loading);
      await loading.dismiss();

    } catch (e) {
      await loading.dismiss();
      switch ((e as FirebaseError).code) {
        case 'auth/user-not-found': {
          this.globalService.showAlert('LOGIN.login_error', 'LOGIN.user_not_found', 'LOGIN.ok'); break; }
        case 'auth/wrong-password': {
          this.globalService.showAlert('LOGIN.login_error', 'LOGIN.incorrect_passw', 'LOGIN.ok'); break; }
        default:
          this.globalService.showAlert('LOGIN.login_error', (e as FirebaseError).code, 'LOGIN.ok');
      }
    }
  }

  // loadUserSettings()
  async loadUserSettings(user: UserCredential, loading: HTMLIonLoadingElement) {
    GlobalService.devlog('login: loadUserSettings()');
    try {
      //await this.apiService.getUserSettings(user.user.uid); // setTimeout(()=>{},100); // opcio dolenta, hauria de fer un then
      // this.switchLang(this.apiService.userSettings.language.toString());
      // await loading.dismiss();
      // throw (new Error('blah'));
      this.router.navigateByUrl('', { replaceUrl: true });
    } catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('LOGIN.login_error', 'LOGIN.unable_to_load_user_settings');
      GlobalService.devlog(`  Error during user settings loading: ${e.code}`);
    }
  }

  // AUXILIAR FUNCTIONS
  changePasswordVisibility() { this.bIsPasswordVisible = !this.bIsPasswordVisible; }
  switchLang(lang: string)   { this.translate.use(lang); }

}
