import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIcon(
      'dog',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://localhost/routing-app/images/dog.svg'
      )
    );
    this.address = { lat: -41.2945923, lng: 174.7629202 };
  }

  setAddress($event) {
    console.log(`App Event: ${$event.geometry.location}`);
    this.address = $event.geometry.location;
  }
}
