// IMPORTS
import { Component,
         OnInit          } from '@angular/core';
import { AuthService     } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// CLASS
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  // VARIABLES

  // CONSTRUCTOR
  constructor(
    private authService: AuthService,
    private translate: TranslateService) { }

  // PROPERTIES
  get langs()             { return this.translate.getLangs(); }
  get currentLang()       { return this.translate.currentLang; }

  // NGONINIT
  ngOnInit() {
  }

  // FUNCTIONS
  // logout()
  logout(){ this.authService.logout(); window.location.assign('/logout');}

  // AUXILIAR FUNCTIOONS
  switchLang(lang: string)   { this.translate.use(lang); }
  userIsAdmin() { return true; }
}
