// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase
import { FireBaseService } from './firebase.service';
// Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [UserDialogComponent, SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
  ],
  providers: [FireBaseService],
})
export class UserModule {
  static getUserDialogComponent() {
    return UserDialogComponent;
  }
  static getSignInComponent() {
    return SignInComponent;
  }
}
