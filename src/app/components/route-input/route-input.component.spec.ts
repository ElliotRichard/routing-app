import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInputComponent } from './route-input.component';

describe('AddressInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
