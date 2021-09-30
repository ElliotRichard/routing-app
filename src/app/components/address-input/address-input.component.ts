import { DataService } from './../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { sidebar } from '../../../../../sidebar-v2-0.4.0/js/jquery-sidebar.js';
import { RouteStop } from '../../types';
@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit {
  addresses: number[] = [RouteStop.START];
  validAddresses: number[] = [];
  showAddDestination: boolean = true;
  componentType: RouteStop = RouteStop.END;
  @Output() address: EventEmitter<any> = new EventEmitter();
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // floating Sidebar v2.0
    // let sidebar = document.querySelector('#sidebar').sidebar();
  }
  addDestination() {
    if (this.addresses.length === 1) {
      this.addresses.push(RouteStop.END);
      this.componentType = RouteStop.WAYPOINT;
    } else this.addresses.push(RouteStop.WAYPOINT);
    this.addresses.sort((a, b) => a - b);
    if (this.addresses.length != this.validAddresses.length) {
      this.showAddDestination = false;
    }
  }
  setAddress($event) {
    this.address.emit($event);
  }

  getRoute() {
    this.dataService.plotRoute();
  }
}
