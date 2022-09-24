// IMPORTS
import { Injectable } from '@angular/core';
import { Firestore,
         collection,
         collectionData,
         CollectionReference,
         query, doc, docData } from '@angular/fire/firestore';
// import { doc, getDoc } from '@firebase/Firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { LibraryItem } from '../interfaces/LibraryItem';

interface UserDetails {id: string; role: string; language: string};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // VARIABLES
  private user$: Observable<UserDetails[]>;
  private user$Unfiltered: Observable<UserDetails[]>;
  private usersCollection: CollectionReference;

  // CONSTRUCTOR
  constructor(private db: Firestore) {
    GlobalService.devlog('userService: contructor()');
    this.usersCollection = collection(db, 'users');
    const q =  query(this.usersCollection);
    this.user$ = collectionData(q, {idField: 'id'}) as  Observable<UserDetails[]>;
    this.user$Unfiltered = this.user$;
  }

  // PROPERTIES
  get getUser$() {
    return this.user$; // .pipe(share()) as Observable<LibraryItem[]>;
  }

  // FUNCTIONS
  // getUserById
  getUserById(id: string) {
    GlobalService.devlog(`userService: getUserById(${id})`);
    const userDocRef = doc(this.db, `users/${id}`);
    return docData(userDocRef, { idField: 'id' });
  }
}


