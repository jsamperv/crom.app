// IMPORTS
import { Component,
         OnInit         } from '@angular/core';
import { GlobalService  } from 'src/app/services/global.service';
import { LibraryService } from 'src/app/services/library.service';
import { AuthService    } from 'src/app/services/auth.service';
// CLASS
@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  // VARIABLES

  // CONSTRUCTOR
  constructor(
    private libraryService: LibraryService,
    private authService: AuthService ) {
    GlobalService.devlog('library: constructor()');
  }

  // PROPERTIES
  public getLibraryService() { return this.libraryService; }

  // NGONINIT
  ngOnInit() {
    GlobalService.devlog('library: ngOnInit()');
  }

  // FUNCTIONS
  lendItem(name: string) {
    GlobalService.devlog('library: lend()');
    this.libraryService.lendItem(name);
  }

  // AUXILIAR FUNCTIONS
  getItemsColor(isLended: boolean=false): string { if (isLended) { return 'warning'; } return ''; }
  canIReturnItem(isLended: boolean=false, userId: string=''): boolean {
    GlobalService.devlog(userId);
    if (isLended && userId === this.authService.userId) { return true; }
    return false;
  }

}
