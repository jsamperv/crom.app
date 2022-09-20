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
  // private llistatVerdures: {id:String}[];

  // CONSTRUCTOR
  constructor(private fb: FormBuilder,
    private libraryService: LibraryService,
    private loadingCtrl: LoadingController,
    private globalService: GlobalService) {
    GlobalService.devlog('createLibraryItem: constructor()');
  }

  // PROPERTIES
  get libraryItem() { return this.fgLibraryItem; }
  get name()        { return this.fgLibraryItem.get('name'); }
  get category()    { return this.fgLibraryItem.get('category'); }

  // get getLlistatVerdures() { return this.llistatVerdures }

  ngOnInit() {
    GlobalService.devlog('createLibraryItem: ngOnInit()');

    // Inicialitzem Form Group
    this.fgLibraryItem =
      this.fb.group({
        //selectorVerdures:['', [Validators.required]],
        name: [,[Validators.required]],
        author: [''],
        category: [,[Validators.required]],
        outOfLend: [false],
        donatedBy: ['']
    });

    // recupereu valors BBDD
    // this.llistatVerdures = [{id:"broquil"}, {id:"ceba"}, {id:"pebrot"}];
    // doneu valor al fg
    // this.fgFormulariExemple.get("selectorVerdures").setValue("ceba"); // segons el valor que poseu us inicialitzarà el selector

  }

  // FUNCTIONS
  // createLibraryItem()
  async createLibraryItem() {
    GlobalService.devlog('createLibraryItem: createLibraryItem()');
    GlobalService.devlog(`
      name: ${this.name.value}\n      author: ${this.fgLibraryItem.get('author').value}\n      category: ${this.category.value}
      outOfLend: ${this.fgLibraryItem.get('outOfLend').value}\n      donatedBy: ${this.fgLibraryItem.get('donatedBy').value}
      `);

    if (!this.fgLibraryItem.valid) {
      GlobalService.devlog('  Invalid form.');
      // display errors in the respective <ion-note>
      this.fgLibraryItem.markAllAsTouched();
      return;
    }

    const newLibraryItem: LibraryItem = {
      name: this.name.value, category: this.category.value, lended: {status: false},
      outOfLend: this.fgLibraryItem.get('outOfLend').value};

    if (this.fgLibraryItem.get('author').value.trim() !== '')    { newLibraryItem.author = this.fgLibraryItem.get('author').value; }
    if (this.fgLibraryItem.get('donatedBy').value.trim() !== '') { newLibraryItem.donatedBy = this.fgLibraryItem.get('donatedBy').value; }

    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      await this.libraryService.createLibraryItem(newLibraryItem);
      await loading.dismiss();
    } catch (e) {
      await loading.dismiss();
      this.globalService.showAlert('error', (e as FirebaseError).code);
    }

  }
}

