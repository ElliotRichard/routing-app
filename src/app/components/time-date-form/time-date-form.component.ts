import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { setTime } from '../../../shared/utilities';

@Component({
  selector: 'app-time-date-form',
  templateUrl: './time-date-form.component.html',
  styleUrls: ['./time-date-form.component.scss']
})
export class TimeDateFormComponent implements OnInit {
  @Output() timeDate = new EventEmitter<Date | boolean>();
  timeDateForm: FormGroup = new FormGroup({
    timeInput: new FormControl('', [Validators.required]),
    dateInput: new FormControl('', [Validators.required]),
  });
  showDatePicker = true;
  minDate = new Date();
  constructor() { }

  ngOnInit(): void {
    this.timeDateForm.setValidators(this.timeDateValidator.bind(this));
    this.timeDateForm.statusChanges.subscribe((form) => {
      if (this.timeDateForm.valid) {
        let timeDateResult = setTime(
          this.timeDateForm.get('dateInput').value,
          this.timeDateForm.get('timeInput').value
        );
        this.timeDate.emit(timeDateResult);
      } else {
        console.log(`timeDateForm Component status: ${this.timeDateForm.status}`);
        this.timeDate.emit(false);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('we outta here!');
    this.timeDate.emit(new Date);
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
        error = { 'dateHasPast': true };
        if (chosenDateToday) {
          error = { 'todayButTimePast': true };
        }
      }
    }
    return error;
  }
}
