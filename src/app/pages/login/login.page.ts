// IMPORT
import { Component,
         OnInit           } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators       } from '@angular/forms';
import { devlog           } from  'src/app/shared/sharedFunctions';
import { TranslateService } from '@ngx-translate/core';

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

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService) {
    devlog('login: constructor()');
  }

  // PROPERTIES
  get loginCredentials()  { return this.fgLoginCredentials; }
  get email()             { return this.fgLoginCredentials.get('email'); }
  get password()          { return this.fgLoginCredentials.get('password'); }
  get isPasswordVisible() { return this.bIsPasswordVisible; }
  get langs()             { return this.translate.getLangs(); }
  get currentLang()       { return this.translate.currentLang; }

  // NGONINIT
  ngOnInit() {
    devlog('login: ngOnInit()');

    this.bIsPasswordVisible = false;

    // Form Group Inicialization
    this.fgLoginCredentials =
        this.fb.group({
          email:   ['', [Validators.email, Validators.required]],
          password:['', [Validators.minLength(6), Validators.required]]
      } // , {validators:[],updateOn:'blur'}
      );
  }

  // FUNCTIONS
  async login() {
    devlog('login: login()');
    if (!this.loginCredentials.valid) {
      devlog('Invalid form.');
      // display errors in the respective <ion-note>
      this.loginCredentials.markAllAsTouched();
      return;
    }
  }

  // AUXILIAR FUNCTIONS
  changePasswordVisibility() { this.bIsPasswordVisible = !this.bIsPasswordVisible; }
  switchLang(lang: string)   { this.translate.use(lang); }

}
