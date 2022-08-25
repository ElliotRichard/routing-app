import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user/user-dialog/user-dialog.component';

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

  constructor(
    public dialog: MatDialog,
    // public dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private dataService: DataService
  ) {
    this.matIconRegistry.addSvgIcon(
      'dog',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/images/dog.svg'
      )
    );
    this.address = { lat: -41.2945923, lng: 174.7629202 };
  }

  setAddress($event) {
    console.log(`App Event: ${$event.geometry.location}`);
    this.address = $event.geometry.location;
  }
}
