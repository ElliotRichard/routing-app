import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../../services/data.service';
import { ROUTE, IRouteLocation, IDogLocation } from '../../../shared/types';


export class CurrentTimeMatcher implements ErrorStateMatcher {
  private currentDate;

  constructor(date) {
    this.currentDate = date;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const chosenDate = new Date();
    const currentDate = new Date();
    if (currentDate === chosenDate) {
      const currentTime = Date.now();
      const chosenHour = control.value.split(':')[0];
      const chosenMin = control.value.split(':')[1];
      const chosenTime = new Date();
      chosenTime.setHours(chosenHour);
      chosenTime.setMinutes(chosenMin);
      return (chosenTime.getTime() > currentTime);

    }
    const cTime = new Date();
    const timeString = `${cTime.getHours}${cTime.getMinutes()}`;
    (control.value.replace(':', '') < timeString)
    //    if (time in lesser && day is today) { reject}
    console.log(control.value);
    return (true)
  }

  setCurrentDate(newDate) {
    this.currentDate = newDate;
  }
}

@Component({
  selector: 'app-route-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss'],
})
export class RouteInputComponent implements OnInit {
  @Output() routeAdded: EventEmitter<any> = new EventEmitter();
  public addresses: any[] = [{ type: ROUTE.START }, { type: ROUTE.END }];
  public componentType: ROUTE = ROUTE.WAYPOINT;
  public showAddWaypoint = false;
  public showFindRoute = false;
  private addressCount = 0;
  selectedTime: any = 0;
  selectedDate: any = 0;
  currentYear = new Date().getFullYear();
  currentTime = new Date();
  // Can't set route times in the past
  minDate = new Date();
  timeDateForm: FormGroup = new FormGroup({
    timeInput: new FormControl('', [Validators.required]),
    dateInput: new FormControl('', [Validators.required]),
  });
  time = new FormControl('', [Validators.required]);
  // timeMatcher = new CurrentTimeMatcher(this.minDate);
  maxDate = new Date();
  showDatePicker: boolean = false;
  validRoute: boolean = true;



  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Enforcing 3 month cutoff as traffic prediction 
    // can only be fetched for near dates
    this.maxDate.setMonth(this.minDate.getMonth() + 4, 0);
  }

  /** Returns true if dateInput is today */
  isChosenDateToday(dateInput: Date): boolean {
    const today = new Date();
    const sameYear = today.getFullYear() === dateInput.getFullYear();
    const sameMonth = today.getMonth() === dateInput.getMonth();
    const sameDate = today.getDate() === dateInput.getDate();
    return sameYear && sameMonth && sameDate;
    today.setHours(12);
    today.setMinutes(0);
    today.setMilliseconds(0);
    const chosenDate = new Date(dateInput);
    // const chosenDate = new Date(dateInput.toISOString().substring(0, 10));
    chosenDate.setHours(12);
    chosenDate.setMinutes(0);
    chosenDate.setMilliseconds(0);
    console.log('isDateChosenToday', today, chosenDate, today === chosenDate, dateInput.toISOString().substring(0, 10));
    return today === chosenDate;
  }

  /** Returns true if timeInput is in the past */
  hasChosenTimePast(timeInput: string): boolean {
    console.log(`timeInput: ${timeInput}`)
    const rightNow = new Date();
    let currentHour = `0${rightNow.getHours()}`.slice(-2);
    /*     if (currentHour.length === 1) {
          currentHour = `0${currentHour}`;
        }  */
    const currentTime = +`0.${currentHour}${rightNow.getMinutes()}`;
    const convertedTime = +`0.${timeInput.replace(':', '')}`;
    console.log('hasChosenTimePast', currentTime, convertedTime, currentTime > convertedTime);
    return currentTime > convertedTime;
  }
  ngOnInit(): void {
    this.dataService
      .$getDogsForRoute()
      .subscribe((dog: IDogLocation) => this.addDatabaseLocation(dog));

    this.timeDateForm.valueChanges.subscribe((timeDate) => {
      console.log('timeDate');
      console.log(timeDate)
      const dateInput = this.timeDateForm.get('dateInput').value;
      const timeInput = this.timeDateForm.get('timeInput').value;
      console.log('dateInput', dateInput);
      console.log('timeInput', timeInput);
      if (dateInput && timeInput) {
        const timeDateInPast =
          this.isChosenDateToday(dateInput) &&
          this.hasChosenTimePast(timeInput);
        const dateChosenInPast = dateInput.getTime() < Date.now();
        // The second equality check is to ensure
        // the date isn't set manually into the past
        if (timeDateInPast || dateChosenInPast) {
          // Time Date must be in the future
          console.log('Time Date must be in the future');
          this.timeDateForm.get('timeInput').setErrors({ "pastTime": true });
          this.timeDateForm.get('dateInput').setErrors({ "pastTime": true });
        } else {
          // set timeDate
          this.timeDateForm.get('timeInput').setErrors(null);
          this.timeDateForm.get('dateInput').setErrors(null);
          console.log('Setting route time as ', dateInput, timeInput, ' form valid:', this.timeDateForm.valid);
        }
      } else {
        // Time Date must both be chosen
        this.timeDateForm.get('timeInput').setErrors(Validators.required);
        this.timeDateForm.get('dateInput').setErrors(Validators.required);
        console.log('Both time and date must be chosen');
        let timeErrors = this.timeDateForm.get('timeInput').errors;
        let formDirty = this.timeDateForm.dirty;
        // requiredError returns true while checking for errors.required returns a function. 
        let requiredError = timeErrors.name.includes('required');
        console.log(`time errors`, timeErrors, !!timeErrors.required, requiredError, ' dirt thou', formDirty);
        console.log(this.timeDateForm.controls.timeInput.errors && this.timeDateForm.controls.timeInput.errors.required, this.timeDateForm.controls.timeInput.errors.required === true, !this.timeDateForm.controls.timeInput.errors.required === true)
      }

    });

    /**
    this.timeDateForm.valueChanges.subscribe((timeDate) => {    
    console.log(`timeDate ${timeDate}`)
      const currentDateInputString = (this.timeDateForm.get('dateInput').value).toISOString().substring(0, 10);
      const currentDateInputDate = new Date(currentDateInputString);
      currentDateInputDate.setDate(currentDateInputDate.getDate() + 1);
      const currentDateInput = currentDateInputDate.toISOString().substring(0,10);
      const currentDateString = this.minDate.toISOString().substring(0, 10);
      const currentTimeInputString = this.timeDateForm.get('timeInput').value.split(':');
      const currentTime = Date.now();
      const chosenTime = new Date();
      const timeInPast = Date.now() 
      chosenTime.setHours(currentTimeInputString[0]);
      chosenTime.setMinutes(currentTimeInputString[1]);
      if (chosenTime.getTime() < currentTime && currentDateInput === this.minDate.toISOString().substring(0, 10)) {
        // print error message
        console.log('Time must be in the future');
        this.timeDateForm.setErrors({ pastTime: true });
      } else {
      
        this.timeDateForm.setErrors(null);
        console.log('Date Time for route is valid');
        console.log(`${chosenTime.getTime()} < ${currentTime} = ${chosenTime.getTime() < currentTime}`);
        console.log(`${currentDateInput} === ${this.minDate.toISOString().substring(0, 10)} = ${currentDateInput === this.minDate.toISOString().substring(0, 10)}`); 
        // this.selectedDate =
          // this.selectedTime =
          // this.validRoute = true;
      }
    });
    */

    /*     this.time.valueChanges.subscribe((time: string) => {
          const currentTime = Date.now();
          const chosenTime = new Date(this.selectedDate);
          console.log(`Chosen Date: ${this.selectedDate} time: ${time}`);
          chosenTime.setHours(Number(time.split(':')[0]));
          chosenTime.setMinutes(Number(time.split(':')[1]));
          this.time.setErrors({ pastTime: (chosenTime.getTime() > currentTime) });
        }) 
    */
  }

  routeLocationAdded(): void {
    this.addressCount++;
    if (this.addressCount >= this.addresses.length) {
      this.showAddWaypoint = true;
      this.showFindRoute = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  addressSet($address): void {
    this.routeLocationAdded();
  }

  addRouteWaypoint(): void {
    this.addresses.push({ type: ROUTE.WAYPOINT } as IRouteLocation);
    this.showAddWaypoint = false;
  }

  addDatabaseLocation(dog: IDogLocation): void {
    this.addresses.push(dog);
    this.changeDetectorRef.detectChanges();
    this.routeLocationAdded();
  }

  getRoute(): void {
    this.routeAdded.emit(true);
    const time = new Date(`${this.selectedDate}T${this.selectedTime}:00Z`);
    console.log('Time details', this.selectedDate, this.selectedTime, time);
    this.dataService.setDepartureTime(time);
    this.dataService.plotRoute();
  }

  optimizeRoute() {
    this.dataService.reverseRouteOptimization();
  }

}
