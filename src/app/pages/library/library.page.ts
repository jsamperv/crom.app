// IMPORTS
import { Component,
         OnInit,
         ViewChild             } from '@angular/core';
import { GlobalService         } from 'src/app/services/global.service';
import { LibraryService        } from 'src/app/services/library.service';
import { AuthService           } from 'src/app/services/auth.service';
import { LibraryItem           } from 'src/app/interfaces/LibraryItem';
import { SearchbarCustomEvent,
         IonProgressBar        } from '@ionic/angular';
import { UserService           } from 'src/app/services/user.service';


// CLASS
@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  // VARIABLES
  @ViewChild('ionPB') elemPB: IonProgressBar;
  private bIsSearchBarActive: boolean;

  // CONSTRUCTOR
  constructor(
    private userService: UserService,
    private libraryService: LibraryService,
    private authService: AuthService,
    private globalService: GlobalService ) {
    GlobalService.devlog('library: constructor()');
  }

  // PROPERTIES
  get getLibraryService() { return this.libraryService; }
  get getUserService()    { return this.userService; }
  get isSearchBarActive() { return this.bIsSearchBarActive; }
  get categories()        { return this.globalService.categories; }

  // NGONINIT
  ngOnInit() {
    GlobalService.devlog('library: ngOnInit()');
    // this.filterByCategory('boardgame');
    this.bIsSearchBarActive = false;
  }

  // FUNCTIONS
  // lendItem()
  async lendItem(libraryItem: LibraryItem) {
    GlobalService.devlog('library: lendItem()');
    const isSure = await this.globalService.showAlertWithQuestion('LIBRARY.lend_item','LIBRARY.lend_item_question');
    if ( !isSure ) {return;}
    this.libraryService.lendItem(libraryItem, this.authService.userId, this.authService.displayName);
  }

  // returnItem()
  returnItem(libraryItem: LibraryItem) {
    GlobalService.devlog('library: returnItem()');
    this.libraryService.returnItem(libraryItem);
  }

  // handleSearchBarChange()
  handleSearchBarChange(e: SearchbarCustomEvent) {
    GlobalService.devlog('library: handleSearchBarChange()');
    GlobalService.devlog(`  SearchBar Value: ${e.detail.value.toString()}`);

    this.bIsSearchBarActive = true;
    this.showLoading(true);

    if (e.detail.value.trim().length === 0) {
      this.bIsSearchBarActive = false;
    }

    this.libraryService.filterBySearchBar(e.detail.value);
  }

  // filterByCategory()
  filterByCategory(category: string) {
    GlobalService.devlog('library: filterByCategory()');
    this.showLoading(true);
    this.libraryService.filterByCategory(category);
  }

  // filterByLended()
  filterByLended() {
    GlobalService.devlog('library: filterByLended()');
    this.showLoading(true);
    this.libraryService.filterByLended();
  }


  // AUXILIAR FUNCTIONS
  getItemsColor(isLended: boolean=false): string { if (isLended) { return 'warning'; } return ''; }
  canIReturnItem(isLended: boolean=false, userId: string=''): boolean {
    if (isLended && userId === this.authService.userId) { return true; }
    return false;
  }
  showLoading(bShow: boolean) {
    GlobalService.devlog(`libraryPage: showLoading(${bShow})`);
    if (!bShow) {
      this.elemPB.type = 'determinate';
      this.elemPB.value = 0;
      return;
    }
    this.elemPB.type = 'indeterminate';
  }
}
