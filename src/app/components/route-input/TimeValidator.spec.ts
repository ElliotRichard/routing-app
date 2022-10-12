import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { timeDateValidator, isChosenDateToday, hasChosenTimePast, timeDate } from './TimeValidator';
import { RouteInputComponent } from './route-input.component';


describe("timeDateValidator should return specific errors under specific situations", () => {
  let form: FormGroup;
  let currentTime: Date, currentDate: Date;
  let dateInput: AbstractControl, timeInput: AbstractControl;
  beforeEach(() => {
    form = new FormGroup({
      timeInput: new FormControl('', [Validators.required]),
      dateInput: new FormControl('', [Validators.required]),
    }, [timeDateValidator]);
    currentTime = new Date();
    currentDate = new Date();
    currentDate.setHours(+'00');
    currentDate.setMinutes(+'00');
    dateInput = form.get('dateInput');
    timeInput = form.get('timeInput');
  });

  // const updateForm = (td: timeDate) => {
  //   time.setValue(td.time);
  //   date.setValue(td.date);
  //   form.markAsDirty();
  //   time.markAsDirty();
  //   date.markAsDirty();
  //   form.updateValueAndValidity();
  // }

  it('should pass if time date is  later  today', () => {
    dateInput.setValue(new Date());
    timeInput.setValue('20:00');
    expect(form.errors).toBe(null);
  });
  it('should fail if time date has recently past', () => {
    dateInput.setValue(currentDate);
    timeInput.setValue(getPastTime(currentTime));
    form.markAsDirty();
    timeInput.markAsDirty();
    dateInput.markAsDirty();
    form.updateValueAndValidity();
    expect(form.errors).toEqual({ 'todayButTimePast': true });
  });
  it("should input time in control", () => {
    let pastHour: string | number = currentTime.getHours();
    if (pastHour !== 0) pastHour--;
    pastHour = `0${pastHour}`.slice(-2);
    const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    timeInput.setValue(mockInput);
    expect(form.controls.timeInput.value).toBe(mockInput);
  });
  it("should input date in control", () => {
    let tomorrow = currentTime.setDate(currentTime.getDate() + 1)
    dateInput.setValue(tomorrow)
    expect(form.controls.dateInput.value).toBe(tomorrow);
  });
  it("shouldn't have any errors when it hasn't been touched", () => {
    expect(form.errors).toEqual(null);
  });
  it("should return false when date & time has passed", () => {
    let pastHour: string | number = currentTime.getHours();
    if (pastHour !== 0) pastHour--;
    pastHour = `0${pastHour}`.slice(-2);
    const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    const timeDateInPast =
      isChosenDateToday(pastDate) &&
      hasChosenTimePast(mockInput);
    const dateChosenInPast = pastDate.getTime() < Date.now();
    expect(timeDateInPast || dateChosenInPast).toBeTrue();
  });
  it("should not be pristine when controls have a value", () => {
    let pastHour: string | number = currentTime.getHours();
    if (pastHour !== 0) pastHour--;
    pastHour = `0${pastHour}`.slice(-2);
    const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);

    timeInput.setValue(mockInput);
    dateInput.setValue(pastDate);
    // form.markAsTouched();
    form.markAsDirty();
    form.updateValueAndValidity();
    // expect(dateInput.value).toBe(pastDate);
    expect(form.pristine).toBeFalse();
  });
  it("should have an error when the time and date has past", () => {
    const pastTime = getPastTime(currentTime);
    const pastDate = getPastDate();
    // let pastHour: string | number = currentTime.getHours();
    // if (pastHour !== 0) pastHour--;
    // pastHour = `0${pastHour}`.slice(-2);
    // const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    // const pastDate = new Date();
    // pastDate.setMonth(pastDate.getMonth() - 1);

    timeInput.setValue(pastTime);
    dateInput.setValue(pastDate);
    form.markAsDirty();
    timeInput.markAsDirty();
    dateInput.markAsDirty();
    form.updateValueAndValidity();
    expect(form.errors).toEqual({ dateHasPast: true });
  });
  it("should be invalid since time & date has passed", () => {
    timeInput.setValue(getPastTime(currentTime));
    dateInput.setValue(getPastDate());
    form.markAsDirty();
    timeInput.markAsDirty();
    dateInput.markAsDirty();
    form.updateValueAndValidity();
    expect(form.valid).toBeFalse();
  });
});


describe("time & date logic should be correct", () => {
  let currentTime: Date;
  beforeEach(() => {
    currentTime = new Date();
  });
  it('should be today', () => {
    let d = new Date();
    expect(isChosenDateToday(d)).toBeTrue();
  });
  it('should be in the past', () => {
    let d = new Date();
    let h = d.getHours() - 1;
    d.setHours(h);
    expect(hasChosenTimePast(getPastTime(new Date()))).toBe(true)
  });
  it('should be an hour ago', () => {
    let past = getPastTime(currentTime);
    let current = `${currentTime.getHours() - 1}:${currentTime.getMinutes()}`;
    expect(past).toBe(current)
  });
  it('should pass if time has past', () => {
    let pastHour: string | number = currentTime.getHours();
    if (pastHour !== 0) pastHour--;
    pastHour = `0${pastHour}`.slice(-2);
    const mockInput = `${pastHour}:${currentTime.getMinutes()}`;
    expect(hasChosenTimePast(mockInput)).toBeTrue();
  });
  // it('should return true if date in future', () => {
  //   let futureDate = getFutureDate();
  //   expect(futureDate.getTime() > Date.now()).toBeTrue();
  // });
  it(`should fail if input time is in future`, () => {
    let futureHour: string | number = currentTime.getHours();
    if (futureHour !== 23) futureHour++;
    futureHour = `0${futureHour}`.slice(-2);
    const mockInput = `${futureHour}:${currentTime.getMinutes()}`;
    expect(hasChosenTimePast(mockInput)).toBeFalse();
  });

  it('should fail if date is set to past', () => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    expect(isChosenDateToday(pastDate)).toBeFalse();
  });

  it('should fail if date chosen is in future', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1);
    expect(isChosenDateToday(futureDate)).toBeFalse();
  });

  it('should pass if date chosen is today', () => {
    const currentDate = new Date();
    expect(isChosenDateToday(currentDate)).toBeTrue();
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