import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FireBaseService } from '../../../services/firebase.service';

export class instantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() authentication = new EventEmitter<boolean>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  instantErrorMatcher = new instantErrorStateMatcher();
  hidePassword = true;
  authenticated = false;
  constructor(private data: FireBaseService) {}

  ngOnInit(): void {
    this.data.authenticationStatus.subscribe((auth) => {
      this.authenticated = auth;
      this.authentication.emit(auth);
    });
  }

  onSubmit(): void {
    this.data.signInUser(
      this.emailFormControl.value,
      this.passwordFormControl.value
    );
  }

  signOut(): void {
    console.log('User signing out');
  }
}