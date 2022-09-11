// IMPORTS
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { LibraryItem } from '../interfaces/LibraryItem';

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
    this.libraryItem$ = collectionData(this.libraryCollection) as  Observable<LibraryItem[]>;
   }

  // PROPERTIES
  get getLibraryItem$() { return this.libraryItem$; }

  // FUNCTIONS
  lendItem(name: string) {
    GlobalService.devlog('libraryService: lendItem()');

  }

  // AUXILIAR FUNCTIONS
}
