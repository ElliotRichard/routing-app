import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'routing-app';
  address: any = '';
  APIKey = 'AIzaSyBe6YqLpwHy8-5VHaObcMF2T52qOd-VL-Y';
  options: google.maps.MapOptions = {
    center: { lat: -41.2945923, lng: 174.7629202 },
    zoom: 4,
  };
  response = '';
  items: any;
  data: any;
  apiLoaded: Observable<boolean>;
  constructor(
    public dialog: MatDialog,
    // public dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private httpClient: HttpClient,
  ) {
    this.matIconRegistry.addSvgIcon(
      'dog',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/images/dog.svg'
      )
    );
    this.address = { lat: -41.2945923, lng: 174.7629202 };
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.APIKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }


  setAddress($event) {
    console.log(`App Event: ${$event.geometry.location}`);
    this.address = $event.geometry.location;
  }
}
