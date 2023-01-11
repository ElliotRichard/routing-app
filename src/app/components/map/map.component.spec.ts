import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './map.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
	imports: [
	    GoogleMapsModule,
	    HttpClientTestingModule
	],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
