# crom.app 

## Firebase

First you have to setup your firebase project in console.firebase.google.com, adding an app with email/password authentication and seting up the firestoreDB.

1. Installing firebase cli: `npm install -g firebase-tools`
2. Checking your projects: `firebase projects:list`  
3. Adding firebase to your project: `ng add @angular/fire`  
   - assuming you have installed angular cli, if not:  `npm i -g @angular/cli`

You will be asked a series of questions, in this project for now we need:  
- Authentication
- Firestore

