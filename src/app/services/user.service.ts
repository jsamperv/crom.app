// IMPORTS
import { Injectable           } from '@angular/core';
import { Firestore, setDoc,
         collection, updateDoc,
         collectionData,
         CollectionReference,
         query, doc, docData, } from '@angular/fire/firestore';
import { FirebaseError        } from 'firebase/app';
import { Observable           } from 'rxjs';
import { GlobalService        } from './global.service';

// INTERFACES
export interface UserDetails {id: string; role: string; language: string; name: string};

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
  // getUserById()
  getUserDetails(id: string) {
    GlobalService.devlog(`userService: getUserById(${id})`);
    const userDocRef = doc(this.db, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<UserDetails>;
  }

  // isUserAdmin()
  async isUserAdmin(id: string) {
    GlobalService.devlog('userService: isUserAdmin()');
    const resPromise = new Promise<boolean>
    ((resolve) => {
      const res = this.getUserDetails(id);
      res.subscribe((user) => {
        if (user.role === 'admin') { resolve(true); }
        else { resolve(false); }
      });
    });
    return resPromise;
  }

  // addUserDetails()
  async addUserDetails(userDetails: UserDetails) {
    GlobalService.devlog('userService: createUser()');
    try {
      await setDoc(doc(this.db, 'users', userDetails.id),
        {role: userDetails.role, language: userDetails.language, name: userDetails.name});
      //await addDoc(this.usersCollection, userDetails);
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // updateUserDetails()
  async updateUserDetails(userId: string, details: any) {
    const userDetailsDocumentReference = doc(this.db,`users/${userId}`);
    try {
      return await updateDoc(userDetailsDocumentReference, details);
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

}


