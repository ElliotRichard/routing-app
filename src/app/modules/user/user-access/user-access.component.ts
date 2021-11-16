import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ElementHostDirective } from 'src/app/element-host.directive';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss'],
})
export class UserAccessComponent implements OnInit {
  @ViewChild(ElementHostDirective)
  userAccessHost!: ElementHostDirective;
  public componentPlaceholder: ViewContainerRef;
  authenticated = false;
  constructor() {}

  ngOnInit(): void {
    this.loadSignIn();
  }
  loadSignIn() {
    import('../user.module').then(({ UserModule }) => {
      const viewContainerRef = this.userAccessHost.viewContainerRef;
      viewContainerRef.clear();
      const signInComponent = UserModule.getSignInComponent();
      viewContainerRef.createComponent(signInComponent);
    });
  }
}
