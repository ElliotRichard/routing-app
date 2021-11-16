import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ElementHostDirective } from 'src/app/element-host.directive';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(ElementHostDirective)
  elementHost!: ElementHostDirective;
  public componentPlaceholder: ViewContainerRef;
  showUserAccess = false;
  authenticated = false;
  constructor() {}

  ngOnInit(): void {}
  loadUserAccessComponent() {
    this.showUserAccess = true;
    import('./menu.module').then(({ MenuModule }) => {
      const viewContainerRef = this.elementHost.viewContainerRef;
      viewContainerRef.clear();
      const userAccessComponent = MenuModule.getUserAccessComponent();
      viewContainerRef.createComponent(userAccessComponent);
    });
  }
}
