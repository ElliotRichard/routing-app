import { Component } from '@angular/core';
import { FireBaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public userSignedIn = false;
  constructor(private fireBase: FireBaseService) { }

  signedIn($event: boolean) {
    this.userSignedIn = !!$event;
  }

  signOut() {
    this.userSignedIn = false;
    this.fireBase.signOutUser();
  }

}
