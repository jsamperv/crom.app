// IMPORTS
import { Component,
         OnInit           } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService      } from '../services/auth.service';
import { GlobalService    } from '../services/global.service';
import { UserService,
         UserDetails      } from '../services/user.service';

// CLASS
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  // CONSTRUCTOR
  constructor(private userService: UserService,
              private authService: AuthService,
              private translate:   TranslateService ) {}

  // NGONINIT
  ngOnInit(): void {
    GlobalService.devlog('tabsPage: ngOnInit()');
    // LOAD USER PREFERENCES
    const userDetails = this.userService.getUserDetails(this.authService.userId)
      .subscribe((x: UserDetails)=> {
        GlobalService.devlog(`  User ${x.name} reads in ${x.language} language.`);
        this.translate.use(x.language);
      });
  }

}
