import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementHostDirective } from 'src/app/shared/element-host.directive';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewChecked {
  // @ViewChild('userAccessHost', { read: ViewContainerRef })
  @ViewChildren('userAccessHost', { read: TemplateRef })
  _template: TemplateRef<any>;
  @ViewChild('userAccess', { read: ViewContainerRef })
  viewerContainer: ViewContainerRef;
  // userAccessHost: ViewContainerRef;
  // elementHost!: ElementHostDirective;
  // public componentPlaceholder: ViewContainerRef;
  showUserAccess = false;
  viewInitialized = false;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewChecked(): void {
    this.viewInitialized = true;
    console.log('showUserAccess:', this.showUserAccess);
  }
  loadUserAccessComponent() {
    if (this.viewInitialized) {
      this.showUserAccess = true;
      import('./menu.module').then(({ MenuModule }) => {
        // this.userAccessHost.createEmbeddedView(
        // MenuModule.getUserAccessComponent()
        // );

        // const view = this._template.createEmbeddedView(userAccessComponent);
        if (!this.viewerContainer) {
          let div = document.createElement('ng-container');
          div.id = 'userAccessHost';
          document.getElementById('userAccessParent').appendChild(div);
        }
        const userAccessComponent = MenuModule.getUserAccessComponent();
        this.viewerContainer.createComponent(userAccessComponent);

        // this.userAccessHost.createComponent(userAccessComponent);
        // const viewContainerRef = this.elementHost.viewContainerRef;
        // viewContainerRef.clear();
        // const userAccessComponent = MenuModule.getUserAccessComponent();
        // viewContainerRef.createComponent(userAccessComponent);
      });
    } else {
      console.log(`Can't generate User Access, View not initialized!`);
    }
  }
}
