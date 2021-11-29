// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  providers: [FireBaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
