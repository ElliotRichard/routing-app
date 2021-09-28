import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateMapComponent } from './alternate-map.component';

describe('AlternateMapComponent', () => {
  let component: AlternateMapComponent;
  let fixture: ComponentFixture<AlternateMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternateMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
