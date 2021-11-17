import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementHostDirective } from './element-host.directive';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [ElementHostDirective],
  imports: [CommonModule, MatButtonModule],
  exports: [ElementHostDirective, MatButtonModule],
})
export class SharedModule {}
