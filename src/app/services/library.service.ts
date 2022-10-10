// IMPORTS
import { Injectable              } from '@angular/core';
import { Firestore,
         collection,
         collectionData,
         CollectionReference,
         doc, updateDoc, addDoc,
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

// CLASS
@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // VARIABLES
  private libraryItem$: Observable<LibraryItem[]>;
  private libraryItem$Unfiltered: Observable<LibraryItem[]>;
  private libraryCollection: CollectionReference;
  private isMock = false;
  // private libraryItem$filteredByCategory:  Observable<LibraryItem[]>;;

  // CONSTRUCTOR
  constructor(private db: Firestore) {
    GlobalService.devlog('libraryService: contructor()');
    if (this.isMock) { this.libraryItem$Unfiltered = this.getDelayedMockData();}
    else {
      this.libraryCollection = collection(db, 'library');
      const q =  query(this.libraryCollection, orderBy('name'));
      this.libraryItem$Unfiltered = collectionData(q, {idField: 'id'}) as  Observable<LibraryItem[]>;
    }

    this.libraryItem$           = this.libraryItem$Unfiltered;
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
  filterByCategory(category: string) {
    GlobalService.devlog(`libraryService: filterByCategory(${category})`);
    this.libraryItem$ = this.libraryItem$Unfiltered;
    this.libraryItem$ = this.libraryItem$.pipe(map(item => item.filter(c=>c.category === category)));
    // this.libraryItem$filteredByCategory = this.libraryItem$;
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

  // AUXILIAR FUNCTIONS
  // getDelayedMockData()
  getDelayedMockData() {
    //return from(GlobalService.libraryItemsMock).pipe(concatMap(item => of(item).pipe(delay(1000))));
    return of(GlobalService.libraryItemsMock).pipe(delay(2000));
  }
}
