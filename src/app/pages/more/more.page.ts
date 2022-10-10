// IMPORTS
import { Component,
         OnInit            } from '@angular/core';
import { AuthService       } from '../../services/auth.service';
import { TranslateService  } from '@ngx-translate/core';
import { UserService,
         UserDetails       } from 'src/app/services/user.service';
import { GlobalService     } from 'src/app/services/global.service';
import { LoadingController } from '@ionic/angular';
import { FirebaseError     } from 'firebase/app';


// CLASS
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  // VARIABLES
  private bIsAdmin: boolean;

  // CONSTRUCTOR
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    public globalService: GlobalService) {
      GlobalService.devlog('MorePage: contructor()');
    }

  // PROPERTIES
  get langs()           { return this.translate.getLangs(); }
  get currentLang()     { return this.translate.currentLang; }
  get getUserService()  { return this.userService; }
  get getAuthService()  { return this.authService; }
  get userIsAdmin()     { return this.bIsAdmin; }

  // NGONINIT
  async ngOnInit() {
    GlobalService.devlog('MorePage: ngOnInit()');

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const userDetails = this.userService.getUserDetails(this.authService.userId)
      .subscribe((x: UserDetails)=> {
        GlobalService.devlog(`  User ${this.authService.userId} has ${x.role} role.`);
        this.bIsAdmin = (x.role === 'admin');
        // this.translate.use(x.language);
        // while i dont save language i wont load it
      });

    // this.bIsAdmin = await this.userService.isUserAdmin(this.authService.userId);

    await loading.dismiss();

  }

  // FUNCTIONS
  // logout()
  logout(){ this.authService.logout(); window.location.assign('/logout');}

  // AUXILIAR FUNCTIONS
  async switchLang(lang: string) {

    this.translate.use(lang);

    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      await this.userService.updateUserDetails(this.authService.userId, {language: lang} );
      await loading.dismiss();
    }
    catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('error', (e as FirebaseError).code);
    }
  }

}
