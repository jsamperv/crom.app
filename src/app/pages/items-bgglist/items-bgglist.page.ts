// IMPORTS
import { Component, OnInit } from '@angular/core';
import { BggService        } from 'src/app/services/bgg.service';
import { GlobalService     } from 'src/app/services/global.service';
import { LibraryService    } from 'src/app/services/library.service';

// CLASS
@Component({
  selector: 'app-items-bgglist',
  templateUrl: './items-bgglist.page.html',
  styleUrls: ['./items-bgglist.page.scss'],
})
export class ItemsBGGListPage implements OnInit {

  // VARIABLES
  private aUserCollection: any[];

  // CONSTRUCTOR
  constructor(private bggService: BggService,
              private libraryService: LibraryService) {
                GlobalService.devlog('ItemsBGGListPage: constructor()');
  }

  // PROPERTIES
  get userCollection() { return this.aUserCollection; }

  // NGONINIT
  async ngOnInit() {
    GlobalService.devlog('ItemsBGGListPage: ngOnInit()');
    this.aUserCollection = [];
    this.aUserCollection = await this.bggService.getUserCollection('');
    this.excludeAlreadyInLibrary();
  }

  // FUNCTIONS
  // createLibraryItem()
  async createLibraryItem(id: string, name: string, category: string) {
    GlobalService.devlog(`ItemsBGGListPage: createLibraryItem(${id}, ${name}, ${category})`);
    // category is not necessary. At this moment everything in CROM BGG are boardgames.
    await this.libraryService.createLibraryItem({name, category, lended: {status: false}, outOfLend: false, bggId: id});
    await this.reloadUserCollection();
  }

  // AUX.FUNCTIONS
  // excludeAlreadyInLibrary()
  async excludeAlreadyInLibrary() {
    let nAux = 0;
    this.aUserCollection.forEach(
      async (bggItem, index) => {
        // GlobalService.devlog(bggItem.name.text+'"'+bggItem.objectid+'"');
        const libraryItem = await this.libraryService.getLibraryItemByBggId(bggItem.objectid);
        if (libraryItem !== undefined) {
          // GlobalService.devlog(index + ' '
          //                       + this.aUserCollection.splice(index-nAux,1)[0].name.text);
          this.aUserCollection.splice(index-nAux,1);
          nAux++;
        }
    });
  }

  // reloadUserCollection()
  async reloadUserCollection() {
    this.aUserCollection = [];
    this.aUserCollection = await this.bggService.getUserCollection('');
    this.excludeAlreadyInLibrary();
  }

  bggLink(id: any)
    { window.open('https://boardgamegeek.com/boardgame/'+ id.toString(),'_blank'); }
}
