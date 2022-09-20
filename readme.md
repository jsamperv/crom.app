# crom.app
## Introduction
Aplication for CROM rol and games club. Initially a library of items where an  
authenticated user can see as a list, lend one and take it home. (TAB1)  

Also, the user can edit profile: name, email and password; and settings: language  
(es, ca). (TAB2)

My intention with this application is to integrate my knowledge of javascript  
technologies into an simple and useful app for a non-profit org.

## Technologies
The aplication is programmed with **typescript** (4.7.4) language, and uses the  
**angularjs** (14.2.1) framework combined with **ionic** (6.2.4) framework for  
visual purposes and cross-platform implementation. At first but, this will be  
tested only as a WWW application and a webapp application with **service  
workers**.  

The aplication also uses **Firebase** (11.8.0) for authentication, **Firebase  
Firestore** nosql database for storage purposes, **Firebase cloud messaging**  
for push notifications (optional).  

The aplication is stored with **git** version control service in __github__.  

## Setup
The pc needs **git**, **node.js** (16.17.0), **angular** and **ionic** frameworks to do   
the installation. 
```
> git clone https://github.com/jsamperv/crom.app.git   
> npm install  
> ionic serve  
```
Clones the remote repository from github, installs the packages necessaries to  
run the project and finally compile the project in www and run a server that  
shows the app.

## Project Status 
The user login is implemented, the minimum application is implemented.  
A basic library item creation page is implemented for admins is implemented.  
Basic filtering for category is implemented.  

## Future improvements
- Applying reservations.
- Aplying more visualization filters (free, reserved, ...) to the list of items. 
- Aplying ordered lists (not only by name) to the list of items.
- Detailed view for an item.
- Lending stats.
- User recomendations and scoring lists.
- tag lists and filters.
- CRUD for admins to easily add or edit items.
- An inventory of items that are in ALL the club?

## Sources && Inspiration
[Node Javascript](https://nodejs.org)  
[Angular Framework](https://angular.io)  
[Ionic Framework](https://ionicframework.com)  
[Firebase](https://firebase.google.com)  

[Project Sourcecode](https://github.com/jsamperv/crom.app) on Github

[Simon Grimm's Youtube Channel](https://www.youtube.com/c/SimonGrimmDev) with good ionic tutorials.

## Contact
email: jordi.samper@gmail.com
