// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Custom Imports
import { GoogleMapsModule } from '@angular/google-maps';
// Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
// Pipes
import { RouteStringPipe } from './pipes/route-string.pipe';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddressInputComponent,
    RouteInputComponent,
    SideBarComponent,
    RouteStringPipe,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
