// IMPORTS
import { Injectable } from '@angular/core';
import { Firestore,
         collection,
         collectionData,
         CollectionReference,
         doc, updateDoc,
         query } from '@angular/fire/firestore';
// import { doc } from '@firebase/Firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { LibraryItem } from '../interfaces/LibraryItem';
import { orderBy } from 'firebase/firestore';

// CLASS
@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // VARIABLES
  private libraryItem$: Observable<LibraryItem[]>;
  private libraryCollection: CollectionReference;

  // CONSTRUCTOR
  constructor(private db: Firestore) {
    GlobalService.devlog('libraryService: contructor()');
    this.libraryCollection = collection(db, 'library');
    const q =  query(this.libraryCollection, orderBy('name'));
    this.libraryItem$ = collectionData(q, {idField: 'id'}) as  Observable<LibraryItem[]>;
    // NO BORRAR ...
    // this.libraryItem$= this.libraryItem$.pipe(
    //   map<LibraryItem[],LibraryItem[]>((data)=>{data.map(d=>{d.name=d.name;}); return data;}));
    // this.libraryItem$= this.libraryItem$.pipe(
    //     map<LibraryItem[],LibraryItem[]>((data)=>{
    //       data.sort((c,d)=>{const num = c.category.localeCompare(d.category); return num;}); return data;}));
    // NO BORRAR ...
    }

  // PROPERTIES
  get getLibraryItem$() { return this.libraryItem$; }

  // FUNCTIONS
  // lendItem()
  lendItem(libraryItem: LibraryItem, userId: string) {
    GlobalService.devlog(`libraryService: lendItem()`);
    libraryItem.lended = {status: true, since: Date.now(), userId};
    const libraryItemDocumentReference = doc(this.db,`library/${libraryItem.id}`);
    return updateDoc(libraryItemDocumentReference, { ...libraryItem });
  }

  // returnItem()
  returnItem(libraryItem: LibraryItem) {
    GlobalService.devlog(`libraryService: returnItem()`);
    libraryItem.lended = {status: false};
    const libraryItemDocumentReference = doc(this.db,`library/${libraryItem.id}`);
    return updateDoc(libraryItemDocumentReference, { ...libraryItem });
  }

  // AUXILIAR FUNCTIONS
}
