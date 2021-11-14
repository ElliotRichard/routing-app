import { DataService } from '../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouteStop } from '../../types';
@Component({
  selector: 'app-route-input',
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss'],
})
export class RouteInputComponent implements OnInit {
  @Output() address: EventEmitter<any> = new EventEmitter();
  addresses: number[] = [RouteStop.START];
  displayFooter = 'none';
    componentType: RouteStop = RouteStop.END;
    showAddWaypoint = false;
    private addressCount = 1;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.center.subscribe((newCenter) => {
      console.log('newCenter at addressInput');
	this.displayFooter = 'flex';
    });
      this.dataService.routeAdded.subscribe((routeAdded)=> {
	  this.showAddWaypoint = true;
      });
  }
  addressSet($address) {
      console.log('Route-Input', $address);
      if (this.addressCount === this.addresses.length) {
	  this.showAddWaypoint = true;
      }
  }
  addRouteWaypoint() {
    if (this.addresses.length === 1) {
      this.addresses.push(RouteStop.END);
      this.componentType = RouteStop.WAYPOINT;
    } else this.addresses.push(RouteStop.WAYPOINT);
    this.displayFooter = 'none';
  }
  getRoute() {
    this.dataService.plotRoute();
    this.address.emit('new route');
  }
}
