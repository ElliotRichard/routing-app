import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { FireBaseService } from '../../../services/firebase.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { Observable, of, Subject } from 'rxjs';

export const mockUserCollection = [
    {name: "mocked_dog",  address: "123 test st", owner: "mocked_owner", notes: ""},
    {name: "mocked_puppy", address: "456 test rd",owner: "mocked_owner_2", notes: "be polite" },

];

export const fakeFireBaseService:
  Pick<FireBaseService, keyof FireBaseService> = {
      getUserCollection(): Observable<any> {
	  return of(mockUserCollection);
  },
      authenticationStatus: of(true) as Subject<boolean>,
      signInUser() {},
      signOutUser() {},
      addDog() {},
      deleteDog() {}
};


describe('UserDialogComponent', () => {
  // An anonymous user
  // const authState: MockUser
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let mockFireBaseService = FireBaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      declarations: [ UserDialogComponent ],
	providers: [
	  { provide: FireBaseService, useValue: fakeFireBaseService },
      FormBuilder,
	  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
