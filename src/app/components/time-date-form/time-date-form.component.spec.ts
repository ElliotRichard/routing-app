import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimeDateFormComponent } from './time-date-form.component';

describe('TimeDateFormComponent logic', () => {
  let component: TimeDateFormComponent;
  let fixture: ComponentFixture<TimeDateFormComponent>;
  let rootElement: DebugElement;
  let currentTime: Date;
  let bothPast: timeDate, timePast: timeDate, datePast: timeDate, bothFuture: timeDate;
  let form: FormGroup;
  let time: AbstractControl, date: AbstractControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeDateFormComponent],
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currentTime = new Date();
    bothPast = { time: getPastTime(currentTime), date: getPastDate() };
    timePast = { time: getPastTime(currentTime), date: getFutureDate() };
    datePast = { time: getFutureTime(currentTime), date: getPastDate() };
    bothFuture = { time: getFutureTime(currentTime), date: getFutureDate() };
    form = component.timeDateForm;
    time = form.get('timeInput');
    date = form.get('dateInput');
  });

  const updateForm = (td: timeDate) => {
    time.setValue(td.time);
    date.setValue(td.date);
    form.markAsDirty();
    time.markAsDirty();
    date.markAsDirty();
    form.updateValueAndValidity();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be invalid form since both time & date has past', () => {
    updateForm(bothPast);
    expect(form.valid).toBeFalse();
  });
  it('should be valid form with date in future (time is an hour past)', () => {
    updateForm(timePast)
    expect(form.valid).toBeTrue();
  });
  it('should be invalid form since date has past (time is set an hour from now)', () => {
    updateForm(datePast)
    expect(form.valid).toBeFalse();
  });
  it('should be valid since both time and date are in the future', () => {
    updateForm(bothFuture);
    expect(form.valid).toBeTrue();
  });
  it('should have no errors when all controls  are  valid', () => {
    updateForm(bothFuture);
    const errors = Object.keys(form.controls).map(c => form.get(c).errors);
    let result = errors.every(i => i === null) ? null : errors;
    expect(result).toBe(null);
  });

  it('should set time to future time', () => {
    let futureTime = getFutureTime(currentTime);
    time.setValue(futureTime);
    expect(time.value).toBe(futureTime);
  });
  it('should  set  time  valid', () => {
    let futureTime = getFutureTime(currentTime);
    time.setValue(futureTime);
    expect(time.valid).toBeTrue();
  });
  it('should have todayButTimePast error message (date is today)', () => {
      let pastTime = getPastTime(currentTime);
      updateForm({ time: pastTime, date: currentTime });
      fixture.detectChanges();
      expect(form.errors).toEqual({'todayButTimePast': true});
  });
  it('should have dateHasPast error message', () => {
      updateForm(bothPast);
      fixture.detectChanges();
      expect(form.errors).toEqual({'dateHasPast': true});
  });
  it('should output timeDate in correct type', () => {
      spyOn(component.timeDate, 'emit');
      fixture.detectChanges();
      updateForm(bothFuture);
      expect(form.valid).toBeTruthy();
      expect(component.timeDate.emit).toHaveBeenCalled();
   });
});


export const getPastTime = (comparedTo: Date) => {
  let pastHour: string | number = comparedTo.getHours();
  if (pastHour !== 0) pastHour--;
  pastHour = `0${pastHour}`.slice(-2);
  return `${pastHour}:${comparedTo.getMinutes()}`;
}

export const getFutureTime = (comparedTo: Date) => {
  let futureHour: string | number = comparedTo.getHours();
  if (futureHour !== 23) futureHour++;
  futureHour = `0${futureHour}`.slice(-2);
  return `${futureHour}:${comparedTo.getMinutes()}`;
}

export const getPastDate = () => {
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - 2);
  return pastDate;
}

export const getFutureDate = () => {
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 2);
  return futureDate;
}

export type timeDate = {
  time: string,
  date: Date
}
