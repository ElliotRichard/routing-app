import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FireBaseService } from '../../../services/firebase.service';
import { SignInComponent } from './sign-in.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

    beforeEach(async () => {
	await TestBed.configureTestingModule({
	    declarations: [SignInComponent],
	    providers: [
		FireBaseService,
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase },
	],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
