import { DataService } from '../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouteStop } from '../../types';
@Component({
  selector: 'app-route-input',
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss'],
})
export class RouteInputComponent implements OnInit {
  addresses: number[] = [RouteStop.START];
  displayFooter = 'none';
  componentType: RouteStop = RouteStop.END;
  @Output() address: EventEmitter<any> = new EventEmitter();
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.center.subscribe((newCenter) => {
      console.log('newCenter at addressInput');
      this.displayFooter = 'flex';
    });
  }
  addDestination() {
    if (this.addresses.length === 1) {
      this.addresses.push(RouteStop.END);
      this.componentType = RouteStop.WAYPOINT;
    } else this.addresses.push(RouteStop.WAYPOINT);
    this.addresses.sort((a, b) => a - b);
    this.displayFooter = 'none';
  }
  setAddress($event) {
    // this.address.emit($event);
  }

  getRoute() {
    this.dataService.plotRoute();
    this.address.emit('new route');
  }
}
