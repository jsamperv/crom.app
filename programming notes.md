# crom.app 

## Firebase

First you have to setup your firebase project in console.firebase.google.com,  
adding an app with email/password authentication and seting up the firestoreDB.

1. Installing firebase cli: `npm install -g firebase-tools`
2. Checking your projects: `firebase projects:list`  
3. Adding firebase to your project: `ng add @angular/fire`  
   - assuming you have installed angular cli, if not:  `npm i -g @angular/cli`

You will be asked a series of questions, in this project for now we need:  
- Authentication
- Firestore

https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

## Internationalization library @ngx-translate

http://www.ngx-translate.com/

Installing the library:

1. `npm i @ngx-translate/core --save`
2. `npm i @ngx-translate/http-loader --save`

The dictionary has to be in `assets/i18n/locale-xx.json` with pairs "key":"translation".  
To use it in the html there is a pipe translate `{{ "key" | translate }}` and  
you have to import the module `import { TranslateModule } from '@ngx-translate/core';`.  
To use in the **.ts** you have the function: `translate.instant("key");`.

You have to `import TranslateModule.forRoot()` in the root NgModule of your application.
By default, there is no loader available. You can add translations manually using setTranslation but it is better to use a loader. You can write your own loader, or import an existing one. For example you can use the TranslateHttpLoader that will load translations from files using HttpClient.  

``` typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/locale-', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            defaultLanguage: 'ca',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
In app.component.ts:

``` typescript
 // NGONINIT
  ngOnInit() {
    this.translate.addLangs(['ca', 'es']);
  }
```

## Firebase hosting and progressive webapp

To setup a firebase hosting you have to do next steps (assuming we have firebase):  
1. `firebase init hosting`  
· chosing public directory: www  
· single web-application: Yes  
· auto-build: No
2. `ionic build --prod`
3. `firebase deploy --only hosting` 