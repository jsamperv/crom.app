// IMPORTS
import { Injectable                  } from '@angular/core';
import { Auth,
         signInWithEmailAndPassword,
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

  // logout()
  async logout() {
    GlobalService.devlog('auth.service: logout()');
    return await signOut(this.auth);
  }
}
