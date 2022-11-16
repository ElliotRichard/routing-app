import { AbstractControl, FormGroup, NgForm, ValidationErrors, Validator, Validators } from '@angular/forms';


export const isChosenDateToday = (dateInput: Date): boolean => {
  const today = new Date();
  const sameYear = today.getFullYear() === dateInput.getFullYear();
  const sameMonth = today.getMonth() === dateInput.getMonth();
  const sameDate = today.getDate() === dateInput.getDate();
  return sameYear && sameMonth && sameDate;
}

export const hasChosenTimePast = (timeInput: string): boolean => {
  const rightNow = new Date();
  let currentHour = `0${rightNow.getHours()}`.slice(-2);
  const currentTime = +`0.${currentHour}${rightNow.getMinutes()}`;
  const convertedTime = +`0.${timeInput.replace(':', '')}`;
  return currentTime > convertedTime;
}
//TODO allow control over what the  time/date controls are  called.
export const timeDateValidator = (form: FormGroup): ValidationErrors | null => {
  let error: ValidationErrors | null = null;
  let anyPristine = Object.keys(form.controls).every((c) => form.get(c).pristine);
  if (anyPristine) return null;
  const dateInput = form.get('dateInput');
  const timeInput = form.get('timeInput');
  if ((dateInput && timeInput) && (dateInput.value && timeInput.value)) {
    const dateValue = <Date>dateInput.value;
    const timeValue = <string>timeInput.value;
    // const timeDateInPast =
    //   isChosenDateToday(dateValue) &&
    //   hasChosenTimePast(timeValue);

    let chosen = new Date(dateValue);
    chosen.setHours(+timeValue.slice(0, 2));
    chosen.setMinutes(+timeValue.slice(-2));
    const dateChosenInPast = chosen.getTime() < Date.now();
    if (dateChosenInPast && isChosenDateToday(dateValue)) {
      error = { 'todayButTimePast': true };
    } else if (dateChosenInPast) {

      error = { 'dateHasPast': true };
    }
  }
  return error;
}


export type timeDate = {
  time: string,
  date: Date
}

const getHours = (time: Time) => {
  return time.slice(0, 2);
}

const getMin = (time: Time) => {
  return time.slice(-2);
}


type D1 = 0 | 1;
type D3 = D1 | 2 | 3;
type D5 = D3 | 4 | 5;
type D9 = D5 | 6 | 7 | 8 | 9;

type Hours = `${D9}` | `${D1}${D9}` | `2${D3}`;
type Minutes = `${D5}${D9}`;
type Time = `${Hours}:${Minutes}`;


