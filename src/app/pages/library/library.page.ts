// IMPORTS
import { Component,
         OnInit         } from '@angular/core';
import { GlobalService  } from 'src/app/services/global.service';
import { LibraryService } from 'src/app/services/library.service';
import { AuthService    } from 'src/app/services/auth.service';
import { LibraryItem    } from 'src/app/interfaces/LibraryItem';

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
    private authService: AuthService,
    private globalService: GlobalService ) {
    GlobalService.devlog('library: constructor()');
  }

  // PROPERTIES
  get getLibraryService() { return this.libraryService; }

  // NGONINIT
  ngOnInit() {
    GlobalService.devlog('library: ngOnInit()');
    this.filterByCategory('boardgame');
  }

  // FUNCTIONS
  async lendItem(libraryItem: LibraryItem) {
    GlobalService.devlog('library: lendItem()');
    const isSure = await this.globalService.showAlertWithQuestion('LIBRARY.lend_item','LIBRARY.lend_item_question');
    if ( !isSure ) {return;}
    this.libraryService.lendItem(libraryItem, this.authService.userId, this.authService.displayName);
  }

  returnItem(libraryItem: LibraryItem) {
    GlobalService.devlog('library: returnItem()');
    this.libraryService.returnItem(libraryItem);
  }

  // AUXILIAR FUNCTIONS
  getItemsColor(isLended: boolean=false): string { if (isLended) { return 'warning'; } return ''; }
  canIReturnItem(isLended: boolean=false, userId: string=''): boolean {
    if (isLended && userId === this.authService.userId) { return true; }
    return false;
  }
  filterByCategory(category: string) { this.libraryService.filterByCategory(category); }
}
