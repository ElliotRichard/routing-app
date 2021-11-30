# Routing-App - 'K9a-Finda'

This is a route finding app I built for a friend. After the client inputs the addresses they want to visit an optimized order is returned, displaying the data on the app. Authorized users can also save dog details to be added to future routes.
<br/>Excuse the name, I wanted it to rhyme.

Check it out: [https://k9a-finda.web.app](https://router-app-dced6.web.app/home)
![home](documentation/home_screenshot.png)

## Technologies

- [Angular](https://angular.io/) ![npm](https://img.shields.io/npm/v/@angular/core)
- [Angular Material Design](https://material.angular.io/) ![npm](https://img.shields.io/npm/v/@angular/material)
- [Firebase](https://firebase.google.com/) ![npm](https://img.shields.io/npm/v/firebase)
- [Angular Fire](https://github.com/angular/angularfire) ![npm](https://img.shields.io/npm/v/rxfire)
- [Typescript](https://www.typescriptlang.org/) ![npm](https://img.shields.io/npm/v/typescript)
- [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overviewangular)

## Use

Integration with Firebase 'firestore' allows users to save dogs.

![dogs](documentation/dogs_screenshot.png)

They can then add these to the current route:
![route example](documentation/route_mixed_screenshot.png)

Which is then displayed on the map:
![route_mapped_example](documentation/route_mixed_mapped_screenshot.png)

