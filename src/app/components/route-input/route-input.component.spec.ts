import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteStringPipe } from 'src/app/pipes/route-string.pipe';
import { RouteInputComponent } from './route-input.component';
import { MatIconModule } from '@angular/material/icon';
import { AddressInputComponent } from '../address-input/address-input.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('RouteInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;
  const currentTime = new Date();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddressInputComponent,
        RouteInputComponent,
        RouteStringPipe,
      ],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        NoopAnimationsModule
      ],
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

  it('should pass if input time is in past', () => {
    let pastHour: string | number = currentTime.getHours();
    if (pastHour !== 0) pastHour--;
    pastHour = `0${pastHour}`.slice(-2);
    const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    expect(component.hasChosenTimePast(mockInput)).toBeTrue();
  });

  it(`should fail if input time is in future`, () => {
    let futureHour: string | number = currentTime.getHours();
    if (futureHour !== 23) futureHour++;
    futureHour = `0${futureHour}`.slice(-2);
    const mockInput = `${futureHour}:${currentTime.getMinutes()}`;
    expect(component.hasChosenTimePast(mockInput)).toBeFalse();
  });

  it('should fail if date is set to past', () => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    expect(component.isChosenDateToday(pastDate)).toBeFalse();
  });

  it('should fail if date chosen is in future', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1);
    expect(component.isChosenDateToday(futureDate)).toBeFalse();
  });

  it('should pass if date chosen is today', () => {
    const currentDate = new Date();
    expect(component.isChosenDateToday(currentDate)).toBeTrue();
  });
});
