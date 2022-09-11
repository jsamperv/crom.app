// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss']
// })
// export class Tab2Page {

//   constructor() {}

// }

import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LibraryService } from '../services/library.service';

// interface Item {
//   name: string;
//   category: string;
//   tag: {name: string; userId: string}[];
// };

@Component({
  selector: 'app-tab2',
  template: `
  <ul>
    <li *ngFor="let item of this.libraryService.getLibraryItem$ | async">
      {{ item.name }} | {{ item.category }} | {{ item.tag[0].name }} | {{ item.lended.status }} | {{ item.lended.userId }}
    </li>
  </ul>
  `
})
export class Tab2Page {
  constructor(public libraryService: LibraryService) {
  }
}
