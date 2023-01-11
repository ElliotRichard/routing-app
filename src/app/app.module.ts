// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Material
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Components
import { AddressInputComponent } from './components/address-input/address-input.component';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserAccessComponent } from '../app/components/user/user-access/user-access.component';
import { UserDialogComponent } from './components/user/user-dialog/user-dialog.component';
// Pipes
import { RouteStringPipe } from './pipes/route-string.pipe';
// Custom Imports
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../environments/environment';
// Services
import { FireBaseService } from './services/firebase.service';
import { AddressPipe } from './pipes/address.pipe';
import { TimeDateFormComponent } from './components/time-date-form/time-date-form.component';

@NgModule({
  declarations: [
    AddressInputComponent,
    AppComponent,
    MapComponent,
    RouteInputComponent,
    RouteStringPipe,
    SideBarComponent,
    MenuComponent,
    UserAccessComponent,
    SignInComponent,
    UserDialogComponent,
    AddressPipe,
    TimeDateFormComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatButtonModule,
	MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
    FireBaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
