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
    this.data.authenticationStatus.subscribe((isSignedIn) => {
      this.authenticated = isSignedIn;
      this.authentication.emit(isSignedIn);
    });
  }

  onSubmit(): void {
    if (
      this.emailFormControl.value.length < 1 ||
      this.passwordFormControl.value.length < 1
    ) {
      console.log('using auto auth values');
      this.data.signInUser('elliotpedley@gmail.com', 'router');
    } else {
      this.data.signInUser(
        this.emailFormControl.value,
        this.passwordFormControl.value
      );
    }
  }

  nextField($event) {
    let event: Event = $event as Event;
    let targetElement: HTMLElement = event.target as HTMLElement;
    let formElement = targetElement as any;
    let sibling = formElement.form[1] as HTMLElement;
    if (sibling == null)
      // check if its null
      return;
    else {
      sibling.focus();
    } // focus if not null
  }
}
