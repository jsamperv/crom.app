// IMPORTS
import { Injectable                  } from '@angular/core';
import { Auth,
         signInWithEmailAndPassword,
         signOut                     } from '@angular/fire/auth';
import { FirebaseError               } from 'firebase/app';
import { devlog                      } from  'src/app/shared/sharedFunctions';

// INTERFACES

// CLASS
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // VARIABLES

  // CONSTRUCTOR
  constructor(private auth: Auth) {
    devlog('auth.service: constructor()');
  }

  // PROPERTIES

  // FUNCTIONS
  async login(email: string, password: string) {
    devlog('auth.service: login()');
    try {
      const userCr = await signInWithEmailAndPassword(this.auth, email, password);
      return userCr;
    } catch (e) {
      devlog(`e.code: ${e.code as FirebaseError}, e.name: ${e.name as FirebaseError}`);
      throw e;
    }
  }

  async logout() {
    devlog('auth.service: logout()');
    return await signOut(this.auth);
  }
}
