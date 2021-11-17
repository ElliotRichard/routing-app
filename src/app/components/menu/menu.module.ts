import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccessComponent } from '../user/user-access/user-access.component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  bootstrap: [],
})
/**
 * A middleware module that means user module
 * is only loaded when necessary
 */
export class MenuModule {
  static getUserAccessComponent() {
    return UserAccessComponent;
  }
}
