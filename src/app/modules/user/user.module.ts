import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FireBaseService } from './firebase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [UserDialogComponent, SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
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
