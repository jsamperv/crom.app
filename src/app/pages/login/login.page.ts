// IMPORT
import { Component,
         OnInit      } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators  } from '@angular/forms';
import { devlog      } from  'src/app/shared/sharedFunctions';

// INTERFACES

// CLASS
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // VARIABLES
  private fgLoginCredentials: FormGroup;

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {
    devlog('login: constructor()');
  }

  // PROPERTIES
  get loginCredentials() { return this.fgLoginCredentials; }

  // NGONINIT
  ngOnInit() {
    devlog('login: ngOnInit()');

    // Form Group Inicialization
    this.fgLoginCredentials =
        this.fb.group({
          email:   ['', [Validators.required, Validators.email]],
          password:['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // FUNCTIONS
  async login() {
    devlog('login: login()');
  }

}
