// IMPORTS
import { Injectable                  } from '@angular/core';
import { Auth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         sendPasswordResetEmail,
         signOut,
         updateProfile,
         updatePassword,
         updateEmail                 } from '@angular/fire/auth';
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
  async updateEmail(newEmail: string) {
    GlobalService.devlog('auth.service: updateEmail()');
    try {
      const res = await updateEmail(this.auth.currentUser, newEmail.toString());
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // updateDisplayName()
  async updateDisplayName(newDisplayName: string) {
    GlobalService.devlog('auth.service: updateDisplayName()');
    try {
      const res = await updateProfile(this.auth.currentUser, { displayName: newDisplayName.toString()});
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // updatePassword()
  async updatePassword(newPassword: string) {
     GlobalService.devlog('auth.service: updatePassword()');
     try {
      const res = await updatePassword(this.auth.currentUser, newPassword.toString());
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // register()
  async register(arg: { email: string; password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, arg.email, arg.password);
      return user;
    } catch (e) {
      GlobalService.devlog(`  e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  // logout()
  async logout() {
    GlobalService.devlog('auth.service: logout()');
    return await signOut(this.auth);
  }
}
