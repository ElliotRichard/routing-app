import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FireBaseService } from '../../../services/firebase.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss'],
})
export class UserAccessComponent implements OnInit {
  // @ViewChild(ElementHostDirective)
  // userAccessHost!: ElementHostDirective;
  public componentPlaceholder: ViewContainerRef;
  authenticated = false;
  constructor(private data: FireBaseService, public dialog: MatDialog) {}

  ngOnInit(): void {}
  loadSignIn() {}
  openDialog() {
    this.dialog.open(UserDialogComponent);
  }
}
