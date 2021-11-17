import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../app.component';
import { FireBaseService } from '../../../services/firebase.service';
export interface fireBaseDog {
  name: string;
  address: string;
  coordinates: { latitude: string; longitude: string } | string;
  owner: string;
  notes: string;
}
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  dogs: any;
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (dog: fireBaseDog) => `${dog.name}`,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (dog: fireBaseDog) => `${dog.address}`,
    },
    {
      columnDef: 'notes',
      header: 'Notes',
      cell: (dog: fireBaseDog) => `${dog.notes}`,
    },
  ];
  newDog: fireBaseDog = {
    name: '',
    address: '',
    coordinates: '',
    owner: '',
    notes: '',
  };
  dataSource;
  displayedColumns = this.columns.map((c) => c.columnDef);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fireBase: FireBaseService
  ) {
    this.dataSource = this.fireBase.getUserCollection();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
