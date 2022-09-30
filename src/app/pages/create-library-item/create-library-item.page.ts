// IMPORTS
import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators        } from '@angular/forms';
import { GlobalService     } from 'src/app/services/global.service';
import { LibraryItem       } from 'src/app/interfaces/LibraryItem';
import { LibraryService    } from 'src/app/services/library.service';
import { LoadingController } from '@ionic/angular';
import { FirebaseError     } from 'firebase/app';

// CLASS
@Component({
  selector: 'app-create-library-item',
  templateUrl: './create-library-item.page.html',
  styleUrls: ['./create-library-item.page.scss'],
})
export class CreateLibraryItemPage implements OnInit {

  // VARIABLES
  private fgLibraryItem: FormGroup;
  private bUpdatedChanges: boolean;
  // private llistatVerdures: {id:String}[];

  // CONSTRUCTOR
  constructor(private fb: FormBuilder,
    private libraryService: LibraryService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService) {
    GlobalService.devlog('createLibraryItem: constructor()');
  }

  // PROPERTIES
  get libraryItem()    { return this.fgLibraryItem; }
  get name()           { return this.fgLibraryItem.get('name'); }
  get category()       { return this.fgLibraryItem.get('category'); }
  get updatedChanges() { return this.bUpdatedChanges; }

  // get getLlistatVerdures() { return this.llistatVerdures }

  ngOnInit() {
    GlobalService.devlog('createLibraryItem: ngOnInit()');

    this.bUpdatedChanges = false;

    // Inicialitzem Form Group
    this.fgLibraryItem =
      this.fb.group({
        line: [''],
        name: [,[Validators.required]],
        edition: [''],
        author: [''],
        category: [,[Validators.required]],
        outOfLend: [false],
        donatedBy: ['']
    });

  }

  // FUNCTIONS
  // createLibraryItem()
  async createLibraryItem() {
    GlobalService.devlog('createLibraryItem: createLibraryItem()');
    GlobalService.devlog(`
      name: ${this.name.value}\n      author: ${this.fgLibraryItem.get('author').value}\n      category: ${this.category.value}
      outOfLend: ${this.fgLibraryItem.get('outOfLend').value}\n      donatedBy: ${this.fgLibraryItem.get('donatedBy').value}
      `);

    this.bUpdatedChanges = false;

    if (!this.fgLibraryItem.valid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.fgLibraryItem.markAllAsTouched();
      return;
    }

    const newLibraryItem: LibraryItem = {
      name: this.name.value.trim(), category: this.category.value, lended: {status: false},
      outOfLend: this.fgLibraryItem.get('outOfLend').value};

    if (this.fgLibraryItem.get('line').value.trim() !== '')
      { newLibraryItem.line = this.fgLibraryItem.get('line').value.trim(); }
    if (this.fgLibraryItem.get('edition').value.trim() !== '')
      { newLibraryItem.edition = this.fgLibraryItem.get('edition').value.trim(); }
    if (this.fgLibraryItem.get('author').value.trim() !== '')
      { newLibraryItem.author = this.fgLibraryItem.get('author').value.trim(); }
    if (this.fgLibraryItem.get('donatedBy').value.trim() !== '')
      { newLibraryItem.donatedBy = this.fgLibraryItem.get('donatedBy').value.trim(); }

    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      await this.libraryService.createLibraryItem(newLibraryItem);
      await loading.dismiss();
      this.bUpdatedChanges = true;
    } catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('error', (e as FirebaseError).code);
    }

  }
}

