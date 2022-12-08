import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-time-date-form',
  templateUrl: './time-date-form.component.html',
  styleUrls: ['./time-date-form.component.scss']
})
export class TimeDateFormComponent implements OnInit {
    @Output() timeDate = new  EventEmitter<any>();
    timeDateForm: FormGroup = new FormGroup({
    timeInput: new FormControl('', [Validators.required]),
    dateInput: new FormControl('', [Validators.required]),
    });
    timeDateStatus  ;
  showDatePicker = true;
  minDate = new Date();
  constructor() { }

  ngOnInit(): void {
      this.timeDateForm.setValidators(this.timeDateValidator.bind(this));
      this.timeDateForm.statusChanges.subscribe((form)=> {
	  if (this.timeDateForm.valid) {
	      this.timeDate.emit(this.timeDateForm.value);
	  }
      });
  }

  isChosenDateToday(dateInput: Date): boolean {
    const today = new Date();
    const sameYear = today.getFullYear() === dateInput.getFullYear();
    const sameMonth = today.getMonth() === dateInput.getMonth();
    const sameDate = today.getDate() === dateInput.getDate();
    return sameYear && sameMonth && sameDate;
  }
  
  hasChosenTimePast(timeInput: string): boolean {
    const rightNow = new Date();
    let currentHour = `0${rightNow.getHours()}`.slice(-2);
    const currentTime = +`0.${currentHour}${rightNow.getMinutes()}`;
    const convertedTime = +`0.${timeInput.replace(':', '')}`;
    return currentTime > convertedTime;
  }

  timeDateValidator(form: FormGroup): ValidationErrors | null {
    let error: ValidationErrors | null = null;
    let anyPristine = Object.keys(form.controls).every((c) => form.get(c).pristine);
    if (anyPristine) return null;
    const dateInput = form.get('dateInput');
    const timeInput = form.get('timeInput');
    if ((dateInput && timeInput) && (dateInput.value && timeInput.value)) {
      const dateValue = <Date>dateInput.value;
      const timeValue = <string>timeInput.value;  
      let chosen = new Date(dateValue);
      chosen.setHours(+timeValue.slice(0, 2));
      chosen.setMinutes(+timeValue.slice(-2));
      const dateChosenInPast = chosen.getTime() < Date.now();
      const chosenDateToday = this.isChosenDateToday(dateValue);
      
      if (dateChosenInPast) {
        error = { 'dateHasPast': true};
        if (chosenDateToday) {
          error = { 'todayButTimePast': true};
        }
      }
    }
    return error;
  }
}
