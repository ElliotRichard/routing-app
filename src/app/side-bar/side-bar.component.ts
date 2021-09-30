import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  showDirections: string = 'none';
  constructor() {}

  ngOnInit(): void {}
  getTimeLoaded(value: any): any {
    return value;
  }
  setAddress($event) {
    console.log(`App Event: ${$event.geometry.location}`);
  }
}
