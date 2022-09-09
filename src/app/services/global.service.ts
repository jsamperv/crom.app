// IMPORTS
import { Injectable        } from '@angular/core';
import { environment       } from 'src/environments/environment';
import { TranslateService  } from '@ngx-translate/core';
import { AlertController   } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

   // CONSTRUCTOR
   constructor(
    private translate: TranslateService) {
      GlobalService.devlog('globalService: constructor()');
  }

  // FUNCTIONS
  // devlog()
  public static devlog = (message: string) => {
      if (!environment.production) {
        console.log(message);
      }
  };

  // showAlert()
  showAlert = async (headerKey: string, messageKey: string, okKey: string = 'ok') => {
    GlobalService.devlog('globalService: showAlert()');

    const header: string  = this.translate.instant(headerKey);
    const message: string = this.translate.instant(messageKey);
    const ok: string      = this.translate.instant(okKey);

    const alertCtrl: AlertController = new AlertController();
    const alert = await alertCtrl.create({
      header,
      message,
      buttons: [ok]
    });
    await alert.present();

  };
}
