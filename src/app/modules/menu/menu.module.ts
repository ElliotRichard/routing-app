import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccessComponent } from '../user/user-access/user-access.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuComponent } from './menu.component';
@NgModule({
  declarations: [UserAccessComponent],
  imports: [CommonModule, SharedModule],
  bootstrap: [MenuComponent],
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
