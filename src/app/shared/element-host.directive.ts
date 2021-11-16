import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[elementHost]',
})
export class ElementHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
