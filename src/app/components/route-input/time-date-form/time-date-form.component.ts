import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, NgForm, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-time-date-form',
  templateUrl: './time-date-form.component.html',
  styleUrls: ['./time-date-form.component.scss']
})
export class TimeDateFormComponent implements OnInit {
  timeDateForm: FormGroup = new FormGroup({
    timeInput: new FormControl('', [Validators.required]),
    dateInput: new FormControl('', [Validators.required]),
  });
  showDatePicker = true;
  minDate = new Date();
  constructor() { }

  ngOnInit(): void {
    this.timeDateForm.setValidators(this.timeDateValidator);
  }

  getDateHasPast() {
    let date = this.timeDateForm.get('dateInput').value as Date;
    return `${date.getTime()} <  ${Date.now()}  date.getTime() < Date.now() ${date.getTime() < Date.now()}`
    // { { date.getTime() } } <{{ Date.now() }
    // } { { date.getTime() < Date.now() } }
  }

  isChosenDateToday = (dateInput: Date): boolean => {
    const today = new Date();
    const sameYear = today.getFullYear() === dateInput.getFullYear();
    const sameMonth = today.getMonth() === dateInput.getMonth();
    const sameDate = today.getDate() === dateInput.getDate();
    return sameYear && sameMonth && sameDate;
  }
  
  hasChosenTimePast = (timeInput: string): boolean => {
    const rightNow = new Date();
    let currentHour = `0${rightNow.getHours()}`.slice(-2);
    const currentTime = +`0.${currentHour}${rightNow.getMinutes()}`;
    const convertedTime = +`0.${timeInput.replace(':', '')}`;
    return currentTime > convertedTime;
  }
  //TODO allow control over what the  time/date controls are  called.
  timeDateValidator = (form: FormGroup): ValidationErrors | null => {
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
      if (dateChosenInPast && this.isChosenDateToday(dateValue)) {
        error = { 'todayButTimePast': true };
      } else if (dateChosenInPast) {
  
        error = { 'dateHasPast': true };
      }
    }
    return error;
  }
}
