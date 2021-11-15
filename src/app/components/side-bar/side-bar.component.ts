import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  addressList: Observable<any>;

  sideBarDisplay = 'route-input';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.addressList = this.dataService.addressList;
  }
  routeAdded($event) {
    this.sideBarDisplay = 'address-list';
  }
  newRoute() {
    this.sideBarDisplay = 'route-input';
  }
}
