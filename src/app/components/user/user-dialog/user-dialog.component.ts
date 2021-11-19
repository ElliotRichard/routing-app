import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DialogData } from '../../../app.component';
import { FireBaseService } from '../../../services/firebase.service';
import { IFireBaseDog } from '../../../types';

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
      cell: (dog: IFireBaseDog) => `${dog.name}`,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (dog: IFireBaseDog) => `${dog.address}`,
    },
    {
      columnDef: 'owner',
      header: 'Owner',
      cell: (dog: IFireBaseDog) => `${dog.owner}`,
    },

    {
      columnDef: 'notes',
      header: 'Notes',
      cell: (dog: IFireBaseDog) => `${dog.notes}`,
    },
    {
      columnDef: 'action',
      header: 'Action',
      cell: (dog: IFireBaseDog) => ``,
    },
  ];
  newDog: IFireBaseDog = {
    name: '',
    address: '',
    coordinates: '',
    owner: '',
    notes: '',
  };
  name = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  owner = new FormControl('', [Validators.required]);
  notes = new FormControl('');
  dataSource;
  displayedColumns = this.columns.map((c) => c.columnDef);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fireBase: FireBaseService,
    public dataService: DataService
  ) {
    this.dataSource = this.fireBase.getUserCollection();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDog(): void {
    console.log('Adding', this.newDog);

    this.fireBase.addDog(this.newDog);
    this.newDog = {} as IFireBaseDog;
  }
}
