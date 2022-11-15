import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeDateValidator } from '../TimeValidator';

@Component({
  selector: 'app-time-date-form',
  templateUrl: './time-date-form.component.html',
  styleUrls: ['./time-date-form.component.scss']
})
export class TimeDateFormComponent implements OnInit {
  timeDateForm: FormGroup = new FormGroup({
    timeInput: new FormControl('', [Validators.required]),
    dateInput: new FormControl('', [Validators.required]),
  }, [timeDateValidator]);
  showDatePicker = true;
  minDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  getDateHasPast() {
    let date = this.timeDateForm.get('dateInput').value as Date;
    return `${date.getTime()} <  ${Date.now()}  date.getTime() < Date.now() ${date.getTime() < Date.now()}`
    // { { date.getTime() } } <{{ Date.now() }
    // } { { date.getTime() < Date.now() } }
  }

}
