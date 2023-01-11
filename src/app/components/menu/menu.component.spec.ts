import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeFireBaseService } from '../user/user-dialog/user-dialog.component.spec';
import { FireBaseService } from '../../services/firebase.service';
import { MenuComponent } from './menu.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    
    beforeEach(async () => {
      await TestBed.configureTestingModule({
	declarations: [ MenuComponent ],
	providers: [
	    FireBaseService,
	    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
	],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
