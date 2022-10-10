import { NgModule            } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { RouteReuseStrategy  } from '@angular/router';
import { IonicModule,
         IonicRouteStrategy  } from '@ionic/angular';
import { AppRoutingModule    } from './app-routing.module';
import { AppComponent        } from './app.component';
// firebase
import { environment         } from '../environments/environment';
import { provideFirebaseApp,
         initializeApp       } from '@angular/fire/app';
import { provideFirestore,
         getFirestore        } from '@angular/fire/firestore';
import { provideAuth,
         getAuth             } from '@angular/fire/auth';

// @ngx-translate
import { TranslateModule,
         TranslateLoader     } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule,
         HttpClient          } from '@angular/common/http';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/locale-', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule
            , IonicModule.forRoot()
            , AppRoutingModule
            , provideFirebaseApp(()=>initializeApp(environment.firebase))
            , provideFirestore(()=>getFirestore())
            , provideAuth(() => getAuth())
            , HttpClientModule
            , TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
              }
            }),
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
