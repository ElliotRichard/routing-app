import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementHostDirective } from '../element-host.directive';
// import { }

@NgModule({
  declarations: [ElementHostDirective],
  imports: [CommonModule],
  exports: [ElementHostDirective],
})
export class SharedModule {}
