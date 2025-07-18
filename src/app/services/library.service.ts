// IMPORTS
import { Injectable              } from '@angular/core';
import { Firestore,
         collection,
         collectionData,
         CollectionReference,
         doc, updateDoc, addDoc,
         deleteDoc,
         query                   } from '@angular/fire/firestore';
import { Observable,
         of,
                                 } from 'rxjs';
import { map                     } from 'rxjs/operators';
import { delay,
                                 } from 'rxjs/internal/operators';
import { GlobalService           } from './global.service';
import { LibraryItem             } from '../interfaces/LibraryItem';
import { orderBy                 } from 'firebase/firestore';
import { FirebaseError           } from 'firebase/app';
import { Category                } from '../interfaces/Category';

// CLASS
@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // VARIABLES
  private libraryItem$: Observable<LibraryItem[]>;
  private libraryItem$Unfiltered: Observable<LibraryItem[]>;
  private libraryCollection: CollectionReference;
  // private libraryItem$filteredByCategory:  Observable<LibraryItem[]>;;

  // CONSTRUCTOR
  constructor(private db: Firestore,
              private globalService: GlobalService) {
    GlobalService.devlog('libraryService: contructor()');
    if (globalService.isMock) { this.libraryItem$Unfiltered = this.getDelayedMockData();}
    else {
      this.libraryCollection = collection(db, 'library');
      const q =  query(this.libraryCollection, orderBy('name'));
      this.libraryItem$Unfiltered = collectionData(q, {idField: 'id'}) as  Observable<LibraryItem[]>;
    }

    this.libraryItem$           = this.libraryItem$Unfiltered;

    // initial filter to show less results on screen
    this.filterByCategory({name:'boardgame', lendingDays:0});
    // this.libraryItem$filteredByCategory = this.libraryItem$;

    // NO BORRAR ...
    // this.libraryItem$= this.libraryItem$.pipe(
    //   map<LibraryItem[],LibraryItem[]>((data)=>{data.map(d=>{d.name=d.name;}); return data;}));
    // this.libraryItem$= this.libraryItem$.pipe(
    //     map<LibraryItem[],LibraryItem[]>((data)=>{
    //       data.sort((c,d)=>{const num = c.category.localeCompare(d.category); return num;}); return data;}));
    // NO BORRAR ...
    }

  // PROPERTIES
  get getLibraryItem$() {
    return this.libraryItem$; // .pipe(share()) as Observable<LibraryItem[]>;
   }

  // FUNCTIONS
  // lendItem()
  lendItem(libraryItem: LibraryItem, userId: string, displayName: string) {
    GlobalService.devlog(`libraryService: lendItem()`);
    libraryItem.lended = {status: true, since: Date.now(), userId, displayName};
    const libraryItemDocumentReference = doc(this.db,`library/${libraryItem.id}`);
    try {
      return updateDoc(libraryItemDocumentReference, { ...libraryItem });
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // returnItem()
  returnItem(libraryItem: LibraryItem) {
    GlobalService.devlog(`libraryService: returnItem()`);
    libraryItem.lended = {status: false};
    const libraryItemDocumentReference = doc(this.db,`library/${libraryItem.id}`);
    try {
      return updateDoc(libraryItemDocumentReference, { ...libraryItem });
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // filterByCategory()
  filterByCategory(category: Category) {
    GlobalService.devlog(`libraryService: filterByCategory(${JSON.stringify(category)})`);
    this.libraryItem$ = this.libraryItem$Unfiltered;
    this.libraryItem$ = this.libraryItem$.pipe(map(item => item.filter(c=>c.category === category.name)));
    // this.libraryItem$filteredByCategory = this.libraryItem$;
  }

  // filterByLended()
  filterByLended() {
    GlobalService.devlog(`libraryService: filterByLended()`);
    this.libraryItem$ = this.libraryItem$Unfiltered;
    this.libraryItem$ = this.libraryItem$.pipe(map(item => item.filter(c=>c.lended.status === true)));
  }

  // filterBySearchBar
  filterBySearchBar(filterString: string) {
    GlobalService.devlog(`libraryService: filterBySearchBar()`);
    // Results from search are NOT filtered by category.
    this.libraryItem$ =
      this.libraryItem$Unfiltered.pipe(
        map(item => item.filter(c =>
           (c.name.toLowerCase().indexOf(filterString.toLowerCase())>=0 ||
            c.line?.toLowerCase().indexOf(filterString.toLowerCase())>=0
           ))));
  }

  // createLibraryItem();
  async createLibraryItem(newLibraryItem: LibraryItem) {
    GlobalService.devlog(`libraryService: createLibraryItem()`);
    try {
      await addDoc(this.libraryCollection, newLibraryItem);
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // updateLibraryItem()
  async updateLibraryItem(updatedLibraryItem: LibraryItem) {
    GlobalService.devlog(`libraryService: updateLibraryItem()`);
    const libraryItemDocumentReference = doc(this.db,`library/${updatedLibraryItem.id}`);
    try {
      return updateDoc(libraryItemDocumentReference, { ...updatedLibraryItem });
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // deleteLibraryItem()
  async deleteLibraryItem(deletedLibraryItem: LibraryItem) {
    GlobalService.devlog(`libraryService: deletedLibraryItem()`);
    const libraryItemDocumentReference = doc(this.db,`library/${deletedLibraryItem.id}`);
    try {
      return deleteDoc(libraryItemDocumentReference);
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }


  // getLibraryItemById()
  async getLibraryItemById(sId: string) {
    GlobalService.devlog(`libraryService: getLibraryItemById()`);
    // return this.libraryItem$Unfiltered.pipe(map(item => item.filter(c=>c.id === sId)));
    const resPromise = new Promise<LibraryItem>((resolve, reject) =>
    {
      const res = this.libraryItem$Unfiltered.pipe(map(item => item.filter(c=>c.id === sId)));

      res.subscribe( resArray => {
        resolve(resArray[0]);
      });
    });

    return resPromise;
  }

  // getLibraryItemByBggId()
  async getLibraryItemByBggId(bggId: string) {
    GlobalService.devlog(`libraryService: getLibraryItemByBggId()`);
    // return this.libraryItem$Unfiltered.pipe(map(item => item.filter(c=>c.id === sId)));
    const resPromise = new Promise<LibraryItem | undefined>((resolve, reject) =>
    {
      const res = this.libraryItem$Unfiltered.pipe(map(item => item.filter(c=>c.bggId === bggId)));

      res.subscribe( resArray => {
        resolve(resArray[0]);
      });
    });

    return resPromise;
  }

  // AUXILIAR FUNCTIONS
  // getDelayedMockData()
  getDelayedMockData() {
    //return from(GlobalService.libraryItemsMock).pipe(concatMap(item => of(item).pipe(delay(1000))));
    return of(GlobalService.libraryItemsMock).pipe(delay(1500));
  }
}
