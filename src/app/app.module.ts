// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Custom Imports
import { GoogleMapsModule } from '@angular/google-maps';
// Components
import { AppComponent } from './app.component';
import { AlternateMapComponent } from './components/alternate-map/alternate-map.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    AlternateMapComponent,
    AutocompleteComponent,
    AddressInputComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
