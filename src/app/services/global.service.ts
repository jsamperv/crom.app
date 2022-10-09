// IMPORTS
import { Injectable        } from '@angular/core';
import { environment       } from 'src/environments/environment';
import { TranslateService  } from '@ngx-translate/core';
import { AlertController   } from '@ionic/angular';
import { LibraryItem       } from '../interfaces/LibraryItem';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // MOCK
  public static libraryItemsMock: LibraryItem[] =
  [
    {id:'1', name: 'joc1', category:'boardgame', lended:{status:false}, outOfLend: false},
    {id:'2', name: 'joc2', category:'wargame'  , lended:{status:false}, outOfLend: false},
    {id:'3', name: 'joc3', category:'roleplay' , lended:{status:false}, outOfLend: false},
    {id:'4', name: 'joc4', category:'book'     , lended:{status:false}, outOfLend: false},
    {id:'5', name: 'xoc5', category:'book'     , lended:{status:false}, outOfLend: false, line: 'liniaJ'},

  ];

   // CONSTRUCTOR
   constructor(
    private translate: TranslateService) {
      GlobalService.devlog('globalService: constructor()');
  }

  // VARIABLE
  get version() { return 0.1; };
  get categories() { return ['boardgame', 'wargame', 'roleplay', 'book'];};

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

  // ShowAlertWithQuestion()
  showAlertWithQuestion =
   async (headerKey: string, messageKey: string, okKey: string = 'ok', cancelKey: string = 'cancel') => {
    GlobalService.devlog('globalService: showAlertWithQuestion()');

    let bReturn: boolean;

    const header: string  = this.translate.instant(headerKey);
    const message: string = this.translate.instant(messageKey);
    const ok: string      = this.translate.instant(okKey);
    const cancel: string  = this.translate.instant(cancelKey);

    const alertCtrl: AlertController = new AlertController();
    const alert = await alertCtrl.create({
      header,
      message,
      buttons: [
        {text: ok, role: 'confirm', handler: () => bReturn = true },
        {text: cancel, role: 'cancel', handler: () => bReturn = false }],

    });
    await alert.present();
    await alert.onDidDismiss();
    return bReturn;
  };
}
