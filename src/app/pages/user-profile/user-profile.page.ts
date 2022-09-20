// IMPORTS
import { Component,
         OnInit            } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { TranslateService  } from '@ngx-translate/core';
import { AuthService       } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { FirebaseError     } from '@angular/fire/app';
import { GlobalService     } from 'src/app/services/global.service';

// CLASS
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  // VARIABLES
  private fgUserProfile: FormGroup;
  private bPasswordVisible: boolean;
  private bUpdatedChanges: {displayName: boolean; email: boolean; password: boolean};

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private loadingController: LoadingController,
    private globalService: GlobalService) {
      GlobalService.devlog('user-profile: constructor()');
    }

  // PROPERTIES
  get userProfile()       { return this.fgUserProfile; }
  get email()             { return this.fgUserProfile.get('email'); }
  get password()          { return this.fgUserProfile.get('password'); }
  get name()              { return this.fgUserProfile.get('name'); }
  get isPasswordVisible() { return this.bPasswordVisible; }
  get updatedChanges()    { return this.bUpdatedChanges; }
  // get emailPlaceholder() { return this.authService.email; }
  // get displayNamePlaceholder() { return this.authService.displayName ?? this.translate.instant("type_your_name"); }

  // NGONINIT
  ngOnInit(): void {
    GlobalService.devlog('user-profile: ngOnInit()');

    this.bPasswordVisible = false;
    this.bUpdatedChanges = {displayName: false, email: false, password: false};

    this.fgUserProfile = this.fb.group({
      name: [this.authService.displayName ?? '',  [Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      email: [this.authService.email, [Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });

  }

  // FUNCTIONS
  // updateProfile
  async updateProfile() {
    GlobalService.devlog('user-profile: updateProfile');
    GlobalService.devlog(`  nom: ${this.name.value}\n  password: ${this.password.value}\n  email: ${this.email.value}`);

    if (!this.userProfile.valid || this.name.invalid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.userProfile.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create();
    await loading.present();

    try {

      this.bUpdatedChanges = {displayName: false, email: false, password: false};

      // update email
      if (this.email.value.trim() !== '' && this.email.value !== this.authService.email) {
        await this.authService.updateEmail(this.email.value.trim());
        this.updatedChanges.email = true;
      }

      // update displayName
      if (this.name.value.trim() !== '' && this.name.value !== this.authService.displayName) {
        await this.authService.updateDisplayName(this.name.value.trim());
        this.updatedChanges.displayName = true;
      }

      // update password
      if (this.password.value.trim() !== '') {
        await this.authService.updatePassword(this.password.value.trim());
        this.updatedChanges.password = true;
      }

    } catch (e) {
      switch ((e as FirebaseError).code) {
        case 'auth/requires-recent-login':
          { this.globalService.showAlert('USER_PROFILE.error','USER_PROFILE.requires_recent_login'); break; }
        case 'auth/invalid-email':
          { this.globalService.showAlert('USER_PROFILE.error','USER_PROFILE.invalid_email'); break; }
        case 'auth/email-already-in-use':
          { this.globalService.showAlert('USER_PROFILE.error','USER_PROFILE.email_already_in_use'); break; }
        default:
          this.globalService.showAlert('USER_PROFILE.error',(e as FirebaseError).code + (e as FirebaseError).message );
      }
    }

    await loading.dismiss();
  }

  // Funcions Visibilitat Password
  changePasswordVisibility() { this.bPasswordVisible = !this.bPasswordVisible; }

}
