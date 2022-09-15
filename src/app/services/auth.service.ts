// IMPORTS
import { Injectable                  } from '@angular/core';
import { Auth,
         signInWithEmailAndPassword,
         sendPasswordResetEmail,
         signOut                     } from '@angular/fire/auth';
import { FirebaseError               } from 'firebase/app';
import { GlobalService               } from 'src/app/services/global.service';

// INTERFACES

// CLASS
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // VARIABLES

  // CONSTRUCTOR
  constructor(private auth: Auth) {
    GlobalService.devlog('auth.service: constructor()');
  }

  // PROPERTIES
  get userId(): string      { return this.auth.currentUser.uid; }
  get displayName(): string { return this.auth.currentUser.displayName; }
  get email(): string       { return this.auth.currentUser.email; }

  // FUNCTIONS
  // login()
  async login(email: string, password: string) {
    GlobalService.devlog('auth.service: login()');
    try {
      const userCr = await signInWithEmailAndPassword(this.auth, email, password);
      return userCr;
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // resetPassw()
  async resetPassw(email: string) {
    GlobalService.devlog('auth.service: resetPassw()');
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // updateEmail()
  async updateEmail(email: string) { GlobalService.devlog('auth.service: updateEmail()'); }

  // updateDisplayName()
  async updateDisplayName(displayName: string) { GlobalService.devlog('auth.service: updateDisplayName()'); }

  // updatePassword()
  async updatePassword(displayName: string) { GlobalService.devlog('auth.service: updatePassword()'); }

  // logout()
  async logout() {
    GlobalService.devlog('auth.service: logout()');
    return await signOut(this.auth);
  }
}
