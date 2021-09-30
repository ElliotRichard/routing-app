import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './mixins.scss'],
})
export class AppComponent {
  title = 'routing-app';
  address: any = '';
  APIKey = 'AIzaSyBe6YqLpwHy8-5VHaObcMF2T52qOd-VL-Y';
  options: google.maps.MapOptions = {
    center: { lat: -41.2945923, lng: 174.7629202 },
    zoom: 4,
  };
  constructor() {
    this.address = { lat: -41.2945923, lng: 174.7629202 };
  }

  setAddress($event) {
    console.log(`App Event: ${$event.geometry.location}`);
    this.address = $event.geometry.location;
  }
}
