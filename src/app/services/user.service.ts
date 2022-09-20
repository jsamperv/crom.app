// IMPORTS
import { Injectable } from '@angular/core';
import { Firestore,
         collection,
         collectionData,
         CollectionReference,
         doc, updateDoc,
         query } from '@angular/fire/firestore';
// import { doc } from '@firebase/Firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { LibraryItem } from '../interfaces/LibraryItem';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // VARIABLES
  private user$: Observable<LibraryItem[]>;
  private user$Unfiltered: Observable<LibraryItem[]>;
  private usersCollection: CollectionReference;

    // CONSTRUCTOR
    constructor(private db: Firestore) {
      GlobalService.devlog('userService: contructor()');
      this.usersCollection = collection(db, 'users');
      const q =  query(this.usersCollection);
      this.user$ = collectionData(q, {idField: 'id'}) as  Observable<LibraryItem[]>;
      this.user$Unfiltered = this.user$;
    }
}
