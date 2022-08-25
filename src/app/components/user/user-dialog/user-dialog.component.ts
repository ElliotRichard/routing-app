import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogData } from '../../../../shared/types';
import { FireBaseService } from '../../../services/firebase.service';
import { ICoordinate, IDog } from '../../../../shared/types';
import { instantErrorStateMatcher } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  @ViewChild('addressInput') addressInput;
  public columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (dog: IDog) => `${dog.name}`,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (dog: IDog) => `${dog.address}`,
    },
    {
      columnDef: 'owner',
      header: 'Owner',
      cell: (dog: IDog) => `${dog.owner}`,
    },

    {
      columnDef: 'notes',
      header: 'Notes',
      cell: (dog: IDog) => `${dog.notes}`,
    },
    {
      columnDef: 'action',
      header: 'Action',
      cell: (dog: IDog): IDog => dog,
    },
  ];
  public instantErrorMatcher = new instantErrorStateMatcher();
  public dataSource;
  public newDogForm: FormGroup;
  public displayedColumns = this.columns.map((c) => c.columnDef);
  private coordinates: ICoordinate;
  private dogNames: string[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fireBase: FireBaseService,
    public dataService: DataService
  ) {
    this.newDogForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', this.checkValidAddress()],
      owner: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.fireBase.getUserCollection().pipe(
      map((collection) => this.dataSource = collection),
      tap((collection) => {
        this.dogNames = collection.map(({ name }) => name);
      })
    ).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addressSet($event) {
    let place = $event as google.maps.places.PlaceResult;
    this.coordinates = place.geometry.location.toJSON();
    let addresses: string[] = [];
    place.address_components.forEach((component) => {
      addresses.push(component.long_name);
    });
    let address = addresses.join(',').replace(',', ' ');
    this.newDogForm.controls.address.setValue(address);
  }

  checkUniqueName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.dogNames.includes(control.value)
        ? { notUnique: true}
        :  null;
    };
  }

  checkValidAddress(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.coordinates && this.coordinates.lat && this.coordinates.lng
        ? null
        : { required: true };
    };
  }

  addDog(): void {
    let newDog: IDog = {
      name: this.newDogForm.controls.name.value,
      address: this.newDogForm.controls.address.value,
      coordinates: this.coordinates,
      owner: this.newDogForm.controls.owner.value,
      notes: this.newDogForm.controls.notes.value,
    };
    
    if (
      this.newDogForm.controls.name.valid &&
      this.newDogForm.controls.address.valid &&
      this.coordinates.lat &&
      this.coordinates.lng
    ) {
      this.fireBase.addDog(newDog);
      this.clearNewDogForm();
    } else {
      console.log(
        `Can't Add Dog: ${this.newDogForm.controls.name.value}: ${this.newDogForm.controls.name.valid} address: ${this.newDogForm.controls.address.valid} lat: ${this.coordinates.lat} long: ${this.coordinates.lng}`
      );
    }
  }

  private clearNewDogForm() {
    this.newDogForm.controls.name.setValue('');
    this.newDogForm.controls.owner.setValue('');
    this.newDogForm.controls.notes.setValue('');
    this.addressInput.addressText.nativeElement.innerText = '';
    this.newDogForm.markAsUntouched;
  }

  deleteDog(dog: IDog | string): void {
    this.fireBase.deleteDog(dog as IDog);
  }

  addDogToRoute(dog: IDog | string): void {
    this.dataService.addDogToRoute(dog as IDog);
  }
}
