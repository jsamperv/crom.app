// IMPORTS
import { Component, Input,
         OnInit            } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { GlobalService     } from 'src/app/services/global.service';
import { LibraryItem       } from 'src/app/interfaces/LibraryItem';
import { LibraryService    } from 'src/app/services/library.service';
import { LoadingController,
         SearchbarCustomEvent
                           } from '@ionic/angular';
import { FirebaseError     } from 'firebase/app';
import { BggService        } from 'src/app/services/bgg.service';
import { ActivatedRoute    } from '@angular/router';

// TYPES

// CLASS
@Component({
  selector: 'app-create-library-item',
  templateUrl: './create-library-item.page.html',
  styleUrls: ['./create-library-item.page.scss'],
})
export class CreateLibraryItemPage implements OnInit {

  // VARIABLES
  private fgLibraryItem: FormGroup;
  private bUpdatedChanges: boolean; // {boolean, string}
  private lBggGames = []; // {id: number; name: string; yearpublished: number}[] = [];
  private sId: string;
  private libraryItemToUpdate: LibraryItem = {name: '', lended:{status:false}, category: '', outOfLend:false};

  // CONSTRUCTOR
  constructor(private fb: FormBuilder,
    private libraryService: LibraryService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService,
    private bggService: BggService,
    private aRoute: ActivatedRoute ) {
    GlobalService.devlog('createLibraryItem: constructor()');
  }

  // PROPERTIES
  get libraryItem()       { return this.fgLibraryItem; }
  get name()              { return this.fgLibraryItem.get('name'); }
  get category()          { return this.fgLibraryItem.get('category'); }
  get updatedChanges()    { return this.bUpdatedChanges; }
  get getLibraryService() { return this.libraryService; }
  get bggGames()          {
    // return [{name:'a'},{name:'b'}]; }
    return this.lBggGames; }
  get isCreateMode()      { return this.sId ? false: true; }

  // NGONINIT
  async ngOnInit() {
    GlobalService.devlog('createLibraryItem: ngOnInit()');

    this.fgLibraryItem =
      this.fb.group({
        line: [''],
        name: [,[Validators.required]],
        edition: [''],
        author: [''],
        category: [,[Validators.required]],
        outOfLend: [false],
        donatedBy: [''],
        bggId: ['']
    });

    // if Id NOT null we are in EDIT mode
    this.sId = this.aRoute.snapshot.paramMap.get('id');
    GlobalService.devlog('   There is an item to edit? ' + this.sId);

    if (this.sId !== null) {
      this.libraryItemToUpdate = await this.libraryService.getLibraryItemById(this.sId);
      GlobalService.devlog(`   Item to Update: ${JSON.stringify(this.libraryItemToUpdate)}`);
      this.fgLibraryItem.get('line').setValue(this.libraryItemToUpdate.line?? '');
      this.fgLibraryItem.get('name').setValue(this.libraryItemToUpdate.name);
      this.fgLibraryItem.get('edition').setValue(this.libraryItemToUpdate.edition?? '');
      this.fgLibraryItem.get('author').setValue(this.libraryItemToUpdate.author?? '');
      this.fgLibraryItem.get('category').setValue(this.libraryItemToUpdate.category);
      this.fgLibraryItem.get('outOfLend').setValue(this.libraryItemToUpdate.outOfLend?? '');
      this.fgLibraryItem.get('donatedBy').setValue(this.libraryItemToUpdate.donatedBy?? '');
      this.fgLibraryItem.get('bggId').setValue(this.libraryItemToUpdate.bggId?? '');
    }

    this.bUpdatedChanges = false;

  }

  // FUNCTIONS
  // handleSearchBarChange()
  async handleSearchBarChange(e: SearchbarCustomEvent) {
    GlobalService.devlog('createLibraryItem: handleSearchBarChange()');
    GlobalService.devlog(`  SearchBar Value: ${e.detail.value.toString()}`);

    try {
      const bggSearchResponse = await this.bggService.search(e.detail.value.toString());

      if (Array.isArray(bggSearchResponse)) {
        this.lBggGames = bggSearchResponse;
      } else {
        this.lBggGames = [];
        if (bggSearchResponse!==undefined) {
          this.lBggGames.push(bggSearchResponse);
        }
      }

      GlobalService.devlog(bggSearchResponse);

    } catch (error: any) {
      console.log(error);
    }
  }

  // createLibraryItem()
  async createLibraryItem() {
    GlobalService.devlog('createLibraryItem: createLibraryItem()');
    GlobalService.devlog(`
      line: ${this.fgLibraryItem.get('line').value}\n      name: ${this.name.value}
      author: ${this.fgLibraryItem.get('author').value}\n      category: ${this.category.value}
      outOfLend: ${this.fgLibraryItem.get('outOfLend').value}\n      donatedBy: ${this.fgLibraryItem.get('donatedBy').value}
      bggId: ${this.fgLibraryItem.get('bggId').value}
      `);

    this.bUpdatedChanges = false;

    if (!this.fgLibraryItem.valid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.fgLibraryItem.markAllAsTouched();
      return;
    }

    const newLibraryItem: LibraryItem = {
      name: this.name.value.trim(),
      category: this.category.value,
      lended: this.libraryItemToUpdate.lended,
      outOfLend: this.fgLibraryItem.get('outOfLend').value};

    if (this.fgLibraryItem.get('line').value.trim() !== '')
      { newLibraryItem.line = this.fgLibraryItem.get('line').value.trim(); }
    if (this.fgLibraryItem.get('edition').value.trim() !== '')
      { newLibraryItem.edition = this.fgLibraryItem.get('edition').value.trim(); }
    if (this.fgLibraryItem.get('author').value.trim() !== '')
      { newLibraryItem.author = this.fgLibraryItem.get('author').value.trim(); }
    if (this.fgLibraryItem.get('donatedBy').value.trim() !== '')
      { newLibraryItem.donatedBy = this.fgLibraryItem.get('donatedBy').value.trim(); }
      if (this.fgLibraryItem.get('bggId').value.trim() !== '')
      { newLibraryItem.bggId = this.fgLibraryItem.get('bggId').value.trim(); }

    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      // UPDATE
      if (this.sId !== null) {
        newLibraryItem.id = this.sId;
        this.libraryService.updateLibraryItem(newLibraryItem);
      }
      // CREATE
      else {
        await this.libraryService.createLibraryItem(newLibraryItem);
      }
      await loading.dismiss();
      this.bUpdatedChanges = true;
    } catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('error', (e as FirebaseError).code);
    }

  }
}

