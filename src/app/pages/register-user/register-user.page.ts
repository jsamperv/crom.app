// IMPORTS
import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { AuthService       } from '../../services/auth.service';
import { GlobalService     } from 'src/app/services/global.service';
import { FirebaseError     } from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { UserService,
         UserDetails       } from 'src/app/services/user.service';

// CLASS
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  // VARIABLES
  private fgUserCred: FormGroup;
  private bUpdatedChanges: {done: boolean; name?: string};

  // CONSTRUCTOR
  constructor(private fb: FormBuilder,
              private loadingCtrl: LoadingController,
              private globalService: GlobalService,
              private authService: AuthService,
              private userService: UserService
              ) {
    GlobalService.devlog('registerUser: constructor()');
  }

  // PROPERTIES
  get userCred()          { return this.fgUserCred; }
  get email()             { return this.fgUserCred.get('email'); }
  get password()          { return this.fgUserCred.get('password'); }
  get name()              { return this.fgUserCred.get('name'); }
  get updatedChanges()    { return this.bUpdatedChanges; }

//   // NGONINIT
  ngOnInit() {
    GlobalService.devlog('registerUser: ngOnInit()');

    this.bUpdatedChanges = {done: false};

    this.fgUserCred = this.fb.group({
        name: ['', [Validators.required, Validators.pattern('^([A-Z][a-z]*)[ ]+[A-Z]([a-z])*$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['123456', [Validators.required, Validators.minLength(6)]]
      });
  }

  // FUNCTIONS
  // registerUser()
  async registerUser() {
    GlobalService.devlog('registerUser: registerUser()');
    GlobalService.devlog(`
  name: ${this.name.value}\n  email: ${this.email.value}\n  passwd: ${this.password.value}\n
      `);

    this.bUpdatedChanges.done = false;

    if (!this.fgUserCred.valid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.fgUserCred.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      const user = await this.authService.register({email: this.email.value, password: this.password.value});
      await this.userService.addUserDetails(
        {id: user.user.uid, name: this.name.value, role: 'cromSlave', language: 'bui'} as UserDetails);
      await this.authService.updateDisplayName(this.name.value);

      await loading.dismiss();
      this.bUpdatedChanges.done = true;
      this.bUpdatedChanges.name = this.name.value;
    } catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('error', (e as FirebaseError).code);
    }
  }
}
