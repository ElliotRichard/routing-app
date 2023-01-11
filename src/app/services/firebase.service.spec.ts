import { TestBed } from '@angular/core/testing';
import { FireBaseService } from './firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../environments/environment';

describe('FirebaseService', () => {
    let service: FireBaseService;
    
    beforeEach(() => {
	TestBed.configureTestingModule({
	    imports: [
			AngularFireModule.initializeApp(environment.firebase),
	    ], 
	    providers: [
			{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }
	    ]});
	service = TestBed.inject(FireBaseService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
