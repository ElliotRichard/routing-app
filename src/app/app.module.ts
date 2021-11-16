// Angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Custom Imports
import { GoogleMapsModule } from '@angular/google-maps';
// Components
import { AddressInputComponent } from './components/address-input/address-input.component';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

// Pipes
import { RouteStringPipe } from './pipes/route-string.pipe';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// Firebase
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { MenuComponent } from './modules/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UserAccessDirective } from './user-access.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AddressInputComponent,
    AppComponent,
    MapComponent,
    RouteInputComponent,
    RouteStringPipe,
    SideBarComponent,
    MenuComponent,
    // UserAccessDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    NoopAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    MatDialogModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
